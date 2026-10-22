import type { Metadata } from "next";
import Link from "next/link";
import { Dictation } from "@/components/practice/Dictation";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Listening & dictation" };

export default function ListenPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-1 text-xs text-muted">
        <Link href="/practice" className="hover:text-ink">
          Practice
        </Link>{" "}
        / Listening
      </p>
      <PageHeader title="Listening & dictation" description="Sentences from your finished lessons. Listen, then type exactly what you hear." />
      <Dictation />
    </div>
  );
}
