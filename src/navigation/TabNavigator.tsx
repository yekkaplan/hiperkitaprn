import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { TabParamList } from './types';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { HomeStack } from './stacks/HomeStack';
import { SearchStack } from './stacks/SearchStack';
import { LibraryStack } from './stacks/LibraryStack';
import { ProfileStack } from './stacks/ProfileStack';
import IconByVariant from '@/components/atoms/IconByVariant/IconByVariant';

const Tab = createBottomTabNavigator<TabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Anasayfa',
          tabBarIcon: ({ color, size, focused }) => {
            return <IconByVariant path={focused ? 'home-active' : 'home'} />;
          },
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarLabel: 'Arama',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <IconByVariant path={focused ? 'search-active' : 'search'} />
            );
          },
        }}
      />
      <Tab.Screen
        name="LibraryStack"
        component={LibraryStack}
        options={{
          tabBarLabel: 'Kitaplık',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <IconByVariant path={focused ? 'library-active' : 'library'} />
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <IconByVariant path={focused ? 'profile-active' : 'profile'} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
