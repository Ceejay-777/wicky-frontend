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
| `getSubjectDetail` | `apps/web/src/lib/learning/service.server.ts` | shipped | `cache`'d server fetcher for `GET /api/learning/subjects/<id>`. Returns `SubjectDetail`. Returns 404 if user is not enrolled or subject doesn't exist. |
| `SegmentedTabs` | `apps/web/src/components/subject/segmented-tabs.tsx` | shipped | Pill-style navigation. Each tab is a Next.js `<Link>`; uses `usePathname()` to auto-detect active state via `aria-current="page"`. Active = `bg-primary text-primary-foreground`; inactive = transparent + `hover:bg-accent`. 0 radius, 44px tall, mono uppercase 11px. ARIA: `<nav aria-label="...">` with `<Link aria-current>`. Generic — reusable for the global leaderboard scope tabs in §3.4.10. |
| `ShareButton` | `apps/web/src/components/subject/share-button.tsx` | shipped | 44×44 icon-only `<button>` matching the `NotificationBell` visual pattern. `IconShare3` 20px stroke 1.5. `onClick` → sonner toast: "Sharing ships in a later pass." Client component. |
| `SubjectHeader` | `apps/web/src/components/subject/subject-header.tsx` | shipped | Header strip. Back chevron 44×44 (`href="/"`, `IconChevronLeft` 20px), subject eyebrow (mono uppercase 10px tracking 0.12em ink-muted, derived from `name.toUpperCase()`), Lora h1 (28→32→36px), `<ShareButton/>`. 1px ink hairline below. Server component — only the slotted `<ShareButton/>` is a client component. |
| `CurrentTopicCard` | `apps/web/src/components/subject/current-topic-card.tsx` | shipped | Table-styled "Current Topic" card per §3.2.2. Ink header bar with subject name (Lora 16→18px left) + "5 min read" pill (4px radius, `bg-accent` + `text-accent-foreground`, mono uppercase 10px right). Body: mono caption ("Level 2 · Topic 8 of 23"), Lora h3 (24→28→30px), summary in body 15px, 2 buttons using `buttonVariants` + `<Link>` (primary = default, secondary = outline). `min-h-11` on mobile (touch target rule §3.5.4), `sm:min-h-0` on larger screens. "Further study" links to `/topics/[id]#resources`; "Back to home" replaces it when no current topic. |
| `YourProgressCard` | `apps/web/src/components/subject/your-progress-card.tsx` | shipped | Flat "Your Progress" card per §3.4.3. Mono level caption + Lora italic tier name ("Beginner"/"Intermediate"/"Advanced"/"Master") + Lora display percentage (36→40→44px, static — no count-up) + 4px progress bar (`role="progressbar"` with `aria-valuenow`) + "Topic N of M" caption + 3-up stat row (Points real, Streak `--`, Time `--`). Tier name mapping: L1→Beginner, L2→Intermediate, L3→Advanced, ≥4→Master. |
| `RoadmapPreview` | `apps/web/src/components/subject/roadmap-preview.tsx` | shipped | Caption ("{n} topics · {n} levels", mono uppercase 10px) + "View roadmap →" link (mono 11px oxblood, `IconArrowRight` 14px) + 3-segment progress bar. Each segment hairline-bordered (`border-r border-ink`). Filled segments = `bg-foreground`; unfilled = `bg-muted`. Level label + passed/total ratio visible via `mix-blend-difference` with `text-paper`. Entire bar is a `<Link>` to `/subjects/[id]/roadmap`. |
| `SubjectOverviewContent` | `apps/web/src/components/subject/subject-overview-content.tsx` | shipped | Client orchestrator. `useMemo` derives `currentTopic` (first `!is_passed` from `data.topics`, fallback `null`) and `percentComplete` from `data.topics`. Assembles header (<SubjectHeader/>) + tabs (<SegmentedTabs/>) + 3 sections (CurrentTopicCard, YourProgressCard, RoadmapPreview). Handles "topics.length === 0" edge case (`currentTopic = null`, `percentComplete = 0`). Adds `h-8 lg:hidden` bottom spacer for mobile nav clearance. |

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

#### Subject detail: Overview tab

