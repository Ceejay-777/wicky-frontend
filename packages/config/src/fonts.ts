/** Font stack for the Wicky web app (loaded with next/font in the root layout). */
export const wickyFonts = {
  display: { family: "Big Shoulders Display", weights: [700, 800, 900] as const },
  body: { family: "Work Sans", weights: [400, 500, 600] as const },
  mono: { family: "Courier Prime", weights: [400, 700] as const },
  serif: { family: "Newsreader", weights: [400, 500, 600] as const },
} as const;
