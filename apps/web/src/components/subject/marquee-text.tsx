"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type MarqueeTextProps = {
  text: string;
  className?: string;
};

export function MarqueeText({ text, className }: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overflowOffset, setOverflowOffset] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkOverflow = () => {
      const { scrollWidth, clientWidth } = container;
      setOverflowOffset(Math.max(0, scrollWidth - clientWidth));
    };

    const mediaQuery = window.matchMedia("(max-width: 639px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsSmallScreen(e.matches);
      checkOverflow();
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(container);

    checkOverflow();

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      resizeObserver.disconnect();
    };
  }, [text]);

  const shouldMarquee = isSmallScreen && overflowOffset > 0;

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <span
        style={
          shouldMarquee
            ? ({ "--marquee-overflow": `${overflowOffset}px` } as React.CSSProperties)
            : undefined
        }
        className={cn(
          "whitespace-nowrap block",
          shouldMarquee && "text-left animate-marquee",
        )}
      >
        {text}
      </span>
    </div>
  );
}
