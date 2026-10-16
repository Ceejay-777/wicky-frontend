"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function RefreshButton({ label = "Try again" }: { label?: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button type="button" variant="destructive" size="sm" loading={pending} onClick={() => start(() => router.refresh())} className="mt-2 justify-self-start">
      {label}
    </Button>
  );
}
