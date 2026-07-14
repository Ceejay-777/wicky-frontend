import { apiClient } from "@wicky/api-client";
import type {
  AuthSignupRequest,
  AuthSigninRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
  UserProfile,
  ApiSuccess,
} from "@wicky/types";
import { ApiRequestError } from "@/lib/api";

type AuthResponse = ApiSuccess<UserProfile>;

export async function signup(input: AuthSignupRequest): Promise<UserProfile> {
  const res = await apiClient.post<AuthResponse>("/api/auth/signup", input);
  return res.data;
}

export async function signin(input: AuthSigninRequest): Promise<UserProfile> {
  const res = await apiClient.post<AuthResponse>("/api/auth/signin", input);
  return res.data;
}

export async function requestPasswordReset(input: PasswordResetRequest): Promise<void> {
  await apiClient.post<ApiSuccess<null>>("/api/auth/password-reset/request", input);
}

export async function confirmPasswordReset(
  input: PasswordResetConfirmRequest,
): Promise<void> {
  await apiClient.post<ApiSuccess<null>>("/api/auth/password-reset/confirm", input);
}

export { ApiRequestError };
