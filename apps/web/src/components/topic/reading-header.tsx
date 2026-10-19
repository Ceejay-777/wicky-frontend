import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const DASHES = (color: string) => `repeating-linear-gradient(90deg, ${color} 0, ${color} 6px, transparent 6px, transparent 9px)`;

type Props = {
  backHref: string;
  /** Mono subject label, shown until the title block scrolls away. */
  subject?: string;
  /** Replaces the subject label once the title has scrolled past. */
  title?: string;
  compact?: boolean;
  /** 0 to 100. Omit to hide the perforated progress line. */
  progress?: number;
  /** Omit to hide the "Aa" control. */
  onTextSize?: () => void;
};

// Fixed 56px bar plus the 6px perforated progress line. It stays as wide as the reading column.
export function ReadingHeader({ backHref, subject, title, compact = false, progress, onTextSize }: Props) {
  return (
    <header className={cn("fixed inset-x-0 top-0 z-30 bg-paper", compact && "border-b border-ink/20")}>
      <div className="mx-auto md:max-w-[720px] xl:max-w-[680px]">
        <div className="flex h-14 items-center gap-1 pr-3 pl-1.5">
          <Link href={backHref} aria-label="Back to roadmap" className="inline-flex size-11 items-center justify-center text-ink">
            <IconChevronLeft size={24} stroke={2} aria-hidden="true" />
          </Link>
          <div className={cn("min-w-0 flex-1", compact ? "text-left" : "text-center")}>
            {compact ? (
              <span className="block truncate font-display text-[21px] font-black tracking-[0.01em] uppercase">{title}</span>
            ) : (
              <span className="block truncate font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink uppercase">{subject}</span>
            )}
          </div>
          {onTextSize ? (
            <button
              type="button"
              aria-label="Text size"
              aria-haspopup="dialog"
              onClick={onTextSize}
              className="size-11 cursor-pointer font-serif text-[19px] font-medium text-ink"
            >
              A<span className="text-sm">a</span>
            </button>
          ) : (
            <span className="w-11" />
          )}
        </div>
        {progress !== undefined && (
          <div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress" className="relative mx-[22px] h-1.5">
            <div className="absolute inset-0 opacity-30" style={{ background: DASHES("var(--muted)") }} />
            <div className="absolute inset-y-0 left-0" style={{ width: `${progress}%`, background: DASHES("var(--tomato)") }} />
          </div>
        )}
      </div>
    </header>
  );
}
