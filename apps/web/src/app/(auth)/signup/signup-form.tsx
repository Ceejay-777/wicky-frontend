"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthField } from "@/components/auth/auth-field";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { OAuthButton } from "@/components/auth/oauth-button";
import { OrDivider } from "@/components/auth/or-divider";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { AuthFormAlert } from "@/components/auth/auth-form-alert";
import { signupSchema, type SignupValues } from "@/lib/auth/schemas";
import { signup, ApiRequestError } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

export function SignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: { display_name: "", email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await signup({
          display_name: values.display_name,
          email: values.email,
          password: values.password,
        });
        toast.success(authMessages.signup.success);
        router.push("/");
        router.refresh();
      } catch (err) {
        if (err instanceof ApiRequestError) {
          if (err.status === 400 || err.status === 422) {
            setTopError(err.message);
          } else {
            setTopError(authMessages.errors.unknown);
          }
        } else {
          setTopError(authMessages.errors.network);
        }
      }
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {topError ? <AuthFormAlert title={topError} /> : null}

      <Controller
        control={control}
        name="display_name"
        render={({ field, fieldState }) => (
          <AuthField
            name="display_name"
            label="Display name"
            placeholder="How should we refer to you?"
            autoComplete="name"
            required
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <AuthField
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <AuthField
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            required
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <AuthSubmitButton loading={isSubmitting || isPending}>
        Sign up
      </AuthSubmitButton>

      <OrDivider label="or" />

      <OAuthButton
        provider="google"
        onClick={() => toast.info("Google sign-up coming soon.")}
      >
        Continue with Google
      </OAuthButton>

      <div className="pt-2">
        <AuthFooterLink
          prompt="Already have an account?"
          linkText="Sign in"
          href="/signin"
        />
      </div>
    </form>
  );
}
