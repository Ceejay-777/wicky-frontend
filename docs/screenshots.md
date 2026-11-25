# Capturing screenshots

How to take visual-check screenshots of the running app. The images are never kept in the repo: capture, look, delete. The script lives in this file (section 5); copy it into a scratch folder to run it.

## 1. What a capture gives you

Each page is shot at three widths, in light and dark:

| Suffix | Viewport |
|---|---|
| `m` | 390 x 844 (mobile) |
| `t` | 820 x 1100 (tablet) |
| `d` | 1366 x 850 (desktop) |

Output files are named `<page-slug>-<m|t|d>-<light|dark>.png`, plus `<slug>-m-light-end.png` scrolled to the bottom. The script prints whether the page scrolls horizontally and any console errors.

## 2. Before you run anything

1. Run the BE (`API_BASE` in `apps/web/.env.local`, default `http://localhost:8000`).
2. Start the FE: `pnpm --filter web dev` (port 3000). If real pages 404, delete `apps/web/.next` and restart. See `docs/dev-server.md`: with `dev:https` the origin is `https://localhost:3000`, so pass `BASE_URL` and let the browser ignore the self-signed certificate (`ignoreHTTPSErrors: true`).
3. Have a test account. The access token lives 15 minutes, so the scripts sign in on every run. Pass credentials through the environment (`WICKY_EMAIL`, `WICKY_PASSWORD`). Never write them to a file, a script or a commit. The `.env` files hold only `API_BASE`, not logins.
4. Pick pages the test account can open. Topic ids come from `GET /api/learning/subjects/<id>`. A level above `level_unlocked` shows the locked screen, `GENERATING` shows the preparing screen, and a quiz needs a topic that is `READY`, not passed and not in cooldown.

## 3. Run it

From the repo root. Give pages without a leading slash (Git Bash turns `/topics/88` into a Windows path):

```bash
WICKY_EMAIL=<test account email> WICKY_PASSWORD=<password> PLAYWRIGHT_PATH=<folder of the playwright package> CHROME_PATH=<chrome or chromium executable> node <scratch>/capture.cjs <out-dir> topics/88 topics/87
```

`PLAYWRIGHT_PATH` and `CHROME_PATH` are only needed when `playwright` is not installed in the repo or its browser download is missing. On this machine the global install worked (use Windows paths; Git Bash style `/c/...` paths fail in Node):

- `PLAYWRIGHT_PATH=C:/Users/coven/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright`
- `CHROME_PATH=C:/Users/coven/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe`

A full run takes minutes, so run it in the background and read the output when it ends. Delete the images when you are done looking.

## 4. Gotchas

- **Next dev badge.** In dev, the Next "N" badge floats over the top left of the page and intercepts clicks (an exit or back control there never gets clicked). Hide it: `nextjs-portal{display:none!important}` through `addInitScript`.
- **Two alerts.** Next adds its own hidden `role="alert"` route announcer, so `getByRole("alert")` matches two elements and Playwright errors in strict mode. Find the app alert by its text.
- **Leave-page prompts.** The quiz page warns before unloading; accept dialogs with `page.on("dialog", d => d.accept())`.
- **Quiz attempts and cooldown.** `quiz/generate` is safe to call: it returns the learner's unfinished attempt, and the one hour cooldown only counts **submitted** quizzes. A real submit is the thing that starts a cooldown and changes progress, so a capture never submits for real. The question page can be captured on mocked `**/quiz/generate` and `**/quiz/submit` responses (section 6).
- **Result and review are server rendered.** They read the attempt from the BE on the server (`?attempt=<id>`, or the latest submitted attempt), so the browser cannot mock them. Capturing them needs a real submitted attempt in the test account. Without one they show "Nothing to show".

## 5. Script: any page (`capture.cjs`)

