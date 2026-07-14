import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <header className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <Link
          href="/"
          aria-label="Wicky home"
          className="inline-block font-display text-2xl sm:text-3xl font-semibold tracking-[-0.015em] text-ink"
        >
          Wicky
        </Link>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          An almanac of learning.
        </p>
      </footer>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "rounded-none border border-ink bg-surface text-ink",
            title: "font-display text-[15px]",
            description: "font-body text-[13px] text-muted-foreground",
          },
        }}
      />
    </div>
  );
}
