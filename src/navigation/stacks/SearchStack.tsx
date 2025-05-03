import { createStackNavigator } from '@react-navigation/stack';
import { Paths } from '../paths';
import type { SearchStackParamList } from '../types';

import Search from '@/screens/Search/Search';
import SearchResults from '@/screens/SearchResults/SearchResults';
import Filters from '@/screens/Filters/Filters';

const Stack = createStackNavigator<SearchStackParamList>();

export function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Paths.Search} component={Search} />
      <Stack.Screen name={Paths.SearchResults} component={SearchResults} />
      <Stack.Screen name={Paths.Filters} component={Filters} />
    </Stack.Navigator>
  );
} 