```js
// Logs in and screenshots one or more pages at mobile, tablet and desktop, in light and dark.
// Usage (from the repo root, with the FE on :3000 and the BE running):
//   WICKY_EMAIL=you@example.com WICKY_PASSWORD=... node docs/screenshots/capture.cjs <out-dir> topics/88 topics/87
// Output: <out-dir>/<page-slug>-<m|t|d>-<light|dark>.png, plus <slug>-m-light-end.png (scrolled to the bottom).
// Env: PLAYWRIGHT_PATH (folder of the playwright package, default: require("playwright")),
//      CHROME_PATH (a chromium/chrome executable, when playwright's own download is missing),
//      BASE_URL (default http://localhost:3000).
const fs = require("fs");
const path = require("path");

const { chromium } = require(process.env.PLAYWRIGHT_PATH || "playwright");
const BASE = process.env.BASE_URL || "http://localhost:3000";
const SIZES = [["m", 390, 844], ["t", 820, 1100], ["d", 1366, 850]];

// Pages are given without a leading slash (topics/88): Git Bash rewrites "/topics/88" into a Windows path.
const [outDir, ...rawPages] = process.argv.slice(2);
const pages = rawPages.map((p) => "/" + p.replace(/^\/+/, ""));
if (!outDir || !pages.length || !process.env.WICKY_EMAIL || !process.env.WICKY_PASSWORD) {
  console.error("usage: WICKY_EMAIL=... WICKY_PASSWORD=... node docs/screenshots/capture.cjs <out-dir> <path without leading slash>...");
  process.exit(1);
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});

  // The access token lives 15 minutes, so log in on every run instead of reusing a saved session.
  const login = await browser.newContext();
  const lp = await login.newPage();
  await lp.goto(`${BASE}/signin`, { waitUntil: "networkidle", timeout: 120000 });
  await lp.fill("input[type=email]", process.env.WICKY_EMAIL);
  await lp.fill("input[type=password]", process.env.WICKY_PASSWORD);
  await lp.click("button[type=submit]");
  await lp.waitForURL((u) => !u.pathname.startsWith("/signin"), { timeout: 60000 });
  const storageState = await login.storageState();
  await login.close();

  for (const page of pages) {
    const slug = page.replace(/^\//, "").replace(/[^\w]+/g, "-");
    for (const [name, width, height] of SIZES) {
      for (const theme of ["light", "dark"]) {
        const ctx = await browser.newContext({ storageState, viewport: { width, height }, colorScheme: theme });
        const p = await ctx.newPage();
        const errors = [];
        p.on("pageerror", (e) => errors.push(e.message));
        p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
        await p.goto(BASE + page, { waitUntil: "networkidle", timeout: 120000 });
        await p.waitForTimeout(800);
        await p.screenshot({ path: path.join(outDir, `${slug}-${name}-${theme}.png`) });
        if (theme === "light") {
          await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await p.waitForTimeout(500);
          await p.screenshot({ path: path.join(outDir, `${slug}-${name}-light-end.png`) });
          const hscroll = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
          console.log(page, name, "horizontal scroll:", hscroll, "console errors:", errors.slice(0, 3));
        }
        await ctx.close();
      }
    }
  }
  await browser.close();
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
```

## 6. Script: the quiz pages (`capture-quiz.cjs`)

Not kept in this doc. The first version mocked the old quiz API (questions returned by `generate`, answers revealed per question), which the BE has replaced: `generate` returns `GENERATING` or `READY`, questions carry no answers, and result and review are read on the server. Write a new one from the pattern in section 5 when needed:

- Hub: `/quiz`, real BE.
- Question page: `page.route("**/quiz/generate")` answering `{data: {id, status: "READY", resumed: false, quiz_type: "NORMAL", attempt_number: 1, questions: [{question, options: [a, b, c, d]}], question_count, total_points, answers: null, results: null, score: 0, passed: false, submitted_at: null, correct_count: null}, status: "success"}`; delay it to catch "Writing your quiz". Click `[role=radio]`, then "Next question" / "Finish quiz". Mock `**/quiz/submit` the same way, or let the last click fail to capture the submit error.
- Exit dialog: the "Exit quiz" button in the top bar.
- Result and review: a real submitted attempt, then `/topics/<id>/quiz/result?attempt=<id>` and `.../result/review?attempt=<id>`.
