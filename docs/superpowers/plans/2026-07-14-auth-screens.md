# Wicky Auth Screens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the three auth surfaces (Sign Up, Sign In, Account Recovery) end-to-end with full client-side validation, server-side integration via the Django/DRF backend, light + dark mode, and mobile-first responsive design — matching the locked almanac aesthetic in `refs/design_system.md`.

**Architecture:**
- Next.js 16.2 App Router, React 19.2, Tailwind v4 (CSS-first), shadcn/ui base-nova preset
- Server Component shell wraps Client Component form islands (the form is the only interactive leaf)
- Base UI primitives (`@base-ui/react/field`, `field/control`, `field/label`, `input`) for form composition — no need to run `shadcn add` for these
- Custom thin `apps/web/src/components/auth/*` wrappers that apply the almanac aesthetic to Base UI primitives
- API calls go through the existing `@wicky/api-client` package after we wire `configureApiClient` once in a client provider
- Form validation via `react-hook-form` + `zod` + `@hookform/resolvers/zod` (these three need to be installed)

**Tech Stack:**
- Next.js 16.2.10, React 19.2.4
- TypeScript 5 (strict; apps/web/tsconfig does not extend base, so noUnusedLocals is not enforced, but keep unused vars out anyway)
- Tailwind v4.0 with `@theme inline` block in `apps/web/src/app/globals.css`
- shadcn/ui base-nova + `@base-ui/react/button` for the existing Button primitive
- Tabler Icons (`@tabler/icons-react` v3.26) — `IconMail`, `IconChevronLeft`, `IconBrandGoogle`, `IconBrandApple`, `IconBrandFacebook`, `IconLoader2`
- Form: `react-hook-form` ^7.53, `zod` ^3.23, `@hookform/resolvers` ^3.9
- Toast: `sonner` ^1.7 (NOT in current deps — install it)
- API base URL per `refs/api-reference.md` line 3: `/api` (relative). Default `API_BASE` to empty string so paths resolve to the current origin. Set `NEXT_PUBLIC_API_BASE` for cross-origin setups.

## Global Constraints (binding on every task)

These are copied verbatim from the spec. Every task's requirements implicitly include this section.

### From `refs/design_system.md` §1 (Design Philosophy)
- Wicky is an almanac — "a reference work that records the world's facts in a year"
- 80% almanac-strong / 20% airy. **Auth is in the 20% airy surfaces** (§3.3)
- Light mode default; dark mode first-class theme; `data-theme` AND `.dark` class both set together
- Mono for all numbers; display serif (Lora) for content titles; oxblood is structural, not decorative
- Italic for emphasis, not bold; bold reserved for actual data values
- Almanac voice: "describe what happened, do not editorialize about it"

### From `refs/design_system.md` §3.1 (Universal rules — apply to every screen)
1. Mono for all numbers (JetBrains Mono)
2. Display serif (Lora) for content titles — NEVER used for UI chrome (button labels, navigation, form labels)
3. Oxblood is structural: dividers, current state, "you" indicators, year color, drop caps, page-number badges, selected answer states — NEVER for celebration, NEVER as a generic accent, NEVER on success messages
4. Forest is for verified / passed / table headers
5. **No rounded cards.** Surfaces are flat (radius: 0). Pills and buttons can be 4px.
6. **No drop shadows.** Elevation by rule, not shadow.
7. Italic for emphasis, not bold
8. Light mode default; dark mode first-class
9. No gradient text
10. **No emoji as visual elements** (emoji in copy OK; emoji as primary visual not)
11. No confetti, no celebratory icons
12. No side-stripe borders
13. No hand-drawn / sketchy SVG illustrations, no `feTurbulence`
14. No decorative grid backgrounds

### From `refs/design_system.md` §3.3 (Almanac-light rules)
- The almanac comes through in *typography and color*, not in *structure*
- No running heads, no double-rule dividers, no table-styled headers
- No Key Facts tables
- Resource links in simpler list (or omitted)
- Surface treatment is flat (no cards-as-floating-layers); grouped by spacing and rules, not elevation

### From `refs/design_system.md` §3.4.1 (Auth-specific — the contract)
- **Posture:** airy, restrained, no mascot, no illustration
- **Wordmark:** "Wicky" in Lora display 48-60px, ink color, centered or left-aligned
- **Tagline:** "An almanac of learning." in Lora italic 18px, ink-muted, below the wordmark
- **Form fields:** Source Sans 3 input, JetBrains Mono label above input in 10px uppercase tracking 0.08em, ink-muted. 1px solid ink border, **0 radius, 48px tall**. Focus ring: **2px solid oxblood, 2px offset**
- **Primary CTA:** full-width, oxblood fill, paper text, mono uppercase 11px, 0 radius, **48px tall**. Text: "Sign up" / "Sign in" / "Send recovery link"
- **Secondary CTA (Continue with Google etc.):** full-width, paper fill, ink text, mono uppercase 11px, 0 radius, 48px tall, with Google/Apple/Facebook icon on the left
- **"Continue with Google"** — action verb is "Continue", not "Sign up"
- No mascot, no illustration, no decorative shapes

