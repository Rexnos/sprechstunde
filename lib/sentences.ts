// Abbreviations that end in a period but do not end a sentence.
const ABBREVIATIONS = new Set(["z.b", "b", "z", "dr", "fr", "hr", "usw", "bzw", "ca", "etc", "evtl", "ggf", "nr", "str", "u.a", "vgl", "d.h", "s", "o.ä", "inkl", "max", "min", "prof", "st"]);

/**
 * Splits streamed text into sentences that are complete and safe to send to TTS.
 * `consumed` is how many characters were already handed out; returns the new
 * sentences and the updated offset. The unfinished tail stays for later.
 */
export function takeCompleteSentences(text: string, consumed: number): { sentences: string[]; consumed: number } {
  const sentences: string[] = [];
  let start = consumed;
  const re = /[.!?…]+["“”»«')]*\s+/g;
  re.lastIndex = consumed;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const end = m.index + m[0].length;
    const candidate = text.slice(start, end).trim();
    if (!isFalseBoundary(text.slice(start, m.index + 1))) {
      // Very short fragments ("Ja.") are merged with the next sentence to avoid choppy audio.
      if (candidate.replace(/[^\p{L}\p{N}]/gu, "").length >= 3 || sentences.length > 0 || consumed > 0) {
        sentences.push(candidate);
        start = end;
      }
    }
  }
  return { sentences, consumed: start };
}

/** Everything left after the last complete sentence. */
export function remainder(text: string, consumed: number): string {
  return text.slice(consumed).trim();
}

function isFalseBoundary(segment: string): boolean {
  if (!segment.endsWith(".")) return false;
  const lastWord = segment.slice(0, -1).split(/\s+/).pop() ?? "";
  if (/^\d+$/.test(lastWord)) return true; // ordinals: "am 3. Mai"
  return ABBREVIATIONS.has(lastWord.toLowerCase().replace(/^[„"(]/, ""));
}
