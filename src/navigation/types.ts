import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { Paths } from '@/navigation/paths';

export type RootStackParamList = {
  [Paths.Example]: undefined;
  [Paths.Startup]: undefined;
  [Paths.Onboarding]: undefined;
  [Paths.Login]: undefined;
  [Paths.SignIn]: undefined;
};

export type RootScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
