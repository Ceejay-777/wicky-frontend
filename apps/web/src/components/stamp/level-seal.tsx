import { cn } from "@/lib/utils";

// Small inked "LEVEL n" seal. Colour comes from the text colour class.
export function LevelSeal({ level, className, size = 56 }: { level: number; className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 56 56"
      width={size}
      height={size}
      role="img"
      aria-label={`Level ${level}`}
      className={cn("shrink-0 -rotate-6 overflow-visible", className)}
    >
      <g className="stamp-ink" fill="none" stroke="currentColor">
        <circle cx="28" cy="28" r="25" strokeWidth="3" />
        <circle cx="28" cy="28" r="20" strokeWidth="1.2" />
        <g fill="currentColor" stroke="none" textAnchor="middle">
          <text x="28" y="21" fontSize="8" letterSpacing="1.5" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>LEVEL</text>
          <text x="28" y="43" fontSize="26" style={{ fontFamily: "var(--f-display)", fontWeight: 900 }}>{level}</text>
        </g>
      </g>
    </svg>
  );
}
