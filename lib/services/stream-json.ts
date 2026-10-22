import { CorrectionSchema, type Correction } from "../schemas";

/**
 * Decodes the (possibly still incomplete) string value of `field` in streamed JSON,
 * e.g. `{"correction":null,"reply":"Hallo! Wie ge` → { text: "Hallo! Wie ge", closed: false }.
 * Stops before an escape sequence that has not fully arrived yet.
 */
export function extractStringField(raw: string, field: string): { found: boolean; text: string; closed: boolean } {
  const key = new RegExp(`"${field}"\\s*:\\s*"`).exec(raw);
  if (!key) return { found: false, text: "", closed: false };
  let i = key.index + key[0].length;
  let text = "";
  while (i < raw.length) {
    const ch = raw[i];
    if (ch === '"') return { found: true, text, closed: true };
    if (ch !== "\\") {
      text += ch;
      i++;
      continue;
    }
    const next = raw[i + 1];
    if (next === undefined) break; // escape not complete yet
    if (next === "u") {
      const hex = raw.slice(i + 2, i + 6);
      if (hex.length < 4) break;
      text += String.fromCharCode(parseInt(hex, 16));
      i += 6;
      continue;
    }
    text += ({ n: "\n", t: "\t", r: "", b: "", f: "" } as Record<string, string>)[next] ?? next;
    i += 2;
  }
  return { found: true, text, closed: false };
}

/**
 * The schema puts "correction" before "reply". As soon as the "reply" key appears,
 * everything before it is a complete JSON prefix that holds the correction.
 */
export function tryParseCorrectionPrefix(raw: string): { ready: false } | { ready: true; correction: Correction | null } {
  const key = /,\s*"reply"\s*:/.exec(raw);
  if (!key) return { ready: false };
  try {
    const obj = JSON.parse(`${raw.slice(0, key.index)}}`) as { correction?: unknown };
    if (obj.correction === null || obj.correction === undefined) return { ready: true, correction: null };
    const c = obj.correction as Record<string, unknown>;
    const parsed = CorrectionSchema.safeParse({ category: "other", explanation: "", ...c });
    return { ready: true, correction: parsed.success ? parsed.data : null };
  } catch {
    return { ready: false };
  }
}
