import type { LetterCard } from "./types";

const l = (letter: string, name: string, example: string, exampleEn: string, tip?: string): LetterCard => ({
  letter,
  name,
  say: letter, // Piper reads a lone capital letter as its German name (checked with its phonemizer)
  example,
  exampleEn,
  tip,
});

/** The 26 letters A–Z with German names. */
export const LETTERS: LetterCard[] = [
  l("A", "A", "Apfel", "apple", "A long, open 'ah', as in 'father'."),
  l("B", "Be", "Brot", "bread"),
  l("C", "Ce", "Café", "café", "Rare in German words. Said 'tseh'. Mostly appears in ch, sch and ck."),
  l("D", "De", "Danke", "thanks"),
  l("E", "E", "Essen", "food", "Said 'eh'. A final e is always pronounced: Name = 'NAH-meh'."),
  l("F", "Ef", "Fisch", "fish"),
  l("G", "Ge", "Garten", "garden", "Always hard, as in 'go'."),
  l("H", "Ha", "Haus", "house", "After a vowel the h is silent and makes the vowel long: Uhr, gehen."),
  l("I", "I", "Insel", "island", "Said 'ee'."),
  l("J", "Jott", "Jahr", "year", "Sounds like English Y: 'yahr'."),
  l("K", "Ka", "Kaffee", "coffee"),
  l("L", "El", "Lampe", "lamp"),
  l("M", "Em", "Mutter", "mother"),
  l("N", "En", "Name", "name"),
  l("O", "O", "Obst", "fruit"),
  l("P", "Pe", "Post", "post office, mail"),
  l("Q", "Ku", "Quark", "quark (soft cheese)", "Always qu, said 'kv': Quark = 'kvark'."),
  l("R", "Er", "Rad", "bicycle", "Made in the throat. At the end of a word it's soft, almost 'a': Vater = 'FAH-ta'."),
  l("S", "Es", "Sonne", "sun", "Before a vowel it buzzes like English z: Sonne = 'ZON-neh'."),
  l("T", "Te", "Tee", "tea"),
  l("U", "U", "Uhr", "clock", "Said 'oo'."),
  l("V", "Fau", "Vater", "father", "Usually sounds like F: Vater = 'FAH-ta'."),
  l("W", "We", "Wasser", "water", "Sounds like English V: 'VAS-ser'."),
  l("X", "Iks", "Taxi", "taxi"),
  l("Y", "Ypsilon", "Typ", "type, guy", "Rare. Usually sounds like ü."),
  l("Z", "Zett", "Zug", "train", "Always 'ts': Zug = 'tsook'."),
];

/** The four extra letters. */
export const SPECIAL_LETTERS: LetterCard[] = [
  l("Ä", "Ä", "Äpfel", "apples", "Like the e in 'bed'. Without a German keyboard write ae."),
  l("Ö", "Ö", "Öl", "oil", "Say 'eh' with rounded lips. Without a German keyboard write oe."),
  l("Ü", "Ü", "Übung", "exercise", "Say 'ee' with rounded lips. Without a German keyboard write ue."),
  l("ß", "Eszett", "Straße", "street", "A sharp 'ss'. Never at the start of a word. Without a German keyboard write ss."),
];

export const ALPHABET: LetterCard[] = [...LETTERS, ...SPECIAL_LETTERS];

/** "Brot" → "B. R. O. T." so TTS spells it letter by letter with pauses. */
export function spellOut(word: string): string {
  // Upper-case letter by letter: "ß".toUpperCase() would turn ß into "SS".
  return [...word]
    .filter((c) => /\p{L}/u.test(c))
    .map((c) => (c === "ß" ? "ß" : c.toUpperCase()))
    .join(". ")
    .concat(".");
}

const UMLAUTS: Record<string, string> = { ä: "ae", ö: "oe", ü: "ue", ß: "ss" };
const fold = (s: string) =>
  s
    .trim()
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => UMLAUTS[c])
    .replace(/[^a-z]/g, "");

/** Spelling check: ignores case and accepts ae/oe/ue/ss for ä/ö/ü/ß. */
export function checkSpelling(answer: string, typed: string): boolean {
  return fold(typed).length > 0 && fold(typed) === fold(answer);
}
