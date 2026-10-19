import type { ReactNode } from "react";

// Paths copied from the topic reading boards so the glyphs match the design exactly.
function Icon({ size, strokeWidth = 2, children }: { size: number; strokeWidth?: number; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      {children}
    </svg>
  );
}

export const BookIcon = ({ size = 20 }: { size?: number }) => (
  <Icon size={size}><path d="M4 5 a2 2 0 0 1 2-2 h12 v16 H6 a2 2 0 0 0-2 2 Z M4 19 V5" /></Icon>
);
export const WikiIcon = ({ size = 22 }: { size?: number }) => (
  <Icon size={size}><path d="M3 6 L7 18 L12 8 L17 18 L21 6" /></Icon>
);
export const VideoIcon = ({ size = 22 }: { size?: number }) => (
  <Icon size={size}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M10 9 L15 12 L10 15 Z" fill="currentColor" /></Icon>
);
export const ArticleIcon = ({ size = 22 }: { size?: number }) => (
  <Icon size={size}><path d="M6 3 h8 l4 4 v14 H6 Z M14 3 v4 h4 M9 12 h6 M9 16 h6" /></Icon>
);
export const ExternalIcon = ({ size = 18 }: { size?: number }) => (
  <Icon size={size}><path d="M7 17 L17 7 M9 7 H17 V15" /></Icon>
);
export const LockIcon = ({ size = 14 }: { size?: number }) => (
  <Icon size={size}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11 V8 a4 4 0 0 1 8 0 V11" /></Icon>
);
export const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <Icon size={size} strokeWidth={3}><path d="M5 12.5 l4.5 4.5 L19 7" /></Icon>
);
export const AlertIcon = ({ size = 18 }: { size?: number }) => (
  <Icon size={size}><circle cx="12" cy="12" r="9" /><path d="M12 7 v6 M12 16.5 v.01" /></Icon>
);
