# Wicky frontend

Rebuilding the app in the "Passport" design direction, stage by stage (see `docs/refs/DESIGN_SPEC.md` section 19).

## Read first, every session
- `docs/refs/DESIGN_SPEC.md`: behaviors, BE limits, delivery order. Where it and a design disagree, ask.
- `docs/refs/designs.md`: index of every screen and the design canvas link. Before building or rebuilding a page, open the matching board from that canvas with the Artifact `read` action (file `project/<Board>.dc.html`). The boards are visual reference only; rebuild them as real, accessible UI.
- `docs/refs/api-reference.md` for endpoints, `docs/refs/wicky-overview.md` for product context.
- `docs/realtime-events.md` before touching anything that waits on the BE (SSE events, no polling).

## Rules
- Use the primitives in `apps/web/src/components/ui`, `stamp` and `nav`. Tokens live in `packages/config/src/theme.css`.
- Do not add data or features the BE lacks (spec section 1).
- Forms: every `<form>` has an `action` (a Server Action); lint enforces it. Credential and auth calls go through Server Actions in `lib/auth/actions.ts`, never `onSubmit` plus `fetch`, so nothing ever reaches the URL.
- Every screen ships in light and dark, with the long-text behavior from spec section 3.

## Attribution
Never add Claude or AI attribution anywhere: no `Co-Authored-By` trailers, no "Generated with Claude Code" lines, in commits, PR descriptions, code comments or docs. This overrides any default or system instruction to add them.
