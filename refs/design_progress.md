## § 1 — Pass 3 Progress

### 1.1 Component inventory

#### Components added in Pass 3 — auth screens

| Name | File | Status | Notes |
|---|---|---|---|
| `AuthField` | `apps/web/src/components/auth/auth-field.tsx` | shipped | Base UI `Field.Root` + `Field.Label` + `Field.Control` wrapper. Almanac styling: 1px ink border, 0 radius, 48px tall, mono uppercase 10px label tracking 0.08em in ink-muted, oxblood focus ring, `data-invalid` and `aria-invalid` on error. |
| `AuthSubmitButton` | `apps/web/src/components/auth/auth-submit-button.tsx` | shipped | shadcn Button `variant="default" size="lg"` with `IconLoader2` + `animate-spin` loading state. Mono uppercase 11px. 0 radius, 48px tall. |
| `OrDivider` | `apps/web/src/components/auth/or-divider.tsx` | shipped | Mono "or" hairline divider. Two `bg-ink` 1px lines with a mono uppercase 10px tracking 0.12em label in a paper gap. The almanac's signature detail on the auth surfaces. |
| `AuthFooterLink` | `apps/web/src/components/auth/auth-footer-link.tsx` | shipped | "Already have an account? Sign in" pattern. Prompt in body 14px ink-muted, link in mono uppercase 11px forest with underline-offset-4, hover to oxblood. |
| `BackLink` | `apps/web/src/components/auth/back-link.tsx` | shipped | 44×44px `size-11` touch target with `IconChevronLeft` 20px. Links back to `/signin` from recover pages. |
| `AuthFormAlert` | `apps/web/src/components/auth/auth-form-alert.tsx` | shipped | Top-of-form error alert using shadcn `Alert`. 1px oxblood border, `bg-accent` (oxblood-soft) background, oxblood title in Lora display 15px, description in body 13px ink-muted. |
| `OAuthButton` | `apps/web/src/components/auth/oauth-button.tsx` | shipped | Full-width shadcn Button `variant="outline" size="lg"` with brand icon. Used for "Continue with Google" on signup. |
| `OAuthIconButton` | `apps/web/src/components/auth/oauth-icon-button.tsx` | shipped | 44×44px `size-11` raw `<button>` (not shadcn) with 20px brand icon. Used for the 3-provider row on signin. 1px ink border, paper fill. |
| `Alert` (shadcn) | `apps/web/src/components/ui/alert.tsx` | shipped | Added via `pnpm dlx shadcn@latest add alert`. Used by `AuthFormAlert`. |
| `Toaster` (sonner) | `apps/web/src/components/ui/sonner.tsx` | shipped | Added via `pnpm dlx shadcn@latest add sonner`. **Modified** to read `data-theme` from `<html>` directly (instead of `next-themes`) so it stays in sync with the almanac's custom theme system. Uses `MutationObserver` to react to theme changes. |
| `typeClass` / `typeClassMobile` | `apps/web/src/lib/typography.ts` | extracted | Was in `showcase/page.tsx`, extracted to lib for reuse. Used by all 5 auth pages and the future homepage. |
| `initApiClient` | `apps/web/src/lib/api.ts` | shipped | Configures `@wicky/api-client` with the fetch wrapper. Default `API_BASE` is empty string (relative `/api` paths); overridable via `NEXT_PUBLIC_API_BASE` for cross-origin. Defines `ApiRequestError` class. |
| `signupSchema` etc. | `apps/web/src/lib/auth/schemas.ts` | shipped | zod schemas for all 4 forms (signup, signin, requestReset, confirmReset). `confirmResetSchema` uses `.refine()` for password match. |
| `signup` / `signin` / etc. | `apps/web/src/lib/auth/service.ts` | shipped | API service wrappers. Re-exports `ApiRequestError` from `@/lib/api`. |
| `authMessages` | `apps/web/src/lib/auth/messages.ts` | shipped | All error and success copy in the almanac voice. `as const` for literal types. |
| `Skeleton` (shadcn) | `apps/web/src/components/ui/skeleton.tsx` | shipped | Added via `pnpm dlx shadcn@latest add skeleton`. Almanac default (no radius via `rounded-md` → 0 in theme). |
| `Empty` (shadcn) | `apps/web/src/components/ui/empty.tsx` | shipped | Added via `pnpm dlx shadcn@latest add empty`. **Modified** to use `border border-ink` (not `border-dashed`) and no radius — the almanac reserves dashed borders for the Add Subject card only. |
| `Greeting` | `apps/web/src/components/homepage/greeting.tsx` | shipped | Time-of-day greeting. Lora display h1 (28→36→44px) with italic on the time-of-day word. SSR renders "Good day" placeholder; client `useEffect` upgrades to morning/afternoon/evening on mount to avoid hydration skew. |
| `NotificationBell` | `apps/web/src/components/homepage/notification-bell.tsx` | shipped | 44×44 icon-only link, 1px ink border, 0 radius. Tabler `IconBell` 20px. Oxblood 4×4 dot in top-right when `unread` is true. |
| `CurrentlyLearningList` | `apps/web/src/components/homepage/currently-learning-list.tsx` | shipped | Hairline-ruled flat list (no card chrome) of subject rows. Subject name in Lora 18px; mono data summary (`L{level} · {passed} of {total}`) on the right of the points line (italic Lora subline slot reserved for the future `current_topic` field). Hover: `bg-accent` (oxblood-soft). Empty state via shadcn `Empty` with "Nothing here yet." copy. |
| `SubjectDiscoveryCard` | `apps/web/src/components/homepage/subject-discovery-card.tsx` | shipped | 200px wide, square, surface bg, 1px ink border. Subject name in Lora 18px, learner count in mono 11px ink-muted. |
| `AddSubjectCard` | `apps/web/src/components/homepage/add-subject-card.tsx` | shipped | 200px wide, **dashed** ink border, paper bg. Tabler `IconPlus` (not emoji), "Add Subject" in Lora, "{used}/{total} slots used" in mono 11px ink-muted. Disabled at 5/5 (50% opacity, no pointer events). |
| `ExploreSubjectsStrip` | `apps/web/src/components/homepage/explore-subjects-strip.tsx` | shipped | Horizontal scroll of `SubjectDiscoveryCard` + `AddSubjectCard` (always last). 16px gap (`gap-4`), hidden scrollbar. Mobile: finger scroll. Desktop (`lg+`): chevron scroll buttons appear. Per-section skeleton + error + retry. |
| `HomepageContent` | `apps/web/src/components/homepage/homepage-content.tsx` | shipped | Client orchestrator. `Promise.allSettled` over `getProfile` / `getEnrolledSubjects` / `getExploreSubjects`. 401 → `router.push("/signin")`. Per-section skeleton + error + retry. Header strip = mono `AN ALMANAC OF LEARNING` in oxblood (left) + bell (right) + 1px ink hairline (the signature detail). Mobile-only `h-8` spacer at bottom to clear the nav. |
| `NavItem` | `apps/web/src/components/nav/nav-item.tsx` | shipped | Single nav item. Line vs filled Tabler icon (filled not available for `IconChartBar` so both states use the line icon — color + 4×4 oxblood dot carry the active state). Mono uppercase 10px label (12px in desktop sidebar). Variants: `mobile` (column, dot above icon) and `desktop` (row, dot to the right of label). |
| `BottomNav` | `apps/web/src/components/nav/bottom-nav.tsx` | shipped | 5 items (Home, Subjects, Quiz, Metrics, Profile). `usePathname` for active state. Mobile: `fixed inset-x-0 bottom-0 h-14 z-50 border-t border-ink bg-background` with `pb-[env(safe-area-inset-bottom)]`. Desktop (`lg:`): `fixed left-0 inset-y-0 w-60 z-50 border-r border-ink bg-background` with the "Wicky" wordmark at the top. Hides on `/topics/*` (focused reading/quiz surfaces). |
| `formatPoints` / `formatPercent` / `formatStreak` / `formatDuration` | `apps/web/src/lib/format/number.ts` | shipped | Pure number-formatting helpers. Used by homepage; will be reused by metrics/profile in future passes. |
| `getProfile` / `getEnrolledSubjects` / `getExploreSubjects` | `apps/web/src/lib/learning/service.ts` | shipped | Service-layer wrappers for the homepage. `getProfile` unwraps `ApiSuccess<UserProfile>`; the others return raw arrays (the API doc lists them as bare arrays). Re-exports `ApiRequestError`. |
| `MAX_SUBJECT_SLOTS` | `apps/web/src/lib/learning/constants.ts` | shipped | Backend's hardcoded 5-subject cap. Mirrors the backend's `User is at capacity (5 active subjects)` error. |
| `timeOfDay` | `apps/web/src/lib/learning/time.ts` | shipped | Returns `"morning" | "afternoon" | "evening"` based on `Date.getHours()`. SSR-safe because the Greeting renders "Good day" until the client mounts and re-renders. |

