export function OrDivider({ label = "or" }: { label?: string }) {
  return (
    <div
      role="separator"
      aria-label={label}
      className="flex items-center gap-3"
    >
      <div className="h-px flex-1 bg-ink" />
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-ink" />
    </div>
  );
}
