export const authMessages = {
  confirmReset: {
    success: "Password saved. Sign in with it.",
  },
  errors: {
    network: "Connection failed. Try again.",
    unknown: "Something went wrong. Try again.",
    invalidCredentials: "Invalid email or password.",
    rateLimited: "Too many attempts. Try again in a moment.",
    emailTaken: "That email already has a passport. Try signing in instead.",
    expiredLink: "This link has expired or was already used. Ask for a new one.",
  },
} as const;
