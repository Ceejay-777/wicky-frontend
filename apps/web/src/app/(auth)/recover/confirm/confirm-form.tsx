"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ApiRequestError } from "@wicky/api-client";
import { AuthShell } from "@/components/auth/auth-shell";
import { OfficeStamp } from "@/components/auth/auth-art";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { PasswordField } from "@/components/ui/field";
import { confirmResetSchema, type ConfirmResetValues } from "@/lib/auth/schemas";
import { confirmPasswordReset } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

const reissue = (className: string) => (
  <OfficeStamp top="WICKY OFFICE" main="REISSUE" sub="PASSWORD DESK" mainSize={50} className={className} />
);

export function ConfirmResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const email = params.get("email") ?? "";
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ConfirmResetValues>({
    resolver: zodResolver(confirmResetSchema),
    mode: "onBlur",
    defaultValues: { password: "" },
  });

  const onSubmit = handleSubmit(({ password }) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await confirmPasswordReset({ email, token, password });
        toast.success(authMessages.confirmReset.success);
        router.push("/signin");
      } catch (err) {
        if (!(err instanceof ApiRequestError)) return setTopError(authMessages.errors.network);
        if (err.fields?.password) return setError("password", { message: err.fields.password[0] });
        // "Token has expired." and "Invalid token or email." both mean: ask for a new link.
        setTopError(err.status === 400 ? authMessages.errors.expiredLink : authMessages.errors.unknown);
      }
    });
  });

  const incomplete = !token || !email;

  return (
    <AuthShell
      eyebrow="Account recovery"
      title={
        <>
          Set a new
          <br />
          password
        </>
      }
      titleClass="text-[54px] leading-[0.86] xl:text-[56px]"
      intro="Pick something you have not used before."
      inlineArt={reissue("w-[130px]")}
      panelArt={reissue("w-[360px]")}
    >
      {email && (
        <Chip tone="cobalt" className="mb-4 max-w-full truncate px-3 py-2 text-xs tracking-[0.06em]">
          For {email}
        </Chip>
      )}
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        {topError && <Alert variant="destructive">{topError}</Alert>}
        <PasswordField
          label="New password"
          autoComplete="new-password"
          hint="At least 8 characters."
          disabled={incomplete}
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" disabled={isPending || incomplete}>
          {isPending ? "Saving…" : "Save new password"}
        </Button>
      </form>
      <div className="mt-6 rounded-md border-[1.5px] border-dashed border-muted-ink p-3.5 text-sm leading-snug text-ink-2">
        {incomplete ? "This link is incomplete." : "Link expired or already used?"}{" "}
        <Link href="/recover" className="inline-block px-1.5 py-3 font-semibold text-ink underline">
          Ask for a new one
        </Link>
      </div>
    </AuthShell>
  );
}
