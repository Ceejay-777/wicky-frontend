import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ReadingHeader } from "./reading-header";

type Props = {
  backHref: string;
  /** Subject name for the header; unknown on the not-found screen. */
  subject?: string;
  icon: ReactNode;
  /** Mono label inside the dashed circle. */
  stamp: string;
  /** Dashed circle and icon colour: muted for locked, tomato for problems. */
  tone: "muted" | "tomato";
  eyebrow: string;
  title: string;
  text: string;
  /** Primary action first, then secondary. */
  children: ReactNode;
};

// Full screen states of a topic that cannot be read: locked, not ready, not found.
export function TopicStateScreen({ backHref, subject, icon, stamp, tone, eyebrow, title, text, children }: Props) {
  const color = tone === "tomato" ? "text-tomato border-tomato" : "text-muted-ink border-muted-ink";
  return (
    <div className="flex min-h-dvh flex-col px-[22px] pt-[86px] pb-7 leading-[normal]">
      <ReadingHeader backHref={backHref} subject={subject} />
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col">
        <div className="my-auto">
          <div className="flex justify-center">
            <div className={cn("flex size-[150px] -rotate-6 flex-col items-center justify-center gap-2 rounded-full border-[2.5px] border-dashed", color)}>
              {icon}
              <span className="font-mono text-[11px] font-bold tracking-[0.14em]">{stamp}</span>
            </div>
          </div>
          <div className="mt-[22px] text-center">
            <span className="font-mono text-[11px] font-bold tracking-[0.12em] text-tomato">{eyebrow}</span>
            <h1 className="mt-2.5 line-clamp-3 text-[46px] leading-[0.92] [hyphens:auto] [overflow-wrap:break-word]">{title}</h1>
            <p className="mx-auto mt-3 max-w-[290px] text-[15px] leading-[1.5] text-ink-2">{text}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">{children}</div>
      </div>
    </div>
  );
}
