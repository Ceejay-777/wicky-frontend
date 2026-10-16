import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SubjectNotFound() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-3 px-[22px] text-center">
      <span className="inline-flex size-24 items-center justify-center rounded-full border-2 border-dashed border-muted-ink font-mono text-[10px] font-bold tracking-[0.14em] text-muted-ink">NO STAMP</span>
      <h1 className="text-[40px]">Subject not found</h1>
      <p className="max-w-sm text-ink-2">It may not exist, or it may not be in your passport.</p>
      <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "mt-2")}>Back to home</Link>
    </div>
  );
}
