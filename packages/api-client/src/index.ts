// Pass 2: Typed API calls to the Django/DRF backend.
// All endpoints from api-reference.md will be wired here —
// the apiClient wraps fetch with JWT cookie auth, base URL, and error handling.

interface RequestConfig {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  body?: unknown;
}

export type ApiCaller = <T>(config: RequestConfig) => Promise<T>;

let _caller: ApiCaller = () => {
  throw new Error("apiClient not initialized — call configureApiClient() first");
};

export function configureApiClient(caller: ApiCaller): void {
  _caller = caller;
}

export const apiClient = {
  get: <T>(path: string) => _caller<T>({ method: "GET", path }),

  post: <T>(path: string, body?: unknown) =>
    _caller<T>({ method: "POST", path, body }),

  patch: <T>(path: string, body?: unknown) =>
    _caller<T>({ method: "PATCH", path, body }),

  delete: <T>(path: string) => _caller<T>({ method: "DELETE", path }),
};

export { ApiRequestError, parseApiError, parseErrorDetail, type FieldErrors } from "./errors";
