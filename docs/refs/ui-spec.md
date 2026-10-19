# Wicky — UI Reference Spec

This document describes every screen in the Wicky mockup in detail. It's written to be
handed directly to a coding agent as a build reference.

> Note: the mockups shown are mobile frames (iOS status bar, ~375px width). The product
> itself must be fully responsive from mobile up to a **max content width of 1640px** on
> large screens — see the Responsiveness section for how each screen should reflow.

---

## 1. Global Design System

### 1.1 Visual language
- **Iconography:** simple line/duotone icons (home, book/subjects, quiz/pencil,
  metrics/bar-chart, profile/person) for bottom nav; small line icons for
  notifications, share, chevrons, toggles, lock, settings gear. Use iconsax icons, never lucide react icons.
- **Elevation:** cards float on the dark background with soft shadow / subtle border
  rather than heavy drop shadows — keep it flat/modern, not skeuomorphic.

### 1.3 Global chrome
- **Bottom navigation bar** (mobile): 5 icons — **Home, Subjects, Quiz, Metrics,
  Profile** — persistent across Homepage, Metrics, Leaderboard, and Profile (and,
  implicitly, wherever the user is inside those top-level sections). Active icon is
  filled/accented; inactive icons are muted outline versions. Must be beautiful and 
  easy to use.
- On larger breakpoints this bottom nav should convert to a **left sidebar or top nav
  bar** (see Responsiveness section) rather than staying as a bottom bar.
- **Header pattern** used on inner pages: back chevron (left) + page title (center or
  left-aligned next to chevron) + a contextual right-side action icon (share icon on
  Subject pages, settings gear on Profile, notification bell on Homepage, "Exit" text
  link on Quiz).
- **Tab pattern**: pill-style segmented tabs used both for in-page navigation (Subject
  page's Overview / Roadmap / Leaderboard) and for scope switching (Leaderboard's
  Global / Following / Friends). Active pill is filled with the accent color; inactive
  pills are plain text.

---

## Core UX Flow

1. Sign up
2. Select up to 5 subjects
3. Roadmap generated
4. First three topic contents generated in background
5. User starts first 5‑minute read
6. Takes quiz
7. Earns points
8. Unlocks next topic
9. Progresses through Levels 1 → 3
10. Completes subject
11. Receives subject recommendations

---

## 2. Screen-by-Screen Breakdown

### 2.1 Sign Up
- Centered vertical layout.
- App logo: a graduation-cap-in-open-book glyph inside a rounded diamond/rounded-square
  badge with a violet gradient.
- "Wicky" wordmark (bold, large) + tagline "Learn more. Every day." underneath.
- Primary button: **"Sign up with Email"** (filled violet).
- Secondary button: **"Sign up with Google"** (white/light pill with Google logo).
- "or" divider between the two buttons (thin rule + centered text).
- Footer row: "Already have an account? **Sign in**" (Sign in as a violet link),
  centered at the bottom.

### 2.2 Sign In
- Header: **"Welcome back! 👋"** + subtitle "Sign in to continue learning".
- Form fields: **Email** (placeholder `you@example.com`), **Password** (masked, with a
  show/hide "eye" icon on the right and a **"Forgot?"** link aligned to the label row).
- Primary button: **"Sign In"** (filled violet).
- Divider: "or continue with".
- Row of 3 circular social-login icon buttons: **Google, Apple, Facebook**.
- Footer: "Don't have an account? **Sign up**" link.

### 2.3 Account Recovery
- Back chevron (top-left) to return to Sign In.
- Header: **"Recover your account"** + subtitle explaining an email link will be sent
  to reset the password.
- Single **Email** field.
- Primary button: **"Send Recovery Link"**.
- Decorative illustration: an envelope with a paper-airplane / arrow motif (conveys
  "email sent / on its way").
- Footer link: **"Back to sign in"**.

### 2.4 Homepage
- Header: **"Good morning, Alex!"** (dynamic greeting by time of day + display name)
  + subtitle **"Keep learning. Keep growing."** + a notification bell icon (top-right,
  with unread-dot support).