### From `refs/design_system.md` §3.5 (Mobile-first)
- Base design at 375px, grow up via `sm:`/`md:`/`lg:`/`xl:`. Never use `clamp()`.
- Container padding: `px-4 sm:px-6 lg:px-8`
- h1: 28/36/44px (mobile/tablet/desktop), tracking -0.015/-0.018/-0.02em
- h2: 22/24/26px, tracking -0.012/-0.014/-0.015em
- h3: 18/18/20px
- body: 15px always, line-height 1.6 floor
- caption: 12px
- mono: 13px (does NOT shrink on mobile — 10px is legibility floor)
- Touch targets ≥ 44px (the 48px button height satisfies this)
- No hover-dependent UI on mobile
- Display titles wrap naturally — never `truncate` on display h1
- Mono data labels use `whitespace-nowrap`
- `flex-wrap` on running heads (we don't have running heads on auth — N/A)

### From `refs/design_system.md` §4.1 (Button conventions)
- `default` variant: oxblood fill, paper text. We use `size="lg"` for the 48px primary CTAs.
- `outline` variant: transparent fill, ink border. We use this for the OAuth buttons.
- `link` variant: oxblood underline text, no padding. We use this for "Forgot?", "Sign in", "Sign up" inline links.
- Icons use `data-icon="inline-start"` / `data-icon="inline-end"`. NO sizing classes on icons inside Buttons.
- Tabler icon names: `IconArrowRight`, `IconBrandGoogle`, `IconBrandApple`, `IconBrandFacebook`, `IconChevronLeft`, `IconMail`, `IconLoader2`, `IconEye`, `IconEyeOff`

### From `refs/design_system.md` §4.3 (Form field conventions — Pass 3 spec)
- Use shadcn `FieldGroup` + `Field` + `FieldLabel` + `Input` composition (we'll use Base UI equivalents wrapped to match this pattern)
- 1px solid ink border, 0 radius, 48px tall
- Source Sans 3 input, ink color, 15px
- Mono uppercase 10px label above input, ink-muted, tracking 0.08em
- Focus: 2px solid oxblood ring, 2px offset (already in globals.css `*:focus-visible`)
- Disabled: ink-muted text, surface-color background, 1px solid ink-muted border at 50% opacity
- Error: oxblood border, `data-invalid` on Field, `aria-invalid` on the control

### From `refs/design_system.md` §4.9 (Accessibility)
- All interactive elements have 2px solid oxblood focus ring with 2px offset (already in globals.css)
- Color is never the only signal — oxblood, forest, and ink-muted are paired with text labels
- Form validation uses `data-invalid` on Field, `aria-invalid` on the control
- All buttons have accessible names (text content or `aria-label`)
- Reduced motion respected
- Heading hierarchy: h1 once per page, h2 for sections

### From `refs/design_system.md` §4.10 (shadcn critical rules)
- `className` for layout, not styling
- No `space-x-*` or `space-y-*`. Use `flex` with `gap-*`
- Use `size-*` when w = h: `size-11` not `w-11 h-11`
- Use `truncate` shorthand
- No manual `dark:` color overrides — use semantic tokens
- Use `cn()` for conditional classes
- No manual `z-index` on overlay components
- Use full Card composition (N/A — auth doesn't use Cards)
- Dialog, Sheet, Drawer always need a Title (N/A — no overlays in this pass)

### From the codebase (`apps/web/src/app/globals.css`)
- `* { border-color: var(--color-border); }` — every div has a 1px ink border by default. Unstyled divs in auth need `border-transparent` or `border-0`
- `body` has `font-family: var(--font-body)` — Source Sans 3 is the default
- `h1-h6` already get Lora 600 with `line-height: 1.1; letter-spacing: -0.02em` — semantic headings styled for free
- `code, kbd, samp, pre` get JetBrains Mono
- Selection color: oxblood
- Focus ring: 2px solid oxblood with 2px offset (already global)
- Reduced motion: all animations collapse to 0ms

### From the showcase (canonical patterns)
- The `data-icon` attribute is the way to put icons inside shadcn Buttons (not `size={16}` props)
- The `bg-ink text-paper` header bar is the table-styled card pattern — we DON'T use it on auth (almanac-light)
- The `border border-ink` raw div is the almanac-strong card — we DON'T use it on auth either
- The mono "or" divider in the auth plan: 1px ink line with mono "or" word in a paper-filled gap. This is **new** for auth, not in the showcase.
- The `typeClass()` / `typeClassMobile()` helpers are in `apps/web/src/app/showcase/page.tsx` lines 399-435. **They are NOT exported.** Task 1 will extract them to `apps/web/src/lib/typography.ts` so all auth pages can use them.

### From `refs/api-reference.md` (the backend contract)
- `POST /api/auth/signup` body: `{ email, password, display_name, avatar?, bio? }`. 201 + cookies on success.
- `POST /api/auth/signin` body: `{ email, password }`. 200 + cookies on success. 401 on bad creds.
- `POST /api/auth/password-reset/request` body: `{ email }`. Always 200 (no enumeration).
- `POST /api/auth/password-reset/confirm` body: `{ email, token, password }`. 200 on success, 400 with field errors on bad token/password.
- All endpoints set `access_token` + `refresh_token` HTTP-only cookies on success.
- All endpoints return `{ "data": ..., "status": "success" }` on success or `{ "detail": ..., "status": "error" }` on failure.
- Base URL: `/api` (relative, per line 3 of api-reference.md).

### From `packages/types/src/auth.ts` (existing types — DO NOT REINTVENT)
- `AuthSignupRequest`, `AuthSigninRequest`, `PasswordResetRequest`, `PasswordResetConfirmRequest`, `UserProfile` already exist. Use them.

## File Structure (locked in before tasks)

```
wicky-frontend/
├── apps/web/src/
│   ├── app/
│   │   ├── (auth)/                              # NEW: route group, no chrome
│   │   │   ├── layout.tsx                       # NEW: shell, wordmark, footer
│   │   │   ├── signup/
│   │   │   │   ├── page.tsx                     # NEW: Sign Up
│   │   │   │   └── signup-form.tsx              # NEW: client form
│   │   │   ├── signin/
│   │   │   │   ├── page.tsx                     # NEW: Sign In
│   │   │   │   └── signin-form.tsx              # NEW: client form
│   │   │   └── recover/
│   │   │       ├── page.tsx                     # NEW: Request reset (default)
│   │   │       ├── recover-form.tsx             # NEW: client form
│   │   │       ├── sent/
│   │   │       │   └── page.tsx                 # NEW: "Check your email" confirmation
│   │   │       └── confirm/
│   │   │           ├── page.tsx                 # NEW: Set new password (token in URL)
│   │   │           └── confirm-form.tsx         # NEW: client form
│   │   ├── layout.tsx                           # MODIFY: add <Providers>
│   │   ├── page.tsx                             # NO CHANGE
│   │   ├── showcase/                            # NO CHANGE (only imports update)
│   │   └── globals.css                          # NO CHANGE
│   ├── components/
│   │   ├── ui/                                  # + alert.tsx, + sonner.tsx (shadcn add)
│   │   ├── auth/                                # NEW: almanac-styled auth components
│   │   │   ├── auth-field.tsx
│   │   │   ├── auth-submit-button.tsx
│   │   │   ├── or-divider.tsx
│   │   │   ├── auth-footer-link.tsx
│   │   │   ├── back-link.tsx
│   │   │   ├── auth-form-alert.tsx
│   │   │   ├── oauth-button.tsx
│   │   │   └── oauth-icon-button.tsx
│   │   └── providers.tsx                        # NEW: client provider wrapping layout
│   ├── lib/
│   │   ├── utils.ts                             # NO CHANGE
│   │   ├── typography.ts                        # NEW: typeClass/typeClassMobile extracted from showcase
│   │   ├── api.ts                               # NEW: configureApiClient() + fetch wrapper
│   │   └── auth/
│   │       ├── schemas.ts                       # NEW: zod schemas
│   │       ├── service.ts                       # NEW: api service wrappers
│   │       └── messages.ts                      # NEW: error message copy
├── apps/web/package.json                        # MODIFY: add @wicky/api-client, react-hook-form, zod, @hookform/resolvers, sonner
└── packages/api-client/src/index.ts             # NO CHANGE
```

**No new packages, no new global config. Everything is in `apps/web/src/`.**

---

# Tasks

## Task 1: Foundation — typography helpers, form dependencies, API client wiring

**Files:**
- Create: `apps/web/src/lib/typography.ts`
- Create: `apps/web/src/components/providers.tsx`
- Create: `apps/web/src/lib/api.ts`
- Modify: `apps/web/src/app/layout.tsx` (wrap `{children}` in `<Providers>`)
- Modify: `apps/web/src/app/showcase/page.tsx` (import from typography.ts, remove local helpers)
- Modify: `apps/web/package.json` (add 4 deps + workspace link)

**Interfaces:**
- Consumes: `clsx`, `tailwind-merge`, `react`, `next/font/google`, `@wicky/api-client`, `@wicky/types`
- Produces:
  - `typeClass(role: TypeRole): string`
  - `typeClassMobile(role: TypeRole): string`
  - `<Providers>` — wraps children with API client init
  - `initApiClient()` — configures the apiClient once

- [ ] **Step 1.1:** Edit `apps/web/package.json` dependencies. Add these four new entries alongside the existing ones:

```json
"@hookform/resolvers": "^3.9.1",
"@wicky/api-client": "workspace:*",
"react-hook-form": "^7.53.2",
"sonner": "^1.7.1",
"zod": "^3.23.8"
```

Alphabetical order. Keep existing entries unchanged.

- [ ] **Step 1.2:** Run `pnpm install` from the repo root. Verify: 0 errors. Verify these new packages exist in `apps/web/node_modules/`.

- [ ] **Step 1.3:** Create `apps/web/src/lib/typography.ts` with this exact content:

```ts
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
```

- [ ] **Step 1.4:** Create `apps/web/src/lib/api.ts`:

```ts
import { configureApiClient } from "@wicky/api-client";
import type { ApiSuccess, ApiError } from "@wicky/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

let initialized = false;

export function initApiClient(): void {
  if (initialized) return;
  initialized = true;

  configureApiClient(async ({ method, path, body }) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      let detail: string;
      try {
        const errBody = (await res.json()) as Partial<ApiError> & { detail?: string };
        detail = errBody.detail ?? `Request failed with status ${res.status}`;
      } catch {
        detail = `Request failed with status ${res.status}`;
      }
      throw new ApiRequestError(detail, res.status);
    }

    if (res.status === 204) return undefined as never;
    return (await res.json()) as ApiSuccess<unknown>;
  });
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}
```

- [ ] **Step 1.5:** Create `apps/web/src/components/providers.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import { initApiClient } from "@/lib/api";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initApiClient();
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 1.6:** Modify `apps/web/src/app/layout.tsx`. Replace the entire file with this content (removes the dead-weight `Geist` font import and wraps children in `<Providers>`):

```tsx
import type { Metadata } from "next";
import { Lora, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wicky",
  description: "An almanac of learning. Learn more. Every day.",
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('wicky-theme');
    var theme = stored || 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(lora.variable, sourceSans.variable, jetbrainsMono.variable, "font-sans")}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 1.7:** Modify `apps/web/src/app/showcase/page.tsx`. Add `import { typeClass, typeClassMobile } from "@/lib/typography";` at the top of the file (next to other imports). Delete the local function definitions `typeClass`, `typeClassMobile`, and `typeSample` (lines 399-454). The other local helpers `Section`, `Swatch`, `Stat`, and `contrastInk` stay in the file (page-specific).

- [ ] **Step 1.8:** Verify with `pnpm turbo typecheck` from repo root. Expected: PASS for all 6 workspaces.

- [ ] **Step 1.9:** Verify with `pnpm turbo build` from repo root. Expected: PASS for all 6 workspaces, web app compiles.

- [ ] **Step 1.10:** Commit:

```bash
git add apps/web/package.json apps/web/src/lib/typography.ts apps/web/src/lib/api.ts apps/web/src/components/providers.tsx apps/web/src/app/layout.tsx apps/web/src/app/showcase/page.tsx
git commit -m "feat(auth-foundation): add typography helpers, api client init, providers"
```

---

## Task 2: Auth primitives — almanac-styled Field, Input, buttons, dividers

**Files:**
- Create: `apps/web/src/components/auth/auth-field.tsx`
- Create: `apps/web/src/components/auth/auth-submit-button.tsx`
- Create: `apps/web/src/components/auth/or-divider.tsx`
- Create: `apps/web/src/components/auth/auth-footer-link.tsx`
- Create: `apps/web/src/components/auth/back-link.tsx`
- Create: `apps/web/src/components/auth/auth-form-alert.tsx`
- Create: `apps/web/src/components/auth/oauth-button.tsx`
- Create: `apps/web/src/components/auth/oauth-icon-button.tsx`

Run `pnpm dlx shadcn@latest add alert sonner` first to add the two UI primitives, then build the auth wrappers.

- [ ] **Step 2.1:** Add shadcn components. Run from `apps/web`:

```bash
cd apps/web && pnpm dlx shadcn@latest add alert sonner
```

Expected: `apps/web/src/components/ui/alert.tsx` and `apps/web/src/components/ui/sonner.tsx` are created. The shadcn CLI may also create supporting files. Verify with `ls apps/web/src/components/ui/`.

- [ ] **Step 2.2:** Create `apps/web/src/components/auth/auth-field.tsx`:

```tsx
import { Field } from "@base-ui/react/field";
import { cn } from "@/lib/utils";

type AuthFieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  rightSlot?: React.ReactNode;
};

export function AuthField({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  required,
  disabled,
  value,
  onChange,
  onBlur,
  error,
  rightSlot,
}: AuthFieldProps) {
  return (
    <Field.Root
      data-invalid={error ? "" : undefined}
      className="flex flex-col gap-2"
    >
      <div className="flex items-baseline justify-between gap-2">
        <Field.Label
          htmlFor={name}
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
        >
          {label}
        </Field.Label>
        {rightSlot}
      </div>
      <Field.Control
        render={(props) => (
          <input
            {...props}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            value={value ?? ""}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            className={cn(
              "h-12 w-full border border-ink bg-paper px-3 text-[15px] text-ink",
              "font-body placeholder:text-muted-foreground",
              "outline-none transition-shadow rounded-none",
              "focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
              "disabled:bg-surface disabled:text-muted-foreground disabled:opacity-50",
              "data-[invalid]:border-oxblood data-[invalid]:ring-2 data-[invalid]:ring-oxblood data-[invalid]:ring-offset-2"
            )}
          />
        )}
      />
      {error ? (
        <p
          role="alert"
          className="font-mono text-[11px] text-oxblood"
        >
          {error}
        </p>
      ) : null}
    </Field.Root>
  );
}
```

- [ ] **Step 2.3:** Create `apps/web/src/components/auth/auth-submit-button.tsx`:

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type AuthSubmitButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

export function AuthSubmitButton({ children, loading, disabled }: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="default"
      size="lg"
      disabled={disabled || loading}
      className={cn(
        "h-12 w-full font-mono uppercase tracking-[0.04em] text-[11px] rounded-none"
      )}
    >
      {loading ? (
        <>
          <IconLoader2 data-icon="inline-start" className="animate-spin" />
          <span>Working…</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
```

- [ ] **Step 2.4:** Create `apps/web/src/components/auth/or-divider.tsx`:

```tsx
export function OrDivider({ label = "or" }: { label?: string }) {
  return (
    <div
      role="separator"
      aria-label={label}
      className="flex items-center gap-3"
    >
      <div className="h-px flex-1 bg-ink" />
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <div className="h-px flex-1 bg-ink" />
    </div>
  );
}
```

- [ ] **Step 2.5:** Create `apps/web/src/components/auth/auth-footer-link.tsx`:

```tsx
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
```

- [ ] **Step 2.6:** Create `apps/web/src/components/auth/back-link.tsx`:

```tsx
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
```

- [ ] **Step 2.7:** Create `apps/web/src/components/auth/auth-form-alert.tsx`:

```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type AuthFormAlertProps = {
  title: string;
  description?: string;
};

export function AuthFormAlert({ title, description }: AuthFormAlertProps) {
  return (
    <Alert className="rounded-none border border-oxblood bg-accent text-ink">
      <AlertTitle className="font-display text-[15px] font-semibold text-oxblood">
        {title}
      </AlertTitle>
      {description ? (
        <AlertDescription className="text-[13px] text-muted-foreground mt-1">
          {description}
        </AlertDescription>
      ) : null}
    </Alert>
  );
}
```

- [ ] **Step 2.8:** Create `apps/web/src/components/auth/oauth-button.tsx`:

```tsx
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
```

- [ ] **Step 2.9:** Create `apps/web/src/components/auth/oauth-icon-button.tsx`:

```tsx
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
```

- [ ] **Step 2.10:** Verify `pnpm turbo typecheck` PASS.

- [ ] **Step 2.11:** Commit:

```bash
git add apps/web/src/components/auth apps/web/src/components/ui/alert.tsx apps/web/src/components/ui/sonner.tsx
git commit -m "feat(auth): almanac-styled form primitives (field, input, buttons, dividers)"
```

---

## Task 3: Zod schemas, API service, error message copy

**Files:**
- Create: `apps/web/src/lib/auth/schemas.ts`
- Create: `apps/web/src/lib/auth/service.ts`
- Create: `apps/web/src/lib/auth/messages.ts`

- [ ] **Step 3.1:** Create `apps/web/src/lib/auth/schemas.ts`:

```ts
import { z } from "zod";

export const signupSchema = z.object({
  display_name: z
    .string()
    .min(1, "Display name is required.")
    .max(100, "Display name must be 100 characters or fewer."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("That email doesn't look right."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be 128 characters or fewer."),
});

export type SignupValues = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("That email doesn't look right."),
  password: z
    .string()
    .min(1, "Password is required."),
});

export type SigninValues = z.infer<typeof signinSchema>;

export const requestResetSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("That email doesn't look right."),
});

export type RequestResetValues = z.infer<typeof requestResetSchema>;

export const confirmResetSchema = z
  .object({
    email: z.string().email("That email doesn't look right."),
    token: z.string().min(1, "Reset token is missing."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password must be 128 characters or fewer."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ConfirmResetValues = z.infer<typeof confirmResetSchema>;
```

- [ ] **Step 3.2:** Create `apps/web/src/lib/auth/service.ts`:

```ts
import { apiClient } from "@wicky/api-client";
import type {
  AuthSignupRequest,
  AuthSigninRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
  UserProfile,
  ApiSuccess,
} from "@wicky/types";
import { ApiRequestError } from "@/lib/api";

type AuthResponse = ApiSuccess<UserProfile>;

export async function signup(input: AuthSignupRequest): Promise<UserProfile> {
  const res = await apiClient.post<AuthResponse>("/api/auth/signup", input);
  return res.data;
}

export async function signin(input: AuthSigninRequest): Promise<UserProfile> {
  const res = await apiClient.post<AuthResponse>("/api/auth/signin", input);
  return res.data;
}

export async function requestPasswordReset(input: PasswordResetRequest): Promise<void> {
  await apiClient.post<ApiSuccess<null>>("/api/auth/password-reset/request", input);
}

export async function confirmPasswordReset(
  input: PasswordResetConfirmRequest,
): Promise<void> {
  await apiClient.post<ApiSuccess<null>>("/api/auth/password-reset/confirm", input);
}

export { ApiRequestError };
```

- [ ] **Step 3.3:** Create `apps/web/src/lib/auth/messages.ts`:

```ts
export const authMessages = {
  signin: {
    success: "Signed in.",
  },
  signup: {
    success: "Account created.",
  },
  recover: {
    sent: "If that email exists, a reset link has been sent.",
  },
  confirmReset: {
    success: "Password reset. You can now sign in.",
  },
  errors: {
    network: "Connection failed. Try again.",
    unknown: "Something went wrong. Try again.",
    invalidCredentials: "Invalid email or password.",
    rateLimited: "Too many attempts. Try again in a moment.",
  },
} as const;
```

- [ ] **Step 3.4:** Verify `pnpm turbo typecheck` PASS.

- [ ] **Step 3.5:** Commit:

```bash
git add apps/web/src/lib/auth
git commit -m "feat(auth): zod schemas, api service, error message copy"
```

---

## Task 4: Auth route group layout (the shell)

**Files:**
- Create: `apps/web/src/app/(auth)/layout.tsx`

- [ ] **Step 4.1:** Create `apps/web/src/app/(auth)/layout.tsx`:

```tsx
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <header className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <Link
          href="/"
          aria-label="Wicky home"
          className="inline-block font-display text-2xl sm:text-3xl font-semibold tracking-[-0.015em] text-ink"
        >
          Wicky
        </Link>
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
      <footer className="px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          An almanac of learning.
        </p>
      </footer>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast: "rounded-none border border-ink bg-surface text-ink",
            title: "font-display text-[15px]",
            description: "font-body text-[13px] text-muted-foreground",
          },
        }}
      />
    </div>
  );
}
```

- [ ] **Step 4.2:** Create a temporary placeholder at `apps/web/src/app/(auth)/signup/page.tsx` to verify the layout renders:

```tsx
export default function SignupPage() {
  return <div className="p-8">Sign up coming soon.</div>;
}
```

- [ ] **Step 4.3:** Run dev and verify the layout. From `apps/web`:

```bash
pnpm dev
```

Visit `http://localhost:3000/signup`. Verify: Wicky wordmark appears top-left, the placeholder text renders in the main area, the footer tagline appears centered at the bottom. Resize to 375px — layout still works. Resize to 1440px — content stays in the natural flow.

- [ ] **Step 4.4:** Delete the placeholder at `apps/web/src/app/(auth)/signup/page.tsx` (Task 5 builds the real one). Stop the dev server.

- [ ] **Step 4.5:** Verify `pnpm turbo typecheck` PASS.

- [ ] **Step 4.6:** Commit:

```bash
git add 'apps/web/src/app/(auth)/layout.tsx'
git commit -m "feat(auth): auth route group layout with wordmark, footer, toaster"
```

---

## Task 5: Sign Up screen

**Files:**
- Create: `apps/web/src/app/(auth)/signup/page.tsx`
- Create: `apps/web/src/app/(auth)/signup/signup-form.tsx`

- [ ] **Step 5.1:** Create `apps/web/src/app/(auth)/signup/signup-form.tsx`:

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthField } from "@/components/auth/auth-field";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { OAuthButton } from "@/components/auth/oauth-button";
import { OrDivider } from "@/components/auth/or-divider";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { AuthFormAlert } from "@/components/auth/auth-form-alert";
import { signupSchema, type SignupValues } from "@/lib/auth/schemas";
import { signup, ApiRequestError } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

export function SignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: { display_name: "", email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await signup({
          display_name: values.display_name,
          email: values.email,
          password: values.password,
        });
        toast.success(authMessages.signup.success);
        router.push("/");
        router.refresh();
      } catch (err) {
        if (err instanceof ApiRequestError) {
          if (err.status === 400 || err.status === 422) {
            setTopError(err.message);
          } else {
            setTopError(authMessages.errors.unknown);
          }
        } else {
          setTopError(authMessages.errors.network);
        }
      }
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {topError ? <AuthFormAlert title={topError} /> : null}

      <AuthField
        name="display_name"
        label="Display name"
        placeholder="How should we refer to you?"
        autoComplete="name"
        required
        value={register("display_name").value}
        onChange={register("display_name").onChange}
        onBlur={register("display_name").onBlur}
        error={errors.display_name?.message}
      />

      <AuthField
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        value={register("email").value}
        onChange={register("email").onChange}
        onBlur={register("email").onBlur}
        error={errors.email?.message}
      />

      <AuthField
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        required
        value={register("password").value}
        onChange={register("password").onChange}
        onBlur={register("password").onBlur}
        error={errors.password?.message}
      />

      <AuthSubmitButton loading={isSubmitting || isPending}>
        Sign up
      </AuthSubmitButton>

      <OrDivider label="or" />

      <OAuthButton
        provider="google"
        onClick={() => toast.info("Google sign-up coming soon.")}
      >
        Continue with Google
      </OAuthButton>

      <div className="pt-2">
        <AuthFooterLink
          prompt="Already have an account?"
          linkText="Sign in"
          href="/signin"
        />
      </div>
    </form>
  );
}
```

- [ ] **Step 5.2:** Create `apps/web/src/app/(auth)/signup/page.tsx`:

```tsx
import { SignupForm } from "./signup-form";
import { typeClassMobile } from "@/lib/typography";

