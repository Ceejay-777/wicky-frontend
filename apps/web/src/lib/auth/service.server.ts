import "server-only";
import "@/lib/server-api";

import { cache } from "react";
import { apiClient } from "@wicky/api-client";
import type { ApiSuccess, UserProfile } from "@wicky/types";

export const getProfile = cache(async (): Promise<UserProfile> => {
  const res = await apiClient.get<ApiSuccess<UserProfile>>("/api/auth/profile");
  return res.data;
});