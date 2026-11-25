import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// A value that depends on the browser's clock, zone or locale (a local date, minutes left). It is `undefined`
// during the server render and hydration, so the two never disagree, and the real value after.
// `compute` must return a primitive: the snapshot has to compare equal between calls.
export function useClientValue<T extends string | number | boolean | null>(compute: () => T): T | undefined {
  return useSyncExternalStore(noopSubscribe, compute, () => undefined);
}
