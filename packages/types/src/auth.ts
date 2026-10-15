export interface UserProfile {
  email: string;
  display_name: string;
  avatar: string;
  bio: string;
  leaderboard_visible: boolean;
  others_learning_visible: boolean;
  date_joined: string;
}

export interface AuthSignupRequest {
  email: string;
  password: string;
  display_name: string;
  avatar?: string;
  bio?: string;
  auto_select_subjects_enabled?: boolean;
}

export interface AuthSigninRequest {
  email: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  email: string;
  token: string;
  password: string;
}
