"use client";

import { useState } from "react";
import Link from "next/link";
import { AddSubjectModal } from "@/components/homepage/add-subject-modal";
import { BookIcon } from "@/components/topic/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { LocalTime } from "@/components/ui/local-time";
import { ACCENT_TEXT, type Accent } from "@/lib/learning/accent";
import { cn } from "@/lib/utils";

export type QuizHubItem = {
  topicId: number;
  title: string;
  subjectName: string;
  accent: Accent;
  level: number;
  number: number;
  /** Minutes left of the retake cooldown; 0 when a quiz can start. */
  wait: number;
  /** ISO end of that cooldown. */
  availableAt: string | null;
};

const card = "h-12 rounded-[10px] text-[15px]";

function QuizCard({ item }: { item: QuizHubItem }) {
  const read = `/topics/${item.topicId}`;
  return (
    <li className="flex h-full flex-col rounded-[14px] border-[1.5px] border-ink bg-field p-4">
      <div className="flex items-center justify-between gap-2.5">
        <span className={cn("font-mono text-[10px] font-bold tracking-[0.12em] whitespace-nowrap", ACCENT_TEXT[item.accent])}>
          LEVEL {item.level} · TOPIC {item.number}
        </span>
        <span className="max-w-[150px] min-w-0 truncate font-mono text-[10px] font-bold tracking-[0.08em] text-muted-ink uppercase">{item.subjectName}</span>
      </div>
      <h3 className="mt-2.5 line-clamp-3 text-[32px] leading-[0.95] [hyphens:auto] [overflow-wrap:break-word]">{item.title}</h3>
      <div className="mt-auto flex gap-2.5 pt-3.5">
        {item.wait && item.availableAt ? (
          <div role="status" className="box-border flex h-12 min-w-0 flex-1 flex-col justify-center gap-[3px] rounded-[10px] border-[1.5px] border-dashed border-gold px-3">
            <span className="font-mono text-[10px] font-bold tracking-[0.1em] text-gold">COOLING DOWN · {item.wait} MIN</span>
            <span className="truncate text-sm leading-[1.1] font-semibold">Opens <LocalTime iso={item.availableAt} mode="next" /></span>
          </div>
        ) : (
          <Link href={`${read}/quiz`} className={cn(buttonVariants(), card, "flex-1")}>Start quiz</Link>
        )}
        <Link href={read} className={cn(buttonVariants({ variant: "outline" }), card, "px-4")}>Read first</Link>
      </div>
    </li>
  );
}

export function QuizHub({ items }: { items: QuizHubItem[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const cooling = items.some((i) => i.wait > 0);

  return (
    <div className="px-[22px] pt-[30px] md:px-12 md:pt-11 xl:px-14">
      <header>
        <p className="font-mono text-xs font-bold tracking-[0.14em] text-tomato">TEST YOURSELF</p>
        <h1 className="mt-1.5 line-clamp-2 text-[56px] leading-[0.86] tracking-[0.005em] md:text-[64px] xl:text-[72px]">Quizzes</h1>
      </header>

      {items.length === 0 ? (
        <div className="mt-[60px] text-center">
          <div className="flex justify-center">
            <div className="flex size-[150px] -rotate-6 flex-col items-center justify-center gap-2 rounded-full border-[2.5px] border-dashed border-muted-ink text-muted-ink">
              <BookIcon size={40} />
              <span className="font-mono text-[11px] font-bold tracking-[0.14em]">NO QUIZZES</span>
            </div>
          </div>
          <h2 className="mt-[22px] text-[34px]">Nothing to quiz yet</h2>
          <p className="mx-auto mt-2.5 max-w-[270px] text-[15px] leading-[1.5] text-ink-2">Add a subject and read its first topic. Your quizzes appear here.</p>
          <div className="mt-[22px] md:mx-auto md:max-w-[320px]">
            <Button type="button" className="h-[52px] w-full text-base" onClick={() => setModalOpen(true)}>
              Add a subject
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-3.5 text-[15px] leading-[1.5] text-ink-2">One quiz is ready for each subject you are learning: the topic you are on now.</p>
          <section aria-labelledby="ready-heading" className="mt-[22px]">
            <h2 id="ready-heading" className="font-mono text-xs font-bold tracking-[0.14em] text-muted-ink">{cooling ? "YOUR QUIZZES" : "READY NOW"}</h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-2 md:gap-3.5 xl:grid-cols-3">
              {items.map((item) => (
                <QuizCard key={item.topicId} item={item} />
              ))}
            </ul>
          </section>
        </>
      )}

      <AddSubjectModal open={modalOpen} onOpenChange={setModalOpen} isFull={false} />
    </div>
  );
}
