import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme';
import CategoryButton from '@/components/molecules/CategoryButton/CategoryButton';

interface Category {
  key: string;
  label: string;
  icon: string;
}

interface CategoryListProps {
  categories: Category[];
  onCategoryPress?: (category: Category) => void;
  onSeeAllPress?: () => void;
}

const CategoryList = ({ categories, onCategoryPress, onSeeAllPress }: CategoryListProps) => {
  const { fonts, colors } = useTheme();

  return (
    <View>
      <View style={styles.sectionRow}>
        <Text style={[fonts.bold, styles.sectionTitle]}>Kategoriler</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={[fonts.semiBold, { color: colors.primary }]}>
            Tümünü gör
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <CategoryButton
            icon={item.icon}
            label={item.label}
            onPress={() => onCategoryPress?.(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
  },
  categoryList: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
});

export default CategoryList; 