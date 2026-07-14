"use client";

import { useEffect } from "react";
import { initApiClient } from "@/lib/api";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initApiClient();
  }, []);
  return <>{children}</>;
}