export const metadata = {
  title: "Sign up · Wicky",
  description: "Create an account to start your almanac of learning.",
};

export default function SignupPage() {
  return (
    <div className="flex-1 flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className={typeClassMobile("h1")}>Wicky</h1>
          <p className="mt-2 font-display text-[16px] italic text-muted-foreground sm:text-[18px]">
            An almanac of learning.
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
```

- [ ] **Step 5.3:** Verify in dev. From `apps/web`:

```bash
pnpm dev
```

Visit `http://localhost:3000/signup`. Verify:
- Wicky wordmark at h1 size (28px), centered, Lora
- Tagline "An almanac of learning." in italic below
- 3 fields stacked (display name, email, password), each with mono label
- Primary "Sign up" button full-width, oxblood
- "or" divider with hairlines
- "Continue with Google" full-width outline button
- Footer link "Already have an account? Sign in"
- Resize to 375px: layout is single column, all touch targets ≥ 44px
- Resize to 1024px: max-w-sm centered, generous whitespace

- [ ] **Step 5.4:** Test validation: submit empty form. Error "Email is required." appears in oxblood under the email field. Submit with `email: "bad"`, error "That email doesn't look right." Submit with `password: "short"`, error "Password must be at least 8 characters."

- [ ] **Step 5.5:** Test dark mode. Open DevTools, add `.dark` class to `<html>`. Verify all colors invert correctly (oxblood becomes lighter, paper becomes near-black, ink becomes paper-tinted).

- [ ] **Step 5.6:** Verify `pnpm turbo typecheck` PASS.

- [ ] **Step 5.7:** Commit:

```bash
git add 'apps/web/src/app/(auth)/signup'
git commit -m "feat(auth): sign up screen with form, validation, and OAuth placeholder"
```

---

## Task 6: Sign In screen

**Files:**
- Create: `apps/web/src/app/(auth)/signin/page.tsx`
- Create: `apps/web/src/app/(auth)/signin/signin-form.tsx`

- [ ] **Step 6.1:** Create `apps/web/src/app/(auth)/signin/signin-form.tsx`:

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthField } from "@/components/auth/auth-field";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { OrDivider } from "@/components/auth/or-divider";
import { OAuthIconButton } from "@/components/auth/oauth-icon-button";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { AuthFormAlert } from "@/components/auth/auth-form-alert";
import { signinSchema, type SigninValues } from "@/lib/auth/schemas";
import { signin, ApiRequestError } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

export function SigninForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await signin({ email: values.email, password: values.password });
        toast.success(authMessages.signin.success);
        router.push("/");
        router.refresh();
      } catch (err) {
        if (err instanceof ApiRequestError) {
          if (err.status === 401) {
            setTopError(authMessages.errors.invalidCredentials);
          } else if (err.status === 429) {
            setTopError(authMessages.errors.rateLimited);
          } else {
            setTopError(err.message || authMessages.errors.unknown);
          }
        } else {
          setTopError(authMessages.errors.network);
        }
      }
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {topError ? <AuthFormAlert title={topError} /> : null}

      <AuthField
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        value={register("email").value}
        onChange={register("email").onChange}
        onBlur={register("email").onBlur}
        error={errors.email?.message}
      />

      <AuthField
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={register("password").value}
        onChange={register("password").onChange}
        onBlur={register("password").onBlur}
        error={errors.password?.message}
        rightSlot={
          <Link
            href="/recover"
            className="font-mono text-[10px] uppercase tracking-[0.04em] text-forest underline underline-offset-4 hover:text-oxblood transition-colors"
          >
            Forgot?
          </Link>
        }
      />

      <AuthSubmitButton loading={isSubmitting || isPending}>
        Sign in
      </AuthSubmitButton>

      <OrDivider label="or continue with" />

      <div
        role="group"
        aria-label="Continue with social account"
        className="flex items-center justify-center gap-3"
      >
        <OAuthIconButton
          provider="google"
          label="Continue with Google"
          onClick={() => toast.info("Google sign-in coming soon.")}
        />
        <OAuthIconButton
          provider="apple"
          label="Continue with Apple"
          onClick={() => toast.info("Apple sign-in coming soon.")}
        />
        <OAuthIconButton
          provider="facebook"
          label="Continue with Facebook"
          onClick={() => toast.info("Facebook sign-in coming soon.")}
        />
      </div>

      <div className="pt-2">
        <AuthFooterLink
          prompt="Don't have an account?"
          linkText="Sign up"
          href="/signup"
        />
      </div>
    </form>
  );
}
```

- [ ] **Step 6.2:** Create `apps/web/src/app/(auth)/signin/page.tsx`:

```tsx
import { SigninForm } from "./signin-form";
import { typeClassMobile } from "@/lib/typography";

