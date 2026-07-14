"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AuthError({
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
    <div className="mx-auto w-full max-w-sm px-4 py-8 text-center sm:px-6 sm:py-12 lg:px-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="mt-3 font-display text-[24px] font-semibold leading-[1.1] tracking-[-0.015em] sm:text-[28px]">
        That didn&rsquo;t work.
      </h1>
      <p className="mt-3 font-body text-[15px] text-muted-foreground">
        Give it another try, or go back to sign in.
      </p>
      <div className="mt-6">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
      </div>
    </div>
  );
}
