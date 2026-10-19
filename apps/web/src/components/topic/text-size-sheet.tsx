"use client";

import { DrawerContent, DrawerRoot, DrawerTitle } from "@/components/ui/drawer";
import { TEXT_SIZES, type TextSize } from "@/lib/learning/reading";
import { cn } from "@/lib/utils";

const OPTIONS: { value: TextSize; label: string; sample: string }[] = [
  { value: "small", label: "SMALL", sample: "text-[21px]" },
  { value: "medium", label: "MEDIUM", sample: "text-[24px]" },
  { value: "large", label: "LARGE", sample: "text-[28px]" },
];

type Props = { open: boolean; onOpenChange: (open: boolean) => void; size: TextSize; onSize: (size: TextSize) => void; preview: string };

// Bottom sheet from the "Aa" control. It changes the body text only, and the preview follows the choice.
export function TextSizeSheet({ open, onOpenChange, size, onSize, preview }: Props) {
  return (
    <DrawerRoot open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mt-0 rounded-t-[24px] outline-none border-0 border-t-[1.5px] bg-paper px-[22px] pt-3 pb-[calc(28px+env(safe-area-inset-bottom))] md:mx-auto md:max-w-[680px]">
        <div aria-hidden="true" className="mx-auto mb-[18px] h-[5px] w-11 rounded-[3px] bg-muted-ink opacity-50" />
        <DrawerTitle className="font-mono text-[11px] font-bold tracking-[0.14em] text-muted-ink uppercase">Text size</DrawerTitle>
        <div className="mt-3.5 flex gap-2.5">
          {OPTIONS.map((o) => {
            const on = o.value === size;
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={on}
                onClick={() => onSize(o.value)}
                className={cn(
                  "flex h-[76px] flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-[12px] bg-field text-ink",
                  on ? "border-[2.5px] border-tomato" : "border-[1.5px] border-ink",
                )}
              >
                <span className={cn("font-serif leading-none font-medium", o.sample)}>Aa</span>
                <span className={cn("font-mono text-[10px] font-bold tracking-[0.1em]", !on && "text-muted-ink")}>{o.label}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 line-clamp-3 font-serif leading-[1.55] text-ink-2" style={{ fontSize: TEXT_SIZES[size] }}>
          {preview}
        </p>
      </DrawerContent>
    </DrawerRoot>
  );
}
