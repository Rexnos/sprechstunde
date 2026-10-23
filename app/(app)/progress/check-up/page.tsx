import type { Metadata } from "next";
import Link from "next/link";
import { CheckupTest } from "@/components/progress/CheckupTest";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Weekly check-up" };

export default function CheckupPage() {
  return (
    <>
      <p className="mb-1 text-xs text-muted">
        <Link href="/progress" className="hover:text-ink">
          Progress
        </Link>{" "}
        / Weekly check-up
      </p>
      <PageHeader title="Weekly check-up" description="See how much you've learned this week, skill by skill." />
      <CheckupTest />
    </>
  );
}
