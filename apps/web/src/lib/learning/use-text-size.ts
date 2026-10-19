import { useCallback, useSyncExternalStore } from "react";
import { TEXT_SIZE_KEY, TEXT_SIZES, type TextSize } from "./reading";

// Per-device preference. Falls back to memory when storage is blocked.
let memory: TextSize | null = null;
const listeners = new Set<() => void>();

function read(): TextSize {
  if (memory) return memory;
  try {
    const saved = localStorage.getItem(TEXT_SIZE_KEY);
    if (saved && saved in TEXT_SIZES) return saved as TextSize;
  } catch {}
  return "medium";
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => void listeners.delete(cb);
};

export function useTextSize(): [TextSize, (size: TextSize) => void] {
  const size = useSyncExternalStore(subscribe, read, () => "medium" as TextSize);
  const set = useCallback((next: TextSize) => {
    memory = next;
    try {
      localStorage.setItem(TEXT_SIZE_KEY, next);
    } catch {}
    listeners.forEach((l) => l());
  }, []);
  return [size, set];
}
