import { useId } from "react";
import { cn } from "@/lib/utils";

// Decorative passport art for the auth screens. All of it is aria-hidden.

export function PassportCover({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 210"
      aria-hidden="true"
      className={cn(
        "shrink-0 rotate-[7deg] overflow-visible drop-shadow-[0_6px_8px_rgba(43,33,24,0.3)] dark:drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <rect x="4" y="4" width="152" height="202" rx="10" fill="#B93A26" />
      <rect x="4" y="4" width="14" height="202" rx="6" fill="#9E2F1D" />
      <rect x="26" y="14" width="124" height="182" rx="5" fill="none" stroke="#E9B44C" strokeWidth="1.2" opacity=".7" />
      <g className="stamp-foil" fill="#E9B44C" textAnchor="middle">
        <text x="88" y="46" fontSize="9" letterSpacing="3.2" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>WICKY</text>
        <circle cx="88" cy="96" r="32" fill="none" stroke="#E9B44C" strokeWidth="2" />
        <circle cx="88" cy="96" r="26" fill="none" stroke="#E9B44C" strokeWidth="1" strokeDasharray="1.5 3.5" />
        <path d="M88 76 L92.7 89.5 L107 89.8 L95.6 98.5 L99.8 112.2 L88 104 L76.2 112.2 L80.4 98.5 L69 89.8 L83.3 89.5 Z" />
        <text x="88" y="152" fontSize="23" letterSpacing="5" style={{ fontFamily: "var(--f-display)", fontWeight: 900 }}>PASSPORT</text>
        <line x1="52" y1="160" x2="124" y2="160" stroke="#E9B44C" strokeWidth="1" />
        <text x="88" y="176" fontSize="7.5" letterSpacing="2.4" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>5 MINUTES A DAY</text>
      </g>
    </svg>
  );
}

// Rectangular office stamp. No date line: this is decoration, not a record.
export function OfficeStamp({
  top,
  main,
  sub,
  mainSize,
  className,
}: {
  top: string;
  main: string;
  sub: string;
  mainSize: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 264 176" aria-hidden="true" className={cn("shrink-0 -rotate-5 overflow-visible text-cobalt", className)}>
      <g className="stamp-ink" fill="none" stroke="currentColor">
        <rect x="4" y="4" width="256" height="168" rx="14" strokeWidth="5" />
        <rect x="13" y="13" width="238" height="150" rx="7" strokeWidth="1.5" />
        <line x1="13" y1="48" x2="251" y2="48" strokeWidth="1.5" />
        <line x1="13" y1="136" x2="251" y2="136" strokeWidth="1.5" />
        <g fill="currentColor" stroke="none" textAnchor="middle">
          <text x="132" y="36" fontSize="11" letterSpacing="3" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>{top}</text>
          <text x="132" y="108" fontSize={mainSize} letterSpacing="1" style={{ fontFamily: "var(--f-display)", fontWeight: 900 }}>{main}</text>
          <text x="132" y="155" fontSize="11" letterSpacing="3" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>{sub}</text>
        </g>
      </g>
    </svg>
  );
}

export function Postmark({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 280 160" aria-hidden="true" className={cn("shrink-0 -rotate-4 overflow-visible text-tomato", className)}>
      <g className="stamp-ink" fill="none" stroke="currentColor" strokeLinecap="round">
        <circle cx="80" cy="80" r="70" strokeWidth="3.5" />
        <circle cx="80" cy="80" r="62" strokeWidth="1.2" />
        <path id={`${uid}t`} d="M 30 80 A 50 50 0 0 1 130 80" stroke="none" />
        <path id={`${uid}b`} d="M 23 80 A 57 57 0 0 0 137 80" stroke="none" />
        <g fill="currentColor" stroke="none">
          <text fontSize="15" letterSpacing="3" style={{ fontFamily: "var(--f-display)", fontWeight: 800 }}>
            <textPath href={`#${uid}t`} startOffset="50%" textAnchor="middle">WICKY POST</textPath>
          </text>
          <text fontSize="13" letterSpacing="2" style={{ fontFamily: "var(--f-mono)", fontWeight: 700 }}>
            <textPath href={`#${uid}b`} startOffset="50%" textAnchor="middle">LINK DISPATCHED</textPath>
          </text>
          <text x="80" y="98" fontSize="30" textAnchor="middle" style={{ fontFamily: "var(--f-display)", fontWeight: 900 }}>SENT</text>
          <path d="M 62 48 h36 v18 h-36 z M 62 48 l18 11 l18 -11" fill="none" stroke="currentColor" strokeWidth="2.5" />
        </g>
        <g strokeWidth="3">
          <path d="M 156 52 q 12 -9 24 0 t 24 0 t 24 0 t 24 0" />
          <path d="M 156 72 q 12 -9 24 0 t 24 0 t 24 0 t 24 0" />
          <path d="M 156 92 q 12 -9 24 0 t 24 0 t 24 0 t 24 0" />
          <path d="M 156 112 q 12 -9 24 0 t 24 0 t 24 0 t 24 0" />
        </g>
      </g>
    </svg>
  );
}
