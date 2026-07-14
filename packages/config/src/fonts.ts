/**
 * Font setup for the Wicky web app.
 * Loaded via Next.js's next/font for optimal performance.
 * Apps/mobile will load fonts natively when it ships.
 */
export const wickyFonts = {
  display: {
    family: "Lora",
    fallback: "Georgia, serif",
    weights: [400, 500, 600, 700] as const,
    italicWeights: [400, 500, 600] as const,
    variable: "--font-display",
  },
  body: {
    family: "Source Sans 3",
    fallback: "system-ui, sans-serif",
    weights: [300, 400, 500, 600, 700] as const,
    italicWeights: [300, 400] as const,
    variable: "--font-body",
  },
  mono: {
    family: "JetBrains Mono",
    fallback: "ui-monospace, monospace",
    weights: [400, 500, 600] as const,
    variable: "--font-mono",
  },
} as const;

/**
 * Google Fonts CDN URL builder.
 * Used in the showcase page if we want to load fonts via stylesheet instead of next/font.
 */
export function buildGoogleFontsUrl(): string {
  const families = [
    "Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600",
    "Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400",
    "JetBrains+Mono:wght@400;500;600",
  ];
  return `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join("&")}&display=swap`;
}
