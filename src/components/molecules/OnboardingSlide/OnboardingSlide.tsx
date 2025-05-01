import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Button } from '@/components/atoms';
import { PaginationDots } from '@/components/atoms';

interface OnboardingSlideProps {
  title: string;
  description: string;
  imageSource: any;
  isLastSlide: boolean;
  onContinue: () => void;
  style?: ViewStyle;
  currentIndex: number;
  totalSlides: number;
}

export const OnboardingSlide = ({
  title,
  description,
  imageSource,
  isLastSlide,
  onContinue,
  style,
  currentIndex,
  totalSlides,
}: OnboardingSlideProps) => {
  const { colors, fonts, gutters } = useTheme();

  return (
    <View style={[styles.slide, style]}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.phoneImage} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <PaginationDots count={totalSlides} activeIndex={currentIndex} style={styles.pagination} />
        <Text style={[styles.title, fonts.bold]}>{title}</Text>
        <Text style={[styles.description, fonts.regular, { color: colors.gray200 }]}>
          {description}
        </Text>

        <Button
          title={isLastSlide ? 'Hemen Başla' : 'Devam Et'}
          onPress={onContinue}
        />

        {isLastSlide && (
          <View style={styles.registerTextContainer}>
            <Text style={[fonts.semiBold, { color: 'black' }]}>
              Hesabın yok mu?
              <Text style={[fonts.semiBold, { color: colors.primary }]}> Kayıt Ol</Text>
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: '100%',
    flex: 1,
  },
  imageContainer: {
    height: '100%',
    backgroundColor: '#DC4D4E',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  phoneImage: {
    width: '85%',
    height: '85%',
  },
  content: {
    height: '50%',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    width: '100%',
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  pagination: {
    marginBottom: 16,
  },
  registerTextContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
}); 