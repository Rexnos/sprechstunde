import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PronunciationSet } from "@/components/practice/PronunciationSet";
import { PageHeader } from "@/components/ui/Feedback";
import { getSoundSet, SOUND_SETS } from "@/lib/pronunciation";

export const metadata: Metadata = { title: "Pronunciation" };

export function generateStaticParams() {
  return SOUND_SETS.map((s) => ({ setId: s.id }));
}

export default async function SoundSetPage({ params }: PageProps<"/practice/pronunciation/[setId]">) {
  const { setId } = await params;
  const set = getSoundSet(setId);
  if (!set) notFound();
  return (
    <>
      <p className="mb-1 text-xs text-muted">
        <Link href="/practice/pronunciation" className="hover:text-ink">
          Pronunciation
        </Link>{" "}
        / {set.title}
      </p>
      <PageHeader title={set.title} />
      <PronunciationSet set={set} />
    </>
  );
}
