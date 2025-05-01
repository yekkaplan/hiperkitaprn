import React from 'react';
import { TextInput, View, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { useTheme } from '@/theme';

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

export const Input = ({ containerStyle, style, ...props }: InputProps) => {
  const { colors, fonts, gutters } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.gray50 }, containerStyle]}>
      <TextInput
        style={[styles.input, fonts.regular, gutters.paddingHorizontal_16, style]}
        placeholderTextColor={colors.gray200}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  input: {
    height: 56,
    fontSize: 16,
  },
}); 