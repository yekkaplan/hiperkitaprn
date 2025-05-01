import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle, View } from 'react-native';
import { useTheme } from '@/theme';

interface InfoTextProps {
  text: string | ReactNode;
  style?: TextStyle;
  containerStyle?: TextStyle;
}

export const InfoText = ({ text, style, containerStyle }: InfoTextProps) => {
  const { colors, fonts } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, fonts.regular, { color: colors.gray200 }, style]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
}); 