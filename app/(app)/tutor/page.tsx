import type { Metadata } from "next";
import { Suspense } from "react";
import { SessionList } from "@/components/tutor/SessionList";
import { TutorRoom } from "@/components/tutor/TutorRoom";
import { Loading, PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Tutor" };

export default function TutorPage({ searchParams }: PageProps<"/tutor">) {
  return (
    <Suspense fallback={<Loading />}>
      <TutorContent searchParams={searchParams} />
    </Suspense>
  );
}

async function TutorContent({ searchParams }: Pick<PageProps<"/tutor">, "searchParams">) {
  const { session } = await searchParams;
  if (typeof session === "string" && session) return <TutorRoom key={session} sessionId={session} />;
  return (
    <>
      <PageHeader title="Tutor" description="Continue a conversation or start a new one." />
      <SessionList />
    </>
  );
}
