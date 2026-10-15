# Wicky (LearnerHQ) — Product Overview

A thorough, factual overview for someone who has never seen the product before.

---

## 1. Core Concept & Problem

Wicky is a **gamified, AI-powered learning platform** that delivers structured,
bite-sized educational content on user-chosen subjects. A user picks a subject
(e.g. "US History"), works through a roadmap of topics organized into levels,
reads short (~5-minute) AI-generated summaries, takes multiple-choice quizzes to
reinforce retention, and earns points that feed into leaderboards, streaks, and a
computed "Learner Persona."

### Who it's for

The product targets learners who no longer have the time or appetite for deep,
open-ended research (Wikipedia rabbit holes, long-form textbooks) but still want
to build structured knowledge in specific areas. The format is designed for
mobile-first consumption — the learner is "on the go, on a break, sitting in a
waiting room."

### Why this approach

- **vs. Wikipedia**: Wikipedia is unbounded and self-directed. Wicky provides a
  curated, leveled roadmap with a guaranteed endpoint (once a subject's topics
  are completed, you're done with that subject) and quizzes that verify
  retention.
- **vs. generic learning apps**: Wicky is explicitly not a content library or
  LMS. Every subject's content (topic summaries, quiz questions, suggested
  resource links) is **AI-generated on demand** — there is no pre-authored
  curriculum. A roadmap is generated when a user enrolls in a subject, then
  topic content (summaries, quizzes) is generated progressively.
- **vs. Duolingo-style apps**: Wicky doesn't use cartoon mascots, confetti, or
  streak anxiety as the primary mechanic. Gamification is "earned" — points are
  receipts of learning, not prizes for playing. The visual language is
  deliberately restrained (the "Almanac" design direction).

---

## 2. The Core Loop

> pick/resume a subject → read a short topic ("5 min read") → take a quiz on
> it → earn points and unlock the next topic → see how you rank against other
> learners → come back tomorrow to keep the streak alive.

