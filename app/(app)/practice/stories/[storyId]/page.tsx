import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryReader } from "@/components/practice/StoryReader";
import { PageHeader } from "@/components/ui/Feedback";
import { getUnit } from "@/lib/course";
import { getStory, STORIES } from "@/lib/stories";

export const metadata: Metadata = { title: "Story" };

export function generateStaticParams() {
  return STORIES.map((s) => ({ storyId: s.id }));
}

export default async function StoryPage({ params }: PageProps<"/practice/stories/[storyId]">) {
  const { storyId } = await params;
  const story = getStory(storyId);
  if (!story) notFound();
  const unit = getUnit(story.unitId)!;
  return (
    <>
      <p className="mb-1 text-xs text-muted">
        <Link href="/practice/stories" className="hover:text-ink">
          Stories
        </Link>{" "}
        / Unit {unit.number}
      </p>
      <PageHeader title={story.title} description={story.blurb} />
      <StoryReader story={story} />
    </>
  );
}
