import type { Metadata } from "next";
import Link from "next/link";
import { loadSubject } from "@/lib/learning/load-subject";
import { buildRoadmap, currentTopicOf } from "@/lib/learning/roadmap";
import { getOthersLearning, getSubjectLeaderboard } from "@/lib/learning/service.server";
import { getProfile } from "@/lib/auth/service.server";
import { buttonVariants } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LeaderboardPanel } from "@/components/subject/leaderboard-panel";
import { OthersLearning } from "@/components/subject/others-learning";
import { RefreshButton } from "@/components/subject/refresh-button";

export const metadata: Metadata = { title: "Leaderboard · Wicky" };

export default async function SubjectLeaderboardPage({ params }: { params: Promise<{ id: string }> }) {
  const subject = await loadSubject((await params).id);
  const topics = buildRoadmap(subject);
  // The board is per subject; "also learning" is per topic, so it follows the current (or last) topic.
  const topic = currentTopicOf(topics) ?? topics.at(-1);
  if (!topic) {
    return <p className="rounded-[14px] border-[1.5px] border-dashed border-ink p-5 text-ink-2">The leaderboard appears once the roadmap is written.</p>;
  }

  const [board, others, profile] = await Promise.allSettled([getSubjectLeaderboard(subject.id), getOthersLearning(topic.id), getProfile()]);
  const hidden = profile.status === "fulfilled" && profile.value.preferences?.leaderboard_visible === false;
  const viewerId = profile.status === "fulfilled" ? profile.value.id : null;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink">TOP LEARNERS ON</h2>
        <span className="font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink">TOP 20</span>
      </div>
      <p className={`mt-1 mb-4 line-clamp-2 font-display leading-[0.95] font-black uppercase [hyphens:auto] [overflow-wrap:break-word] md:text-[34px] ${subject.name.length <= 20 ? "text-[30px]" : "text-[26px]"}`}>{subject.name}</p>

      <div className="md:grid md:grid-cols-[1.4fr_1fr] md:items-start md:gap-10 xl:grid-cols-[1.3fr_1fr] xl:gap-12">
      <div>
      {hidden && (
        <Alert className="mb-4 border-dashed">
          <AlertTitle>You are hidden from leaderboards</AlertTitle>
          <AlertDescription>Other learners cannot see you here. You can change this in your profile.</AlertDescription>
        </Alert>
      )}

      {board.status === "rejected" ? (
        <Alert variant="destructive">
          <AlertTitle>The leaderboard did not load</AlertTitle>
          <AlertDescription>Your progress is safe. Give it another go.</AlertDescription>
          <RefreshButton />
        </Alert>
      ) : board.value.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-[14px] border-[1.5px] border-dashed border-ink p-6 text-center">
          <span aria-hidden="true" className="inline-flex size-20 items-center justify-center rounded-full border-2 border-dashed border-muted-ink font-mono text-[10px] font-bold tracking-[0.14em] text-muted-ink">EMPTY</span>
          <p className="font-display text-[28px] leading-[0.95] font-black uppercase">Nobody has points here yet</p>
          <p className="text-ink-2">Take the quiz and your name goes up first.</p>
          <Link href={`/topics/${topic.id}`} className={`${buttonVariants({ variant: "outline", size: "sm" })} mt-2`}>Start reading</Link>
        </div>
      ) : (
        <LeaderboardPanel entries={board.value} viewerId={viewerId} />
      )}

      </div>
      {others.status === "fulfilled" && <OthersLearning entries={others.value} />}
      </div>
    </div>
  );
}
