import type { SubjectDetail, SubjectTopicItem } from "@wicky/types";

export type TopicState = "passed" | "current" | "locked";

export type RoadmapTopic = SubjectTopicItem & {
  /** 1-based position across all levels (derived: the BE `order` may restart per level). */
  number: number;
  state: TopicState;
};

// Derived on the client (spec section 1): the current topic is the first unpassed topic
// in an unlocked level, the same rule the BE uses for `current_topic` on the subject list.
export function buildRoadmap(detail: SubjectDetail): RoadmapTopic[] {
  const sorted = [...detail.topics].sort((a, b) => a.level - b.level || a.order - b.order);
  const currentId = sorted.find((t) => !t.is_passed && t.level <= detail.level_unlocked)?.id;
  return sorted.map((t, i) => ({
    ...t,
    number: i + 1,
    state: t.is_passed ? "passed" : t.id === currentId ? "current" : "locked",
  }));
}

export const currentTopicOf = (topics: RoadmapTopic[]) => topics.find((t) => t.state === "current") ?? null;

// One line per level for the roadmap summary and level headers.
export function levelNote(detail: SubjectDetail, level: number): string {
  const l = detail.levels.find((x) => x.level === level);
  if (!l || l.total === 0) return "No topics yet";
  if (l.passed === l.total) return `All ${l.total} topics passed`;
  const base = `${l.passed} of ${l.total} passed`;
  if (!l.is_unlocked) {
    const prev = detail.levels.find((x) => x.level === level - 1);
    return prev ? `Locked until you pass ${prev.threshold} topics in Level ${prev.level}` : base;
  }
  return level < detail.levels.length ? `${base}. Pass ${l.threshold} to unlock Level ${level + 1}.` : base;
}
