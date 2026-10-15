# Wicky Frontend Design Spec (Passport direction)

Audience: the coding agent implementing the Wicky frontend (Next.js, responsive: mobile, tablet and desktop).
This document describes required behaviors, constraints and invariants. It does not prescribe code structure, component names or implementation steps. Choose those yourself, following the repo's conventions.

## 0. How to use this spec

- The visual source of truth is the exported screens in `docs/design/screens/` and the reference boards in `docs/design/source/`. Match them. The source boards are static mockups: treat them as a visual reference only and rebuild them as real, accessible UI.
- The backend (BE) is the source of truth for data and capabilities. If a screen in the design shows something the BE cannot supply, this spec says so in the "Invented or inferred" notes. Do not add data, endpoints or features that the BE lacks.
- Three layouts ship: mobile (design width 375 px, must also behave from 320 px to large phones), tablet (design 768 x 1024 portrait) and desktop (design 1440 x 900). See section 20 for the responsive rules. Mobile is the complete set of states; tablet and desktop show the default state per theme.
- Every screen exists in light and dark themes. Both must ship.
- Where this spec and a screenshot disagree, ask before guessing.

## 1. Product and BE constraints (locked)

- Wicky is a micro-learning app: a learner enrolls in subjects, reads short topics, and passes quizzes to progress through levels.
- Maximum 5 active subjects per learner.
- A quiz is passed at 60 percent of total points.
- Auth is cookie based (JWT in cookies). Endpoints exist for sign up, sign in, refresh, sign out, and password reset request and confirm.
- The BE provides: profile (email, display name, avatar URL, bio, preferences, date joined); explore list and explore preview; interest toggle; suggestions; add, remove and create subject (create resolves to either a resolved subject or a "narrow" response); subject list with progress rollups; subject detail with levels and topic statuses; progress check (none, level up, subject completed, plus suggestions); per-subject notification frequency (1 to 24 hours) and notification status; global leaderboard (top 50); topic leaderboard (top 20); others-learning (max 10 entries); topic detail (title, summary text, resource links, level, order, content and review status, subject name); quiz generate (normal or advanced) with a one hour cooldown; quiz submit; resource-links-viewed, which is a prerequisite for the advanced quiz.
- The BE does NOT provide, and the frontend must not show or fake: streaks, time spent, read time or key facts or subtitles from the BE, a learner persona or metrics endpoint, following or friends leaderboards, weekly reset countdowns, the user's own rank outside the top 50 or top 20, a notification feed or unread counts, recent quiz results, change password, delete account, social logins, or save for later.
- Consequence: derived values (totals on Metrics, read time on topics, "next topic", "due" reminders) are computed on the client from BE data and must be labelled in code review as derived, so they can be revisited when the BE adds endpoints.

## 2. Visual system

### 2.1 Identity

The "Passport" idea: the app is a passport, and progress is collected as ink stamps. Warm paper surfaces, ink-dark text, bold condensed headlines, mono labels, and stamps that look pressed and slightly uneven.

### 2.2 Themes and colors

Light: background #F3E9D2, raised surface (kraft) #E4D3B3, field #FBF5E6, ink #2B2118, secondary text #4A3C2B, muted #5C4C38, tomato (primary action, danger) #B93A26, cobalt #2D4BA0, pine #2F6B52, gold #B7770B, text on primary action #FFF6E6.
Dark: background #1C1712, field #26201A, ink #F1E6CF, muted #B3A58A, frame lines #4A3C2B, tomato #E8725C, cobalt #7B93E0, pine #5FB08F, gold #F0B94A. In dark, primary action text is the dark background color.

Rules:
- Theme follows the system setting, with a manual override stored for the user.
- Color is never the only signal. Status always pairs color with a label or icon.
- All text meets WCAG AA contrast in both themes. If a token pair fails, adjust the token, not the design intent, and flag it.
- Subjects are assigned an accent color from tomato, cobalt, pine and gold. The assignment is stable per subject (do not reshuffle between sessions).

### 2.3 Typography

- Headlines: Big Shoulders Display, heavy weights, uppercase, tight line height.
- Body and UI text: Work Sans.
- Labels, data, numbers in small caps contexts, chips: Courier Prime, uppercase, letter spaced.
- Topic reading body and quiz questions use a book serif (Newsreader) for comfortable long reading.
- Fonts are self-hosted or loaded in a performance safe way, with sensible fallbacks that do not shift layout dramatically.

