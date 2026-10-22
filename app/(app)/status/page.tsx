import type { Metadata } from "next";
import { StatusPanel } from "@/components/layout/StatusPanel";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Status" };

export default function StatusPage() {
  return (
    <>
      <PageHeader title="Local services" description="Everything runs on this PC. This page shows which parts are ready." />
      <StatusPanel />
    </>
  );
}
