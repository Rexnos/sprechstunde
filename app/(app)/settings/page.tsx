import type { Metadata } from "next";
import { DataControls } from "@/components/settings/DataControls";
import { SettingsForm } from "@/components/settings/SettingsForm";
import { PageHeader } from "@/components/ui/Feedback";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" />
      <div className="space-y-6">
        <SettingsForm />
        <DataControls />
      </div>
    </>
  );
}
