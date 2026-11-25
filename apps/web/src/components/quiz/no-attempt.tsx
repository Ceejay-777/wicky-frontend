import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BookIcon } from "@/components/topic/icons";
import { TopicStateScreen } from "@/components/topic/topic-state-screen";
import { cn } from "@/lib/utils";

// Result and review when the BE has no submitted attempt to show (none yet, or a stale link).
export function NoAttempt({ topicId, subjectName, review }: { topicId: number; subjectName: string; review?: boolean }) {
  return (
    <TopicStateScreen
      backHref={`/topics/${topicId}`}
      subject={subjectName}
      tone="muted"
      icon={<BookIcon size={40} />}
      stamp={review ? "NO ANSWERS" : "NO RESULT"}
      eyebrow={review ? "REVIEW ANSWERS" : "QUIZ RESULT"}
      title={review ? "Nothing to review" : "Nothing to show"}
      text="There is no finished quiz for this topic yet. Open the topic to take one."
    >
      <Link href={`/topics/${topicId}`} className={cn(buttonVariants(), "h-[52px] text-base")}>
        Back to topic
      </Link>
    </TopicStateScreen>
  );
}
