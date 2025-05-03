import { BaseService } from './base';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  TokenCreateRequest,
  TokenCreateResponse,
} from './types/auth';

class AuthService extends BaseService {

  async tokenCreate(data: TokenCreateRequest): Promise<TokenCreateResponse> {
    return this.post<TokenCreateResponse>('token/create', data);
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('auth/login', data);
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.post<RegisterResponse>('auth/register', data);
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await this.post('auth/forgot-password', data);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await this.post('auth/reset-password', data);
  }
}

export const authService = new AuthService(); 