// Scoring of spoken answers in course exercises. This only compares the recognised
// text with the target words; it is not a pronunciation assessment.

const NUMBER_WORDS: Record<string, string> = {
  null: "0", eins: "1", ein: "1", zwei: "2", drei: "3", vier: "4", fünf: "5", sechs: "6", sieben: "7", acht: "8", neun: "9",
  zehn: "10", elf: "11", zwölf: "12", dreizehn: "13", vierzehn: "14", fünfzehn: "15", sechzehn: "16", siebzehn: "17",
  achtzehn: "18", neunzehn: "19", zwanzig: "20", dreißig: "30", vierzig: "40", fünfzig: "50", sechzig: "60",
  siebzig: "70", achtzig: "80", neunzig: "90", hundert: "100",
};
const UNITS = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
const TENS: Record<number, string> = { 2: "zwanzig", 3: "dreißig", 4: "vierzig", 5: "fünfzig", 6: "sechzig", 7: "siebzig", 8: "achtzig", 9: "neunzig" };
// 21..99 as one word, e.g. "fünfundzwanzig" → "25"
for (let t = 2; t <= 9; t++) for (let u = 1; u <= 9; u++) NUMBER_WORDS[`${UNITS[u]}und${TENS[t]}`] = String(t * 10 + u);

// Spoken letter names → the letter, so "Be wie Brot" and "B wie Brot" compare equal.
// Applied to target and transcript alike, so "er"/"es" (he/it) still match each other.
const LETTER_NAMES: Record<string, string> = {
  be: "b", ce: "c", ze: "c", zeh: "c", de: "d", ef: "f", ge: "g", ha: "h", jott: "j", ka: "k", el: "l", em: "m", en: "n",
  pe: "p", ku: "q", er: "r", es: "s", te: "t", fau: "v", we: "w", iks: "x", ypsilon: "y", zett: "z", eszett: "ss",
};

export function normalizeWord(w: string): string {
  const lower = w.toLowerCase().replace(/[.,!?;:„“"'»«()…–-]/g, "");
  const base = (LETTER_NAMES[lower] ?? lower).replace(/ß/g, "ss");
  const number = NUMBER_WORDS[base.replace(/ss/g, "ß")] ?? NUMBER_WORDS[base];
  // Fold umlauts so answers typed without a German keyboard (moechte) still match.
  return number ?? base.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue");
}

export function tokenize(s: string): string[] {
  return s.split(/\s+/).map(normalizeWord).filter(Boolean);
}

export type WordResult = { word: string; heard: boolean; slot?: boolean };
export type SpokenScore = { words: WordResult[]; ratio: number; passed: boolean; matched: string };

const SLOT = /^\{[a-z]+\}$/i;
export const PASS_RATIO = 0.8;

/**
 * Compares a transcript with the target sentence (and accepted variants).
 * `{slot}` placeholders in the target match any one or more words.
 * Returns per-word hits for the best-matching variant.
 */
export function scoreSpoken(transcript: string, target: string, accept: string[] = []): SpokenScore {
  const heard = tokenize(transcript);
  let best: SpokenScore | null = null;
  for (const variant of [target, ...accept]) {
    const s = scoreVariant(heard, variant);
    if (!best || s.ratio > best.ratio) best = s;
  }
  return best!;
}

function scoreVariant(heard: string[], target: string): SpokenScore {
  const display = target.split(/\s+/).filter(Boolean);
  const targetWords = display.map((w) => (SLOT.test(w.replace(/[.,!?]/g, "")) ? "{slot}" : normalizeWord(w)));
  const fixedCount = targetWords.filter((w) => w !== "{slot}").length;

  // LCS between heard words and fixed target words, with slots skipped.
  const fixedIdx = targetWords.map((w, i) => (w === "{slot}" ? -1 : i)).filter((i) => i >= 0);
  const a = fixedIdx.map((i) => targetWords[i]);
  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(heard.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = heard.length - 1; j >= 0; j--) dp[i][j] = a[i] === heard[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);

  const hitFixed = new Set<number>();
  let i = 0;
  let j = 0;
  while (i < a.length && j < heard.length) {
    if (a[i] === heard[j]) {
      hitFixed.add(fixedIdx[i]);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }

  // A slot counts as heard if the learner said anything beyond the fixed words.
  const extraWords = heard.length - hitFixed.size;
  const words: WordResult[] = display.map((w, k) =>
    targetWords[k] === "{slot}" ? { word: w, heard: extraWords > 0, slot: true } : { word: w, heard: hitFixed.has(k) },
  );
  const ratio = fixedCount === 0 ? (heard.length ? 1 : 0) : hitFixed.size / fixedCount;
  const slotsOk = words.every((w) => !w.slot || w.heard);
  return { words, ratio, passed: ratio >= PASS_RATIO && slotsOk && heard.length > 0, matched: target };
}
