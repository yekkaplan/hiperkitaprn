import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { OnboardingSlide } from '@/components/molecules';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Slide {
  id: number;
  title: string;
  description: string;
}

interface OnboardingCarouselProps {
  slides: Slide[];
  imageSource: any;
  onFinish: () => void;
}

export const OnboardingCarousel = ({ slides, imageSource, onFinish }: OnboardingCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  const handleContinue = () => {
    if (currentIndex === slides.length - 1) {
      onFinish();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setCurrentIndex(index);
        }}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slideContainer}>
            <OnboardingSlide
              title={slide.title}
              description={slide.description}
              imageSource={imageSource}
              isLastSlide={index === slides.length - 1}
              onContinue={handleContinue}
              currentIndex={currentIndex}
              totalSlides={slides.length}
            />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
}); 