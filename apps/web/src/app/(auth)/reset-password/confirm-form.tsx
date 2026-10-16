"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthShell } from "@/components/auth/auth-shell";
import { OfficeStamp } from "@/components/auth/auth-art";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { PasswordField } from "@/components/ui/field";
import { confirmResetAction } from "@/lib/auth/actions";
import { authMessages } from "@/lib/auth/messages";
import { confirmResetSchema, type ConfirmResetValues } from "@/lib/auth/schemas";
import { useActionForm } from "@/lib/auth/use-action-form";

const reissue = (className: string) => (
  <OfficeStamp top="WICKY OFFICE" main="REISSUE" sub="PASSWORD DESK" mainSize={50} className={className} />
);

export function ConfirmResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("s") ?? "";
  const email = params.get("u") ?? "";
  const {
    form: {
      register,
      formState: { errors },
    },
    formAction,
    onSubmit,
    state,
    isPending,
  } = useActionForm<ConfirmResetValues>(confirmResetAction, confirmResetSchema, { password: "" });

  useEffect(() => {
    if (!state?.done) return;
    toast.success(authMessages.confirmReset.success);
    router.push("/signin");
  }, [state, router]);

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
      <form action={formAction} onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="token" value={token} />
        {state?.error && <Alert variant="destructive">{state.error}</Alert>}
        <PasswordField
          label="New password"
          autoComplete="new-password"
          hint="At least 8 characters."
          disabled={incomplete}
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" loading={isPending} disabled={incomplete}>
          {isPending ? "Saving…" : "Save new password"}
        </Button>
      </form>
      <div className="mt-6 rounded-md border-[1.5px] border-dashed border-muted-ink p-3.5 text-sm leading-snug text-ink-2">
        {incomplete ? "This link is invalid." : "Link expired or already used?"}{" "}
        <Link href="/recover" className="inline-block px-1.5 py-3 font-semibold text-ink underline">
          Ask for a new one
        </Link>
      </div>
    </AuthShell>
  );
}
