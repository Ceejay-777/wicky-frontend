# Homepage + App Shell Implementation Plan

> **Execution:** Inline, single review at the end. Plan is locked.

**Goal:** Build the post-auth app shell (route group, layout, bottom nav) and the homepage screen with greeting, Currently Learning list, and Explore Other Subjects strip.

**Architecture:** Server `app/(app)/layout.tsx` does the cookie-based auth gate and renders the persistent `BottomNav`. The homepage is a server `page.tsx` that hands off to a client `HomepageContent` which fetches profile + enrolled subjects + explore subjects in parallel and renders the three sections.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, shadcn/ui v4 (base-nova, iconLibrary: tabler), @tabler/icons-react, raw apiClient (no TanStack Query), react-hook-form + zod for forms (not used this pass), sonner for toasts.

---

## Global Constraints (apply to every task)

- Semantic tokens only: `bg-primary`, `text-muted-foreground`, `border-border`, `bg-accent`, `bg-card`. No `bg-[#hex]`.
- Mono for all numbers (JetBrains Mono via `font-mono`). Display serif (Lora via `font-display`) for content titles. Source Sans 3 (default) for body.
- Oxblood is structural (current state, dividers, "you" indicators, year color). Never celebration.
- Forest for verified/passed/table headers.
- Radius 0 for all surfaces. Cards/tables/rows are square. Pills/buttons 4px max.
- No drop shadows.
- Italic for emphasis (Source Sans 3 italic), not bold.
- No gradient text, no emoji as visual elements, no confetti, no side-stripe borders (except the roadmap current row).
- Mobile-first, start at 375px. `px-4 sm:px-6 lg:px-8`.
- Touch targets ≥ 44px.
- Reduced motion: all durations collapse to 0ms.
- No `space-x-*` or `space-y-*`; use `flex` with `gap-*`.
- Use `size-*` for equal w/h.
- No manual `dark:` overrides (semantic tokens handle it).
- Use `cn()` for conditional classes.
- Items always inside their Group.
- Full Card composition.
- No `useEffect` for auth state — cookies are server-side.

## Existing Patterns (reused, not re-derived)

- **Service layer** mirrors `apps/web/src/lib/auth/service.ts`: `apiClient.get/post/...` with `ApiRequestError` re-exported.
- **TypeScript path alias:** `@/*` → `apps/web/src/*`.
- **Component naming:** PascalCase, default export (except shadcn primitives).
- **shadcn UI primitives:** named exports, leave as generated (verify no `dark:` overrides).
- **Auth gate pattern:** `if (!cookies().get("access_token")) redirect("/signin");` at the top of server pages/layouts.

---

## File Structure (new files only)

```
apps/web/src/
├── app/
│   ├── (app)/
│   │   ├── layout.tsx                 [1.12]
│   │   └── page.tsx                   [1.1]
│   └── page.tsx                       [DELETED 1.1]
├── components/
│   ├── homepage/
│   │   ├── homepage-content.tsx       [1.13]
│   │   ├── greeting.tsx               [1.5]
│   │   ├── notification-bell.tsx      [1.6]
│   │   ├── currently-learning-list.tsx [1.7]
│   │   ├── subject-discovery-card.tsx [1.8]
│   │   ├── add-subject-card.tsx       [1.9]
│   │   └── explore-subjects-strip.tsx [1.10]
│   ├── nav/
│   │   ├── bottom-nav.tsx             [1.11]
│   │   └── nav-item.tsx               [1.11]
│   └── ui/
│       ├── skeleton.tsx               [1.2 — shadcn add]
│       └── empty.tsx                  [1.2 — shadcn add]
└── lib/
    ├── format/
    │   └── number.ts                  [1.3]
    └── learning/
        ├── service.ts                 [1.4]
        ├── constants.ts               [1.3]
        └── time.ts                    [1.3]
```

---

## Task 1.1 — Move homepage into (app) route group

- Delete `apps/web/src/app/page.tsx`
- Create `apps/web/src/app/(app)/page.tsx` (server, thin wrapper rendering `<HomepageContent />`)
- Commit: `refactor(homepage): move page into (app) route group`

