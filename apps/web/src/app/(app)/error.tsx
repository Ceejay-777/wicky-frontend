"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-3 px-[22px] text-center">
      <span className="font-mono text-xs font-bold tracking-[0.14em] text-tomato">STAMP SMUDGED</span>
      <h1 className="text-[40px]">That page didn&rsquo;t load</h1>
      <p className="max-w-sm text-ink-2">Something went wrong on our side. Your progress is safe. Give it another go.</p>
      <Button onClick={reset} className="mt-2">
        Try again
      </Button>
    </div>
  );
}
