# Wicky API Reference

Base URL: `https://learnerhq-production.up.railway.app/`

**Auth:** JWT in HTTP-only cookies (`access_token` = 15min, `refresh_token` = 7 days).
All endpoints marked "Auth required" will return `401` if the access token is missing or expired.

**Date format:** ISO 8601 (e.g. `2026-07-09T10:30:00Z`)

---

## Health Check

### `GET /api/health/`

No auth required. Checks database, Redis (Celery broker) and Celery workers. Results are cached for 5 seconds.

```
Response 200:
{
  "status": "ok",
  "checks": {
    "database": true,
    "redis": true,
    "celery": true
  }
}

Response 503 (degraded):
{
  "status": "degraded",
  "checks": {
    "database": false,
    "redis": true,
    "celery": true
  }
}
```

---

## Auth — `/api/auth/`

### `POST /api/auth/signup`

Create a new account. Sets `access_token` and `refresh_token` cookies on success.

```
Request body:
{
  "email":        string,   // required, unique (read-only after creation)
  "password":     string,   // required, Django password validators enforced
  "display_name": string,   // max 100 chars
  "avatar":       string,   // optional, URL
  "bio":          string,   // optional
  "auto_select_subjects_enabled": boolean  // optional, default false
}

Response 201:
{
  "data": {
    "email":                    string,
    "display_name":             string,
    "avatar":                   string,
    "bio":                      string,
    "preferences": {
      "leaderboard_visible":           boolean,  // default true
      "others_learning_visible":       boolean,  // default true
      "auto_select_subjects_enabled":  boolean   // default false
    },
    "date_joined":              string    // ISO 8601
  },
  "status": "success"
}
```

---

### `POST /api/auth/signin`

Authenticate existing user. Sets `access_token` and `refresh_token` cookies on success.

```
Request body:
{
  "email":    string,   // required
  "password": string    // required
}

Response 200:
{
  "data": { /* UserProfile object — same shape as signup response */ },
  "status": "success"
}

Response 401:
{
  "detail": "Invalid email or password.",
  "status": "error"
}
```

---

### `POST /api/auth/refresh`

Refresh an expiring access token. Reads the `refresh_token` cookie (no request body).
Sets new `access_token` and `refresh_token` cookies **and** returns the new token values in the JSON body.
The frontend Edge middleware reads tokens from the body because Set-Cookie headers cannot be reliably parsed in the Edge runtime.

No request body needed — token is read from the `refresh_token` cookie.

```
Response 200:
{
  "detail": "Token refreshed.",
  "status": "success",
  "access_token":  string,   // new JWT access token (same value set in cookie)
  "refresh_token": string    // new JWT refresh token (same value set in cookie)
}

Response 401:
{
  "detail": "Refresh token not provided." | "Invalid or expired refresh token.",
  "status": "error"
}
```

---

### `POST /api/auth/signout`

Auth required. Clears `access_token` and `refresh_token` cookies. No request body.

```
Response 200:
{
  "detail": "Signed out.",
  "status": "success"
}
```

---

### `POST /api/auth/password-reset/request`

Request a password reset email. Always returns 200 regardless of whether the email exists
(prevents email enumeration). An async Celery task dispatches the email via Brevo.

```
Request body:
{
  "email": string   // required
}

Response 200:
{
  "detail": "If that email exists, a reset link has been sent.",
  "status": "success"
}

Response 429 (too many requests):
{
  "detail": "Request was throttled. Expected available in 60 seconds.",
  "status": "error",
  "retry_after": 60      // seconds until the next request is allowed; also sent as the Retry-After header
}
```

**Rate limiting (per email, case-insensitive; applies whether or not the account exists):**
the wait before you may request again doubles after every request:
60s → 2m → 4m → 8m → 16m → 32m → 60m (cap). The counter resets after 24h without requests.
There is also a limit of 30 requests/hour per IP. Always use `retry_after` from the 429 rather than
hardcoding these numbers; on a 200, start a 60s cooldown on the resend button, and on a 429 show a
countdown from `retry_after`.