export const metadata = {
  title: "Sign in · Wicky",
  description: "Sign in to continue your almanac of learning.",
};

export default function SigninPage() {
  return (
    <div className="flex-1 flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className={typeClassMobile("h1")}>Wicky</h1>
          <p className="mt-2 font-display text-[16px] italic text-muted-foreground sm:text-[18px]">
            Welcome back.
          </p>
        </div>
        <SigninForm />
      </div>
    </div>
  );
}
```

- [ ] **Step 6.3:** Verify in dev. Visit `http://localhost:3000/signin`. Verify all the elements listed in Task 6.1 render correctly at 375px and 1024px. Verify the "Forgot?" link is in forest, right-aligned with the password label.

- [ ] **Step 6.4:** Test: click the 3 OAuth icon buttons — each shows a "coming soon" toast. Click "Forgot?" — navigates to `/recover`. Click "Sign up" in the footer — navigates to `/signup`.

- [ ] **Step 6.5:** Verify `pnpm turbo typecheck` PASS.

- [ ] **Step 6.6:** Commit:

```bash
git add 'apps/web/src/app/(auth)/signin'
git commit -m "feat(auth): sign in screen with form, Forgot link, social icons"
```

---

## Task 7: Password Recovery — Request screen

**Files:**
- Create: `apps/web/src/app/(auth)/recover/page.tsx`
- Create: `apps/web/src/app/(auth)/recover/recover-form.tsx`

