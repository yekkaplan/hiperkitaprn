import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { AssetByVariant } from '@/components/atoms';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  image: string;
  isFavorite: boolean;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

const BookCard = ({
  id,
  title,
  author,
  image,
  isFavorite,
  onPress,
  onFavoritePress,
}: BookCardProps) => {
  const { colors, fonts } = useTheme();
  return (
    <TouchableOpacity style={styles.bookCard} onPress={onPress}>
      <View style={styles.bookImageWrapper}>
        <AssetByVariant
          path={image}
          style={styles.bookImage}
          extension="jpeg"
        />

        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={onFavoritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Fontisto
            name="heart"
            size={16}
            color={isFavorite ? colors.primary : colors.gray200}
          />
        </TouchableOpacity>
      </View>
      <Text style={[fonts.semiBold, styles.bookTitle]} numberOfLines={2}>
        {title}
      </Text>
      <Text style={[fonts.regular, styles.bookAuthor]} numberOfLines={1}>
        {author}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookCard: {
    width: 140,
    marginRight: 16,
  },
  bookImageWrapper: {
    width: 140,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  bookTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#888',
  },
});

export default BookCard; 