"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { retryRoadmap } from "@/lib/learning/service";
import type { ContentStatus } from "@wicky/types";

const POLL_MS = 5000;

// Roadmaps are written in the background. Poll while it is being prepared; offer retry if it failed.
export function RoadmapStatusNotice({ subjectId, status }: { subjectId: number; status: ContentStatus }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState(false);
  const preparing = status === "NOT_GENERATED" || status === "GENERATING";

  useEffect(() => {
    if (!preparing) return;
    const t = setInterval(() => router.refresh(), POLL_MS);
    return () => clearInterval(t);
  }, [preparing, router]);

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
