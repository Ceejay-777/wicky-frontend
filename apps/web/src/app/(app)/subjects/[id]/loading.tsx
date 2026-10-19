import { SubjectPageSkeleton } from "@/components/subject/subject-skeleton";

// First load of a subject: the layout is still fetching it, so draw the header and tabs too.
export default function SubjectLoading() {
  return <SubjectPageSkeleton />;
}
