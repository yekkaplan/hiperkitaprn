import { View, Text } from 'react-native';
import type { HomeStackParamList } from '@/navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<HomeStackParamList, 'BookDetail'>;

export default function BookDetail({ route }: Props) {
  const { bookId } = route.params;

  return (
    <View>
      <Text>Book Detail: {bookId}</Text>
    </View>
  );
} 