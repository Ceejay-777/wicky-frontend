"use client";

import { cn } from "@/lib/utils";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  /** Accessible name; the visible control has no text of its own. */
  label: string;
  disabled?: boolean;
  className?: string;
};

// Exposes on/off to assistive tech and shows ON/OFF text, so state is never colour alone.
function Switch({ checked, onCheckedChange, label, disabled, className }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn("inline-flex min-h-11 shrink-0 items-center gap-2 disabled:opacity-50", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-block h-7 w-[52px] rounded-[14px] border-[1.5px] transition-colors duration-(--duration-base)",
          checked ? "border-pine bg-pine" : "border-ink bg-transparent"
        )}
      >
        <span
          className={cn(
            "absolute top-[3px] size-[22px] rounded-full transition-[left] duration-(--duration-base) ease-(--ease-out-quart)",
            checked ? "left-[26px] bg-paper" : "left-[3px] bg-ink"
          )}
        />
      </span>
      <span
        aria-hidden="true"
        className={cn("w-6 font-mono text-[10px] font-bold tracking-[0.08em]", checked ? "text-pine" : "text-muted-ink")}
      >
        {checked ? "ON" : "OFF"}
      </span>
    </button>
  );
}

export { Switch };
