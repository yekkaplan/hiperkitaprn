import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ColorValue,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '@/theme';

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  iconColor?: string;
  backgroundColor?: ColorValue;
}

export const BackButton = ({
  onPress,
  style,
  iconColor,
  backgroundColor,
}: BackButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        style,
        { backgroundColor: backgroundColor || 'rgba(255, 255, 255, 0.2)' },
      ]}
    >
      <Icon name="arrow-left" color={iconColor || 'white'} size={24} />
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
  },
});
