"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiRequestError } from "@wicky/api-client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, PasswordField } from "@/components/ui/field";
import { signinSchema, type SigninValues } from "@/lib/auth/schemas";
import { signin } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

export function SigninForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await signin(values);
        router.push("/");
        router.refresh();
      } catch (err) {
        if (!(err instanceof ApiRequestError)) return setTopError(authMessages.errors.network);
        setTopError(
          err.status === 401
            ? authMessages.errors.invalidCredentials
            : err.status === 429
              ? authMessages.errors.rateLimited
              : authMessages.errors.unknown
        );
      }
    });
  });

  // A wrong-details failure marks both fields without saying which one is wrong.
  const wrong = topError === authMessages.errors.invalidCredentials;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      {topError && <Alert variant="destructive">{topError}</Alert>}
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
      <Button type="submit" disabled={isPending}>
        {isPending ? "Opening…" : "Open my passport"}
      </Button>
    </form>
  );
}
