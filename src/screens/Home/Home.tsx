import React, { useState } from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import SafeScreen from '@/components/templates/SafeScreen/SafeScreen';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';
import TabBar from '@/components/molecules/TabBar/TabBar';
import BookResultCard from '@/components/molecules/BookResultCard/BookResultCard';
import BookHorizontalCard from '@/components/molecules/BookHorizontalCard/BookHorizontalCard';
import CategoryCircleButton from '@/components/molecules/CategoryCircleButton/CategoryCircleButton';
import SectionHeader from '@/components/molecules/SectionHeader/SectionHeader';
import RecentSearches from '@/components/organisms/RecentSearches/RecentSearches';

const TABS = ['Tümü', 'Kitaplar', 'Yazarlar', 'Konular'];
const categories = [
  { key: 'egitim', label: 'Eğitim', icon: 'books' },
  { key: 'cevre', label: 'Çevre Bilimleri', icon: 'globe' },
  { key: 'bilgisayar', label: 'Bilgisayar', icon: 'cpu' },
  { key: 'ekonomi', label: 'Ekonomi ve Finans', icon: 'chart-line' },
  { key: 'ekonomi', label: 'Ekonomi ve Finans', icon: 'chart-line' },
  { key: 'ekonomi', label: 'Ekonomi ve Finans', icon: 'chart-line' },
  { key: 'tarih', label: 'Tarih', icon: 'calendar 01' },
];
const books = [
  {
    id: '1',
    title: '10 Adımda Web Tasarımı',
    author: 'Uğur Gelişken',
    image: require('@/theme/assets/images/book1.jpeg'),
    isFavorite: true,
    date: '24.05.2010',
    views: 2600,
  },
  {
    id: '2',
    title: 'Tartışılan modernlik: descartes ve spinoza',
    author: 'Tülin Bumin',
    image: require('@/theme/assets/images/book2.jpeg'),
    isFavorite: false,
    date: '12.03.2015',
    views: 1800,
  },
  {
    id: '3',
    title: 'Felsefe',
    author: 'Vefa Saygın Öğütle',
    image: require('@/theme/assets/images/book3.jpeg'),
    isFavorite: false,
    date: '01.01.2020',
    views: 900,
  },
  {
    id: '4',
    title: 'Hayatım',
    author: 'Kâzım Karabekir',
    image: require('@/theme/assets/images/book4.jpeg'),
    isFavorite: true,
    date: '15.08.2017',
    views: 1500,
  },
  {
    id: '5',
    title: 'Gizemli Kütüphane',
    author: 'Yazar Adı',
    image: require('@/theme/assets/images/book5.jpeg'),
    isFavorite: false,
    date: '02.02.2022',
    views: 1100,
  },
  {
    id: '6',
    title: 'Kırmızı Defter',
    author: 'Ayşe Kulin',
    image: require('@/theme/assets/images/book6.jpeg'),
    isFavorite: true,
    date: '10.09.2019',
    views: 2100,
  },
  {
    id: '7',
    title: 'Beyaz Geceler',
    author: 'Fyodor Dostoyevski',
    image: require('@/theme/assets/images/book7.jpeg'),
    isFavorite: false,
    date: '05.05.2016',
    views: 1750,
  },
  {
    id: '8',
    title: 'Mavi Düşler',
    author: 'Elif Şafak',
    image: require('@/theme/assets/images/book8.jpeg'),
    isFavorite: true,
    date: '22.11.2021',
    views: 1950,
  },
];
const searchResults = [
  {
    image: require('@/theme/assets/images/book2.jpeg'),
    title: 'Yeşil Kalem: Bir Adamın Kusursuz Hikayesi',
    author: 'Yazar Adı Soyadı',
    date: '24.05.2010',
    views: 2600,
  },
  {
    image: require('@/theme/assets/images/book6.jpeg'),
    title: 'Kırmızı Defterin Sırrı',
    author: 'Ayşe Kulin',
    date: '10.09.2019',
    views: 2100,
  },
  {
    image: require('@/theme/assets/images/book8.jpeg'),
    title: 'Mavi Düşler ve Hayaller',
    author: 'Elif Şafak',
    date: '22.11.2021',
    views: 1950,
  },
];

function Home() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [recent, setRecent] = useState([
    'TM Academy',
    'Iron Flame',
    'People in Glass Houses',
  ]);

  const handleRemoveRecent = (item: string) =>
    setRecent(recent.filter((i) => i !== item));
  const handleClearRecent = () => setRecent([]);

  if (search.length > 0) {
    // SEARCH EKRANI
    return (
      <SafeScreen edges={['top', 'left', 'right']}>
        <SearchBar value={search} onChangeText={setSearch} />
        <TabBar tabs={TABS} activeIndex={activeTab} onTabPress={setActiveTab} />
        <View style={{ height: 16 }} />
        <ScrollView>
          {searchResults.map((item, idx) => (
            <BookResultCard key={idx} {...item} />
          ))}
        </ScrollView>
      </SafeScreen>
    );
  }

  // ANA SAYFA
  return (
    <SafeScreen edges={['top', 'left', 'right']}>
      <ScrollView>
        <SearchBar value={search} onChangeText={setSearch} />
        <SectionHeader title="Kategoriler" onSeeAll={() => {}} />
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingLeft: 16, paddingBottom: 8 }}
          renderItem={({ item }) => (
            <CategoryCircleButton icon={item.icon} label={item.label} />
          )}
        />
        <View style={{ height: 16 }} />

        <BookResultCard {...searchResults[0]} />
        <SectionHeader title="Popüler Kitaplar" onSeeAll={() => {}} />
        <FlatList
          data={books}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingLeft: 16, paddingBottom: 8 }}
          renderItem={({ item }) => <BookHorizontalCard {...item} />}
        />
        <SectionHeader title="Yeni Eklenen Kitaplar" onSeeAll={() => {}} />
        <FlatList
          data={books.slice().reverse()}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id + 'yeni'}
          contentContainerStyle={{ paddingLeft: 16, paddingBottom: 8 }}
          renderItem={({ item }) => <BookHorizontalCard {...item} />}
        />
      </ScrollView>
    </SafeScreen>
  );
}

export default Home;
