"use client";

import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

const STORAGE_KEY = "wicky-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial: Theme = stored ?? "light";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (next: Theme) => {
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  };

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        aria-label="Toggle theme"
        className="font-mono"
      >
        <IconSun data-icon="inline-start" />
        Light
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggle}
      aria-label="Toggle theme"
      className="font-mono"
    >
      {theme === "light" ? (
        <>
          <IconMoon data-icon="inline-start" />
          Dark
        </>
      ) : (
        <>
          <IconSun data-icon="inline-start" />
          Light
        </>
      )}
    </Button>
  );
}
