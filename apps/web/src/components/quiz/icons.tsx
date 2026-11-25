import type { ReactNode } from "react";

// Paths copied from the quiz boards so the glyphs match the design exactly.
function Icon({ size, strokeWidth, children }: { size: number; strokeWidth: number; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      {children}
    </svg>
  );
}

export const CrossIcon = ({ size = 14 }: { size?: number }) => (
  <Icon size={size} strokeWidth={3}><path d="M6 6 L18 18 M18 6 L6 18" /></Icon>
);
export const CloseIcon = ({ size = 24 }: { size?: number }) => (
  <Icon size={size} strokeWidth={2}><path d="M6 6 L18 18 M18 6 L6 18" /></Icon>
);
export const ArrowIcon = ({ size = 22 }: { size?: number }) => (
  <Icon size={size} strokeWidth={2}><path d="M5 12 H19 M13 6 l6 6 l-6 6" /></Icon>
);
