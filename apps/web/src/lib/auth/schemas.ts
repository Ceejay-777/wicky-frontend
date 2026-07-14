import { z } from "zod";

export const signupSchema = z.object({
  display_name: z
    .string()
    .min(1, "Display name is required.")
    .max(100, "Display name must be 100 characters or fewer."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("That email doesn't look right."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be 128 characters or fewer."),
});

export type SignupValues = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("That email doesn't look right."),
  password: z
    .string()
    .min(1, "Password is required."),
});

export type SigninValues = z.infer<typeof signinSchema>;

export const requestResetSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("That email doesn't look right."),
});

export type RequestResetValues = z.infer<typeof requestResetSchema>;

export const confirmResetSchema = z
  .object({
    email: z.string().email("That email doesn't look right."),
    token: z.string().min(1, "Reset token is missing."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password must be 128 characters or fewer."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ConfirmResetValues = z.infer<typeof confirmResetSchema>;
