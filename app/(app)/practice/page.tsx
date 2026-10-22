import type { Metadata } from "next";
import { PracticeHub } from "@/components/practice/PracticeHub";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Practice" };

export default function PracticePage() {
  return (
    <>
      <PageHeader title="Practice" description="Short drills to train your ear, your pronunciation and your reading. Use them between lessons." />
      <PracticeHub />
    </>
  );
}
