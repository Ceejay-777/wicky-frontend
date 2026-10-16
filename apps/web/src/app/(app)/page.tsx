import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ApiRequestError } from "@wicky/api-client";
import { getEnrolledSubjects, getExploreSubjects } from "@/lib/learning/service.server";
import { getProfile } from "@/lib/auth/service.server";
import { HomepageContent } from "@/components/homepage/homepage-content";

export const metadata: Metadata = {
  title: "Home · Wicky",
  description: "Pick up where you left off, and find your next subject.",
};

async function loadHome() {
  try {
    const [profile, subjects, explore] = await Promise.all([
      getProfile(),
      getEnrolledSubjects(),
      getExploreSubjects(),
    ]);
    return { profile, subjects, explore };
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 401) {
      redirect("/signin");
    }
    throw err;
  }
}

export default async function Homepage() {
  return <HomepageContent data={await loadHome()} />;
}
