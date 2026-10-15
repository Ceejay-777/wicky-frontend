import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Fixed-size: a chip never shrinks or wraps (long-text rule).
const chipVariants = cva(
  "inline-flex shrink-0 items-center gap-1 rounded-full border-[1.5px] px-2.5 py-1 font-mono text-[11px] leading-none font-bold tracking-[0.08em] whitespace-nowrap uppercase",
  {
    variants: {
      tone: {
        ink: "border-ink text-ink",
        tomato: "border-tomato text-tomato",
        cobalt: "border-cobalt text-cobalt",
        pine: "border-pine text-pine",
        gold: "border-gold text-gold",
      },
      // Filled = earned/active; dashed = not yet.
      fill: { false: "", true: "" },
      dashed: { false: "", true: "border-dashed" },
    },
    compoundVariants: [
      { fill: true, tone: "ink", className: "bg-ink text-paper" },
      { fill: true, tone: "tomato", className: "bg-tomato text-on-tomato" },
      { fill: true, tone: "cobalt", className: "bg-cobalt text-paper" },
      { fill: true, tone: "pine", className: "bg-pine text-paper" },
      { fill: true, tone: "gold", className: "bg-gold text-paper" },
    ],
    defaultVariants: { tone: "ink", fill: false, dashed: false },
  }
);

function Chip({
  className,
  tone,
  fill,
  dashed,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof chipVariants>) {
  return <span data-slot="chip" className={cn(chipVariants({ tone, fill, dashed }), className)} {...props} />;
}

export { Chip, chipVariants };
