"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type NavProfile = { name: string; initials: string } | null;

type Tab = { href: string; label: string; icon: ReactNode; match: (p: string) => boolean };

const svg = (d: ReactNode) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
    {d}
  </svg>
);

const TABS: Tab[] = [
  { href: "/", label: "Home", icon: svg(<path d="M3 11 L12 3 L21 11 V21 H15 V14 H9 V21 H3 Z" />), match: (p) => p === "/" },
  {
    href: "/subjects",
    label: "Subjects",
    icon: svg(<><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10.5" r="3" /><path d="M9 17 H15" /></>),
    match: (p) => p.startsWith("/subjects"),
  },
  {
    href: "/quiz",
    label: "Quiz",
    icon: svg(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5 a2.5 2.5 0 1 1 3.5 2.3 c-.7.4 -1 .9 -1 1.7" /><path d="M12 17 v.01" /></>),
    match: (p) => p.startsWith("/quiz"),
  },
  { href: "/metrics", label: "Metrics", icon: svg(<path d="M5 20 V13 M12 20 V5 M19 20 V9" />), match: (p) => p.startsWith("/metrics") },
  {
    href: "/profile",
    label: "Profile",
    icon: svg(<><circle cx="12" cy="8" r="4" /><path d="M4 21 c0-4.5 3.6-7 8-7 s8 2.5 8 7" /></>),
    match: (p) => p.startsWith("/profile"),
  },
];

// Immersive screens hide the nav on every width: topic reading, quiz in progress,
// result and review (/quiz/…), and the global leaderboard. The /quiz hub keeps it.
export function isImmersive(pathname: string) {
  return pathname.startsWith("/topics/") || pathname.startsWith("/quiz/") || pathname.startsWith("/leaderboard");
}

export const NAV_HEIGHT = 78; // px, mobile and tablet bar

export function AppNav({ pathname, profile }: { pathname: string; profile: NavProfile }) {
  return (
    <>
      {/* Mobile and tablet: bottom bar */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-50 flex border-t-[1.5px] border-ink bg-paper px-1.5 pb-[calc(6px+env(safe-area-inset-bottom))] xl:hidden"
        style={{ height: `calc(${NAV_HEIGHT}px + env(safe-area-inset-bottom))` }}
      >
        {TABS.map((t) => {
          const active = t.match(pathname);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-label={t.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-w-11 flex-1 flex-col items-center justify-center gap-1 transition-colors",
                active ? "text-tomato" : "text-muted-ink hover:text-ink"
              )}
            >
              {active && <span aria-hidden="true" className="absolute -top-px left-1/2 h-1 w-7 -translate-x-1/2 rounded-b-[3px] bg-tomato" />}
              {t.icon}
              <span className="font-mono text-[10px] font-bold tracking-[0.08em] uppercase">{t.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Desktop: fixed 264px sidebar */}
      <aside
        aria-label="Main"
        className="fixed inset-y-0 left-0 z-50 hidden w-[264px] flex-col gap-1.5 border-r-[1.5px] border-ink px-5 pt-8 pb-6 xl:flex"
      >
        <Link href="/" className="px-2 pb-[22px] font-display text-[30px] leading-none font-black tracking-[0.04em] text-tomato">
          WICKY
        </Link>
        {TABS.map((t) => {
          const active = t.match(pathname);
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-[52px] items-center gap-3.5 rounded-lg border-[1.5px] px-4 text-[17px] font-semibold transition-colors",
                active ? "border-ink bg-field text-tomato" : "border-transparent text-ink hover:bg-kraft"
              )}
            >
              {t.icon}
              {t.label}
            </Link>
          );
        })}
        <Link
          href="/profile"
          className="mt-auto flex min-h-14 items-center gap-3 rounded-lg border-[1.5px] border-ink bg-field p-3 text-ink"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-field font-display text-base font-black text-tomato"
          >
            {profile?.initials ?? "?"}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] leading-tight font-semibold">{profile?.name ?? "Your profile"}</span>
            <span className="block font-mono text-[10px] font-bold tracking-[0.1em] text-muted-ink">VIEW PASSPORT</span>
          </span>
        </Link>
      </aside>
    </>
  );
}
