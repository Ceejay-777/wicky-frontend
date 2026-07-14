"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthField } from "@/components/auth/auth-field";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { AuthFormAlert } from "@/components/auth/auth-form-alert";
import { confirmResetSchema, type ConfirmResetValues } from "@/lib/auth/schemas";
import { confirmPasswordReset, ApiRequestError } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

export function ConfirmResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const tokenFromUrl = searchParams.get("token") ?? "";
  const emailFromUrl = searchParams.get("email") ?? "";

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmResetValues>({
    resolver: zodResolver(confirmResetSchema),
    mode: "onBlur",
    defaultValues: {
      email: emailFromUrl,
      token: tokenFromUrl,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await confirmPasswordReset({
          email: values.email,
          token: values.token,
          password: values.password,
        });
        toast.success(authMessages.confirmReset.success);
        router.push("/signin");
      } catch (err) {
        if (err instanceof ApiRequestError) {
          if (err.status === 400) {
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

      <input type="hidden" {...register("email")} />
      <input type="hidden" {...register("token")} />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <AuthField
            name="password"
            label="New password"
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <AuthField
            name="confirmPassword"
            label="Confirm new password"
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
        Save password
      </AuthSubmitButton>
    </form>
  );
}
