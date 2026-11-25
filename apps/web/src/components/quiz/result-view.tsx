"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SegmentedProgress } from "@/components/ui/segmented-progress";
import { TopicStamp } from "@/components/stamp/topic-stamp";
import { NotYetStamp } from "@/components/stamp/not-yet-stamp";
import { BookIcon } from "@/components/topic/icons";
import { ArrowIcon, CloseIcon } from "./icons";
import { formatPoints } from "@/lib/format/number";
import { ACCENT_TEXT, type Accent } from "@/lib/learning/accent";
import { saveMoment } from "@/lib/learning/moment";
import { useLevelCheck } from "@/lib/learning/quiz-session";
import { waitMinutes } from "@/lib/learning/reading";
import { useClientValue } from "@/lib/learning/use-client-value";
import { cn } from "@/lib/utils";
import type { QuizAttempt } from "@wicky/types";

type Props = {
  /** A submitted attempt, from the BE. */
  attempt: QuizAttempt;
  topicId: number;
  title: string;
  subjectId: number;
  subjectName: string;
  accent: Accent;
  /** The subject as it is now, from the BE. */
  progress: { passed: number; total: number; percent: number };
  /** "Topic 10: Midway", derived from the roadmap order; null on the last topic. */
  nextUp: string | null;
  /** End of the retake cooldown of this quiz type. */
  availableAt: string | null;
  /** When this quiz type was passed, for an attempt that carries no submit time of its own. */
  passedAt: string | null;
};

const action = "h-[52px] text-base";

const shortDate = (iso: string, year = false) =>
  new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", ...(year && { year: "numeric" }) }).toUpperCase();

// The BE cooldown is one hour from generation, so it is rarely a full hour by the time the result shows.
const retakeIn = (minutes: number) => (minutes <= 0 ? "Now" : minutes >= 45 ? "In about 1 hour" : `In about ${minutes} min`);

const points = (n: number, passed: boolean) => (passed ? `+${formatPoints(n)}` : formatPoints(n));

type RowData = { label: string; value: React.ReactNode; bar?: React.ReactNode };

function Row({ label, value, bar, last }: RowData & { last: boolean }) {
  return (
    <div className={cn("py-3", !last && "border-b-[1.5px] border-dashed border-muted-ink")}>
      <div className="flex items-baseline justify-between gap-3.5">
        <span className="shrink-0 font-mono text-[10px] font-bold tracking-[0.12em] text-muted-ink">{label}</span>
        <span className="line-clamp-2 min-w-0 text-right text-[15px] leading-[1.3] font-semibold [hyphens:auto] [overflow-wrap:break-word]">{value}</span>
      </div>
      {bar && <div className="mt-2">{bar}</div>}
    </div>
  );
}

