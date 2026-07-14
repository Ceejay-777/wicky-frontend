"use client";

import Link from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

type BackLinkProps = {
  href: string;
  label?: string;
};

export function BackLink({ href, label = "Back" }: BackLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center size-11 text-ink hover:text-oxblood transition-colors"
    >
      <IconChevronLeft size={20} aria-hidden="true" />
    </Link>
  );
}
