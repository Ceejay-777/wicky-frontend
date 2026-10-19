# Screenshots

Visual checks of built pages, kept in the repo so they can be compared and reverted with git.
Put new captures in `docs/screenshots/<stage>/` (for example `docs/screenshots/topic/`), never in a temp folder.

## How they are made

`capture.cjs` signs in, then screenshots each page at three widths in light and dark:

| Suffix | Viewport |
|---|---|
| `m` | 390 x 844 (mobile) |
| `t` | 820 x 1100 (tablet) |
| `d` | 1366 x 850 (desktop) |

Each page also gets a `-m|t|d-light-end.png`, scrolled to the bottom. The script prints whether the page
scrolls horizontally and any console errors.

### Steps

1. Run the BE (`API_BASE` in `apps/web/.env.local`, default `http://localhost:8000`).
2. Start the FE: `pnpm --filter web dev` (port 3000). If real pages 404, delete `apps/web/.next` and restart.
3. Pick pages the test account can open. Topic ids come from `GET /api/learning/subjects/<id>`
   (a level above `level_unlocked` shows the locked screen; `GENERATING` shows the preparing screen).
4. Run from the repo root. Give pages without a leading slash (Git Bash turns `/topics/88` into a Windows path):

```bash
WICKY_EMAIL=<test account email> WICKY_PASSWORD=<password> \
PLAYWRIGHT_PATH=<folder of the playwright package> \
CHROME_PATH=<chrome or chromium executable> \
node docs/screenshots/capture.cjs docs/screenshots/topic topics/88 topics/87
```

`PLAYWRIGHT_PATH` and `CHROME_PATH` are only needed when `playwright` is not installed in the repo or its
browser download is missing. Credentials come from the environment and are never stored in the repo.
On this machine the global install worked:

- `PLAYWRIGHT_PATH=C:/Users/coven/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright`
- `CHROME_PATH=C:/Users/coven/AppData/Local/ms-playwright/chromium-1223/chrome-win64/chrome.exe`
  (use a Windows path; Git Bash style `/c/...` paths fail in Node)