- **"Currently Learning"** section, with a **"View all"** link on the same row.
  - A vertical list of subject cards, each containing:
    - Subject title (e.g. "US History") + one-line description of the current topic
      (e.g. "The American Revolution").
    - Points earned for that subject (e.g. "1,250 pts") shown top-right of the card.
    - Meta line: level + current topic index (e.g. "Level 2 • Topic 8/23").
    - A horizontal progress bar with percentage label (e.g. "60%").
  - Shown subjects in mock: **US History (60%)**, **World War II (40%)**,
    **Ancient Rome (60%)**.
- **"Explore Other Subjects"** section with a **"See all"** link.
  - Horizontally scrollable row of subject discovery cards (image thumbnail + title),
    e.g. "The Cold War", "The Industrial Revolution", etc.
  - A dedicated **"+ Add Subject"** card/button showing remaining slot count
    (e.g. "0/5 slots used") — implies a cap on concurrently active subjects tied to
    the user's plan/level.
- Bottom nav bar: Home (active), Subjects, Quiz, Metrics, Profile.

Each Currently Learning card contains:
- Subject thumbnail
- Subject title
- Current topic
- Subject points
- Current level
- Topic position (e.g. Topic 8/23)
- Progress bar
- Percentage complete

### 2.5 Subject Page — Overview tab
- Header: back chevron, subject title ("US History"), share icon (top-right).
- Tab bar directly under header: **Overview** (active) / **Roadmap** / **Leaderboard**.
- **"Current Topic"** card:
  - Small "X min read" badge (top-right of the card, e.g. "5 min read").
  - Topic title, large (e.g. **"The American Revolution"**).
  - Short descriptive paragraph summarizing the topic.
  - Primary button: **"Start 5 Min Read"** (filled violet, with a small icon).
  - Secondary button underneath: **"Further Study"** (outlined).
- **"Your Progress"** card:
  - Level label + tier name (e.g. "Level 2 · Intermediate") and a large percentage
    (e.g. "66%").
  - Progress bar + "Topic 8 of 23" caption.
  - Three stat chips in a row: **Points** (1,250), **Day Streak** (8), **Time Spent**
    (12h) — each with a small icon.
- **"Roadmap"** preview strip at the bottom: "23 Topics • 3 Levels" caption plus a
  3-segment progress bar labeled Level 1 / Level 2 / Level 3, giving an at-a-glance
  preview that deep-links into the full Roadmap tab.

### Visual hierarchy:

Current Topic

↓

Start 5‑Minute Read

↓

Further Study

↓

Progress

↓

Roadmap Preview

Tabs:
- Overview
- Roadmap
- Leaderboard

### 2.6 Subject Page — Roadmap tab
- Same header/tab pattern as Overview, with **Roadmap** active.
- Section header: **"Level 2 – Intermediate"** + "8/23 topics completed" caption.
- A vertical numbered timeline/checklist of topics (10 shown, scrollable for the rest):
  1. Causes of Revolution — completed (green check)
  2. First Continental Congress — completed
  3. Declaration of Independence — completed
  4. The Revolutionary War Begins — completed
  5. Valley Forge Winter — completed
  6. Turning Point Battles — completed
  7. Treaty of Paris — completed
  8. Legacy of the Revolution — **current/in-progress** (highlighted node, accent
     color, distinct from completed and locked states)
  9. The Constitution — **locked** (lock icon, muted)
  10. Bill of Rights — **locked**
- Each row: numbered/status node on a connecting vertical line (a true "roadmap" visual
  — line runs through all nodes top to bottom), topic title, and a trailing status
  icon (check / active dot / lock).

### 2.7 Subject Page — Leaderboard/Community tab
- Same header/tab pattern, with **Leaderboard** active (labeled "Community" in the
  frame caption but the visible tab is "Leaderboard").
- Section header: **"Learners on this topic"** + subtitle "Top learners studying The
  American Revolution".
- Ranked list, each row: rank number, avatar, name, level caption, points (right-
  aligned, bold).
  - Top 3 ranks get a colored badge (gold/silver/bronze) instead of a plain number.
  - The current user's row is visually distinguished (different background tint,
    labeled rank "S" for the user's own standing relative to the visible top list)
    and shown even if outside the visible top ranks.
- Primary button at the bottom: **"See All Learners"**.

### 2.8 Quiz Page
- Header: back chevron, **"Quiz"** title, **"Exit"** text link (top-right).
- Thin progress bar under the header + caption **"Question 2 of 5"**.
- Question text block (e.g. "What was one major cause of the American Revolution?").
- Four answer options, each a full-width selectable card labeled A/B/C/D:
  - A. The Louisiana Purchase
  - B. Taxation without representation — shown **selected/correct** (green
    highlight + check)
  - C. The War of 1812
  - D. The Gold Rush
