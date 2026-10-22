import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LessonPlayer } from "@/components/course/LessonPlayer";
import { Loading } from "@/components/ui/Feedback";
import { ALL_LESSONS, getCourseLesson } from "@/lib/course";

export const metadata: Metadata = { title: "Lesson" };

// Lessons are static content, so every lesson page can be prerendered.
export function generateStaticParams() {
  return ALL_LESSONS.map(({ lesson }) => ({ lessonId: lesson.id }));
}

export default function LessonPage({ params }: PageProps<"/course/[lessonId]">) {
  return (
    <Suspense fallback={<Loading />}>
      <Lesson params={params} />
    </Suspense>
  );
}

async function Lesson({ params }: Pick<PageProps<"/course/[lessonId]">, "params">) {
  const { lessonId } = await params;
  if (!getCourseLesson(lessonId)) notFound();
  return <LessonPlayer key={lessonId} lessonId={lessonId} />;
}
