"use client";

import Link from "next/link";
import { IconChevronRight, IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { formatPoints } from "@/lib/format/number";
import { cn } from "@/lib/utils";
import type { EnrolledSubject } from "@wicky/types";

type CurrentlyLearningListProps = {
  subjects: EnrolledSubject[];
  isFull: boolean;
  onAddSubject: () => void;
};

export function CurrentlyLearningList({
  subjects,
  isFull,
  onAddSubject,
}: CurrentlyLearningListProps) {
  if (subjects.length === 0) {
    return (
      <section
        aria-labelledby="currently-learning-heading"
        className="mt-8 sm:mt-10"
      >
        <SectionHeading id="currently-learning-heading">
          Currently Learning
        </SectionHeading>
        <Empty>
          <EmptyHeader>
            <EmptyTitle className="font-display text-[20px] font-semibold text-foreground sm:text-[22px]">
              Nothing here yet.
            </EmptyTitle>
            <EmptyDescription className="font-body text-[14px] text-muted-foreground">
              You haven&rsquo;t enrolled in any subjects. Browse the catalog
              below to get started.
            </EmptyDescription>
          </EmptyHeader>
          <Button
            variant="default"
            size="lg"
            disabled={isFull}
            onClick={onAddSubject}
            className="mt-4 h-12 font-mono text-[11px] uppercase tracking-[0.04em] rounded-none"
          >
            <IconPlus data-icon="inline-start" />
            Add Subject
          </Button>
        </Empty>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="currently-learning-heading"
      className="mt-8 sm:mt-10"
    >
      <SectionHeading id="currently-learning-heading">
        Currently Learning
      </SectionHeading>
      <ul className="border-t border-ink">
        {subjects.map((s) => (
          <li key={s.id} className="border-b border-ink">
            <SubjectRow subject={s} />
          </li>
        ))}
        <li className="border-b border-ink">
          <AddSubjectRow isFull={isFull} onAddSubject={onAddSubject} />
        </li>
      </ul>
    </section>
  );
}

function SubjectRow({ subject }: { subject: EnrolledSubject }) {
  const summary = `L${subject.level_unlocked} · ${subject.topics_passed} of ${subject.topics_total}`;

  return (
    <Link
      href={`/subjects/${subject.id}`}
      className={cn(
        "group flex items-center justify-between gap-4 px-2 py-4 sm:px-4 sm:py-5",
        "transition-colors hover:bg-accent focus-visible:bg-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="font-display text-[18px] font-semibold leading-tight text-foreground">
          {subject.name}
        </div>
        <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          {summary}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="font-mono text-[13px] font-medium text-foreground">
          {formatPoints(subject.points)}{" "}
          <span className="text-muted-foreground">pts</span>
        </span>
        <IconChevronRight
          size={18}
          stroke={1.5}
          className="text-muted-foreground transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

function AddSubjectRow({
  isFull,
  onAddSubject,
}: {
  isFull: boolean;
  onAddSubject: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onAddSubject}
      disabled={isFull}
      className={cn(
        "flex w-full items-center gap-1.5 px-2 py-4 sm:px-4 sm:py-5",
        "transition-colors hover:bg-accent focus-visible:bg-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary",
        isFull && "pointer-events-none opacity-50"
      )}
    >
      <IconPlus
        size={16}
        stroke={2}
        className="text-accent-foreground"
        aria-hidden="true"
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-accent-foreground font-medium">
        Add Subject
      </span>
    </button>
  );
}

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:mb-4"
    >
      {children}
    </h2>
  );
}
