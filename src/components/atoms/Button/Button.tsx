import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ title, onPress, style, textStyle, variant = 'primary' }: ButtonProps) => {
  const { colors, fonts } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: variant === 'primary' ? colors.primary : 'transparent' },
        style,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          fonts.semiBold,
          { color: variant === 'primary' ? 'white' : colors.primary },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '50%',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 16,
    alignSelf: 'center',
  },
}); 