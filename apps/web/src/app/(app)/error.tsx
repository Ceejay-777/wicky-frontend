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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8 text-foreground sm:px-6 sm:py-12 lg:px-8">
      <div className="w-full max-w-sm text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          Something went wrong
        </p>
        <h1 className="mt-3 font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[36px]">
          The page hit a snag.
        </h1>
        <p className="mt-3 font-body text-[15px] text-muted-foreground">
          Reload the page to try again, or head back to the home page.
        </p>
        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
