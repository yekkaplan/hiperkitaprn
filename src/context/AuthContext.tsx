import React, { createContext, useContext, useState, useCallback } from 'react';
import { MMKV } from 'react-native-mmkv';
import { StorageKeys } from '@/constants/storage';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  storage: MMKV;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, storage }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedUser = storage.getString(StorageKeys.USER);
    const storedToken = storage.getString(StorageKeys.TOKEN);
    
    return {
      isAuthenticated: !!storedToken,
      user: storedUser ? JSON.parse(storedUser) : null,
      token: storedToken ?? null,
    };
  });

  const login = useCallback(async (email: string, password: string) => {
    try {
      // API call simulation
      const response = {
        user: {
          id: '1',
          email,
          name: 'Test User',
          role: 'user' as const,
        },
        token: 'dummy-token',
      };

      storage.set(StorageKeys.USER, JSON.stringify(response.user));
      storage.set(StorageKeys.TOKEN, response.token);

      setAuthState({
        isAuthenticated: true,
        user: response.user,
        token: response.token,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [storage]);

  const logout = useCallback(() => {
    storage.delete(StorageKeys.USER);
    storage.delete(StorageKeys.TOKEN);
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  }, [storage]);

  const updateUser = useCallback((userData: Partial<User>) => {
    setAuthState(prev => {
      if (!prev.user) return prev;
      
      const updatedUser = { ...prev.user, ...userData };
      storage.set(StorageKeys.USER, JSON.stringify(updatedUser));
      
      return {
        ...prev,
        user: updatedUser,
      };
    });
  }, [storage]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 