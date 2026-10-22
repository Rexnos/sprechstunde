export type MinimalPair = { a: string; aEn: string; b: string; bEn: string };

export type SoundSet = {
  id: string;
  title: string;
  /** What the contrast is, in plain English. */
  explain: string;
  /** How to make the harder sound. */
  tip: string;
  pairs: MinimalPair[];
  /**
   * IPA symbols on each side of the contrast (as Piper writes them), used to verify AI
   * sentences. targets[0] is the sound learners find harder.
   */
  targets: [string[], string[]];
};

const pair = (a: string, aEn: string, b: string, bEn: string): MinimalPair => ({ a, aEn, b, bEn });

// Every pair was checked with Piper's phonemizer to differ only in the intended sound.
export const SOUND_SETS: SoundSet[] = [
  {
    id: "ue-u",
    targets: [["yː", "ʏ"], ["uː", "ʊ"]],
    title: "ü or u",
    explain: "ü is not u. Mixing them changes the word: Tür (door) vs Tour (tour).",
    tip: "Say 'ee' as in 'see', keep your tongue there, then round your lips as if to whistle. That's ü.",
    pairs: [pair("Tür", "door", "Tour", "tour"), pair("für", "for", "fuhr", "drove"), pair("Küche", "kitchen", "Kuchen", "cake")],
  },
  {
    id: "ue-i",
    targets: [["yː", "ʏ"], ["iː", "ɪ"]],
    title: "ü or i",
    explain: "Many learners say ü like i. Germans hear a different word: Kissen (pillow) vs küssen (to kiss).",
    tip: "Start from i ('ee'), then push your lips forward into a small round shape without moving your tongue.",
    pairs: [pair("Küste", "coast", "Kiste", "box"), pair("küssen", "to kiss", "Kissen", "pillow"), pair("Tür", "door", "Tier", "animal")],
  },
  {
    id: "oe",
    targets: [["øː", "œ"], ["oː", "ɔ", "eː", "ɛ"]],
    title: "ö or o / e",
    explain: "ö sits between e and o: the tongue of e, the lips of o.",
    tip: "Say 'eh' (as in 'bed'), then round your lips. Long ö (schön) is held longer than short ö (können).",
    pairs: [
      pair("schön", "beautiful", "schon", "already"),
      pair("Öfen", "ovens", "Ofen", "oven"),
      pair("lösen", "to solve", "lesen", "to read"),
      pair("können", "can", "kennen", "to know (someone)"),
    ],
  },
  {
    id: "long-short",
    targets: [["ɑː", "eː", "iː", "oː", "uː", "yː", "øː", "ɛː"], ["a", "ɛ", "ɪ", "ɔ", "ʊ", "ʏ", "œ"]],
    title: "Long or short vowel",
    explain: "Vowel length changes meaning. A double consonant after a vowel usually means it's short; a single one, an h or a double vowel means long.",
    tip: "Hold long vowels clearly longer (Ofen: 'OOOH-fen'). Short vowels are quick and a bit more open (offen: 'OFF-en').",
    pairs: [
      pair("Ofen", "oven", "offen", "open"),
      pair("Miete", "rent", "Mitte", "middle"),
      pair("Staat", "state", "Stadt", "city"),
      pair("Beet", "flower bed", "Bett", "bed"),
      pair("Hüte", "hats", "Hütte", "hut"),
    ],
  },
  {
    id: "ch-sch",
    targets: [["ç"], ["ʃ"]],
    title: "ch or sch",
    explain: "The soft ch after e and i is not 'sh'. Kirche (church) and Kirsche (cherry) are different words.",
    tip: "For soft ch, say 'h' as in 'huge' and push more air: the tongue is high, the lips are NOT rounded. For sch, round your lips like English 'sh'.",
    pairs: [pair("Kirche", "church", "Kirsche", "cherry"), pair("mich", "me", "misch", "mix!")],
  },
  {
    id: "ich-ach",
    targets: [["ç"], ["x"]],
    title: "Soft ch (ich) or hard ch (ach)",
    explain: "After a, o, u, au the ch is made at the back of the throat. After other vowels it's the soft, hissing ch.",
    tip: "Hard ch: like clearing your throat gently, as in Scottish 'loch'. Soft ch: like a cat hissing, at the front of the mouth.",
    pairs: [pair("dich", "you", "Dach", "roof"), pair("Bücher", "books", "Buch", "book"), pair("nicht", "not", "Nacht", "night")],
  },
  {
    id: "s-z",
    targets: [["z"], ["ts"]],
    title: "s or z",
    explain: "s before a vowel buzzes like English z. The German z is 'ts'.",
    tip: "For s, let your voice buzz: 'zzz'. For z, start with a short t: 'ts'.",
    pairs: [pair("seit", "since", "Zeit", "time"), pair("so", "so", "Zoo", "zoo")],
  },
  {
    id: "r-l",
    targets: [["r", "ʁ", "ɾ"], ["l"]],
    title: "r or l",
    explain: "The German r is made in the throat, not with the tongue tip like an English r.",
    tip: "Gargle gently with no water: the back of your tongue comes close to the soft palate. For l, the tongue tip touches behind your top teeth.",
    pairs: [pair("Reise", "journey", "leise", "quiet"), pair("Rand", "edge", "Land", "country")],
  },
];

export function getSoundSet(id: string): SoundSet | undefined {
  return SOUND_SETS.find((s) => s.id === id);
}

/** Random listen-and-choose rounds: which word of the pair was played? */
export function buildPairRounds(set: SoundSet, count: number, rand: () => number) {
  const rounds: { pair: MinimalPair; played: "a" | "b" }[] = [];
  for (let i = 0; i < count; i++) {
    const p = set.pairs[i % set.pairs.length];
    rounds.push({ pair: p, played: rand() < 0.5 ? "a" : "b" });
  }
  // shuffle
  for (let i = rounds.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [rounds[i], rounds[j]] = [rounds[j], rounds[i]];
  }
  return rounds;
}
