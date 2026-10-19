import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertIcon, BookIcon } from "./icons";

type Props = {
  topicId: number;
  backHref: string;
  passed: boolean;
  nextHref: string | null;
  advancedReady: boolean;
  advancedPassed?: boolean;
  hasLinks: boolean;
  notice: string | null;
  /** The preparing screen shows the action, but dashed and unusable. */
  disabled?: boolean;
  footerRef?: React.Ref<HTMLDivElement>;
};

const action = "h-[52px] flex-1 text-base";

// Sticky footer with the one primary action. The page reserves space equal to its height.
export function ReadingFooter({ topicId, backHref, passed, nextHref, advancedReady, advancedPassed, hasLinks, notice, disabled, footerRef }: Props) {
  return (
    <div
      ref={footerRef}
      className="fixed inset-x-0 bottom-0 z-30 border-t-[1.5px] border-ink bg-paper px-4 pt-3 pb-[calc(18px+env(safe-area-inset-bottom))] md:px-0 md:pb-[calc(20px+env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto md:max-w-[620px] xl:max-w-[680px] xl:px-[22px]">
        {notice && (
          <div role="alert" className="mb-2.5 flex items-start gap-2.5 rounded-[10px] border-[1.5px] border-tomato bg-tomato/12 px-3.5 py-3 text-sm leading-[1.4] font-medium text-ink">
            <span className="text-tomato"><AlertIcon /></span>
            <span>{notice}</span>
          </div>
        )}
        <div className="flex gap-2.5">
          {passed ? (
            <>
              <Link href={nextHref ?? backHref} className={cn(buttonVariants({ variant: "outline" }), action)}>
                {nextHref ? "Next topic" : "Back to roadmap"}
              </Link>
              {advancedPassed ? (
                <Button variant="outline" disabled className={cn(action, "border-gold text-gold disabled:opacity-100")}>
                  Advanced passed
                </Button>
              ) : advancedReady ? (
                <Link href={`/topics/${topicId}/quiz?type=advanced`} className={cn(buttonVariants(), action)}>
                  Advanced quiz
                </Link>
              ) : (
                <Button variant="outline" disabled className={cn(action, "border-dashed border-muted-ink text-muted-ink disabled:opacity-100")}>
                  Advanced quiz
                </Button>
              )}
            </>
          ) : (
            <>
              {hasLinks && !disabled && (
                <a
                  href="#further-study"
                  aria-label="Further study"
                  className="inline-flex h-[52px] w-[60px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-[12px] border-[1.5px] border-ink text-ink no-underline"
                >
                  <BookIcon />
                  <span className="font-mono text-[9px] font-bold tracking-[0.08em]">STUDY</span>
                </a>
              )}
              {disabled ? (
                <Button variant="outline" disabled className={cn(action, "border-dashed border-muted-ink text-muted-ink disabled:opacity-100")}>
                  Take the quiz
                </Button>
              ) : (
                <Link href={`/topics/${topicId}/quiz`} className={cn(buttonVariants(), action)}>
                  Take the quiz
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
