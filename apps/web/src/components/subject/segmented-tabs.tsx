"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Tab = {
  label: string;
  href: string;
};

type SegmentedTabsProps = {
  tabs: Tab[];
  ariaLabel?: string;
};

export function SegmentedTabs({
  tabs,
  ariaLabel = "Section views",
}: SegmentedTabsProps) {
  const pathname = usePathname();
  return (
    <nav aria-label={ariaLabel} className="flex gap-1">
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.href || pathname.startsWith(tab.href + "/");
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex h-11 items-center justify-center px-4",
              "font-mono text-[11px] uppercase tracking-[0.08em]",
              "transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