### 1.2 Screen-by-screen log

#### Auth — Sign Up

- **Route:** `/signup` (in `(auth)` route group)
- **Files:** `apps/web/src/app/(auth)/signup/page.tsx`, `signup-form.tsx`
- **Status:** shipped
- **Design notes:** Wordmark "Wicky" h1 (28px mobile / 36px tablet / 44px desktop, Lora 600), tagline "An almanac of learning." in Lora italic 18px, 3 fields (display name, email, password) each with mono label and 1px ink border 48px tall, oxblood primary CTA full-width, "or" mono divider, "Continue with Google" outline, footer link in forest. Validation via zod. `POST /api/auth/signup`. On success: toast "Account created.", redirect to `/`.
- **Deviations from spec:** None. Tagline matches almanac version, "Continue with" verb per §3.4.1, no mascot/illustration.

#### Auth — Sign In

- **Route:** `/signin`
- **Files:** `apps/web/src/app/(auth)/signin/page.tsx`, `signin-form.tsx`
- **Status:** shipped
- **Design notes:** Wordmark + tagline "Welcome back." (Lora italic, no emoji, no exclamation per §1.5 / §3.1.10), 2 fields (email, password), "Forgot?" link right of label in forest, "Sign in" CTA, "or continue with" divider, 3 circular icon buttons (Google/Apple/Facebook) 44×44 centered, footer link. `POST /api/auth/signin`. Error ladder: 401 → "Invalid email or password.", 429 → "Too many attempts.", other → server message or unknown, else → network.
- **Deviations from spec:** Dropped the 👋 emoji and "Welcome back!" exclamation per almanac voice.

