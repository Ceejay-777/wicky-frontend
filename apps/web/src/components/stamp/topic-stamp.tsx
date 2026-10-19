import { cn } from "@/lib/utils";

type TopicStampProps = {
  title: string;
  /** Real pass date from the BE, already formatted ("13 OCT"). Earned stamps only. */
  date?: string;
  /** Not earned yet: perforated outline, never hidden. */
  ghost?: boolean;
  /** Width in px; height follows. */
  size?: number;
  className?: string;
};

// The oval entry stamp on topic reading. Titles longer than one line split into two and clip,
// so the text stays inside the ring.
function lines(title: string): [string, string?] {
  const t = title.trim().toUpperCase();
  if (t.length <= 13) return [t];
  const words = t.split(/\s+/);
  let first = "";
  let i = 0;
  while (i < words.length && (first ? `${first} ${words[i]}` : words[i]).length <= 10) first = first ? `${first} ${words[i++]}` : words[i++];
  if (!first) return [`${words[0].slice(0, 9)}…`];
  const rest = words.slice(i);
  if (!rest.length) return [first];
  const next = rest[0].slice(0, 10);
  return [first, rest.length > 1 || next.length < rest[0].length ? `${next}…` : next];
}

const fit = (text: string, perChar: number, max: number) => Math.min(max, Math.round(text.length * perChar));

export function TopicStamp({ title, date, ghost = false, size = 104, className }: TopicStampProps) {
  const [a, b] = lines(title);
  const label = ghost ? `Stamp for ${title}, not yet earned` : `Stamp earned: ${title}`;
  const color = ghost ? "var(--tomato)" : "var(--pine)";
  const display = { fontFamily: "var(--f-display)", fontWeight: 900 } as const;
  const mono = { fontFamily: "var(--f-mono)", fontWeight: 700 } as const;

  return (
    <svg
      viewBox="0 0 160 110"
      width={size}
      height={Math.floor((size * 110) / 160)}
      role="img"
      aria-label={label}
      className={cn("shrink-0 -rotate-6 overflow-visible", className)}
      style={{ color }}
    >
      {ghost ? (
        <>
          <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeDasharray="6 5">
            <ellipse cx="80" cy="55" rx="74" ry="49" />
            <ellipse cx="80" cy="55" rx="64" ry="39" strokeWidth="1.1" />
          </g>
          <g fill="currentColor" textAnchor="middle">
            <text x="80" y="30" fontSize="8.5" letterSpacing="2.4" style={mono}>YOUR STAMP</text>
            <text x="80" y={b ? 52 : 58} fontSize="19" textLength={fit(a, 9, b ? 95 : 108)} lengthAdjust="spacingAndGlyphs" opacity=".8" style={display}>{a}</text>
            {b && <text x="80" y="72" fontSize="19" textLength={fit(b, 9.3, 95)} lengthAdjust="spacingAndGlyphs" opacity=".8" style={display}>{b}</text>}
            <text x="80" y="88" fontSize="8.5" letterSpacing="2.4" style={mono}>NOT YET EARNED</text>
          </g>
        </>
      ) : (
        <g className="stamp-ink" fill="none" stroke="currentColor">
          <ellipse cx="80" cy="55" rx="74" ry="49" strokeWidth="4" />
          <ellipse cx="80" cy="55" rx="65" ry="40" strokeWidth="1.3" />
          <g fill="currentColor" stroke="none" textAnchor="middle">
            <text x="80" y="29" fontSize="8.5" letterSpacing="2.4" style={mono}>WICKY ENTRY</text>
            <text x="80" y={b ? 50 : 56} fontSize="21" textLength={fit(a, 9.6, b ? 105 : 112)} lengthAdjust="spacingAndGlyphs" style={display}>{a}</text>
            {b && <text x="80" y="71" fontSize="21" textLength={fit(b, 10.4, 105)} lengthAdjust="spacingAndGlyphs" style={display}>{b}</text>}
            {date && <text x="80" y="82" fontSize="9" letterSpacing="2.2" style={mono}>{`PASSED ${date}`}</text>}
          </g>
        </g>
      )}
    </svg>
  );
}