- [ ] **Step 7.1:** Create `apps/web/src/app/(auth)/recover/recover-form.tsx`:

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthField } from "@/components/auth/auth-field";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { AuthFormAlert } from "@/components/auth/auth-form-alert";
import { requestResetSchema, type RequestResetValues } from "@/lib/auth/schemas";
import { requestPasswordReset, ApiRequestError } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

export function RecoverForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<RequestResetValues>({
    resolver: zodResolver(requestResetSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await requestPasswordReset({ email: values.email });
        router.push("/recover/sent");
      } catch (err) {
        if (err instanceof ApiRequestError) {
          setTopError(err.message || authMessages.errors.unknown);
        } else {
          setTopError(authMessages.errors.network);
        }
      }
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {topError ? <AuthFormAlert title={topError} /> : null}

      <AuthField
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        required
        value={register("email").value}
        onChange={register("email").onChange}
        onBlur={register("email").onBlur}
        error={errors.email?.message}
      />

      <AuthSubmitButton loading={isSubmitting || isPending}>
        Send recovery link
      </AuthSubmitButton>

      <div className="pt-2">
        <AuthFooterLink
          prompt="Remembered your password?"
          linkText="Sign in"
          href="/signin"
        />
      </div>
    </form>
  );
}
```

- [ ] **Step 7.2:** Create `apps/web/src/app/(auth)/recover/page.tsx`:

```tsx
import { BackLink } from "@/components/auth/back-link";
import { RecoverForm } from "./recover-form";
import { typeClassMobile } from "@/lib/typography";

