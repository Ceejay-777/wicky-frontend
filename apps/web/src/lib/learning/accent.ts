// Stable per subject: the id picks the accent, so it never reshuffles between sessions.
export const ACCENTS = ["tomato", "cobalt", "pine", "gold"] as const;
export type Accent = (typeof ACCENTS)[number];

export const accentFor = (id: number): Accent => ACCENTS[id % ACCENTS.length];

// Full class names so Tailwind can see them.
export const ACCENT_TEXT: Record<Accent, string> = {
  tomato: "text-tomato",
  cobalt: "text-cobalt",
  pine: "text-pine",
  gold: "text-gold",
};
