"use client";

import { useState } from "react";
import { Greeting } from "./greeting";
import { SubjectCard } from "./subject-card";
import { AddSubjectCard } from "./add-subject-card";
import { ExploreStrip } from "./explore-strip";
import { AddSubjectModal } from "./add-subject-modal";
import { Button } from "@/components/ui/button";
import { MAX_SUBJECT_SLOTS } from "@/lib/learning/constants";
import type { EnrolledSubject, Subject, UserProfile } from "@wicky/types";

type HomepageData = {
  profile: UserProfile;
  subjects: EnrolledSubject[];
  explore: Subject[];
};

export function HomepageContent({ data }: { data: HomepageData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const active = data.subjects.filter((s) => s.status === "ACTIVE");
  const isFull = active.length >= MAX_SUBJECT_SLOTS;

  return (
    <div className="px-[22px] pt-[30px] md:px-12 md:pt-11 xl:px-14">
      <Greeting displayName={data.profile.display_name} />

      <div className="xl:grid xl:grid-cols-[2fr_1fr] xl:gap-12">
        <section aria-labelledby="learning-heading">
          <h2 id="learning-heading" className="mt-7 mb-3 font-mono text-xs font-bold tracking-[0.14em] text-muted-ink md:mt-[30px]">
            CURRENTLY LEARNING
          </h2>
          {active.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border-[1.5px] border-dashed border-ink p-8 text-center">
              <span className="inline-flex size-24 items-center justify-center rounded-full border-2 border-dashed border-muted-ink font-mono text-[10px] font-bold tracking-[0.14em] text-muted-ink">
                EMPTY
              </span>
              <h3 className="text-[32px]">Your passport is empty</h3>
              <p className="max-w-xs text-ink-2">Add your first subject and your first stamp is a short read away.</p>
              <Button onClick={() => setModalOpen(true)} className="mt-2">
                Add a subject
              </Button>
            </div>
          ) : (
            <ul className="grid gap-3 md:grid-cols-2 xl:gap-3.5">
              {active.map((s) => (
                <li key={s.id}>
                  <SubjectCard subject={s} />
                </li>
              ))}
              <li>
                <AddSubjectCard used={active.length} onAdd={() => setModalOpen(true)} />
              </li>
            </ul>
          )}
        </section>

        <ExploreStrip subjects={data.explore} />
      </div>

      <AddSubjectModal open={modalOpen} onOpenChange={setModalOpen} isFull={isFull} />
    </div>
  );
}
