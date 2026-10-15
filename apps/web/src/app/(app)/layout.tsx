import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { preconnect } from "react-dom";
import { AppShell } from "@/components/nav/app-shell";
import type { NavProfile } from "@/components/nav/app-nav";
import { getProfile } from "@/lib/auth/service.server";

// Chrome only: a failed profile fetch must not take the whole shell down.
async function navProfile(): Promise<NavProfile> {
  try {
    const { display_name } = await getProfile();
    const initials = display_name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    return { name: display_name, initials: initials || "?" };
  } catch {
    return null;
  }
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  preconnect("https://learnerhq-production.up.railway.app");

  const cookieStore = await cookies();
  if (!cookieStore.get("access_token")) {
    redirect("/signin");
  }

  return <AppShell profile={await navProfile()}>{children}</AppShell>;
}
