import React from 'react';
import { MMKV } from 'react-native-mmkv';

import { AuthProvider } from './AuthContext';
import { AppProvider } from './AppContext';

interface ProvidersProps {
  children: React.ReactNode;
  storage: MMKV;
}

export const Providers: React.FC<ProvidersProps> = ({ children, storage }) => {
  return (
    <AppProvider storage={storage}>
      <AuthProvider storage={storage}>
        {children}
      </AuthProvider>
    </AppProvider>
  );
}; 