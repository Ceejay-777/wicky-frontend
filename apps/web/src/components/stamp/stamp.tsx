import { useId } from "react";
import { cn } from "@/lib/utils";

export type StampColor = "tomato" | "cobalt" | "pine" | "gold" | "ink";

type StampProps = {
  /** Topic title, level name… Real data only. */
  title: string;
  /** Real pass date from the BE, already formatted ("05 OCT 2026"). */
  date?: string;
  color?: StampColor;
  shape?: "circle" | "rect";
  /** Not earned yet: perforated outline, no ink, never hidden. */
  ghost?: boolean;
  /** Play the short "press" when the stamp is earned. */
  press?: boolean;
  /** Width in px; height follows the shape. */
  size?: number;
  className?: string;
};

const MAX_TITLE = 22;

// Curved text has to stay inside the ring band, so long titles clip and shrink.
function clip(title: string) {
  const t = title.trim().toUpperCase();
  return t.length > MAX_TITLE ? `${t.slice(0, MAX_TITLE - 1)}…` : t;
}

function titleSize(len: number, tiers: [number, number, number]) {
  return len <= 10 ? tiers[0] : len <= 15 ? tiers[1] : tiers[2];
}

export function Stamp({
  title,
  date,
  color = "tomato",
  shape = "circle",
  ghost = false,
  press = false,
  size,
  className,
}: StampProps) {
  const uid = useId().replace(/:/g, "");
  const text = clip(title);
  const isCircle = shape === "circle";
  const w = size ?? (isCircle ? 160 : 200);
  const h = isCircle ? w : (w * 176) / 264;
  const label = ghost ? `${title}, not earned yet` : `${title} stamp${date ? `, ${date}` : ""}`;

  return (
    <svg
      viewBox={isCircle ? "0 0 200 200" : "0 0 264 176"}
      width={w}
      height={h}
      role="img"
      aria-label={label}
      className={cn("shrink-0 overflow-visible", press && !ghost && "animate-stamp-press", className)}
      style={{
        color: color === "ink" ? "var(--ink)" : `var(--${color})`,
        transform: `rotate(${isCircle ? -6 : 3}deg)`,
      }}
    >
      <g
        className={ghost ? undefined : "stamp-ink"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        opacity={ghost ? 0.55 : 1}
        strokeDasharray={ghost ? "6 5" : undefined}
      >
        {isCircle ? (
          <>
            <circle cx="100" cy="100" r="94" strokeWidth="5" />
            <circle cx="100" cy="100" r="86" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="53" strokeWidth="2.5" />
            <path id={`${uid}t`} d="M 33 100 A 67 67 0 0 1 167 100" stroke="none" />
            <path id={`${uid}b`} d="M 21 100 A 79 79 0 0 0 179 100" stroke="none" />
            <g fill="currentColor" stroke="none" strokeDasharray="none">
              <text fontSize={titleSize(text.length, [20, 16, 12])} letterSpacing="3" style={{ fontFamily: "var(--f-display)", fontWeight: 800 }}>
                <textPath href={`#${uid}t`} startOffset="50%" textAnchor="middle">{text}</textPath>
              </text>
              {date && !ghost && (
                <text fontSize="14" letterSpacing="2.5" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>
                  <textPath href={`#${uid}b`} startOffset="50%" textAnchor="middle">{date.toUpperCase()}</textPath>
                </text>
              )}
              <circle cx="100" cy="100" r="5" />
            </g>
          </>
        ) : (
          <>
            <rect x="4" y="4" width="256" height="168" rx="14" strokeWidth="5" />
            <rect x="13" y="13" width="238" height="150" rx="7" strokeWidth="1.5" />
            <line x1="13" y1="48" x2="251" y2="48" strokeWidth="1.5" />
            <line x1="13" y1="136" x2="251" y2="136" strokeWidth="1.5" />
            <g fill="currentColor" stroke="none" textAnchor="middle" strokeDasharray="none">
              <text x="132" y="36" fontSize="11" letterSpacing="3" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>WICKY PASSPORT</text>
              <text x="132" y="100" fontSize={titleSize(text.length, [48, 36, 26])} letterSpacing="1" style={{ fontFamily: "var(--f-display)", fontWeight: 900 }}>{text}</text>
              {date && !ghost && (
                <text x="132" y="155" fontSize="12" letterSpacing="1.5" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>{date.toUpperCase()}</text>
              )}
            </g>
          </>
        )}
      </g>
    </svg>
  );
}
