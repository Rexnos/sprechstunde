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
      <nav aria-label="Main" className="flex shrink-0 flex-col gap-3 border-b border-border bg-surface px-3 py-3 md:sticky md:top-0 md:h-screen md:w-60 md:gap-7 md:overflow-y-auto md:border-r md:border-b-0 md:bg-bg md:py-6">
        <Link href="/dashboard" className="flex items-center gap-2.5 px-3 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
          {/* German opening and closing quotes: „ low, “ high. The app is about saying things. */}
          <svg viewBox="0 0 32 32" className="size-8 shrink-0 rounded-xl bg-accent text-accent-ink" aria-hidden>
            <g fill="currentColor" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {[7.5, 13].map((x) => (
                <g key={`lo${x}`}>
                  <circle cx={x} cy={21} r={2.3} stroke="none" />
                  <path d={`M${x + 2.1} 21.4q0 3.6-3.4 5.2`} fill="none" />
                </g>
              ))}
              {[19, 24.5].map((x) => (
                <g key={`hi${x}`}>
                  <circle cx={x} cy={11} r={2.3} stroke="none" />
                  <path d={`M${x - 2.1} 10.6q0-3.6 3.4-5.2`} fill="none" />
                </g>
              ))}
            </g>
          </svg>
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
