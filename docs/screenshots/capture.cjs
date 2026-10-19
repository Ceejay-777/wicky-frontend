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
