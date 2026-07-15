# Wicky — Design System

> **The Almanac.** A reference work for learning. Data, presented with personality.
> Wicky is a study partner, not a corporate LMS, not a mobile game. The almanac is the form factor for that.

**Status:** Locked. Pass 2 deliverable.
**Locked direction:** F — Almanac.
**Reference mockup:** `mockups/direction-f-almanac.html`.
**Live showcase:** `apps/web/src/app/showcase/page.tsx` (run `pnpm --filter @wicky/web dev` and visit `/showcase`).
**Token source of truth:** `packages/config/src/theme.css` (CSS variables) and `packages/config/src/theme.ts` (typed object mirror).
**Implementation:** Tailwind v4 (`@theme inline` block in `apps/web/src/app/globals.css`), shadcn/ui v4 with `iconLibrary: "tabler"`, Tabler Icons (per `ui-spec.md` line 17: "Use iconsax icons, never lucide react icons" — Tabler is the free MIT alternative with shadcn first-class support; switch to iconsax is a one-line change in `components.json` if/when a license is available).

---

## § 1 — Design Philosophy

### 1.1 The thesis

Wicky is fundamentally a **data product**. The user's learning — points earned, topics covered, time spent, day streaks, current position on a roadmap, rank against other learners, persona classification — *is* data. It is recorded, accumulated, and presented over time.

The **almanac** is the form factor for that kind of data. An almanac is a reference work that records the world's facts in a year — a World Almanac, Whitaker's, a Farmer's Almanac. It uses tables, rule lines, running heads, year colors, and a typographic voice that is **confident, restrained, content-led, and quietly proud of what it records.** It does not congratulate. It does not celebrate. It *records*, and the recording is the achievement.

Wicky's product content and the almanac's product content are the same kind of thing. The match is not a metaphor. It is a recognition.

### 1.2 The 80% rule

The almanac is the **default voice** of the product. It is not a hard rule.

- **80% of the product is almanac.** The data surfaces — the topic reading page, the metrics page, the leaderboard, the per-topic progress, the resource-link indexes — get the full almanac expression: running heads, double-rule dividers, table-styled cards, drop caps, mono for data, the year color treatment. The product is recognizably the almanac.
- **20% is airy.** The non-data surfaces — auth, the homepage greeting, the profile, the quiz result — are airier. The almanac comes through in *typography and color* but not in *structure*. The user is allowed breathing room.
- **Celebration is restrained.** The user is allowed small moments of warmth inside the almanac frame. The number count-up animation on `+80 pts` is the celebration moment. No confetti. No trophy icon. No fake fanfare. The almanac records; the user celebrates in their own way.
- **The litmus test.** Open the showcase page (`/showcase`). If a future implementation makes it look more SaaS-modern or more gamified-cute than what's there, the design has drifted. The showcase is the contract.

### 1.3 What this is

