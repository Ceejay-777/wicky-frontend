import type { Metadata } from "next";
import { AuthFooterLink, AuthShell } from "@/components/auth/auth-shell";
import { OfficeStamp } from "@/components/auth/auth-art";
import { SigninForm } from "./signin-form";

export const metadata: Metadata = {
  title: "Welcome back · Wicky",
  description: "Sign in to pick up where you left off.",
};

const stamp = (className: string) => (
  <OfficeStamp top="WICKY RE-ENTRY" main="WELCOME BACK" sub="ENTRY PERMITTED" mainSize={44} className={className} />
);

export default function SigninPage() {
  return (
    <AuthShell
      link={{ href: "/signup", label: "Sign up" }}
      eyebrow="Re-entry"
      title="Welcome back"
      titleClass="text-[64px] leading-[0.84]"
      intro="Your stamps are right where you left them."
      inlineArt={stamp("mr-1 w-[150px]")}
      panelArt={stamp("w-[360px]")}
      footer={<>New here? <AuthFooterLink href="/signup">Apply for a passport</AuthFooterLink></>}
    >
      <SigninForm />
    </AuthShell>
  );
}
