import { createStackNavigator } from '@react-navigation/stack';
import { Paths } from '../paths';
import type { HomeStackParamList } from '../types';

import Home from '@/screens/Home/Home';
import BookDetail from '@/screens/BookDetail/BookDetail';
import Category from '@/screens/Category/Category';

const Stack = createStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Paths.Home} component={Home} />
      <Stack.Screen name={Paths.BookDetail} component={BookDetail} />
      <Stack.Screen name={Paths.Category} component={Category} />
    </Stack.Navigator>
  );
} 