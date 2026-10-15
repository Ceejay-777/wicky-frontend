import "server-only";
import {
  configureApiClient,
  parseApiError,
  type ApiCaller,
} from "@wicky/api-client";
import { cookies } from "next/headers";

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

    if (res.status === 204) return undefined as never;

    const json = await res.json();
    console.log(`[server-api] ${method} ${path} →`, JSON.stringify(json, null, 2));   // ← temp
return json;
};

configureApiClient(caller);
