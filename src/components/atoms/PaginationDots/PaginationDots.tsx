import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';

interface PaginationDotsProps {
  count: number;
  activeIndex: number;
  style?: ViewStyle;
}

export const PaginationDots = ({ count, activeIndex, style }: PaginationDotsProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.pagination, style]}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            {
              backgroundColor: activeIndex === index ? colors.primary : '#E5E5E5',
              width: activeIndex === index ? 16 : 6,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  paginationDot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
}); 