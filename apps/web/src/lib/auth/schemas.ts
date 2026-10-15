import { z } from "zod";

const email = z.string().min(1, "Enter your email.").email("That email doesn't look right.");
// Strength (common passwords etc.) is enforced by the backend and surfaced on the field.
const newPassword = z.string().min(8, "Use at least 8 characters.").max(128, "Use 128 characters or fewer.");

export const signupSchema = z.object({
  display_name: z.string().trim().min(1, "Enter the name for your passport.").max(100, "Use 100 characters or fewer."),
  email,
  password: newPassword,
  auto_select_subjects_enabled: z.boolean(),
});

export type SignupValues = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password."),
});

export type SigninValues = z.infer<typeof signinSchema>;

export const requestResetSchema = z.object({ email });

export type RequestResetValues = z.infer<typeof requestResetSchema>;

export const confirmResetSchema = z.object({ password: newPassword });

export type ConfirmResetValues = z.infer<typeof confirmResetSchema>;
