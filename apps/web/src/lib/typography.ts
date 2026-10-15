export type TypeRole = "h1" | "h2" | "h3" | "body" | "caption" | "mono" | "label";

// Passport type: Big Shoulders headlines, Work Sans body, Courier Prime labels.
// Page titles step up from mobile (56) to tablet (64) and desktop (72).
export function typeClass(role: TypeRole): string {
  switch (role) {
    case "h1":
      return "font-display font-black uppercase leading-[0.85] text-[56px] md:text-[64px] xl:text-[72px]";
    case "h2":
      return "font-display font-black uppercase leading-[0.9] text-[32px] md:text-[34px]";
    case "h3":
      return "font-display font-extrabold uppercase leading-none text-[22px] md:text-[24px]";
    case "body":
      return "text-[16px] leading-[1.5]";
    case "caption":
      return "text-[13px] leading-[1.45] text-ink-2";
    case "mono":
      return "font-mono text-[13px] font-bold";
    case "label":
      return "font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted-ink";
    default:
      return "";
  }
}

export function typeClassMobile(role: TypeRole): string {
  switch (role) {
    case "h1":
      return "font-display font-black uppercase leading-[0.85] text-[56px]";
    case "h2":
      return "font-display font-black uppercase leading-[0.9] text-[32px]";
    case "h3":
      return "font-display font-extrabold uppercase leading-none text-[22px]";
    default:
      return typeClass(role);
  }
}
