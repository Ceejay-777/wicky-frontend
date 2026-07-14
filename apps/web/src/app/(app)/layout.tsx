import { BottomNav } from "@/components/nav/bottom-nav";
import { cn } from "@/lib/utils";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main
        className={cn(
          "pb-16",
          "lg:pb-0 lg:pl-60"
        )}
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
