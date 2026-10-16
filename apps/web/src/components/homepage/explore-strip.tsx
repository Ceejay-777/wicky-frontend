import Link from "next/link";
import { ACCENT_TEXT, accentFor } from "@/lib/learning/accent";
import { cn } from "@/lib/utils";
import type { Subject } from "@wicky/types";

// One glyph per accent, so colour is never the only difference.
const GLYPHS = [
  "M8 38 V20 a12 12 0 0 1 24 0 V38 M2 38 H38 M14 38 V24 a6 6 0 0 1 12 0 V38",
  "M20 4 L24.7 14.6 L36 15.8 L27.5 23.4 L30 34.6 L20 28.8 L10 34.6 L12.5 23.4 L4 15.8 L15.3 14.6 Z",
  "M13 4 H27 L36 13 V27 L27 36 H13 L4 27 V13 Z M12 20 H28 M20 12 V28",
  "M6 6 H34 V34 H6 Z M6 20 H34 M20 6 V34",
];

// Phones scroll sideways; tablet is a 4-up grid of the first 4; desktop a 2-up column.
export function ExploreStrip({ subjects }: { subjects: Subject[] }) {
  return (
    <section aria-labelledby="explore-heading">
      <div className="mt-7 mb-3 flex items-baseline justify-between md:mt-[30px]">
        <h2 id="explore-heading" className="font-mono text-xs font-bold tracking-[0.14em] text-muted-ink">EXPLORE SUBJECTS</h2>
        <Link href="/subjects" className="-my-2 py-2 pl-3 font-mono text-xs font-bold tracking-[0.08em] text-cobalt underline">
          SEE ALL
        </Link>
      </div>
      {subjects.length === 0 ? (
        <p className="text-sm text-ink-2">Nothing new to explore right now.</p>
      ) : (
        <ul className="-mr-[22px] flex snap-x gap-2.5 overflow-x-auto pr-[22px] pb-1 md:mr-0 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible md:pr-0 xl:grid-cols-2">
          {subjects.map((s, i) => (
            <li key={s.id} className={cn("w-[142px] shrink-0 snap-start md:w-auto", i >= 4 && "md:hidden")}>
              <Link
                href={`/subjects/explore/${s.id}`}
                className="flex h-[158px] flex-col overflow-hidden rounded-xl border-[1.5px] border-ink bg-kraft p-3.5 pb-3 text-ink"
              >
                <svg viewBox="0 0 40 40" width="44" height="44" aria-hidden="true" className={cn("shrink-0 overflow-visible", ACCENT_TEXT[accentFor(s.id)])}>
                  <path className="stamp-ink" d={GLYPHS[s.id % GLYPHS.length]} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                <p className="mt-auto line-clamp-2 font-display text-[26px] leading-[0.95] font-black uppercase [hyphens:auto] [overflow-wrap:break-word] xl:text-[21px]">
                  {s.name}
                </p>
                <p className="mt-1.5 font-mono text-[10px] font-bold tracking-[0.1em] text-muted-ink">
                  {s.topic_count} {s.topic_count === 1 ? "TOPIC" : "TOPICS"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
