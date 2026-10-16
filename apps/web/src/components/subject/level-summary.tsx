import Link from "next/link";
import { IconCheck, IconLock } from "@tabler/icons-react";
import { levelNote } from "@/lib/learning/roadmap";
import { cn } from "@/lib/utils";
import type { SubjectDetail } from "@wicky/types";

// Rollup on the overview: one row per level with its state.
export function LevelSummary({ subject }: { subject: SubjectDetail }) {
  return (
    <section aria-labelledby="roadmap-summary" className="rounded-[14px] border-[1.5px] border-ink bg-field p-4">
      <div className="flex items-baseline justify-between">
        <h2 id="roadmap-summary" className="font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink">ROADMAP</h2>
        <Link href={`/subjects/${subject.id}/roadmap`} className="-my-2 py-2 pl-3 font-mono text-xs font-bold tracking-[0.08em] text-cobalt underline">
          SEE ALL
        </Link>
      </div>
      {subject.levels.length === 0 ? (
        <p className="mt-3 text-sm text-ink-2">Levels appear once the roadmap is written.</p>
      ) : (
        <ul className="mt-2">
          {subject.levels.map((l) => {
            const done = l.total > 0 && l.passed === l.total;
            const label = done ? "PASSED" : l.is_unlocked ? "IN PROGRESS" : "LOCKED";
            return (
              <li key={l.level} className="flex items-center gap-3 border-t border-ink/25 py-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex size-[26px] shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold",
                    done && "bg-pine text-paper",
                    !done && l.is_unlocked && "border-2 border-tomato text-tomato",
                    !l.is_unlocked && "border-[1.5px] border-dashed border-muted-ink text-muted-ink",
                  )}
                >
                  {done ? <IconCheck size={16} stroke={3} /> : l.is_unlocked ? l.level : <IconLock size={14} stroke={2} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={cn("line-clamp-2 font-display text-[22px] leading-none font-black uppercase", !l.is_unlocked && "text-muted-ink")}>Level {l.level}</p>
                  <p className="mt-0.5 text-[13px] text-ink-2">{levelNote(subject, l.level)}</p>
                </div>
                <span className={cn("shrink-0 font-mono text-[10px] font-bold tracking-[0.1em]", done ? "text-pine" : l.is_unlocked ? "text-tomato" : "text-muted-ink")}>
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
