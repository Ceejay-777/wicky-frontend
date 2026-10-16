"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconCheck, IconChevronDown, IconLock } from "@tabler/icons-react";
import { LocalTime } from "@/components/ui/local-time";
import { cn } from "@/lib/utils";
import type { RoadmapTopic } from "@/lib/learning/roadmap";

export type RoadmapLevel = { level: number; total: number; passed: number; is_unlocked: boolean; note: string };

function TopicRow({ topic, current }: { topic: RoadmapTopic; current: React.Ref<HTMLAnchorElement> }) {
  const locked = topic.state === "locked";
  const icon =
    topic.state === "passed" ? (
      <span aria-hidden="true" className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-pine text-paper"><IconCheck size={18} stroke={3} /></span>
    ) : topic.state === "current" ? (
      <span aria-hidden="true" className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-full border-2 border-tomato"><span className="size-2.5 rounded-full bg-tomato" /></span>
    ) : (
      <span aria-hidden="true" className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-muted-ink text-muted-ink"><IconLock size={16} stroke={2} /></span>
    );
  const body = (
    <>
      <span aria-hidden="true" className="w-[18px] shrink-0 font-mono text-xs font-bold text-muted-ink">{String(topic.number).padStart(2, "0")}</span>
      {icon}
      <span className="min-w-0 flex-1">
        <span className={cn("line-clamp-2 block font-display text-[22px] leading-none font-black uppercase [hyphens:auto] [overflow-wrap:break-word]", locked && "text-muted-ink")}>
          {topic.title}
        </span>
        <span className="mt-[3px] block text-xs text-ink-2">
          {topic.state === "passed" ? (
            <>Passed{topic.completed_at && <> <LocalTime iso={topic.completed_at} mode="date" /></>}</>
          ) : topic.state === "current" ? (
            "Ready to read"
          ) : (
            "Locked"
          )}
        </span>
      </span>
      {topic.state === "current" && (
        <span className="shrink-0 rounded-full border-[1.5px] border-tomato px-2 py-1 font-mono text-[10px] font-bold tracking-[0.1em] text-tomato">CURRENT</span>
      )}
    </>
  );
  const row = "flex min-h-14 items-center gap-3 rounded-xl border-[1.5px] bg-field px-3 py-2.5";
  // Locked topics are not links.
  return locked ? (
    <div className={cn(row, "border-dashed border-muted-ink")}>{body}</div>
  ) : (
    <Link
      ref={topic.state === "current" ? current : undefined}
      href={`/topics/${topic.id}`}
      className={cn(row, "hover:bg-kraft/60", topic.state === "current" ? "border-2 border-tomato" : "border-ink")}
    >
      {body}
    </Link>
  );
}

export function RoadmapList({ levels, topics }: { levels: RoadmapLevel[]; topics: RoadmapTopic[] }) {
  // Fully passed levels start collapsed so the current topic is near the top.
  const [collapsed, setCollapsed] = useState<Set<number>>(
    () => new Set(levels.filter((l) => l.total > 0 && l.passed === l.total).map((l) => l.level)),
  );
  const currentRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: "center" });
  }, []);

  const toggle = (level: number) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (!next.delete(level)) next.add(level);
      return next;
    });

  // One column on phones, two on tablet, three on desktop (one per level).
  return (
    <div className="grid items-start gap-6 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-8">
      {levels.map((l, i) => {
        const open = !collapsed.has(l.level);
        const rows = topics.filter((t) => t.level === l.level);
        const panelId = `level-${l.level}-topics`;
        const done = l.total > 0 && l.passed === l.total;
        return (
          <section
            key={l.level}
            aria-label={`Level ${l.level}`}
            // Tablet board: Level 1 and 3 stack in the left column, Level 2 fills the right.
            className={cn(
              levels.length === 3 && i === 1 && "md:col-start-2 md:row-span-2 md:row-start-1 xl:col-auto xl:row-auto xl:row-span-1",
              levels.length === 3 && i === 2 && "md:col-start-1 md:row-start-2 xl:col-auto xl:row-auto",
            )}
          >
            {open ? (
              <button
                type="button"
                aria-expanded
                aria-controls={panelId}
                onClick={() => toggle(l.level)}
                className="mb-2.5 flex min-h-11 w-full items-center gap-3 text-left"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink">LEVEL {l.level}</span>
                  <span className="mt-0.5 block text-sm text-ink-2">{l.note}</span>
                </span>
                {!l.is_unlocked && <IconLock size={20} stroke={2} aria-hidden="true" className="shrink-0 text-muted-ink" />}
                <IconChevronDown size={20} stroke={2} aria-hidden="true" className="shrink-0 rotate-180 text-muted-ink" />
              </button>
            ) : (
              <button
                type="button"
                aria-expanded={false}
                aria-controls={panelId}
                onClick={() => toggle(l.level)}
                className="flex min-h-14 w-full items-center gap-3 rounded-xl border-[1.5px] border-ink bg-field p-3.5 text-left"
              >
                <span aria-hidden="true" className={cn("inline-flex size-[34px] shrink-0 items-center justify-center rounded-full", done ? "bg-pine text-paper" : "border border-ink")}>
                  {done && <IconCheck size={18} stroke={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-2xl leading-none font-black uppercase">Level {l.level}</span>
                  <span className="mt-0.5 block text-[13px] text-ink-2">{l.passed} of {l.total} passed. Tap to expand.</span>
                </span>
                <IconChevronDown size={20} stroke={2} aria-hidden="true" className="shrink-0" />
              </button>
            )}
            <div id={panelId} hidden={!open} className="flex flex-col gap-2">
              {rows.map((t) => (
                <TopicRow key={t.id} topic={t} current={currentRef} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
