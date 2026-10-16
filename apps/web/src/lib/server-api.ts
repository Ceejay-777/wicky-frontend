import "server-only";
import {
  configureApiClient,
  parseApiError,
  type ApiCaller,
} from "@wicky/api-client";
import { cookies } from "next/headers";
import { parseSetCookie } from "@/lib/auth/set-cookie";

const API_BASE = (process.env.API_BASE ?? "").replace(/\/$/, "");

// Server caller — cookies must be read and forwarded manually per-request.
const caller: ApiCaller = async ({ method, path, body }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const cookieParts: string[] = [];
  if (accessToken) cookieParts.push(`access_token=${accessToken}`);
  if (refreshToken) cookieParts.push(`refresh_token=${refreshToken}`);

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(cookieParts.length ? { Cookie: cookieParts.join("; ") } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw await parseApiError(res);
  }

  // Sign up / sign in: hand the BE's session cookies to the browser. Only Server Actions may
  // set cookies, and only auth endpoints send any, so reads during render never reach this.
  for (const header of res.headers.getSetCookie()) {
    const { name, value, ...options } = parseSetCookie(header);
    cookieStore.set(name, value, options);
  }

  if (res.status === 204) return undefined as never;
  return await res.json();
};

configureApiClient(caller);
