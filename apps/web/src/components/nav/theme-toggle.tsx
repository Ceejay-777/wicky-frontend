"use client";

import { useSyncExternalStore } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "wicky-theme";

// The root layout script owns the initial theme (stored override, else system);
// this just reads <html data-theme> and writes the manual override.
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => obs.disconnect();
}

const OPTIONS = [
  { value: "light", label: "Light", Icon: IconSun },
  { value: "dark", label: "Dark", Icon: IconMoon },
] as const;

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false,
  );

  const select = (next: "light" | "dark") => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage can be blocked (private browsing); the theme still applies for this visit
    }
  };

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex gap-1 rounded-xl border-[1.5px] border-ink bg-field p-[3px]"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const pressed = (value === "dark") === dark;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={pressed}
            onClick={() => select(value)}
            className={cn(
              "flex h-10 flex-1 items-center justify-center gap-2 rounded-[9px] font-mono text-xs font-bold tracking-[0.1em] uppercase transition-colors",
              pressed ? "bg-ink text-paper" : "text-muted-ink hover:text-ink",
            )}
          >
            <Icon size={18} stroke={2} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
