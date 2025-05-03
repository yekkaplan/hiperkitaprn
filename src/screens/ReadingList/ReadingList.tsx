import { View, Text } from 'react-native';
import type { LibraryStackParamList } from '@/navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<LibraryStackParamList, 'ReadingList'>;

export default function ReadingList({ navigation }: Props) {
  return (
    <View>
      <Text>Reading List</Text>
    </View>
  );
} 