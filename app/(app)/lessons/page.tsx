import type { Metadata } from "next";
import { LessonGrid } from "@/components/lessons/LessonGrid";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Lessons" };

export default function LessonsPage() {
  return (
    <>
      <PageHeader
        title="Lessons"
        description="Practise everyday situations. In a role-play the tutor stays in character; “End session” marks the lesson as completed."
      />
      <LessonGrid />
    </>
  );
}
