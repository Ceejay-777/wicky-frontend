import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AlertIcon, LockIcon } from "@/components/topic/icons";
import { PreparingView } from "@/components/topic/preparing-view";
import { ReadingView } from "@/components/topic/reading-view";
import { RetryButton } from "@/components/topic/retry-button";
import { TopicStateScreen } from "@/components/topic/topic-state-screen";
import { loadTopic } from "@/lib/learning/load-topic";
import { isHttpUrl, quizNotice, readMinutes, toParagraphs, waitMinutes } from "@/lib/learning/reading";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Reading · Wicky" };

const action = "h-[52px] text-base";

export default async function TopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ quiz?: string; minutes?: string }>;
}) {
  const loaded = await loadTopic((await params).id);

  // The BE refuses a topic in a locked level and names no subject, so the way back is the subjects list.
  if (loaded.locked) {
    return (
      <TopicStateScreen
        backHref="/subjects"
        tone="muted"
        icon={<LockIcon size={40} />}
        stamp="LOCKED"
        eyebrow="LEVEL LOCKED"
        title="Not open yet"
        text="Pass enough topics in the earlier level to open this one."
      >
        <Link href="/subjects" className={cn(buttonVariants(), action)}>
          Back to subjects
        </Link>
      </TopicStateScreen>
    );
  }

  const { topic } = loaded;
  const { progress } = topic;
  const roadmapHref = `/subjects/${topic.subject_id}/roadmap`;

  const paragraphs = toParagraphs(topic.summary);
  const ready = topic.content_status === "READY" && paragraphs.length > 0;

  if (topic.content_status === "FAILED") {
    return (
      <TopicStateScreen
        backHref={roadmapHref}
        subject={topic.subject_name}
        tone="tomato"
        icon={<AlertIcon size={40} />}
        stamp="NOT READY"
        eyebrow="READING UNAVAILABLE"
        title="Not ready yet"
        text={
          topic.review_status === "REJECTED"
            ? "We could not write a reading that fits this topic. You can try again."
            : "We could not prepare this reading. Check your connection and try again."
        }
      >
        <RetryButton topicId={topic.id} />
        <Link href={roadmapHref} className={cn(buttonVariants({ variant: "outline" }), action)}>
          Back to roadmap
        </Link>
      </TopicStateScreen>
    );
  }

  if (!ready) {
    return <PreparingView topicId={topic.id} title={topic.title} subjectId={topic.subject_id} subjectName={topic.subject_name} level={topic.level} number={topic.order} />;
  }

  const next = progress.next_topic;
  const nextHref = progress.is_passed && next?.is_unlocked ? `/topics/${next.id}` : null;
  return (
    <ReadingView
      topicId={topic.id}
      title={topic.title}
      description={topic.description}
      subjectId={topic.subject_id}
      subjectName={topic.subject_name}
      level={topic.level}
      number={topic.order}
      paragraphs={paragraphs}
      minutes={readMinutes(paragraphs)}
      links={topic.resource_links.filter((l) => isHttpUrl(l.url))}
      passedAt={progress.is_passed ? (progress.completed_at ?? new Date(0).toISOString()) : null}
      advancedPassed={progress.advanced_passed}
      advancedAvailable={progress.advanced_quiz_available}
      nextHref={nextHref}
      quizWait={waitMinutes(progress.normal_quiz_available_at)}
      advancedWait={waitMinutes(progress.advanced_quiz_available_at)}
      quizNotice={progress.is_passed ? null : quizNotice(await searchParams)}
    />
  );
}