## Task 1.2 — Add shadcn Skeleton and Empty

- `pnpm dlx shadcn@latest add skeleton empty`
- Verify: no `dark:` overrides, uses `@/lib/utils` for `cn`
- Commit: `chore(ui): add shadcn skeleton and empty primitives`

## Task 1.3 — Format + constants utilities

- Create `apps/web/src/lib/format/number.ts` with `formatPoints`, `formatPercent`, `formatStreak`, `formatDuration`
- Create `apps/web/src/lib/learning/constants.ts` with `MAX_SUBJECT_SLOTS = 5`
- Create `apps/web/src/lib/learning/time.ts` with `timeOfDay(date?)` returning "morning" | "afternoon" | "evening"
- Commit: `feat(learning): add format helpers and subject slot constant`

## Task 1.4 — Learning service layer

- Create `apps/web/src/lib/learning/service.ts`:
  - `getProfile(): Promise<UserProfile>` — unwraps `ApiSuccess<UserProfile>`
  - `getEnrolledSubjects(): Promise<EnrolledSubject[]>` — raw array
  - `getExploreSubjects(): Promise<Subject[]>` — raw array
  - Re-export `ApiRequestError` from `@/lib/api`
- Commit: `feat(learning): add service layer for profile, subjects, explore`

## Task 1.5 — Greeting component

- Create `apps/web/src/components/homepage/greeting.tsx` (client)
- Lora display h1, italic on the time-of-day word
- SSR renders "Good day" placeholder (avoids hydration skew from server/client clock)
- On mount, swap to live time-of-day
- Loading state shows "Welcome back." instead
- Commit: `feat(homepage): add Greeting component with time-of-day italic`

## Task 1.6 — NotificationBell

- Create `apps/web/src/components/homepage/notification-bell.tsx`
- 44×44 link with `IconBell`, 1px ink border, oxblood dot in top-right when `unread`
- Commit: `feat(homepage): add NotificationBell with unread dot`

## Task 1.7 — CurrentlyLearningList + SubjectRow

- Create `apps/web/src/components/homepage/currently-learning-list.tsx`
- Hairline-ruled list (full-opacity `border-ink`)
- Subject name in Lora 18px, mono data summary (L{level} · {passed} of {total})
- Hover: `bg-accent` (oxblood-soft)
- Empty state uses shadcn `Empty` with "Nothing here yet." copy
- Loading: 3 skeleton rows
- Error: in-section alert with Retry button
- Commit: `feat(homepage): add CurrentlyLearningList with rows and empty state`

## Task 1.8 — SubjectDiscoveryCard

- Create `apps/web/src/components/homepage/subject-discovery-card.tsx`
- 200px wide, square, surface bg, 1px ink border
- Subject name in Lora 18px, learner count in mono 11px ink-muted
- Hover: `bg-accent`
- Commit: `feat(homepage): add SubjectDiscoveryCard for explore strip`

## Task 1.9 — AddSubjectCard

- Create `apps/web/src/components/homepage/add-subject-card.tsx`
- 200px wide, **dashed** ink border, paper bg
- Tabler `IconPlus` (not emoji), "Add Subject" in Lora, "{used}/{total} slots used" in mono 11px ink-muted
- Disabled at 5/5: 50% opacity, no pointer events
- Commit: `feat(homepage): add AddSubjectCard with dashed border and slot count`

## Task 1.10 — ExploreSubjectsStrip

- Create `apps/web/src/components/homepage/explore-subjects-strip.tsx` (client)
- Horizontal scroll of discovery cards + AddSubjectCard (always last)
- 16px gap (`gap-4`), hidden scrollbar
- Mobile: finger scroll. Desktop (`lg+`): chevron scroll buttons appear
- Loading: 4 skeleton boxes. Error: in-section alert with Retry
- Commit: `feat(homepage): add ExploreSubjectsStrip with horizontal scroll`

## Task 1.11 — BottomNav + NavItem

