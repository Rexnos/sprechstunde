import Link from "next/link";
import { Suspense } from "react";
import { NavLinks, NavLinksFallback } from "@/components/layout/NavLinks";
import { StatusIndicator } from "@/components/layout/StatusIndicator";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-surface focus:p-2">
        Skip to content
      </a>
      <nav aria-label="Main" className="flex shrink-0 flex-col gap-3 border-b border-border bg-surface px-3 py-3 md:sticky md:top-0 md:h-screen md:w-60 md:border-r md:border-b-0 md:bg-bg md:py-6">
        <Link href="/dashboard" className="flex items-center gap-2 px-3 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-full bg-accent text-sm text-accent-ink" aria-hidden>
            S
          </span>
          Sprechstunde
        </Link>
        <Suspense fallback={<NavLinksFallback />}>
          <NavLinks />
        </Suspense>
        <div className="hidden md:mt-auto md:block">
          <StatusIndicator />
        </div>
      </nav>
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:px-10 md:py-10">
        {children}
      </main>
    </div>
  );
}
