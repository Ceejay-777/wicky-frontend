import "server-only";
import { notFound } from "next/navigation";
import { ApiRequestError } from "@wicky/api-client";
import { getSubjectDetail } from "./service.server";

// A bad id, or a subject the learner is not enrolled in (BE 404), renders the not-found page.
export async function loadSubject(id: string) {
  const subjectId = Number(id);
  if (!Number.isInteger(subjectId) || subjectId <= 0) notFound();
  try {
    return await getSubjectDetail(subjectId);
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 404) notFound();
    throw err;
  }
}
