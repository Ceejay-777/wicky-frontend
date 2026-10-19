"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { ResourceLink } from "@wicky/types";
import { Chip } from "@/components/ui/chip";
import { markResourceLinksViewed } from "@/lib/learning/service";
import { TEXT_SIZES } from "@/lib/learning/reading";
import { useTextSize } from "@/lib/learning/use-text-size";
import { CheckIcon, LockIcon } from "./icons";
import { ReadingFooter } from "./reading-footer";
import { ReadingHeader } from "./reading-header";
import { ResourceLinkRow } from "./resource-link-row";
import { TextSizeSheet } from "./text-size-sheet";
import { TitleBlock } from "./title-block";
import { TopicStamp } from "@/components/stamp/topic-stamp";
import { READING_GRID, READING_RAIL } from "./reading-layout";

type Props = {
  topicId: number;
  title: string;
  subjectId: number;
  subjectName: string;
  level: number;
  number: number;
  paragraphs: string[];
  minutes: number;
  links: ResourceLink[];
  /** ISO pass date; null when not passed. */
  passedAt: string | null;
  advancedPassed: boolean;
  /** BE says the advanced quiz is open (normal passed, links viewed, advanced not passed). */
  advancedAvailable: boolean;
  nextHref: string | null;
  underReview: boolean;
  quizNotice: string | null;
};

const HEADER_H = 62;
const noopSubscribe = () => () => {};

// "13 OCT" in the learner's own zone and locale.
const shortDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" }).toUpperCase();

