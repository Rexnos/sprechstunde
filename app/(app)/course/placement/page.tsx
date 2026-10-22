import type { Metadata } from "next";
import Link from "next/link";
import { PlacementTest } from "@/components/course/PlacementTest";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Placement test" };

export default function PlacementPage() {
  return (
    <>
      <p className="mb-1 text-xs text-muted">
        <Link href="/course" className="hover:text-ink">
          Course
        </Link>{" "}
        / Placement test
      </p>
      <PageHeader title="Find your starting point" description="Already know some German? Skip what you know." />
      <PlacementTest />
    </>
  );
}
