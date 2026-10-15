"use client";

import { IconMinus, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type StepperProps = {
  value: number;
  onValueChange: (next: number) => void;
  min: number;
  max: number;
  /** Accessible name, e.g. the subject it applies to. */
  label: string;
  /** Unit shown after the value, e.g. "H". */
  unit?: string;
  disabled?: boolean;
  className?: string;
};

// Clamps at min/max; each button disables at its limit.
function Stepper({ value, onValueChange, min, max, label, unit, disabled, className }: StepperProps) {
  const step = (d: number) => onValueChange(Math.min(max, Math.max(min, value + d)));
  const btn =
    "inline-flex size-11 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-ink bg-field text-ink transition-colors hover:bg-kraft disabled:border-dashed disabled:opacity-50";

  return (
    <div role="group" aria-label={label} className={cn("inline-flex items-center gap-2", className)}>
      <button type="button" className={btn} aria-label={`Decrease ${label}`} disabled={disabled || value <= min} onClick={() => step(-1)}>
        <IconMinus size={20} stroke={2} aria-hidden="true" />
      </button>
      <output aria-live="polite" className="min-w-14 text-center font-mono text-lg font-bold tabular-nums">
        {value}
        {unit && <span className="ml-0.5 text-xs text-muted-ink">{unit}</span>}
      </output>
      <button type="button" className={btn} aria-label={`Increase ${label}`} disabled={disabled || value >= max} onClick={() => step(1)}>
        <IconPlus size={20} stroke={2} aria-hidden="true" />
      </button>
    </div>
  );
}

export { Stepper };
