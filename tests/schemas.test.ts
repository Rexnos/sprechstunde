import { describe, expect, it } from "vitest";
import { pickMimeType } from "@/components/audio/useRecorder";
import { ChatRequestSchema, SettingsPatchSchema, SynthesizeRequestSchema, VocabPatchSchema } from "@/lib/schemas";

describe("request schemas", () => {
  it("validates chat requests", () => {
    expect(ChatRequestSchema.parse({ sessionId: "abc", message: "  Hallo  " })).toEqual({ sessionId: "abc", message: "Hallo", inputMethod: "text" });
    expect(ChatRequestSchema.safeParse({ sessionId: "abc", message: "   " }).success).toBe(false);
    expect(ChatRequestSchema.safeParse({ sessionId: "abc", message: "x".repeat(1001) }).success).toBe(false);
  });

  it("rejects unknown or out-of-range settings", () => {
    expect(SettingsPatchSchema.safeParse({ level: "A2" }).success).toBe(true);
    expect(SettingsPatchSchema.safeParse({ level: "Z9" }).success).toBe(false);
    expect(SettingsPatchSchema.safeParse({ speechRate: 3 }).success).toBe(false);
    expect(SettingsPatchSchema.safeParse({ isAdmin: true }).success).toBe(false);
  });

  it("limits synthesis text length", () => {
    expect(SynthesizeRequestSchema.safeParse({ text: "Hallo" }).success).toBe(true);
    expect(SynthesizeRequestSchema.safeParse({ text: "a".repeat(601) }).success).toBe(false);
  });

  it("accepts either a review result or an edit for vocabulary", () => {
    expect(VocabPatchSchema.safeParse({ result: "good" }).success).toBe(true);
    expect(VocabPatchSchema.safeParse({ meaning: "the order" }).success).toBe(true);
    expect(VocabPatchSchema.safeParse({ result: "perfect" }).success).toBe(false);
    expect(VocabPatchSchema.safeParse({ reviewState: "known" }).success).toBe(false);
  });
});

describe("pickMimeType", () => {
  it("prefers opus in webm and falls back by browser support", () => {
    expect(pickMimeType(() => true)).toBe("audio/webm;codecs=opus");
    expect(pickMimeType((t) => t === "audio/mp4")).toBe("audio/mp4");
    expect(pickMimeType(() => false)).toBeUndefined();
  });
});