- Primary button: **"Next Question"**.
- Answer cards need three visual states: default, selected-pending, and
  correct/incorrect feedback (green for correct, presumably red for incorrect,
  once answered).

### 2.9 Quiz Result
- Header: back chevron, **"Quiz Result"** title.
- Large celebratory trophy icon inside a circular badge, with a confetti/particle
  burst graphic behind it.
- **"Great job!"** headline.
- "You scored" caption + large score readout **"4 / 5"**.
- Points-earned pill: **"+80 pts"** (success-green).
- Secondary button: **"Review Answers"** (outlined).
- Primary button: **"Continue"** (filled violet).

### 2.10 Metrics Page
- Header: **"Your Metrics"** + subtitle "Insights into your learning journey".
- 2×2 grid of stat cards, each icon + big number + label:
  - Total Learning Time — 48h 32m
  - Topics Covered — 37
  - Subjects Covered — 6
  - Points Earned — 12,480
- **"Favorite Topic"** card: thumbnail image (World War II), topic name, and
  "24% of your learning" caption.
- **"Best Learning Time"** card: clock icon, "Weekdays • 7PM–9PM", caption "You're most
  active and consistent."
- **"Learner Persona"** card: an illustrated avatar/character, persona title
  (e.g. **"The Strategist"**), and description "You plan, stay consistent, and love
  depth." (This implies a persona-classification system driven by learning behavior
  analytics.)
- Bottom nav bar: Metrics active.

### 2.11 Leaderboard Page
- Header: **"Leaderboard"** title.
- Scope tabs: **Global** (active) / **Following** / **Friends**.
- Podium display for top 3: #1 centered and largest (gold), #2 to the left (silver),
  #3 to the right (bronze) — each with avatar, name, and points.
- Ranked list for positions 4+: rank number, avatar, name, points.
  - The current user's row ("You") is highlighted distinctly wherever it falls in
    the list (shown at rank 6 in the mock).
- Footer caption: **"Leaderboards reset in 6d 12h 30m"** — a live countdown, implying
  a periodic (likely weekly) leaderboard reset.
- Bottom nav bar: Metrics/Leaderboard area active (Leaderboard is reached via the
  Metrics icon area or a dedicated entry point — confirm navigation source with
  the user, see Open Questions).

### 2.12 Profile / Settings Page
- Header: **"Profile"** title + settings gear icon (top-right).
- Large circular avatar, name ("Alex Johnson"), email, edit affordance implied by
  the gear icon.
- Stat row: **Points** (12,480), **Subjects** (6), **Topics** (37).
- **"Visibility"** section with two toggle switches:
  - "Show me on Leaderboard" — on
  - "Show my progress to others" — on
- Menu list (chevron-right rows): **Account Settings**, **Notification Settings**,
  **Learning Preferences**, **Help & Support**.
- **"Log Out"** — styled distinctly in red/destructive color, no chevron.
- Bottom nav bar: Profile active.

---

## 3. Cross-cutting Features Implied by the Flows

- **Auth**: email/password + Google/Apple/Facebook OAuth, password recovery via
  emailed link.
- **Subjects**: a user actively studies a bounded number of subjects at once (slot
  system, "0/5 slots used"), can browse/add more from a discovery list, and each
  subject has its own Overview / Roadmap / Leaderboard sub-navigation.
- **Roadmap/progression**: subjects are broken into numbered topics grouped into
  levels (Beginner/Intermediate/Advanced-style tiers), with linear unlock progression
  (complete → current → locked).
- **Quizzes**: multiple-choice, timed/paced by question count, immediate right/wrong
  feedback, points awarded per quiz, review-answers capability after completion.
- **Gamification**: points, day streaks, levels, per-subject and per-topic
  leaderboards, a global/following/friends leaderboard with a periodic reset timer,
  rank badges (gold/silver/bronze), and a computed "Learner Persona".
- **Metrics/analytics**: aggregate stats (time, topics, subjects, points), favorite
  topic detection, best-learning-time detection, persona classification.
- **Privacy controls**: independent toggles for leaderboard visibility and progress
  visibility.
- **Notifications**: bell icon on Homepage (badge/unread state to be defined).


