import React, { createContext, useContext, useState, useCallback } from 'react';
import { MMKV } from 'react-native-mmkv';

interface AppSettings {
  language: string;
  notifications: boolean;
}

interface AppState {
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
}

interface AppContextType extends AppState {
  updateSettings: (settings: Partial<AppSettings>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
  storage: MMKV;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, storage }) => {
  const [appState, setAppState] = useState<AppState>(() => {
    const storedSettings = storage.getString('appSettings');
    
    return {
      settings: storedSettings 
        ? JSON.parse(storedSettings) 
        : {
            language: 'tr',
            notifications: true,
          },
      isLoading: false,
      error: null,
    };
  });

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setAppState(prev => {
      const updatedSettings = {
        ...prev.settings,
        ...newSettings,
      };
      
      storage.set('appSettings', JSON.stringify(updatedSettings));
      
      return {
        ...prev,
        settings: updatedSettings,
      };
    });
  }, [storage]);

  const setLoading = useCallback((loading: boolean) => {
    setAppState(prev => ({
      ...prev,
      isLoading: loading,
    }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setAppState(prev => ({
      ...prev,
      error,
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...appState,
        updateSettings,
        setLoading,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 