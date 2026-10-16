import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ACCENT_TEXT, accentFor } from "@/lib/learning/accent";
import { cn } from "@/lib/utils";
import type { RoadmapTopic } from "@/lib/learning/roadmap";

type Props = { subjectId: number; topic: RoadmapTopic | null; roadmapEmpty: boolean };

export function CurrentTopicCard({ subjectId, topic, roadmapEmpty }: Props) {
  const accent = ACCENT_TEXT[accentFor(subjectId)];
  return (
    <section aria-labelledby="current-topic" className="relative overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-field p-[18px]">
      {topic && (
        <svg viewBox="0 0 150 96" width="132" height="84" aria-hidden="true" className={cn("absolute top-3.5 right-3.5 rotate-[7deg] opacity-75", accent)}>
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5">
            <ellipse cx="75" cy="48" rx="70" ry="42" />
            <ellipse cx="75" cy="48" rx="60" ry="33" strokeWidth="1" />
          </g>
          <text x="75" y="44" fontSize="10" letterSpacing="2" textAnchor="middle" fill="currentColor" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>NEXT STAMP</text>
          <text x="75" y="63" fontSize="17" textAnchor="middle" fill="currentColor" style={{ fontFamily: "var(--f-display)", fontWeight: 900, letterSpacing: 1 }}>PENDING</text>
        </svg>
      )}
      <h2 id="current-topic" className="font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink">CURRENT TOPIC</h2>
      {topic ? (
        <>
          <p className={cn("mt-1.5 font-mono text-xs font-bold tracking-[0.08em]", accent)}>
            LEVEL {topic.level} · TOPIC {topic.number}
          </p>
          <p
            className={cn(
              "mt-5 line-clamp-3 max-w-[215px] font-display leading-[0.9] font-black uppercase [hyphens:auto] [overflow-wrap:break-word] md:max-w-none",
              topic.title.length <= 16 ? "text-[50px]" : topic.title.length <= 28 ? "text-[40px]" : "text-[32px]",
            )}
          >
            {topic.title}
          </p>
          <div className="mt-[22px] flex gap-2.5">
            <Link href={`/topics/${topic.id}`} className={cn(buttonVariants(), "h-[52px] flex-1 text-base")}>
              Start reading
            </Link>
            <Link href={`/topics/${topic.id}#further-study`} className={cn(buttonVariants({ variant: "outline" }), "h-[52px] flex-1 text-base")}>
              Further study
            </Link>
          </div>
        </>
      ) : (
        <p className="mt-3 text-ink-2">
          {roadmapEmpty ? "Your topics appear here once the roadmap is written." : "Every unlocked topic is passed."}
        </p>
      )}
    </section>
  );
}
