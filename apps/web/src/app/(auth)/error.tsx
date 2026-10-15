"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[460px] flex-col justify-center px-[22px] py-10">
      <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink uppercase">Something went wrong</p>
      <h1 className="mt-2 font-display text-[54px] leading-[0.86] font-black uppercase">That did not work</h1>
      <p className="mt-3 text-base text-ink-2">Give it another try, or head back to sign in.</p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
      <Link href="/signin" className="mt-3 inline-block py-3 text-center font-semibold text-ink underline">
        Back to sign in
      </Link>
    </div>
  );
}
