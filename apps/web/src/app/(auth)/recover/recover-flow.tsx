"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiRequestError } from "@wicky/api-client";
import { AuthFooterLink, AuthShell } from "@/components/auth/auth-shell";
import { OfficeStamp, Postmark } from "@/components/auth/auth-art";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { requestResetSchema, type RequestResetValues } from "@/lib/auth/schemas";
import { requestPasswordReset } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

// The BE has no cooldown; this only stops the button being hammered.
const RESEND_WAIT_S = 30;

const link = { href: "/signin", label: "Sign in" };
const footer = (
  <>
    Remembered it? <AuthFooterLink href="/signin">Back to sign in</AuthFooterLink>
  </>
);
const reissue = (className: string) => (
  <OfficeStamp top="WICKY OFFICE" main="REISSUE" sub="PASSWORD DESK" mainSize={50} className={className} />
);

// Request and "link sent" are one flow, so "send it again" still has the email.
export function RecoverFlow() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [wait, setWait] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestResetValues>({
    resolver: zodResolver(requestResetSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (wait <= 0) return;
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  const send = (email: string) => {
    setError(null);
    startTransition(async () => {
      try {
        await requestPasswordReset({ email });
        setSentTo(email);
        setWait(RESEND_WAIT_S);
      } catch (err) {
        setError(
          err instanceof ApiRequestError
            ? err.status === 429
              ? authMessages.errors.rateLimited
              : authMessages.errors.unknown
            : authMessages.errors.network
        );
      }
    });
  };

  if (sentTo) {
    return (
      <AuthShell
        link={link}
        eyebrow="Account recovery"
        title={
          <>
            Check
            <br />
            your post
          </>
        }
        titleClass="text-[54px] leading-[0.86] xl:text-[56px]"
        inlineArt={<Postmark className="mx-auto w-[230px]" />}
        panelArt={<Postmark className="w-[360px]" />}
        footer={footer}
      >
        <p className="text-base leading-normal text-ink-2">
          If <strong className="font-semibold text-ink [overflow-wrap:anywhere]">{sentTo}</strong> has a passport, a
          reset link is on its way. It can take a minute to arrive.
        </p>
        <div
          role="status"
          className="mt-4 rounded-md border-[1.5px] border-dashed border-muted-ink p-3.5 text-sm leading-snug text-ink-2"
        >
          Nothing yet? Check spam, or ask for a fresh link below.
        </div>
        {error && (
          <Alert variant="destructive" className="mt-3">
            {error}
          </Alert>
        )}
        <Button variant="outline" className="mt-6 w-full" disabled={isPending || wait > 0} onClick={() => send(sentTo)}>
          {wait > 0 ? `Send it again (${wait}s)` : "Send it again"}
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      link={link}
      eyebrow="Account recovery"
      title={
        <>
          Lost your
          <br />
          password?
        </>
      }
      titleClass="text-[54px] leading-[0.86] xl:text-[56px]"
      intro="Tell us your email and we will post you a link to set a new one."
      inlineArt={reissue("w-[190px]")}
      panelArt={reissue("w-[360px]")}
      footer={footer}
    >
      <form onSubmit={handleSubmit((v) => send(v.email))} noValidate className="flex flex-col gap-3">
        {error && <Alert variant="destructive">{error}</Alert>}
        <Field label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </AuthShell>
  );
}
