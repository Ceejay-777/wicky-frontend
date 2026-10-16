import { Chip } from "@/components/ui/chip";
import { initials } from "@/lib/format/initials";
import type { OthersLearningEntry } from "@wicky/types";

export function OthersLearning({ entries }: { entries: OthersLearningEntry[] }) {
  return (
    <section aria-labelledby="also-learning" className="mt-[26px] md:mt-0">
      <h2 id="also-learning" className="font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink">ALSO LEARNING THIS TOPIC</h2>
      {entries.length === 0 ? (
        <p className="mt-2.5 text-sm text-ink-2">No other learners to show right now.</p>
      ) : (
        <ul className="mt-2.5">
          {entries.map((e, i) => (
            <li key={e.user_id} className={`flex items-center gap-3 py-3 ${i > 0 ? "border-t border-ink/25" : ""}`}>
              <span aria-hidden="true" className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink font-mono text-xs font-bold">
                {initials(e.display_name)}
              </span>
              <span className="min-w-0 flex-1 truncate text-base">{e.display_name}</span>
              <span className="shrink-0 font-mono text-[10px] font-bold tracking-[0.1em] text-muted-ink">LEVEL {e.level}</span>
              <Chip tone={e.status === "COMPLETED" ? "cobalt" : "pine"}>{e.status}</Chip>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
