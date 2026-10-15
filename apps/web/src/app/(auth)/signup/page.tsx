import type { Metadata } from "next";
import { AuthFooterLink, AuthShell } from "@/components/auth/auth-shell";
import { PassportCover } from "@/components/auth/auth-art";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Apply for your passport · Wicky",
  description: "Create your Wicky account and start collecting stamps.",
};

export default function SignupPage() {
  return (
    <AuthShell
      link={{ href: "/signin", label: "Sign in" }}
      eyebrow="Application form"
      title="Apply for your passport"
      titleClass="max-w-[min(210px,calc(100%-84px))] text-[42px] min-[360px]:text-[50px] leading-[0.86] md:max-w-none xl:text-[56px]"
      titleArt={<PassportCover className="mr-1.5 w-[clamp(72px,24vw,98px)]" />}
      panelArt={<PassportCover className="w-[250px]" />}
      footer={<>Already have a passport? <AuthFooterLink href="/signin">Sign in</AuthFooterLink></>}
    >
      <SignupForm />
    </AuthShell>
  );
}
