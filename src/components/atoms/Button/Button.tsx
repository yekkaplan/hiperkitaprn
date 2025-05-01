import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { useTheme } from '@/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  loading?: boolean;
}

export const Button = ({ title, onPress, style, loading }: ButtonProps) => {
  const { colors, fonts, gutters } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[
        styles.button,
        { backgroundColor: colors.primary },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.text, fonts.bold, { color: 'white' }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
  },
}); 