### 2.4 Surfaces and texture

- The page background has a very faint diagonal hatch texture in both themes. It must stay subtle and must not reduce text contrast.
- Cards and fields use 1.5 px ink borders with 10 to 14 px radii. Dashed borders indicate "not yet", "optional" or "read only".
- Form fields show their label inside the box at the top, in the mono label style. Read only fields use a dashed border and a lock icon.

### 2.5 Stamps (signature element)

- Stamps are the reward and progress language: topic stamps, level seals, "not yet" stamps, welcome and reissue stamps.
- Rendered as vector graphics with an ink effect: rough edges, uneven density and grain. The effect is decorative and must degrade gracefully (plain flat stamp) where unsupported or when reduced motion or reduced effects is preferred.
- Earned stamps are inked in the subject accent color. Not yet earned stamps are perforated or dashed ghost outlines, never hidden.
- Stamp text that follows a curve must keep to the ring band and stay legible at the smallest size shown.
- Stamps carry real data only: topic title, a real pass date, a real level. Dates come from the BE.
- Stamp animation (when a stamp is earned) is a short "press" motion. Respect reduced motion by showing the final state.

### 2.6 Touch and accessibility baseline

- Minimum 44 px touch targets for every interactive element, including icon buttons, steppers, the interest star and the nav items.
- Real buttons and links, real form labels, visible focus states, `aria` labels on icon only controls, decorative SVG hidden from assistive tech.
- Switches expose their on or off state. Errors are announced and tied to their field.
- Support dynamic type: layouts must survive larger system text without clipping.

## 3. The long text rule (applies to every container)

This is a standing requirement from the product owner. Every container must define what happens when its text is longer than the container, and the design shows variants for it.

- Titles: clamp to 2 lines, then ellipsis. Page titles may use 3 lines, with the font size stepping down by tiers as the title gets longer. Never break a word in the middle when a smaller size would fit it. Where a single long word still cannot fit, hyphenate or break it rather than overflow.
- Single line names and values (leaderboard names, emails, subject names in tight rows): one line with ellipsis.
- Fixed size elements never shrink or wrap: tags and chips, point counts, avatars and initials, buttons, stamps, nav items, switches.
- Numbers use compact, readable formatting with thousands separators. Very large point totals must not push neighbours out of place.
- Containers that hold user generated content (display name, bio, email, subject names, topic titles, resource link titles, quiz options and explanations) all need this treatment, in both themes.
- Quiz questions and options wrap fully and grow their container. Do not truncate anything the learner must read to answer.
- Do not truncate topic body text, ever.

## 4. Global shell and navigation

- Main tabs, in order: Home, Subjects, Quiz, Metrics, Profile. A bottom bar is always visible on tab screens.
- The active tab shows a marker bar and an accented icon and label. The active tab is also exposed to assistive tech.
- The bar is hidden on immersive screens: topic reading, quiz in progress, quiz result, sign in and sign up, recovery, and sub pages of Profile.
- Back navigation: immersive and sub pages show a back control top left. Returning goes to the logical parent, not the browser history, where those differ.
- The bell on Home opens the Reminders screen (section 14). It has no unread dot or count, because the BE has no notification feed.
- The nav must be reachable by keyboard and screen reader and must not cover content: pages reserve space for it.

## 5. Onboarding

### 5.1 Sign up
- Fields: name on passport (display name), email, password with show and hide, and an option "choose my first subjects for me" (this maps to the auto-select preference).
- Password rule shown as helper text: at least 8 characters, avoiding common passwords.
- Errors: email already registered (offer a path to sign in), password too common, field level validation. Show errors per field in plain language.
- Success lands the user on Home. A new user with no subjects sees the empty Home state.
- Social login buttons must not appear unless the BE adds support.

### 5.2 Sign in
- Email and password with show and hide, "Forgot your password?", and a link to sign up.
- A wrong details state shows one generic message ("Invalid email or password") without revealing which field is wrong, and marks both fields.
- Success lands on Home.

### 5.3 Account recovery
Three states in one flow: request (email), link sent confirmation, and confirm from the emailed link (new password).
- The sent state must not reveal whether the account exists. Copy stays neutral ("If that email has a passport...").
- Offer "send it again" with a sensible cooldown. Do not invent a cooldown the BE does not enforce, but avoid letting users spam the button (disable briefly after a send).
- The confirm state shows which email it is for, validates the new password rule, and has a way to request a fresh link when the link is expired or used.

