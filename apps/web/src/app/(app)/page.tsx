import { redirect } from "next/navigation";
import { ApiRequestError } from "@wicky/api-client";
import {
  getEnrolledSubjects,
  getExploreSubjects,
} from "@/lib/learning/service.server";
import { getProfile } from "@/lib/auth/service.server";
import { HomepageContent } from "@/components/homepage/homepage-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home · Wicky",
  description: "Your almanac of learning, kept up to date.",
};

export default async function Homepage() {
  try {
    const [profile, subjects, explore] = await Promise.all([
      getProfile(),
      getEnrolledSubjects(),
      getExploreSubjects(),
    ]);
    return <HomepageContent data={{ profile, subjects, explore }} />;
  } catch (err) {
    if (err instanceof ApiRequestError && err.status === 401) {
      redirect("/signin");
    }
    throw err;
  }
}
