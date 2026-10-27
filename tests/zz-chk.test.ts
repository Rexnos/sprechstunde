import { it } from "vitest";
import { COURSE } from "@/lib/course";
it("dups", () => {
  for (const u of COURSE.filter((u) => u.number >= 9 && u.number <= 12)) {
    const en = u.lessons.flatMap((l) => l.phrases.map((p) => p.en.toLowerCase()));
    const de = u.lessons.flatMap((l) => l.phrases.map((p) => p.de));
    const d = [en.filter((e, i) => en.indexOf(e) !== i), de.filter((e, i) => de.indexOf(e) !== i)]; if (d.flat().length) throw new Error(u.id + JSON.stringify(d));
  }
});
