import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import Fontisto from 'react-native-vector-icons/Fontisto';

interface BookHorizontalCardProps {
  image: any;
  title: string;
  author: string;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
}

const BookHorizontalCard = ({ image, title, author, isFavorite, onFavoritePress }: BookHorizontalCardProps) => {
  const { colors, fonts } = useTheme();
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <TouchableOpacity style={styles.favoriteIcon} onPress={onFavoritePress}>
        <Fontisto name="heart" size={16} color={isFavorite ? colors.primary : colors.gray200} />
      </TouchableOpacity>
      <Text style={[fonts.semiBold, styles.title]} numberOfLines={2}>{title}</Text>
      <Text style={[fonts.regular, styles.author]} numberOfLines={1}>{author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { width: 120, marginRight: 16 },
  image: { width: 120, height: 160, borderRadius: 12, marginBottom: 8 },
  favoriteIcon: { position: 'absolute', top: 8, right: 8, backgroundColor: 'white', borderRadius: 12, padding: 4, elevation: 2 },
  title: { fontSize: 13, marginBottom: 2 },
  author: { fontSize: 12, color: '#888' },
});

export default BookHorizontalCard; 