import { createStackNavigator } from '@react-navigation/stack';
import { Paths } from '../paths';
import type { ProfileStackParamList } from '../types';

import Profile from '@/screens/Profile/Profile';
import Settings from '@/screens/Settings/Settings';
import Account from '@/screens/Account/Account';

const Stack = createStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Paths.Profile} component={Profile} />
      <Stack.Screen name={Paths.Settings} component={Settings} />
      <Stack.Screen name={Paths.Account} component={Account} />
    </Stack.Navigator>
  );
} 