export const metadata = {
  title: "Recover your account · Wicky",
  description: "Send a password reset link to your email.",
};

export default function RecoverPage() {
  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-8 sm:px-6 sm:pt-3 sm:pb-12 lg:px-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-2 sm:mb-3">
          <BackLink href="/signin" />
        </div>
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className={typeClassMobile("h1")}>Recover your account</h1>
          <p className="mt-2 font-display text-[16px] italic text-muted-foreground sm:text-[18px]">
            An email will be sent to you with a reset link.
          </p>
        </div>
        <RecoverForm />
      </div>
    </div>
  );
}
```

- [ ] **Step 7.3:** Verify in dev. Visit `http://localhost:3000/recover`. Verify: back chevron (44×44px) top-left of form area, h1 "Recover your account" 28px Lora, italic helper, email field, "Send recovery link" CTA, footer link. Resize to 375px and 1024px. Back link goes to `/signin`.

- [ ] **Step 7.4:** Verify `pnpm turbo typecheck` PASS.

- [ ] **Step 7.5:** Commit:

```bash
git add 'apps/web/src/app/(auth)/recover/page.tsx' 'apps/web/src/app/(auth)/recover/recover-form.tsx'
git commit -m "feat(auth): password recovery request screen"
```

---

## Task 8: Password Recovery — Sent confirmation screen

**Files:**
- Create: `apps/web/src/app/(auth)/recover/sent/page.tsx`

- [ ] **Step 8.1:** Create `apps/web/src/app/(auth)/recover/sent/page.tsx`:

```tsx
import { IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { BackLink } from "@/components/auth/back-link";
import { typeClassMobile } from "@/lib/typography";

export const metadata = {
  title: "Check your email · Wicky",
  description: "If an account exists, a reset link has been sent.",
};

export default function RecoverSentPage() {
  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-8 sm:px-6 sm:pt-3 sm:pb-12 lg:px-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-2 sm:mb-3">
          <BackLink href="/signin" />
        </div>
        <div className="mb-6 sm:mb-8 text-center">
          <div className="mb-4 sm:mb-6 flex justify-center text-muted-foreground">
            <IconMail size={48} stroke={1.25} aria-hidden="true" />
          </div>
          <h1 className={typeClassMobile("h1")}>Check your email.</h1>
          <p className="mt-2 font-display text-[16px] italic text-muted-foreground sm:text-[18px]">
            If an account exists at that address, you'll get a reset link shortly.
          </p>
        </div>
        <div className="pt-2 text-center">
          <Link
            href="/signin"
            className="font-mono text-[11px] uppercase tracking-[0.04em] text-forest underline underline-offset-4 hover:text-oxblood transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 8.2:** Verify in dev. Visit `http://localhost:3000/recover/sent` (or just submit the recover form to be redirected here). Verify: back chevron top-left, 48px `IconMail` line icon stroke 1.25 in ink-muted centered above h1, h1 "Check your email." in Lora 28px, italic helper below, "Back to sign in" link in forest centered.

- [ ] **Step 8.3:** Verify `pnpm turbo typecheck` PASS.

- [ ] **Step 8.4:** Commit:

```bash
git add 'apps/web/src/app/(auth)/recover/sent'
git commit -m "feat(auth): password recovery sent confirmation screen"
```

---

## Task 9: Password Recovery — Confirm reset screen

**Files:**
- Create: `apps/web/src/app/(auth)/recover/confirm/page.tsx`
- Create: `apps/web/src/app/(auth)/recover/confirm/confirm-form.tsx`

- [ ] **Step 9.1:** Create `apps/web/src/app/(auth)/recover/confirm/confirm-form.tsx`:

```tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthField } from "@/components/auth/auth-field";
import { AuthSubmitButton } from "@/components/auth/auth-submit-button";
import { AuthFormAlert } from "@/components/auth/auth-form-alert";
import { confirmResetSchema, type ConfirmResetValues } from "@/lib/auth/schemas";
import { confirmPasswordReset, ApiRequestError } from "@/lib/auth/service";
import { authMessages } from "@/lib/auth/messages";

export function ConfirmResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [topError, setTopError] = useState<string | null>(null);

  const tokenFromUrl = searchParams.get("token") ?? "";
  const emailFromUrl = searchParams.get("email") ?? "";

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<ConfirmResetValues>({
    resolver: zodResolver(confirmResetSchema),
    mode: "onBlur",
    defaultValues: {
      email: emailFromUrl,
      token: tokenFromUrl,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    setTopError(null);
    startTransition(async () => {
      try {
        await confirmPasswordReset({
          email: values.email,
          token: values.token,
          password: values.password,
        });
        toast.success(authMessages.confirmReset.success);
        router.push("/signin");
      } catch (err) {
        if (err instanceof ApiRequestError) {
          if (err.status === 400) {
            setTopError(err.message);
          } else {
            setTopError(authMessages.errors.unknown);
          }
        } else {
          setTopError(authMessages.errors.network);
        }
      }
    });
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {topError ? <AuthFormAlert title={topError} /> : null}

      <input type="hidden" {...register("email")} />
      <input type="hidden" {...register("token")} />

      <AuthField
        name="password"
        label="New password"
        type="password"
        autoComplete="new-password"
        required
        value={register("password").value}
        onChange={register("password").onChange}
        onBlur={register("password").onBlur}
        error={errors.password?.message}
      />

      <AuthField
        name="confirmPassword"
        label="Confirm new password"
        type="password"
        autoComplete="new-password"
        required
        value={register("confirmPassword").value}
        onChange={register("confirmPassword").onChange}
        onBlur={register("confirmPassword").onBlur}
        error={errors.confirmPassword?.message}
      />

      <AuthSubmitButton loading={isSubmitting || isPending}>
        Save password
      </AuthSubmitButton>
    </form>
  );
}
```

- [ ] **Step 9.2:** Create `apps/web/src/app/(auth)/recover/confirm/page.tsx`:

```tsx
import { Suspense } from "react";
import { BackLink } from "@/components/auth/back-link";
import { ConfirmResetForm } from "./confirm-form";
import { typeClassMobile } from "@/lib/typography";

export const metadata = {
  title: "Set a new password · Wicky",
  description: "Enter a new password to finish resetting your account.",
};

export default function ConfirmResetPage() {
  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-8 sm:px-6 sm:pt-3 sm:pb-12 lg:px-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-2 sm:mb-3">
          <BackLink href="/signin" />
        </div>
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className={typeClassMobile("h1")}>Set a new password</h1>
          <p className="mt-2 font-display text-[16px] italic text-muted-foreground sm:text-[18px]">
            Enter your new password below.
          </p>
        </div>
        <Suspense fallback={null}>
          <ConfirmResetForm />
        </Suspense>
      </div>
    </div>
  );
}
```

- [ ] **Step 9.3:** Verify in dev. Visit `http://localhost:3000/recover/confirm?token=abc123&email=test@example.com`. Verify: back chevron, h1 "Set a new password" 28px Lora, italic helper, 2 password fields, "Save password" CTA. The hidden inputs pre-fill from URL params. Resize to 375px and 1024px.

- [ ] **Step 9.4:** Verify `pnpm turbo typecheck` PASS.

- [ ] **Step 9.5:** Commit:

```bash
git add 'apps/web/src/app/(auth)/recover/confirm'
git commit -m "feat(auth): password recovery confirm screen"
```

---

## Task 10: Final verification + design system documentation update

**Files:**
- Modify: `refs/design_system.md` (§5.1 Component Inventory, §5.2 Screen-by-Screen Log, §6 Implementation Roadmap)
- No code changes; verification only

- [ ] **Step 10.1:** From repo root, run `pnpm turbo typecheck && pnpm turbo build`. Both must PASS for all 6 workspaces.

- [ ] **Step 10.2:** Start dev server: `pnpm --filter @wicky/web dev`. Verify each of the 4 routes at 375px and 1440px:

| Route | 375px check | 1440px check |
|---|---|---|
| `/signup` | h1 28px, 3 fields stacked, CTA full-width, "or" divider, Google outline, footer link | max-w-sm centered, generous whitespace |
| `/signin` | h1 28px, 2 fields, "Forgot?" right of label, CTA full-width, 3 circular icons centered, footer link | same, max-w-sm centered |
| `/recover` | back chevron 44×44, h1 28px, email field, CTA, footer link | same, back chevron top-left |
| `/recover/sent` | back chevron, 48px IconMail stroke 1.25, h1 28px, "Back to sign in" link centered | same, max-w-sm centered |
| `/recover/confirm?token=X&email=Y` | back chevron, h1 28px, 2 password fields, CTA | same, max-w-sm centered |

- [ ] **Step 10.3:** Verify mobile-first at 320px. No horizontal scrollbar. At 375px, all touch targets ≥ 44px. At 640px, type sizes bump up. At 1024px, h1 is 44px, h2 is 26px, form is max-w-sm centered.

- [ ] **Step 10.4:** Verify visual parity with showcase. Open `/showcase` and `/signup` side-by-side. Same product. Mono label color matches. CTA color matches. No rounded cards. No drop shadows. No gradients. No emoji.

- [ ] **Step 10.5:** Verify accessibility. Tab through `/signup`. Focus rings are 2px solid oxblood with 2px offset. On error, `data-invalid` and `aria-invalid="true"` are set. Error text has `role="alert"`.

- [ ] **Step 10.6:** Verify dark mode parity. In DevTools, add `.dark` to `<html>`. All colors invert. Mono "or" divider lines change from ink to paper-tinted. CTA becomes lighter. Border becomes paper-tinted. Text remains readable.

- [ ] **Step 10.7:** Run lint: `pnpm turbo lint`. Fix any warnings.

- [ ] **Step 10.8:** Update `refs/design_system.md` §5.1 Component Inventory. Append a new subsection at the end of the existing "Pass 3 (this pass)" list:

```markdown
### Components added in Pass 3 (auth screens)

| Name | File | Status | Notes |
|---|---|---|---|
| `AuthField` | `apps/web/src/components/auth/auth-field.tsx` | shipped | Base UI `Field` wrapper, almanac styling: 1px ink border, 0 radius, 48px tall, mono label, oxblood focus ring |
| `AuthSubmitButton` | `apps/web/src/components/auth/auth-submit-button.tsx` | shipped | Primary CTA with `IconLoader2` Spinner loading state |
| `OrDivider` | `apps/web/src/components/auth/or-divider.tsx` | shipped | Mono "or" hairline divider (the auth signature detail) |
| `AuthFooterLink` | `apps/web/src/components/auth/auth-footer-link.tsx` | shipped | "Already have an account? Sign in" pattern in forest |
| `BackLink` | `apps/web/src/components/auth/back-link.tsx` | shipped | 44×44px back chevron for recover pages |
| `AuthFormAlert` | `apps/web/src/components/auth/auth-form-alert.tsx` | shipped | Top-of-form oxblood Alert for whole-form errors |
| `OAuthButton` | `apps/web/src/components/auth/oauth-button.tsx` | shipped | Full-width outline button for "Continue with Google" |
| `OAuthIconButton` | `apps/web/src/components/auth/oauth-icon-button.tsx` | shipped | 44×44 circular icon-only button for 3-provider row |
| `Alert` (shadcn) | `apps/web/src/components/ui/alert.tsx` | shipped | Added via `pnpm dlx shadcn@latest add alert` |
| `Toaster` (sonner) | `apps/web/src/components/ui/sonner.tsx` | shipped | Added via `pnpm dlx shadcn@latest add sonner` |
| `typeClass` / `typeClassMobile` | `apps/web/src/lib/typography.ts` | extracted | Was in showcase/page.tsx, extracted to lib for reuse |
| `initApiClient` | `apps/web/src/lib/api.ts` | shipped | Configures `@wicky/api-client` with the fetch wrapper |
| `signupSchema` etc. | `apps/web/src/lib/auth/schemas.ts` | shipped | zod schemas for all 4 forms |
| `signup` / `signin` / etc. | `apps/web/src/lib/auth/service.ts` | shipped | API service wrappers |
```

