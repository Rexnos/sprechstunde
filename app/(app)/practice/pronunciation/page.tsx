import type { Metadata } from "next";
import Link from "next/link";
import { SoundSetList } from "@/components/practice/SoundSetList";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Pronunciation" };

export default function PronunciationPage() {
  return (
    <>
      <p className="mb-1 text-xs text-muted">
        <Link href="/practice" className="hover:text-ink">
          Practice
        </Link>{" "}
        / Pronunciation
      </p>
      <PageHeader
        title="Pronunciation"
        description="Pairs of words that differ in just one sound. Learn to hear the difference first; then say both."
      />
      <SoundSetList />
    </>
  );
}
