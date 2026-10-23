/**
 * Turns one line of the kaikki.org German Wiktionary extract into a compact
 * dictionary document. Pure, so the import script and tests can share it.
 */

export type Gender = "m" | "f" | "n";

export type DictSense = { gloss: string; tags?: string[]; example?: { de: string; en?: string } };

/** What the Dictionary page shows for one entry. */
export type DictEntry = {
  word: string;
  pos: string;
  gender?: Gender;
  plural?: string;
  ipa?: string;
  senses: DictSense[];
};

export type DictEntryDTO = DictEntry & { id: string };

/** A stored entry: the visible fields plus the lookup keys. */
export type DictDoc = DictEntry & {
  key: string; // the headword, normalised
  fold: string; // the headword spelled without umlauts/ß (für → fuer)
  formKeys: string[]; // inflected forms (ging, gegangen, Hunde) that lead to this headword
  en1: string[]; // English words from the first sense, ranked first in English search
  enKeys: string[]; // English words from all senses
};

type RawSense = { glosses?: string[]; tags?: string[]; form_of?: unknown[]; examples?: { text?: string; english?: string; type?: string }[] };
type RawEntry = {
  word?: string;
  pos?: string;
  lang_code?: string;
  senses?: RawSense[];
  forms?: { form?: string; tags?: string[]; source?: string }[];
  sounds?: { ipa?: string }[];
};

const MAX_SENSES = 8;
const MAX_EXAMPLE = 200;
// Bookkeeping rows in kaikki's inflection tables, not real word forms.
const META_FORM_TAGS = new Set(["table-tags", "inflection-template", "class", "auxiliary", "error-unknown-tag", "romanization"]);
const GENDER_TAGS: Record<string, Gender> = { masculine: "m", feminine: "f", neuter: "n" };
const EN_STOPWORDS = new Set(
  "a an the to of or and in on at for with by from as be is are into out up one's oneself someone something somebody etc".split(" "),
);

export function normalizeKey(s: string): string {
  return s.normalize("NFC").trim().toLowerCase();
}

/** The spelling without a German keyboard (ae, oe, ue, ss), as the umlaut hint in the app suggests. */
export function foldKey(s: string): string {
  return normalizeKey(s).replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss");
}

/** English gloss → search words: drops parentheses, punctuation and filler words. */
export function englishKeys(gloss: string): string[] {
  const words = gloss
    .replace(/\([^)]*\)/g, " ")
    .toLowerCase()
    .split(/[^a-z'-]+/)
    .map((w) => w.replace(/^['-]+|['-]+$/g, ""));
  return [...new Set(words.filter((w) => w.length > 1 && !EN_STOPWORDS.has(w)))];
}

export function toDictDoc(raw: RawEntry): DictDoc | null {
  if (!raw.word || !raw.pos || (raw.lang_code && raw.lang_code !== "de")) return null;

  // Senses that only say "past tense of gehen" are skipped: the lemma's forms already point here.
  const real = (raw.senses ?? []).filter((s) => s.glosses?.length && !s.form_of && !s.tags?.includes("form-of"));
  if (!real.length) return null;

  const senses: DictSense[] = real.slice(0, MAX_SENSES).map((s) => {
    const tags = s.tags?.filter((t) => !GENDER_TAGS[t] && t !== "strong" && t !== "weak" && !t.startsWith("class-"));
    const ex = s.examples?.find((e) => e.type !== "quotation" && e.text && e.text.length <= MAX_EXAMPLE);
    const english = ex?.english && !ex.english.startsWith("(please add") ? ex.english : undefined;
    return {
      gloss: s.glosses!.join("; "),
      ...(tags?.length ? { tags } : {}),
      ...(ex ? { example: { de: ex.text!, ...(english ? { en: english } : {}) } } : {}),
    };
  });

  const forms = (raw.forms ?? []).filter((f) => f.form && !f.tags?.some((t) => META_FORM_TAGS.has(t)));
  const key = normalizeKey(raw.word);
  const formKeys = [
    ...new Set(
      forms
        // Related words in the noun header (Rüde, Hündin, Hündchen) have entries of their own.
        .filter((f) => !f.tags?.length || !(f.tags.includes("diminutive") || f.tags.every((t) => GENDER_TAGS[t])))
        .map((f) => normalizeKey(f.form!))
        // Multi-word forms ("am schönsten", "bin gegangen") would make every helper word match.
        .filter((f) => f !== key && f !== "-" && !/\s/.test(f)),
    ),
  ];

  const genderTag = real[0].tags?.find((t) => GENDER_TAGS[t]);
  const gender = raw.pos === "noun" && genderTag ? GENDER_TAGS[genderTag] : undefined;
  const plural =
    raw.pos === "noun"
      ? forms.find((f) => !f.source && f.tags?.includes("plural") && !f.tags.includes("diminutive"))?.form
      : undefined;
  const ipa = raw.sounds?.find((s) => s.ipa)?.ipa;

  return {
    word: raw.word,
    pos: raw.pos,
    ...(gender ? { gender } : {}),
    ...(plural && plural !== "-" ? { plural } : {}),
    ...(ipa ? { ipa } : {}),
    senses,
    key,
    fold: foldKey(raw.word),
    formKeys,
    en1: englishKeys(senses[0].gloss),
    enKeys: [...new Set(senses.flatMap((s) => englishKeys(s.gloss)))],
  };
}
