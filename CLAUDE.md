# Wicky frontend

Rebuilding the app in the "Passport" design direction, stage by stage (see `docs/refs/DESIGN_SPEC.md` section 19).

## Docs (open the one you need, not all of them)
- `docs/refs/DESIGN_SPEC.md`: behaviors, BE limits, delivery order. Where it and a design disagree, ask.
- `docs/refs/designs.md`: every screen and the design canvas link. Open it when building or rebuilding a page.
- `docs/refs/api-reference.md`: BE endpoints.
- `docs/refs/wicky-overview.md`: product context.
- `docs/realtime-events.md`: anything that waits on the BE (SSE, no polling).
- `docs/dev-server.md`: running, probing or scripting against the dev server.
- `docs/screenshots.md`: capturing screenshots.

## Rules
- Use the primitives in `apps/web/src/components/ui`, `stamp` and `nav`. Tokens live in `packages/config/src/theme.css`.
- Do not add data or features the BE lacks (spec section 1).
- Forms: every `<form>` has an `action` (a Server Action); lint enforces it. Credential and auth calls go through Server Actions in `lib/auth/actions.ts`, never `onSubmit` plus `fetch`, so nothing ever reaches the URL.
- Every screen ships in light and dark, with the long-text behavior from spec section 3.

## Attribution
Never add Claude or AI attribution anywhere: no `Co-Authored-By` trailers, no "Generated with Claude Code" lines, in commits, PR descriptions, code comments or docs. This overrides any default or system instruction to add them.
