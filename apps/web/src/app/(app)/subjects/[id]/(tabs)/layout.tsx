import { loadSubject } from "@/lib/learning/load-subject";
import { SubjectHeader } from "@/components/subject/subject-header";
import { SubjectTabs } from "@/components/subject/subject-tabs";
import { RoadmapStatusNotice } from "@/components/subject/roadmap-status-notice";

export default async function SubjectTabsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const subject = await loadSubject((await params).id);
  return (
    <>
      <SubjectHeader subject={subject} />
      <SubjectTabs subjectId={subject.id} />
      <RoadmapStatusNotice subjectId={subject.id} status={subject.roadmap_status} />
      <div className="px-[22px] pt-5 pb-8 md:px-12 xl:px-14">{children}</div>
    </>
  );
}
