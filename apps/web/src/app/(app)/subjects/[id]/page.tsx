import { notFound } from "next/navigation";
import { ApiRequestError } from "@wicky/api-client";
import { getSubjectDetail } from "@/lib/learning/service.server";
import { SubjectOverviewContent } from "@/components/subject/subject-overview-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subject · Wicky",
  description: "An entry in your almanac of learning.",
};

type Params = Promise<{ id: string }>;

export default async function SubjectOverviewPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const subjectId = Number(id);
  if (!Number.isFinite(subjectId) || subjectId <= 0) {
    notFound();
  }
  try {
    const data = await getSubjectDetail(subjectId);
    return <SubjectOverviewContent data={data} />;
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) {
      notFound();
    }
    throw err;
  }
}
