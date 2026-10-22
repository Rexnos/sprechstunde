import type { Metadata } from "next";
import { CourseMap } from "@/components/course/CourseMap";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Course" };

export default function CoursePage() {
  return (
    <>
      <PageHeader
        title="German from zero"
        description="Eight short units take you from your first word to everyday A1 conversations. Each lesson: learn, practise, repeat out loud, then a short guided conversation."
      />
      <CourseMap />
    </>
  );
}