- **Route:** `/subjects/[id]` (in `(app)` route group)
- **Files:** `apps/web/src/app/(app)/subjects/[id]/{page,loading,not-found}.tsx`, `apps/web/src/components/subject/{subject-header,segmented-tabs,share-button,current-topic-card,your-progress-card,roadmap-preview,subject-overview-content}.tsx`
- **Status:** shipped
- **Design notes:** almanac-strong per §3.4.3. Header strip = back chevron 44×44 (`href="/"`, `IconChevronLeft` 20px) + subject eyebrow (mono uppercase 10px ink-muted, derived from `name.toUpperCase()`) + Lora h1 (28→32→36px) + share button 44×44 (`IconShare3`, sonner toast stub). Tab bar = `<SegmentedTabs>` pill-style: Overview (active, oxblood fill + paper text + mono uppercase 11px), Roadmap/Leaderboard (transparent, link to non-existent routes that 404 this pass). Current Topic card = table-styled per §3.2.2: ink header bar with subject name Lora 16→18px + "5 min read" pill (4px radius, `bg-accent` + `text-accent-foreground`); body with mono level/topic caption, Lora h3 24→28→30px, 2-line generated summary in body 15px, 2 buttons (`buttonVariants` + `<Link>` — primary oxblood "Start 5 min read" → `/topics/[id]`, secondary outline "Further study" → `/topics/[id]#resources`). Your Progress card = flat: mono level/tier caption, Lora italic tier name (Beginner/Intermediate/Advanced/Master), Lora display 36→40→44px percentage (static — count-up reserved for quiz result per §2.6), 4px progress bar (`role="progressbar"`), "Topic N of M" caption, 3-up stat row (Points real, Streak `--`, Time `--`). Roadmap preview = mono caption + "View roadmap →" mono 11px oxblood link + 3-segment bar (`mix-blend-difference` text on ink/surface backgrounds), entire bar wrapped in `<Link>`.
- **Data fetching:** `getSubjectDetail(id)` added to `lib/learning/service.server.ts` (matches existing `getProfile`/`getEnrolledSubjects`/`getExploreSubjects` pattern — `cache`'d server fetcher). `page.tsx` is RSC async, catches 404 → `notFound()` (renders custom `not-found.tsx` with "Subject not found." + "Back to home" outline button), 401 → `redirect("/signin")` (already handled by the auth gate at `(app)/layout.tsx` but re-guarded for expired tokens), other errors → throw to `error.tsx`. Loading streamed via `loading.tsx` (skeleton mirrors the page geometry exactly — header skeleton, pill skeletons, table-styled card skeleton, flat card skeleton, 3-segment bar skeleton — no layout shift on data arrival).
- **No new tokens.** All visuals use existing semantic tokens: `bg-ink`/`text-paper` (header bar), `bg-card` (card body), `bg-primary`/`text-primary-foreground` (active tab, primary CTA), `bg-accent`/`text-accent-foreground` (share button hover, 5-min-read pill, inactive tab hover), `bg-muted` (progress track, segment unfilled), `bg-foreground` (progress fill, segment filled), `border-ink` (1px rules, 0 opacity), `text-muted-foreground` (mono labels), `text-foreground` (body text), `font-display` (Lora titles), `font-mono` (mono data).
- **V2 backend follow-ups (documented):**
  1. Add `streak` (days) + `time_spent_minutes` to `SubjectDetail` or expose global `/api/learning/metrics` → Your Progress stat row renders real values (currently `--`).
  2. Add `read_time_minutes` to topic model → Current Topic card renders real read time (currently hardcoded "5 MIN READ" per spec mockup).
  3. Build `/subjects/[id]/roadmap` and `/subjects/[id]/leaderboard` route files (tab navigation).
  4. Add `summary` to `SubjectDetail.topics[]` or fetch `TopicDetail` for the current topic → Current Topic card body renders real AI-generated summary (currently uses generated copy).
  5. Wire up share button to real share intent (Web Share API with clipboard fallback) → replaces sonner toast stub.
- **Deviations from spec:**
  - `5 MIN READ` hardcoded per mockup (backend `read_time_minutes` is v2 follow-up).
  - Streak + Time stat cells render `--` (backend global metrics endpoint is v2 follow-up).
  - Topic summary uses generated copy ("The next entry on your {name} roadmap. {n} of {total}.") because `SubjectDetail` response doesn't include per-topic summaries (`TopicDetail` does — it's a separate endpoint).
  - "Further study" links to `/topics/[id]#resources` (hash anchor on the topic page). The topic reading page doesn't ship until a later pass — will 404 until then.
  - Roadmap/Leaderboard tabs link to non-existent routes that 404 this pass (per user decision — accepted for scope).
  - `mix-blend-difference` on the Roadmap preview segment text to stay legible on both `bg-foreground` (ink) and `bg-muted` (surface) backgrounds. If the visual is wrong at any viewport, fall back to `data-[filled=false]:text-foreground`.
  - Back chevron → `/` (homepage) per user decision.
  - The header h1 is 28→32→36px (not the full h1 scale 28→36→44px) — the Subject Overview is a sub-page, not a hero; the smaller scale keeps the hierarchy in check vs the topic page's 48-56px topic title (§3.4.6).
- **Bottom nav:** "Subjects" item is active on `/subjects/[id]` (matches `startsWith("/subjects")` in `BottomNav`). The sidebar appears at `lg+` per the existing layout. The nav does NOT hide on subject pages (only hides on `/topics/*` for focused reading/quiz surfaces).

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
