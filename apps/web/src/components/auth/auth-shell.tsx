import Link from "next/link";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  /** Top-right link. Omit on the confirm screen. */
  link?: { href: string; label: string };
  eyebrow: string;
  title: React.ReactNode;
  /** Headline size classes; the design steps the size per screen. */
  titleClass: string;
  intro?: React.ReactNode;
  /** Art beside the title (bottom-right of the headline), mobile only. */
  titleArt?: React.ReactNode;
  /** Art beside the intro, mobile only. */
  inlineArt?: React.ReactNode;
  /** Art for the kraft panel, desktop only. */
  panelArt: React.ReactNode;
  /** Pinned to the bottom of the screen on mobile. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("font-display text-[30px] leading-none font-black tracking-[0.04em] text-tomato", className)}
    >
      WICKY
    </Link>
  );
}

// Mobile: full page. Tablet (md): bordered card. Desktop (xl): kraft art panel + form column.
export function AuthShell({ link, eyebrow, title, titleClass, intro, titleArt, inlineArt, panelArt, footer, children }: AuthShellProps) {
  return (
    <div className="min-h-dvh xl:grid xl:grid-cols-[620px_1fr]">
      <aside className="relative hidden items-center justify-center border-r-[1.5px] border-ink bg-kraft xl:flex">
        <Wordmark className="absolute top-9 left-11" />
        <div className="flex flex-col items-center gap-8">
          {panelArt}
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-muted-ink">WICKY PASSPORT</span>
        </div>
      </aside>

      <div className="flex min-h-dvh flex-col">
        <header className="flex items-center justify-between px-[22px] pt-[30px] md:px-9 md:pt-7 xl:justify-end xl:px-12">
          <Wordmark className="xl:hidden" />
          {link && (
            <Link
              href={link.href}
              className="py-3 pl-3 font-mono text-xs font-bold tracking-[0.1em] text-ink uppercase underline"
            >
              {link.label}
            </Link>
          )}
        </header>

        <main id="main" className="flex flex-1 flex-col px-[22px] pt-3 pb-6 md:items-center md:justify-center md:px-9 md:pb-10">
          <div
            className={cn(
              "mx-auto flex w-full max-w-[480px] flex-1 flex-col",
              "md:max-w-[540px] md:flex-none md:rounded-[20px] md:border-[1.5px] md:border-ink md:px-11 md:pt-10 md:pb-8",
              "xl:max-w-[460px] xl:rounded-none xl:border-0 xl:p-0"
            )}
          >
            <p className="font-mono text-[11px] font-bold tracking-[0.12em] text-muted-ink uppercase">{eyebrow}</p>
            <div className="relative">
              <h1 className={cn("mt-2 font-display font-black uppercase [overflow-wrap:anywhere] hyphens-auto", titleClass)}>{title}</h1>
              {titleArt && <div className="absolute top-1/2 right-0 -translate-y-1/2 md:hidden">{titleArt}</div>}
            </div>

            {(intro || inlineArt) && (
              <div className="mt-3 flex items-center justify-between gap-2">
                {intro && (
                  <div className="max-w-[170px] min-w-0 text-[15px] leading-[1.45] text-ink-2 md:max-w-none md:text-base">{intro}</div>
                )}
                {inlineArt && <div className="shrink-0 md:hidden">{inlineArt}</div>}
              </div>
            )}

            <div className="mt-6">{children}</div>

            {footer && <div className="mt-auto pt-6 text-center text-sm text-muted-ink md:mt-0 md:pt-[22px]">{footer}</div>}
          </div>
        </main>
      </div>
    </div>
  );
}

export function AuthFooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-block px-1 py-2.5 font-semibold text-ink underline">
      {children}
    </Link>
  );
}
