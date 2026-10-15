# Wicky designs index

Every screen in the Wicky design project, for a coding agent rebuilding the app. Pair this file with `DESIGN_SPEC.md` (behaviors, BE limits) and the exported screenshots.

## How the designs are stored

All screens live in one design canvas named "Wicky Directions":
https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg

The canvas has no separate per-screen URLs. Each screen is an artboard (a `.dc.html` board) inside that one artifact, and one board often holds several phones side by side (for example light and dark, or several states). In the table below, the Design column gives the board name to look for. The canvas is grouped into labelled sections (Design direction, Onboarding, Home and long text variants, Subjects: browse and add, Subject page, Topic reading, Quiz, Metrics and global leaderboard, Profile and settings). Each board is titled above its frame, and each phone inside it is labelled with its state (for example "LIGHT / DEFAULT" or "LONG TEXT / DARK").

Mobile (375 px phones) has every screen and every state, in light and dark. Tablet (768 x 1024) and desktop (1440 x 900) views exist for every screen area, in light and dark, default state per theme. Tablet uses the bottom nav, desktop uses a left sidebar. Responsive rules are in section 20 of `DESIGN_SPEC.md`.

## Routes

Routes marked "from overview" come from the product's pages overview. Routes marked "suggested" are not specified anywhere in the project and are only a naming proposal. Change them to match the app's router.

## Screens

