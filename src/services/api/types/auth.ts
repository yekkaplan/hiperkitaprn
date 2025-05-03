export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
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