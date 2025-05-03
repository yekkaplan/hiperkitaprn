import { View, Text } from 'react-native';
import type { SearchStackParamList } from '@/navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<SearchStackParamList, 'SearchResults'>;

export default function SearchResults({ route }: Props) {
  const { query } = route.params;

  return (
    <View>
      <Text>Search Results for: {query}</Text>
    </View>
  );
} 