export function ReadingView({ topicId, title, subjectId, subjectName, level, number, paragraphs, minutes, links, passedAt, advancedPassed, advancedAvailable, nextHref, underReview, quizNotice }: Props) {
  const passed = passedAt !== null;
  const [size, pickSize] = useTextSize();
  const [sheet, setSheet] = useState(false);
  const [compact, setCompact] = useState(false);
  const [progress, setProgress] = useState(0);
  // Local format, so only the client knows it: the server snapshot is empty.
  const date = useSyncExternalStore(noopSubscribe, () => (passedAt ? shortDate(passedAt) : undefined), () => undefined);
  const [viewedNow, setViewedNow] = useState(false);
  const [footerH, setFooterH] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const recording = useRef(false);
  const linksViewed = !advancedPassed && (advancedAvailable || (passed && viewedNow));

  // Reading progress follows the page scroll; the compact header takes over once the title is gone.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100))) : 0);
      setCompact((titleRef.current?.getBoundingClientRect().bottom ?? HEADER_H) < HEADER_H);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // The footer grows when a quiz notice shows, so its height is measured, not assumed.
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setFooterH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Records the "resource links viewed" event once. Failure is silent and never blocks reading.
  const onLinkOpen = useCallback(() => {
    if (recording.current) return;
    recording.current = true;
    markResourceLinksViewed(topicId)
      .then((at) => setViewedNow(at !== null))
      .catch(() => {
        recording.current = false;
      });
  }, [topicId]);

  const accent = { "--read-size": `${TEXT_SIZES[size]}px` } as CSSProperties;

  return (
    <div style={accent} className="leading-[normal]">
      <ReadingHeader
        backHref={`/subjects/${subjectId}/roadmap`}
        subject={subjectName}
        title={title}
        compact={compact}
        progress={progress}
        onTextSize={() => setSheet(true)}
      />
      <div className="pt-[62px]" style={{ paddingBottom: footerH ? footerH + 20 : 104 }}>
        <div className={READING_GRID}>
          <div>
            <TitleBlock
              level={level}
              number={number}
              title={title}
              meta={`~${minutes} MIN READ`}
              passed={passed}
              passedDate={date}
              titleRef={titleRef}
              chip={
                passed && (
                  <Chip tone="pine" className="gap-1.5 self-start py-[5px]">
                    <CheckIcon />
                    {date ? `PASSED ${date}` : "PASSED"}
                  </Chip>
                )
              }
            />
            {underReview && (
              <div role="status" className="mx-[22px] mt-5 rounded-[10px] border-[1.5px] border-dashed border-muted-ink px-3.5 py-3 text-sm leading-[1.45] text-muted-ink">
                This reading is still being reviewed. You can keep reading.
              </div>
            )}
            <div className="px-[22px] pt-[22px] pb-1">
              {paragraphs.map((p, i) => {
                const [first, ...rest] = Array.from(p);
                return (
                  <p key={i} className="mb-[18px] font-serif text-[length:var(--read-size)] leading-[1.62] text-ink [hyphens:auto]">
                    {i === 0 ? (
                      <>
                        <span aria-hidden="true" className="float-left pt-1.5 pr-2 font-display text-[68px] leading-[0.78] font-black text-tomato">{first}</span>
                        <span className="sr-only">{first}</span>
                        {rest.join("")}
                      </>
                    ) : (
                      p
                    )}
                  </p>
                );
              })}
            </div>
            <div className="px-[22px] pt-2.5 xl:pt-1.5 xl:pb-1">
              <div className="border-t-2 border-dotted border-muted-ink pt-3.5 text-center">
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-muted-ink">END OF ENTRY</span>
              </div>
            </div>
          </div>
          <aside className={READING_RAIL}>
            {links.length > 0 && (
              <section id="further-study" className="scroll-mt-20" aria-labelledby="further-study-label">
                <h2 id="further-study-label" className="font-sans text-base leading-[normal] font-normal normal-case">
                  <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-muted-ink">FURTHER STUDY</span>
                </h2>
                <div className="mt-3 flex flex-col gap-2.5">
                  {links.map((l) => (
                    <ResourceLinkRow key={l.url} link={l} onOpen={onLinkOpen} />
                  ))}
                </div>
              </section>
            )}
            {passed ? (
              <section aria-label="Advanced quiz" className="mt-[26px] rounded-[14px] border-[1.5px] border-gold bg-field p-4">
                <div className="flex items-center justify-between gap-2.5">
                  <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-gold">ADVANCED QUIZ</span>
                  {advancedPassed ? (
                    <Chip tone="gold" className="gap-1.5 py-[5px] tracking-[0.1em]"><CheckIcon />PASSED</Chip>
                  ) : linksViewed ? (
                    <Chip tone="gold" className="gap-1.5 py-[5px] tracking-[0.1em]"><CheckIcon />READY</Chip>
                  ) : (
                    <Chip dashed className="gap-1.5 border-muted-ink py-[5px] tracking-[0.1em] text-muted-ink"><LockIcon />LOCKED</Chip>
                  )}
                </div>
                <p className="mt-2.5 font-display text-[28px] leading-[0.95] font-black uppercase">Double the points</p>
                <p className="mt-2 text-sm leading-[1.5] text-ink-2">
                  {advancedPassed
                    ? "You passed the advanced quiz on this topic."
                    : linksViewed
                    ? "The advanced quiz is worth about twice as many points as the normal one. You have viewed a further study link, so the advanced quiz is open."
                    : "The advanced quiz is worth about twice as many points as the normal one. Open one of the further study links above to unlock it."}
                </p>
              </section>
            ) : (
              <section aria-label="Earn your stamp" className="mt-[26px] flex items-center gap-3.5 rounded-[14px] border-[1.5px] border-dashed border-ink p-4">
                <TopicStamp title={title} ghost size={112} />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-2xl leading-[0.95] font-black uppercase">Earn this stamp</p>
                  <p className="mt-1.5 text-sm leading-[1.45] text-ink-2">Pass the quiz with 60% or more to ink it in your passport.</p>
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
      <ReadingFooter
        footerRef={footerRef}
        topicId={topicId}
        backHref={`/subjects/${subjectId}/roadmap`}
        passed={passed}
        nextHref={nextHref}
        advancedReady={linksViewed}
        advancedPassed={advancedPassed}
        hasLinks={links.length > 0}
        notice={quizNotice}
      />
      <TextSizeSheet open={sheet} onOpenChange={setSheet} size={size} onSize={pickSize} preview={paragraphs[0] ?? ""} />
    </div>
  );
}
