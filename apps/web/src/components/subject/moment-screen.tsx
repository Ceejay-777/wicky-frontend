"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { MomentSeal } from "@/components/stamp/moment-seal";
import { addSubject } from "@/lib/learning/service";
import { takeMoment } from "@/lib/learning/moment";
import { cn } from "@/lib/utils";
import type { ProgressCheckResponse, SubjectSuggestion } from "@wicky/types";

type Props = {
  subjectId: number;
  name: string;
  /** Level 1 passed/total for a level up; every topic count for a completion. */
  passed: number;
  total: number;
  /** Free slots right now, derived from the enrolled list (spec: suggestions respect the limit). */
  freeSlots: number;
};

// "World War II" -> "WWII": initials, keeping all-caps tokens whole.
const tag = (name: string) =>
  name.split(/\s+/).map((w) => (w === w.toUpperCase() ? w : w[0].toUpperCase())).join("").slice(0, 5);

function SuggestionRow({ s, disabled, onAdd }: { s: SubjectSuggestion; disabled: boolean; onAdd: (id: number) => Promise<boolean> }) {
  const [state, setState] = useState<"idle" | "adding" | "added" | "failed">("idle");
  return (
    <li className="flex items-center gap-3 rounded-xl border-[1.5px] border-ink bg-field px-3.5 py-3">
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 font-display text-2xl leading-none font-black uppercase [hyphens:auto] [overflow-wrap:break-word]">{s.name}</p>
        <p className="mt-0.5 line-clamp-2 text-[13px] text-ink-2">{state === "failed" ? "Could not add this one. Try again." : s.reason}</p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        loading={state === "adding"}
        disabled={disabled || state === "added"}
        aria-label={`Add ${s.name}`}
        className="shrink-0 font-mono text-xs tracking-[0.1em]"
        onClick={async () => {
          setState("adding");
          setState((await onAdd(s.id)) ? "added" : "failed");
        }}
      >
        {state === "added" ? "ADDED" : "ADD"}
      </Button>
    </li>
  );
}

export function MomentScreen({ subjectId, name, passed, total, freeSlots }: Props) {
  const router = useRouter();
  const [moment, setMoment] = useState<ProgressCheckResponse | null>(null);
  const [slots, setSlots] = useState(freeSlots);
  const taken = useRef(false);

  // Read once: the stored result is removed, so a revisit or refresh does not replay the moment.
  useEffect(() => {
    if (taken.current) return;
    taken.current = true;
    const m = takeMoment(subjectId);
    // sessionStorage is browser-only, so it can only be read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (m && m.action !== "none") setMoment(m);
    else router.replace(`/subjects/${subjectId}`);
  }, [subjectId, router]);

  if (!moment) return <div className="min-h-dvh" aria-busy="true" />;

  const levelUp = moment.action === "level_up";
  const level = moment.new_level_unlocked ?? 2;
  const add = async (id: number) => {
    try {
      await addSubject(id);
      setSlots((n) => Math.max(0, n - 1));
      router.refresh();
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-[620px] flex-col px-[22px] pt-[30px] pb-6">
      <span className="font-display text-3xl leading-none font-black tracking-[0.04em] text-tomato">WICKY</span>
      <div className="mt-[22px]">
        <MomentSeal
          className={levelUp ? "text-tomato" : "text-cobalt"}
          label={levelUp ? `Wicky level ${level} unlocked` : `Wicky complete, all ${total} passed`}
          top={levelUp ? "WICKY LEVEL" : "WICKY COMPLETE"}
          bottom={levelUp ? "UNLOCKED" : `ALL ${total} PASSED`}
          center={levelUp ? String(level) : tag(name)}
        />
      </div>
      <div className="mt-5 text-center">
        <h1 className="text-[52px] leading-[0.86] tracking-[0.005em]">
          {levelUp ? <>Level {level}<br />unlocked</> : <>Subject<br />complete</>}
        </h1>
        <p className="mx-auto mt-3 max-w-[290px] text-[15px] leading-[1.45] text-ink-2 [overflow-wrap:break-word]">
          {levelUp ? `You passed ${passed} of ${total} topics in Level ${level - 1} of ${name}.` : `You passed every level of ${name}. Pick what to learn next.`}
        </p>
      </div>

      {levelUp && (
        <p className="mt-5 rounded-[10px] border-[1.5px] border-dashed border-muted-ink px-3.5 py-3 text-sm text-ink-2">
          {slots > 0 ? (
            <>You have <strong className="text-ink">{slots} free subject {slots === 1 ? "slot" : "slots"}</strong>. Fancy another subject?</>
          ) : (
            "All 5 subject slots are in use. Finish or remove a subject to add another."
          )}
        </p>
      )}

      {moment.suggestions.length > 0 && (
        <ul className="mt-[22px] flex flex-col gap-2.5" aria-label="Suggested subjects">
          {moment.suggestions.map((s) => (
            <SuggestionRow key={s.id} s={s} disabled={slots === 0} onAdd={add} />
          ))}
        </ul>
      )}

      <div className="mt-auto pt-[18px]">
        {levelUp ? (
          <Link href={`/subjects/${subjectId}/roadmap`} className={cn(buttonVariants(), "h-[52px] w-full text-base")}>
            Continue to Level {level}
          </Link>
        ) : (
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "h-[52px] w-full text-base")}>
            Back to home
          </Link>
        )}
      </div>
    </div>
  );
}
