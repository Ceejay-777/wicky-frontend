import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Curved text on the upper arc. */
  top: string;
  /** Curved text on the lower arc. */
  bottom: string;
  /** Centre mark: a level number or a short subject tag. */
  center: string;
  /** Text colour class sets the ink colour. */
  className?: string;
  label: string;
};

// Big inked seal for the level up and subject complete moments. It presses in once.
export function MomentSeal({ top, bottom, center, className, label }: Props) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 220 220" width={230} height={230} role="img" aria-label={label} className={cn("mx-auto block -rotate-6 overflow-visible animate-stamp-press", className)}>
      <g className="stamp-ink" fill="none" stroke="currentColor">
        <circle cx="110" cy="110" r="100" strokeWidth="6" strokeDasharray="2 7" strokeLinecap="round" />
        <circle cx="110" cy="110" r="90" strokeWidth="4" />
        <circle cx="110" cy="110" r="52" strokeWidth="2" />
        <path id={`${uid}t`} d="M 44 110 A 66 66 0 0 1 176 110" stroke="none" />
        <path id={`${uid}b`} d="M 30 110 A 80 80 0 0 0 190 110" stroke="none" />
        <g fill="currentColor" stroke="none">
          <text fontSize="17" letterSpacing="3" style={{ fontFamily: "var(--f-display)", fontWeight: 900 }}>
            <textPath href={`#${uid}t`} startOffset="50%" textAnchor="middle">{top}</textPath>
          </text>
          <text fontSize="13" letterSpacing="3" dy="2" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>
            <textPath href={`#${uid}b`} startOffset="50%" textAnchor="middle">{bottom}</textPath>
          </text>
          <text x="110" y="136" fontSize={center.length > 2 ? 36 : 86} textAnchor="middle" style={{ fontFamily: "var(--f-display)", fontWeight: 900 }}>{center}</text>
        </g>
      </g>
    </svg>
  );
}
