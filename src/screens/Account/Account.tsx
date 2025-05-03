import { View, Text } from 'react-native';
import type { ProfileStackParamList } from '@/navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Account'>;

export default function Account({ navigation }: Props) {
  return (
    <View>
      <Text>Account</Text>
    </View>
  );
} 