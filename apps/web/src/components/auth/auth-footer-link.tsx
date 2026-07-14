import Link from "next/link";

type AuthFooterLinkProps = {
  prompt: string;
  linkText: string;
  href: string;
};

export function AuthFooterLink({ prompt, linkText, href }: AuthFooterLinkProps) {
  return (
    <p className="text-center text-[14px] text-muted-foreground">
      {prompt}{" "}
      <Link
        href={href}
        className="font-mono text-[11px] uppercase tracking-[0.04em] text-forest underline underline-offset-4 hover:text-oxblood transition-colors"
      >
        {linkText}
      </Link>
    </p>
  );
}
