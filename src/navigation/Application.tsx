import type { RootStackParamList } from '@/navigation/types';

import {
  NavigationContainer,
  useNavigationState,
  useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useRef, useState, memo } from 'react';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { storage } from '@/App';
import { StorageKeys } from '@/constants/storage';

import { Startup, Onboarding } from '@/screens';
import { TabNavigator } from './TabNavigator';
import { AuthStackNavigator } from './AuthStackNavigator';
import { useAuth } from '@/context/AuthContext';

const Stack = createStackNavigator<RootStackParamList>();

const NavigationGuard = memo(function NavigationGuard() {
  const navigation = useNavigation<any>();
  const currentRoute = useNavigationState(
    (state) => state?.routes[state?.index]?.name,
  );
  const { isAuthenticated } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const isNavigating = useRef(false);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }
    console.log('currentRoute', currentRoute);
    if (isNavigating.current || !currentRoute) return;
    
    const token = storage.getString(StorageKeys.APP_TOKEN);

    // AppToken kontrolü
    if (!token && currentRoute !== Paths.Startup) {
      isNavigating.current = true;
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Startup }],
      });
      isNavigating.current = false;
      return;
    }

    // Authentication kontrolü
    if (!isAuthenticated) {
      if (currentRoute === Paths.AuthStack || currentRoute === Paths.Startup) {
        return;
      }

      isNavigating.current = true;
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.AuthStack }],
      });
      isNavigating.current = false;
    } else if (currentRoute === Paths.AuthStack || currentRoute === Paths.Startup) {
      isNavigating.current = true;
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Main }],
      });
      isNavigating.current = false;
    }
  }, [currentRoute, isAuthenticated, navigation, isInitialized]);

  return null;
});

const ApplicationNavigator = memo(function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          <Stack.Screen component={Startup} name={Paths.Startup} />
          <Stack.Screen component={Onboarding} name={Paths.Onboarding} />
          <Stack.Screen component={AuthStackNavigator} name={Paths.AuthStack} />
          <Stack.Screen component={TabNavigator} name={Paths.Main} />
        </Stack.Navigator>
        <NavigationGuard />
      </NavigationContainer>
    </SafeAreaProvider>
  );
});

export default ApplicationNavigator;
