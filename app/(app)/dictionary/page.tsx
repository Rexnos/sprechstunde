import type { Metadata } from "next";
import { DictionaryBrowser } from "@/components/dictionary/DictionaryBrowser";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Dictionary" };

export default function DictionaryPage() {
  return (
    <>
      <PageHeader title="Dictionary" description="Look up any German word, or type English to find the German. Works offline." />
      <DictionaryBrowser />
    </>
  );
}
