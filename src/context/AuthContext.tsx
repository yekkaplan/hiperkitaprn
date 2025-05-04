import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storage } from '@/App';
import { StorageKeys } from '@/constants/storage';
import { authService } from '@/services/api/auth';
import { ApiError } from '@/services/api/base';
import { showToast } from '@/components/atoms/Toast/toast';
import type { User } from '@/types/user';
import type { LoginResponse } from '@/services/api/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  saveSession: (data: LoginResponse) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedUser = storage.getString(StorageKeys.USER);
    const storedToken = storage.getString(StorageKeys.TOKEN);
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken || null,
      isAuthenticated: !!storedToken,
    };
  });

  const saveSession = useCallback((data: LoginResponse) => {
    if (!data.token || !data.user) {
      throw new Error('Invalid login response');
    }

    const userString = JSON.stringify(data.user);
    storage.set(StorageKeys.USER, userString);
    storage.set(StorageKeys.TOKEN, data.token);

    setAuthState({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
    });
  }, []);

  const logout = useCallback(() => {
    storage.delete(StorageKeys.USER);
    storage.delete(StorageKeys.TOKEN);
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await authService.login({ email, password });
        if (response.isSuccess && response.token && response.user) {
          saveSession(response);
        } else {
          throw new Error(response.message || 'Login failed');
        }
      } catch (error) {
        if (error instanceof ApiError) {
          showToast(error.message, 'error', 3000);
        } else {
          showToast('Giriş yapılamadı', 'error', 3000);
        }
        throw error;
      }
    },
    [saveSession],
  );

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        saveSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
