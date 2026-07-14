"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthField } from "@/components/auth/auth-field";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { AuthFormAlert } from "@/components/auth/auth-form-alert";
import { requestResetSchema, type RequestResetValues } from "@/lib/auth/schemas";
import { requestPasswordReset, ApiRequestError } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

export function RecoverForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<RequestResetValues>({
    resolver: zodResolver(requestResetSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await requestPasswordReset({ email: values.email });
        router.push("/recover/sent");
      } catch (err) {
        if (err instanceof ApiRequestError) {
          setTopError(err.message || authMessages.errors.unknown);
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

      <AuthSubmitButton loading={isPending}>
        Send recovery link
      </AuthSubmitButton>

      <div className="pt-2">
        <AuthFooterLink
          prompt="Remembered your password?"
          linkText="Sign in"
          href="/signin"
        />
      </div>
    </form>
  );
}
