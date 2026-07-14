"use client";

import { useEffect, useState } from "react";
import { timeOfDay } from "@/lib/learning/time";
import { cn } from "@/lib/utils";

type GreetingProps = {
  displayName: string | null;
  loading?: boolean;
};

export function Greeting({ displayName, loading }: GreetingProps) {
  const [word, setWord] = useState<string | null>(null);

  useEffect(() => {
    setWord(timeOfDay());
  }, []);

  const tod = word ?? "day";
  const name = displayName ?? "there";

  return (
    <header className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
      <h1
        className={cn(
          "font-display font-semibold tracking-[-0.015em] sm:tracking-[-0.018em] lg:tracking-[-0.02em]",
          "text-[28px] leading-[1.1] sm:text-[36px] sm:leading-[1.08] lg:text-[44px] lg:leading-[1.05]",
          "text-foreground"
        )}
      >
        {loading || !displayName ? (
          "Welcome back."
        ) : (
          <>
            <span>Good </span>
            <span className="italic">{tod}</span>
            <span>, {name}.</span>
          </>
        )}
      </h1>
      <p className="mt-2 font-display text-[16px] italic text-muted-foreground sm:mt-3 sm:text-[18px]">
        An almanac of learning, kept up to date.
      </p>
    </header>
  );
}
