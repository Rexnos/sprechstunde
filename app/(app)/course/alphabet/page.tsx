import type { Metadata } from "next";
import Link from "next/link";
import { AlphabetChart } from "@/components/course/AlphabetChart";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Alphabet" };

export default function AlphabetPage() {
  return (
    <>
      <p className="mb-1 text-xs text-muted">
        <Link href="/course" className="hover:text-ink">
          Course
        </Link>{" "}
        / Alphabet
      </p>
      <PageHeader
        title="Das Alphabet"
        description="Tap a letter, or type it, to hear its German name and an example word. Repeat each one out loud."
      />
      <AlphabetChart />
    </>
  );
}
