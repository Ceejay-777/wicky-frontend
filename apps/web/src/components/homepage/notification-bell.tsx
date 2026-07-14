"use client";

import Link from "next/link";
import { IconBell } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type NotificationBellProps = {
  unread?: boolean;
  href?: string;
};

export function NotificationBell({
  unread = false,
  href = "/notifications",
}: NotificationBellProps) {
  return (
    <Link
      href={href}
      aria-label={unread ? "Notifications (unread)" : "Notifications"}
      className={cn(
        "relative inline-flex size-11 items-center justify-center",
        "border border-ink bg-background text-ink",
        "transition-colors hover:bg-surface",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      )}
    >
      <IconBell size={20} stroke={1.5} aria-hidden="true" />
      {unread ? (
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary"
        />
      ) : null}
    </Link>
  );
}
