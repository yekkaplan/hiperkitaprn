import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme';
import { Input } from '@/components/atoms';
import Icon from 'react-native-vector-icons/Feather';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChangeText, placeholder }: SearchBarProps) => {
  const { colors, fonts } = useTheme();
  return (
    <View style={styles.headerWrapper}>
      <View
        style={{
          ...styles.searchBarWrapper,
          backgroundColor: colors.gray50,
        }}
      >
        <View style={styles.searchIconWrapper}>
          <Icon name="search" size={20} color={colors.gray200} />
        </View>
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || 'Ne Okumak istersin?'}
          containerStyle={{
            ...styles.searchInputContainer,
            backgroundColor: colors.gray50,
          }}
          style={[fonts.semiBold, styles.searchInput]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 64,
  },
  searchIconWrapper: {
    marginRight: 8,
  },
  searchInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  searchInput: {
    fontSize: 15,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
});

export default SearchBar; 