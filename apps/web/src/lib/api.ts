import { configureApiClient } from "@wicky/api-client";
import type { ApiSuccess, ApiError } from "@wicky/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

let initialized = false;

export function initApiClient(): void {
  if (initialized) return;
  initialized = true;

  configureApiClient(
    (async ({ method, path, body }) => {
      const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        let detail: string;
        try {
          const errBody = (await res.json()) as Partial<ApiError> & { detail?: string };
          detail = errBody.detail ?? `Request failed with status ${res.status}`;
        } catch {
          detail = `Request failed with status ${res.status}`;
        }
        throw new ApiRequestError(detail, res.status);
      }

      if (res.status === 204) return undefined as never;
      return (await res.json()) as ApiSuccess<unknown>;
    }) as Parameters<typeof configureApiClient>[0],
  );
}

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}