- Create `apps/web/src/components/nav/nav-item.tsx`
  - Single nav item: line vs filled Tabler icon, 4×4 oxblood dot when active, mono uppercase label
  - Variants: `mobile` (column) and `desktop` (row)
- Create `apps/web/src/components/nav/bottom-nav.tsx` (client)
  - 5 items: Home (`/`), Subjects (`/subjects`), Quiz (`/quiz`), Metrics (`/metrics`), Profile (`/profile`)
  - `usePathname` for active state
  - Mobile: `fixed inset-x-0 bottom-0 h-14 z-50 border-t border-ink bg-background` + safe-area-inset
  - Desktop (`lg:`): `fixed left-0 inset-y-0 w-60 z-50 border-r border-ink bg-background`
  - "Wicky" wordmark in desktop sidebar
  - Hides on `/topics/*` (focused reading/quiz surfaces)
- Commit: `feat(nav): add BottomNav with mobile bar and desktop sidebar`

## Task 1.12 — (app) layout with auth gate

- Create `apps/web/src/app/(app)/layout.tsx` (server)
- `if (!cookies().get("access_token")) redirect("/signin")`
- Main with `pb-16 lg:pb-0 lg:pl-60` to clear the nav
- Render `<BottomNav />` after `<main>`
- Commit: `feat(app): add (app) route group with auth gate and bottom nav`

## Task 1.13 — HomepageContent orchestrator

- Create `apps/web/src/components/homepage/homepage-content.tsx` (client)
- `Promise.allSettled` over `getProfile`, `getEnrolledSubjects`, `getExploreSubjects`
- 401 → `router.push("/signin")`
- Per-section skeleton + error + retry
- Header strip: mono "AN ALMANAC OF LEARNING" in oxblood (left) + bell (right) + hairline (signature detail)
- Mobile-only `h-8` spacer at the bottom to clear the nav
- Commit: `feat(homepage): add HomepageContent orchestrator with parallel fetches`

## Task 1.14 — Visual QA

- Screenshot at 375/640/768/1024/1280 in light + dark
- Side-by-side with `/showcase`
- Litmus test from `design_system.md` §1.2: square surfaces, no shadows, mono numbers, Lora titles, mono labels
- Fix any drift inline
- Commit (if fixes): `style(homepage): fix almanac drift from visual QA`

## Task 1.15 — Update design_progress.md

- Add 14 new entries to §1.1 component inventory (Greeting, NotificationBell, CurrentlyLearningList, SubjectDiscoveryCard, AddSubjectCard, ExploreSubjectsStrip, HomepageContent, NavItem, BottomNav, format/number helpers, learning service, MAX_SUBJECT_SLOTS, timeOfDay, Skeleton, Empty)
- Add "Homepage + App Shell" section to §1.2 screen-by-screen log
- Mark Plan 1 done in §2
- Commit: `docs(progress): log Homepage + App Shell pass 3.2`

---

## Deviations from spec (intentional, will be logged in design_progress.md)

1. **No "View all" / "See all" links** on the section headers — the almanac version is more restrained.
2. **Lora italic subline is empty** in each Currently Learning row until the backend adds `current_topic` to `EnrolledSubject`. v1 carries the data in mono on the right of the points line: `1,250 pts · L2 · 8 of 23`. When the backend ships `current_topic`, the subline slot lights up with the actual title and the mono summary drops the `· L2 · N of M` portion.
3. **No card chrome on Currently Learning** — flat hairline-ruled list per §3.4.2.

## Backend follow-up (logged, not implemented this pass)

- `GET /api/learning/subjects` should add `current_topic: string | null` to each `EnrolledSubject`. Logic: first topic with `is_passed: false` ordered by `order`, else `null`.
- Mirror in `packages/types/src/subject.ts`.

## Final verification

- `pnpm turbo typecheck` — 0 errors
- `pnpm turbo build` — all 6 workspaces green
- `/` renders the homepage, bottom nav present, redirect on no auth
- Visual QA at 5 sizes in both themes
