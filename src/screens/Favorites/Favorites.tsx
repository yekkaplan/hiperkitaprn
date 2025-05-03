import { View, Text } from 'react-native';
import type { LibraryStackParamList } from '@/navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<LibraryStackParamList, 'Favorites'>;

export default function Favorites({ navigation }: Props) {
  return (
    <View>
      <Text>Favorites</Text>
    </View>
  );
} 