import Link from "next/link";
import { IconBell } from "@tabler/icons-react";
import { LocalTime } from "@/components/ui/local-time";

export function ReminderRow({ hours, nextDueAt }: { hours: number; nextDueAt: string | null }) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] border-[1.5px] border-dashed border-ink p-3.5">
      <IconBell size={24} stroke={2} aria-hidden="true" className="shrink-0 text-muted-ink" />
      <div className="min-w-0 flex-1">
        <p className="font-semibold">Study reminders</p>
        <p className="text-[13px] text-ink-2">
          Every {hours} {hours === 1 ? "hour" : "hours"}.{nextDueAt && <> Next <LocalTime iso={nextDueAt} mode="next" />.</>}
        </p>
      </div>
      {/* Route is a proposal (designs.md row 24); the page ships with Profile and settings. */}
      <Link href="/profile/notifications" className="inline-flex min-h-11 items-center font-mono text-xs font-bold tracking-[0.08em] text-cobalt underline">
        CHANGE
      </Link>
    </div>
  );
}
