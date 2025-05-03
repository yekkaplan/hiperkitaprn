import { View, Text } from 'react-native';
import type { HomeStackParamList } from '@/navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'Category'>;

export default function Category({ route }: Props) {
  const { categoryId } = route.params;

  return (
    <View>
      <Text>Category: {categoryId}</Text>
    </View>
  );
} 