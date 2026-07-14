export const authMessages = {
  signin: {
    success: "Signed in.",
  },
  signup: {
    success: "Account created.",
  },
  recover: {
    sent: "If that email exists, a reset link has been sent.",
  },
  confirmReset: {
    success: "Password reset. You can now sign in.",
  },
  errors: {
    network: "Connection failed. Try again.",
    unknown: "Something went wrong. Try again.",
    invalidCredentials: "Invalid email or password.",
    rateLimited: "Too many attempts. Try again in a moment.",
  },
} as const;
