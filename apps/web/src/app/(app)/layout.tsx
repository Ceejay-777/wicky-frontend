import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BottomNav } from "@/components/nav/bottom-nav";
import { cn } from "@/lib/utils";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  if (!cookieStore.get("access_token")) {
    redirect("/signin");
  }

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
