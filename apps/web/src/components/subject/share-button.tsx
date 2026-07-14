"use client";

import { IconShare3 } from "@tabler/icons-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ShareButtonProps = {
  className?: string;
};

export function ShareButton({ className }: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={() =>
        toast("Sharing ships in a later pass.", {
          description:
            "The subject link will be shareable from this button soon.",
        })
      }
      aria-label="Share this subject"
      className={cn(
        "inline-flex size-11 items-center justify-center",
        "border border-ink bg-background text-ink",
        "transition-colors hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      <IconShare3 size={20} stroke={1.5} aria-hidden="true" />
    </button>
  );
}
