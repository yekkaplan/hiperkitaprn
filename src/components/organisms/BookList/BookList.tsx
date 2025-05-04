import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import BookCard from '@/components/molecules/BookCard/BookCard';

interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  isFavorite: boolean;
}

interface BookListProps {
  title: string;
  books: Book[];
  onBookPress?: (book: Book) => void;
  onFavoritePress?: (book: Book) => void;
  onSeeAllPress?: () => void;
}

const BookList = ({
  title,
  books,
  onBookPress,
  onFavoritePress,
  onSeeAllPress,
}: BookListProps) => {
  const { fonts, colors } = useTheme();

  return (
    <View>
      <View style={styles.sectionRow}>
        <Text style={[fonts.bold, styles.sectionTitle]}>{title}</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={[fonts.semiBold, { color: colors.primary }]}>
            Tümünü gör
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookList}
        renderItem={({ item }) => (
          <BookCard
            {...item}
            onPress={() => onBookPress?.(item)}
            onFavoritePress={() => onFavoritePress?.(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
  },
  bookList: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
});

export default BookList; 