"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SubjectTabs({ subjectId }: { subjectId: number }) {
  const pathname = usePathname();
  const base = `/subjects/${subjectId}`;
  const tabs = [
    { label: "Overview", href: base, active: pathname === base },
    { label: "Roadmap", href: `${base}/roadmap`, active: pathname.startsWith(`${base}/roadmap`) },
    { label: "Leaderboard", href: `${base}/leaderboard`, active: pathname.startsWith(`${base}/leaderboard`) },
  ];
  return (
    <nav aria-label="Subject sections" className="mx-[22px] mt-[18px] flex border-b-[1.5px] border-ink md:mx-12 xl:mx-14">
      {tabs.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={t.active ? "page" : undefined}
          className={cn(
            "-mb-[1.5px] min-h-11 flex-1 border-b-4 pt-3.5 pb-3 text-center font-mono text-xs font-bold tracking-[0.1em] uppercase",
            t.active ? "border-tomato text-ink" : "border-transparent text-muted-ink hover:text-ink",
          )}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
