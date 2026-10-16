import { NextResponse, type NextRequest } from "next/server";
import { parseSetCookie } from "@/lib/auth/set-cookie";

const API_BASE = (process.env.API_BASE ?? "").replace(/\/$/, "");

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Credentials in a URL are always a bug (a form that fell back to a native GET). Drop the query so
  // they don't stay in the address bar or history. This cannot un-log the request; the lint rule
  // that requires `action` on every <form> is what prevents it.
  if (request.method === "GET" && searchParams.has("password")) {
    const clean = request.nextUrl.clone();
    clean.search = "";
    return NextResponse.redirect(clean);
  }

  // access_token lives 15 minutes and its cookie expires with it; refresh_token lives 7 days.
  // Refresh here so Server Components and /api calls in this same request see the new tokens.
  const refreshToken = request.cookies.get("refresh_token")?.value;
  if (!request.cookies.has("access_token") && refreshToken && !pathname.startsWith("/api/auth/")) {
    const res = await fetch(`${API_BASE || request.nextUrl.origin}/api/auth/refresh`, {
      method: "POST",
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });
    const cookies = res.ok ? res.headers.getSetCookie().map(parseSetCookie) : [];
    // On failure leave the cookies alone: a parallel request may already have rotated them.
    if (cookies.length) {
      for (const { name, value } of cookies) request.cookies.set(name, value);
      const response = NextResponse.next({ request: { headers: request.headers } });
      for (const { name, value, ...options } of cookies) response.cookies.set(name, value, options);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
