"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookIcon, CardsIcon, ChartIcon, ChatIcon, DictionaryIcon, GearIcon, HeadphonesIcon, HomeIcon, PeopleIcon, PulseIcon } from "@/components/ui/icons";

const LINKS = [
  { href: "/dashboard", label: "Home", Icon: HomeIcon },
  { href: "/course", label: "Course", Icon: BookIcon },
  { href: "/practice", label: "Practice", Icon: HeadphonesIcon },
  { href: "/tutor", label: "Tutor", Icon: ChatIcon },
  { href: "/lessons", label: "Role-plays", Icon: PeopleIcon },
  { href: "/vocabulary", label: "Vocabulary", Icon: CardsIcon },
  { href: "/dictionary", label: "Dictionary", Icon: DictionaryIcon },
  { href: "/progress", label: "Progress", Icon: ChartIcon },
  { href: "/settings", label: "Settings", Icon: GearIcon },
  { href: "/status", label: "Status", Icon: PulseIcon },
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
    <ul className="flex gap-1 overflow-x-auto md:flex-col">
      {LINKS.map(({ href, label, Icon }) => {
        const active = !!pathname && (pathname === href || pathname.startsWith(`${href}/`));
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-full px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                active ? "bg-surface-2 font-semibold text-ink" : "text-muted hover:bg-surface-2/60 hover:text-ink"
              }`}
            >
              <Icon />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
