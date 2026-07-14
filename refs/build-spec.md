# Wicky — Project Context & Locked Architecture Decisions

This document is agent-facing context: what Wicky *is*, and the platform/tooling    
decisions that are locked in. Pair this with `ui-spec.md` (screen-by-screen
UI reference) when handing this project to a build agent.

---

## 1. What Wicky Is (High Level)

Wicky is a **gamified, AI-powered learning platform**. A user picks subjects
(e.g. "US History", "World War II"), works through structured content organized as
a **roadmap of topics grouped into levels**, and reinforces learning via **quizzes**.
Progress is tracked and turned into game mechanics — points, day streaks, levels,
per-topic and global leaderboards, and a computed "Learner Persona" — to keep
engagement high.

**Core loop:** pick/resume a subject → read a short topic ("5 min read") → take a
quiz on it → earn points and unlock the next topic → see how you rank against other
learners → come back tomorrow to keep the streak alive.

**Primary surfaces:**
- **Auth**: sign up / sign in / password recovery, with email+password and
  Google/Apple/Facebook social login.
- **Homepage**: personalized dashboard — subjects in progress, discovery of new
  subjects (capped "slots"), quick access to everything else.
- **Subject detail**: three tabs per subject — Overview (current topic + progress
  stats), Roadmap (the full topic checklist with locked/current/completed states),
  Leaderboard (top learners on that specific subject/topic).
- **Quiz engine**: multiple-choice questions, immediate feedback, scoring, a
  celebratory results screen.
- **Metrics**: personal analytics — time spent, topics/subjects covered, favorite
  topic, best learning-time window, computed persona.
- **Global Leaderboard**: global/following/friends scopes, ranked list with a
  periodic (likely weekly) reset.
- **Profile/Settings**: identity, visibility privacy toggles, account/notification/
  learning-preference settings, log out.

**Backend Context:** every screen in the UI spec maps to a real data
model (Subject, Topic, Level, QuizQuestion, QuizAttempt, LeaderboardEntry, UserStreak,
LearnerPersona, etc.) and every "gamification" element (points, streaks, ranks,
persona) implies a computed/derived field or background job, not just static UI —
treat stats and rankings as things that need a real calculation pipeline, not
placeholder numbers. Reference the `api-reference.md` for the full API spec.

---

## 2. Locked Decisions

### 2.1 Build order
1. **Next.js web app first**, built to completion (all screens in the UI spec).
2. **PWA support added incrementally** — not a separate phase, just additive work
   (manifest, service worker, icons, offline/caching strategy) layered onto the
   Next.js app whenever convenient. It doesn't block or depend on the mobile app.
3. **React Native (via Expo) mobile app after web is complete**, built against the
   already-proven shared logic layer (see below) rather than as a from-scratch
   rewrite.

### 2.2 Repo structure: monorepo from day one
Even though React Native doesn't exist yet, the repo is structured as a monorepo
**from the very first commit**, so nothing has to be extracted/rewritten later:

```
wicky/
├── apps/
│   ├── web/              # Next.js app — built now
│   └── mobile/           # Expo/React Native app — built later, empty for now
├── packages/
│   ├── api-client/        # typed API calls to the Django/DRF backend
│   ├── types/             # shared TS types (Subject, Topic, Quiz, LeaderboardEntry...)
│   ├── logic/              # pure business logic: scoring, roadmap unlock rules,
│   │                       # streaks, persona classification, progress math
│   ├── hooks/              # framework-light hooks (useAuth, useSubjectProgress,
│   │                       # useQuizSession) — React, but no DOM/RN-specific code
│   └── config/             # shared tsconfig/eslint, and the Tailwind design tokens
│                           # (colors, spacing) that both web and mobile consume
├── turbo.json
└── package.json
```

**Tooling: Turborepo** (not Nx) — lower config overhead for a solo dev, integrates
cleanly with Next.js and Vercel.

**Hard rule for the agent:** no business logic, scoring, unlock rules, streak math,
or persona classification gets written inline inside a Next.js page/component. It
goes in `packages/logic` (or `packages/hooks` if it needs React state), and pages
just import and render it. This is the one discipline that makes "finish web first,
then build mobile" cheap instead of a rewrite.

### 2.3 Mobile: Expo (not bare React Native)
Reasons: faster setup, EAS Build handles signing/provisioning in the cloud, EAS
Update gives OTA JS updates without app-store review round-trips for every fix,
and Expo's dev-client/config-plugins now support custom native modules when needed
— so there's no meaningful native-access downside for this project.

### 2.4 Cross-platform styling: NativeWind
Tailwind-syntax styling for React Native. Chosen because Ceejay already thinks in
Tailwind for the web app, so there's near-zero new mental model. Critically, the
**design tokens from the UI spec** (`--bg`, `--surface`, `--accent`, `--success`,
`--border`, etc., and both light/dark variants) live in `packages/config` as a
shared Tailwind theme, consumed by both `apps/web` and `apps/mobile`. This does
**not** give shared components — `SubjectCard` etc. still get built once for web
(div/JSX) and once for native (View/JSX) — but they'll be pixel/token-consistent
because both pull from the same theme source of truth.

### 2.5 Cross-platform navigation: Solito (deferred)
Solito shares routing/navigation logic between Next.js and Expo Router (e.g. "go to
subject page with id X" resolves consistently on both platforms, deep-linking stays
aligned). **Not installed yet** — it only becomes relevant once `apps/mobile` exists
— but it's the intended choice when that phase starts, so route/param conventions
in the Next.js app should be kept Solito-compatible (avoid Next.js-only routing
patterns that have no Expo Router equivalent) even before mobile work begins.

### 2.6 Explicitly deferred / not chosen
- **Tamagui**: considered and rejected for now — its main advantage (fully shared
  components across web/native) matters most when building both platforms in tight
  parallel, which isn't the plan here. Revisit only if the NativeWind + separate-
  component approach becomes painful during the mobile build.

---

## 3. Summary Table

| Decision | Choice |
|---|---|
| Build order | Next.js (full) → PWA layer (incremental) → Expo/RN mobile |
| Repo structure | Turborepo monorepo, `apps/` + `packages/` split, from commit #1 |
| Business logic location | `packages/logic` / `packages/hooks` — never inline in pages |
| Mobile framework | Expo (managed workflow, EAS Build + EAS Update) |
| Cross-platform styling | NativeWind, theme sourced from `packages/config` |
| Cross-platform navigation | Solito, deferred until `apps/mobile` starts |
| Shared component library | None (Tamagui rejected) — components built per-platform |