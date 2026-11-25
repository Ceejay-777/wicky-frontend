import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { Chip } from "@/components/ui/chip";
import { buttonVariants } from "@/components/ui/button";
import { CheckIcon } from "@/components/topic/icons";
import { CrossIcon } from "./icons";
import { isCode } from "./quiz-option";
import { CodeText } from "./code-text";
import { cn } from "@/lib/utils";
import type { QuizAttempt, QuizResult } from "@wicky/types";

const action = "h-[52px] text-base";

// One answer line: icon, mono label, the option text. Colour carries meaning, the icon and label repeat it.
function AnswerBox({ right, label, text }: { right: boolean; label: string; text: string }) {
  return (
    <div className={cn("mt-2.5 flex items-start gap-2.5 rounded-[10px] border-[1.5px] px-3 py-2.5", right ? "border-pine text-pine" : "border-tomato text-tomato")}>
      <span className="mt-px">{right ? <CheckIcon size={16} /> : <CrossIcon size={16} />}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] font-bold tracking-[0.12em]">{label}</span>
        <span className={cn("mt-[3px] block text-[15px] leading-[1.4] font-medium whitespace-pre-wrap text-ink [overflow-wrap:break-word]", isCode(text) ? "font-mono text-[13px]" : "[hyphens:auto]")}>{isCode(text) ? text : <CodeText text={text} />}</span>
      </span>
    </div>
  );
}

function QuestionCard({ i, question, options, result }: { i: number; question: string; options: string[]; result: QuizResult }) {
  const right = result.is_correct;
  return (
    <li className="rounded-[14px] border-[1.5px] border-ink bg-field p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex size-[34px] items-center justify-center rounded-[8px] border-[1.5px] border-ink font-mono text-[13px] font-bold">Q{i + 1}</span>
        <Chip tone={right ? "pine" : "tomato"} className="gap-1.5 text-[10px] tracking-[0.12em]">
          {right ? <CheckIcon /> : <CrossIcon />}
          {right ? "Correct" : "Missed"}
        </Chip>
      </div>
      <h3 className="mt-3 font-serif text-[19px] leading-[1.3] font-medium normal-case whitespace-pre-wrap [overflow-wrap:break-word]"><CodeText text={question} /></h3>
      <AnswerBox right={right} label={right ? "YOUR ANSWER, CORRECT" : "YOUR ANSWER"} text={options[result.selected_index]} />
      {!right && <AnswerBox right label="CORRECT ANSWER" text={options[result.correct_index]} />}
      <p className="mt-3 text-sm leading-[1.5] whitespace-pre-wrap text-ink-2">
        <strong className="font-semibold text-ink">Why: </strong>
        <CodeText text={result.explanation} />
      </p>
    </li>
  );
}

// `attempt` is a submitted attempt, so `results` is filled in (the page checks).
export function ReviewView({ attempt, topicId }: { attempt: QuizAttempt; topicId: number }) {
  const results = attempt.results ?? [];
  const resultHref = `/topics/${topicId}/quiz/result?attempt=${attempt.id}`;
  const correct = attempt.correct_count ?? results.filter((r) => r.is_correct).length;

  return (
    <div className="mx-auto min-h-dvh pb-[110px] leading-[normal] md:max-w-[620px] xl:max-w-[1040px]">
      <div className="flex h-14 items-center gap-1 pr-4 pl-1.5 md:px-0">
        <Link href={resultHref} aria-label="Back to result" className="inline-flex size-11 items-center justify-center text-ink">
          <IconChevronLeft size={24} stroke={2} aria-hidden="true" />
        </Link>
        <span className="flex-1 text-center font-mono text-xs font-bold tracking-[0.12em]">REVIEW ANSWERS</span>
        <span className="w-11" />
      </div>

      <div className="px-[22px] pt-2 md:px-0 md:pt-0">
        <div className="flex flex-col gap-2 md:mt-2.5 md:flex-col-reverse md:gap-1.5">
          <h1 className="text-[46px] leading-[0.9] md:text-[44px]">
            {correct} of {attempt.question_count} correct
          </h1>
          <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-muted-ink uppercase md:tracking-[0.12em] md:text-tomato">
            {attempt.quiz_type === "ADVANCED" ? "Advanced" : "Normal"} quiz · attempt {attempt.attempt_number}
          </span>
        </div>

        <ol className="mt-5 flex flex-col gap-3.5 md:mt-[18px] md:gap-3 xl:grid xl:grid-cols-2 xl:items-start xl:gap-3.5">
          {attempt.questions.map((q, i) => (
            <QuestionCard key={i} i={i} question={q.question} options={q.options} result={results[i]} />
          ))}
        </ol>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t-[1.5px] border-ink bg-paper px-4 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))] md:px-0">
        <div className="mx-auto md:max-w-[600px] xl:max-w-[640px]">
          <Link href={resultHref} className={cn(buttonVariants(), action, "w-full")}>
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
