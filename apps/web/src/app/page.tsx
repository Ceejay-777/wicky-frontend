import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="max-w-xl text-center">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood">
          Wicky · Pass 1
        </div>
        <h1 className="mb-4 font-display text-5xl font-semibold tracking-tight">
          The skeleton is up.
        </h1>
        <p className="mb-8 text-[15px] leading-relaxed text-muted-foreground">
          Monorepo builds. Types from <code className="font-mono text-ink">@wicky/types</code> resolve.
          The Pass 2 design system is live in the showcase.
        </p>
        <Link
          href="/showcase"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium font-mono uppercase tracking-[0.04em] hover:opacity-90 transition-opacity"
        >
          Open the showcase
          <IconArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
