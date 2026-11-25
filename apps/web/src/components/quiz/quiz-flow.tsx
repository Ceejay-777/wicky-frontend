"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { ApiRequestError } from "@wicky/api-client";
import type { QuizAttempt, QuizType } from "@wicky/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { TopicStamp } from "@/components/stamp/topic-stamp";
import { AlertIcon } from "@/components/topic/icons";
import { TopicStateScreen } from "@/components/topic/topic-state-screen";
import { CloseIcon } from "./icons";
import { QuizOption } from "./quiz-option";
import { CodeText } from "./code-text";
import { useRefetchOnEvent } from "@/lib/events/use-refetch-on-event";
import { generateQuiz, getQuizAttempt, submitQuiz } from "@/lib/learning/service";
import { clearPicks, loadPicks, savePicks, saveLevelCheck } from "@/lib/learning/quiz-session";
import { cn } from "@/lib/utils";

type Props = { topicId: number; title: string; subjectName: string; quizType: QuizType };

const COLUMN = "mx-auto md:max-w-[620px] xl:max-w-[720px]";
const LETTERS = ["A", "B", "C", "D"];
const SUBMIT_FAILED = "We could not submit your answers. They are still here, so try again.";

function Segments({ total, answered, index }: { total: number; answered: number; index: number }) {
  return (
    <div role="img" aria-label="Quiz progress" className={cn("mx-[22px] flex", total > 8 ? "gap-1" : "gap-1.5")}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-2.5 flex-1 rounded-[3px] border-[1.5px]",
            i < answered ? "border-ink bg-ink" : i === index ? "border-2 border-ink" : "border-dashed border-muted-ink",
          )}
        />
      ))}
    </div>
  );
}

