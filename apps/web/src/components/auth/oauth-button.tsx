"use client";

import { Button } from "@/components/ui/button";
import { IconBrandGoogle, IconBrandApple, IconBrandFacebook } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const ICONS = {
  google: IconBrandGoogle,
  apple: IconBrandApple,
  facebook: IconBrandFacebook,
} as const;

type OAuthButtonProps = {
  provider: keyof typeof ICONS;
  children: React.ReactNode;
  onClick?: () => void;
};

export function OAuthButton({ provider, children, onClick }: OAuthButtonProps) {
  const Icon = ICONS[provider];
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={onClick}
      className={cn(
        "h-12 w-full font-mono uppercase tracking-[0.04em] text-[11px] text-ink rounded-none"
      )}
    >
      <Icon data-icon="inline-start" />
      {children}
    </Button>
  );
}
