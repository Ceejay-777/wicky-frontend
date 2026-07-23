import {
  configureApiClient,
  ApiRequestError,
  parseErrorDetail,
  type ApiCaller,
} from "@wicky/api-client";
import type { ApiSuccess } from "@wicky/types";

const caller: ApiCaller = (async ({ method, path, body }) => {
  const res = await fetch(path, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new ApiRequestError(await parseErrorDetail(res), res.status);
  }

  if (res.status === 204) return undefined as never;
  return (await res.json()) as ApiSuccess<unknown>;
}) as ApiCaller;

configureApiClient(caller);