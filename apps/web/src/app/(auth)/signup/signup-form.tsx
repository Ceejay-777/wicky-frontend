"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, PasswordField } from "@/components/ui/field";
import { signupAction } from "@/lib/auth/actions";
import { signupSchema, type SignupValues } from "@/lib/auth/schemas";
import { useActionForm } from "@/lib/auth/use-action-form";

export function SignupForm() {
  const {
    form: {
      register,
      formState: { errors },
    },
    formAction,
    onSubmit,
    state,
    isPending,
  } = useActionForm<SignupValues>(signupAction, signupSchema, {
    display_name: "",
    email: "",
    password: "",
    auto_select_subjects_enabled: false,
  });

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        {state?.error && <Alert variant="destructive">{state.error}</Alert>}
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
        <Button type="submit" loading={isPending} className="mt-1">
          {isPending ? "Issuing…" : "Issue my passport"}
        </Button>
    </form>
  );
}
