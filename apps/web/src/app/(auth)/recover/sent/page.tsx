import { IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { BackLink } from "@/components/auth/back-link";
import { typeClassMobile } from "@/lib/typography";

export const metadata = {
  title: "Check your email · Wicky",
  description: "If an account exists, a reset link has been sent.",
};

export default function RecoverSentPage() {
  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-8 sm:px-6 sm:pt-3 sm:pb-12 lg:px-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-2 sm:mb-3">
          <BackLink href="/signin" />
        </div>
        <div className="mb-6 sm:mb-8 text-center">
          <div className="mb-4 sm:mb-6 flex justify-center text-muted-foreground">
            <IconMail size={48} stroke={1.25} aria-hidden="true" />
          </div>
          <h1 className={typeClassMobile("h1")}>Check your email.</h1>
          <p className="mt-2 font-display text-[16px] italic text-muted-foreground sm:text-[18px]">
            If an account exists at that address, you&apos;ll get a reset link shortly.
          </p>
        </div>
        <div className="pt-2 text-center">
          <Link
            href="/signin"
            className="font-mono text-[11px] uppercase tracking-[0.04em] text-forest underline underline-offset-4 hover:text-oxblood transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
