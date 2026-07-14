"use client";

import { Button } from "@/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type AuthSubmitButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

export function AuthSubmitButton({ children, loading, disabled }: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="default"
      size="lg"
      disabled={disabled || loading}
      className={cn(
        "h-12 w-full font-mono uppercase tracking-[0.04em] text-[11px] rounded-none"
      )}
    >
      {loading ? (
        <>
          <IconLoader2 data-icon="inline-start" className="animate-spin" />
          <span>Working…</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
