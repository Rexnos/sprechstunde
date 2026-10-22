import type { Metadata } from "next";
import { ProgressView } from "@/components/progress/ProgressView";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Progress" };

export default function ProgressPage() {
  return (
    <>
      <PageHeader title="Progress" description="What you have practised so far." />
      <ProgressView />
    </>
  );
}
