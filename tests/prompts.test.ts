import { describe, expect, it } from "vitest";
import { getLesson } from "@/lib/lessons";
import { buildTutorSystemPrompt } from "@/lib/prompts";
import { DEFAULT_SETTINGS } from "@/lib/schemas";

const settings = { ...DEFAULT_SETTINGS };

describe("buildTutorSystemPrompt", () => {
  it("includes level, languages and the JSON contract", () => {
    const p = buildTutorSystemPrompt({ settings: { ...settings, level: "B1" }, mode: "conversation" });
    expect(p).toContain("CEFR): B1");
    expect(p).toContain("native language is English");
    expect(p).toMatch(/"reply": string/);
    expect(p).toMatch(/Acceptable alternative phrasing is NOT an error/);
  });

  it("uses the lesson scenario and tutor role in role-play", () => {
    const lesson = getLesson("cafe")!;
    const p = buildTutorSystemPrompt({ settings, mode: "roleplay", lesson });
    expect(p).toContain(lesson.scenario);
    expect(p).toContain(lesson.tutorRole);
    expect(p).toContain("die Speisekarte");
  });

  it("lists practice terms in vocabulary mode", () => {
    const p = buildTutorSystemPrompt({ settings, mode: "vocabulary", practiceTerms: [{ term: "das Gleis", meaning: "platform" }] });
    expect(p).toContain("das Gleis (platform)");
    expect(p).toMatch(/Do not list the answers/);
  });

  it("respects correction frequency and explanation language", () => {
    expect(buildTutorSystemPrompt({ settings: { ...settings, correctionFrequency: "off" }, mode: "conversation" })).toContain(
      "Always set correction to null",
    );
    expect(buildTutorSystemPrompt({ settings: { ...settings, explanationLanguage: "simple-target" }, mode: "conversation" })).toContain(
      "in very simple German",
    );
  });
});
