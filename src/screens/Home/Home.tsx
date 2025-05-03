import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/theme';
import { IconByVariant, AssetByVariant } from '@/components/atoms';
import SafeScreen from '@/components/templates/SafeScreen/SafeScreen';
import { Input } from '@/components/atoms';
import Icon from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

const categories = [
  { key: 'egitim', label: 'Eğitim', icon: 'books' },
  { key: 'cevre', label: 'Çevre Bilimleri', icon: 'globe' },
  { key: 'bilgisayar', label: 'Bilgisayar', icon: 'cpu' },
  { key: 'ekonomi', label: 'Ekonomi ve Finans', icon: 'chart-line' },
  { key: 'tarih', label: 'Tarih', icon: 'calendar 01' },
];

const books = [
  {
    id: '1',
    title: '10 Adımda Web Tasarımı',
    author: 'Uğur Gelişken',
    image: 'book1',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Tartışılan modernlik: descartes ve spinoza',
    author: 'Tülin Bumin',
    image: 'book2',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Felsefe',
    author: 'Vefa Saygın Öğütle',
    image: 'book3',
    isFavorite: false,
  },
];

function CategoryButton({ icon, label }: { icon: string; label: string }) {
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
}

function BookCard({ image, title, author, isFavorite }: any) {
  const { colors, fonts } = useTheme();
  return (
    <View style={styles.bookCard}>
      <View style={styles.bookImageWrapper}>
        <AssetByVariant
          path={image}
          style={styles.bookImage}
          extension="jpeg"
        />

        <View style={styles.favoriteIcon}>
          <Fontisto
            name="heart"
            size={16}
            color={isFavorite ? colors.primary : colors.gray200}
          />
        </View>
      </View>
      <Text style={[fonts.semiBold, styles.bookTitle]} numberOfLines={2}>
        {title}
      </Text>
      <Text style={[fonts.regular, styles.bookAuthor]} numberOfLines={1}>
        {author}
      </Text>
    </View>
  );
}

function Home() {
  const { colors, fonts, gutters } = useTheme();
  const [search, setSearch] = React.useState('');
  return (
    <SafeScreen
      style={{ backgroundColor: colors.secondary, paddingBottom: 0 }}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        contentInset={{ bottom: 0 }}
      >
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
              value={search}
              onChangeText={setSearch}
              placeholder="Ne Okumak istersin?"
              containerStyle={{
                ...styles.searchInputContainer,
                backgroundColor: colors.gray50,
              }}
              style={[fonts.semiBold, styles.searchInput]}
            />
          </View>
        </View>

        <View style={styles.sectionRow}>
          <Text style={[fonts.bold, styles.sectionTitle]}>Kategoriler</Text>
          <TouchableOpacity>
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
            <CategoryButton icon={item.icon} label={item.label} />
          )}
        />
        {/* Popüler Kitaplar */}
        <View style={styles.sectionRow}>
          <Text style={[fonts.bold, styles.sectionTitle]}>
            Popüler Kitaplar
          </Text>
          <TouchableOpacity>
            <Text style={[fonts.semiBold, { color: colors.primary }]}>
              Tümünü gör
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={books}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.bookList}
          renderItem={({ item }) => <BookCard {...item} />}
        />
        {/* Yeni Eklenen Kitaplar */}
        <View style={styles.sectionRow}>
          <Text style={[fonts.bold, styles.sectionTitle]}>
            Yeni Eklenen Kitaplar
          </Text>
          <TouchableOpacity>
            <Text style={[fonts.semiBold, { color: colors.primary }]}>
              Tümünü gör
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={books}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id + 'yeni'}
          contentContainerStyle={styles.bookList}
          renderItem={({ item }) => <BookCard {...item} />}
        />
        {/* Yeni Eklenen Kitaplar */}
        <View style={styles.sectionRow}>
          <Text style={[fonts.bold, styles.sectionTitle]}>
            Yeni Eklenen Kitaplar
          </Text>
          <TouchableOpacity>
            <Text style={[fonts.semiBold, { color: colors.primary }]}>
              Tümünü gör
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={books}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id + 'yeni'}
          contentContainerStyle={styles.bookList}
          renderItem={({ item }) => <BookCard {...item} />}
        />
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {},
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
  bookList: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
  bookCard: {
    width: 140,
    marginRight: 16,
  },
  bookImageWrapper: {
    width: 140,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
  },
  bookTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#888',
  },
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

export default Home;
