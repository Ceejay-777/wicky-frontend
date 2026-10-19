"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRefetchOnEvent } from "@/lib/events/use-refetch-on-event";
import { retryRoadmap } from "@/lib/learning/service";
import type { ContentStatus } from "@wicky/types";

// Roadmaps are written in the background. Wait for roadmap.status while it is being prepared; offer retry if it failed.
export function RoadmapStatusNotice({ subjectId, status }: { subjectId: number; status: ContentStatus }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState(false);
  const preparing = status === "NOT_GENERATED" || status === "GENERATING";

  useRefetchOnEvent({ active: preparing, event: "roadmap.status", match: (p) => p.subject_id === subjectId, onChange: () => router.refresh() });

  if (status === "READY") return null;

  const retry = () =>
    start(async () => {
      try {
        setError(false);
        await retryRoadmap(subjectId);
        router.refresh();
      } catch {
        setError(true);
      }
    });

  return (
    <div className="px-[22px] pt-5 md:px-12 xl:px-14">
      {preparing ? (
        <Alert role="status" className="border-dashed">
          <AlertTitle>Writing the roadmap</AlertTitle>
          <AlertDescription>This takes a minute. The page updates by itself.</AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertTitle>The roadmap could not be written</AlertTitle>
          <AlertDescription>{error ? "Retrying did not work. Try again in a moment." : "Nothing is lost. Give it another go."}</AlertDescription>
          <Button type="button" variant="destructive" size="sm" loading={pending} onClick={retry} className="mt-2 justify-self-start">
            Try again
          </Button>
        </Alert>
      )}
    </div>
  );
}
