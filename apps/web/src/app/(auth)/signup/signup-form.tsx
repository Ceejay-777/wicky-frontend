"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiRequestError } from "@wicky/api-client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, PasswordField } from "@/components/ui/field";
import { signupSchema, type SignupValues } from "@/lib/auth/schemas";
import { signup } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

export function SignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: { display_name: "", email: "", password: "", auto_select_subjects_enabled: false },
  });

  const onSubmit = handleSubmit((values) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await signup(values);
        router.push("/");
        router.refresh();
      } catch (err) {
        if (!(err instanceof ApiRequestError)) return setTopError(authMessages.errors.network);
        const f = err.fields;
        if (f?.email) setError("email", { message: authMessages.errors.emailTaken });
        if (f?.password) setError("password", { message: f.password[0] });
        if (f?.display_name) setError("display_name", { message: f.display_name[0] });
        // The BE also answers 400 with a plain `detail` (e.g. "Enter a valid email address.").
        if (!f) setTopError(err.status === 429 ? authMessages.errors.rateLimited : err.status === 400 ? err.message : authMessages.errors.unknown);
      }
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        {topError && <Alert variant="destructive">{topError}</Alert>}
        <Field
          label="Name on passport"
          autoComplete="nickname"
          error={errors.display_name?.message}
          {...register("display_name")}
        />
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <PasswordField
          label="Password"
          autoComplete="new-password"
          hint="At least 8 characters. Avoid common passwords."
          error={errors.password?.message}
          {...register("password")}
        />
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border-[1.5px] border-dashed border-muted-ink p-3.5 md:border-solid md:border-ink md:bg-field">
          <input
            type="checkbox"
            className="mt-0.5 size-[22px] shrink-0 accent-tomato"
            {...register("auto_select_subjects_enabled")}
          />
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold">Choose my first subjects for me</span>
            <span className="mt-0.5 block text-[13px] leading-snug text-muted-ink">
              Wicky suggests up to 5 to start. Change them any time.
            </span>
          </span>
        </label>
        <Button type="submit" disabled={isPending} className="mt-1">
          {isPending ? "Issuing…" : "Issue my passport"}
        </Button>
    </form>
  );
}
