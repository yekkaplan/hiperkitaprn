import type { RootScreenProps } from '@/navigation/types';

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: "Türkiye'nin ilk dijital kütüphanesine hoş geldiniz.",
    description:
      'Hiperkitap ile onlarca kategoride binlerce kitaba dilediğiniz yerden hızlıca erişebilirsiniz.',
  },
  {
    id: 2,
    title: "30.000'den fazla e-kitap keşfedin!",
    description:
      'Tablet, telefon veya bilgisayarınızdan kitaplarınıza anında erişin.',
  },

  {
    id: 3,
    title: '7 gün 24 saat her yerden erişim!',
    description:
      'Tüm mobil platformlarda ve web sitemizde de aynı kullanım kolaylığı ile kitap okuma deneyimini yaşayın.',
  },
] as const;

function Onboarding({ navigation }: RootScreenProps<Paths.Onboarding>) {
  const { colors, fonts, gutters } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  const handleContinue = () => {
    navigation.navigate(Paths.SignIn);
  };

  const isLastSlide = (index: number) => index === SLIDES.length - 1;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.primary }]}
    >
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
          );
          setCurrentIndex(index);
        }}
      >
        {SLIDES.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image
                source={require('@/theme/assets/images/iphone13.png')}
                style={styles.phoneImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.content}>
              {!isLastSlide(index) && (
                <View style={styles.pagination}>
                  {SLIDES.map((_, dotIndex) => (
                    <View
                      key={dotIndex}
                      style={[
                        styles.paginationDot,
                        {
                          backgroundColor:
                            currentIndex === dotIndex
                              ? colors.primary
                              : '#E5E5E5',
                          width: currentIndex === dotIndex ? 16 : 6,
                        },
                      ]}
                    />
                  ))}
                </View>
              )}

              <Text style={[styles.title, fonts.bold]}>{slide.title}</Text>
              <Text
                style={[
                  styles.description,
                  fonts.regular,
                  { color: colors.gray200 },
                ]}
              >
                {slide.description}
              </Text>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleContinue}
              >
                <Text style={[fonts.semiBold, { color: 'white' }]}>
                  {isLastSlide(index) ? 'Hemen Başla' : 'Devam Et'}
                </Text>
              </TouchableOpacity>

              {isLastSlide(index) && (
                <View style={gutters.marginBottom_16}>
                  <Text style={[fonts.semiBold, { color: 'black' }]}>
                    Hesabın yok mu?
                    <Text style={[fonts.semiBold, { color: colors.primary }]}>
                      {' '}
                      Kayıt Ol
                    </Text>
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  imageContainer: {
    height: SCREEN_HEIGHT,
    backgroundColor: '#DC4D4E',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  phoneImage: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.85,
  },
  content: {
    height: SCREEN_HEIGHT * 0.4,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 32,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  paginationDot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  button: {
    width: '50%',
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 16,
    alignSelf: 'center',
  },
});

export default Onboarding;
