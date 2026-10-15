"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AppNav, isImmersive, NAV_HEIGHT, type NavProfile } from "./app-nav";

// Wraps every (app) screen: renders the nav unless the screen is immersive and
// reserves space so content is never covered (about 110px below on touch widths).
export function AppShell({ profile, children }: { profile: NavProfile; children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = !isImmersive(pathname);

  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      {showNav && <AppNav pathname={pathname} profile={profile} />}
      <main
        id="main"
        className={cn(showNav && "xl:pl-[264px] xl:pb-0")}
        style={showNav ? { paddingBottom: `calc(${NAV_HEIGHT + 32}px + env(safe-area-inset-bottom))` } : undefined}
      >
        {children}
      </main>
    </div>
  );
}
