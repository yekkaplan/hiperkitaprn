import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';

interface CategoryButtonProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

const CategoryButton = ({ icon, label, onPress }: CategoryButtonProps) => {
  const { colors, fonts } = useTheme();
  return (
    <View style={styles.categoryButton}>
      <View style={[styles.categoryIcon, { backgroundColor: colors.primary }]}>
        <IconByVariant
          path={icon}
          width={32}
          height={32}
          stroke={colors.gray400}
          color={'white'}
        />
      </View>
      <Text style={[fonts.regular, styles.categoryLabel]} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    alignItems: 'center',
    marginRight: 20,
    width: 72,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 13,
    textAlign: 'center',
  },
});

export default CategoryButton; 