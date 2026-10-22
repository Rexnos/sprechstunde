import type { Metadata } from "next";
import Link from "next/link";
import { StoryList } from "@/components/practice/StoryList";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Stories" };

export default function StoriesPage() {
  return (
    <>
      <p className="mb-1 text-xs text-muted">
        <Link href="/practice" className="hover:text-ink">
          Practice
        </Link>{" "}
        / Stories
      </p>
      <PageHeader
        title="Stories"
        description="One short story per unit, using words you've learned. Listen first, then read along and tap words you don't know."
      />
      <StoryList />
    </>
  );
}
