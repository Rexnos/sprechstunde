export type DiffToken = { text: string; changed: boolean };

const tokenize = (s: string) => s.trim().split(/\s+/).filter(Boolean);
const norm = (w: string) => w.toLowerCase().replace(/[.,!?;:„“"'»«()]/g, "");

/**
 * Word-level diff (LCS) between what the learner said and the suggestion.
 * Punctuation and case are ignored when matching, so only real word changes light up.
 */
export function wordDiff(original: string, suggested: string): { before: DiffToken[]; after: DiffToken[] } {
  const a = tokenize(original);
  const b = tokenize(suggested);
  const lcs: number[][] = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i][j] = norm(a[i]) === norm(b[j]) ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const before: DiffToken[] = [];
  const after: DiffToken[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (norm(a[i]) === norm(b[j])) {
      before.push({ text: a[i++], changed: false });
      after.push({ text: b[j++], changed: false });
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      before.push({ text: a[i++], changed: true });
    } else {
      after.push({ text: b[j++], changed: true });
    }
  }
  while (i < a.length) before.push({ text: a[i++], changed: true });
  while (j < b.length) after.push({ text: b[j++], changed: true });
  return { before, after };
}
