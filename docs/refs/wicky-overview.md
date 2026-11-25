# Wicky — Product Overview

A factual overview for someone who has never seen the product.

Companion docs: `ui-spec.md` and `DESIGN_SPEC.md` (current visual language), `designs.md`, `api-reference.md`
(backend contract), `../realtime-events.md` (live updates).

---

## 1. Core Concept & Problem

Wicky is an **AI-powered learning platform** that delivers structured, bite-sized lessons on subjects the user
chooses. A user picks a subject (e.g. "US History"), works through a roadmap of topics grouped into three levels,
reads a short (~5 minute) AI-written summary, takes a multiple-choice quiz, and earns points that feed a
leaderboard.

### Who it's for

Learners who no longer have time for open-ended research (Wikipedia rabbit holes, long textbooks) but still want
structured knowledge in specific areas. The format is mobile-first: the learner is "on the go, on a break,
sitting in a waiting room." Desktop is supported with a sidebar layout.

### Why this approach

- **vs. Wikipedia**: Wikipedia is unbounded and self-directed. Wicky gives a leveled roadmap with an endpoint
  (finish the topics, you're done with the subject) and quizzes that check retention.
- **vs. generic learning apps**: Wicky is not a content library or LMS. All content (roadmap, topic summaries,
  quiz questions, resource links) is **AI-generated on demand**. No pre-authored curriculum, no content team.
- **vs. Duolingo-style apps**: no mascots, confetti or streak anxiety as the main mechanic. Points are "receipts"
  of learning, not prizes. The visual language is deliberately restrained (the "Almanac" direction, section 6).

---

## 2. Features

The frontend is a Next.js app (`apps/web`) on a Django REST backend.

| Area | What exists |
|---|---|
| Auth | Email + password sign up, sign in, sign out, password recovery (email link → reset page). Session lives in HTTP-only cookies; the access token lasts 15 min and is refreshed silently |
| Home | Greeting, currently-learning subjects, explore strip |
| Subjects | Enrolled-subjects list, create a subject by typing a name, subject detail with three tabs (Overview / Roadmap / Leaderboard), add / remove a subject |
| Roadmap | AI-generated, asynchronous (see 3.2); status notice while it generates, retry on failure |
| Topic reading page | Summary, resource links, preparing / failed / locked states |
| Quiz | Generate (async), answer, submit, result page with score and points, answer review page, resumable across tabs and devices |
| Level-up / completion | A "moment" screen shown once after a level-up or a completed subject |
| Live updates | Server-sent events tell pages when a roadmap, topic or quiz becomes ready (section 3.2) |
| Global leaderboard | Backend endpoint (top 50) and a route that hides the nav; per-subject and per-topic leaderboards (top 20) |
| Others learning | Up to 10 other learners on the same topic (backend; opt-out preference) |
| Preferences | `leaderboard_visible` (default on), `others_learning_visible` (default on), `auto_select_subjects_enabled` (default off) |
| Profile | Display name, avatar URL, bio |
| Notifications | Per-subject reminder frequency (1–24 h), email via Brevo |

### Known limitations

- Reviewer false-rejects good content now and then, which triggers regeneration (costs time).
- AI-generated resource links are sometimes dead or mislabeled.

---

## 3. The Core Loop

> pick or create a subject → read a short topic → take a quiz → earn points and unlock the next topic → move up
> a level → finish the subject → pick a new one.

1. **Sign up** (email + password).
2. **Pick or create a subject.** Choose from the explore list, or type any name. Typing a name resolves to an
   existing subject if one matches, otherwise AI creates it. **Hard cap: 5 active subjects**; the cap is checked
   before any AI work starts.
3. **Roadmap is generated** in the background. The user is enrolled immediately and sees a "generating" state;
   the page updates itself when done.
4. **Topic content generates progressively.** Opening a topic starts generation for it and the next two, so the
   learner rarely waits after the first one.
5. **Read the topic** (~5 minutes, with resource links).
6. **Take the quiz** (multiple choice, 4 options per question).
7. **Earn points** only if passed (≥ 60% correct).
8. **Next topic unlocks**; topics are linear within a level.
9. **Level up** after passing enough topics (below). Levels 1 → 2 → 3.
10. **Subject completes** after all three levels; the user is offered suggestions for the next one.

### 3.1 Numbers

| Parameter | Value |
|---|---|
| Max active subjects | 5 |
| Levels per subject | 3 (Beginner / Intermediate / Advanced) |
| Read time per topic | ~5 min |
| Normal quiz | 4–6 questions (AI decides), 90–110 points |
| Advanced quiz | 9–12 questions (AI decides), 180–220 points |
| Pass threshold | ≥ 60% of questions correct |
| Points awarded | `total_points × correct ratio` if passed, else 0 |
| Retake cooldown | 1 hour, per user + topic + quiz type, counted from the last **submitted** attempt |
| Level-up threshold | 80% of the level's topics passed (total − 1 for small levels) |
| Reminder frequency | 1–24 h per subject |
| Global leaderboard | top 50 by total points, ties broken by user id |
| Subject / topic leaderboard | top 20 |
| "Others learning" | up to 10 |

### 3.2 Waiting on AI

Nothing the AI writes appears instantly, so **three screens have a waiting state**:

| Thing generating | Where the user sees it | States |
|---|---|---|
| Roadmap | Subject page | generating → ready, or failed (retry) |
| Topic content | Topic page ("Preparing") | not generated / generating → ready, or failed (try again) |
| Quiz | Quiz page ("Writing your quiz") | generating → ready, or failed (try again) |

Pages learn about completion over a live connection (server-sent events), then re-fetch. A 60-second safety net
re-fetches if no event arrives. Events carry no content; the database is the source of truth.

### 3.3 The quiz in detail

1. User opens a topic, reads, taps **Take the quiz**.
2. The quiz page asks the backend to start (or **resume**) a quiz. The call is safe to repeat on every page load:
   if the learner already has an unfinished quiz for that topic and type, they get that one back.
3. While it writes, the page shows the waiting state. When ready, questions appear. **Correct answers and
   explanations are never sent before submit.**
4. The learner answers. Picks are not saved server-side; the client restores them itself on resume.
5. Submit returns score, pass/fail, and a per-question breakdown (their pick, the right answer, explanation).
6. **Pass:** topic marked passed, points awarded, and the response says whether a level-up or subject completion
   happened (→ "moment" screen).
7. **Fail:** score is 0 points. Retry after the 1-hour cooldown; the learner can ask the next quiz to focus on
   the questions they previously missed.
8. A **review page** shows the answers of the latest submitted attempt, available later from any tab or device.
9. **Advanced quiz:** unlocked after the normal quiz is passed **and** the learner has opened the topic's
   resource links (an explicit "viewed" action). Worth double. Passing it marks the topic "advanced passed".

---

## 4. Content Depth Model

Each **Subject** has a roadmap of **Topics** in exactly 3 **Levels**. Level 2 needs Level 1 progress; level 3
needs level 2. Opening a topic in a locked level is refused ("This level is locked").

Per topic, the learner's progress is one of: **not started**, **passed** (normal quiz), **advanced passed**.

A topic's content has its own life cycle: **not generated → generating → ready**, or **failed** (retry button).
Content can also be **flagged** when the AI reviewer rejects it twice; flagged content is still shown.

After a pass, a progress check says one of: **none** (keep going), **level up** (next level unlocked), or
**subject completed**. Level-up and completion each get the one-time "moment" screen.

When a subject completes, suggestions are offered, prioritised: subjects the user marked as interested, then
popular subjects by enrollment. A preference can auto-enroll the user in suggestions (off by default).

---

## 5. Social Layer

- **Points** are the one currency: awarded only on a quiz pass, tracked per topic and globally.
- **Leaderboards:** global (top 50), per-subject, per-topic (top 20). Users can opt out; they are hidden but their
  points still count toward others' ranks. The current user is highlighted. The top 3 get a podium treatment in
  the design.
- **Others learning:** on a topic, up to 10 other learners are shown, preferring people at a similar level (±1)
  and people who finished the topic. Opt-out via a privacy preference. No messaging, no friending.
- **Privacy toggles:** leaderboard visibility, progress ("others learning") visibility, auto-select subjects.

What is competitive: leaderboards, ranks, podium. What is personal: points as evidence, progress bars, roadmap
position. The tone resists pressure: no streak anxiety.

---

## 6. Design Language ("Almanac")

The current UI is themed as a reference work, not a game. Details live in `DESIGN_SPEC.md` and `ui-spec.md`; the
essentials:

- Square-ish cards, no shadows, rule lines and double-rule dividers, drop cap on topic pages.
- Tomato / oxblood as the structural accent, forest for verified / passed states.
- Numbers (points, ranks) in a monospace "data voice".
- One celebration only: a count-up on the points earned. No confetti, mascot, cartoon badges or emoji. Copy is
  capped at "Well done." The user is treated as an adult.
- Light and dark themes (toggle in the desktop sidebar).
- Navigation: bottom tab bar on mobile / tablet (Home, Subjects, Quiz, Profile); fixed 264 px sidebar on
  desktop with a "view passport" profile card. Reading, quiz, result, review, moment and leaderboard screens are
  **immersive** and hide the nav.

---

## 7. Differentiators

1. **AI-generated curriculum on any subject**, including ones the user types in. Unbounded catalogue, no content
   team.
2. **Finite, leveled roadmaps** with a completion endpoint, instead of infinite feeds. Closure is part of the
   product.
3. **Two-tier quiz depth.** The advanced quiz requires engaging with the source links first and pays double.
4. **Restrained gamification.** Points are receipts, not prizes.
5. **Resumable, cross-device quizzes** with answer review.
6. **Distinct visual identity** (Almanac) among learning apps.

---

## 8. Target Audience

- On the go, short windows of time, wants structure, not a firehose.
- Treated as an adult "who can read a number and know what it means"; prefers factual presentation to cheering.
- Use cases: commute / break learning; interest-based exploration (browse explore list, mark interest);
  goal-oriented completion of a bounded subject; optional social comparison via leaderboards.

---

## 9. Concrete Specifics

### Example content

- **Subjects**: US History, World War II, Ancient Rome, The Cold War, The Industrial Revolution.
- **Topics in "US History"**: Causes of Revolution, First Continental Congress, Declaration of Independence, The
  Revolutionary War Begins, Valley Forge Winter, Turning Point Battles, Treaty of Paris, Legacy of the Revolution,
  The Constitution, Bill of Rights.

### Screens (routes in `apps/web/src/app`)

| Screen | Route | What it shows |
|---|---|---|
| Sign up | `/signup` | Wordmark + tagline, display name / email / password |
| Sign in | `/signin` | "Welcome back.", email / password, "Forgot?" link |
| Password recovery | `/recover`, `/reset-password` | Email field → reset link; reset page with new password |
| Home | `/` | Time-of-day greeting, "Currently Learning" rows with progress bars, horizontal "Explore" strip with an "Add Subject" card showing free slots |
| Subjects list | `/subjects` | Enrolled subjects and slot count |
| Subject overview | `/subjects/[id]` | Back chevron, name; tabs Overview / Roadmap / Leaderboard; "Current Topic" card ("Start 5 min read"), "Your Progress" card, roadmap preview |
| Subject roadmap | `/subjects/[id]/roadmap` | Vertical timeline of all topics across 3 levels: completed (check), current (highlighted), locked (lock) |
| Subject leaderboard | `/subjects/[id]/leaderboard` | Ranked learners, top 3 with colored badges, current user highlighted |
| Level-up / completion | `/subjects/[id]/moment` | One-time "Well done." screen with passed / total and free subject slots |
| Topic | `/topics/[id]` | Running head (subject + "5 min read"), chapter label, title, body with drop cap, resource links, "Take the quiz". Preparing / failed / locked variants |
| Quiz hub | `/quiz` | Entry point to quizzes (nav keeps visible) |
| Quiz | `/topics/[id]/quiz` | "Question 2 of 5", four options A–D, Next / Submit. "Writing your quiz" and "Not ready yet" variants |
| Quiz result | `/topics/[id]/quiz/result` | "Well done." or a retry message, big score ("4 / 5"), points pill with count-up, Review Answers, Continue |
| Answer review | `/topics/[id]/quiz/result/review` | Per-question: your pick, the correct answer, explanation |
| Global leaderboard | `/leaderboard` | Podium for top 3, ranked list for 4+, current user highlighted |
| Profile / settings | `/profile` | Avatar + name + email, privacy toggles, menu, "Log Out" in destructive color |
| Showcase | `/showcase` | Internal component gallery, not user-facing |
