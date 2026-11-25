// The AI marks code names in prose with backticks (`input()`, `data.json`). Each pair becomes a code span;
// a lone backtick stays as typed. Multi-line answers are code already, so callers pass those through untouched.
export function CodeText({ text }: { text: string }) {
  return text.split(/`([^`\n]+)`/).map((part, i) =>
    i % 2 ? (
      <code key={i} className="rounded-[4px] bg-ink/10 px-1 py-px font-mono text-[0.88em] [overflow-wrap:anywhere]">
        {part}
      </code>
    ) : (
      part
    ),
  );
}