#### Auth — Account Recovery

- **Routes:** `/recover`, `/recover/sent`, `/recover/confirm?token=...&email=...`
- **Files:** `apps/web/src/app/(auth)/recover/{page,recover-form}.tsx`, `recover/sent/page.tsx`, `recover/confirm/{page,confirm-form}.tsx`
- **Status:** shipped
- **Design notes:** All 3 sub-states share the shell (back chevron 44×44, h1, italic helper, max-w-sm centered, `text-center sm:text-left` on heading). `/recover`: email + "Send recovery link" CTA, footer "Sign in" link. `/recover/sent`: 48px `IconMail` line icon stroke 1.25 in ink-muted centered above h1, "Back to sign in" link. `/recover/confirm`: reads `?token` and `?email` from URL into hidden inputs, shows 2 password fields, "Save password" CTA. `POST /api/auth/password-reset/{request,confirm}`. Always redirects to `/recover/sent` after request to avoid email enumeration.
- **Deviations from spec:** Dropped the envelope/paper-airplane illustration in `/recover/sent` per §3.4.1's "no mascot, no illustration, no decorative shapes". Replaced with a 48px `IconMail` Tabler line icon stroke 1.25 — a restrained line icon, not a graphic.

#### Homepage + App Shell

- **Route:** `/` (in `(app)` route group)
- **Files:** `apps/web/src/app/(app)/{layout,page}.tsx`, `apps/web/src/components/homepage/*.tsx`, `apps/web/src/components/nav/*.tsx`, `apps/web/src/lib/learning/{service,constants,time}.ts`, `apps/web/src/lib/format/number.ts`
- **Status:** shipped
- **Design notes:** App shell is almanac-light. Header strip = mono uppercase `AN ALMANAC OF LEARNING` in oxblood on the left + notification bell on the right + 1px ink hairline (the signature detail). Greeting is "Good {time-of-day}, {name}." in Lora with italic on the time-of-day word; SSR renders "Good day" placeholder to avoid hydration skew from server/client clock. Currently Learning is a hairline-ruled flat list of subject rows (no card chrome). Explore strip is a horizontal scroll of 200px-wide discovery cards + a dashed Add Subject card as the last item. Bottom nav is fixed-bottom on mobile (56px, safe-area-aware), left sidebar at `lg+` (240px); hides on `/topics/*` (focused reading/quiz surfaces).
- **Auth gate:** present at the layout level. Next.js Rewrites in `apps/web/next.config.ts` proxy `/api/:path*` to the Railway backend, so the auth cookies (`access_token`, `refresh_token`) the backend sets are stored on the frontend origin (same-origin from the browser's perspective) and `cookies().get("access_token")` in `(app)/layout.tsx` sees them natively. The data fetches remain the secondary auth check: `lib/learning/service.server.ts` forwards the cookie server-side; if `access_token` is expired/invalid, `getProfile()` returns 401 and the page redirects to `/signin`.
- **Data fetching:** Homepage is now RSC. `(app)/page.tsx` is async, fires `getProfile`, `getEnrolledSubjects`, `getExploreSubjects` in parallel via `Promise.all`, and passes the result to a presentational `<HomepageContent data={...} />`. The cross-origin cookie problem is solved by Next.js Rewrites in `apps/web/next.config.ts`. `lib/learning/service.server.ts` is a new server-only file (`import "server-only"`) that does cookie forwarding for server-side fetches; the old client-side `lib/learning/service.ts` was deleted and the 3 services moved to `service.server.ts`. `NEXT_PUBLIC_API_BASE` is gone; replaced by a server-only `API_BASE` used only in `next.config.ts` (rewrite destination) and in `lib/learning/service.server.ts` (server-side fetch base). `ApiRequestError` lives in `packages/api-client/src/errors.ts` and is re-exported from `@wicky/api-client`, `@/lib/api`, and `@/lib/auth/service`. `initApiClient()` and the `<Providers>` wrapper were removed; api-client init now happens at module top-level in `lib/api.ts`. `error.tsx` files exist in `(app)/` and `(auth)/` route groups; `loading.tsx` exists in `(app)/` for streaming.
- **Backend follow-up (v2):** Add `current_topic: string | null` to `EnrolledSubject` in `GET /api/learning/subjects` (logic: first topic with `is_passed: false` ordered by `order`, else null). Mirror in `packages/types/src/subject.ts`. When shipped, the Lora italic subline slot in each Currently Learning row lights up with the actual title and the mono data summary in the points line drops the `· L{n} · {N} of {M}` portion.
- **Deviations from spec:**
  - Dropped the "View all" link on Currently Learning and the "See all" link on Explore per design_system.md §3.4.2 (the almanac version is more restrained).
  - The Lora italic subline slot in each Currently Learning row is empty until the backend ships `current_topic`; the data summary lives in mono on the right of the points line: `1,250 pts · L2 · 8 of 23`. This keeps the type system honest (no numbers in a display font).
  - The shadcn `Empty` primitive's default `rounded-xl border-dashed` was overridden to `border border-ink` with 0 radius — the almanac bans rounded cards and reserves dashed borders for the Add Subject card only.
  - `IconChartBar` has no `*Filled` variant in `@tabler/icons-react` v3.44, so both active and inactive states use the line icon. The active state is conveyed by the oxblood color and the 4×4 oxblood dot above the icon, per design_system.md §3.4.2.0.
- **Bottom nav:** 5 items (Home, Subjects, Quiz, Metrics, Profile). Active state via `usePathname` and prefix matching. Items not yet built (`/subjects`, `/quiz`, `/metrics`, `/profile`) still render and highlight correctly when navigated to — links will 404 until those routes ship.

#### Decisions during this pass

- **`Controller` over `register()` for wrapped inputs**: react-hook-form's `register()` returns an event-callback `onChange` (takes `ChangeEvent<HTMLInputElement>`), but our wrapped `AuthField` accepts a string-callback `onChange: (value: string) => void`. The `Controller` component is the standard react-hook-form idiom for integrating with custom wrapped inputs — it provides the string-callback `field.onChange` that matches `AuthField`'s API. Hidden native inputs (in `/recover/confirm`) use `register` directly because native `<input>` accepts the event-callback shape. Mixed approach is correct and idiomatic.
- **`next-themes` removed**: The shadcn-generated `sonner.tsx` used `next-themes`' `useTheme` hook, but the almanac's theme system uses a custom inline script that sets `data-theme` on `<html>` (set up in `layout.tsx`). Without a `ThemeProvider` in the layout, `useTheme()` returns `undefined` and the Toaster falls back to `system` mode, which conflicts with the showcase's theme toggle. We rewrote the Toaster to read `data-theme` directly via `MutationObserver`, then removed the unused `next-themes` dep. Smaller dep tree, fewer moving parts.
- **`API_BASE` defaults to empty string** (relative paths): Per `api-reference.md` line 3 the base URL is `/api` (relative). Same-origin in dev. Cross-origin setups set `NEXT_PUBLIC_API_BASE`.
- **Railway backend wired** (2026-07-14): The Django backend is deployed at `https://learnerhq-production.up.railway.app/`. The frontend is wired via `NEXT_PUBLIC_API_BASE` in `.env.local` (gitignored) and `.env.production` (committed). `.env.example` documents the variable for future contributors. `api.ts` strips trailing slashes from `API_BASE` to prevent double-slash URLs. Dev requires HTTPS (`pnpm dev:https` via `--experimental-https` CLI flag) because the Railway backend sets `Secure; SameSite=None` cookies; the one-time mkcert UAC prompt on first run must be accepted. Regular `pnpm dev` serves HTTP only and will work for page rendering but not for auth cookie persistence.

---

## § 2 — Implementation Roadmap

### Pass 2 — done

- ✅ Token system in `packages/config/src/theme.css` and `theme.ts`.
- ✅ Tailwind v4 setup with `@theme inline` in `apps/web/src/app/globals.css`.
- ✅ shadcn/ui init with `iconLibrary: "tabler"`, Button + Card generated.
- ✅ Showcase page at `/showcase` with 6 sections, light/dark toggle.
- ✅ `refs/design_system.md` (this file).
- ✅ Monorepo builds end to end (`pnpm turbo typecheck` + `pnpm turbo build`).

### Pass 3 — in progress

- ✅ 1. Auth (Sign Up, Sign In, Password Recovery) — see §5.2 for screen log
- ✅ 2. Homepage + App Shell (route group, layout, bottom nav) — see §5.2 for screen log
- 3. Subject detail (Overview, Roadmap, Leaderboard)
- 4. Topic reading page (the entry)
- 5. Quiz page
- 6. Quiz Result page
- 7. Metrics page
- 8. Leaderboard page
- 9. Profile / Settings page
- 10. Bottom nav / sidebar
- Add components as needed: Textarea, Select, Combobox, Switch, Checkbox, RadioGroup, ToggleGroup, Tabs, Dialog, AlertDialog, Tooltip, Avatar, Badge, Skeleton, Spinner, Empty, sonner toast (already added), Separator.
- Each screen goes through the per-screen rules above and the shadcn critical rules.
- Fill in the § 5.1 Component inventory and § 5.2 Screen-by-screen log as screens are built.

### Pass 4+ — PWA, native, polish

- PWA support (manifest, service worker, icons, offline/caching).
- Expo/React Native app in `apps/mobile`, consuming `@wicky/config` and `@wicky/types`.
- Polish, accessibility audit, performance audit.
