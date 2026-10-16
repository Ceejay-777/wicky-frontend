import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { LevelSeal } from "@/components/stamp/level-seal";
import { Chip } from "@/components/ui/chip";
import { ACCENT_TEXT, accentFor } from "@/lib/learning/accent";
import type { SubjectDetail } from "@wicky/types";

// Long titles step down in size, then clamp to 3 lines (long text rule).
function titleSize(name: string) {
  return name.length <= 14
    ? "text-[60px]"
    : name.length <= 24
      ? "text-[44px]"
      : name.length <= 36
        ? "text-[38px]"
        : "text-[32px]";
}

export function SubjectHeader({ subject }: { subject: SubjectDetail }) {
  const completed = subject.status === "COMPLETED";
  return (
    <header className="px-[22px] pt-[26px] md:px-12 md:pt-8 xl:px-14">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="-ml-1.5 inline-flex min-h-11 items-center gap-1 pr-2.5 pl-1 font-mono text-xs font-bold tracking-[0.1em] text-ink"
        >
          <IconChevronLeft size={20} stroke={2} aria-hidden="true" />
          HOME
        </Link>
        <Chip tone={completed ? "cobalt" : "pine"}>{completed ? "Completed" : "Active"}</Chip>
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-2.5">
        <h1
          className={`line-clamp-3 min-w-0 leading-[0.9] tracking-[0.005em] [hyphens:auto] [overflow-wrap:break-word] ${titleSize(subject.name)}`}
        >
          {subject.name}
        </h1>
        <LevelSeal level={subject.level_unlocked} className={ACCENT_TEXT[accentFor(subject.id)]} />
      </div>
    </header>
  );
}
