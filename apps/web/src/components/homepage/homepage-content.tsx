"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Greeting } from "./greeting";
import { NotificationBell } from "./notification-bell";
import { CurrentlyLearningList } from "./currently-learning-list";
import { ExploreSubjectsStrip } from "./explore-subjects-strip";
import {
  getProfile,
  getEnrolledSubjects,
  getExploreSubjects,
  ApiRequestError,
} from "@/lib/learning/service";
import { MAX_SUBJECT_SLOTS } from "@/lib/learning/constants";
import type { EnrolledSubject, Subject, UserProfile } from "@wicky/types";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

const initialState: FetchState<never> = {
  data: null,
  error: null,
  loading: true,
};

function isApiError(err: unknown): err is ApiRequestError {
  return err instanceof ApiRequestError;
}

export function HomepageContent() {
  const router = useRouter();
  const [profile, setProfile] =
    useState<FetchState<UserProfile>>(initialState);
  const [subjects, setSubjects] =
    useState<FetchState<EnrolledSubject[]>>(initialState);
  const [explore, setExplore] = useState<FetchState<Subject[]>>(initialState);

  const load = useCallback(async () => {
    setProfile((p) => ({ ...p, loading: true, error: null }));
    setSubjects((p) => ({ ...p, loading: true, error: null }));
    setExplore((p) => ({ ...p, loading: true, error: null }));

    const [pRes, sRes, eRes] = await Promise.allSettled([
      getProfile(),
      getEnrolledSubjects(),
      getExploreSubjects(),
    ]);

    if (pRes.status === "fulfilled") {
      setProfile({ data: pRes.value, error: null, loading: false });
    } else if (isApiError(pRes.reason) && pRes.reason.status === 401) {
      router.push("/signin");
      router.refresh();
    } else {
      setProfile({
        data: null,
        error:
          pRes.reason instanceof Error
            ? pRes.reason.message
            : "Could not load profile.",
        loading: false,
      });
    }

    if (sRes.status === "fulfilled") {
      setSubjects({ data: sRes.value, error: null, loading: false });
    } else if (isApiError(sRes.reason) && sRes.reason.status === 401) {
      router.push("/signin");
      router.refresh();
    } else {
      setSubjects({
        data: null,
        error:
          sRes.reason instanceof Error
            ? sRes.reason.message
            : "Could not load subjects.",
        loading: false,
      });
    }

    if (eRes.status === "fulfilled") {
      setExplore({ data: eRes.value, error: null, loading: false });
    } else if (isApiError(eRes.reason) && eRes.reason.status === 401) {
      router.push("/signin");
      router.refresh();
    } else {
      setExplore({
        data: null,
        error:
          eRes.reason instanceof Error
            ? eRes.reason.message
            : "Could not load explore subjects.",
        loading: false,
      });
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  const slotsUsed = subjects.data?.length ?? 0;
  const retryAll = () => void load();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          An Almanac of Learning
        </span>
        <NotificationBell unread={false} />
      </div>
      <hr className="border-t border-ink" />

      <Greeting
        displayName={profile.data?.display_name ?? null}
        loading={profile.loading}
      />

      <div className="px-4 sm:px-6 lg:px-8">
        <CurrentlyLearningList
          subjects={subjects.data ?? []}
          loading={subjects.loading}
          error={subjects.error}
          onRetry={retryAll}
        />

        <ExploreSubjectsStrip
          subjects={explore.data ?? []}
          slotsUsed={slotsUsed}
          slotsTotal={MAX_SUBJECT_SLOTS}
          loading={explore.loading}
          error={explore.error}
          onRetry={retryAll}
        />
      </div>

      <div className="h-8 lg:hidden" aria-hidden="true" />
    </div>
  );
}
