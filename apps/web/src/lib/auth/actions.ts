"use server";

import { redirect } from "next/navigation";
import type { ZodError } from "zod";
import { ApiRequestError } from "@wicky/api-client";
import { authMessages } from "./messages";
import { confirmResetSchema, requestResetSchema, signinSchema, signupSchema } from "./schemas";
import { confirmPasswordReset, requestPasswordReset, signin, signup } from "./service.server";

export type ActionState =
  | { error?: string; fields?: Record<string, string>; sentTo?: string; done?: boolean; retryAfter?: number }
  | undefined;

const { errors } = authMessages;

function invalid(err: ZodError): ActionState {
  const fields: Record<string, string> = {};
  for (const { path, message } of err.issues) fields[String(path[0])] ??= message;
  return { fields };
}

// `map` handles the endpoint-specific statuses; 429 and network failures are shared.
function failed(err: unknown, map: (e: ApiRequestError) => ActionState): ActionState {
  if (!(err instanceof ApiRequestError)) return { error: errors.network };
  if (err.status === 429) return { error: errors.rateLimited, retryAfter: err.retryAfter };
  return map(err) ?? { error: errors.unknown };
}

export async function signupAction(_: ActionState, form: FormData): Promise<ActionState> {
  const parsed = signupSchema.safeParse({ ...Object.fromEntries(form), auto_select_subjects_enabled: form.has("auto_select_subjects_enabled") });
  if (!parsed.success) return invalid(parsed.error);
  try {
    await signup(parsed.data);
  } catch (err) {
    return failed(err, (e) => {
      const f = e.fields;
      if (f) {
        return {
          fields: {
            ...(f.email && { email: errors.emailTaken }),
            ...(f.password && { password: f.password[0] }),
            ...(f.display_name && { display_name: f.display_name[0] }),
          },
        };
      }
      // The BE also answers 400 with a plain `detail` (e.g. "Enter a valid email address.").
      return e.status === 400 ? { error: e.message } : undefined;
    });
  }
  redirect("/");
}

export async function signinAction(_: ActionState, form: FormData): Promise<ActionState> {
  const parsed = signinSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return invalid(parsed.error);
  try {
    await signin(parsed.data);
  } catch (err) {
    return failed(err, (e) => (e.status === 401 ? { error: errors.invalidCredentials } : undefined));
  }
  redirect("/");
}

export async function requestResetAction(_: ActionState, form: FormData): Promise<ActionState> {
  const parsed = requestResetSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return invalid(parsed.error);
  try {
    await requestPasswordReset(parsed.data);
  } catch (err) {
    return failed(err, () => undefined);
  }
  return { sentTo: parsed.data.email };
}

export async function confirmResetAction(_: ActionState, form: FormData): Promise<ActionState> {
  const parsed = confirmResetSchema.safeParse(Object.fromEntries(form));
  const email = String(form.get("email") ?? "");
  const token = String(form.get("token") ?? "");
  if (!email || !token) return { error: errors.expiredLink };
  if (!parsed.success) return invalid(parsed.error);
  try {
    await confirmPasswordReset({ email, token, password: parsed.data.password });
  } catch (err) {
    return failed(err, (e) => {
      if (e.fields?.password) return { fields: { password: e.fields.password[0] } };
      // "Token has expired." and "Invalid token or email." both mean: ask for a new link.
      return e.status === 400 ? { error: errors.expiredLink } : undefined;
    });
  }
  return { done: true };
}
