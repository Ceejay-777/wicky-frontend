# Dev server: HTTP or HTTPS

The web app has two dev scripts in `apps/web/package.json`. They both use port 3000 but speak different protocols.

| Script | Protocol | Open it at |
| --- | --- | --- |
| `pnpm dev` (`next dev`) | HTTP | `http://localhost:3000` |
| `pnpm dev:https` (`next dev --experimental-https`) | HTTPS only | `https://localhost:3000` |

## The trap

With `dev:https`, a plain `http://localhost:3000` request is not redirected and gets no error page. The TLS server drops it,
so the client sees an empty reply or a reset within a few milliseconds. Browsers on `https://` work fine, which makes the
server look healthy to a person and dead to any script, curl, test runner or tool that uses `http://`.

It looks like a hung or crashed server, but nothing in the logs or in `netstat` shows a problem. It once cost a long
debugging session that wrongly blamed the `.next` cache.

## Check which one is running

```powershell
# the parent process command line shows the flag
netstat -ano | findstr :3000                      # find the PID
Get-CimInstance Win32_Process -Filter "ProcessId=<pid>" | Select-Object ParentProcessId
Get-CimInstance Win32_Process -Filter "ProcessId=<parent>" | Select-Object CommandLine   # ... next dev --experimental-https ?
```

Or just try both. One of them answers:

```bash
curl -s  -o /dev/null -w "%{http_code}\n" http://localhost:3000/signin
curl -sk -o /dev/null -w "%{http_code}\n" https://localhost:3000/signin   # -k: the dev certificate is self-signed
```

If `http` resets and `https` returns 200, the server is fine and is running `dev:https`.

## Rules

- Before calling the dev server broken, probe it with `curl -k https://localhost:3000/...` as well as `http://`.
- Anything that talks to the dev server must use the right origin:
  - `docs/screenshots/capture.cjs` defaults to `http://localhost:3000`. With `dev:https`, pass `BASE_URL=https://localhost:3000`
    and expect a certificate warning to need handling (the dev certificate is self-signed).
  - `EventSource` and `fetch` in the app use relative URLs, so they follow the page origin (`docs/realtime-events.md`).
- The BE on port 8000 is plain HTTP. Only the web dev server changes.
- Do not run a second `next dev` or a `next build` in `apps/web` while a dev server is up. They share `.next`, Next allows only
  one dev server per app (lock in `.next/dev`), and the second process can leave torn generated files such as
  `.next/dev/types/routes.d.ts`. If that happens, stop the server, delete `apps/web/.next` (`pnpm clean`) and start again.
  To test a production build while developing, stop the dev server first.
