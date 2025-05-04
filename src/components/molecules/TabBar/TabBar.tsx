import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

interface TabBarProps {
  tabs: string[];
  activeIndex: number;
  onTabPress: (index: number) => void;
}

const TabBar = ({ tabs, activeIndex, onTabPress }: TabBarProps) => {
  const { colors, fonts } = useTheme();
  return (
    <View style={styles.container}>
      {tabs.map((tab, idx) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeIndex === idx && { backgroundColor: colors.gray50 }
          ]}
          onPress={() => onTabPress(idx)}
        >
          <Text
            style={[
              fonts.semiBold,
              { color: activeIndex === idx ? colors.primary : colors.gray400 }
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginHorizontal: 16, marginTop: 16 },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 8,
  },
});

export default TabBar; 