import { describe, expect, it } from "vitest";
import { countSounds, soundRichness, stemsFrom, unknownRatio, unknownWords, validateSentences, validateStory } from "@/lib/practice/validate";
import { courseDictionary } from "@/lib/practice/dictionary";
import { getSoundSet, SOUND_SETS } from "@/lib/pronunciation";

describe("pronunciation sentences", () => {
  // IPA exactly as Piper (de_DE-thorsten-medium) produced it.
  const IPA: Record<string, string> = {
    "Die Tür ist für dich.": "diː tˈyːɾ ɪst fyːɾ dˈɪç.",
    "Ich gehe gut zur Uhr.": "ɪç ɡˈeːə ɡˈuːt tsuːɾ ˈuːɾ.",
    "Der Kuchen in der Küche ist süß.": "dɛɾ kˈuːxən ɪn dɛɾ kˈʏçə ɪst zˈyːs.",
    "Mein Bruder fährt mit dem Zug.": "maɪn brˈuːdɜ fˈɛːɾt mɪt deːm tsˈuːk.",
  };
  const ueU = getSoundSet("ue-u")!;

  it("counts target sounds without double counting", () => {
    expect(countSounds(IPA["Der Kuchen in der Küche ist süß."], ueU.targets[0])).toBe(2);
    expect(countSounds(IPA["Der Kuchen in der Küche ist süß."], ueU.targets[1])).toBe(1);
  });

  it("rates sentences by how much of the harder sound they contain", () => {
    expect(soundRichness(IPA["Der Kuchen in der Küche ist süß."], ueU.targets)).toBeCloseTo(2.1);
    expect(soundRichness(IPA["Die Tür ist für dich."], ueU.targets)).toBe(2);
    expect(soundRichness(IPA["Ich gehe gut zur Uhr."], ueU.targets)).toBe(0); // no ü at all
    expect(soundRichness("tˈyːɾ", ueU.targets)).toBe(0); // a single sound isn't enough
    expect(soundRichness("diː tˈyːɾ ɪst fyːɾ dˈɪç, zˈyːs!", ueU.targets)).toBe(3);
  });

  it("matches ç however it is encoded (Piper uses c + combining cedilla)", () => {
    const decomposed = "ɪç ʃprˈɛçə dˈɔøtʃ."; // "Ich spreche Deutsch." as Piper writes it
    const chSch = getSoundSet("ch-sch")!;
    expect(countSounds(decomposed, chSch.targets[0])).toBe(2);
    expect(soundRichness(decomposed, chSch.targets)).toBeGreaterThan(0);
  });

  it("every sound set has targets on both sides", () => {
    for (const set of SOUND_SETS) expect(set.targets[0].length && set.targets[1].length, set.id).toBeTruthy();
  });
});

describe("known-vocabulary checks", () => {
  const stems = stemsFrom(["Ich gehe ins Kino.", "Guten Morgen!", "Ich trinke gern Kaffee."]);

  it("matches inflected forms by stem and ignores function words", () => {
    expect(unknownWords(["Er trinkt Kaffee im Kino."], stems)).toEqual([]);
    expect(unknownWords(["Der Elefant trinkt Kaffee."], stems)).toEqual(["elefant"]);
    expect(unknownRatio(["Der Elefant trinkt Kaffee."], stems)).toBeCloseTo(1 / 3);
  });
});

describe("validateStory", () => {
  const stems = stemsFrom(["Anna geht ins Café.", "Sie trinkt einen Kaffee.", "Der Kaffee ist gut.", "Danke!", "Tschüss!", "Sie zahlt.", "Das kostet drei Euro."]);
  const good = {
    title: "Anna im Café",
    blurb: "Anna drinks a coffee.",
    sentences: [
      { de: "Anna geht ins Café.", en: "Anna goes to the café." },
      { de: "Sie trinkt einen Kaffee.", en: "She drinks a coffee." },
      { de: "Der Kaffee ist gut.", en: "The coffee is good." },
      { de: "Das kostet drei Euro.", en: "That costs three euros." },
      { de: "Anna zahlt.", en: "Anna pays." },
      { de: "„Danke! Tschüss!“", en: "“Thanks! Bye!”" },
    ],
    glossary: [
      { word: "Anna", meaning: "Anna (name)" }, { word: "geht", meaning: "goes" }, { word: "Café", meaning: "café" },
      { word: "trinkt", meaning: "drinks" }, { word: "Kaffee", meaning: "coffee" }, { word: "gut", meaning: "good" },
      { word: "kostet", meaning: "costs" }, { word: "drei", meaning: "three" }, { word: "Euro", meaning: "euro" },
      { word: "zahlt", meaning: "pays" }, { word: "Danke", meaning: "thanks" }, { word: "Tschüss", meaning: "bye" },
    ],
    questions: [
      { q: "Where does Anna go?", options: ["To a café", "To work", "Home"], answer: "To a café" },
      { q: "What does she drink?", options: ["Coffee", "Tea", "Water"], answer: "Coffee" },
      { q: "How much is it?", options: ["3 euros", "5 euros", "1 euro"], answer: "3 euros" },
    ],
  };

  it("accepts a good story and fills the glossary map", () => {
    const r = validateStory(good, stems);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.story.glossary["kaffee"]).toBe("coffee");
  });

  it("fills glossary gaps from the course dictionary", () => {
    const thin = { ...good, glossary: good.glossary.filter((g) => !["Kaffee", "trinkt", "gut"].includes(g.word)) };
    expect(validateStory(thin, stems).ok).toBe(false);
    const dict = courseDictionary();
    expect(dict.get("kaffee")).toBeTruthy();
    const r = validateStory(thin, stems, dict);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.story.glossary["kaffee"]).toBe(dict.get("kaffee"));
  });

  it("rejects too few sentences, bad questions and unknown vocabulary", () => {
    const short = validateStory({ ...good, sentences: good.sentences.slice(0, 3) }, stems);
    expect(short.ok).toBe(false);
    const badQ = validateStory({ ...good, questions: [{ ...good.questions[0], answer: "Mars" }, ...good.questions.slice(1)] }, stems);
    expect(badQ.ok).toBe(false);
    const hard = validateStory(
      { ...good, sentences: good.sentences.map((s) => ({ ...s, de: "Der Elefant philosophiert über Quantenmechanik." })) },
      stems,
    );
    expect(hard.ok).toBe(false);
    if (!hard.ok) expect(hard.unknown).toContain("elefant");
    expect(validateStory({ random: true }, stems).ok).toBe(false);
  });
});

describe("validateSentences", () => {
  const stems = stemsFrom(["Ich trinke gern Kaffee.", "Ich gehe ins Kino.", "Heute ist Montag."]);
  it("keeps short known sentences and drops duplicates, long ones and unknown words", () => {
    const raw = {
      sentences: [
        { de: "Heute trinke ich Kaffee.", en: "Today I drink coffee." },
        { de: "Ich gehe ins Kino.", en: "dup of existing" },
        { de: "Heute trinke ich Kaffee.", en: "dup within batch" },
        { de: "Kaffee.", en: "too short" },
        { de: "Der Elefant liest Philosophie.", en: "unknown words" },
        { de: "Ich gehe heute ins Kino", en: "no final punctuation" },
      ],
    };
    const r = validateSentences(raw, stems, new Set(["Ich gehe ins Kino."]));
    expect(r.sentences.map((s) => s.de)).toEqual(["Heute trinke ich Kaffee."]);
    expect(r.rejected).toBe(5);
  });
});
