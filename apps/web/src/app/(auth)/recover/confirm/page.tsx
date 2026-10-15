import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmResetForm } from "./confirm-form";

export const metadata: Metadata = {
  title: "Set a new password · Wicky",
  description: "Choose a new password for your Wicky account.",
};

export default function ConfirmResetPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmResetForm />
    </Suspense>
  );
}
