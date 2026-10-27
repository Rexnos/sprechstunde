"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookIcon, CardsIcon, ChartIcon, ChatIcon, DictionaryIcon, GearIcon, HeadphonesIcon, HomeIcon, PeopleIcon, PulseIcon } from "@/components/ui/icons";

const GROUPS = [
  { label: null, links: [{ href: "/dashboard", label: "Home", Icon: HomeIcon }] },
  {
    label: "Learn",
    links: [
      { href: "/course", label: "Course", Icon: BookIcon },
      { href: "/practice", label: "Practice", Icon: HeadphonesIcon },
      { href: "/vocabulary", label: "Vocabulary", Icon: CardsIcon },
      { href: "/dictionary", label: "Dictionary", Icon: DictionaryIcon },
    ],
  },
  {
    label: "Speak",
    links: [
      { href: "/tutor", label: "Tutor", Icon: ChatIcon },
      { href: "/lessons", label: "Role-plays", Icon: PeopleIcon },
    ],
  },
  {
    label: "You",
    links: [
      { href: "/progress", label: "Progress", Icon: ChartIcon },
      { href: "/settings", label: "Settings", Icon: GearIcon },
      { href: "/status", label: "Status", Icon: PulseIcon },
    ],
  },
] as const;

/** Nav links with the current page highlighted. Reads the URL, so render it inside <Suspense>. */
export function NavLinks() {
  return <NavList pathname={usePathname()} />;
}

/** The same links without a highlight; the Suspense fallback while the URL isn't known yet. */
export function NavLinksFallback() {
  return <NavList pathname={null} />;
}

function NavList({ pathname }: { pathname: string | null }) {
  return (
    <div className="flex gap-1 overflow-x-auto [scrollbar-width:none] md:flex-col md:gap-5 md:overflow-visible">
      {GROUPS.map((group) => (
        <div key={group.label ?? "top"} className="contents md:block">
          {group.label && <p className="hidden px-3 pb-1.5 text-[11px] font-semibold tracking-wider text-muted/80 uppercase md:block">{group.label}</p>}
          <ul className="contents md:flex md:flex-col md:gap-0.5">
            {group.links.map(({ href, label, Icon }) => {
              const active = !!pathname && (pathname === href || pathname.startsWith(`${href}/`));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-3 rounded-full px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                      active ? "bg-surface-2 font-semibold text-ink" : "text-muted hover:bg-surface-2/60 hover:text-ink"
                    }`}
                  >
                    <Icon className={active ? "text-accent" : undefined} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
