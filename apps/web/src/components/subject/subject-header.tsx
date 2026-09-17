import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { ShareButton } from "./share-button";
import { MarqueeText } from "./marquee-text";
import { cn } from "@/lib/utils";

type SubjectHeaderProps = {
  name: string;
};

export function SubjectHeader({ name }: SubjectHeaderProps) {
  return (
    <header>
      <div className="flex items-center gap-3 px-4 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-5 lg:px-8 lg:pb-6">
        <Link
          href="/"
          aria-label="Back to home"
          className={cn(
            "inline-flex size-11 shrink-0 items-center justify-center",
            "text-ink transition-colors hover:bg-accent",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          )}
        >
          <IconChevronLeft size={20} stroke={1.5} aria-hidden="true" />
        </Link>
        <MarqueeText
          text={name}
          className={cn(
            "flex-1 min-w-0 text-center",
            "font-display font-semibold tracking-[-0.015em]",
            "text-[28px] leading-[1.1] text-foreground",
            "sm:text-[32px] sm:tracking-[-0.018em]",
            "lg:text-[36px] lg:tracking-[-0.02em]",
          )}
        />
        <ShareButton />
      </div>
      <hr className="border-t border-ink" />
    </header>
  );
}
