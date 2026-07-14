import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SubjectNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <Empty className="max-w-sm">
        <EmptyHeader>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            404 · Not found
          </p>
          <EmptyTitle className="font-display text-[24px] font-semibold leading-[1.15] text-foreground sm:text-[28px]">
            Subject not found.
          </EmptyTitle>
          <EmptyDescription className="text-[14px] text-muted-foreground">
            This subject may not exist, or you may not be enrolled in it.
            Browse your subjects from the home page to find it.
          </EmptyDescription>
        </EmptyHeader>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "min-h-11 sm:min-h-0",
          )}
        >
          <IconArrowLeft size={16} stroke={1.5} data-icon="inline-start" />
          Back to home
        </Link>
      </Empty>
    </div>
  );
}
