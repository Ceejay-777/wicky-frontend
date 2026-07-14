"use client";

import { IconBrandGoogle, IconBrandApple, IconBrandFacebook } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const ICONS = {
  google: IconBrandGoogle,
  apple: IconBrandApple,
  facebook: IconBrandFacebook,
} as const;

type OAuthIconButtonProps = {
  provider: keyof typeof ICONS;
  label: string;
  onClick?: () => void;
};

export function OAuthIconButton({ provider, label, onClick }: OAuthIconButtonProps) {
  const Icon = ICONS[provider];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "size-11 inline-flex items-center justify-center border border-ink bg-paper text-ink rounded-none",
        "hover:bg-muted transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      )}
    >
      <Icon size={20} aria-hidden="true" />
    </button>
  );
}
