import { View, Text } from 'react-native';
import type { SearchStackParamList } from '@/navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<SearchStackParamList, 'Filters'>;

export default function Filters({ navigation }: Props) {
  return (
    <View>
      <Text>Filters</Text>
    </View>
  );
} 