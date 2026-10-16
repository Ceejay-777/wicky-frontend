"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { IconBell } from "@tabler/icons-react";
import { timeOfDay } from "@/lib/learning/time";
import { cn } from "@/lib/utils";

// Long names step down in size tiers; one line on phones, up to two from tablet.
function nameSize(name: string) {
  const n = name.length;
  if (n <= 9) return "text-[64px] xl:text-[72px]";
  if (n <= 14) return "text-[52px] md:text-[56px] xl:text-[64px]";
  return "text-[40px] md:text-[44px] xl:text-[52px]";
}

const noopSubscribe = () => () => {};

// Time and date depend on the reader's clock: null on the server, real values after hydration.
function clockSnapshot() {
  const d = new Date();
  return `${timeOfDay(d)}|${d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}`;
}

export function Greeting({ displayName }: { displayName: string }) {
  const snap = useSyncExternalStore(noopSubscribe, clockSnapshot, () => null);
  const [word, date] = snap ? snap.split("|") : [null, null];
  const now = word ? { word, date } : null;

  return (
    <header>
      <div className="flex items-center justify-between md:hidden">
        <span className="font-display text-[30px] leading-none font-black tracking-[0.04em] text-tomato">WICKY</span>
        <span className="min-h-4 font-mono text-[11px] font-bold tracking-[0.1em] text-muted-ink uppercase">{now?.date}</span>
      </div>
      <div className="mt-[26px] flex items-end justify-between gap-2.5 md:mt-0 md:gap-4">
        <div className="min-w-0">
          <p className="min-h-4 font-mono text-xs font-bold tracking-[0.14em] text-tomato uppercase">
            {now ? `Good ${now.word}` : "Welcome"}
          </p>
          <h1
            className={cn(
              "mt-1.5 block overflow-hidden leading-[0.84] text-ellipsis whitespace-nowrap md:line-clamp-2 md:whitespace-normal [hyphens:auto] [overflow-wrap:break-word]",
              nameSize(displayName)
            )}
          >
            {displayName}
          </h1>
        </div>
        <Link
          href="/reminders"
          aria-label="Reminders"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink bg-field text-ink transition-colors hover:bg-kraft"
        >
          <IconBell size={22} stroke={2} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
