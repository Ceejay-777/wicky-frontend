import { SubjectBodySkeleton } from "@/components/subject/subject-skeleton";

// Switching tabs: the header and tabs are already on screen, so only the body is a skeleton.
export default function SubjectTabLoading() {
  return <SubjectBodySkeleton />;
}
