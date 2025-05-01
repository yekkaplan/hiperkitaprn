import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@/theme';

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const BackButton = ({ onPress, style }: BackButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Icon name="arrow-left" color="white" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}); 