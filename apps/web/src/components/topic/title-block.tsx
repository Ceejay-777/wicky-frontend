import type { ReactNode, Ref } from "react";
import { TopicStamp } from "@/components/stamp/topic-stamp";
import { titleSizeClass } from "@/lib/learning/reading";
import { cn } from "@/lib/utils";

type Props = {
  level: number;
  number: number;
  title: string;
  /** Mono line under the title ("~2 MIN READ"). */
  meta: string;
  /** Pass chip, when the topic is passed. */
  chip?: ReactNode;
  /** Formatted pass date; omit for the ghost stamp. */
  passedDate?: string;
  passed: boolean;
  titleRef?: Ref<HTMLHeadingElement>;
};

// Level and topic labels, the title, the stamp slot, then a dotted rule.
export function TitleBlock({ level, number, title, meta, chip, passedDate, passed, titleRef }: Props) {
  return (
    <div className="px-[22px] pt-2">
      <span className="font-mono text-[11px] font-bold tracking-[0.12em] text-tomato">
        LEVEL {level} &middot; TOPIC {number}
      </span>
      <h1 ref={titleRef} className={cn("mt-2.5 leading-[0.92] tracking-[0.005em] [hyphens:auto] [overflow-wrap:break-word]", titleSizeClass(title.length))}>
        {title}
      </h1>
      <div className="mt-3.5 flex items-center justify-between gap-2.5">
        <div className="flex min-w-0 flex-col gap-2.5">
          <span className="font-mono text-xs font-bold tracking-[0.1em] text-muted-ink">{meta}</span>
          {chip}
        </div>
        <div className="mr-0.5 shrink-0">
          <TopicStamp title={title} ghost={!passed} date={passedDate} />
        </div>
      </div>
      <div className="mt-3.5 border-t-2 border-dotted border-muted-ink" />
    </div>
  );
}
