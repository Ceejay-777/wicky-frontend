export type TypeRole = "h1" | "h2" | "h3" | "body" | "caption" | "mono";

export function typeClass(role: TypeRole): string {
  switch (role) {
    case "h1":
      return "font-display text-[28px] sm:text-[36px] lg:text-[44px] font-semibold leading-[1.1] sm:leading-[1.08] lg:leading-[1.05] tracking-[-0.015em] sm:tracking-[-0.018em] lg:tracking-[-0.02em]";
    case "h2":
      return "font-display text-[22px] sm:text-[24px] lg:text-[26px] font-semibold leading-[1.15] tracking-[-0.012em] sm:tracking-[-0.014em] lg:tracking-[-0.015em]";
    case "h3":
      return "font-display text-[18px] lg:text-[20px] font-medium leading-[1.2] tracking-[-0.008em] lg:tracking-[-0.01em]";
    case "body":
      return "text-[15px] leading-[1.6]";
    case "caption":
      return "text-[12px] italic text-muted-foreground";
    case "mono":
      return "font-mono text-[13px] font-medium";
    default:
      return "";
  }
}

export function typeClassMobile(role: TypeRole): string {
  switch (role) {
    case "h1":
      return "font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.015em]";
    case "h2":
      return "font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.012em]";
    case "h3":
      return "font-display text-[18px] font-medium leading-[1.2] tracking-[-0.008em]";
    case "body":
      return "text-[15px] leading-[1.6]";
    case "caption":
      return "text-[12px] italic text-muted-foreground";
    case "mono":
      return "font-mono text-[13px] font-medium";
    default:
      return "";
  }
}
