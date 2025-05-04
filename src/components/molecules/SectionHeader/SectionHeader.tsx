import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

interface Props {
  title: string;
  onSeeAll?: () => void;
}

const SectionHeader = ({ title, onSeeAll }: Props) => {
  const { colors, fonts } = useTheme();
  return (
    <View style={styles.row}>
      <Text style={[fonts.bold, styles.title]}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={[fonts.semiBold, { color: colors.primary }]}>Tümünü gör</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginBottom: 12, paddingHorizontal: 16 },
  title: { fontSize: 18 },
});

export default SectionHeader; 