**The email link** points at the frontend, not the API:
`{FRONTEND_URL}/reset-password?u=<email>&s=<token>` (`u` = email, `s` = token, both URL-encoded;
`URLSearchParams` decodes them). That page should POST `{email: u, token: s, password}` to
`/api/auth/password-reset/confirm`.

A 200 means the request was accepted, not that the email arrived (delivery is retried in the background
up to 3 times). Tell users to check spam and to resend once the cooldown ends.

---

### `POST /api/auth/password-reset/confirm`

Complete a password reset using the token received via email. Tokens expire after 1 hour.
A successful reset invalidates every other pending reset token for that user **and signs out all existing
sessions**: old `access_token` / `refresh_token` cookies stop working (401), so send the user to sign in again.

```
Request body:
{
  "email":    string,   // required, must match the token's user
  "token":    string,   // required, the reset token from the email
  "password": string    // required, new password
}

Response 200:
{
  "detail": "Password reset successful.",
  "status": "success"
}

Response 400 (validation errors):
{
  "detail": "Token has expired." | "Invalid token or email.",
  "status": "error"
}

Response 400 (password validation):
{
  "password": ["This password is too common.", ...]
}
```

---

## Profile — `/api/auth/profile`

Auth required (CookieJWTAuthentication — reads `access_token` cookie).

### `GET /api/auth/profile`

Get the current user's profile.

```
Response 200:
{
  "data": {
    "id":                       int,      // matches `user_id` on leaderboard rows
    "email":                    string,
    "display_name":             string,
    "avatar":                   string,
    "bio":                      string,
    "preferences": {
      "leaderboard_visible":           boolean,
      "others_learning_visible":       boolean,
      "auto_select_subjects_enabled":  boolean
    },
    "date_joined":              string    // ISO 8601
  },
  "status": "success"
}
```

---

### `PATCH /api/auth/profile`

Update the current user's profile. Partial updates allowed — send only the fields you want to change.
Privacy settings (`leaderboard_visible`, `others_learning_visible`) and `auto_select_subjects_enabled`
must be sent as a nested `preferences` object.

```
Request body:
{
  "display_name": string,   // optional
  "avatar":       string,   // optional, URL
  "bio":          string,   // optional
  "preferences": {          // optional, send the keys you want to change
    "leaderboard_visible":           boolean,
    "others_learning_visible":       boolean,
    "auto_select_subjects_enabled":  boolean
  }
}

Response 200:
{
  "data": { /* Updated UserProfile object — same shape as GET */ },
  "status": "success"
}
```

---

## Learning — `/api/learning/`

All learning endpoints require auth (standard `IsAuthenticated` permission — reads `access_token` cookie).

