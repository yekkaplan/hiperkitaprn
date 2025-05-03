import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { Paths } from '@/navigation/paths';

export type RootStackParamList = {
  Startup: undefined;
  Onboarding: undefined;
  AuthStack: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  SignInWithMail: undefined;
  Login: undefined;
  SignIn: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  BookDetail: { bookId: string };
  Category: { categoryId: string };
};

export type SearchStackParamList = {
  Search: undefined;
  SearchResults: { query: string };
  Filters: undefined;
};

export type LibraryStackParamList = {
  Library: undefined;
  ReadingList: undefined;
  Favorites: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
  Account: undefined;
};

export type TabParamList = {
  HomeStack: undefined;
  SearchStack: undefined;
  LibraryStack: undefined;
  ProfileStack: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> =
  BottomTabScreenProps<TabParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;
