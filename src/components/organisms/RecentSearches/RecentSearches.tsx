import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/theme';
import Icon from 'react-native-vector-icons/Feather';

interface RecentSearchesProps {
  searches: string[];
  onRemove: (item: string) => void;
  onClear: () => void;
}

const RecentSearches = ({ searches, onRemove, onClear }: RecentSearchesProps) => {
  const { colors, fonts } = useTheme();
  return (
    <View style={{ marginHorizontal: 16, marginTop: 16 }}>
      <View style={styles.header}>
        <Text style={[fonts.semiBold, { color: colors.gray400 }]}>Son Aramalar</Text>
        <TouchableOpacity onPress={onClear}>
          <Text style={[fonts.semiBold, { color: colors.primary }]}>Temizle</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={searches}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Icon name="clock" size={16} color={colors.gray200} style={{ marginRight: 8 }} />
            <Text style={[fonts.regular, { flex: 1 }]}>{item}</Text>
            <TouchableOpacity onPress={() => onRemove(item)}>
              <Icon name="x" size={18} color={colors.gray200} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
});

export default RecentSearches; 