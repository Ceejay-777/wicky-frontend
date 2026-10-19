import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AlertIcon } from "@/components/topic/icons";
import { TopicStateScreen } from "@/components/topic/topic-state-screen";
import { cn } from "@/lib/utils";

// The subject is unknown here (the topic may not exist), so back goes to the subjects list.
export default function TopicNotFound() {
  return (
    <TopicStateScreen
      backHref="/subjects"
      tone="tomato"
      icon={<AlertIcon size={40} />}
      stamp="NOT FOUND"
      eyebrow="404"
      title="Topic not found"
      text="This topic does not exist, or it is not part of your subjects."
    >
      <Link href="/subjects" className={cn(buttonVariants(), "h-[52px] text-base")}>
        Back to subjects
      </Link>
    </TopicStateScreen>
  );
}
