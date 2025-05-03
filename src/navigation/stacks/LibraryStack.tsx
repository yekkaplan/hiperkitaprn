import { createStackNavigator } from '@react-navigation/stack';
import { Paths } from '../paths';
import type { LibraryStackParamList } from '../types';

import Library from '@/screens/Library/Library';
import ReadingList from '@/screens/ReadingList/ReadingList';
import Favorites from '@/screens/Favorites/Favorites';

const Stack = createStackNavigator<LibraryStackParamList>();

export function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Paths.Library} component={Library} />
      <Stack.Screen name={Paths.ReadingList} component={ReadingList} />
      <Stack.Screen name={Paths.Favorites} component={Favorites} />
    </Stack.Navigator>
  );
} 