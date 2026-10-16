"use client";

import { startTransition, useEffect, useState } from "react";
import { AuthFooterLink, AuthShell } from "@/components/auth/auth-shell";
import { OfficeStamp, Postmark } from "@/components/auth/auth-art";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { requestResetAction } from "@/lib/auth/actions";
import { requestResetSchema, type RequestResetValues } from "@/lib/auth/schemas";
import { useActionForm } from "@/lib/auth/use-action-form";

// The BE enforces a growing wait per email; a 200 starts at 60s, a 429 says how long is left.
const FIRST_WAIT_S = 60;

const clock = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : `${s}s`);

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
  const [wait, setWait] = useState(0);
  const {
    form: {
      register,
      formState: { errors },
    },
    formAction,
    onSubmit,
    state,
    isPending,
  } = useActionForm<RequestResetValues>(requestResetAction, requestResetSchema, { email: "" });
  // Remembered across states so a failed resend (429) stays on the "link sent" screen.
  const [sentTo, setSentTo] = useState<string>();
  const error = state?.error;

  // Runs once per new result from the server (state is a fresh object each time).
  const [seen, setSeen] = useState(state);
  if (state !== seen) {
    setSeen(state);
    if (state?.sentTo) {
      setSentTo(state.sentTo);
      setWait(FIRST_WAIT_S);
    } else if (state?.retryAfter) {
      setWait(state.retryAfter);
    }
  }

  useEffect(() => {
    if (wait <= 0) return;
    const t = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(t);
  }, [wait]);

  const resend = (email: string) => {
    const data = new FormData();
    data.set("email", email);
    startTransition(() => formAction(data));
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
          Nothing yet? Check your spam folder, or resend when the timer ends.
        </div>
        {error && (
          <Alert variant="destructive" className="mt-3">
            {error}
          </Alert>
        )}
        <Button variant="outline" className="mt-6 w-full" loading={isPending} disabled={wait > 0} onClick={() => resend(sentTo)}>
          {wait > 0 ? `Send it again (${clock(wait)})` : "Send it again"}
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
      <form
        action={formAction}
        onSubmit={onSubmit}
        noValidate
        className="flex flex-col gap-3"
      >
        {error && <Alert variant="destructive">{error}</Alert>}
        <Field label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Button type="submit" loading={isPending} disabled={wait > 0}>
          {isPending ? "Sending…" : wait > 0 ? `Try again in ${clock(wait)}` : "Send reset link"}
        </Button>
      </form>
    </AuthShell>
  );
}
