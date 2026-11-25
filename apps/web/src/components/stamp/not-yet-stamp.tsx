import { cn } from "@/lib/utils";

// The rectangular "not yet" stamp on a failed quiz. Date is the attempt date, already formatted; omitted when the BE has none.
export function NotYetStamp({ date, size = 230, className }: { date?: string; size?: number; className?: string }) {
  const mono = { fontFamily: "var(--f-mono)", fontWeight: 700 } as const;
  return (
    <svg
      viewBox="0 0 264 176"
      width={size}
      height={Math.round((size * 176) / 264)}
      role="img"
      aria-label={`Not yet, stamp withheld${date ? `, ${date}` : ""}`}
      className={cn("block shrink-0 -rotate-[5deg] overflow-visible text-tomato", className)}
    >
      <g className="stamp-ink" fill="none" stroke="currentColor">
        <rect x="4" y="4" width="256" height="168" rx="14" strokeWidth="5" />
        <rect x="13" y="13" width="238" height="150" rx="7" strokeWidth="1.5" />
        <line x1="13" y1="48" x2="251" y2="48" strokeWidth="1.5" />
        <line x1="13" y1="136" x2="251" y2="136" strokeWidth="1.5" />
        <g fill="currentColor" stroke="none" textAnchor="middle">
          <text x="132" y="36" fontSize="11" letterSpacing="3" style={mono}>WICKY QUIZ DESK</text>
          <text x="132" y="104" fontSize="56" letterSpacing="1" style={{ fontFamily: "var(--f-display)", fontWeight: 900 }}>NOT YET</text>
          <text x="132" y="123" fontSize="11" letterSpacing="3" style={mono}>STAMP WITHHELD</text>
          {date && <text x="132" y="155" fontSize="12" letterSpacing="2" style={mono}>{date.toUpperCase()}</text>}
        </g>
      </g>
    </svg>
  );
}