export function ResultView({ attempt, topicId, title, subjectId, subjectName, accent, progress, nextUp, availableAt, passedAt }: Props) {
  const check = useLevelCheck(attempt.id);

  // The moment screen reads this once, so it is stored before the learner can follow the banner.
  useEffect(() => {
    if (check) saveMoment(subjectId, check);
  }, [check, subjectId]);

  const when = attempt.submitted_at ?? passedAt;
  const date = useClientValue(() => (when ? shortDate(when) : null));
  const dateWithYear = useClientValue(() => (when ? shortDate(when, true) : null));
  const retake = useClientValue(() => retakeIn(waitMinutes(availableAt)));

  const advanced = attempt.quiz_type === "ADVANCED";
  const passed = attempt.passed;
  const correct = attempt.correct_count ?? attempt.results?.filter((r) => r.is_correct).length ?? 0;
  const moment = check && check.action !== "none" ? check : null;
  const levelUp = moment?.action === "level_up";
  const review = `/topics/${topicId}/quiz/result/review?attempt=${attempt.id}`;

  const rows: RowData[] = [
    { label: "TOPIC", value: title },
    { label: "QUIZ", value: `${advanced ? "Advanced" : "Normal"}, attempt ${attempt.attempt_number}` },
    { label: "POINTS EARNED", value: points(attempt.score, passed) },
    ...(passed
      ? [
          {
            label: "SUBJECT PROGRESS",
            value: `${progress.passed} of ${progress.total} topics · ${progress.percent}%`,
            bar: <SegmentedProgress percent={progress.percent} className={ACCENT_TEXT[accent]} label={`${subjectName} progress`} />,
          },
          ...(nextUp ? [{ label: "NEXT UP", value: nextUp }] : []),
        ]
      : [{ label: "RETAKE", value: retake ?? "" }]),
  ];

  return (
    <div className="mx-auto min-h-dvh pb-[200px] leading-[normal] md:max-w-[600px] xl:max-w-[640px]">
      <div className="flex h-14 items-center px-1.5">
        <Link href={`/topics/${topicId}`} aria-label="Close" className="inline-flex size-11 items-center justify-center text-ink">
          <CloseIcon />
        </Link>
      </div>

      <div className="px-[22px] pt-1.5">
        <div className="mt-2 flex justify-center">
          {passed ? (
            <TopicStamp title={title} date={date ?? undefined} tone={advanced ? "gold" : "pine"} size={240} className="animate-stamp-press" />
          ) : (
            <NotYetStamp date={dateWithYear ?? undefined} />
          )}
        </div>

        <h1 className="mt-[22px] text-center text-[56px] leading-[0.9]">{passed ? (advanced ? "Advanced passed" : "Quiz passed") : "Not this time"}</h1>
        <p className="mx-auto mt-2.5 max-w-[290px] text-center text-[15px] leading-[1.45] text-ink-2">
          {correct} of {attempt.question_count} correct{passed ? "" : ". You need 60% of the points to pass."}
        </p>

        <div className="mt-[18px] flex items-end justify-center gap-2.5">
          <span className={cn("font-display text-[84px] leading-[0.8] font-black", passed ? "text-gold" : "text-muted-ink")}>{points(attempt.score, passed)}</span>
          <span className="pb-1.5 font-mono text-[11px] font-bold tracking-[0.1em] text-muted-ink">OF {formatPoints(attempt.total_points)} POINTS</span>
        </div>

        <div className="mt-5 rounded-[14px] border-[1.5px] border-ink bg-field px-4 py-1.5">
          {rows.map((r, i) => (
            <Row key={r.label} {...r} last={i === rows.length - 1} />
          ))}
        </div>

        {!passed && (
          <p className="mt-3.5 flex items-start gap-2.5 rounded-[10px] border-[1.5px] border-dashed border-muted-ink px-3.5 py-3 text-sm leading-[1.45] text-ink-2">
            <BookIcon size={18} />
            <span>A new quiz opens one hour after your last one. Read the topic again while you wait.</span>
          </p>
        )}

        {moment && (
          <Link
            href={`/subjects/${subjectId}/moment`}
            className="mt-3.5 flex items-center gap-3 rounded-[14px] border-[1.5px] border-gold bg-field px-4 py-3.5 text-ink"
          >
            <span className="flex-1">
              <span className="block font-mono text-[10px] font-bold tracking-[0.14em] text-gold">{levelUp ? "LEVEL UP" : "SUBJECT COMPLETE"}</span>
              <span className="mt-1 block font-display text-[26px] leading-none font-black uppercase [overflow-wrap:break-word]">
                {levelUp ? `Level ${moment.new_level_unlocked ?? ""} is unlocked` : "Subject completed"}
              </span>
            </span>
            <span className="text-gold"><ArrowIcon /></span>
          </Link>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t-[1.5px] border-ink bg-paper px-4 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))] md:px-0">
        <div className="mx-auto flex flex-col gap-2.5 md:max-w-[600px] xl:max-w-[640px]">
          {passed ? (
            <>
              <Link href={`/subjects/${subjectId}`} className={cn(buttonVariants(), action)}>Continue</Link>
              <Link href={review} className={cn(buttonVariants({ variant: "outline" }), action)}>Review answers</Link>
            </>
          ) : (
            <>
              <Link href={review} className={cn(buttonVariants(), action)}>Review answers</Link>
              <Link href={`/topics/${topicId}`} className={cn(buttonVariants({ variant: "outline" }), action)}>Re-read the topic</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
