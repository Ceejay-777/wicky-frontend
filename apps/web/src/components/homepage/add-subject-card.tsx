import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type AddSubjectCardProps = {
  slotsUsed: number;
  slotsTotal: number;
  href?: string;
};

export function AddSubjectCard({
  slotsUsed,
  slotsTotal,
  href = "/subjects",
}: AddSubjectCardProps) {
  const isFull = slotsUsed >= slotsTotal;

  return (
    <Link
      href={href}
      aria-disabled={isFull}
      aria-label={
        isFull
          ? `All ${slotsTotal} subject slots used`
          : "Add a new subject"
      }
      className={cn(
        "flex h-full w-[200px] shrink-0 flex-col items-center justify-center",
        "border border-dashed border-ink bg-background p-4",
        "transition-colors hover:bg-surface",
        "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary",
        isFull && "pointer-events-none opacity-50"
      )}
    >
      <IconPlus size={28} stroke={1.5} aria-hidden="true" className="text-ink" />
      <div className="mt-3 font-display text-[16px] font-semibold text-foreground">
        Add Subject
      </div>
      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        {slotsUsed}/{slotsTotal} slots used
      </div>
    </Link>
  );
}
