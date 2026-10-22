import type { Metadata } from "next";
import { Suspense } from "react";
import { AiStory } from "@/components/practice/AiStory";
import { Loading } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "AI story" };

export default function AiStoryPage({ params }: PageProps<"/practice/stories/ai/[id]">) {
  return (
    <Suspense fallback={<Loading />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: Pick<PageProps<"/practice/stories/ai/[id]">, "params">) {
  const { id } = await params;
  return <AiStory key={id} id={id} />;
}