**Roadmap status:** a subject's roadmap is generated in the background. `roadmap_status` is one of
`NOT_GENERATED` | `GENERATING` | `READY` | `FAILED`. See [Realtime events](#realtime-events--apievents)
for live updates and `POST /api/learning/subjects/<subject_id>/roadmap/retry` to retry a failed one.

---

### `GET /api/learning/explore`

Browse subjects that have a roadmap (at least one topic), ordered by popularity (active enrollment count descending, then name).
Subjects the user is enrolled in (active or completed) are always excluded.

Query params:
- `limit` (optional, int 1–50): max subjects returned. Values above 50 are clamped to 50. `0`, negative or non-numeric values return 400. Home uses `?limit=8`.
- `interested` (optional, `true` | `false`): `true` returns only subjects the current user starred (`is_interested` is true on every item). The filter is applied before `limit`, so a starred subject is never cut off by the 50 cap. Any other value returns 400. This is the source for the Starred list. Starred subjects the user has since enrolled in are excluded like everywhere else on this endpoint.

```
Response 200:
{
  "data": [
    {
      "id":                int,      // subject ID
      "name":              string,   // subject name
      "enrollment_count":  int,      // active learners
      "topic_count":       int,      // topics in the roadmap
      "is_interested":     boolean   // current user marked interest
    },
    ...
  ],
  "status": "success"
}
```

`is_enrolled` and `is_completed` are not in this list (they would always be false). `GET /explore/<id>` still returns them.

---

### `POST /api/learning/explore/<subject_id>/interest`

Mark interest in a subject (does not enroll, just signals interest for suggestions).

No request body.

```
Response 201:
{
  "data": {},
  "status": "success"
}
```

---

### `DELETE /api/learning/explore/<subject_id>/interest`

Remove interest marker.

No request body.

```
Response 204: (empty body)
```

---

### `GET /api/learning/explore/<subject_id>`

Preview a subject before enrolling. Returns the subject metadata, enrollment stats,
and the full topic roadmap (`levels`/`topics` are empty if the roadmap has not been generated) so users can see what they'll learn before committing.
No user progress data is included — this works for any authenticated user
(enrolled or not).

```
Response 200:
{
  "data": {
    "id":                int,
    "name":              string,
    "enrollment_count":  int,
    "is_enrolled":       boolean,
    "is_completed":      boolean,
    "is_interested":     boolean,
    "levels": [
      {
        "level":       int,   // 1, 2, or 3
        "topic_count": int    // number of topics in this level
      }
    ],
    "topics": [
      {
        "id":     int,
        "title":  string,
        "level":  int,
        "order":  int
      }
    ]
  },
  "status": "success"
}

Response 404:
{
  "detail": "Not found.",
  "status": "error"
}
```

---

### `GET /api/learning/subjects/suggestions`

Get personalized subject suggestions (up to 5 popular ones, plus any subjects the user marked interest in).
Interest-marked subjects come first; enrolled subjects are excluded.

```
Response 200:
{
  "data": [
    {
      "id":     int,    // subject ID
      "name":   string, // subject name
      "reason": string  // e.g. "You marked interest in this subject" | "Popular subject (N learners)"
    },
    ...
  ],
  "status": "success"
}
```

---

### `POST /api/learning/subjects/<subject_id>/add`

Enroll in a subject. Returns immediately. If the subject has no roadmap yet, generation is queued
in the background (watch `roadmap_status` / SSE). Enrolling in a subject you are already enrolled in
is a no-op and still returns 201.

No request body.

```
Response 201:
{
  "data": {
    "roadmap_status": "NOT_GENERATED" | "GENERATING" | "READY" | "FAILED"
  },
  "status": "success"
}

Response 400:
{
  "detail": "You've reached the limit of 5 active subjects. Remove one or complete a subject to add a new one.",
  "status": "error"
}
```

---

### `DELETE /api/learning/subjects/<subject_id>/remove`

Unenroll from a subject. Removes the `UserSubjectProgress` record.

No request body.

```
Response 204: (empty body)

Response 404:
{
  "detail": "Not found.",
  "status": "error"
}
```

---

### `POST /api/learning/subjects/<subject_id>/progress/check`

Check if the user has completed enough topics in the current level to advance.
Returns `action: "none"` if the level has no topics yet (roadmap not generated). Only `PASSED` topics
count toward the threshold. On `subject_completed` the enrollment becomes `COMPLETED`.

No request body.

```
Response 200:
{
  "data": {
    "action":                 "none" | "level_up" | "subject_completed",
    // Only present when action == "level_up":
    "new_level_unlocked":     int,        // the new level number (2 or 3)
    "slots_available":        int,        // how many more subjects user can add (max 5)
    // Only present when action == "subject_completed":
    "needs_subject_selection": boolean,   // true — user should pick a new subject
    // Present for both level_up and subject_completed:
    "suggestions": [
      {
        "id":     int,
        "name":   string,
        "reason": string
      },
      ...
    ]
  },
  "status": "success"
}
```

---

### `PATCH /api/learning/subjects/<subject_id>/notification-frequency`

Set how often the user wants study reminders for this subject. The interval must be 1–24 hours.

```
Request body:
{
  "frequency_hours": int   // 1–24, required
}

Response 200:
{
  "data": {},
  "status": "success"
}

Response 400:
{
  "detail": "frequency_hours is required" | "frequency_hours must be an integer" | "Notification frequency must be between 1 and 24 hours",
  "status": "error"
}
```

---

### `GET /api/learning/subjects/<subject_id>/notification-status`

Get the current notification configuration for this subject.

```
Response 200:
{
  "data": {
    "frequency_hours": int | null,   // interval in hours, null if not configured
    "next_due_at":     string | null // ISO 8601, null if no upcoming notification
  },
  "status": "success"
}

Response 404:
{
  "detail": "Not found.",
  "status": "error"
}
```

---

### `POST /api/learning/subjects/create`

Create a new subject or resolve an existing one by name. If the name exactly matches
an existing subject, that subject is returned. If it's close (semantic similarity),
the existing subject is resolved. If it's too broad (e.g. "Science"), a suggestion
for a narrower term is returned (HTTP 200 with `action: "narrow"`). The user is automatically
enrolled on success and the roadmap is generated in the background — the response does not wait for it.

```
Request body:
{
  "name": string   // required, max 200 chars
}

Response 200 — resolved (matched or created):
{
  "data": {
    "action": "resolved",
    "subject": {
      "id":             int,
      "name":           string,
      "roadmap_status": "NOT_GENERATED" | "GENERATING" | "READY" | "FAILED"
    }
  },
  "status": "success"
}

Response 200 — name too broad, needs narrowing:
{
  "data": {
    "action": "narrow",
    "suggestion": string   // e.g. "Try: Physics, Chemistry, Biology"
  },
  "status": "success"
}

Response 400:
{
  "detail": "Name is required." | "You've reached the limit of 5 active subjects. Remove one or complete a subject to add a new one.",
  "status": "error"
}
```

---

### `GET /api/learning/subjects`

List all subjects the current user is enrolled in, with progress aggregations.
Returns only subjects the user has been added to (not just explored or marked as interested).
Ordered by most recently enrolled first.

```
Response 200:
{
  "data": [
    {
      "id":                          int,
      "name":                        string,
      "status":                      string,   // "ACTIVE" | "COMPLETED"
      "points":                      int,      // total points earned in this subject
      "level_unlocked":              int,      // highest level the user can access (1-3)
      "topics_total":                int,      // total topics in the subject's roadmap
      "topics_passed":               int,      // topics the user has passed (normal + advanced)
      "topics_advanced_passed":      int,      // subset of topics_passed with advanced passed
      "percent_complete":            int,      // 0-100, (topics_passed / topics_total) * 100
      "created_at":                  string,   // ISO 8601, when the user enrolled
      "notification_frequency_hours": int,     // 1-24
      "next_due_at":                 string | null,
      "roadmap_status":              string,   // "NOT_GENERATED" | "GENERATING" | "READY" | "FAILED"
      "current_topic":               { "id": int, "title": string } | null
      // First topic by order in an unlocked level (level <= level_unlocked) not yet passed (normal or advanced).
      // null if all unlocked topics are passed, or the roadmap has no topics yet.
    },
    ...
  ],
  "status": "success"
}
```

---

### `GET /api/learning/subjects/<subject_id>`

Full subject detail for an enrolled subject: metadata, per-level progress
rollups, and the complete topic roadmap with per-topic user status. Topic
content (summary, resource links) is NOT included — call
`GET /api/learning/topics/<topic_id>` separately when the user opens a topic.

While the roadmap is not `READY`, `topics` is empty and every level has `total: 0`.
Returns 404 if the user is not enrolled in this subject.

Topic ordering: `order` is one running number per subject (1..N across all three
levels), not per level. The server does not gate topic access by order. The
"current" topic is a client convention: the first unpassed topic by `order` in an
unlocked level, the same rule `GET /subjects` uses for `current_topic`.

```
Response 200:
{
  "data": {
    "id":                          int,
    "name":                        string,
    "status":                      string,   // "ACTIVE" | "COMPLETED"
    "points":                      int,
    "level_unlocked":              int,      // 1-3
    "created_at":                  string,   // ISO 8601
    "notification_frequency_hours": int,     // 1-24
    "next_due_at":                 string | null,
    "roadmap_status":              string,   // "NOT_GENERATED" | "GENERATING" | "READY" | "FAILED"
    "percent_complete":            int,      // 0-100, rounded down; same value as GET /subjects
    "levels": [
      {
        "level":       int,        // 1, 2, or 3
        "total":       int,        // topics in this level
        "passed":      int,        // topics the user has passed in this level
        "threshold":   int,        // topics to pass to advance: ceil(80% of total), capped at total-1, min 1 (0 if level empty)
        "is_unlocked": boolean     // true if user's level_unlocked >= this level
      }
    ],
    "topics": [
      {
        "id":                  int,
        "title":               string,
        "level":               int,
        "order":               int,
        "content_status":      string,        // "NOT_GENERATED" | "GENERATING" | "READY" | "FAILED"
        "review_status":       string,        // "PENDING" | "PASSED" | "FAILED" | "FLAGGED"
        "user_progress_status": string | null, // null if user hasn't started this topic
        "is_passed":           boolean,
        "completed_at":        string | null
      }
    ]
  },
  "status": "success"
}

Response 404:
{
  "detail": "Not found.",
  "status": "error"
}
```

---

### `POST /api/learning/subjects/<subject_id>/roadmap/retry`

Retry roadmap generation for an enrolled subject (use after `roadmap_status == "FAILED"`).
No-op if the subject already has topics or generation is already running. No request body.

```
Response 200:
{
  "data": {
    "roadmap_status": "NOT_GENERATED" | "GENERATING" | "READY" | "FAILED"
  },
  "status": "success"
}

Response 404 (not enrolled):
{
  "detail": "Not found.",
  "status": "error"
}
```

---

### `GET /api/learning/leaderboard`

Global leaderboard — top 50 users by total accumulated points across all subjects.
Users with `leaderboard_visible = false` are hidden from the list but their points
still affect other users' rank calculations. Tie-breaker: user ID ascending.

```
Response 200:
{
  "data": [
    {
      "rank":          int,    // 1-based position
      "user_id":       int,
      "display_name":  string, // display_name or email fallback
      "total_points":  int     // points across all subjects
    },
    ...
  ],
  "status": "success"
}
```

---

### `GET /api/learning/subjects/<subject_id>/leaderboard`

Per-subject leaderboard — top 20 users by points earned in this subject. Users with
`leaderboard_visible = false` are hidden. Does not require enrollment.

```
Response 200:
{
  "data": [
    {
      "rank":         int,    // 1-based position
      "user_id":      int,
      "display_name": string,
      "points":       int     // points in this subject
    },
    ...
  ],
  "status": "success"
}
```

---

### `GET /api/learning/topics/<topic_id>/leaderboard`

Per-topic mini-leaderboard — top 20 users by points earned on this specific topic.

```
Response 200:
{
  "data": [
    {
      "rank":         int,    // 1-based position
      "user_id":      int,
      "display_name": string,
      "points":       int     // points on this topic
    },
    ...
  ],
  "status": "success"
}
```

---

### `GET /api/learning/topics/<topic_id>/others-learning`

Discover other learners on the same topic. Priority order:
1. Active users at a similar level (±1 level)
2. Users who have completed the topic

Users with `others_learning_visible = false` are excluded. Max 10 results.

```
Response 200:
{
  "data": [
    {
      "user_id":      int,
      "display_name": string,
      "status":       string,   // e.g. "ACTIVE", "COMPLETED"
      "level":        int       // the topic's level (1, 2, or 3)
    },
    ...
  ],
  "status": "success"
}
```

---

### `POST /api/learning/topics/<topic_id>/quiz/generate`

Generate a quiz for a topic. The questions are created by an LLM and validated
against a JSON schema before being returned.

**Cooldown:** 1 hour between quiz generations for the same user + topic + quiz type.

**Question shape** (the `questions` array in the response):
```
[
  {
    "question":       string,   // the question text
    "options":        [string, string, string, string],  // 4 choices
    "correct_index":  int,      // 0–3, index of correct option
    "explanation":    string    // why the correct answer is right
  },
  ...
]
```

```
Request body:
{
  "quiz_type":              "NORMAL" | "ADVANCED",   // optional, defaults to "NORMAL"
  "prior_missed_questions": [string, ...]             // optional, for targeted retry
}

Response 200:
{
  "data": {
    "id":              int,      // quiz attempt ID (used in submit)
    "quiz_type":       string,   // "NORMAL" or "ADVANCED"
    "attempt_number":  int,      // 1-based, increments per retry
    "questions":       [ /* Question objects — see above */ ],
    "total_points":    int       // max possible points (normal: 90–110, advanced: 180–220)
  },
  "status": "success"
}

Response 400:
{
  "detail": "Normal quiz already passed for this topic" |
            "Advanced quiz not available: pass the normal quiz and engage with resource links first" |
            "Please wait N minutes before retaking this quiz" |
            "...",
  "status": "error"
}

Response 503:
{
  "detail": "The AI service is temporarily unavailable. Please try again shortly.",
  "status": "error"
}
```

---

### `POST /api/learning/topics/<topic_id>/quiz/submit`

Submit answers to a quiz and get results. Points are only earned if the user passes (≥60%).
Submission is one-time — re-submitting the same attempt_id returns an error.

```
Request body:
{
  "attempt_id": int,         // ID returned by quiz/generate
  "answers":    [int, ...]   // selected option index (0–3) for each question, same order
}

Response 200:
{
  "data": {
    "id":              int,      // quiz attempt ID
    "passed":          boolean,  // score >= 60% of total_points
    "score":           int,      // points earned (0 if failed)
    "total_points":    int,      // max possible points
    "attempt_number":  int,      // attempt number
    "quiz_type":       string    // "NORMAL" or "ADVANCED"
  },
  "status": "success"
}

Response 400:
{
  "detail": "Quiz already submitted" |
            "Expected N answers, got M" |
            "Answer X is not a valid option index" |
            "...",
  "status": "error"
}
```

---

### `POST /api/learning/topics/<topic_id>/resource-links-viewed`

Mark that the user has read/viewed the resource links for a topic. This is a
prerequisite for taking the advanced quiz.

No request body.

```
Response 200:
{
  "data": {
    "status":                  string,   // current topic progress status (e.g. "NOT_STARTED", "PASSED")
    "resource_links_viewed_at": string | null  // ISO 8601 timestamp, null if not yet viewed
  },
  "status": "success"
}
```

---

### `GET /api/learning/topics/<topic_id>`

Get a topic's metadata and generated content. Use this when the user opens
a topic to read the summary and access resource links before taking quizzes.

```
Response 200:
{
  "data": {
    "id":              int,
    "title":           string,
    "summary":         string,   // AI-generated educational content (empty if not yet generated)
    "resource_links":  [
      {
        "url":   string,
        "type":  string,   // "wikipedia" | "video" | "article"
        "title": string
      }
    ],
    "level":           int,
    "order":           int,
    "content_status":  string,   // "NOT_GENERATED" | "GENERATING" | "READY" | "FAILED"
    "review_status":   string,   // "PENDING" | "PASSED" | "FAILED" | "FLAGGED"
    "subject_id":      int,
    "subject_name":    string
  },
  "status": "success"
}
```

---

## Realtime events — `/api/events`

### `GET /api/events`

Server-Sent Events stream (`text/event-stream`), authenticated by the `access_token` cookie
(use `new EventSource(url, { withCredentials: true })`). Each user is automatically subscribed to
their own channel `user-<id>`; any `?channel=` query is ignored. Unauthenticated requests are rejected (403).

Events are **not replayable** — the database is the source of truth. After (re)connecting, refetch
`GET /api/learning/subjects/<id>` to reconcile.

### Event: `roadmap.status`

Sent to every enrolled user when a subject's roadmap status changes (generation finished or failed).

```
event: roadmap.status
data: {
  "subject_id":     int,
  "roadmap_status": "NOT_GENERATED" | "GENERATING" | "READY" | "FAILED",
  "topic_count":    int
}
```
