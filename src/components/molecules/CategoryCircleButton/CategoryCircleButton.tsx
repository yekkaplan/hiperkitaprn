import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';

interface Props {
  icon: string;
  label: string;
  onPress?: () => void;
}

const CategoryCircleButton = ({ icon, label, onPress }: Props) => {
  const { colors, fonts } = useTheme();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.circle, { backgroundColor: colors.primary }]}> 
        <IconByVariant path={icon} width={28} height={28} color="white" />
      </View>
      <Text style={[fonts.regular, styles.label]} numberOfLines={2}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginRight: 16, width: 72 },
  circle: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  label: { fontSize: 13, textAlign: 'center' },
});

export default CategoryCircleButton; 