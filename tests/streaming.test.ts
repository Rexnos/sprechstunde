import { describe, expect, it } from "vitest";
import { z } from "zod";
import { TutorResponseSchema } from "@/lib/schemas";
import { remainder, takeCompleteSentences } from "@/lib/sentences";
import { readNdjson } from "@/lib/services/ndjson";
import { extractStringField, tryParseCorrectionPrefix } from "@/lib/services/stream-json";

describe("extractStringField", () => {
  const full = JSON.stringify({ correction: null, reply: 'Hallo! "Kino" ist toll.\nUnd du?', vocabulary: [] });

  it("decodes partial values chunk by chunk", () => {
    let last = "";
    for (let n = 1; n <= full.length; n++) {
      const r = extractStringField(full.slice(0, n), "reply");
      if (r.found) {
        expect(r.text.startsWith(last)).toBe(true); // text only ever grows
        last = r.text;
      }
    }
    expect(extractStringField(full, "reply")).toEqual({ found: true, text: 'Hallo! "Kino" ist toll.\nUnd du?', closed: true });
  });

  it("waits for incomplete escapes", () => {
    expect(extractStringField('{"reply":"Gr\\u00', "reply").text).toBe("Gr");
    expect(extractStringField('{"reply":"Gr\\u00fc', "reply").text).toBe("Grü");
    expect(extractStringField('{"reply":"a\\', "reply").text).toBe("a");
  });

  it("reports missing fields", () => {
    expect(extractStringField('{"correction":nu', "reply").found).toBe(false);
  });
});

describe("tryParseCorrectionPrefix", () => {
  it("is not ready before the reply key", () => {
    expect(tryParseCorrectionPrefix('{"correction":{"original":"Ich gehe').ready).toBe(false);
  });
  it("parses a null correction", () => {
    expect(tryParseCorrectionPrefix('{"correction": null, "reply": "Ha')).toEqual({ ready: true, correction: null });
  });
  it("parses a correction object", () => {
    const raw = '{"correction":{"original":"Ich sehe der Mann.","suggested":"Ich sehe den Mann.","explanation":"Akkusativ.","category":"case"},"reply":"';
    const r = tryParseCorrectionPrefix(raw);
    expect(r).toEqual({
      ready: true,
      correction: { original: "Ich sehe der Mann.", suggested: "Ich sehe den Mann.", explanation: "Akkusativ.", category: "case" },
    });
  });
});

describe("takeCompleteSentences", () => {
  it("emits sentences only once they are complete", () => {
    let consumed = 0;
    let r = takeCompleteSentences("Super! Was hast du", consumed);
    expect(r.sentences).toEqual(["Super!"]);
    consumed = r.consumed;
    r = takeCompleteSentences("Super! Was hast du gesehen? Ich", consumed);
    expect(r.sentences).toEqual(["Was hast du gesehen?"]);
    expect(remainder("Super! Was hast du gesehen? Ich", r.consumed)).toBe("Ich");
  });

  it("does not split German abbreviations or ordinals", () => {
    const text = "Wir treffen uns am 3. Mai, z.B. um 10 Uhr bei Dr. Weber. Passt das? ";
    expect(takeCompleteSentences(text, 0).sentences).toEqual(["Wir treffen uns am 3. Mai, z.B. um 10 Uhr bei Dr. Weber.", "Passt das?"]);
  });

  it("merges a tiny first fragment with the next sentence", () => {
    expect(takeCompleteSentences("Ja. Das ist gut. ", 0).sentences).toEqual(["Ja. Das ist gut."]);
  });
});

describe("readNdjson", () => {
  it("handles lines split across chunks", async () => {
    const enc = new TextEncoder();
    const parts = ['{"a":1}\n{"a"', ':2}\n', '{"a":3}'];
    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        parts.forEach((p) => c.enqueue(enc.encode(p)));
        c.close();
      },
    });
    const out: unknown[] = [];
    for await (const v of readNdjson(stream)) out.push(v);
    expect(out).toEqual([{ a: 1 }, { a: 2 }, { a: 3 }]);
  });
});

describe("tutor schema order", () => {
  it("generates correction before reply", () => {
    const schema = z.toJSONSchema(TutorResponseSchema) as { properties: Record<string, unknown> };
    expect(Object.keys(schema.properties).slice(0, 2)).toEqual(["correction", "reply"]);
  });
});
