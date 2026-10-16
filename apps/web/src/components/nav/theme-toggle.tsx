"use client";

import { useSyncExternalStore } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "wicky-theme";

// The root layout script owns the initial theme (stored override, else system);
// this just reads <html data-theme> and writes the manual override.
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "dark",
    () => false
  );

  const toggle = () => {
    const next = dark ? "light" : "dark";
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
    <Button variant="outline" size="sm" onClick={toggle} aria-label="Toggle theme" className="font-mono">
      {dark ? <IconSun /> : <IconMoon />}
      {dark ? "Light" : "Dark"}
    </Button>
  );
}
