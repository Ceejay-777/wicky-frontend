# Self-host Big Shoulders with `next/font/local`

## Problem

`next dev` and `next build` print:

```
Failed to find font override values for font `Big Shoulders`
Skipping generating a fallback font.
```

`next/font/google` builds a size-matched fallback font from a built-in metrics database. Big Shoulders is not in it, so no fallback is generated. The font still loads and renders. The only effect is a small layout shift in the headlines when the real font swaps in.

## Plan

1. Download the Big Shoulders Display variable font (`.woff2`, weights 700 to 900) from Google Fonts or `@fontsource`.
2. Put it in the repo, for example `apps/web/src/app/fonts/BigShouldersDisplay-Variable.woff2`.
3. In `apps/web/src/app/layout.tsx`, replace the `Big_Shoulders` call from `next/font/google` with `localFont` from `next/font/local`:
   - `src` pointing at the file, `weight: "700 900"`, `variable: "--f-display"`, `display: "swap"`.
   - `adjustFontFallback: "Arial"` so Next computes the fallback metrics from the file itself.
4. Leave `--font-display` in `globals.css` as is (its `"Arial Narrow"` fallback stays).
5. Run `pnpm dev:https` and check the warning is gone and the headlines do not jump on load.

## Why this over silencing it

- Fixes the layout shift instead of hiding the warning (`adjustFontFallback: false` only silences it).
- Removes the runtime request to Google Fonts for this font, in line with the spec's rule to self-host fonts or load them in a performance-safe way (`docs/refs/DESIGN_SPEC.md` section 2.3).

## Cost

- One font file added to the repo.
- Check the font's licence (SIL OFL) allows redistribution in the repo.

## Alternative (not chosen)

Keep `next/font/google` and hand-write a fallback `@font-face` (local Arial with `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override`) from Big Shoulders' metrics. Same result, more CSS to maintain.
