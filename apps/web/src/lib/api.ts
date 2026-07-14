import {
  configureApiClient,
  type ApiCaller,
  ApiRequestError,
} from "@wicky/api-client";
import type { ApiSuccess, ApiError } from "@wicky/types";

const caller: ApiCaller = (async ({ method, path, body }) => {
  const res = await fetch(path, {
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
}) as ApiCaller;

configureApiClient(caller);

export { ApiRequestError };
