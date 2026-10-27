import type { Metadata } from "next";
import { CourseMap } from "@/components/course/CourseMap";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Course" };

export default function CoursePage() {
  return (
    <>
      <PageHeader
        title="German from zero to C1"
        description="Short units take you from your first word through A1, A2, B1 and B2 to advanced C1 German. Each lesson: learn, practise, repeat out loud, then a short guided conversation."
      />
      <CourseMap />
    </>
  );
}
