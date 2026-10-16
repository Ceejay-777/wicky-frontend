"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconCheck, IconInfoCircle, IconStar } from "@tabler/icons-react";
import { SubjectCard } from "@/components/homepage/subject-card";
import { AddSubjectCard } from "@/components/homepage/add-subject-card";
import { AddSubjectModal } from "@/components/homepage/add-subject-modal";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { addSubject } from "@/lib/learning/service";
import { MAX_SUBJECT_SLOTS } from "@/lib/learning/constants";
import { formatPoints } from "@/lib/format/number";
import { cn } from "@/lib/utils";
import type { EnrolledSubject, Subject } from "@wicky/types";

const rowBox = "flex items-center gap-3 rounded-xl border-[1.5px] border-ink bg-kraft py-2.5 pr-3 pl-3.5";
const nameCls = "line-clamp-2 font-display text-2xl leading-none font-black uppercase [hyphens:auto] [overflow-wrap:break-word]";

function SectionHeader({ id, title, aside, warn }: { id: string; title: string; aside?: string; warn?: boolean }) {
  return (
    <div className="mb-3 flex items-baseline justify-between">
      <h2 id={id} className="font-mono text-xs font-bold tracking-[0.14em] text-muted-ink">{title}</h2>
      {aside && <span className={cn("font-mono text-[11px] font-bold tracking-[0.08em]", warn ? "text-tomato" : "text-muted-ink")}>{aside}</span>}
    </div>
  );
}

function StarredRow({ subject, full }: { subject: Subject; full: boolean }) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "adding" | "failed">("idle");
  const add = async () => {
    setState("adding");
    try {
      await addSubject(subject.id);
      router.refresh();
    } catch {
      setState("failed");
    }
  };
  return (
    <li className={rowBox}>
      <IconStar size={22} stroke={2} aria-hidden="true" className="shrink-0 fill-current text-gold" />
      <Link href={`/subjects/explore/${subject.id}`} className="min-w-0 flex-1">
        <span className={cn(nameCls, "block")}>{subject.name}</span>
        <span className={cn("mt-1 block font-mono text-[10px] font-bold tracking-[0.1em]", state === "failed" ? "text-tomato" : "text-muted-ink")}>
          {state === "failed" ? "COULD NOT ADD. TRY AGAIN." : `${formatPoints(subject.enrollment_count)} ${subject.enrollment_count === 1 ? "LEARNER" : "LEARNERS"}`}
        </span>
      </Link>
      {/* At the limit the add would fail, so it is not offered. */}
      <Button type="button" variant="outline" size="sm" loading={state === "adding"} disabled={full} aria-label={`Add ${subject.name}`} className="shrink-0 font-mono text-xs tracking-[0.1em]" onClick={add}>
        ADD
      </Button>
    </li>
  );
}

export function SubjectsContent({ subjects, starred }: { subjects: EnrolledSubject[]; starred: Subject[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const active = subjects.filter((s) => s.status === "ACTIVE");
  const completed = subjects.filter((s) => s.status === "COMPLETED");
  const full = active.length >= MAX_SUBJECT_SLOTS;

  return (
    <div className="px-[22px] pt-[30px] md:px-12 md:pt-11 xl:px-14">
      <header>
        <p className="font-mono text-xs font-bold tracking-[0.14em] text-tomato">YOUR PASSPORT</p>
        <h1 className="line-clamp-2 text-[56px] leading-[0.85] md:text-[64px] xl:text-[72px]">Subjects</h1>
      </header>

      <div className="mt-[22px] md:mt-[30px] xl:grid xl:grid-cols-[1.6fr_1fr] xl:items-start xl:gap-12">
        <section aria-labelledby="active-heading">
          <SectionHeader id="active-heading" title="ACTIVE" aside={`${active.length} OF ${MAX_SUBJECT_SLOTS} SLOTS`} warn={full} />
          <ul className="grid gap-3 md:grid-cols-2 xl:gap-3.5">
            {active.map((s) => (
              <li key={s.id}>
                <SubjectCard subject={s} />
              </li>
            ))}
            <li>
              {full ? (
                <div role="status" className="flex items-start gap-2.5 rounded-[10px] border-[1.5px] border-tomato bg-tomato/12 px-3.5 py-3 text-sm leading-[1.45] font-medium">
                  <IconInfoCircle size={18} stroke={2} aria-hidden="true" className="shrink-0 text-tomato" />
                  <span>All 5 slots are in use. Complete a subject or remove one to add another.</span>
                </div>
              ) : (
                <AddSubjectCard used={active.length} onAdd={() => setModalOpen(true)} hint="Search or explore what others are learning" />
              )}
            </li>
          </ul>
        </section>

        {(starred.length > 0 || completed.length > 0) && (
          <div className="mt-7 flex flex-col gap-7 md:grid md:grid-cols-2 md:items-start md:gap-6 xl:mt-0 xl:flex xl:flex-col xl:gap-7">
            {starred.length > 0 && (
              <section aria-labelledby="starred-heading">
                <SectionHeader id="starred-heading" title="STARRED" />
                <ul className="flex flex-col gap-2.5">
                  {starred.map((s) => (
                    <StarredRow key={s.id} subject={s} full={full} />
                  ))}
                </ul>
              </section>
            )}
            {completed.length > 0 && (
              <section aria-labelledby="completed-heading">
                <SectionHeader id="completed-heading" title="COMPLETED" />
                <ul className="flex flex-col gap-2.5">
                  {completed.map((s) => (
                    <li key={s.id}>
                      <Link href={`/subjects/${s.id}`} className={rowBox}>
                        <IconCheck size={20} stroke={3} aria-hidden="true" className="shrink-0 text-pine" />
                        <span className="min-w-0 flex-1 py-1">
                          <span className={cn(nameCls, "block")}>{s.name}</span>
                          <span className="mt-1 block font-mono text-[10px] font-bold tracking-[0.1em] text-muted-ink">
                            {s.topics_passed} OF {s.topics_total} TOPICS
                          </span>
                        </span>
                        <Chip tone="pine" className="px-2 py-[3px] text-[9px] tracking-[0.1em]">Completed</Chip>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>

      <AddSubjectModal open={modalOpen} onOpenChange={setModalOpen} isFull={full} />
    </div>
  );
}
