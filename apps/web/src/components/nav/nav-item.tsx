import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<
  Omit<SVGProps<SVGSVGElement>, "size" | "stroke"> & {
    size?: number;
    stroke?: number;
  }
>;

type NavItemProps = {
  href: string;
  label: string;
  icon: IconComponent;
  iconFilled: IconComponent;
  active: boolean;
  variant: "mobile" | "desktop";
};

export function NavItem({
  href,
  label,
  icon: Icon,
  iconFilled: IconFilledIcon,
  active,
  variant,
}: NavItemProps) {
  const ActiveIcon = active ? IconFilledIcon : Icon;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      className={cn(
        "group relative inline-flex items-center justify-center",
        "size-11 transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        variant === "mobile" && "flex-col gap-1",
        variant === "desktop" && "flex-row gap-3 px-3 justify-start w-full",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1 rounded-full bg-primary",
          active ? "opacity-100" : "opacity-0",
          variant === "mobile" && "absolute top-1",
          variant === "desktop" && "ml-auto"
        )}
      />
      <ActiveIcon
        size={22}
        stroke={1.5}
        aria-hidden="true"
        className="shrink-0"
      />
      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.04em]",
          variant === "desktop" && "text-[12px] tracking-[0.08em]",
          active ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </Link>
  );
}
