import type { RootScreenProps } from '@/navigation/types';

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { OnboardingCarousel } from '@/components/organisms';

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
];

function Onboarding({ navigation }: RootScreenProps<Paths.Onboarding>) {
  const { colors } = useTheme();

  const handleFinish = () => {
    navigation.navigate(Paths.AuthStack);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.secondary }]}>
      <OnboardingCarousel
        slides={SLIDES}
        imageSource={require('@/theme/assets/images/iphone13.png')}
        onFinish={handleFinish}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Onboarding;
