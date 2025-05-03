import { View, Text } from 'react-native';
import type { ProfileStackParamList } from '@/navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

export default function Settings({ navigation }: Props) {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
} 