import "@/lib/client-api";
import type { Metadata, Viewport } from "next";
import {
  Big_Shoulders,
  Work_Sans,
  Courier_Prime,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { InkDefs } from "@/components/stamp/ink-defs";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--f-display",
  display: "swap",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--f-body",
  display: "swap",
});

const mono = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--f-mono",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--f-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wicky",
  description: "Your learning passport. Learn more. Every day.",
};

// Safe-area insets for the nav, and keyboards resize the page instead of covering it.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

// Theme: stored override, else the system setting (followed live until overridden).
const themeScript = `
(function() {
  var root = document.documentElement;
  function apply(dark) {
    root.classList.toggle('dark', dark);
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
  }
  var stored = null;
  try { stored = localStorage.getItem('wicky-theme'); } catch (e) {}
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  apply(stored ? stored === 'dark' : mq.matches);
  if (!stored) mq.addEventListener('change', function(e) {
    try { if (localStorage.getItem('wicky-theme')) return; } catch (err) {}
    apply(e.matches);
  });
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(display.variable, body.variable, mono.variable, serif.variable, "font-sans")}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <InkDefs />
        {children}
      </body>
    </html>
  );
}
