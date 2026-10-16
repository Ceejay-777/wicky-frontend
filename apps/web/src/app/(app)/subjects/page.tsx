import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ApiRequestError } from "@wicky/api-client";
import { getEnrolledSubjects, getStarredSubjects } from "@/lib/learning/service.server";
import { SubjectsContent } from "@/components/subjects/subjects-content";

export const metadata: Metadata = { title: "Subjects · Wicky" };

export default async function SubjectsPage() {
  const data = await Promise.all([getEnrolledSubjects(), getStarredSubjects()]).catch((err) => {
    if (err instanceof ApiRequestError && err.status === 401) redirect("/signin");
    throw err;
  });
  return <SubjectsContent subjects={data[0]} starred={data[1]} />;
}