| # | Screen and route | Design (board in the canvas) | What it shows and main states | Shared components |
|---|---|---|---|---|
| 1 | Sign up, `/signup` (suggested) | [SignUpMobile](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Sign up, mobile (light and dark)" | Passport application form: display name, email, password, "choose my first subjects for me" option. States: default (light), field errors (email already registered, password too common) in dark. No social login (BE has none). | Field (inside label), password show toggle, primary button, checkbox row, stamp or passport cover art, text link |
| 2 | Sign in, `/signin` (suggested) | [SignInMobile](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Sign in, mobile (light and dark)" | Email and password, forgot password link, "Welcome back" stamp. States: default (light), wrong details alert with both fields flagged (dark). | Field, password show toggle, primary button, alert banner, stamp, text link |
| 3 | Account recovery, request, `/recover` (suggested) | [RecoverMobile](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Account recovery, mobile", phone 1 | Email field to request a reset link, "Reissue" stamp. | Field, primary button, stamp, text link |
| 4 | Account recovery, link sent, same route as 3 | RecoverMobile, phone 2 | "Check your post" confirmation with a postmark, neutral copy that does not reveal if the account exists, "Send it again". | Postmark stamp, secondary button, status notice |
| 5 | Account recovery, confirm, `/recover/confirm` (from overview) | RecoverMobile, phone 3 | Set a new password from the emailed link, shows which email it is for, expired link fallback. | Field, password show toggle, primary button, email pill, dashed notice |
| 6 | Home, `/` (suggested) | [HomeMobile](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Homepage, mobile (light and dark)", plus long text phones in LongText | Time-of-day greeting with name, reminders bell, "Currently learning" subject cards, slot indicator and "Add a subject" card, "Explore" horizontal strip. States: light, dark, long text (long name, long subject and topic names). Not drawn: empty state for a brand new user, loading, error (see DESIGN_SPEC section 6). | Bottom nav, subject card, explore card, slot indicator, segmented progress bar, bell button, section header with "See all" |
| 7 | Subjects index, `/subjects` (from overview) | [SubjectsIndex](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Subjects index and explore preview", phones 1 and 2 | Active subjects with progress, explore list with learner counts, interest star, ENROLLED and COMPLETED chips. States: light, dark with long text. | Bottom nav, subject card, explore row, chip, interest star toggle, slot indicator |
| 8 | Explore preview, `/subjects/explore/[id]` (suggested) | SubjectsIndex, phones 3 and 4 | Level cards with topic counts and a topic roadmap list from the explore preview. States: normal (light), slots full with the add action replaced by an explanation (dark). | Level card, roadmap list, primary button, top bar with back |
| 9 | Add subject flow, from `/subjects` | [AddSubject](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Add subject flow" (6 phones) | Find or create by name. States: typed input, "writing the roadmap" waiting, too broad with suggested narrower chips (Physics, Chemistry, Biology), matches an existing subject, slots full, name required error. | Bottom sheet or modal, field, chips, suggestion row with ADD, primary button, waiting state |
| 10 | Subject overview, `/subjects/[id]` (from overview) | [SubjectOverview](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Subject: overview" | Points, level, topics passed, advanced passed, percent complete, start reading, further study, notification frequency with change link, remove subject. States: light, dark; long text variant in LongText. | Bottom nav, subject tabs, stat tiles, segmented progress bar, primary and secondary buttons, destructive text button |
| 11 | Subject roadmap, tab of `/subjects/[id]` | [SubjectRoadmap](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Subject: roadmap" | Levels with ordered topics. Topic states: passed (with date), ready to read (current), locked. States: light and dark; long text variant in LongText. | Bottom nav, subject tabs, level header, topic row, status chip, lock icon |
| 12 | Subject leaderboard, tab of `/subjects/[id]` | [SubjectLeaderboard](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Subject: leaderboard" | Top 20 with podium for ranks 1 to 3, highlighted "you" row when ranked, empty state, hidden-user notice. Long text variant in LongText. | Bottom nav, subject tabs, podium, leaderboard row, avatar initials, empty state |
| 13 | Level up and subject completed, after a quiz progress check | [SubjectMoments](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Subject: level up and completed" | Full screen level up moment with a seal, and a subject completed moment with suggestions to add. | Seal, stamp, primary button, suggestion row |
| 14 | Topic reading, `/topics/[id]` (from overview) | Four boards: [TopicReadingLengths](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) (short, typical and long entries), TopicReadingMotion (scroll and text size), TopicReadingStates, TopicReadingLongText | The core reading page: title block with stamp slot, serif body with drop cap, perforated reading progress, text size control (small, medium, large), further study resource links, sticky footer action. States: ready, passed, busy (quiz cooldown), loading, content not ready, error, long titles and long link titles. Bottom nav hidden. | Top bar with back and "Aa", reading progress line, topic stamp (ghost or inked), resource link row with type tag, sticky footer, primary button |
| 15 | Quiz, `/topics/[id]/quiz` (from overview) | [QuizFlow](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Quiz flow" | Preparing state, one question at a time with segmented progress, option states (idle, selected, correct, wrong, dimmed), explanation, next, exit confirmation. Bottom nav hidden. | Quiz top bar, segmented progress, option row, explanation card, sticky footer, primary button |
| 16 | Quiz result, `/topics/[id]/quiz/result` (from overview) | [QuizResult](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Quiz result" (5 phones) | Passed, passed with level up, failed ("Not yet" stamp, retake in about 1 hour), advanced passed, long topic name. Receipt with points and progress. | Topic stamp, "Not yet" stamp, receipt card, level up banner, segmented progress, primary and secondary buttons |
| 17 | Review answers, `/topics/[id]/quiz/result/review` (suggested) | [QuizReview](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Quiz review answers" | Every question with the learner's answer, the correct answer and the explanation, correct and wrong states with icon and label, long text. | Review card, state labels, top bar with back |
| 18 | Quiz hub, `/quiz` (from overview) | [QuizHub](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Quiz hub" | One "Start quiz" card per active subject, "Read first" when reading is incomplete. States: normal, long text, no subjects. The "Recent results" table from the overview is not drawn because the BE has no such data. | Bottom nav, quiz card, primary and secondary buttons, empty state |
| 19 | Metrics, `/metrics` (from overview) | [Metrics](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Metrics" | Points, topics passed, subjects, advanced passed, points by subject, link to the global leaderboard, learning since date. States: normal, new user empty, long subject names. | Bottom nav, stat tile, per-subject row with segmented bar, link card, empty state |
| 20 | Global leaderboard, `/leaderboard` (from overview) | [GlobalLeaderboard](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Global leaderboard" | Top 50 with podium and list. States: top 50 with "you" row, you are hidden notice, empty, long names and large points. Reached from a link card on Metrics (placement chosen in the design, since the overview left it open). | Podium, leaderboard row, avatar initials, notice, top bar with back |
| 21 | Profile, `/profile` (from overview) | [ProfileMain](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Profile and reminders", phones 1 and 2 | Avatar, name, email, bio, member since, totals, two privacy switches, settings menu, log out. States: light, dark with long name, email and bio. | Bottom nav, avatar, stat strip, switch row, menu row, destructive outline button |
| 22 | Reminders, opened from the Home bell | ProfileMain, phones 3 to 5 | Subjects due for their next topic, derived from next due time. States: list, long text, nothing due. No unread dot or mark all read, since the BE has no notification feed. | Top bar with back, reminder card, empty state |
| 23 | Account settings, `/profile/account` (suggested) | [ProfileSettings](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Profile settings: account, notifications, preferences", phones 1 and 2 | Edit display name, avatar URL, bio; email read only; email me a reset link; pinned save. States: default, validation error. Change password form and delete account are not drawn (BE has neither). | Top bar with back, field (including read only and textarea with counter), secondary and primary buttons, pinned footer |
| 24 | Notification settings, `/profile/notifications` (suggested) | ProfileSettings, phones 3 and 4 | Per active subject interval stepper (1 to 24 hours) and next reminder time. States: normal, long subject name. Daily reminder time picker and streak reminder from the overview are not drawn (BE has no such fields). | Top bar with back, stepper, subject label |
| 25 | Learning preferences and help, `/profile/preferences` (suggested) | ProfileSettings, phone 5 | Auto select subjects switch with slot usage, and static help text with a placeholder support contact. Daily goal, study time and difficulty from the overview are not drawn (BE has none). | Top bar with back, switch row, slot indicator |

## Tablet and desktop boards

The canvas sections "Tablet views, 768 x 1024" and "Desktop views, 1440 x 900" hold one board per screen area. Each board shows light and dark frames. Boards are named `<Area>Tablet` and `<Area>Desktop`.

| Screen rows above | Tablet board | Desktop board | Frames shown (light and dark) |
|---|---|---|---|
| 1 Sign up | SignUpTablet | SignUpDesktop | Default form |
| 2 Sign in | SignInTablet | SignInDesktop | Default form |
| 3 to 5 Account recovery | RecoverTablet | RecoverDesktop | Request, link sent, confirm |
| 6 Home | HomeTablet | HomeDesktop | Default |
| 7 to 9 Subjects, explore preview, add subject | SubjectsTablet | SubjectsDesktop | Index, explore preview (normal and slots full), add subject (typed, too broad, slots full), writing roadmap |
| 10 to 13 Subject page | SubjectPageTablet | SubjectPageDesktop | Overview, roadmap, leaderboard (and empty topic), level up, subject complete |
| 14 Topic reading | TopicReadingTablet | TopicReadingDesktop | Ready, scrolled, passed with advanced locked and ready |
| 15 to 17 Quiz, result, review | QuizTablet | QuizDesktop | Question, answered, result passed, result not yet, review answers |
| 18 Quiz hub | QuizHubTablet | QuizHubDesktop | Default |
| 19 and 20 Metrics, global leaderboard | ProgressTablet | ProgressDesktop | Metrics, global leaderboard |
| 21 to 25 Profile, reminders, settings | ProfileTablet | ProfileDesktop | Profile, account, notifications, preferences, reminders |

All rows link to the same artifact: https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg

Tablet and desktop do not draw long text, validation error, loading or failure variants. Use the mobile boards for those and apply the same rules.

## Reference boards (not app screens)

| Board | What it is |
|---|---|
| [Passport](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) | The chosen visual direction overview. |
| [Main](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Trailhead (alternative)" | The alternative direction, kept for reference. Not for implementation. |
| [Stamps](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) "Passport stamp set" | The stamp and seal set used across screens. |
| [LongText](https://claude.ai/artifact/YCEjgLEjC9LGSQXCctacsg) | Long text variants of Home, Subject overview, roadmap and leaderboard. Already referenced in rows 6, 10, 11 and 12. |

## Shared components

- Bottom nav (mobile and tablet): five tabs (Home, Subjects, Quiz, Metrics, Profile) with a marker bar on the active tab. Hidden on topic reading, quiz, quiz result and review, auth, recovery, level up, subject complete and the global leaderboard. On mobile it is also hidden on Profile sub pages; on tablet and desktop the nav stays on those pages.
- Sidebar (desktop): 264 px, wordmark, the same five items with an active state, user chip at the bottom linking to Profile. Hidden on the same screens as the bottom nav.
- Top bar: back control, centered mono title, optional right action. 56 px high.
- Field: label sits inside the box at the top in the mono style. Read only variant has a dashed border and a lock. Error variant uses the tomato border and a message below.
- Buttons: primary (tomato, 54 to 56 px high), secondary (outlined), destructive (outlined tomato or text), pinned footer button.
- Chip: pill with a mono uppercase label (ENROLLED, COMPLETED, status chips).
- Switch and stepper: on and off with an ON and OFF label; stepper with minus and plus buttons around a value.
- Subject card, explore card, reminder card, quiz card: bordered cards with a subject accent color.
- Segmented progress bar: a row of ink segments filled in the subject accent. Perforated reading progress line on topic reading.
- Slot indicator: five small squares, filled for active subjects.
- Stamps: topic stamp (inked or ghost), level seal, "Not yet" stamp, postmark and welcome stamps, with the ink effect.
- Leaderboard: podium for ranks 1 to 3, rows for the rest, avatar initials, "you" highlight.
- Receipt card: dashed row list used on quiz result.
- Empty state: a dashed circular stamp with a mono label, a headline, one line of text, and an optional action.

## Design direction

### Colors (light / dark)

| Token | Light | Dark |
|---|---|---|
| Background | #F3E9D2 | #1C1712 |
| Kraft (raised surface) | #E4D3B3 | not used |
| Field | #FBF5E6 | #26201A |
| Ink (text and borders) | #2B2118 | #F1E6CF |
| Secondary text | #4A3C2B | not defined, use muted |
| Muted text | #5C4C38 | #B3A58A |
| Frame line (phone) | #2B2118 | #4A3C2B |
| Tomato (primary, danger) | #B93A26 | #E8725C |
| Cobalt | #2D4BA0 | #7B93E0 |
| Pine (success) | #2F6B52 | #5FB08F |
| Gold (points, advanced) | #B7770B | #F0B94A |
| Text on primary | #FFF6E6 | #1C1712 |

Subjects take an accent from tomato, cobalt, pine and gold. The background carries a faint diagonal hatch texture (about 3 percent ink opacity lines at 45 and minus 45 degrees, 7 px spacing).

### Typography

- Headlines: Big Shoulders Display, weight 900, uppercase, line height about 0.85 to 1. Sizes seen: 64 px (sign in headline), 54 to 56 px (page titles), 50 px (sign up), 40 to 44 px (compact page titles), 30 to 34 px (section and empty state titles), 20 to 28 px (card titles).
- Body and UI: Work Sans, weights 400 to 600, 14 to 17 px, line height about 1.45 to 1.5.
- Labels and data: Courier Prime, weight 700, uppercase, 9 to 12 px, letter spacing 0.08 to 0.14 em.
- Reading and quiz questions: Newsreader serif, about 18 px with 1.62 line height on topic reading.
- Long titles step down in size tiers and clamp to 2 lines (page titles 3). See DESIGN_SPEC section 3.

### Spacing

- Page gutter 22 px on mobile, 48 px tablet, 56 px desktop. Top bar 56 px. Bottom nav 78 px, and pages reserve about 110 px below content.
- Common gaps: 6, 8, 10, 12, 14, 16, 22 px. Section spacing 22 to 28 px.
- Minimum touch target 44 px. Field height 62 px. Primary button height 54 to 56 px.

### Radius and borders

- Borders: 1.5 px ink for cards and fields (2 px for error or "you" highlight). Dashed borders mean not yet, optional or read only.
- Radii: 10 px fields, 12 to 14 px cards and buttons, 999 px chips and pills, 3 px slot squares, 38 px the phone frame in the mockups (not an app value; tablet and desktop frames use 28 and 18 px, also mockup only).

### Motion

The canvas is static, so no motion tokens or durations are defined. Behaviors the design implies:
- A short "press" when a stamp is earned, a level up moment, progress segments filling, and the reading progress line following scroll.
- Everything must have a final static state and respect reduced motion.
- Choose one consistent set of durations and easing in the app, and record it in the design system step of the delivery order.

## Not in the design, by decision

Streaks, time spent, read time or key facts from the BE, social logins, change password, delete account, notification feed and unread counts, recent quiz results, following or friends leaderboards, weekly reset countdowns, daily reminder and goal settings. These are absent because the BE cannot supply them. See DESIGN_SPEC section 1.
