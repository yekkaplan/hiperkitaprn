export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  user: User;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  notifications: boolean;
}

export interface UpdatePreferencesRequest {
  preferences: Partial<UserPreferences>;
} 