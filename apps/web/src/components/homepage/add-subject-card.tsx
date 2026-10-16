import { IconPlus } from "@tabler/icons-react";
import { MAX_SUBJECT_SLOTS } from "@/lib/learning/constants";
import { cn } from "@/lib/utils";

const box = "flex min-h-full items-center gap-3.5 rounded-xl border-[1.5px] border-dashed border-ink p-3.5 text-left text-ink";

// "Add a subject" opens the add flow. At the limit it stays, and explains instead of offering a failing action.
export function AddSubjectCard({ used, onAdd, hint }: { used: number; onAdd: () => void; hint?: string }) {
  const full = used >= MAX_SUBJECT_SLOTS;
  const free = MAX_SUBJECT_SLOTS - used;
  const body = (
    <>
      <span aria-hidden="true" className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-tomato text-tomato">
        <IconPlus size={24} stroke={2.5} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[27px] leading-[0.95] font-black uppercase">{full ? "Passport full" : "Add a subject"}</span>
        <span className="mt-1 block text-sm text-ink-2">
          {full ? "Finish or remove a subject to free a page." : (hint ?? `${free} stamp ${free === 1 ? "page" : "pages"} free`)}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-1.5">
        <span aria-hidden="true" className="flex gap-1">
          {Array.from({ length: MAX_SUBJECT_SLOTS }, (_, i) => (
            <span key={i} className={cn("size-3.5 rounded-[3px] border-[1.5px] border-tomato", i < used && "bg-tomato")} />
          ))}
        </span>
        <span className="font-mono text-[11px] font-bold tracking-[0.08em] text-muted-ink">{used}/{MAX_SUBJECT_SLOTS} SLOTS</span>
      </span>
    </>
  );

  return full ? (
    <div className={box}>{body}</div>
  ) : (
    <button type="button" onClick={onAdd} className={cn(box, "w-full transition-colors hover:bg-kraft/60")}>
      {body}
    </button>
  );
}
