import { useSyncExternalStore } from "react";
import type { ProgressCheckResponse } from "@wicky/types";

// Two small browser stores for the quiz. Everything else about an attempt comes from the BE.

// 1. Picks so far. The BE keeps no partial picks, so a reload would restart the answers of a quiz it hands back
// unfinished. Keyed by attempt id, kept on this device, removed once the attempt is submitted.
export type SavedPicks = { answers: number[]; picked: number | null };

const picksKey = (attemptId: number) => `wicky:quiz-picks:${attemptId}`;

export function savePicks(attemptId: number, picks: SavedPicks): void {
  try {
    localStorage.setItem(picksKey(attemptId), JSON.stringify(picks));
  } catch {}
}

export function clearPicks(attemptId: number): void {
  try {
    localStorage.removeItem(picksKey(attemptId));
  } catch {}
}

// Anything that does not fit this quiz is dropped: a bad guess would put a wrong answer on a submit.
export function loadPicks(attemptId: number, questionCount: number): SavedPicks | null {
  try {
    const raw = localStorage.getItem(picksKey(attemptId));
    if (!raw) return null;
    const { answers, picked } = JSON.parse(raw) as SavedPicks;
    const valid = (n: unknown) => Number.isInteger(n) && (n as number) >= 0 && (n as number) <= 3;
    if (!Array.isArray(answers) || answers.length >= questionCount || !answers.every(valid)) return null;
    return { answers, picked: valid(picked) ? picked : null };
  } catch {
    return null;
  }
}

// 2. The level check. It only comes with the submit response, and a level up is reported once, so the quiz
// page leaves it here for the result page to show a banner and for the moment screen to read.
const checkKey = (attemptId: number) => `wicky:quiz-check:${attemptId}`;

export function saveLevelCheck(attemptId: number, check: ProgressCheckResponse | null): void {
  try {
    if (check && check.action !== "none") sessionStorage.setItem(checkKey(attemptId), JSON.stringify(check));
  } catch {}
}

// useSyncExternalStore needs a stable snapshot, so the parsed value is reused while the raw text is unchanged.
let last: { attemptId: number; raw: string | null; check: ProgressCheckResponse | null } | null = null;

function readLevelCheck(attemptId: number): ProgressCheckResponse | null {
  let raw: string | null = null;
  try {
    raw = sessionStorage.getItem(checkKey(attemptId));
  } catch {}
  if (last && last.attemptId === attemptId && last.raw === raw) return last.check;
  let check: ProgressCheckResponse | null = null;
  try {
    check = raw ? (JSON.parse(raw) as ProgressCheckResponse) : null;
  } catch {}
  last = { attemptId, raw, check };
  return check;
}

const noopSubscribe = () => () => {};

/** `undefined` during the server render and hydration, then the check or `null`. */
export function useLevelCheck(attemptId: number): ProgressCheckResponse | null | undefined {
  return useSyncExternalStore(noopSubscribe, () => readLevelCheck(attemptId), () => undefined);
}