## 6. Home

Purpose: pick up where you left off, and discover new subjects.

- Greeting with the display name. Long names clamp to one line with ellipsis, and the greeting size steps down for long names.
- A bell opens Reminders.
- "My subjects": a card per active subject showing subject name, current topic, topic progress (passed of total), and a progress bar made of ink segments in the subject accent. A "now" marker identifies the current topic. Tapping opens the Subject overview.
- Slot indicator: five slots, filled by active subjects, with "N of 5 slots". An "Add a subject" card opens the Add subject flow. When all 5 slots are used, the card explains that the learner must remove a subject first (see section 7.3), instead of disappearing.
- "Explore" row: horizontally scrollable cards from the BE explore list, showing name and topic count. Tapping opens the explore preview. Explore cards have a fixed width and clamp long names.
- "See all" goes to the Subjects index.
- Empty state for a brand new user: a friendly empty passport with a single call to action to add a subject. Do not show empty progress widgets.
- Loading state uses skeletons shaped like the cards. Error state offers a retry.

## 7. Subjects

### 7.1 Subjects index
- Two parts: the learner's active subjects (with progress and a status) and an explore list of subjects from the BE.
- Explore rows show name, learner count (enrollment count) and an interest star. Rows show an ENROLLED or COMPLETED chip from the BE flags. The star toggles interest and must be optimistic with rollback on failure.
- Tapping an explore row opens the explore preview.
- Long names clamp to 2 lines on rows, with the chip and star never shrinking.

### 7.2 Explore preview
- Shows the subject's levels with topic counts, and the topic list as a roadmap. All of it comes from the explore preview endpoint.
- Primary action: add to my subjects. When the learner has 5 active subjects, the action is replaced with an explanation and a path to free a slot. Never offer an action that will fail.
- Show whether the learner is already enrolled or has completed it.

### 7.3 Add subject
A sheet or screen with a single input that finds or creates a subject by name.
- Typed input leads to the "find or create" request. While the BE works, show a calm "writing the roadmap" waiting state, because creation can take a moment.
- Outcomes to design for, all required:
  1. Resolved: the subject is created or matched, and the learner lands on its overview.
  2. Narrow: the topic was too broad. Show the BE's suggested narrower subjects as chips the learner can pick to retry.
  3. Matches an existing subject: offer that subject instead of creating a duplicate.
  4. Slots full: explain, with no input.
  5. Empty input: name required error.
- Suggestions from the BE (name and reason) appear as quick add rows. "Reason" is shown as supporting text.
- Removing a subject is a deliberate action with a confirmation that explains what happens to progress, using only facts the BE guarantees.

## 8. Subject page

Four views of one subject, reachable by a tab control: Overview, Roadmap, Leaderboard, and moment screens (level up, subject completed).

### 8.1 Overview
- Subject name, status, points, level unlocked, topics passed of total, advanced topics passed, and percent complete (all from the subject list and detail).
- Primary action "Start reading" opens the current topic. A secondary "Further study" jumps to the resource links of the current topic.
- Notification frequency row shows the current interval, with a "Change" action that goes to notification settings.
- "Remove this subject" is a quiet destructive action at the bottom, with confirmation.
- "Others learning" (max 10, display name, status, level) appears only when those users allowed it. If the list is empty, hide the section entirely.

### 8.2 Roadmap
- Levels with their topics in order. Each topic row shows order number, title, and a status: passed (with the pass date), ready to read (current), or locked.
- Passed and current topics are tappable. Locked topics are not links and are visibly muted, with a lock icon.
- Level headers show topic counts and a rollup of passed topics.
- Long topic titles clamp to 2 lines; the number and status never shrink.
- The roadmap is long. The current topic should be visible on open (scroll it into view) and levels can be collapsed.

### 8.3 Subject leaderboard
- Top 20 for the subject: rank, display name, points. The BE does not return the learner's own position when outside the top 20, so do not show a "your rank" row in that case.
- Podium treatment for ranks 1 to 3, a list for the rest, and a highlighted "you" row when the learner is in the list.
- Learners who hid themselves are absent, and a message should explain that when the viewer is hidden.
- Empty state when nobody has points yet.

### 8.4 Moments
- After the progress check returns "level up", show a full screen level up moment: a new seal, the level number, and a continue action to the roadmap.
- After "subject completed", show a completion moment, a completed stamp, and suggestions from the BE as add rows. Suggestions respect the 5 slot limit.
- Moments appear once per event and must not replay on revisit.

