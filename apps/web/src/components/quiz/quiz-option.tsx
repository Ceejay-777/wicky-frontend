import { cn } from "@/lib/utils";
import { CodeText } from "./code-text";

type Props = { letter: string; text: string; selected: boolean; onSelect: () => void };

// The AI writes code answers with real line breaks and indents (meaningful in Python), so those keep a code look.
export const isCode = (text: string) => text.includes("\n");

// The BE keeps the answers back until the whole quiz is submitted, so an option is only ever idle or selected.
export function QuizOption({ letter, text, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex min-h-16 w-full cursor-pointer items-center gap-3 rounded-[12px] border-[1.5px] border-ink bg-field px-3.5 py-3 text-left text-ink transition-colors",
        selected && "border-[3px] bg-ink/10 px-[13px] py-[11px]",
      )}
    >
      <span
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-[8px] border-[1.5px] border-ink font-mono text-sm font-bold",
          selected && "bg-ink text-paper",
        )}
      >
        {letter}
      </span>
      <span className="min-w-0 flex-1">
        {selected && <span className="mb-1 block font-mono text-[10px] font-bold tracking-[0.14em] text-ink">SELECTED</span>}
        <span className={cn("block text-base leading-[1.35] font-medium whitespace-pre-wrap [overflow-wrap:break-word]", isCode(text) ? "font-mono text-sm" : "[hyphens:auto]")}>{isCode(text) ? text : <CodeText text={text} />}</span>
      </span>
      <span aria-hidden="true" className="inline-flex size-[22px] shrink-0 items-center justify-center rounded-full border-2 border-ink">
        {selected && <span className="size-2.5 rounded-full bg-ink" />}
      </span>
    </button>
  );
}