- A **reference work.** Pages are *flat*, demarcated by rules. Tables are the primary data surface. The user's eye knows where it is because of typography and rules, not because of shadows and elevation.
- **Confident, content-led.** The hero of any screen is the content (a topic's text, a roadmap, a leaderboard, a metrics table), not the chrome around it. Chrome is restrained to let the content lead.
- **Earned gamification.** The user's progress is *evidence* of learning, not a prize for playing. The roadmap is the visual narrative; the points are receipts. Confetti is the opposite of this voice.
- **Mono for data.** Every number — points, streaks, time, ranks, percentages, page numbers, dates — is set in JetBrains Mono. The mono voice says *this is data, recorded carefully*. The same data in a humanist sans would say *this is a marketing metric*.
- **Italic for emphasis, not bold.** Source Sans 3 italic is the emphasis style. Bold is reserved for actual data values.
- **Light mode is default.** Dark mode is a first-class theme, not a "we have it" afterthought. Same design, inverted paper and ink.

### 1.4 What this is NOT

- **NOT a SaaS template.** No "Sign up with Google" landing page energy. No gradient mesh hero. No floating "elevated" cards.
- **NOT a modern web app.** No purple-to-blue gradient text. No glassmorphism. No tiny uppercase tracked eyebrow above every section (one named kicker as a brand system is voice; an eyebrow on every section is AI grammar).
- **NOT a gamified children's app.** No cartoonish primary colors. No badges as visual elements. No streak anxiety as the core mechanic. No emoji-as-illustration. (Emoji in copy is fine; emoji as a visual element is not.)
- **NOT a museum.** The almanac is not a forbidding reference work. It is *helpful*. The user is allowed to feel something. The product is friendly inside its restraint.
- **NOT broadsheet.** No hairline rules as primary dividers, no dense newspaper-like columns, no "FT weekend edition" minimalism. The almanac is denser than broadsheet and warmer.
- **NOT cream+terracotta.** `paper` is `#F0EDDF` — chroma toward green-yellow, not the AI-default warm-neutral cream band. The accent is oxblood (`#7A2E2E`), not terracotta.
- **NOT near-black+acid.** Dark mode is `#14110D` — warm near-black, not blue-black. The accent lifts to a softer oxblood (`#C26A6A`) in dark mode, not an acid green.
- **NOT drop-shadow heavy.** No `1px border + 16px+ blur shadow` combos. Borders *or* shadows, never both as decoration. The almanac has no shadows; it has rules.

### 1.5 The voice in copy

UI copy in the almanac voice is **restrained, factual, confident**. The user is treated as an adult who can read a number and know what it means.

| Almanac voice | Avoid |
|---|---|
| "Result: 4 of 5 correct." | "Great job! 🎉" |
| "Well done." | "Awesome! Keep it up! 🚀" |
| "Proceed" or "Next entry" | "Let's go!" |
| "Test your knowledge" | "Take the quiz" (fine, but check) |
| "You are at rank 142 of 2,418." | "You're crushing it!" |
| "Result: 4 of 5 correct. You passed." | "AMAZING! 80%!" |
| "Day streak: 8." | "🔥 8 day streak! Don't break it!" |

The principle: **describe what happened, do not editorialize about it.** The almanac records; the user feels.

Celebration copy is allowed in 20% of the product (the airy surfaces, the quiz result). It must be a single short acknowledgment, not a multi-exclamation marketing line. "Well done." is the maximum.

### 1.6 The hero moment

The single most important interaction in the product is a quiz being passed and the next topic on the roadmap lighting up. The roadmap is the visual narrative of the user's learning journey. It is the gamification.

The almanac expresses this naturally: the **Key Facts table on the topic page** is the receipt of what was learned. The **"Your level"** row in the table is the year color (oxblood), because "you are here" is a structural fact, not a celebration. The **"Outcome: Independence"** row is in forest, because the answer was verified.

If the roadmap is weak, the whole product is weak. If the roadmap is strong, the leaderboard becomes a quiet byproduct rather than the main event.

---

## § 2 — Token Reference

Every token is named after what it **is**, not how it's used. This keeps the tokens semantic and reusable. Tokens are defined as CSS variables in `packages/config/src/theme.css` and mirrored as a typed object in `packages/config/src/theme.ts`. Tailwind v4 consumes the CSS variables via `@theme inline` in `apps/web/src/app/globals.css`.

### 2.1 Color

#### 2.1.1 Light mode

| Token | Value | What it's for |
|---|---|---|
| `--color-paper` | `#F0EDDF` | Page background. Almanac cream — chroma toward green-yellow, not the AI-default warm-cream band. |
| `--color-surface` | `#F5F2E5` | One step lighter than paper, for layered content (table headers, card bodies on top of paper). |
| `--color-ink` | `#1A1814` | Primary text. Deep ink, near-black. |
| `--color-ink-muted` | `#847C72` | Secondary text, captions, labels, placeholders. |
| `--color-border` | `#1A1814` | Hairline color. Full opacity (the almanac doesn't do low-opacity hairlines). |
| `--color-oxblood` | `#7A2E2E` | The **year color**. Structural: dividers, current state, "you" indicators, drop caps, page-number badges. Never celebration or generic accent. |
| `--color-oxblood-soft` | `rgba(122, 46, 46, 0.08)` | Soft fill for hover states, selected states, focus backgrounds. |
| `--color-forest` | `#2C4A3E` | The **table color**. Verified states, "passed" topic states, table headers, "Independence" rows. |
| `--color-forest-soft` | `rgba(44, 74, 62, 0.08)` | Soft fill for verified-state hover. |
| `--color-verified` | `#3F6B3A` | Success: passed quiz, completed topic. |
| `--color-verified-soft` | `rgba(63, 107, 58, 0.08)` | Soft fill for success hover. |
| `--color-on-ink` | `#F0EDDF` | Foreground on `--color-ink` (table header text on ink background). |
| `--color-on-oxblood` | `#F0EDDF` | Foreground on `--color-oxblood` (button text on oxblood button). |
| `--color-on-forest` | `#F0EDDF` | Foreground on `--color-forest`. |

#### 2.1.2 Dark mode (`[data-theme="dark"]`)

| Token | Value | What changed |
|---|---|---|
| `--color-paper` | `#14110D` | Same hue, dark value. Warm near-black, not blue-black. |
| `--color-surface` | `#1E1A15` | One step lighter. |
| `--color-ink` | `#F2EDE4` | Inverted: warm off-white. |
| `--color-ink-muted` | `#847C72` | Same. |
| `--color-border` | `#F2EDE4` | Inverted. |
| `--color-oxblood` | `#C26A6A` | Lifted for dark contrast (the year color is still recognizable). |
| `--color-oxblood-soft` | `rgba(194, 106, 106, 0.12)` | Slightly higher alpha. |
| `--color-forest` | `#6B8C7A` | Lifted for dark contrast. |
| `--color-forest-soft` | `rgba(107, 140, 122, 0.12)` | Slightly higher alpha. |
| `--color-verified` | `#7AA674` | Lifted. |
| `--color-verified-soft` | `rgba(122, 166, 116, 0.12)` | Slightly higher alpha. |
| `--color-on-ink` | `#14110D` | Inverted. |
| `--color-on-oxblood` | `#14110D` | Same. |
| `--color-on-forest` | `#14110D` | Same. |

#### 2.1.3 Semantic tokens (Tailwind v4 `@theme inline`)

These are the tokens that the Tailwind utility classes consume (`bg-primary`, `text-foreground`, etc.). shadcn/ui components reference them. They wire the almanac tokens to the standard semantic names.

| Token | Maps to | Used for |
|---|---|---|
| `--color-background` | `var(--color-paper)` | `bg-background` — the page background. |
| `--color-foreground` | `var(--color-ink)` | `text-foreground` — default body text. |
| `--color-card` | `var(--color-surface)` | `bg-card` — card body. |
| `--color-card-foreground` | `var(--color-ink)` | `text-card-foreground` — text inside cards. |
| `--color-primary` | `var(--color-oxblood)` | `bg-primary`, `text-primary` — primary CTAs, year color usage. |
| `--color-primary-foreground` | `var(--color-on-oxblood)` | `text-primary-foreground` — text on primary CTAs. |
| `--color-secondary` | `var(--color-forest)` | `bg-secondary` — secondary CTAs (rare; the almanac prefers outline for secondary). |
| `--color-muted` | `var(--color-surface)` | `bg-muted` — muted backgrounds. |
| `--color-muted-foreground` | `var(--color-ink-muted)` | `text-muted-foreground` — secondary text. |
| `--color-accent` | `var(--color-oxblood-soft)` | `bg-accent` — accent backgrounds. |
| `--color-accent-foreground` | `var(--color-oxblood)` | `text-accent-foreground` — text on accent. |
| `--color-destructive` | `var(--color-oxblood)` | `bg-destructive` — destructive actions. |
| `--color-border` | `var(--color-border)` | `border-border` — borders. |
| `--color-input` | `var(--color-border)` | `border-input` — input borders. |
| `--color-ring` | `var(--color-oxblood)` | `ring-ring` — focus rings. |

### 2.2 Typography

The almanac uses **three families**, one for each role. Each family is loaded via `next/font/google` in `apps/web/src/app/layout.tsx` and exposed as a CSS variable.

| Token | Family | CSS variable | Role |
|---|---|---|---|
| Display | Lora | `--font-display` | Content titles (topic titles, subject names, entry names, page-level h1/h2/h3). **Never used for UI chrome.** |
| Body | Source Sans 3 | `--font-body` | Paragraph text, body labels, button text, captions. The workhorse. |
| Mono | JetBrains Mono | `--font-mono` | All numbers (points, streaks, time, ranks, percentages, page numbers, dates, hex values, file sizes, file paths). Plus: section labels, eyebrow text, "running head" content, table headers, "Key Facts" sidebar, "Continue at your own pace" hints. |

#### 2.2.1 Type scale

| Role | Mobile (<640px) | Desktop (1024px+) | Line-height | Tracking | Weight | Sample |
|---|---|---|---|---|---|---|
| h1 | 1.75rem (28px) | 2.75rem (44px) | 1.1→1.05 | -0.015em→-0.02em | 600 | "The American Revolution" |
| h2 | 1.375rem (22px) | 1.625rem (26px) | 1.15 | -0.012em→-0.015em | 600 | "Causes and course of the war" |
| h3 | 1.125rem (18px) | 1.25rem (20px) | 1.2 | -0.008em→-0.01em | 500 | "Current topic" |
| body | 0.9375rem (15px) | same | 1.6 | 0 | 400 | "By the spring of 1776, the political break had become irreconcilable." |
| caption | 0.75rem (12px) | same | 1.4 | 0 | 400 | "topic 8 of 23 · 5 min read" (often italic) |
| mono | 0.8125rem (13px) | same | 1.4 | 0 | 500 | "+80 pts · 12h 32m" |

**Constraints (non-negotiable):**
- Display h1 letter-spacing floor: **-0.02em** desktop, **-0.015em** mobile (not tighter — letters must not touch at small sizes).
- Display h1 line-height ceiling: **1.05** desktop, **1.1** mobile (tighter reads as cramped on small screens).
- Body line-height floor: **1.6** (the almanac is for reading — never below 1.6 regardless of viewport).
- Display h1 ceiling: **44px** desktop (the h1 is not a hero — the topic page has a chapter label above it that does the work).
- All h1/h2/h3 use **Lora 600**, not Lora 700. Bold weights are reserved for data values in mono.
- **Mobile-first:** all types start at mobile size and scale up via `sm:`/`md:`/`lg:` breakpoints. Use responsive utility classes, not `clamp()`.

#### 2.2.2 Typographic details

- **Drop cap.** The first letter of the first paragraph of a topic's content is set as a 44px Lora 600 oxblood drop cap, floated left with 8px right padding. This is the almanac's signature move on the topic reading page.
- **Italics for emphasis, not bold.** Source Sans 3 italic is the emphasis style. The em-dash and the parenthetical are typed in italic. The footnote is typed in italic. Use bold only for actual data values.
- **Small caps for emphasis in mono.** Mono small caps (`.small-caps { font-variant: small-caps; font-weight: 500; letter-spacing: 0.04em }`) are used for emphasis in mono contexts where italic doesn't apply — e.g., emphasizing "1776" in body text or "five minutes" in a caption.
- **Old-style figures in mono data.** Where it makes sense, mono data uses old-style figures (`font-variant-numeric: oldstyle-nums`) so the digits in "1775–1783" don't all sit on the same baseline — they have a hand-set feel.
- **No gradient text. No uppercase tracking on display h1.** Display h1 is sentence case, not ALL CAPS. ALL CAPS is reserved for mono section labels (running heads, eyebrows, "U.S. HISTORY", "CHAPTER VIII").

### 2.3 Spacing

4px base. Used as Tailwind spacing utilities (`p-4`, `gap-6`, `mt-8`).

| Token | Value | Use |
|---|---|---|
| `--space-1` | 0.25rem (4px) | Tight inline spacing, between mono labels and values. |
| `--space-2` | 0.5rem (8px) | Inside a label group, between an icon and its text. |
| `--space-3` | 0.75rem (12px) | Between a heading and a closely-related paragraph. |
| `--space-4` | 1rem (16px) | Standard body paragraph gap. |
| `--space-6` | 1.5rem (24px) | Section gap, between sibling cards. |
| `--space-8` | 2rem (32px) | Major section gap, between unrelated content. |
| `--space-12` | 3rem (48px) | Page-section gap, between top-of-page and main content. |
| `--space-16` | 4rem (64px) | Hero gap, above the topic title. |
| `--space-24` | 6rem (96px) | Maximum; use sparingly. |

**Rule:** the almanac has *generous* spacing. When in doubt, use one step larger than feels comfortable. A topic page with `space-4` between paragraphs reads as cramped.

### 2.4 Radii

The almanac is **mostly square**. Rounded corners are reserved for buttons and pills.

| Token | Value | Used for |
|---|---|---|
| `--radius-none` | 0 | All surfaces (cards, tables, topics, subjects, metrics). |
| `--radius-sm` | 4px | Buttons, pills, input fields. |
| `--radius-md` | 0 | Surfaces (explicit — do not round). |
| `--radius-lg` | 0 | Surfaces (explicit — do not round). |
| `--radius-xl` | 0 | Surfaces (explicit — do not round). |
| `--radius-full` | 9999px | Full pill (badges, tags). |

**Absolute ban:** card radius ≥ 12px. Card top out at 0 (square) in the almanac. The 24/28/32/40px card-radius reflex is an AI-default tell. The almanac is square.

### 2.5 Borders

Borders are the almanac's primary way of demarcating surfaces and content. Not shadows.

| Token | Value | Used for |
|---|---|---|
| `--border-hairline` | `1px solid var(--color-border)` | Between table rows, between content and footnote, between input and label. |
| `--border-double` | `3px double var(--color-border)` | The almanac's signature divider — at the bottom of every running head, at the bottom of the topic page footer. The two parallel rules are a printer's trick for emphasis without weight. |
| `--border-row` | `1px solid var(--color-border)` | Same as hairline; semantic name for table-row separators. |

**Opacity rule:** borders are full opacity. No `border-ink/15` or `border-ink/30`. The almanac doesn't do partial-opacity borders. If the border is too loud at full opacity, use a different surface treatment (e.g., a `surface`-colored background instead of a border).

### 2.6 Motion

Motion is restrained and purposeful. The almanac does not bounce. The almanac does not have a celebratory animation. The almanac has exactly one celebration, and it's the number count-up on `+80 pts`.

| Token | Value | Used for |
|---|---|---|
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Default ease-out. Exponential, no bounce, no elastic. |
| `--duration-fast` | 150ms | Hover state, focus ring, micro-interaction. |
| `--duration-base` | 200ms | Default transition, page-section fade-in. |
| `--duration-slow` | 300ms | Card entrance, scale-in animation. |

**Reduced motion:** all durations collapse to 0ms when `prefers-reduced-motion: reduce` is set. The number count-up still happens, but instantly. The almanac is accessible.

**Animation types used:**
- **Fade-in** (200ms ease-out-quart) — for content sections as they enter the viewport. Reveal animations must enhance an already-visible default; never gate visibility on a class-triggered transition.
- **Number count-up** (600ms ease-out-quart) — on `+80 pts` in the quiz result and the topic page Key Facts "Your rank" / "Your level" updates. The single allowed celebration motion. Driven by JS, not CSS keyframes.
- **No scale-in on cards.** The almanac is flat. Cards appear in place, not by scaling in from 95%.
- **No pulsing roadmap node.** (That was Direction B — Linear.) The almanac's roadmap is static, marked by a current-node indicator (oxblood fill on the circle). The user's eye knows where they are because of color and position, not because of motion.

### 2.7 Shadows

The almanac has **no shadows**. Elevation is by rule, not by shadow. There is no `--shadow-sm` or `--shadow-md`. There is `--shadow-none: 0`.

**Absolute ban:** `border: 1px solid X` + `box-shadow: 0 Npx Mpx ...` with M ≥ 16px on the same element. The "ghost card" pattern. Borders *or* shadows, never both as decoration.

### 2.8 Implementation

```css
/* apps/web/src/app/globals.css — Tailwind v4 CSS-first config */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@wicky/config/theme.css";

@theme inline {
  --color-background: var(--color-paper);
  --color-foreground: var(--color-ink);
  --color-card: var(--color-surface);
  --color-card-foreground: var(--color-ink);
  --color-primary: var(--color-oxblood);
  --color-primary-foreground: var(--color-on-oxblood);
  --color-secondary: var(--color-forest);
  --color-secondary-foreground: var(--color-on-forest);
  --color-muted: var(--color-surface);
  --color-muted-foreground: var(--color-ink-muted);
  --color-accent: var(--color-oxblood-soft);
  --color-accent-foreground: var(--color-oxblood);
  --color-destructive: var(--color-oxblood);
  --color-destructive-foreground: var(--color-on-oxblood);
  --color-border: var(--color-border);
  --color-input: var(--color-border);
  --color-ring: var(--color-oxblood);
  --radius: 0;
  --radius-sm: 4px;
  --radius-md: 0;
  --radius-lg: 0;
  --radius-xl: 0;
  --font-heading: var(--font-display);
  --font-sans: var(--font-body);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-display);
}

@custom-variant dark (&:where(.dark, .dark *));
```

The `inline` keyword is critical: it tells Tailwind v4 to read these as `var(...)` references so light/dark switching works at runtime via the `.dark` class on `<html>`.

---

## § 3 — Surface Treatment Rules

This is the **contract**. Specific rules that any implementation must follow. If a future implementation violates one of these, the design is wrong.

### 3.1 Universal rules (apply to every screen)

These rules apply to the whole product, regardless of which surface the screen is on.

1. **Mono for all numbers.** Points, streaks, time, ranks, percentages, page numbers, dates, hex values, file paths. JetBrains Mono. No exceptions.
2. **Display serif (Lora) for content titles.** Topic titles, subject names, entry names, page-level h1/h2/h3. Never used for UI chrome (button labels, navigation, form labels).
3. **Oxblood is structural, not decorative.** Dividers, current state, "you" indicators, year color, drop caps, page-number badges, selected answer states. Never for celebration, never as a generic accent, never on success messages.
4. **Forest is for verified / passed / table headers.** "Outcome: Independence" rows. Verified badges. "Passed" topic states. The forest color says *this is done correctly*.
5. **No rounded cards.** Surfaces are flat (radius: 0), demarcated by rules. Pills and buttons can be 4px. That's it.
6. **No drop shadows.** Elevation is by rule, not by shadow.
7. **Italic for emphasis, not bold.** Source Sans 3 italic. Bold is reserved for actual data values.
8. **Light mode is default.** Dark mode is a first-class theme, not a "we have it" afterthought.
9. **No gradient text.** No `background-clip: text` with a gradient. Decorative, never meaningful. Use a single solid color. Emphasis via weight or size.
10. **No emoji as visual elements.** Emoji in copy is fine. Emoji as a primary visual element (large emoji on the quiz result page, emoji in a button) is not. The almanac records; it does not illustrate.
11. **No confetti, no celebratory icons.** No trophy icon on quiz result. No "you did it!" graphic. The number count-up is the only celebration motion.
12. **No side-stripe borders.** `border-left` or `border-right` greater than 1px as a colored accent on cards, list items, callouts, or alerts. Never intentional. Rewrite with full borders, background tints, or nothing.
13. **No hand-drawn / sketchy SVG illustrations.** No `feTurbulence` paper-grain filters. The almanac is a reference work, not a notebook.
14. **No decorative grid backgrounds.** No `linear-gradient(... 1px, transparent 1px)` grid overlays. The almanac's structure comes from the content, not the background.

### 3.2 Almanac-strong rules (apply to data surfaces)

These are the rules that get the **full almanac expression**. They apply to:
- The topic reading page (the entry)
- The metrics page (the almanac's natural habitat)
- The leaderboard page
- The per-topic roadmap (subject detail / Roadmap tab)
- The subject detail / Overview tab
- Resource-link indexes

#### 3.2.1 Running head

Every data surface has a running head at the top.

```
+------------------------------------------------------------------+
| SECTION NAME                  5 MIN READ                         |
+==================================================================+
```

- **Top rule:** 1px solid ink.
- **Content row:** mono uppercase, 10px, tracking 0.12em. Left = section name in oxblood. Right = "page number" indicator in forest (or context — the almanac color varies by section type).
- **Bottom divider:** **3px double** ink. This is the almanac signature divider. Two parallel rules, not one thick one.
- **Padding:** 12px vertical, 48-64px horizontal.

The running head is *not* a navigation bar. It is a printer's running head — the page's identity and a contextual data point. No logo, no menu, no profile avatar.

#### 3.2.2 Table-styled cards

Primary content cards use the **table-styled** treatment.

```
+==================================================================+
|  U.S. HISTORY                                       1,250 PTS    |  <- ink header bar
+==================================================================+
|  Level 2 · Topic 8 of 23                                         |
|                                                                  |
|  The American Revolution                                        |
|                                                                  |
|  Causes, course, and consequences of the war, 1775–1783.        |
|                                                                  |
+==================================================================+
|  STREAK      TIME         DONE                                    |  <- 3-up stat row
|  8d          12h 32m      60%                                     |
+==================================================================+
```

- **Header bar:** ink-color background, paper-color text. Subject or topic name in Lora display 18-20px on the left, points in JetBrains Mono on the right.
- **Body:** surface-color background, ink-color text. Topic title in Lora display 24-30px. Subtitle or description in body. Stat row at the bottom in a 3-up grid with mono values and small-caps labels.
- **Borders:** 1px solid ink around the entire card. Hairline rules between the body and the stat row.
- **Padding:** 24-32px around the body, 12-16px around the header bar.

The table-styled card is the *default* for content cards on data surfaces. Flat cards (no header bar) are for non-data surfaces.

#### 3.2.3 Drop cap

The first letter of the first paragraph of a topic's content is set as a drop cap.

- 44px Lora 600 oxblood.
- Floated left with 8px right padding and 4px top padding (so the cap aligns with the cap-height of the first line).
- Only on the topic reading page's main content paragraph.

The drop cap is the almanac's signature typographic move. Every topic's content has one. It's what makes the topic page feel like an almanac entry and not a blog post.

#### 3.2.4 Key Facts table

The topic reading page has a Key Facts table in a sidebar, beside the body text.

```
+================================+
| KEY FACTS                      |  <- ink header bar
+================================+
| The American Revolution        |  <- Lora title row
+--------------------------------+
| DATES        1775–1783         |
+--------------------------------+
| DURATION     8 years           |
+--------------------------------+
| OUTCOME      Independence      |  <- forest color (verified)
+--------------------------------+
| YOUR LEVEL   L2 · Intermediate |  <- oxblood color (you)
+--------------------------------+
| YOUR RANK    142 of 2,418      |  <- oxblood color (you)
+================================+
```

- 1px solid ink border around the entire table.
- Ink-color header bar with "KEY FACTS" in mono uppercase 10px, paper-color text.
- Lora display title row beneath the header, in ink color.
- Hairline rules between rows.
- Mono uppercase 10px label column on the left, mono 13px value column on the right.
- **"YOUR" rows** (anything about the current user) use oxblood. "OUTCOME" / "VERIFIED" rows use forest. This is the year color treatment.
- Width: 1fr in a 1.5fr/1fr grid with the body. Not so wide it dominates; not so narrow it's lost.

#### 3.2.5 See also / Resource links

Resource links and "see also" references are set in a **list with rule lines between items** — like a bibliography or an index entry.

```
SEE ALSO
Continental Congress        ----
Declaration of Independence ----
Treaty of Paris (1783)      ----
George Washington           ----
```

- "SEE ALSO" label in mono uppercase 10px, ink-muted color.
- Each link in Lora italic 16px, oxblood color, with a 1px underline.
- Hairline rule between items.
- Padding: 8px vertical, 0 horizontal.

### 3.3 Almanac-light rules (apply to airy surfaces)

These are the rules for the **20%** of the product that is airier. Apply to:
- Auth (sign up, sign in, password recovery)
- Homepage greeting
- Profile
- Quiz page
- Quiz result page (mostly)

#### 3.3.1 Typography carries the almanac

On airy surfaces, the almanac comes through in *typography and color*, not in *structure*. So:

- The page's wordmark or hero text is in **Lora** (display serif).
- Body text is in **Source Sans 3** (the workhorse).
- Numbers are in **JetBrains Mono** (universal rule, never broken).
- Oxblood is used for **primary CTAs** in the same role as in the almanac-strong rules — just without the surrounding running head, double-rule divider, or table-styled card.

#### 3.3.2 No running heads, no double-rule dividers, no table-styled headers

Airy surfaces do not have:
- Running heads (no mono section label, no "page number", no 3px double-rule divider).
- Table-styled card headers (no ink-color header bar on top of cards).
- Key Facts tables (the Key Facts treatment is reserved for the topic reading page).
- Resource links in the almanac's "see also" format (use a simpler list, or omit entirely).

#### 3.3.3 The number count-up animation

The airy surfaces — particularly the quiz result page — are where the number count-up lives. When `+80 pts` appears, it counts up from 0 to 80 over 600ms with ease-out-quart. The user is allowed to feel something. The almanac records; the user celebrates in their own way.

The count-up is driven by JS, not CSS keyframes. The component should expose it as a primitive (`<CountUp value={80} />`) so it can be reused.

#### 3.3.4 Surface treatment is flat (no cards-as-floating-layers)

Airy surfaces are still **flat**. No floating cards with shadows. If information is grouped, it's grouped by spacing and rules, not by elevation. The almanac has no shadows; airy surfaces don't either.

### 3.4 Per-screen rules

Specific rules for each screen in the product. These are derived from the ui-spec.md mockups and refined for the almanac voice.

#### 3.4.1 Auth: Sign Up, Sign In, Password Recovery

- **Posture:** airy, restrained, no mascot, no illustration.
- **Wordmark:** "Wicky" in Lora display 48-60px, ink color, centered or left-aligned.
- **Tagline:** "An almanac of learning." in Lora italic 18px, ink-muted color, below the wordmark. *This replaces the spec's "Learn more. Every day." tagline if the almanac version is desired; the original tagline is acceptable too — pick one per surface.*
- **Form fields:** Source Sans 3 input, JetBrains Mono label above the input in 10px uppercase tracking 0.08em, ink-muted color. 1px solid ink border, 0 radius, 48px tall. Focus ring: 2px solid oxblood, 2px offset.
- **Primary CTA:** full-width, oxblood fill, paper text, mono uppercase 11px, 0 radius, 48px tall. "Sign up" / "Sign in" / "Send recovery link".
- **Secondary CTA (sign up with Google etc.):** full-width, paper fill, ink text, mono uppercase 11px, 0 radius, 48px tall, with a Google/Apple/Facebook icon on the left. The almanac voice on these buttons: "Continue with Google" rather than "Sign up with Google" (the action is "continue", not "sign up" — the user is starting a session, not creating an account).
- **No mascot, no illustration, no decorative shapes.** Just type, a form, and a button. The almanac's restraint is the design.
- 
#### 3.4.2.0 Bottom nav bar (mobile) / sidebar (desktop)

- **Posture:** airy. Persistent chrome.
- **Five items:** Home, Subjects, Quiz, Metrics, Profile. Each with a Tabler icon (line variant for inactive, fill variant for active).
- **Labels:** mono uppercase 10px, tracking 0.04em. Below the icon.
- **Active state:** small 4x4 oxblood dot above the icon. Icon in oxblood color. Label in ink color.
- **Inactive state:** icon in ink-muted color, label in ink-muted.
- **No background fill.** The nav is transparent on top of the page background. A 1px solid ink border on the top edge of the nav (mobile) or the right edge (desktop sidebar) demarcates it.
- **Desktop transformation:** at 1024px+, the bottom nav becomes a left sidebar. Same items, vertical layout, 240px wide, 0 radius, 1px solid ink right border.

#### 3.4.2 Homepage

- **Posture:** airy + a single data surface ("Currently Learning" as a flat list of subject rows).
- **Greeting:** "Good morning, {displayname}." in Lora display 36-44px. Time-of-day greeting, italic for the time-of-day word. Below it: "An almanac of learning, kept up to date." in Lora italic 18px, ink-muted. *The almanac version of the spec's "Keep learning. Keep growing." — more confident, more "this is what it is".*
- **Notification bell:** top-right, with a small oxblood dot for unread state. 
- **"Currently Learning" section:** header in mono uppercase 10px, ink-muted. Below: a **flat list** of subject rows (not cards). Each row: subject name in Lora display 18px on the left, current topic in Lora italic 14px below, points in JetBrains Mono 12px on the right. Hairline rule between rows. Hover state: oxblood-soft background.
- **"Explore Other Subjects" section:** header in mono uppercase 10px. Below: a horizontally-scrolling strip of subject cards. The cards use the *flat* treatment (not table-styled) — they are discovery surfaces, not active content. Card body: 1px solid ink border, 0 radius, surface-color background. Subject name in Lora display 18px, learner count in JetBrains Mono 11px ink-muted. Width: 200px. Spacing: 16px between cards.
- **"+ Add Subject" card:** a special last card in the strip with a dashed ink border. "0/5 slots used" in JetBrains Mono 11px ink-muted.

#### 3.4.3 Subject detail: Overview tab

- **Posture:** airier than the topic page, but with table-styled cards for primary content.
- **Header:** back chevron on the left, subject title ("U.S. History") in Lora display 28px, share icon on the right. Mono uppercase 10px ink-muted label above the title: "U.S. HISTORY".
- **Tab bar directly under header:** three tabs — "Overview" (active) / "Roadmap" / "Leaderboard". Pill-style: active pill is oxblood fill, paper text, mono uppercase 11px. Inactive pills are transparent fill, ink text. 0 radius. Spacing: 4px between pills.
- **"Current Topic" card:** table-styled. Ink header bar with subject name on the left, "5 MIN READ" mono on the right (in mono uppercase 10px, on an oxblood-soft background pill). Body: topic title in Lora display 28-32px, summary in body 15px, primary button "Start 5 min read" in oxblood, secondary "Further study" in outline.
- **"Your Progress" card:** flat. Level label in mono uppercase 10px ink-muted, tier name in Lora italic 18px. Percentage in Lora display 36-44px. Progress bar: 4px tall, ink color fill, ink-muted track. Stat row at the bottom: 3-up grid with Points, Day Streak, Time Spent, each in mono with a small-caps label.
- **Roadmap preview strip:** 23-topics · 3-levels caption in mono uppercase 10px ink-muted. 3-segment progress bar labeled "Level 1 / Level 2 / Level 3". Each segment is hairline-bordered; filled segments are ink-color, unfilled are surface-color.

#### 3.4.4 Subject detail: Roadmap tab

- **Posture:** almanac-strong. The roadmap is a **table** of topics.
- **Running head:** "U.S. HISTORY" in oxblood on the left, "23 TOPICS" mono on the right in forest. 3px double-rule below.
- **Section header:** "Level 2 – Intermediate" in Lora display 24px. "8/23 topics completed" in Lora italic 14px ink-muted. 1px solid ink below.
- **Topic rows:** 10 visible, scrollable for the rest. Each row: status node on the left (8px circle — filled ink for completed, filled oxblood for current, hollow ink for locked, surface-color for not-yet-reached), topic title in Lora display 16px, level mono label on the right, points mono on the far right. Hairline rules between rows. Hover state: oxblood-soft background.
- **Current row:** oxblood background (8% alpha), full-width, slight left-border accent in oxblood (1px). *Note: this is the only allowed side-stripe border, and it's contextual (current state), not decorative. It's a 1px subtle marker, not a "side-stripe" in the broadsheet sense.*
- **Locked rows:** ink-muted color, lock icon (Tabler `IconLock`) at the start of the row.

#### 3.4.5 Subject detail: Leaderboard tab

- **Posture:** almanac-strong. The leaderboard is a **table** of learners.
- **Running head:** "U.S. HISTORY" in oxblood on the left, "TOP 20" mono on the right in forest. 3px double-rule below.
- **Section header:** "Learners on this topic" in Lora display 24px. "Top learners studying The American Revolution" in Lora italic 14px ink-muted. 1px solid ink below.
- **Ranked rows:** rank number in Lora display 18px (or larger for top 3 — see below), avatar (32px, surface-color circle with the user's initial in mono), name in body 14px, level mono label, points mono on the right. Hairline rules between rows.
- **Top 3 ranks** get a colored badge instead of a plain number: rank 1 in oxblood, rank 2 in forest, rank 3 in ink-muted. The badge is a 28x28px square (not circle) with the rank number in mono.
- **Current user's row** is highlighted: oxblood-soft background, full-width, with the rank replaced by "S" (for "you" / "self") in a 28x28 oxblood square. Shown even if outside the visible top ranks.
- **"See All Learners" CTA** at the bottom: outline button, ink border, ink text, mono uppercase 11px.

#### 3.4.6 Topic reading page (the entry)

This is the almanac's hero. Every almanac-strong rule applies.

- **Running head:** "U.S. HISTORY" in oxblood on the left, "5 MIN READ" mono on the right in forest. 3px double-rule below.
- **Chapter label:** "CHAPTER VIII" in mono uppercase 11px, tracking 0.16em, oxblood color, font-weight 500. Below the running head, above the title.
- **Topic title:** Lora display 48-56px (this is the biggest display size in the product), font-weight 600, tracking -0.025em, ink color. Below the chapter label.
- **Subtitle:** Lora display italic 20-22px, font-weight 400, ink-muted color. One or two short lines. Below the title.
- **Body + Key Facts grid:** 1.5fr / 1fr on desktop, stacked on mobile. Body has a 44px Lora 600 oxblood drop cap on the first paragraph. Body text in Source Sans 3 15px line-height 1.7. Key Facts table on the right.
- **Footer:** 3px double-rule above. "Continue at your own pace" in mono uppercase 10px ink-muted on the left. "Take the quiz →" oxblood button on the right, with a Tabler `IconArrowRight` `data-icon="inline-end"`. "Save for later" ghost button (forest text) to the left of the primary.
- **No breadcrumb.** The running head already tells you where you are. A breadcrumb on top of the running head would be redundant.

#### 3.4.7 Quiz page

- **Posture:** airy. The quiz is a focused interaction, not a reference page.
- **Header:** back chevron on the left, "Quiz" title in Lora display 24px centered, "Exit" text link in oxblood italic on the right. *The almanac voice on exit: "Exit" not "Quit" or "Cancel".*
- **Progress bar under header:** 4px tall, ink color fill, surface-color track. "Question 2 of 5" caption in mono uppercase 10px ink-muted, right-aligned.
- **Question:** Lora display 24-28px, ink color. Generous margin below.
- **Answer options:** four full-width rows in a table layout. Each row: letter prefix (A, B, C, D) in mono uppercase 12px font-medium on the left (in a 32x32 square with surface-color background), text in body 16px ink color, trailing status icon (Tabler `IconCheck` for correct, `IconX` for incorrect, `IconCircle` for unselected) on the right. Hairline rules between rows.
  - **Default state:** surface-color background, ink-color text, hollow `IconCircle`.
  - **Selected-pending state:** oxblood-soft background, ink-color text, filled oxblood `IconCircle`.
  - **Correct state (after submit):** forest-soft background, ink-color text, filled forest `IconCheck`.
  - **Incorrect state (after submit):** oxblood-soft background, ink-muted text, filled oxblood `IconX`. Show the correct answer in forest as a second row.
- **"Next Question" CTA:** oxblood button, mono uppercase 11px, full-width or right-aligned. Disabled state: oxblood at 40% opacity. "Submit" on the last question instead of "Next Question".
- **No bottom nav, no running head, no chapter label.** The quiz is its own focused surface.

#### 3.4.8 Quiz Result page

- **Posture:** airy, with the count-up celebration. The single almanac-light surface where motion matters.
- **Header:** back chevron, "Quiz Result" title in mono uppercase 11px ink-muted. *Mono title, not Lora — this is data about what just happened, not content to read.*
- **Trophy? No.** A small restrained acknowledgment, not a graphic. A single line in Lora italic 24px, ink-muted color: "Well done." (passing) or "Not quite — try again" (failing). No emoji. No celebration graphic.
- **Score readout:** Lora display 64-72px, ink color, the score in giant type. "4 / 5" — the slash in mono, the numbers in Lora. Below: "Result: 4 of 5 correct." in body 15px ink-muted.
- **Points-earned pill:** "+80 pts" in mono uppercase 14px, oxblood color, on an oxblood-soft background pill, 4px radius. **The number counts up from 0 to 80 over 600ms with ease-out-quart. This is the only celebration motion in the product.** Below: "(+ 30 bonus for first-try)" in body 13px ink-muted, if applicable.
- **"Review Answers" button:** outline, ink border, ink text, mono uppercase 11px.
- **"Continue" button:** oxblood fill, paper text, mono uppercase 11px. Primary action. Goes to the next topic on the roadmap.

#### 3.4.9 Metrics page

- **Posture:** almanac-strong. This is the almanac's natural habitat. Pure data, presented carefully.
- **Running head:** "YOUR METRICS" in oxblood on the left, "ALL-TIME" mono on the right in forest. 3px double-rule below.
- **Section header:** "Insights into your learning journey" in Lora display 24px, ink color. 1px solid ink below.
- **Stats table:** 4 rows, hairline-ruled, no card chrome. Each row: label in mono uppercase 10px ink-muted on the left, value in Lora display 32-44px on the right, optional unit in mono 11px ink-muted after the value.
  - Total Learning Time — 48h 32m
  - Topics Covered — 37
  - Subjects Covered — 6
  - Points Earned — 12,480
- **"Favorite Topic" row:** full-width, hairline above and below. Thumbnail on the left (80x60 surface-color rect with a placeholder for an image), topic name in Lora display 18px, "24% of your learning" caption in Lora italic 13px ink-muted. *No image is required for Pass 2; the thumbnail is a surface-color rect.*
- **"Best Learning Time" row:** full-width, hairline above and below. Tabler `IconClock` on the left, "Weekdays · 7PM–9PM" in Lora display 18px, "You're most active and consistent." in Lora italic 13px ink-muted.
- **"Learner Persona" row:** full-width, hairline above and below. This is the most data-led row in the product. Avatar circle (64px, surface-color) on the left with the persona glyph, persona title in Lora display 32px, "The Strategist" subtitle in Lora italic 18px ink-muted, description "You plan, stay consistent, and love depth." in body 14px.
- **No bottom nav, no buttons.** The metrics page is *for reading*. It is not a launchpad.

#### 3.4.10 Leaderboard page

- **Posture:** almanac-strong.
- **Running head:** "LEADERBOARD" in oxblood on the left, "RESETS IN 6D 12H 30M" mono on the right in forest. 3px double-rule below.
- **Scope tabs:** "Global" (active) / "Following" / "Friends". Same pill-style as the subject detail tabs — active is oxblood fill, paper text, mono uppercase 11px.
- **Podium display for top 3:** #1 centered and largest (Lora display 44px, oxblood color, with a 28x28 oxblood square rank badge), #2 to the left (Lora display 32px, forest color, forest rank badge), #3 to the right (Lora display 32px, ink-muted color, ink-muted rank badge). Each with avatar (48px), name in body 14px, points in mono 13px on the right.
- **Ranked list for positions 4+:** a **table** of users. Same column structure as the subject leaderboard tab. Top 50 visible (or "See top 50" pagination).
- **Current user's row** highlighted: oxblood-soft background, full-width, with "S" rank in oxblood square. Shown at whatever rank they are, even if outside the visible top 50.
- **Footer caption:** "Leaderboards reset in 6d 12h 30m" in mono uppercase 10px ink-muted, centered.

#### 3.4.11 Profile / Settings page

- **Posture:** airy. The profile is a personal space, not a reference page.
- **Header:** "Profile" title in Lora display 28px, settings gear icon (Tabler `IconSettings`) on the right.
- **Avatar + name + email:** 80px circular avatar (surface-color background, initial in Lora display 32px ink color), name in Lora display 24px, email in body 14px ink-muted below. Edit affordance implied by the gear icon in the header.
- **Stat row:** 3-up grid. Points, Subjects, Topics. Each in a flat cell with mono value and small-caps label. Hairline borders between cells.
- **"Visibility" section:** "Show me on Leaderboard" toggle (on) and "Show my progress to others" toggle (on). Toggles: 1px solid ink border, 0 radius, 24x40px. On state: oxblood fill. Off state: surface-color fill. Mono labels above.
- **Menu list:** chevron-right rows. "Account Settings", "Notification Settings", "Learning Preferences", "Help & Support". Each row: ink-color text in body 15px, Tabler `IconChevronRight` on the right, hairline rule between rows.
- **"Log Out"** at the bottom: oxblood color (the only "destructive" color), body 15px, no chevron, separated by 32px of space above.

### 3.5 Mobile-first responsive rules

**Wicky is a mobile-first app.** The product is primarily consumed on a phone — the learner is on the go, on a break, sitting in a waiting room. Desktop is a first-class experience too, but the design starts at 375px and grows up, not at 1440px and shrinks down.

This section is the **contract** for responsive behavior. Every implementation in Pass 3 (screens) must follow these rules. The showcase page (`/showcase`) demonstrates the mobile-first approach.

#### 3.5.1 Breakpoints

Tailwind v4 default breakpoints. All designs start at the smallest breakpoint (mobile) and add complexity upward.

| Breakpoint | Width | What changes |
|---|---|---|
| Base (mobile) | 0–639px | Single column. Compact type. Stacked layouts. Bottom nav (not sidebar). |
| `sm` | 640px+ | Two-column grids become viable. Slightly larger type. |
| `md` | 768px+ | Two-column layouts (topic body + Key Facts sidebar). Wider gutters. |
| `lg` | 1024px+ | Desktop sidebar replaces bottom nav. Podium display. Larger display sizes. |
| `xl` | 1280px+ | 4-up stat rows. Max content width reached. |
| `2xl` | 1536px+ | 1640px max-w (per ui-spec). Very wide, but content never stretches beyond 72ch per paragraph. |

**Rule:** Always use `md:` (768px) for the tablet breakpoint, `lg:` (1024px) for the desktop transition, and `xl:` for large desktop. Never use a non-standard breakpoint.

#### 3.5.2 Mobile type scale

The desktop type scale (§2.2.1) must shrink for mobile. Use this responsive scale:

| Role | Mobile (<640px) | Tablet (640–1023px) | Desktop (1024px+) |
|---|---|---|---|
| h1 | 1.75rem (28px) | 2.25rem (36px) | 2.75rem (44px) |
| h2 | 1.375rem (22px) | 1.5rem (24px) | 1.625rem (26px) |
| h3 | 1.125rem (18px) | 1.125rem (18px) | 1.25rem (20px) |
| body | 0.9375rem (15px) | same | same |
| caption | 0.75rem (12px) | same | same |
| mono | 0.8125rem (13px) | same | same |
| topic-title | 1.875rem (30px) | 2.5rem (40px) | 3.125rem (50px) |
| display-score | 3rem (48px) | 3.75rem (60px) | 4.5rem (72px) |

**Implementation:** Use Tailwind responsive prefixes (`text-3xl sm:text-4xl lg:text-4.5xl` or inline `text-[28px] sm:text-[36px] lg:text-[44px]`). Do NOT use `clamp()` — Tailwind's responsive utilities are more readable and debuggable.

**Constraints:**
- h1 line-height floor: 1.1 on mobile, 1.05 on desktop.
- h1 tracking floor: -0.015em on mobile, -0.02em on desktop (less negative on mobile to prevent touching at small sizes).
- Body line-height: always 1.6 minimum.
- Mono font sizes do NOT shrink on mobile — 10px is already at the legibility floor. The 13px mono stays 13px everywhere.

#### 3.5.3 Mobile spacing

Generous on desktop (§2.3), tightened on mobile to prevent wasting precious vertical space.

| Token | Desktop | Mobile (<640px) |
|---|---|---|
| `--space-4` (paragraph gap) | 1rem (16px) | 0.75rem (12px) |
| `--space-6` (section gap) | 1.5rem (24px) | 1rem (16px) |
| `--space-8` (major section gap) | 2rem (32px) | 1.25rem (20px) |
| Container horizontal padding | `px-8` (32px) | `px-4` (16px) |
| Card internal padding | `px-6` (24px) | `px-4` (16px) |
| Running head horizontal padding | `px-8` (32px) | `px-4` (16px) |

**Rule:** Use responsive padding utilities: `px-4 sm:px-6 lg:px-8`. Never use a fixed `px-8` that eats 64px of a 375px screen (17% of width wasted).

#### 3.5.4 Mobile layout patterns

**Single column, stacked.** On mobile (<640px), all multi-column layouts stack vertically:
- Two-column grids (`grid-cols-2`) → `grid-cols-1 sm:grid-cols-2`
- Topic page body + Key Facts sidebar → single column, Key Facts below body
- 3-up stat rows stay 3-up (they're narrow enough) but reduce padding
- Homepage currently-learning + explore-other-subjects → stacked
- Leaderboard podium → stacked vertically (#1 on top, then #2 and #3 side-by-side, then list below)

**No horizontal scroll.** Nothing overflows the viewport. If a table or grid is too wide, it must either:
- Collapse to a different layout (e.g., `grid-cols-[140px_1fr_180px]` → `grid-cols-1` with each datum in a stacked row)
- Use `overflow-x-auto` as a last resort (acceptable for wide data tables, never for layout grids)

**Touch targets ≥ 44px.** All interactive elements (buttons, links, toggle switches, checkboxes, radio buttons) must be at least 44×44px on mobile. The almanac's default 48px button height satisfies this. Icon-only buttons must use `size-11` (44px) minimum.

**No hover-dependent UI.** Mobile has no hover. States that rely on `hover:` must also work via `focus-visible:` or default visibility. Tooltips are `focus-visible:` not `hover:`. Dropdown menus open on tap.

#### 3.5.5 Mobile-specific UI elements

**Bottom nav bar (mobile only):**
- Fixed to the bottom, 56px tall, with 5 items (Home, Subjects, Quiz, Metrics, Profile).
- Tabler icons at 22px, line variant for inactive, fill variant for active.
- Labels in mono uppercase 10px tracking 0.04em below the icon.
- Active: small 4×4 oxblood dot above the icon, oxblood icon color, ink label.
- Inactive: ink-muted icon, ink-muted label.
- 1px solid ink border on the top edge. Paper background (matches the page).
- `max-w-screen` with `z-50`. Safe-area inset respected for notched phones.

**Back button / header (mobile):**
- Inner screens have a back chevron (Tabler `IconChevronLeft`) on the left, title centered.
- The back button is 44×44px with `aria-label="Back"`.

**Modals and dialogs on mobile:**
- Full-width at the bottom (bottom sheet) for mobile, centered dialog for desktop.
- shadcn Drawer for mobile, Dialog for desktop (`useMediaQuery` to switch).

#### 3.5.6 Mobile type wrapping rules

- **Display titles (Lora) wrap naturally.** Never use `truncate` or `text-nowrap` on a display heading. Let the serif breathe.
- **Mono data labels use `whitespace-nowrap`** to prevent "12h" wrapping from "32m" on stat rows.
- **Running heads use `flex-wrap`** — if "U.S. HISTORY" and "5 MIN READ" can't fit side-by-side, the right element moves below.
- **Long words in body text use `hyphens-auto`** with `lang="en"` on the container. The almanac is a reading product; hyphenation is acceptable.
- **Never `truncate` a topic title.** If "The American Revolution" overflows, let it wrap. The almanac records the full name.

#### 3.5.7 Mobile breakpoint summary

```
Base (mobile-first, <640px):
  - Single column, stacked
  - Compact type (28px h1, 30px topic-title, 48px score)
  - px-4 container, px-4 card padding
  - Bottom nav visible
  - No podium, no sidebar
  - Touch targets ≥ 44px

sm (640px+):
  - Two-column grids available
  - Medium type (36px h1, 40px topic-title)
  - px-6 container

md (768px+):
  - Topic page: body + Key Facts sidebar (1.5fr/1fr)
  - px-8 container
  - Larger display sizes

lg (1024px+):
  - Desktop sidebar replaces bottom nav
  - Full display sizes (44px h1, 50px topic-title, 72px score)
  - Podium display on leaderboard
  - 4-up stat rows on metrics

xl (1280px+):
  - 1640px max-w
  - maximum spacing
```

---

## § 4 — Component Conventions

The almanac uses shadcn/ui for primitives, configured to consume the almanac tokens. The shadcn `iconLibrary: "tabler"` setting in `apps/web/components.json` ensures that generated components import from `@tabler/icons-react`, not `lucide-react`.

For Pass 2, only **Button** and **Card** are initialized. The rest come in Pass 3 as needed. But the conventions below apply to any future component.

### 4.1 Button

The shadcn Button is configured for the almanac with a few overrides.

**Variants:**

| Variant | Use | Style |
|---|---|---|
| `default` | Primary CTA — "Take the quiz", "Sign in", "Start 5 min read" | Oxblood fill, paper text, 0 radius, 4px radius on the small/sm size, mono uppercase 11px, 48px tall. |
| `outline` | Secondary — "Review answers", "Save for later" | Transparent fill, ink border 1px solid, ink text, 0 radius, mono uppercase 11px, 48px tall. |
| `ghost` | Tertiary — "See all learners →" | Transparent fill, forest text, hover: oxblood-soft background. Mono uppercase 11px. |
| `secondary` | (shadcn default) | Forest fill. Rare in the almanac; outline is preferred for secondary. |
| `destructive` | "Log Out" | Oxblood at 10% alpha fill, oxblood text, hover: oxblood at 20% alpha. |
| `link` | "Forgot?" | Oxblood underline text, no padding. |

**Sizes:**

| Size | Height | Use |
|---|---|---|
| `default` | 40px | Standard button height. |
| `sm` | 32px | Inline buttons, button bars with mixed sizes. |
| `lg` | 48px | Primary CTAs in the airy surfaces (auth, quiz). |
| `icon` | 40px | Icon-only buttons (back chevron, share icon, settings gear). |

**Icon usage (per the shadcn skill):**
- Icons inside Button use `data-icon="inline-start"` or `data-icon="inline-end"`. No sizing classes on the icon — the component handles it.
- Pass icons as objects, not string keys: `icon={IconArrowRight}` not `icon="arrowRight"`.
- The almanac uses Tabler Icons. Common icons: `IconArrowRight` (CTA), `IconBookmark` (save), `IconCheck` (passed), `IconX` (incorrect), `IconCircle` (unselected), `IconLock` (locked), `IconChevronRight` (menu), `IconClock` (time), `IconSun` / `IconMoon` (theme toggle), `IconSettings` (gear), `IconHome`, `IconBook`, `IconPencil` (quiz), `IconChartBar` (metrics), `IconUser` (profile).

### 4.2 Card

Two variants per the almanac rules:

**Table-styled (default for content cards on data surfaces):**
- Ink header bar (ink fill, paper text) with the subject/topic name in Lora display on the left and the points/data in mono on the right.
- Body in surface color with 24-32px padding.
- Stat row at the bottom in a 3-up grid with mono values and small-caps labels.
- 1px solid ink border around the entire card, 0 radius.

**Flat (default for airy surfaces):**
- 1px solid ink border, surface-color background, 0 radius.
- Title in Lora display 18-24px at the top.
- Body in Source Sans 3.
- Optional stat row at the bottom in a 3-up grid.

**Implementation note:** the shadcn Card (in `apps/web/src/components/ui/card.tsx`) is the basic primitive — it gives `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`. The table-styled variant is built by composing these with custom header markup (an ink-color div, not a CardHeader). The flat variant uses the shadcn Card as-is with a `className` override.

Per the shadcn skill's composition rules:
- **Use full Card composition.** `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter`. Don't dump everything in `CardContent`.
- **Use `FieldGroup` + `Field`** for form layout, not raw `div` with `space-y-*`.
- **Use semantic colors.** `bg-primary`, `text-muted-foreground` — never raw values like `bg-oxblood`, `text-ink-muted` (wait — those are semantic names, they're fine; the rule is to not use `bg-blue-500` raw values).
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`.

### 4.3 Form fields (for Pass 3)

When forms are added in Pass 3, they use the shadcn Field composition:
- `FieldGroup` wraps related fields.
- `Field` wraps a label + control + description.
- `FieldLabel` for the label.
- `FieldDescription` for help text below the control.
- `FieldError` / `data-invalid` for validation states.
- The control is `Input`, `Textarea`, `Select`, `Switch`, `Checkbox`, or `RadioGroup`.

Form input styling:
- 1px solid ink border, 0 radius, 48px tall (or auto for textarea).
- Source Sans 3 input, ink color, 15px.
- Mono uppercase 10px label above the input in ink-muted, tracking 0.08em.
- Focus state: 2px solid oxblood ring, 2px offset, no border-color change.
- Disabled state: ink-muted text, surface-color background, 1px solid ink-muted border at 50% opacity.
- Error state: oxblood border, `data-invalid` on Field, `aria-invalid` on the control.

### 4.4 Toggle (for Pass 3)

- 40x24px, 1px solid ink border, 0 radius.
- Off state: surface-color background, oxblood thumb on the left.
- On state: oxblood background, paper thumb on the right.
- Disabled state: 50% opacity.

### 4.5 Tabs / segmented control (for Pass 3)

- Pill-style segmented control.
- Active pill: oxblood fill, paper text, mono uppercase 11px.
- Inactive pills: transparent fill, ink text.
- Spacing: 4px between pills.
- 0 radius. 1px solid ink border around the whole control, or no border (the pills themselves demarcate).

### 4.6 Tables (for Pass 3, but the pattern applies now)

Tables are the almanac's primary data surface. They are not a separate component; they are HTML `<table>` elements styled with the almanac's tokens.

- 0 border-radius.
- 1px solid ink between rows.
- Cell padding: 12px vertical, 16px horizontal.
- Header row: ink fill, paper text, mono uppercase 10px, tracking 0.08em, font-weight 500.
- Data cells: Source Sans 3 14px, ink color.
- Numeric cells: JetBrains Mono 13px, right-aligned.
- "You" row: oxblood-soft background.
- "Verified" row: forest-soft background.
- "Current" row: oxblood border on the left (1px subtle accent), oxblood-soft background.
- Hover row: oxblood-soft background at 50% alpha.

### 4.7 Toasts and feedback (for Pass 3)

- Top-right, stack vertically.
- 1px solid ink border, 0 radius, surface-color background.
- Title in Lora display 16px, body in Source Sans 3 14px, optional CTA.
- Auto-dismiss after 5s; user can dismiss manually.
- Use `sonner` (per the shadcn skill).

### 4.8 Loading and error states

- **Loading:** Use `Skeleton` (per the shadcn skill) for placeholders. No custom `animate-pulse` divs.
- **Error:** Use `Alert` (per the shadcn skill). Don't build custom styled error divs.
- **Empty state:** Use `Empty` (per the shadcn skill). Don't build custom empty-state markup. The almanac voice on empty states: "Nothing here yet." with a brief description and a single CTA if applicable.

### 4.9 Accessibility

- All interactive elements have a 2px solid oxblood focus ring with 2px offset. No browser-default outlines.
- Color is never the only signal — oxblood, forest, and ink-muted are paired with text labels, icons, or position.
- Form validation uses `data-invalid` on Field and `aria-invalid` on the control.
- All images have alt text. Decorative images have empty alt.
- All buttons have accessible names (text content or `aria-label`).
- Reduced motion is respected: all animations collapse to 0ms.
- Heading hierarchy is correct: h1 once per page, h2 for sections, h3 for subsections.
- Tap targets are at least 44x44px (the almanac's 48px default button height exceeds this).

### 4.10 Critical rules (from the shadcn skill)

These are the shadcn skill's non-negotiable rules. They apply to the almanac project because we use shadcn primitives.

- **`className` for layout, not styling.** Never override component colors or typography with `className` — use the variant system.
- **No `space-x-*` or `space-y-*`.** Use `flex` with `gap-*`.
- **Use `size-*` when width and height are equal.** `size-10` not `w-10 h-10`.
- **Use `truncate` shorthand.** Not `overflow-hidden text-ellipsis whitespace-nowrap`.
- **No manual `dark:` color overrides.** Use semantic tokens (`bg-background`, `text-muted-foreground`).
- **Use `cn()` for conditional classes.** Don't write manual template literal ternaries.
- **No manual `z-index` on overlay components.** Dialog, Sheet, Popover, etc. handle their own stacking.
- **Items always inside their Group.** `SelectItem` → `SelectGroup`. `DropdownMenuItem` → `DropdownMenuGroup`. `CommandItem` → `CommandGroup`.
- **Use `asChild` (radix) or `render` (base) for custom triggers.** Check `base` field from `npx shadcn@latest info`. → [base-vs-radix.md]
- **Dialog, Sheet, and Drawer always need a Title.** Required for accessibility. Use `className="sr-only"` if visually hidden.
- **Use full Card composition.** `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter`.
- **`TabsTrigger` must be inside `TabsList`.** Never render triggers directly in `Tabs`.
- **`Avatar` always needs `AvatarFallback`.** For when the image fails to load.

## § 5 — Verification

To verify the almanac system is real:

1. **Monorepo builds end to end.**
   ```bash
   pnpm install
   pnpm turbo typecheck   # all 6 workspaces green
   pnpm turbo build       # all 6 workspaces green
   ```

2. **The showcase renders in both modes.**
   ```bash
   pnpm --filter @wicky/web dev
   # Open http://localhost:3000/showcase
   # Click the light/dark toggle in the top right.
   # Verify all 6 sections render with the almanac tokens.
   ```

3. **The token values match the F mockup.**
   - `--color-paper` = `#F0EDDF` (light) / `#14110D` (dark)
   - `--color-ink` = `#1A1814` (light) / `#F2EDE4` (dark)
   - `--color-oxblood` = `#7A2E2E` (light) / `#C26A6A` (dark)
   - `--color-forest` = `#2C4A3E` (light) / `#6B8C7A` (dark)
   - `--font-display` = Lora
   - `--font-body` = Source Sans 3
   - `--font-mono` = JetBrains Mono
   - Border radius: 0 on all surfaces, 4px on buttons only.

4. **The almanac voice is in the showcase.**
   - Running head on the topic page miniature: mono uppercase section name in oxblood, mono uppercase "5 MIN READ" in forest, 3px double-rule below.
   - Drop cap on the topic body: 44px Lora 600 oxblood, floated left.
   - Key Facts table: ink header bar, mono data, "YOUR LEVEL" in oxblood, "OUTCOME" in forest.
   - Button: oxblood fill, paper text, mono uppercase.
   - Card (table-styled): ink header bar with the subject name in Lora.

5. **No AI-default tells.**
   - No rounded cards (all surfaces are square).
   - No drop shadows.
   - No gradient text.
   - No confetti or celebration icons.
   - No emoji as visual elements.
   - No decorative grid backgrounds.
   - No "tiny uppercase tracked eyebrow above every section" reflex (running heads and section labels are contextual, not decorative).

6. **Mobile-first responsiveness.**
   - Resize browser to 375px width. Verify:
     - Header h1 scales down to ~28px (not 48px trying to fit).
     - Container padding is `px-4` (not `px-8` eating 17% of the viewport).
     - Type scale grid does NOT overflow horizontally — it stacks vertically with label on top, sample below.
     - Section `§` labels and titles fit without truncating; notes are hidden on mobile.
     - Stat rows fit in 3 columns without words breaking mid-character.
     - Drop cap scales down (36px mobile, 40px tablet, 44px desktop).
     - Topic title scales down (30px mobile, 40px tablet, 50px desktop).
     - Buttons stack vertically (`flex-col`) instead of trying to cram side-by-side.
     - Running head wraps gracefully: "US History" and "5 min read" stack if needed.
     - Footer stacks vertically: "Wicky · Almanac" and "Pass 2 · Showcase" on separate lines.
     - No horizontal scrollbar at any width ≥ 320px.

If any of the above checks fail, the design has drifted. Re-read this document, fix the implementation, re-verify.

---

## § 6 — Quick Reference

### File map

```
wicky-frontend/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx              # Loads Lora / Source Sans 3 / JetBrains Mono
│   │   │   │   ├── globals.css             # Tailwind v4 + @theme inline + almanac tokens
│   │   │   │   ├── page.tsx                # Homepage (link to /showcase)
│   │   │   │   └── showcase/
│   │   │   │       ├── page.tsx            # 6-section design system showcase
│   │   │   │       └── theme-toggle.tsx    # Light/dark toggle (client component)
│   │   │   ├── components/
│   │   │   │   └── ui/
│   │   │   │       ├── button.tsx          # shadcn Button
│   │   │   │       └── card.tsx            # shadcn Card
│   │   │   └── lib/
│   │   │       └── utils.ts                # cn() helper
│   │   ├── components.json                  # shadcn config (iconLibrary: "tabler")
│   │   └── postcss.config.mjs               # @tailwindcss/postcss
│   └── mobile/
│       └── .gitkeep                         # empty placeholder (per build-spec §2.2)
├── packages/
│   ├── api-client/                          # stub: typed API calls
│   ├── config/                              # almanac design tokens (this file's source)
│   │   ├── src/
│   │   │   ├── theme.css                    # CSS variables (light + dark)
│   │   │   ├── theme.ts                     # typed theme object mirror
│   │   │   ├── fonts.ts                     # font definitions
│   │   │   └── index.ts                     # barrel
│   │   └── package.json
│   ├── hooks/                               # stub: framework-light React hooks
│   ├── logic/                               # stub: pure business logic
│   └── types/                               # 6 modules, 24 interfaces (transcribed from api-reference.md)
├── mockups/                                 # Pass 2 design direction mockups
│   ├── direction-a-penguin.html
│   ├── direction-b-linear.html
│   ├── direction-c-atelier.html
│   ├── direction-d-field-guide.html
│   ├── direction-e-encyclopedia.html
│   └── direction-f-almanac.html             # ← the locked direction
├── refs/
│   ├── build-spec.md                        # what Wicky is
│   ├── api-reference.md                     # backend contract
│   ├── ui-spec.md                           # screen-by-screen mockup reference
│   └── design_system.md                     # this file
├── turbo.json
├── tsconfig.base.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

### Key commands

```bash
# Install
pnpm install

# Typecheck
pnpm turbo typecheck

# Build
pnpm turbo build

# Dev
pnpm --filter @wicky/web dev
# Open http://localhost:3000/showcase
```

### Key decisions

- **Tailwind v4** with CSS-first config (`@theme inline`), not v3. CSS variables in `theme.css` are the single source of truth.
- **shadcn/ui** for primitives, configured to consume the almanac tokens via semantic color names.
- **Tabler Icons** (per ui-spec.md line 17), wired via `iconLibrary: "tabler"` in `components.json`. Switch to iconsax is a one-line change if/when a license is available.
- **Light mode default**, dark mode a first-class theme. Toggle in the showcase header. Persists to localStorage, no flash on reload (inline script in `<head>`).
- **Next.js 16** with App Router, Turbopack for dev, `next/font` for font loading.
- **pnpm workspaces** with `node-linker=hoisted` (in `.npmrc`) for Next.js compatibility.

---

*An almanac of learning. Data, presented with personality. The almanac records; the user celebrates in their own way.*
