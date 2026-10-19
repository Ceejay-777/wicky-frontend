# Replace the default spinner with a custom loader

## Problem

Buttons show a generic spinner (tabler `IconLoader2`) while a request is pending. It works but is not on brand for the Passport direction.

## Plan

1. Design the loader (for example an ink stamp pressing down, or a stamp-pad pulse) in the design canvas, light and dark.
2. Replace the body of `apps/web/src/components/ui/spinner.tsx`. It is the only place the indicator is defined, and `Button` renders it through its `loading` prop, so every form picks it up with no other change.
3. Keep `aria-hidden` on the graphic. The button already carries `aria-busy` and the pending label text.
4. Respect `prefers-reduced-motion`: show a static or very slow version.
5. Size it to the button's `[&_svg]:size-5` rule, or update that rule if the new loader is not an SVG.

## Cost

One component and one design. No call sites change.
