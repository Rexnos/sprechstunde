import { describe, expect, it } from "vitest";
import { englishKeys, foldKey, normalizeKey, toDictDoc } from "@/lib/dictionary/transform";

// Trimmed copies of real kaikki.org German lines.
const HUND = {
  word: "Hund",
  pos: "noun",
  lang_code: "de",
  sounds: [{ ipa: "/hʊnt/" }, { rhymes: "-ʊnt" }],
  forms: [
    { form: "Hundes", tags: ["genitive"] },
    { form: "Hunde", tags: ["plural"] },
    { form: "Hünde", tags: ["error-unknown-tag", "plural"] },
    { form: "Hündchen", tags: ["diminutive", "neuter"] },
    { form: "Hündin", tags: ["feminine"] },
    { form: "Hunden", tags: ["dative", "definite", "plural"], source: "declension" },
  ],
  senses: [
    { glosses: ["dog, hound"], tags: ["masculine", "strong"], examples: [{ text: "Long quote…", type: "quotation" }] },
    { glosses: ["scoundrel; dog (mean or morally reprehensible person)"], tags: ["derogatory", "masculine", "strong"], examples: [{ text: "Du Hund!", english: "You dog!", type: "example" }] },
  ],
};

const GEHEN = {
  word: "gehen",
  pos: "verb",
  lang_code: "de",
  forms: [
    { form: "geht", tags: ["present", "singular", "third-person"] },
    { form: "ging", tags: ["past"] },
    { form: "gegangen", tags: ["participle", "past"] },
    { form: "sein", tags: ["auxiliary"] },
    { form: "de-conj", source: "conjugation", tags: ["inflection-template"] },
    { form: "bin gegangen", source: "conjugation", tags: ["first-person", "perfect"] },
  ],
  senses: [{ glosses: ["to go, to walk"], tags: ["class-7", "intransitive", "strong"] }],
};

const GING = {
  word: "ging",
  pos: "verb",
  lang_code: "de",
  senses: [{ glosses: ["first/third-person singular preterite of gehen"], tags: ["form-of", "preterite"], form_of: [{ word: "gehen" }] }],
};

describe("toDictDoc", () => {
  it("keeps gender, plural, IPA and a short example for a noun", () => {
    const doc = toDictDoc(HUND)!;
    expect(doc).toMatchObject({ word: "Hund", key: "hund", pos: "noun", gender: "m", plural: "Hunde", ipa: "/hʊnt/" });
    expect(doc.senses[0]).toEqual({ gloss: "dog, hound" }); // quotation dropped, gender/strong tags dropped
    expect(doc.senses[1]).toMatchObject({ tags: ["derogatory"], example: { de: "Du Hund!", en: "You dog!" } });
    expect(doc.formKeys).toEqual(["hundes", "hunde", "hunden"]); // not the related words Hündchen, Hündin
    expect(doc.en1).toEqual(["dog", "hound"]);
    expect(doc.enKeys).toContain("scoundrel");
  });

  it("indexes single-word verb forms but not table metadata", () => {
    const doc = toDictDoc(GEHEN)!;
    expect(doc.formKeys).toEqual(["geht", "ging", "gegangen"]);
    expect(doc.gender).toBeUndefined();
    expect(doc.senses[0]).toEqual({ gloss: "to go, to walk", tags: ["intransitive"] });
  });

  it("skips entries that are only a form of another word, and other languages", () => {
    expect(toDictDoc(GING)).toBeNull();
    expect(toDictDoc({ ...HUND, lang_code: "en" })).toBeNull();
    expect(toDictDoc({ word: "x", pos: "noun", senses: [] })).toBeNull();
  });
});

describe("keys", () => {
  it("normalises and folds umlauts the way the umlaut hint describes", () => {
    expect(normalizeKey("  Straße ")).toBe("straße");
    expect(foldKey("Grüße")).toBe("gruesse");
    expect(foldKey("schön")).toBe("schoen");
  });

  it("drops filler words and parentheses from English glosses", () => {
    expect(englishKeys("to leave, to take off (aeroplane, train)")).toEqual(["leave", "take", "off"]);
  });
});
