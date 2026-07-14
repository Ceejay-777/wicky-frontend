import "server-only";

import { cache } from "react";
import { ApiRequestError } from "@wicky/api-client";
import type { ApiSuccess, EnrolledSubject, Subject, UserProfile } from "@wicky/types";
import { cookies } from "next/headers";

const API_BASE = (process.env.API_BASE ?? "").replace(/\/$/, "");
console.log("API_BASE", API_BASE);

async function serverFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  const cookieParts: string[] = [];
  if (accessToken) cookieParts.push(`access_token=${accessToken}`);
  if (refreshToken) cookieParts.push(`refresh_token=${refreshToken}`);

  const fullUrl = `${API_BASE}${path}`;
  console.log("[serverFetch] requesting:", fullUrl);

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(cookieParts.length ? { Cookie: cookieParts.join("; ") } : {}),
      ...(init?.headers ?? {}),
    },
  });

  console.log("[serverFetch] ←", fullUrl, res.status);

  if (!res.ok) {
      console.log("[serverFetch] FAILED:", fullUrl, res.status);
    let detail: string;
    try {
      const errBody = (await res.json()) as { detail?: string };
      console.log("errBody", errBody);
      detail = errBody.detail ?? `Request failed with status ${res.status}`;
    } catch {
      detail = `Request failed with status ${res.status}`;
    }
    throw new ApiRequestError(detail, res.status);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const getProfile = cache(
  async (): Promise<UserProfile> => {
    const res = await serverFetch<ApiSuccess<UserProfile>>("/api/auth/profile");
    return res.data;
  },
);

export const getEnrolledSubjects = cache(
  async (): Promise<EnrolledSubject[]> => {
    return serverFetch<EnrolledSubject[]>("/api/learning/subjects");
  },
);

export const getExploreSubjects = cache(
  async (): Promise<Subject[]> => {
    return serverFetch<Subject[]>("/api/learning/explore");
  },
);
