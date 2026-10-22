import { describe, expect, it } from "vitest";
import { parseTutorOutput } from "@/lib/services/tutor-output";

const valid = {
  reply: "Was hast du im Kino gesehen?",
  correction: {
    original: "Ich gehe gestern ins Kino.",
    suggested: "Ich bin gestern ins Kino gegangen.",
    explanation: "Use the Perfekt because 'gestern' is in the past.",
    category: "verb tense",
  },
  vocabulary: [{ term: "gestern", meaning: "yesterday", example: "Ich habe gestern gelernt." }],
  nextPrompt: "Was hast du danach gemacht?",
};

describe("parseTutorOutput", () => {
  it("accepts a valid structured response", () => {
    const { response, fallback } = parseTutorOutput(JSON.stringify(valid), "Ich gehe gestern ins Kino.");
    expect(fallback).toBe(false);
    expect(response).toEqual(valid);
  });

  it("extracts JSON wrapped in a code fence or prose", () => {
    const raw = `Hier ist meine Antwort:\n\`\`\`json\n${JSON.stringify(valid)}\n\`\`\``;
    expect(parseTutorOutput(raw, "x").fallback).toBe(false);
    expect(parseTutorOutput(`Sure! ${JSON.stringify(valid)} Hope that helps`, "x").fallback).toBe(false);
  });

  it("drops a correction that suggests the same sentence (valid phrasing is not an error)", () => {
    const same = {
      ...valid,
      correction: { ...valid.correction, original: "Ich möchte einen Kaffee, bitte.", suggested: "Ich möchte einen Kaffee bitte" },
    };
    const { response } = parseTutorOutput(JSON.stringify(same), "Ich möchte einen Kaffee, bitte.");
    expect(response.correction).toBeNull();
  });

  it("repairs missing optional fields", () => {
    const partial = { reply: "Super!", correction: { suggested: "Ich bin müde.", explanation: "sein" } };
    const { response, fallback } = parseTutorOutput(JSON.stringify(partial), "Ich habe müde.");
    expect(fallback).toBe(false);
    expect(response.vocabulary).toEqual([]);
    expect(response.nextPrompt).toBe("");
    expect(response.correction).toMatchObject({ original: "Ich habe müde.", suggested: "Ich bin müde.", category: "other" });
  });

  it("filters invalid vocabulary items", () => {
    const withBad = { ...valid, vocabulary: [{ term: "", meaning: "x" }, "nope", { term: "das Kino", meaning: "the cinema" }] };
    const { response } = parseTutorOutput(JSON.stringify(withBad), "x");
    expect(response.vocabulary).toEqual([{ term: "das Kino", meaning: "the cinema", example: "" }]);
  });

  it("uses plain prose as the reply when the model ignores the JSON format", () => {
    const { response, fallback } = parseTutorOutput("Das ist toll! Was machst du gern?", "x");
    expect(fallback).toBe(true);
    expect(response.reply).toBe("Das ist toll! Was machst du gern?");
    expect(response.correction).toBeNull();
  });

  it("returns a safe fallback for broken JSON or empty output", () => {
    for (const raw of ['{"reply": "Hallo', "", "   ", '{"foo": 1}', "not json at all {"]) {
      const { response, fallback } = parseTutorOutput(raw, "x");
      expect(fallback).toBe(true);
      expect(response.reply).toMatch(/Entschuldigung/);
    }
  });
});
