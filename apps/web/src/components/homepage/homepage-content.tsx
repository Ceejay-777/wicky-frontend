"use client";

import { useState } from "react";
import { Greeting } from "./greeting";
import { NotificationBell } from "./notification-bell";
import { CurrentlyLearningList } from "./currently-learning-list";
import { ExploreSubjectsStrip } from "./explore-subjects-strip";
import { AddSubjectModal } from "./add-subject-modal";
import { MAX_SUBJECT_SLOTS } from "@/lib/learning/constants";
import type { EnrolledSubject, Subject, UserProfile } from "@wicky/types";

type HomepageData = {
  profile: UserProfile;
  subjects: EnrolledSubject[];
  explore: Subject[];
};

export function HomepageContent({ data }: { data: HomepageData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const isFull = data.subjects.length >= MAX_SUBJECT_SLOTS;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          An Almanac of Learning
        </span>
        <NotificationBell unread={false} />
      </div>
      <hr className="border-t border-ink" />

      <Greeting displayName={data.profile.display_name} />

      <div className="px-4 sm:px-6 lg:px-8">
        <CurrentlyLearningList
          subjects={data.subjects}
          isFull={isFull}
          onAddSubject={() => setModalOpen(true)}
        />
        <ExploreSubjectsStrip subjects={data.explore} />
      </div>

      <div className="h-8 lg:hidden" aria-hidden="true" />

      <AddSubjectModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        isFull={isFull}
      />
    </div>
  );
}
