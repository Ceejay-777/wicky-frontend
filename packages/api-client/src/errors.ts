export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export async function parseErrorDetail(res: Response): Promise<string> {
  try {
    const errBody = (await res.json()) as { detail?: string };
    return errBody.detail ?? `Request failed with status ${res.status}`;
  } catch {
    return `Request failed with status ${res.status}`;
  }
}