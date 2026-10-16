import "server-only";
import "@/lib/server-api";

import { cache } from "react";
import { apiClient } from "@wicky/api-client";
import type {
  ApiSuccess,
  AuthSigninRequest,
  AuthSignupRequest,
  PasswordResetConfirmRequest,
  PasswordResetRequest,
  UserProfile,
} from "@wicky/types";

export const getProfile = cache(async (): Promise<UserProfile> => {
  const res = await apiClient.get<ApiSuccess<UserProfile>>("/api/auth/profile");
  return res.data;
});

export async function signup(input: AuthSignupRequest): Promise<void> {
  await apiClient.post("/api/auth/signup", input);
}

export async function signin(input: AuthSigninRequest): Promise<void> {
  await apiClient.post("/api/auth/signin", input);
}

export async function requestPasswordReset(input: PasswordResetRequest): Promise<void> {
  await apiClient.post("/api/auth/password-reset/request", input);
}

export async function confirmPasswordReset(input: PasswordResetConfirmRequest): Promise<void> {
  await apiClient.post("/api/auth/password-reset/confirm", input);
}
