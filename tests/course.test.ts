import { describe, expect, it } from "vitest";
import { ALL_LESSONS, allPhrases, COURSE, getCourseLesson, LEVELS, unitsByLevel } from "@/lib/course";
import { ALPHABET, checkSpelling, LETTERS, SPECIAL_LETTERS, spellOut } from "@/lib/course/alphabet";
import { buildExercises, checkBuild } from "@/lib/course/exercises";
import { scoreSpoken } from "@/lib/course/scoring";

describe("course content", () => {
  it("starts with the alphabet and has numbered units of 3–4 lessons, levels in order", () => {
    expect(COURSE[0].id).toBe("u0");
    COURSE.forEach((u, i) => expect(u.number, u.id).toBe(i));
    COURSE.forEach((u) => expect(u.id).toBe(`u${u.number}`));
    const order = LEVELS.map((l) => l.level);
    COURSE.forEach((u, i) => i > 0 && expect(order.indexOf(u.level), u.id).toBeGreaterThanOrEqual(order.indexOf(COURSE[i - 1].level)));
    expect(unitsByLevel().flatMap((l) => l.units)).toEqual(COURSE);
    expect(COURSE[0].lessons[0].letters).toHaveLength(26);
    COURSE.forEach((u) => expect(u.lessons.length).toBeGreaterThanOrEqual(3));
    COURSE.forEach((u) => expect(u.lessons.length).toBeLessThanOrEqual(4));
  });

  it("has unique ids and complete phrases and dialogues", () => {
    const ids = new Set<string>();
    for (const { lesson } of ALL_LESSONS) {
      for (const id of [lesson.id, ...lesson.phrases.map((p) => p.id)]) {
        expect(ids.has(id), `duplicate id ${id}`).toBe(false);
        ids.add(id);
      }
      expect(lesson.intro.length, lesson.id).toBeGreaterThan(40);
      expect(lesson.phrases.length, lesson.id).toBeGreaterThanOrEqual(5);
      expect(lesson.dialogue.some((d) => d.speaker === "you"), lesson.id).toBe(true);
      for (const p of lesson.phrases) {
        expect(p.de.trim() && p.en.trim(), p.id).toBeTruthy();
        expect(p.de, `${p.id} must not contain a slot`).not.toMatch(/\{/);
      }
      for (const d of lesson.dialogue) {
        expect(d.de.trim() && d.en.trim(), lesson.id).toBeTruthy();
        // slots are single lowercase words in braces
        for (const slot of d.de.match(/\{[^}]*\}/g) ?? []) expect(slot, lesson.id).toMatch(/^\{[a-z]+\}$/);
        if (d.speaker === "tutor") expect(d.de, `${lesson.id}: tutor lines can't have slots`).not.toMatch(/\{/);
      }
      if (lesson.grammar?.table) {
        const widths = new Set(lesson.grammar.table.map((r) => r.length));
        expect(widths.size, `${lesson.id} grammar table rows`).toBe(1);
      }
    }
  });

  it("finds lessons and accumulates phrases for review calls", () => {
    expect(getCourseLesson("u2-3")?.unit.number).toBe(2);
    expect(getCourseLesson("nope")).toBeUndefined();
    expect(allPhrases("u2").length).toBeGreaterThan(allPhrases("u1").length);
  });
});

describe("buildExercises", () => {
  const { unit, lesson } = getCourseLesson("u4-1")!;

  it("is deterministic for a seed and varies with the seed", () => {
    expect(buildExercises(lesson, unit, 7)).toEqual(buildExercises(lesson, unit, 7));
    expect(buildExercises(lesson, unit, 7).map((e) => e.id)).not.toEqual(buildExercises(lesson, unit, 8).map((e) => e.id));
  });

  it("always offers the correct answer and unique options, for every lesson", () => {
    for (const { unit: u, lesson: l } of ALL_LESSONS) {
      const ex = buildExercises(l, u, 3);
      expect(ex.length, l.id).toBeGreaterThanOrEqual(5);
      for (const e of ex) {
        if (e.kind === "build") {
          expect(checkBuild(e.answer, e.answer.split(" ")), e.id).toBe(true);
          expect([...e.tiles].sort()).toEqual(e.answer.split(" ").sort());
        } else if (e.kind === "spell") {
          expect(checkSpelling(e.answer, e.answer), e.id).toBe(true);
          expect(e.phrase.de, e.id).toMatch(/^(\p{Lu}|ß)(\. (\p{Lu}|ß))*\.$/u);
        } else {
          expect(e.options, e.id).toContain(e.answer);
          expect(new Set(e.options).size, e.id).toBe(e.options.length);
          expect(e.options.length, e.id).toBeGreaterThanOrEqual(2);
        }
        if (e.kind === "gap") expect(`${e.before} ${e.answer}${e.after.match(/^[.,!?]/) ? "" : " "}${e.after}`.replace(/\s+/g, " ").trim()).toBe(e.phrase.de);
      }
    }
  });
});

describe("scoreSpoken", () => {
  it("passes an exact repetition and marks every word", () => {
    const s = scoreSpoken("Ich möchte einen Kaffee, bitte.", "Ich möchte einen Kaffee, bitte.");
    expect(s.passed).toBe(true);
    expect(s.words.every((w) => w.heard)).toBe(true);
  });

  it("marks missing words and fails below the threshold", () => {
    const s = scoreSpoken("Ich möchte Kaffee", "Ich möchte einen Kaffee, bitte.");
    expect(s.words.filter((w) => !w.heard).map((w) => w.word)).toEqual(["einen", "bitte."]);
    expect(s.passed).toBe(false);
  });

  it("tolerates extra words, case, punctuation and ß/ss", () => {
    expect(scoreSpoken("ja also guten morgen", "Guten Morgen!").passed).toBe(true);
    expect(scoreSpoken("Strasse", "Straße").passed).toBe(true);
  });

  it("treats digits and number words as equal", () => {
    expect(scoreSpoken("Ich bin 25 Jahre alt", "Ich bin fünfundzwanzig Jahre alt.").passed).toBe(true);
    expect(scoreSpoken("acht neun zehn", "8, 9, 10").passed).toBe(true);
  });

  it("matches {slot} answers with any words", () => {
    expect(scoreSpoken("Ich heiße Jithin", "Ich heiße {name}.").passed).toBe(true);
    expect(scoreSpoken("Ich heiße", "Ich heiße {name}.").passed).toBe(false);
  });

  it("uses accepted variants", () => {
    const s = scoreSpoken("Danke!", "Danke schön!", ["Danke!"]);
    expect(s.passed).toBe(true);
    expect(s.matched).toBe("Danke!");
  });

  it("fails on silence", () => {
    expect(scoreSpoken("", "Hallo").passed).toBe(false);
  });
});

describe("alphabet", () => {
  it("has A–Z plus Ä Ö Ü ß, each once, with a name, example and TTS text", () => {
    expect(LETTERS.map((l) => l.letter).join("")).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    expect(SPECIAL_LETTERS.map((l) => l.letter)).toEqual(["Ä", "Ö", "Ü", "ß"]);
    expect(new Set(ALPHABET.map((l) => l.letter)).size).toBe(30);
    for (const l of ALPHABET) expect(l.name && l.say && l.example && l.exampleEn, l.letter).toBeTruthy();
  });

  it("spells words letter by letter, keeping ß and double letters", () => {
    expect(spellOut("Brot")).toBe("B. R. O. T.");
    expect(spellOut("Straße")).toBe("S. T. R. A. ß. E.");
    expect(spellOut("Wasser")).toBe("W. A. S. S. E. R.");
  });

  it("checks spelling ignoring case and accepting ae/oe/ue/ss", () => {
    expect(checkSpelling("Brot", "brot")).toBe(true);
    expect(checkSpelling("Müller", "Mueller")).toBe(true);
    expect(checkSpelling("Straße", "strasse")).toBe(true);
    expect(checkSpelling("Köln", "Koln")).toBe(false);
    expect(checkSpelling("Brot", "")).toBe(false);
  });

  it("builds letter and spelling exercises for alphabet lessons", () => {
    const { unit, lesson } = getCourseLesson("u0-1")!;
    const ex = buildExercises(lesson, unit, 5);
    expect(ex.some((e) => e.kind === "letter")).toBe(true);
    expect(ex.some((e) => e.kind === "spell")).toBe(true);
    const special = getCourseLesson("u0-2")!;
    for (const e of buildExercises(special.lesson, special.unit, 5).filter((e) => e.kind === "letter")) {
      if (e.kind === "letter") expect(e.options).toHaveLength(4);
    }
  });

  it("matches spoken letter names against letters", () => {
    expect(scoreSpoken("Be wie Brot", "B wie Brot.").passed).toBe(true);
    expect(scoreSpoken("Jott wie Jahr", "J wie Jahr.").passed).toBe(true);
    expect(scoreSpoken("Ich buchstabiere M A X", "Ich buchstabiere: {letters}").passed).toBe(true);
  });
});
