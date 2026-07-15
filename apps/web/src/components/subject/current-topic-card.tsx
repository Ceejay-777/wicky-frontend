import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SubjectDetail, SubjectTopicItem } from "@wicky/types";

type CurrentTopicCardProps = {
  subject: SubjectDetail;
  topic: SubjectTopicItem | null;
};

export function CurrentTopicCard({ subject, topic }: CurrentTopicCardProps) {
  const total = subject.topics.length;
  const order = topic && total > 0 ? topic.order : total > 0 ? total : 0;
  const title = topic?.title ?? "Roadmap complete";
  const summary = topic
    ? `The next entry on your ${subject.name} roadmap. ${order} of ${total}.`
    : "Every topic in this roadmap is done. Review or restart from the top.";

  return (
    <section
      aria-labelledby="current-topic-heading"
      className="border border-ink"
    >
      <h2 id="current-topic-heading" className="sr-only">
        Current topic
      </h2>
      <div className="flex items-center justify-between gap-3 border-b border-ink bg-ink px-3 py-2 text-paper sm:px-4 sm:py-2.5">
        <span className="truncate font-display text-[16px] font-semibold sm:text-[18px]">
        {/*If this is the latest unlocked topic, show "Latest topic" else show "Topic {number in roman numerals}"*/}
          {topic?.order === total ? "Latest topic" : `Topic ${topic?.order}`}
        </span>
        <span className="shrink-0 rounded-sm bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-accent-foreground">
          5 min read
        </span>
      </div>
      <div className="bg-card px-4 py-5 sm:px-6 sm:py-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          Level {topic?.level ?? subject.level_unlocked} · Topic {order} of{" "}
          {total}
        </p>
        <h3
          className={cn(
            "mt-2 font-display font-semibold leading-[1.15] text-foreground",
            "text-[24px] tracking-[-0.012em]",
            "sm:text-[28px] sm:tracking-[-0.014em]",
            "lg:text-[30px] lg:tracking-[-0.015em]",
          )}
        >
          {title}
        </h3>
        <p className="mt-3 max-w-prose text-[15px] leading-[1.6] text-muted-foreground">
          {summary}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          {topic ? (
            <Link
              href={`/topics/${topic.id}`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "min-h-11 sm:min-h-0",
              )}
            >
              Start 5 min read
              <IconArrowRight data-icon="inline-end" />
            </Link>
          ) : null}
          {topic ? (
            <Link
              href={`/topics/${topic.id}#resources`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "min-h-11 sm:min-h-0",
              )}
            >
              Further study
            </Link>
          ) : (
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "min-h-11 sm:min-h-0",
              )}
            >
              Back to home
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
