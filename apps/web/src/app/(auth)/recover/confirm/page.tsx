import { Suspense } from "react";
import { BackLink } from "@/components/auth/back-link";
import { ConfirmResetForm } from "./confirm-form";
import { typeClassMobile } from "@/lib/typography";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set a new password · Wicky",
  description: "Enter a new password to finish resetting your account.",
};

export default function ConfirmResetPage() {
  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-8 sm:px-6 sm:pt-3 sm:pb-12 lg:px-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-2 sm:mb-3">
          <BackLink href="/signin" />
        </div>
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className={typeClassMobile("h1")}>Set a new password</h1>
          <p className="mt-2 font-display text-[16px] italic text-muted-foreground sm:text-[18px]">
            Enter your new password below.
          </p>
        </div>
        <Suspense fallback={null}>
          <ConfirmResetForm />
        </Suspense>
      </div>
    </div>
  );
}
