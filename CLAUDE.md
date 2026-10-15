# Wicky frontend

Rebuilding the app in the "Passport" design direction, stage by stage (see `refs/DESIGN_SPEC.md` section 19).

## Read first, every session
- `refs/DESIGN_SPEC.md`: behaviors, BE limits, delivery order. Where it and a design disagree, ask.
- `refs/designs.md`: index of every screen and the design canvas link. Before building or rebuilding a page, open the matching board from that canvas with the Artifact `read` action (file `project/<Board>.dc.html`). The boards are visual reference only; rebuild them as real, accessible UI.
- `refs/api-reference.md` for endpoints, `refs/wicky-overview.md` for product context.

## Rules
- Use the primitives in `apps/web/src/components/ui`, `stamp` and `nav`. Tokens live in `packages/config/src/theme.css`.
- Do not add data or features the BE lacks (spec section 1).
- Every screen ships in light and dark, with the long-text behavior from spec section 3.