## 9. Topic reading (most important screen)

Goal: a calm, distraction free reading surface that works for very short and very long entries.

### 9.1 Content
- Title, the topic summary (a text blob from the BE), and resource links (url, type wikipedia, video or article, title).
- The summary is treated as plain paragraphs. If the BE later sends structured text, revisit.
- Display derived read time from word count, and label it as an estimate. Do not show key facts, subtitles or similar fields, because the BE does not provide them.
- Show the topic's subject, level and order as small context labels.

### 9.2 Layout and reading comfort
- A slim top bar: back, the subject and topic position, and a text size control ("Aa"). The text size control has small, medium and large steps, persists per user on the device, and affects the body text only.
- Body text uses the serif at roughly 18 px, 1.6 line height, with a single paragraph rhythm and a drop cap on the first paragraph. Measure stays comfortable on every phone width.
- A thin perforated reading progress line under the top bar fills as the learner scrolls.
- The title block shows the stamp slot: a ghost (perforated) stamp if the topic is not passed, and the inked stamp with the pass date if it is. The title steps down in size by length tier and clamps as defined in section 3, but the full title must be available on the page (for long titles, show the full title in the body of the page).
- The page must handle: very short content (do not leave a huge empty void, anchor the end block near the content), typical content, and very long content (smooth scrolling, no layout shifts, no truncation).

### 9.3 End of topic
- "Further study" lists the resource links with type tags and titles. Titles clamp to 2 lines, the type tag never shrinks, and links open externally.
- Opening any resource link records the BE "resource links viewed" event. This is what unlocks the advanced quiz, so record it reliably, once, and tolerate failure silently without blocking reading.
- The end block shows an "earn your stamp" card with the primary "Take the quiz" action, or an advanced quiz card when advanced is available.

### 9.4 States
- Ready to take the quiz, passed (stamp inked, with "Next topic" and an "Advanced quiz" option if unlocked), busy (a quiz cooldown is active: explain the one hour wait and when it ends, and keep reading available), content still being prepared (content status), loading skeleton, and error with retry.
- The sticky footer holds the primary action. It must not cover the last lines of text: reserve space equal to its height.
- Review status from the BE may indicate content under review. Show a neutral notice, and do not block reading unless the BE blocks it.

## 10. Quiz

- Entry only after reading. The quiz is generated by the BE on start (normal or advanced). Show a preparing state while generating. Handle errors: 400 messages from the BE are shown to the learner in plain language, 503 shows a try again message, and a cooldown error shows when the next attempt is available.
- One question at a time with a segmented progress indicator, the question in the serif, and options labelled A to D.
- Option states: idle, selected, and after submit, correct, wrong, and dimmed for the rest. Selection must be changeable until the learner confirms the answer.
- The flow per question: choose, confirm ("Submit"), see the correct answer with the BE explanation, then continue ("Next question"). The last question's continue action submits the whole attempt.
- Do not allow skipping or leaving silently. Exiting mid quiz shows a confirmation explaining that a new quiz opens after the one hour cooldown (this is an inferred copy decision, flag it).
- Points: each question has points, and the attempt total comes from the BE total. Do not compute pass or fail on the client. Use the BE result.
- Accessibility: options are radio like controls with clear selected and result states that do not rely on color alone.

## 11. Quiz result

Result kinds: passed, passed with level up, failed, and advanced passed.
- Passed: an inked topic stamp, "Quiz passed", correct count, points earned of total, a receipt (topic, quiz type and attempt number, points earned, subject progress with segmented bar, next up topic).
- Level up: a banner announcing the unlocked level, linking to the level moment.
- Failed: a "Not yet" stamp, correct count, "0 points" as the BE awards (do not show partial points), the retake wait ("in about 1 hour"), and guidance to re read the topic while waiting. Do not imply an immediate retry.
- Advanced passed: gold accent, higher points.
- Actions: "Continue" returns to the subject overview or the next topic. "Review answers" opens the review. For failed, the primary action is to review answers and the secondary is to re read the topic.
- After a submit, call the progress check and route to the moment screens when it reports level up or subject completed.
- "Next up" is derived from the roadmap order. Long topic names wrap in the receipt rather than truncate.

### Review answers
- A list of every question with the learner's answer, the correct answer, and the explanation, with correct and wrong states paired with an icon and label.
- Long text wraps fully.

## 12. Quiz hub

