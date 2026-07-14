export function formatPoints(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatPercent(n: number): string {
  return `${n}%`;
}

export function formatStreak(days: number): string {
  return `${days}d`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}
