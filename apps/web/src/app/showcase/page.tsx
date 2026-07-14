import { IconArrowRight, IconBookmark, IconCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "./theme-toggle";

/* ============================================================
   Wicky Almanac — design system showcase
   Six sections that prove the almanac system is real.
   Mobile-first: starts at 375px, grows up.
   ============================================================ */

const palette = [
  { name: "paper", light: "#F0EDDF", dark: "#14110D", role: "page background" },
  { name: "ink", light: "#1A1814", dark: "#F2EDE4", role: "primary text" },
  { name: "oxblood", light: "#7A2E2E", dark: "#C26A6A", role: "year · current · 'you'" },
  { name: "forest", light: "#2C4A3E", dark: "#6B8C7A", role: "table · verified" },
  { name: "verified", light: "#3F6B3A", dark: "#7AA674", role: "passed · correct" },
  { name: "muted", light: "#847C72", dark: "#847C72", role: "secondary text" },
];

const typeScale = [
  { role: "h1", label: "H1 · Display", specMobile: "28px", spec: "44px", font: "Lora 600" },
  { role: "h2", label: "H2 · Display", specMobile: "22px", spec: "26px", font: "Lora 600" },
  { role: "h3", label: "H3 · Display", specMobile: "18px", spec: "20px", font: "Lora 500" },
  { role: "body", label: "Body", specMobile: "15px", spec: "15px · 1.6", font: "Source Sans 3 400" },
  { role: "caption", label: "Caption", specMobile: "12px", spec: "12px · italic", font: "Source Sans 3 400" },
  { role: "mono", label: "Mono · Data", specMobile: "13px", spec: "13px", font: "JetBrains Mono 500" },
];

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-paper text-ink font-body">
      {/* ---------------- Header ---------------- */}
      <header className="border-b-[3px] border-double border-ink">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-oxblood">
              Wicky · Design System
            </div>
            <h1 className="mt-1 sm:mt-2 font-display text-3xl font-semibold tracking-[-0.015em] sm:text-4xl sm:tracking-[-0.018em] lg:text-5xl lg:tracking-[-0.02em]">
              The Almanac
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 space-y-14 sm:px-6 sm:py-10 sm:space-y-16 lg:px-8 lg:py-12 lg:space-y-20">
        {/* ---------------- § 01 — Palette ---------------- */}
        <Section
          num="01"
          title="Palette"
          note="6 working colors · light + dark"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {palette.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </div>
        </Section>

        {/* ---------------- § 02 — Type scale ---------------- */}
        <Section
          num="02"
          title="Type scale"
          note="Lora · Source Sans 3 · JetBrains Mono"
        >
          <Card>
            {/* Table header — hidden on mobile, visible sm+ */}
            <div className="hidden border-b border-ink/15 px-4 py-2 sm:grid sm:grid-cols-[120px_1fr_100px] sm:gap-3 sm:px-6 sm:py-3">
              <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                Role
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                Sample
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground text-right">
                Mobile / Desktop
              </div>
            </div>
            {typeScale.map((t, i) => (
              <div
                key={t.role}
                className={i !== typeScale.length - 1 ? "border-b border-ink/15" : ""}
              >
                {/* Mobile layout: stacked */}
                <div className="flex flex-col gap-1 px-4 py-3 sm:hidden">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                      {t.label}
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                      {t.specMobile}
                    </div>
                  </div>
                  <div className={typeClassMobile(t.role)}>
                    {typeSample(t.role)}
                  </div>
                </div>
                {/* sm+ layout: side by side */}
                <div className="hidden sm:grid sm:grid-cols-[120px_1fr_100px] sm:gap-3 sm:items-baseline sm:px-6 sm:py-3 lg:grid-cols-[140px_1fr_140px]">
                  <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    {t.label}
                  </div>
                  <div className={typeClass(t.role)}>{typeSample(t.role)}</div>
                  <div className="text-right font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                    <span className="sm:hidden lg:inline">{t.specMobile} / </span>
                    {t.spec}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </Section>

        {/* ---------------- § 03 — Buttons ---------------- */}
        <Section
          num="03"
          title="Buttons"
          note="primary · secondary · ghost"
        >
          <Card>
            <div className="flex flex-col flex-wrap gap-2 px-4 py-6 sm:flex-row sm:items-center sm:gap-3 sm:px-6 sm:py-8">
              <Button variant="default">
                Take the quiz
                <IconArrowRight data-icon="inline-end" />
              </Button>
              <Button variant="outline">Review answers</Button>
              <Button variant="ghost">Save for later</Button>
              <Button variant="default" disabled>
                <IconCheck data-icon="inline-start" />
                Already passed
              </Button>
            </div>
          </Card>
        </Section>

        {/* ---------------- § 04 — Card (table-styled) ---------------- */}
        <Section
          num="04"
          title="Card · table-styled"
          note="ink header bar · almanac-strong"
        >
          <div className="border border-ink">
            {/* Header bar */}
            <div className="flex items-center justify-between gap-2 border-b border-ink bg-ink px-4 py-2.5 text-paper sm:px-6 sm:py-3">
              <div className="font-display text-base font-semibold sm:text-lg">
                U.S. History
              </div>
              <div className="font-mono text-[11px] sm:text-xs whitespace-nowrap">1,250 pts</div>
            </div>
            {/* Body */}
            <div className="px-4 py-4 sm:px-6 sm:py-5">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                Level 2 · Topic 8 of 23
              </div>
              <h3 className="mb-2 sm:mb-3 font-display text-xl font-semibold sm:text-2xl">
                The American Revolution
              </h3>
              <p className="mb-4 sm:mb-5 text-sm leading-relaxed text-muted-foreground max-w-prose">
                Causes, course, and consequences of the war, 1775–1783.
              </p>
              <div className="grid grid-cols-3 border-y border-ink/15 -mx-4 sm:-mx-6">
                <Stat label="Streak" value="8d" />
                <Stat label="Time" value="12h 32m" />
                <Stat label="Done" value="60%" />
              </div>
            </div>
          </div>
        </Section>

        {/* ---------------- § 05 — Card (flat) ---------------- */}
        <Section
          num="05"
          title="Card · flat"
          note="almanac-light · no header bar"
        >
          <Card>
            <div className="p-4 sm:p-6">
              <div className="mb-1 font-display text-lg font-semibold sm:text-xl">
                U.S. History
              </div>
              <div className="mb-3 sm:mb-4 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                Currently reading · The American Revolution
              </div>
              <div className="grid grid-cols-3 border-t border-b border-ink/15 -mx-4 sm:-mx-6">
                <Stat label="Streak" value="8d" />
                <Stat label="Time" value="12h 32m" />
                <Stat label="Done" value="60%" />
              </div>
              <div className="mt-4 sm:mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <Button variant="default" size="sm">
                  Continue reading
                </Button>
                <Button variant="ghost" size="sm">
                  <IconBookmark data-icon="inline-start" />
                  Save
                </Button>
              </div>
            </div>
          </Card>
        </Section>

        {/* ---------------- § 06 — Miniature topic page ---------------- */}
        <Section
          num="06"
          title="Topic reading page"
          note="the entry · the signature lives here"
        >
          <div className="border border-ink">
            {/* Running head */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-ink px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] sm:px-6 sm:py-3 lg:px-8">
              <span className="text-oxblood font-medium">US History</span>
              <span className="text-forest font-medium">5 min read</span>
            </div>

            {/* Topic head */}
            <div className="px-4 pt-8 pb-5 sm:px-6 sm:pt-10 sm:pb-6 lg:px-8 lg:pt-12 lg:pb-8">
              <div className="mb-3 sm:mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood font-medium">
                Chapter VIII
              </div>
              <h2 className="mb-2 sm:mb-3 font-display text-3xl font-semibold tracking-[-0.015em] sm:text-4xl sm:tracking-[-0.018em] lg:text-5xl lg:tracking-[-0.02em]">
                The American Revolution
              </h2>
              <p className="font-display text-base italic text-muted-foreground max-w-prose sm:text-lg lg:text-xl">
                Causes, course, and consequences of the war, 1775–1783.
              </p>
            </div>

            {/* Body + Key Facts */}
            <div className="grid grid-cols-1 gap-6 px-4 pb-8 sm:px-6 sm:gap-8 sm:pb-10 lg:grid-cols-[1.5fr_1fr] lg:px-8">
              {/* Body text */}
              <div className="text-[15px] leading-[1.7]">
                <p className="mb-4">
                  <span className="float-left mr-2 sm:mr-3 font-display text-[36px] font-semibold leading-[0.85] text-oxblood sm:text-[40px] lg:text-[44px] lg:leading-[0.9]">
                    B
                  </span>
                  y the spring of 1776, the political break between the
                  thirteen American colonies and Great Britain had become
                  irreconcilable. The dispute, which had begun over the right
                  to tax, had expanded within a decade to questions of
                  sovereignty, representation, and the meaning of subjecthood
                  itself.
                </p>
                <p className="text-muted-foreground">
                  The First Continental Congress, meeting in Philadelphia in
                  September 1774, had attempted a petition to the Crown. The
                  petition went unanswered.
                </p>
              </div>

              {/* Key Facts table — the signature */}
              <div className="border border-ink self-start">
                <div className="bg-ink text-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] font-medium">
                  Key Facts
                </div>
                <div className="px-4 py-3 font-display text-sm font-semibold border-b border-ink/15 sm:text-base">
                  The American Revolution
                </div>
                <div className="border-b border-ink/10 px-4 py-2 grid grid-cols-[72px_1fr] gap-2 items-baseline sm:grid-cols-[80px_1fr]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Dates</span>
                  <span className="font-mono text-[13px] font-medium">1775–1783</span>
                </div>
                <div className="border-b border-ink/10 px-4 py-2 grid grid-cols-[72px_1fr] gap-2 items-baseline sm:grid-cols-[80px_1fr]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Duration</span>
                  <span className="font-mono text-[13px] font-medium">8 years</span>
                </div>
                <div className="border-b border-ink/10 px-4 py-2 grid grid-cols-[72px_1fr] gap-2 items-baseline sm:grid-cols-[80px_1fr]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Outcome</span>
                  <span className="font-mono text-[13px] font-medium text-forest">Independence</span>
                </div>
                <div className="border-b border-ink/10 px-4 py-2 grid grid-cols-[72px_1fr] gap-2 items-baseline sm:grid-cols-[80px_1fr]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Your level</span>
                  <span className="font-mono text-[13px] font-medium text-oxblood">L2 · Intermediate</span>
                </div>
                <div className="px-4 py-2 grid grid-cols-[72px_1fr] gap-2 items-baseline sm:grid-cols-[80px_1fr]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">Your rank</span>
                  <span className="font-mono text-[13px] font-medium text-oxblood">142 of 2,418</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 border-t-[3px] border-double border-ink px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 lg:px-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                Continue at your own pace
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm">
                  <IconBookmark data-icon="inline-start" />
                  Save
                </Button>
                <Button variant="default" size="sm">
                  Take the quiz
                  <IconArrowRight data-icon="inline-end" />
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ---------------- Footer ---------------- */}
        <footer className="border-t-[3px] border-double border-ink pt-4 sm:pt-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>Wicky · Almanac design system</span>
          <span>Pass 2 · Showcase</span>
        </footer>
      </div>
    </main>
  );
}

/* ============================================================
   Helpers
   ============================================================ */

function Section({
  num,
  title,
  note,
  children,
}: {
  num: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 sm:mb-6 flex items-baseline gap-2 border-b border-ink pb-2 sm:gap-4 sm:pb-3">
        <span className="font-mono text-[11px] text-oxblood font-medium shrink-0">
          § {num}
        </span>
        <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl lg:text-2xl shrink-0">
          {title}
        </h2>
        <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground whitespace-nowrap sm:inline">
          {note}
        </span>
      </div>
      {children}
    </section>
  );
}

function Swatch({
  name,
  light,
  dark,
  role,
}: {
  name: string;
  light: string;
  dark: string;
  role: string;
}) {
  return (
    <div className="flex flex-col border border-ink/15">
      <div
        className="px-3 py-3 sm:py-4 flex flex-col justify-between min-h-[72px] sm:min-h-[88px]"
        style={{ background: light, color: contrastInk(light) }}
      >
        <span className="font-mono text-[10px] lowercase tracking-[0.02em] font-medium">
          {name}
        </span>
        <span className="font-mono text-[10px] opacity-70">{light}</span>
      </div>
      <div
        className="px-3 py-3 sm:py-4 flex flex-col justify-between min-h-[72px] sm:min-h-[88px] border-t border-ink/15"
        style={{ background: dark, color: contrastInk(dark) }}
      >
        <span className="font-mono text-[10px] lowercase tracking-[0.02em] font-medium">
          {name} · dark
        </span>
        <span className="font-mono text-[10px] opacity-70">{dark}</span>
      </div>
      <div className="px-3 py-1.5 sm:py-2 font-mono text-[9px] text-muted-foreground border-t border-ink/15">
        {role}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-2 py-3 text-center border-r border-ink/15 last:border-r-0 sm:px-4">
      <div className="font-mono text-sm font-semibold sm:text-base whitespace-nowrap">{value}</div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

function typeClass(role: string): string {
  switch (role) {
    case "h1":
      return "font-display text-[28px] sm:text-[36px] lg:text-[44px] font-semibold leading-[1.1] sm:leading-[1.08] lg:leading-[1.05] tracking-[-0.015em] sm:tracking-[-0.018em] lg:tracking-[-0.02em]";
    case "h2":
      return "font-display text-[22px] sm:text-[24px] lg:text-[26px] font-semibold leading-[1.15] sm:leading-[1.15] lg:leading-[1.15] tracking-[-0.012em] sm:tracking-[-0.014em] lg:tracking-[-0.015em]";
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

function typeClassMobile(role: string): string {
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

function typeSample(role: string): string {
  switch (role) {
    case "h1":
      return "The American Revolution";
    case "h2":
      return "Causes and course of the war";
    case "h3":
      return "Current topic";
    case "body":
      return "By the spring of 1776, the political break had become irreconcilable.";
    case "caption":
      return "topic 8 of 23 · 5 min read";
    case "mono":
      return "+80 pts · 12h 32m";
    default:
      return "";
  }
}

function contrastInk(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#1A1814" : "#F0EDDF";
}
