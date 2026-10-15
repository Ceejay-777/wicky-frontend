import Link from "next/link";
import type { ReactNode } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type TopBarProps = {
  /** Centered mono title. */
  title?: string;
  /** Back goes to the logical parent, not browser history. */
  backHref?: string;
  /** Accessible name of the back control; also shown as text on desktop. */
  backLabel?: string;
  /** Right-hand action (a 44px control). */
  action?: ReactNode;
  className?: string;
};

// 56px bar: back control, centered mono title, optional right action.
export function TopBar({ title, backHref, backLabel = "Back", action, className }: TopBarProps) {
  return (
    <header className={cn("flex h-14 items-center gap-1 pr-4 pl-1.5 md:px-12 xl:px-14", className)}>
      {backHref ? (
        <Link
          href={backHref}
          aria-label={backLabel}
          className="inline-flex h-11 min-w-11 items-center justify-center gap-1 text-ink xl:pr-3"
        >
          <IconChevronLeft size={24} stroke={2} aria-hidden="true" />
          <span className="hidden font-mono text-xs font-bold tracking-[0.1em] uppercase xl:inline">{backLabel}</span>
        </Link>
      ) : (
        <span className="w-11" />
      )}
      <span className="min-w-0 flex-1 truncate text-center font-mono text-xs font-bold tracking-[0.12em] text-ink normal-case">
        {title}
      </span>
      <span className="flex min-w-11 justify-end">{action}</span>
    </header>
  );
}
