import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer, useNavigationState, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { storage } from '@/App';

import { Startup, Onboarding } from '@/screens';
import { TabNavigator } from './TabNavigator';
import { AuthStackNavigator } from './AuthStackNavigator';

const Stack = createStackNavigator<RootStackParamList>();

function NavigationGuard() {
  const navigation = useNavigation<any>();
  const currentRoute = useNavigationState(state => state?.routes[state?.index]?.name);

  useEffect(() => {
    const token = storage.getString('appToken');
    if (!token && currentRoute !== Paths.Startup) {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Startup }],
      });
    }
  }, [currentRoute, navigation]);

  return null;
}

function ApplicationNavigator() {
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
}

export default ApplicationNavigator;
