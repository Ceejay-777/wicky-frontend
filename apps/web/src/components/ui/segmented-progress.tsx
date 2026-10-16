import { cn } from "@/lib/utils";

const SEGMENTS =
  "[background:repeating-linear-gradient(90deg,currentColor_0,currentColor_6px,transparent_6px,transparent_9px)]";

type SegmentedProgressProps = {
  percent: number;
  /** Text colour class of the fill, e.g. an accent. */
  className?: string;
  label?: string;
};

// A row of ink segments, filled in the subject accent.
export function SegmentedProgress({ percent, className, label = "Progress" }: SegmentedProgressProps) {
  const value = Math.min(100, Math.max(0, percent));
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} className="relative h-2.5">
      <div aria-hidden="true" className={cn("absolute inset-0 text-muted-ink opacity-35", SEGMENTS)} />
      <div
        aria-hidden="true"
        className={cn("absolute inset-y-0 left-0 transition-[width] duration-(--duration-slow) ease-(--ease-out-quart)", SEGMENTS, className)}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
