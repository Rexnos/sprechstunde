import { describe, expect, it } from "vitest";
import { wordDiff } from "@/lib/diff";

const changed = (tokens: { text: string; changed: boolean }[]) => tokens.filter((t) => t.changed).map((t) => t.text);

describe("wordDiff", () => {
  it("marks only the words that changed", () => {
    const d = wordDiff("Ich gehe gestern ins Kino.", "Ich bin gestern ins Kino gegangen.");
    expect(changed(d.before)).toEqual(["gehe"]);
    expect(changed(d.after)).toEqual(["bin", "gegangen."]);
  });

  it("ignores punctuation and case differences", () => {
    const d = wordDiff("ich sehe der mann", "Ich sehe den Mann.");
    expect(changed(d.before)).toEqual(["der"]);
    expect(changed(d.after)).toEqual(["den"]);
  });

  it("detects reordering as change", () => {
    const d = wordDiff("Gestern ich habe Fußball gespielt.", "Gestern habe ich Fußball gespielt.");
    expect(changed(d.before).length).toBeGreaterThan(0);
    expect(d.after.map((t) => t.text).join(" ")).toBe("Gestern habe ich Fußball gespielt.");
  });
});
