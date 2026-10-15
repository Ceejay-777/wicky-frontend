/* Wicky — Passport theme (typed). Mirrors theme.css; keep in sync. */

export const theme = {
  name: "passport",
  color: {
    paper: "#F3E9D2",
    kraft: "#E4D3B3",
    field: "#FBF5E6",
    ink: "#2B2118",
    ink2: "#4A3C2B",
    muted: "#5C4C38",
    frame: "#2B2118",
    tomato: "#B93A26",
    cobalt: "#2D4BA0",
    pine: "#2F6B52",
    gold: "#B7770B",
    onTomato: "#FFF6E6",
  },
  colorDark: {
    paper: "#1C1712",
    kraft: "#26201A",
    field: "#26201A",
    ink: "#F1E6CF",
    ink2: "#B3A58A",
    muted: "#B3A58A",
    frame: "#4A3C2B",
    tomato: "#E8725C",
    cobalt: "#7B93E0",
    pine: "#5FB08F",
    gold: "#F0B94A",
    onTomato: "#1C1712",
  },
  font: {
    display: "'Big Shoulders Display', sans-serif",
    body: "'Work Sans', system-ui, sans-serif",
    mono: "'Courier Prime', ui-monospace, monospace",
    serif: "'Newsreader', Georgia, serif",
  },
  radius: { field: "10px", button: "12px", card: "14px" },
  motion: {
    easeOutQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
    fast: "150ms",
    base: "220ms",
    slow: "400ms",
  },
} as const;

export type Theme = typeof theme;

/** Subject accents, assigned stably per subject. */
export const subjectAccents = ["tomato", "cobalt", "pine", "gold"] as const;
export type SubjectAccent = (typeof subjectAccents)[number];
