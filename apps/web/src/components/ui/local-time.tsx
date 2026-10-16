"use client";

type Props = { iso: string; mode: "date" | "next" };

// Dates are shown in the learner's own zone and locale, so formatting happens in the browser.
// The server render may differ by zone, hence suppressHydrationWarning.
export function LocalTime({ iso, mode }: Props) {
  const d = new Date(iso);
  let text: string;
  if (mode === "date") {
    text = d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
  } else if (d < new Date()) {
    text = "now";
  } else {
    const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    text = d.toDateString() === new Date().toDateString() ? time : `${d.toLocaleDateString(undefined, { day: "numeric", month: "short" })}, ${time}`;
  }
  return (
    <time dateTime={iso} suppressHydrationWarning>
      {text}
    </time>
  );
}
