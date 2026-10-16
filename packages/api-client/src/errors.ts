// DRF validation errors arrive as `{ field: ["message", ...] }` instead of `{ detail }`.
export type FieldErrors = Record<string, string[]>;

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields?: FieldErrors,
    /** Seconds until a throttled (429) request may be retried. */
    public retryAfter?: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export async function parseApiError(res: Response): Promise<ApiRequestError> {
  const fallback = `Request failed with status ${res.status}`;
  try {
    const body = (await res.json()) as { detail?: string; retry_after?: number } & Record<string, unknown>;
    const { detail, retry_after, ...rest } = body;
    const fields = Object.fromEntries(
      Object.entries(rest).filter(([, v]) => Array.isArray(v) && v.every((m) => typeof m === "string")),
    ) as FieldErrors;
    const first = Object.values(fields)[0]?.[0];
    const retryAfter = Number(retry_after ?? res.headers.get("Retry-After")) || undefined;
    return new ApiRequestError(detail ?? first ?? fallback, res.status, Object.keys(fields).length ? fields : undefined, retryAfter);
  } catch {
    return new ApiRequestError(fallback, res.status);
  }
}

export async function parseErrorDetail(res: Response): Promise<string> {
  return (await parseApiError(res)).message;
}
