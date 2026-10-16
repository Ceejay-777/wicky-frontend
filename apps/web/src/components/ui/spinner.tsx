import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// The one loading indicator in the app. Swap this file's body to change it everywhere
// (see docs/future-plans/custom-loader.md).
export function Spinner({ className }: { className?: string }) {
  return <IconLoader2 aria-hidden className={cn("animate-spin", className)} />;
}