export function QuizFlow({ topicId, title, subjectName, quizType }: Props) {
  const router = useRouter();
  const back = `/topics/${topicId}`;
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [failure, setFailure] = useState<{ message: string; retryable: boolean } | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [exitOpen, setExitOpen] = useState(false);
  const started = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);

  // Starts the quiz, or gets the unfinished one back, so a reload lands on the same attempt. It does not wait for the AI.
  const start = useCallback(async () => {
    setFailure(null);
    try {
      const res = await generateQuiz(topicId, quizType);
      // The BE keeps no partial picks. A quiz it hands back unfinished gets the ones saved here; a new quiz or a retry starts clean.
      const saved = res.resumed && res.status === "READY" ? loadPicks(res.id, res.question_count) : null;
      if (!saved) clearPicks(res.id);
      setAnswers(saved?.answers ?? []);
      setIndex(saved?.answers.length ?? 0);
      setPicked(saved?.picked ?? null);
      setAttempt(res);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        // The topic page words the cooldown refusal (spec section 10).
        const wait = /(\d+)\s+minute/.exec(err.message);
        if (err.status === 400 && wait) return router.replace(`${back}?quiz=busy&minutes=${Math.min(60, Number(wait[1]))}`);
        return setFailure({ message: err.message, retryable: err.status >= 500 });
      }
      setFailure({ message: "We could not reach Wicky. Check your connection and try again.", retryable: true });
    }
  }, [topicId, quizType, back, router]);

  // One start per visit; strict mode runs effects twice in development.
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void start();
  }, [start]);

  // While the AI writes the quiz, wait for its quiz.status event, then read the attempt. The hook also reads on every
  // (re)connect and after 60 quiet seconds, which covers a quiz that finished before the stream opened.
  const attemptId = attempt?.id;
  const refetch = useCallback(() => {
    if (attemptId === undefined) return;
    getQuizAttempt(topicId, attemptId).then(setAttempt, () => {
      // The next event, reconnect or safety net reads it again.
    });
  }, [topicId, attemptId]);
  useRefetchOnEvent({ active: attempt?.status === "GENERATING", event: "quiz.status", match: (p) => p.attempt_id === attemptId, onChange: refetch });

  const ready = attempt?.status === "READY";

  // Leaving mid quiz is never silent: a reload or a closed tab asks first.
  useEffect(() => {
    if (!ready) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [ready]);

  const retry = async () => {
    setRetrying(true);
    await start();
    setRetrying(false);
  };

  if (failure) {
    return (
      <TopicStateScreen
        backHref={back}
        subject={subjectName}
        tone="tomato"
        icon={<AlertIcon size={40} />}
        stamp="NO QUIZ"
        eyebrow="QUIZ UNAVAILABLE"
        title="Cannot start"
        text={failure.message}
      >
        {failure.retryable && (
          <Button type="button" loading={retrying} onClick={retry} className="h-[52px] text-base">
            Try again
          </Button>
        )}
        <Link href={back} className={cn(buttonVariants({ variant: failure.retryable ? "outline" : "default" }), "h-[52px] text-base")}>
          Back to the topic
        </Link>
      </TopicStateScreen>
    );
  }

  // The AI could not write it. Calling generate again retries the same attempt.
  if (attempt?.status === "FAILED") {
    return (
      <TopicStateScreen
        backHref={back}
        subject={subjectName}
        tone="tomato"
        icon={<AlertIcon size={40} />}
        stamp="NOT READY"
        eyebrow="QUIZ NOT READY"
        title="Not ready yet"
        text="We could not write your quiz this time. Try again in a moment."
      >
        <Button type="button" loading={retrying} onClick={retry} className="h-[52px] text-base">
          Try again
        </Button>
        <Link href={back} className={cn(buttonVariants({ variant: "outline" }), "h-[52px] text-base")}>
          Back to the topic
        </Link>
      </TopicStateScreen>
    );
  }

  const total = attempt?.question_count ?? 0;
  const question = attempt?.status === "READY" ? attempt.questions[index] : undefined;
  const last = index === total - 1;

  const select = (i: number) => {
    setPicked(i);
    if (attempt) savePicks(attempt.id, { answers, picked: i });
  };

  const next = () => {
    if (picked === null || !attempt) return;
    const done = [...answers, picked];
    setAnswers(done);
    setIndex((i) => i + 1);
    setPicked(null);
    savePicks(attempt.id, { answers: done, picked: null });
    window.scrollTo(0, 0);
    heading.current?.focus();
  };

  const finish = async () => {
    if (picked === null || !attempt) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submitQuiz(topicId, attempt.id, [...answers, picked]);
      saveLevelCheck(res.id, res.level_check);
      clearPicks(res.id);
      router.push(`${back}/quiz/result?attempt=${res.id}`);
    } catch (err) {
      // The BE took an earlier submit of this attempt (a dropped connection): its result is the one to show.
      if (err instanceof ApiRequestError && err.status === 400 && /already submitted/i.test(err.message)) {
        clearPicks(attempt.id);
        return router.push(`${back}/quiz/result?attempt=${attempt.id}`);
      }
      setSubmitError(err instanceof ApiRequestError && err.status >= 400 && err.status < 500 ? err.message : SUBMIT_FAILED);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh pt-20 pb-[130px] leading-[normal]">
      <header className="fixed inset-x-0 top-0 z-30">
        <div className={cn("bg-paper", COLUMN)}>
          <div className="flex h-14 items-center gap-1 pr-4 pl-1.5">
            <button type="button" aria-label="Exit quiz" onClick={() => setExitOpen(true)} className="inline-flex size-11 cursor-pointer items-center justify-center text-ink">
              <CloseIcon />
            </button>
            <span className="flex-1 text-center font-mono text-xs font-bold tracking-[0.12em]">{ready ? `QUESTION ${index + 1} OF ${total}` : "NEW QUIZ"}</span>
            <span className="w-[70px] text-right font-mono text-[11px] font-bold tracking-[0.1em] text-muted-ink">{attempt ? `TRY ${attempt.attempt_number}` : null}</span>
          </div>
          {ready && <Segments total={total} answered={answers.length} index={index} />}
        </div>
      </header>

      {!question ? (
        <div role="status" className="flex min-h-[calc(100dvh-80px)] flex-col items-center justify-center px-[30px] text-center">
          <TopicStamp title={title} ghost size={190} />
          <h1 className="mt-[26px] text-[40px] leading-[0.95]">Writing your quiz</h1>
          <p className="mx-auto mt-3 max-w-[270px] text-[15px] leading-[1.5] text-ink-2">Fresh questions are written for each attempt, so this takes a few seconds.</p>
          <div aria-hidden="true" className="mt-[22px] flex justify-center gap-2">
            {[1, 0.6, 0.3].map((o, i) => (
              <span key={i} className="size-2.5 rounded-full bg-tomato motion-safe:animate-pulse" style={{ opacity: o, animationDelay: `${i * 200}ms` }} />
            ))}
          </div>
        </div>
      ) : (
        <div className={COLUMN}>
          <div className="px-[22px] pt-[22px]">
            <h2 ref={heading} tabIndex={-1} className="mb-5 font-serif text-2xl leading-[1.28] font-medium normal-case whitespace-pre-wrap outline-none [overflow-wrap:break-word]">
              <CodeText text={question.question} />
            </h2>
            <div role="radiogroup" aria-label="Answers" className="flex flex-col gap-2.5">
              {question.options.map((text, i) => (
                <QuizOption key={i} letter={LETTERS[i]} text={text} selected={picked === i} onSelect={() => select(i)} />
              ))}
            </div>
          </div>
        </div>
      )}

      {question && (
        <div className="fixed inset-x-0 bottom-0 z-30">
          <div className={cn("border-t-[1.5px] border-ink bg-paper px-4 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))]", COLUMN)}>
            {submitError && (
              <div role="alert" className="mb-2.5 flex items-start gap-2.5 rounded-[10px] border-[1.5px] border-tomato bg-tomato/12 px-3.5 py-3 text-sm leading-[1.4] font-medium">
                <span className="text-tomato"><AlertIcon /></span>
                <span>{submitError}</span>
              </div>
            )}
            <Button
              type="button"
              loading={submitting}
              disabled={picked === null}
              onClick={last ? finish : next}
              className={cn("h-[54px] w-full text-[17px] disabled:opacity-85", picked === null && "border-dashed border-muted-ink bg-transparent text-base text-muted-ink disabled:opacity-100")}
            >
              {submitting ? "Submitting your answers" : last ? "Finish quiz" : "Next question"}
            </Button>
          </div>
        </div>
      )}

      <AlertDialog.Root open={exitOpen} onOpenChange={setExitOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-[rgba(28,23,18,0.55)]" />
          <AlertDialog.Popup
            className={cn(
              "fixed z-50 box-border border-ink bg-paper outline-none",
              "inset-x-0 bottom-0 rounded-t-[24px] border-t-[1.5px] px-[22px] pt-3 pb-[calc(28px+env(safe-area-inset-bottom))]",
              "md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:w-[600px] xl:w-[640px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[18px] md:border-[1.5px] md:p-7 md:pb-[26px]",
            )}
          >
            <div aria-hidden="true" className="mx-auto mb-[18px] h-[5px] w-11 rounded-[3px] bg-muted-ink opacity-50 md:hidden" />
            <AlertDialog.Title className="font-display text-[38px] leading-[0.95] font-black uppercase md:text-[44px]">Exit quiz?</AlertDialog.Title>
            <AlertDialog.Description className="mt-2.5 text-[15px] leading-[1.5] text-ink-2">
              Your answers so far are kept on this device. Start the quiz again to pick up where you left off.
            </AlertDialog.Description>
            <div className="mt-5 flex flex-col gap-2.5 md:flex-row-reverse">
              <AlertDialog.Close className={cn(buttonVariants(), "h-[52px] cursor-pointer text-base md:flex-1")}>Keep going</AlertDialog.Close>
              <Link href={back} className={cn(buttonVariants({ variant: "destructive" }), "h-[52px] text-base md:flex-1")}>
                Exit quiz
              </Link>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
