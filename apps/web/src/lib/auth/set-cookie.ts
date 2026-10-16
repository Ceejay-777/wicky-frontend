export type ParsedCookie = {
  name: string;
  value: string;
  path: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite?: "lax" | "strict" | "none";
  maxAge?: number;
  expires?: Date;
};

// Re-issues the BE's cookies on the web origin. `Domain` is dropped on purpose: it names the BE host.
export function parseSetCookie(header: string): ParsedCookie {
  const [pair, ...attrs] = header.split(";").map((s) => s.trim());
  const eq = pair.indexOf("=");
  const cookie: ParsedCookie = {
    name: pair.slice(0, eq),
    value: pair.slice(eq + 1),
    path: "/",
    httpOnly: false,
    secure: false,
  };
  for (const attr of attrs) {
    const [key, val = ""] = attr.split("=");
    switch (key.toLowerCase()) {
      case "path":
        cookie.path = val;
        break;
      case "httponly":
        cookie.httpOnly = true;
        break;
      case "secure":
        cookie.secure = true;
        break;
      case "samesite":
        cookie.sameSite = val.toLowerCase() as ParsedCookie["sameSite"];
        break;
      case "max-age":
        cookie.maxAge = Number(val);
        break;
      case "expires":
        cookie.expires = new Date(val);
        break;
    }
  }
  return cookie;
}
