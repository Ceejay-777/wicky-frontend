/* =====================================================================
   Wicky — Almanac theme (typed)
   This is the single source of truth for the design system.
   Mirrors the CSS variables in theme.css — kept in sync.
   ===================================================================== */

export const theme = {
  name: "almanac",
  description:
    "Wicky is a reference work for learning. The almanac is the form factor — data, presented with personality. 80% almanac, not 100% — celebration moments happen, but restrained.",

  color: {
    paper: "#F0EDDF",
    surface: "#F5F2E5",
    ink: "#1A1814",
    inkMuted: "#847C72",
    border: "#1A1814",
    oxblood: "#7A2E2E",
    oxbloodSoft: "rgba(122, 46, 46, 0.08)",
    forest: "#2C4A3E",
    forestSoft: "rgba(44, 74, 62, 0.08)",
    verified: "#3F6B3A",
    verifiedSoft: "rgba(63, 107, 58, 0.08)",
    onInk: "#F0EDDF",
    onOxblood: "#F0EDDF",
    onForest: "#F0EDDF",
  },

  colorDark: {
    paper: "#14110D",
    surface: "#1E1A15",
    ink: "#F2EDE4",
    inkMuted: "#847C72",
    border: "#F2EDE4",
    oxblood: "#C26A6A",
    oxbloodSoft: "rgba(194, 106, 106, 0.12)",
    forest: "#6B8C7A",
    forestSoft: "rgba(107, 140, 122, 0.12)",
    verified: "#7AA674",
    verifiedSoft: "rgba(122, 166, 116, 0.12)",
    onInk: "#14110D",
    onOxblood: "#14110D",
    onForest: "#14110D",
  },

  font: {
    display: "'Lora', Georgia, serif",
    body: "'Source Sans 3', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },

  typeScale: {
    h1: { size: "2.75rem", leading: "1.05", tracking: "-0.02em", weight: 600 },
    h2: { size: "1.625rem", leading: "1.15", tracking: "-0.015em", weight: 600 },
    h3: { size: "1.25rem", leading: "1.2", tracking: "-0.01em", weight: 500 },
    body: { size: "0.9375rem", leading: "1.6", tracking: "0", weight: 400 },
    caption: { size: "0.75rem", leading: "1.4", tracking: "0", weight: 400 },
    mono: { size: "0.8125rem", leading: "1.4", tracking: "0", weight: 500 },
  },

  space: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    6: "1.5rem",
    8: "2rem",
    12: "3rem",
    16: "4rem",
    24: "6rem",
  },

  radius: {
    none: "0",
    sm: "4px", // buttons and pills only
    md: "0", // surfaces — flat
    lg: "0",
  },

  border: {
    hairline: "1px solid",
    double: "3px double",
    row: "1px solid",
  },

  motion: {
    easeOutQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
    fast: "150ms",
    base: "200ms",
    slow: "300ms",
  },
} as const;

export type Theme = typeof theme;

/**
 * The single almanac rule. If a future implementation violates this,
 * the design is wrong. The almanac is the frame; the user is allowed
 * small moments of warmth inside it.
 */
export const almanacRules = {
  monoForData: "All numbers (points, streaks, time, ranks, percentages, dates) are set in the mono font. No exceptions.",
  displayForTitles: "Content titles use the display serif (Lora). Never used for UI chrome.",
  oxbloodIsStructural: "Oxblood is for dividers, current state, 'you' indicators, and the year color. Never for celebration or generic accent.",
  forestIsVerified: "Forest is the color of 'this is done correctly' — table headers, verified states, completed roadmap nodes.",
  noRoundedCards: "Surfaces are flat, demarcated by rules. Pills and buttons can be 4px. That's it.",
  noDropShadows: "Elevation is by rule, not by shadow.",
  italicForEmphasis: "Source Sans 3 italic is the emphasis style. Bold is reserved for actual data.",
  lightModeIsDefault: "Light mode is the default. Dark mode is a first-class theme, not an afterthought.",
  the80PercentRule: "The almanac is the default voice. It is not a hard rule. Some surfaces (auth, profile, homepage greeting) earn airiness. The product is recognizably the almanac without forcing the almanac on every screen.",
  celebrationIsRestrained: "Celebration happens — the number count-up animation is the moment. No confetti, no trophy icons, no fake fanfare. The almanac records; the user celebrates in their own way.",
} as const;
