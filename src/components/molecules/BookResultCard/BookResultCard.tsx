import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useTheme } from '@/theme';

interface BookResultCardProps {
  image: any;
  title: string;
  author: string;
  date: string;
  views: number;
}

const BookResultCard = ({ image, title, author, date, views }: BookResultCardProps) => {
  const { colors, fonts } = useTheme();
  const { width } = useWindowDimensions();
  const imageWidth = 64;
  const imageHeight = 96;
  const infoWidth = width - imageWidth - 64; // 64: paddings and margins

  return (
    <View style={[styles.card, { borderColor: colors.gray100, backgroundColor: 'white', minHeight: imageHeight }]}> 
      <Image source={image} style={[styles.image, { width: imageWidth, height: imageHeight }]} />
      <View style={[styles.info, { width: infoWidth, justifyContent: 'flex-start' }]}> 
        <Text style={[fonts.semiBold, styles.title]} numberOfLines={2}>{title}</Text>
        <Text style={[fonts.regular, styles.author]} numberOfLines={1}>{author}</Text>
        <Text style={[fonts.regular, styles.meta]} numberOfLines={1}>
          {views.toLocaleString()} • {date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  image: {
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: { fontSize: 15, marginBottom: 2 },
  author: { color: '#888', fontSize: 13, marginBottom: 2 },
  meta: { color: '#A1A1A1', fontSize: 12 },
});

export default BookResultCard; 