- One "Start quiz" style card per active subject, showing the subject, the current topic and level. Starting from the hub requires the topic to have been read, so if reading is incomplete, the card's action is "Read first" and goes to the topic.
- If a cooldown is active for a subject, show it on the card instead of a start action.
- Empty state when there are no active subjects, with a path to add one.
- Long subject and topic names clamp to 2 lines and 1 line respectively as in section 3.

## 13. Metrics (read only)

- Totals: points, topics passed, subjects, advanced topics passed. All computed on the client from the subject list.
- Points by subject: each row shows name, points, a segmented bar scaled to the highest subject, topics passed of total, and advanced passed. Rows with long names clamp to 2 lines and the points never shrink.
- A card links to the global leaderboard.
- "Learning since" uses the date joined.
- Empty state for new users with a call to action to start learning.
- No charts over time, streaks, or time spent, because the BE has no such data.

## 14. Global leaderboard

- Top 50 learners by total points. Podium for ranks 1 to 3, list for the rest.
- A "you" row is highlighted only if the learner is within the top 50. Do not fabricate a position otherwise.
- If the learner has hidden themselves from leaderboards, show a notice that they are hidden, that their points still count, and a link to the privacy toggle.
- Empty state when nobody is ranked.
- Long names clamp to one line. Very large point values must stay legible and not break the layout.
- No tabs for friends or weekly, and no countdown.

## 15. Profile and settings

### 15.1 Profile
- Avatar (from the avatar URL, falling back to initials), display name, email, bio, member since, and totals (points, topics, subjects).
- Privacy switches, saved immediately and optimistically: show me on leaderboards, and show what I am learning to others.
- Menu: Account, Notifications, Learning preferences, Help and support.
- "Log out" ends the session and returns to sign in.
- Long display names, emails and bios clamp as in section 3 (name up to 3 lines, email one line, bio up to 3 lines).

### 15.2 Account
- Editable: display name, avatar URL, bio. Email is read only and clearly marked.
- Password: a button that emails a reset link. There is no change password form.
- Validation errors from the BE appear on the field. The exact limits (display name length, bio length) come from the BE. The copy in the design is a placeholder and must be replaced by the BE's actual messages.
- The save action is pinned to the bottom and disabled until something changed.

### 15.3 Notifications
- One row per active subject with a stepper to set the interval from 1 to 24 hours, and the next reminder time from the BE next due value. The stepper clamps at the limits and each change saves, with an error rollback.
- Long subject names clamp to 2 lines.

### 15.4 Learning preferences and help
- The auto select subjects toggle, with an explanation of what it does and the slot usage.
- Help and support is static content. The support contact in the design is a placeholder and must be replaced with the real one.

## 16. Reminders (from the bell)

- Lists active subjects that are due now or overdue, derived from each subject's next due time. Each item shows the subject, a "ready to read" message for the current topic, and how overdue it is. Tapping opens that subject's overview.
- No unread state, no mark all read, no history.
- Empty state: "Nothing due".
- Long subject and topic names clamp to 1 line for the subject and 2 lines for the message.

## 17. Cross cutting behavior

- Loading: skeletons that match the final layout. Errors: inline, plain language, with retry, never raw error codes.
- Optimistic updates (interest star, privacy switches, notification interval) must roll back and tell the user when the BE rejects them.
- Session expiry: refresh once silently, and if that fails, return to sign in while preserving the intended destination.
- Offline or flaky network: do not lose quiz progress already submitted per question in the UI state. Do not claim offline support the product does not have.
- Motion is limited to meaningful moments (stamp press, level up, progress fills) and must respect reduced motion.
- All dates shown in the learner's local format. All "ago" and "in about" phrases are derived from real timestamps.
- No client side feature flags for BE gaps: omitted features stay omitted.

## 18. Invented or inferred (confirm with the product owner)

- Exit quiz copy about the one hour cooldown.
- The "Aa" text size control and the choice of a serif for reading.
- Read time estimate derived from word count.
- Summary treated as plain paragraphs.
- Next topic, locked and current topic states, and the "due" reminders derived on the client.
- Metrics totals computed on the client.
- The validation copy, the bio length counter and the support contact in settings.
- The pass at 60 percent message and "0 points on fail" mirror the BE rules and must be kept consistent with them.

## 19. Delivery order

Work in this order, and finish each stage before starting the next.

