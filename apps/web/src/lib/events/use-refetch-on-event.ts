"use client";

import { useEffect, useRef } from "react";
import type { QuizStatusEvent, RoadmapStatusEvent, TopicStatusEvent } from "@wicky/types";

type Events = { "topic.status": TopicStatusEvent; "roadmap.status": RoadmapStatusEvent; "quiz.status": QuizStatusEvent };

// No event for this long means a blocked stream, so look once anyway (docs/realtime-events.md).
const SAFETY_MS = 60_000;

type Options<E extends keyof Events> = {
  /** Open the stream only while something is pending; closing it is the cleanup. */
  active: boolean;
  event: E;
  /** Is this event about what is on screen? */
  match: (payload: Events[E]) => boolean;
  /** Re-fetch the page's data. Called with no payload: events never feed the UI. */
  onChange: () => void;
};

// Events say "something changed". Re-fetch on a matching one, on every (re)connect, and as a 60s safety net.
export function useRefetchOnEvent<E extends keyof Events>({ active, event, match, onChange }: Options<E>) {
  const latest = useRef({ match, onChange });
  useEffect(() => {
    latest.current = { match, onChange };
  });

  useEffect(() => {
    if (!active) return;
    const source = new EventSource("/api/events", { withCredentials: true });
    let timer: ReturnType<typeof setTimeout>;
    const arm = () => {
      clearTimeout(timer);
      timer = setTimeout(change, SAFETY_MS);
    };
    function change() {
      latest.current.onChange();
      arm();
    }
    source.addEventListener("open", change);
    source.addEventListener(event, (e) => {
      try {
        if (latest.current.match(JSON.parse((e as MessageEvent<string>).data))) change();
      } catch {
        // A malformed event is ignored; the safety net still covers it.
      }
    });
    arm();
    return () => {
      clearTimeout(timer);
      source.close();
    };
  }, [active, event]);
}
