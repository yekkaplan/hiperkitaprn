import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';

import ApplicationNavigator from '@/navigation/Application';
import { ThemeProvider } from '@/theme';
import { Providers } from '@/context';
import '@/translations';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export const storage = new MMKV();

const App = () => {
  return (
    <RootSiblingParent>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider storage={storage}>
            <Providers storage={storage}>
              <ApplicationNavigator />
            </Providers>
          </ThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </RootSiblingParent>
  );
};

export default App;