1. Design system: themes and tokens (fonts, colors, spacing, radii), the page texture, buttons, inputs and form fields, cards, chips, switches, steppers, and the stamp primitives, each in light and dark and with the long text behavior from section 3.
2. Application shell: the bottom tab navigation, the top bars (back, title, actions), safe area and keyboard handling, the screens that hide the nav, and the layout behavior from 320 px up, the tablet bottom navigation and the desktop sidebar (section 20).
3. Individual pages: implement each page against its design, using static or mocked data first. Suggested sequence: auth (sign up, sign in, recovery), Home, Subjects (index, preview, add), Subject page, topic reading, quiz, result and review, Quiz hub, Metrics, Global leaderboard, Profile and settings, Reminders. Build every state listed for a page (loading, empty, error, long text, light and dark), not only the happy path.
4. Backend integration: connect forms, lists, actions and authentication to the existing APIs, page by page, following sections 1 and 17. Wire optimistic updates with rollback, session refresh, and the BE error cases for quiz generation and subject creation. Keep omitted features omitted.
5. Visual verification: run the application, compare each screen against the exported designs in both themes and at the longest text variants, and correct mismatches. Repeat at 320 px and at a large phone width.

## 20. Responsive layouts (tablet and desktop)

Every screen also has a tablet view (768 x 1024) and a desktop view (1440 x 900), each in light and dark. They are in the "Tablet views" and "Desktop views" sections of the canvas, one board per screen area (for example SubjectsTablet, SubjectsDesktop). Mobile boards are unchanged and remain the reference for all states.

Scope and state coverage
- Tablet and desktop boards show the default state per theme, plus the main sub screens (subject tabs, quiz question, result, review, profile sub pages). Long text, validation error, loading and failure variants are only drawn on mobile. Implement them on tablet and desktop by applying the same mobile rules (clamping, wrapping, banners) inside the wider layout.
- The same data, limits, copy and BE constraints apply at every width. Nothing is added or removed because of screen size.

Navigation shell
- Mobile and tablet use the bottom navigation with five tabs (Home, Subjects, Quiz, Metrics, Profile). Tablet keeps the same 78 px bar.
- Desktop replaces it with a fixed left sidebar, 264 px wide: wordmark on top, the same five items with an active state (tomato text, raised field background, ink border), and a user chip pinned to the bottom that links to Profile.
- Screens that hide the nav on mobile also hide it on tablet and desktop: auth, recovery, topic reading, quiz, result, review, level up and subject complete, and the global leaderboard. Profile sub pages keep the nav with Profile active and a "Back to profile" link in the header.
- Breakpoints: below 768 px the mobile layout; 768 to 1279 px the tablet layout; 1280 px and up the desktop layout. Between the designed sizes, let content columns flex and keep the nav model of the nearest design.

Layout rules
- Content gutters grow from 22 px on mobile to 48 px on tablet and 56 px on desktop. Headline sizes grow with the page title scale (mobile 56 px, tablet 64 px, desktop 72 px).
- Card lists that are one column on mobile become two columns on tablet. On desktop, pages split into a main column and a secondary column (Home: subjects at two thirds, explore at one third; Subjects: current subjects and explore side by side; Subject overview: current topic and progress on the left, roadmap preview on the right).
- Subject roadmap: tablet uses two columns (level 1 and 3 on the left, level 2 on the right), desktop uses three columns, one per level.
- Topic reading: reading column of 620 px on tablet and 680 px on desktop, serif body text. Desktop adds a right rail of 320 px holding the further study links and the stamp or advanced quiz card. The top bar and the pinned footer actions stay fixed.
- Quiz, result and review: a centered column (620 to 720 px for questions, about 600 to 640 px for the result). Review uses one column on tablet and two columns on desktop.
- Auth and recovery: tablet is a centered bordered card. Desktop is a split layout with a kraft panel carrying the stamp art on the left (620 px) and the form on the right (460 px wide column). The stamp art is decorative.
- Quiz hub is two columns on tablet and three on desktop. Metrics uses one column on tablet and two on desktop. Profile uses one column on tablet and two on desktop (identity and privacy, then settings menu).
- Modals (add subject, writing roadmap) are centered cards, 600 px on tablet and 640 px on desktop, over the dimmed page.

Invariants
- Same tokens, fonts, radii, borders and texture as mobile.
- Minimum touch target stays 44 px on tablet. Every interactive element is reachable by keyboard on desktop with a visible focus state.
- Frame sizes in the boards are mockups, not app values.
