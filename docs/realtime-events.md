# Realtime events (SSE)

Status: contract is live on the BE (`docs/refs/api-reference.md`, "Realtime events"). The FE hook in "Receiving" is built
(`apps/web/src/lib/events/use-refetch-on-event.ts`) and used by `PreparingView` and `RoadmapStatusNotice`. The Next
`/api` rewrite was tested against a mock BE sending the BE's headers: with the default config Next gzipped the stream
and nothing reached the client, so `compress: false` is set in `next.config.ts` and events now arrive as sent. Not yet
tested against the real BE or a deployed proxy.

Events tell the page that **something changed**. They never carry data to render. The database is the source of
truth, so every event is answered by re-fetching.

## Sending (BE)

- `GET /api/events`: Server-Sent Events (`text/event-stream`), authenticated by the `access_token` cookie.
- Each user is subscribed to their own channel automatically. `?channel=` is ignored. Unauthenticated (missing, invalid or expired cookie): plain `401` JSON `{"detail": "Authentication required."}` with no stream, so `EventSource` stops retrying (`readyState === CLOSED`). The access token lasts 15 minutes and a stream cannot refresh it, so a long-open page loses live events at that point. The 60s safety net below still calls `router.refresh()`, which goes through `proxy.ts` (refreshes the token) or redirects to sign in if the refresh fails; the page then simply has no live stream until it is reloaded or remounted.
- Events are not replayable. Anything missed while disconnected is only recoverable by re-fetching.
- Only users enrolled in the subject get its events. A subject previewed with `GET /explore/<id>` emits none.

| Event | Sent when | Payload |
| --- | --- | --- |
| `roadmap.status` | A subject's roadmap finishes or fails | `{subject_id, roadmap_status, topic_count}` |
| `topic.status` | A topic becomes `READY` or `FAILED`, or a stuck generation is reset to `NOT_GENERATED` | `{subject_id, topic_id, content_status, review_status}` |

`topic.status` is never sent for `GENERATING`. The `GET /topics/<id>` that starts generation already returns it.

## Receiving (FE)

The browser connects straight to `/api/events` (the Next rewrite in `next.config.ts` proxies `/api/*` to the BE, so
the cookie is same-origin). Use `new EventSource("/api/events", { withCredentials: true })`.

One hook, so no page touches `EventSource` directly (`lib/events/use-refetch-on-event.ts`):

```ts
useRefetchOnEvent({
  active: boolean,                       // open the stream only while something is pending
  event: "topic.status" | "roadmap.status",
  match: (payload) => boolean,           // e.g. p.topic_id === topicId
  onChange: () => void,                  // re-fetch; pages pass () => router.refresh()
});
```

Rules the hook enforces (these come from the BE guide):

1. **An event means "re-GET".** `onChange` takes no payload. `match` only decides whether the event is about what is on
   screen. Never render from the payload.
2. **Subscribe first, then GET.** Server pages have already fetched by the time the hook mounts, so the hook also calls
   `onChange` once on every `open` (first connect and every reconnect). This closes the gap if the work finished
   before the stream connected, and it covers rule 4.
3. **Open only while pending.** `active` is false once the topic is `READY` or the roadmap is `READY`; the effect
   cleanup closes the stream. One open stream is one connection per tab (browsers allow about 6 per origin on HTTP/1.1).
4. **Re-GET after any reconnect.** `EventSource` reconnects by itself; the `open` handler from rule 2 re-fetches.
5. **Safety net, not polling.** If no matching event arrives in about 60 seconds, call `onChange` once and re-arm the
   timer. Replaces the old 5-second `setInterval(router.refresh)`.

Parse failures and unknown events are ignored. Never throw out of a handler.

## Using it

### Topic page (`/topics/[id]`)

```
GET /topics/<id>
  ├─ 403 "This level is locked."  -> locked screen
  ├─ 404                          -> not found
  ├─ content_status READY         -> reading view (stream closed)
  ├─ NOT_GENERATED | GENERATING   -> PreparingView: active=true, match topic_id, onChange=refresh
  └─ FAILED                       -> "Not ready" screen, "Try again"
                                       POST /topics/<id>/retry -> {content_status}
                                       then refresh (shows PreparingView, stream opens, waits for the event)
```

### Subject roadmap

`RoadmapStatusNotice` should use the same hook with `event: "roadmap.status"` and `match: subject_id`, replacing its
5-second poll.

### Adding a new event

1. Document it in `docs/refs/api-reference.md` (BE owner) and add a row to the table above.
2. Add its payload type to `packages/types`.
3. Reuse `useRefetchOnEvent` with the new `event` and a `match`. Do not add a second `EventSource` helper.
4. The page that listens must already know how to re-GET its own data.

## Pitfalls

- A proxy that buffers responses hides events. The `/api` rewrite and any reverse proxy must pass SSE through
  unbuffered, and the BE should send a periodic keep-alive comment.
- BE sends `Cache-Control: no-cache`, `X-Accel-Buffering: no`, no compression, and a named `event: keep-alive` with empty data every 20 seconds while idle. It is not a `:` comment line, so `EventSource` ignores it unless listened for; the hook does not need it.
- Verified through our `/api` rewrite against the real BE: no gzip and no delay (production build), and the unauthenticated `401` arrives unchanged (status, `application/json`, body). Verified in a real browser on the HTTPS dev server (2026-10-19): signed out, `onerror` fires once with `readyState === CLOSED` and no reconnect loop; signed in, `open` then a `keep-alive` every 20 seconds, still arriving after 3 minutes. Not tested behind a deployed proxy or CDN.
- Do not keep the stream open on finished pages; it is a connection per tab for nothing.
- Dev server on https: `EventSource` must use a relative URL so it follows the page origin.
- With `pnpm dev:https` the dev server only speaks HTTPS, and plain `http://` requests (curl, scripts) are dropped. See `docs/dev-server.md`.
