import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Feedback";
import { VocabularyBrowser } from "@/components/vocabulary/VocabularyBrowser";

export const metadata: Metadata = { title: "Vocabulary" };

export default function VocabularyPage() {
  return (
    <>
      <PageHeader title="Vocabulary" description="Words collected from your conversations, plus any you add yourself." />
      <VocabularyBrowser />
    </>
  );
}