- [ ] **Step 10.9:** Update `refs/design_system.md` §5.2 Screen-by-Screen Log. Append a new section at the end of the existing screen log:

```markdown
### Auth — Sign Up

- **Route:** `/signup` (in `(auth)` route group)
- **Files:** `apps/web/src/app/(auth)/signup/page.tsx`, `signup-form.tsx`
- **Status:** shipped
- **Design notes:** Wordmark "Wicky" h1 (28px mobile / 36px tablet / 44px desktop), tagline "An almanac of learning." in Lora italic 18px, 3 fields (display name, email, password) each with mono label and 1px ink border 48px tall, oxblood primary CTA full-width, "or" mono divider, "Continue with Google" outline, footer link in forest. Validation via zod. `POST /api/auth/signup`. On success toast + redirect to `/`.
- **Deviations from spec:** None. Tagline matches almanac version, "Continue with" verb per §3.4.1, no mascot/illustration.

### Auth — Sign In

- **Route:** `/signin`
- **Files:** `apps/web/src/app/(auth)/signin/page.tsx`, `signin-form.tsx`
- **Status:** shipped
- **Design notes:** Wordmark + tagline "Welcome back." (Lora italic, no emoji, no exclamation per §1.5 / §3.1.10), 2 fields (email, password), "Forgot?" link right of label in forest, "Sign in" CTA, "or continue with" divider, 3 circular icon buttons (Google/Apple/Facebook) 44×44 centered, footer link. `POST /api/auth/signin`. On success toast + redirect to `/`.
- **Deviations from spec:** Dropped the 👋 emoji and "Welcome back!" exclamation per almanac voice.

### Auth — Account Recovery

- **Routes:** `/recover`, `/recover/sent`, `/recover/confirm?token=...&email=...`
- **Files:** `apps/web/src/app/(auth)/recover/{page,recover-form}.tsx`, `recover/sent/page.tsx`, `recover/confirm/{page,confirm-form}.tsx`
- **Status:** shipped
- **Design notes:** All 3 sub-states share the shell (back chevron 44×44, h1, italic helper, max-w-sm centered). `/recover`: email + "Send recovery link" CTA. `/recover/sent`: 48px `IconMail` line icon stroke 1.25 in ink-muted centered above h1, "Back to sign in" link. `/recover/confirm`: reads `?token` and `?email` from URL into hidden inputs, shows 2 password fields, "Save password" CTA. `POST /api/auth/password-reset/{request,confirm}`. Always redirects to `/recover/sent` after request to avoid email enumeration.
- **Deviations from spec:** Dropped the envelope/paper-airplane illustration in `/recover/sent` per §3.4.1's "no mascot, no illustration, no decorative shapes". Replaced with a 48px `IconMail` Tabler line icon stroke 1.25 — a restrained line icon, not a graphic.
```

- [ ] **Step 10.10:** Update `refs/design_system.md` §6 Implementation Roadmap. In the Pass 3 ordered list, mark item 1 as done:

```markdown
- 1. ✅ Auth (Sign Up, Sign In, Password Recovery) — see §5.2 for screen log
- 2. Homepage
- 3. Subject detail (Overview, Roadmap, Leaderboard)
- ...
```

- [ ] **Step 10.11:** Final verification: `pnpm turbo typecheck && pnpm turbo build && pnpm turbo lint`. All PASS.

- [ ] **Step 10.12:** Commit the docs update:

```bash
git add refs/design_system.md
git commit -m "docs(design-system): record auth screens in §5.1 and §5.2"
```

---

## Verification Rubric (final whole-branch review)

After all 10 tasks are done, dispatch the final code-reviewer with this rubric:

1. **Spec compliance** — every requirement in `design_system.md` §3.4.1 is met. Every requirement in `ui-spec.md` §2.1, 2.2, 2.3 is met (except the deviations explicitly listed in §5.2).
2. **No new design tokens** — no new colors, type sizes, spacing, or radii introduced. Only what's in `theme.css` and `@theme inline`.
3. **No AI-default ruts** — no rounded cards, no drop shadows, no gradient text, no emoji as visual elements, no confetti, no "Welcome back! 👋" copy.
4. **Mobile-first** — every page renders correctly at 375px. No horizontal scroll at 320px+. All touch targets ≥ 44px. Display titles wrap naturally.
5. **Semantic tokens only** — no raw `bg-[#hex]` or `text-[#hex]`. All colors via `bg-paper`, `text-ink`, `bg-primary`, `text-muted-foreground`, etc.
6. **Type system** — Lora 600 for h1/h2/h3, Source Sans 3 for body, JetBrains Mono for labels and numbers. Mobile scale applied via `typeClassMobile()`.
7. **Buttons** — all use the shadcn `<Button>` primitive. Icons use `data-icon="inline-start"` / `data-icon="inline-end"`, no `size={16}` props inside Buttons.
8. **Forms** — every field is a `Field.Root` with a `Field.Label`, `Field.Control` (rendering an `<input>`), and conditional error text. `data-invalid` on the field, `aria-invalid` on the input. Mono label uppercase 10px tracking 0.08em ink-muted.
9. **Validation** — zod schema for every form. Client-side validation runs on blur. Server errors surface in the top-of-form Alert.
10. **API** — every form posts to the right endpoint. `credentials: "include"` is set so the HTTP-only cookies are stored. On success, redirect to `/`. On error, top-of-form Alert.
11. **Accessibility** — every interactive element has the 2px oxblood focus ring. All buttons have accessible names. Headings form a correct hierarchy (h1 once per page, h2 for sections).
12. **No regressions** — the showcase still works after extracting `typeClass` / `typeClassMobile` to `lib/typography.ts`. The home page (`/`) still works. The theme toggle still works.

---

## User-approved open questions

1. **Recovery confirmation visual anchor** — `IconMail` 48px stroke 1.25 ink-muted, **approved**.
2. **OAuth buttons** — click handler `toast.info("...coming soon.")`, **approved** (placeholder for later).
3. **Recovery "Sent" route** — separate `/recover/sent` page, **approved**.
4. **Confirm reset password** — included in this pass (Task 9), **approved**.
5. **Homepage redirect destination** — `router.push("/")` on success, **approved** (lands on the existing home page for now).
6. **Tagline copy** — "An almanac of learning." for sign up, "Welcome back." for sign in, **approved**.
7. **API base URL** — relative `/api` per `api-reference.md` line 3. Default `API_BASE` to empty string. Set `NEXT_PUBLIC_API_BASE` for cross-origin setups. **Approved**.
8. **Worktree** — work in place on `main`, **approved**.

---

*An almanac of learning. The almanac records; the user celebrates in their own way.*
