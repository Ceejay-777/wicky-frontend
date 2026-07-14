"use client";

import { usePathname } from "next/navigation";
import {
  IconHome,
  IconHomeFilled,
  IconBook,
  IconBookFilled,
  IconPencil,
  IconPencilFilled,
  IconChartBar,
  IconUser,
  IconUserFilled,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { NavItem } from "./nav-item";

const HIDE_NAV_PREFIXES = ["/topics/"] as const;

const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    icon: IconHome,
    iconFilled: IconHomeFilled,
    match: (p: string) => p === "/",
  },
  {
    href: "/subjects",
    label: "Subjects",
    icon: IconBook,
    iconFilled: IconBookFilled,
    match: (p: string) => p.startsWith("/subjects"),
  },
  {
    href: "/quiz",
    label: "Quiz",
    icon: IconPencil,
    iconFilled: IconPencilFilled,
    match: (p: string) => p.startsWith("/quiz"),
  },
  {
    href: "/metrics",
    label: "Metrics",
    icon: IconChartBar,
    iconFilled: IconChartBar,
    match: (p: string) => p.startsWith("/metrics"),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: IconUser,
    iconFilled: IconUserFilled,
    match: (p: string) => p.startsWith("/profile"),
  },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  if (HIDE_NAV_PREFIXES.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <>
      <nav
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 h-14",
          "border-t border-ink bg-background",
          "flex items-stretch justify-around",
          "pb-[env(safe-area-inset-bottom)]",
          "lg:hidden"
        )}
      >
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            iconFilled={item.iconFilled}
            active={item.match(pathname)}
            variant="mobile"
          />
        ))}
      </nav>

      <nav
        aria-label="Primary"
        className={cn(
          "fixed left-0 inset-y-0 z-50 hidden w-60",
          "border-r border-ink bg-background",
          "flex-col p-4 gap-1",
          "lg:flex"
        )}
      >
        <div className="mb-6 px-3 font-display text-[28px] font-semibold tracking-[-0.015em] text-foreground">
          Wicky
        </div>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            iconFilled={item.iconFilled}
            active={item.match(pathname)}
            variant="desktop"
          />
        ))}
      </nav>
    </>
  );
}
