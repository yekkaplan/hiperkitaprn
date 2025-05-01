import { BaseService } from './base';
import type {
  UserProfileResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  UserPreferences,
  UpdatePreferencesRequest,
} from './types/user';

class UserService extends BaseService {
  async getProfile(): Promise<UserProfileResponse> {
    return this.get<UserProfileResponse>('user/profile');
  }

  async updateProfile(data: UpdateProfileRequest): Promise<UserProfileResponse> {
    return this.patch<UserProfileResponse>('user/profile', data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await this.post('user/change-password', data);
  }

  async getPreferences(): Promise<UserPreferences> {
    return this.get<UserPreferences>('user/preferences');
  }

  async updatePreferences(data: UpdatePreferencesRequest): Promise<UserPreferences> {
    return this.patch<UserPreferences>('user/preferences', data);
  }

  async deleteAccount(): Promise<void> {
    await this.delete('user/account');
  }
}

export const userService = new UserService(); 