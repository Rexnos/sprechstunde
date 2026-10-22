import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { CallRoom } from "@/components/call/CallRoom";
import { Loading } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Call" };

export default function CallPage({ searchParams }: PageProps<"/call">) {
  return (
    <Suspense fallback={<Loading label="Connecting…" />}>
      <CallContent searchParams={searchParams} />
    </Suspense>
  );
}

async function CallContent({ searchParams }: Pick<PageProps<"/call">, "searchParams">) {
  const { session } = await searchParams;
  if (typeof session !== "string" || !session) redirect("/tutor");
  return <CallRoom key={session} sessionId={session} />;
}
