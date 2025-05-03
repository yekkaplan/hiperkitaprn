export interface LoginRequest {
  /**
   * Must be a valid email address.
   */
  email: string;
  password: string;
  /**
   * Language code (tr, en)
   */
  language: 'tr' | 'en';
  /**
   * App version
   */
  version: string;
}

export interface User {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  role?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Institution {
  id?: number;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  user?: User;
  institution?: Institution;
  token?: string;
  expireDate?: string;
  isSuccess?: boolean;
  message?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
} 


export interface TokenCreateRequest {
  username: string;
  password: string;
}

export interface TokenCreateResponse {
  token: string;
  expirationDate: string;
  apiUser: {
    id: number;
    username: string;
    password: string | null;
    is_active: number;
    object_id: string;
  };
  isSuccess: boolean;
}  