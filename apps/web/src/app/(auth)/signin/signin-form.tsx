"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthField } from "@/components/auth/auth-field";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { OrDivider } from "@/components/auth/or-divider";
import { OAuthIconButton } from "@/components/auth/oauth-icon-button";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { AuthFormAlert } from "@/components/auth/auth-form-alert";
import { signinSchema, type SigninValues } from "@/lib/auth/schemas";
import { signin } from "@/lib/auth/service";
import { ApiRequestError } from "@wicky/api-client";
import { authMessages } from "@/lib/auth/messages";

export function SigninForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    // formState: { isSubmitting },
  } = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await signin({ email: values.email, password: values.password });
        toast.success(authMessages.signin.success);
        router.push("/");
        router.refresh();
      } catch (err) {
        if (err instanceof ApiRequestError) {
          if (err.status === 401) {
            setTopError(authMessages.errors.invalidCredentials);
          } else if (err.status === 429) {
            setTopError(authMessages.errors.rateLimited);
          } else {
            setTopError(err.message || authMessages.errors.unknown);
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
            autoComplete="current-password"
            required
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            rightSlot={
              <Link
                href="/recover"
                className="font-mono text-[10px] uppercase tracking-[0.04em] text-forest underline underline-offset-4 hover:text-oxblood transition-colors"
              >
                Forgot?
              </Link>
            }
          />
        )}
      />

      <AuthSubmitButton loading={isPending}>
        Sign in
      </AuthSubmitButton>

      <OrDivider label="or continue with" />

      <div
        role="group"
        aria-label="Continue with social account"
        className="flex items-center justify-center gap-3"
      >
        <OAuthIconButton
          provider="google"
          label="Continue with Google"
          onClick={() => toast.info("Google sign-in coming soon.")}
        />
        <OAuthIconButton
          provider="apple"
          label="Continue with Apple"
          onClick={() => toast.info("Apple sign-in coming soon.")}
        />
        <OAuthIconButton
          provider="facebook"
          label="Continue with Facebook"
          onClick={() => toast.info("Facebook sign-in coming soon.")}
        />
      </div>

      <div className="pt-2">
        <AuthFooterLink
          prompt="Don't have an account?"
          linkText="Sign up"
          href="/signup"
        />
      </div>
    </form>
  );
}
