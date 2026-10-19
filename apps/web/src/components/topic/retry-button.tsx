"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { retryTopic } from "@/lib/learning/service";

// Restarts generation, then re-fetches: the page becomes "preparing" and waits for the event.
export function RetryButton({ topicId }: { topicId: number }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState(false);
  const retry = () =>
    start(async () => {
      try {
        setError(false);
        await retryTopic(topicId);
        router.refresh();
      } catch {
        setError(true);
      }
    });
  return (
    <>
      {error && (
        <p role="alert" className="text-center text-sm text-tomato">
          Retrying did not work. Try again in a moment.
        </p>
      )}
      <Button type="button" loading={pending} onClick={retry} className="h-[52px] text-base">
        Try again
      </Button>
    </>
  );
}
