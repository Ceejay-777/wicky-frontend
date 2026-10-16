"use client";

import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, PasswordField } from "@/components/ui/field";
import { signinAction } from "@/lib/auth/actions";
import { authMessages } from "@/lib/auth/messages";
import { signinSchema, type SigninValues } from "@/lib/auth/schemas";
import { useActionForm } from "@/lib/auth/use-action-form";

export function SigninForm() {
  const {
    form: {
      register,
      formState: { errors },
    },
    formAction,
    onSubmit,
    state,
    isPending,
  } = useActionForm<SigninValues>(signinAction, signinSchema, { email: "", password: "" });

  // A wrong-details failure marks both fields without saying which one is wrong.
  const wrong = state?.error === authMessages.errors.invalidCredentials;

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      {state?.error && <Alert variant="destructive">{state.error}</Alert>}
      <Field
        label="Email"
        type="email"
        autoComplete="email"
        invalid={wrong}
        error={errors.email?.message}
        {...register("email")}
      />
      <PasswordField
        label="Password"
        autoComplete="current-password"
        invalid={wrong}
        error={errors.password?.message}
        {...register("password")}
      />
      <div className="-mt-1 text-right">
        <Link href="/recover" className="inline-block px-0.5 py-2.5 text-sm font-medium text-cobalt underline">
          Forgot your password?
        </Link>
      </div>
      <Button type="submit" loading={isPending}>
        {isPending ? "Opening…" : "Open my passport"}
      </Button>
    </form>
  );
}