1. **Sign up** (email/password or Google/Apple/Facebook OAuth)
2. **Select up to 5 subjects** (a hard cap)
3. **Roadmap is generated** (the topic list and level structure is created by AI)
4. **First three topic contents are generated in the background** (so the user
   doesn't wait for generation on their first topics)
5. **User reads the first ~5-minute topic** (an AI-generated summary with
   resource links)
6. **User takes a quiz** — multiple-choice, 4 options per question
7. **User earns points** — but only if they pass (score ≥ 60% of total points)
8. **Next topic unlocks** (topics are linearly ordered within a level)
9. **User progresses through Levels 1 → 2 → 3** (advancement requires passing
   80% of topics in the current level)
10. **User completes the subject** (all 3 levels done)
11. **User receives new subject recommendations** (prioritized: subjects they've
    marked as interested, then popular subjects)

### Specific timings, point values, and thresholds

| Parameter | Value |
|---|---|
| Max concurrent subjects | 5 |
| Read time per topic | ~5 minutes (displayed as "5 min read") |
| Normal quiz points | 90–110 |
| Advanced quiz points | 180–220 |
| Pass threshold | ≥60% of total points |
| Quiz re-generation cooldown | 1 hour (per user + topic + quiz type) |
| Level-up threshold | 80% of topics in current level passed (or total−1 for small levels) |
| Notification frequency | Configurable 1–24 hours per subject |
| Leaderboard (global) | Top 50 users, periodic reset (weekly implied) |
| Leaderboard (per-topic) | Top 20 users |

### The quiz step in detail

1. User opens a topic and reads the summary + resource links.
2. User triggers quiz generation — an AI creates multiple-choice questions
   validated against a structured schema.
3. User submits answers.
4. If passed (≥60%): points awarded, topic marked as passed. The normal quiz is
   complete.
5. **Advanced quiz path**: After passing the normal quiz, the user must view
   the topic's resource links (explicitly mark them as viewed), then can take
   an advanced quiz worth double the points.
6. If failed: user can retry after the 1-hour cooldown. They can optionally
   include previously missed questions for targeted retry.

---

## 3. Content Depth Model

### Structure

Each **Subject** contains a roadmap of **Topics** organized into exactly 3
**Levels** (1 = Beginner, 2 = Intermediate, 3 = Advanced).

Levels are progressive — you must complete Level 1 to access Level 2, and Level
2 to access Level 3.

### Advancement mechanic

Passing a topic's normal quiz marks it as passed. A progress check returns one
of three actions:
- **"none"**: keep going on the current level
- **"level_up"**: the threshold is met, and the next level becomes unlocked
  (value 2 or 3)
- **"subject_completed"**: all 3 levels done; the user is prompted to select a
  new subject, with suggestions provided

The level-up threshold is **80% of total topics in the level** (or total−1 for
very small levels). This means you don't need to pass every topic to advance.

### Two-tier quiz difficulty

Within a single topic, there are two difficulty tiers:
1. **NORMAL quiz** — available immediately after reading. Worth 90–110 points.
   Must be passed before the advanced quiz is available.
2. **ADVANCED quiz** — requires (a) passing the normal quiz AND (b) explicitly
   marking resource links as viewed. Worth 180–220 points. This is the "deeper"
   engagement path within a topic.

### Content generation states

Topics can be in one of four states:
- **Not generated**: roadmap entry exists but AI hasn't been called
- **Generating**: AI generation is in progress
- **Ready**: summary and quiz questions are available
- **Failed**: generation failed, can be retried

Topics can also be **flagged** — implying a content review workflow for
problematic AI-generated content.

### "Going deep enough" — the nudge mechanic

When a user completes a subject (all 3 levels), the system indicates that a new
subject selection is needed and provides suggestions. Suggestions are
prioritized:
1. Subjects the user has marked as interested
2. Popular subjects (by enrollment count)

The system also has an auto-select preference (default: off) for automatically
enrolling users in suggestions.

---

## 4. Social / Gamification Layer

### Point system

Points are the central currency. They are:
- Awarded only on quiz pass (score ≥ 60%)
- Accumulated per-subject and globally
- Displayed in a monospace font (the "data voice")
- Tracked at the topic level (per-topic leaderboard) and globally (overall
  leaderboard)

### Leaderboards

**Global leaderboard:**
- Top 50 users ranked by total accumulated points across all subjects
- Tie-breaker: user ID ascending
- Users can opt out — they are hidden from the list but their points still
  affect other users' rank calculations
- Has scope tabs: **Global** / **Following** / **Friends**
- Periodically resets — the UI shows a countdown ("Leaderboards reset in
  6d 12h 30m"), implying a weekly reset cycle

**Per-topic leaderboard:**
- Top 20 users by points earned on a specific topic
- Displayed on the Subject detail → Leaderboard tab

**Podium display (global):**
- Top 3 get a visual podium: #1 centered and largest (oxblood badge), #2 to the
  left (forest badge), #3 to the right (muted badge)
- Each rank badge is a 28×28px square with the rank number
- Current user shown with an "S" rank in an oxblood square, in a highlighted row

### "Others learning" discovery

Up to 10 other learners on the same topic are surfaced, prioritized:
1. Active users at a similar level (±1 level)
2. Users who have completed the topic

Users opt in/out via a privacy preference. This provides a lightweight social
discovery layer without direct messaging or friending.

### Streaks

Day streaks track consecutive days of learning activity — the core loop
describes it as "come back tomorrow to keep the streak alive." Streak data is
computed from quiz activity dates.

### Learner Persona

A classification system driven by learning behavior analytics. The metrics page
displays a persona with:
- A persona title (example: "The Strategist")
- A description (example: "You plan, stay consistent, and love depth.")
- An illustrated avatar/glyph

This is computed from metrics like time-of-day activity patterns, consistency,
subject diversity, and depth of engagement.

### Privacy controls

Two independent toggles (user preferences):
1. **Leaderboard visibility** (default: on) — appear on leaderboards
2. **Progress visibility** (default: on) — appear in "others learning"

Plus an auto-select subjects toggle (default: off) for automatic subject
enrollment.

### What's competitive vs. personal

- **Competitive**: global leaderboard, per-topic leaderboard, rank badges
  (oxblood/forest/muted for top 3), podium display, "Your rank" in the Key
  Facts table
- **Personal**: points as evidence of learning (not just a score), day streak,
  Learner Persona, metrics/analytics (favorite topic, best learning time),
  progress bars, roadmap position
- The design philosophy explicitly resists streak anxiety. Points are
  "receipts" of learning, not prizes.

---

## 5. Differentiators

### What specifically sets Wicky apart

1. **AI-generated curriculum, not pre-authored content.** Subjects are created
   by users (or resolved from existing ones). Roadmaps, topic summaries, quiz
   questions, and resource links are all AI-generated on demand. There is no
   content team. This means Wicky can cover an unbounded set of subjects.

2. **Almanac design language.** The entire product is themed as a "reference
   work" — square cards, no shadows, rule-line demarcation, double-rule
   dividers, drop caps on topic pages, a "Key Facts" sidebar table, oxblood as
   the structural accent color ("the year color"), forest for verified/passed
   states. The visual identity is unique among learning apps — it looks like a
   printed almanac, not a mobile game.

3. **Restrained gamification.** Points are "receipts" of learning, not prizes.
   The only celebration animation is a number count-up on `+80 pts`. There is
   no confetti, no mascot, no cartoon badges, no emoji as visual elements.
   Celebration copy is capped at "Well done." The user is treated as an adult.

4. **Two-tier quiz depth (Normal + Advanced).** Beyond the typical "read then
   quiz" pattern, Wicky has an advanced quiz that requires engaging with
   external resource links first, doubling the points and deepening retention
   on a topic.

5. **Structured level progression with a completion endpoint.** Unlike
   infinite-scroll learning apps, each subject has a finite roadmap (3 levels
   of topics). When you finish a subject, you're done — and the app actively
   nudges you toward a new one via interest-based suggestions. This creates
   closure and a sense of accomplishment.

6. **Learner Persona system.** Beyond raw stats, the product classifies users
   into personas ("The Strategist," etc.) based on behavioral patterns — making
   the metrics page feel like a personal analytics report, not just a
   scoreboard.

---

## 6. Target Audience

### Explicit profile

The learner who uses Wicky:
- Is "on the go, on a break, sitting in a waiting room" (mobile-first)
- Has limited time windows but wants structured progression
- Is treated as "an adult who can read a number and know what it means"
- Values restraint and factual presentation over gamified cheerleading
- Wants to feel accomplished through evidence (points, completed topics), not
  through praise

### Implied use cases

- **Commute / break learning**: The ~5-minute topic + quiz format fits into
  short, regular gaps in the day.
- **Interest-based exploration**: Users can browse subjects ordered by
  popularity and mark interest before enrolling. A discovery strip on the
  homepage encourages casual browsing.
- **Goal-oriented completion**: Users who want to "finish" a subject find
  clear, bounded roadmaps with a completion endpoint.
- **Social comparison (optional)**: Users who want competitive motivation can
  engage with leaderboards; those who don't can opt out via privacy toggles.

## 8. Concrete Specifics

### Subject and topic examples

- **Subjects**: US History, World War II, Ancient Rome, The Cold War, The
  Industrial Revolution
- **Topics within "US History"**: Causes of Revolution, First Continental
  Congress, Declaration of Independence, The Revolutionary War Begins, Valley
  Forge Winter, Turning Point Battles, Treaty of Paris, Legacy of the
  Revolution, The Constitution, Bill of Rights
- **Key Facts for "The American Revolution"**: Dates: 1775–1783, Duration: 8
  years, Colonies: 13 of 13, Congresses: 2, Outcome: Independence, Your level:
  L2 · Intermediate, Your rank: 142 of 2,418

### Screen names

| Screen | What it shows |
|---|---|
| Sign Up | Wordmark + tagline, display name/email/password form, "Continue with Google," sign-in link |
| Sign In | "Welcome back.", email/password form with "Forgot?" link, three social-login icon buttons, sign-up link |
| Password Recovery | Back chevron, email field → sends reset link; confirm page with token + new password fields |
| Homepage | Time-of-day greeting by name, "Currently Learning" list (subject rows with progress bars), horizontal "Explore" strip with subject cards + "Add Subject" card showing slot count |
| Subject Overview | Header with back chevron, subject name, share icon. Three tabs (Overview, Roadmap, Leaderboard). "Current Topic" card (title, summary, "Start 5 min read" button, "Further study" link), "Your Progress" card (percentage + progress bar + stat row), Roadmap preview strip |
| Subject Roadmap | Vertical timeline/checklist of all topics across 3 levels, status nodes (completed = check, current = highlighted, locked = lock icon), connecting line through all nodes |
| Subject Leaderboard | Ranked list of learners on the current topic, top 3 with colored rank badges, current user highlighted with "S" rank |
| Topic Reading Page | Running head (subject + "5 min read"), chapter label, topic title, AI-generated body with drop cap, Key Facts sidebar table (dates, duration, outcome, your level, your rank), "Take the quiz" + "Save for later" buttons |
| Quiz Page | Question number (e.g. "Question 2 of 5"), question text, four answer options (A/B/C/D) with correct/incorrect feedback after selection, "Next Question" or "Submit" button |
| Quiz Result | "Well done." or "Not quite — try again", giant score readout ("4 / 5"), points-earned pill with count-up animation ("+80 pts"), "Review Answers" button, "Continue" button |
| Metrics Page | "Your Metrics" header. Stat cards: Total Learning Time, Topics Covered, Subjects Covered, Points Earned. Favorite Topic card, Best Learning Time card, Learner Persona card |
| Leaderboard Page | Scope tabs (Global/Following/Friends), podium for top 3, ranked list for positions 4+, current user highlighted, countdown timer to reset |
| Profile / Settings | Avatar + name + email, stat row (points/subjects/topics), visibility toggles (leaderboard, progress), menu list (Account, Notifications, Learning Preferences, Help), "Log Out" in destructive color |
