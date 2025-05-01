import type { UnionConfiguration } from '@/theme/types/config';
import type { FontColors, FontSizes } from '@/theme/types/fonts';
import type { TextStyle } from 'react-native';

import { config } from '@/theme/_config';

export const generateFontColors = (configuration: UnionConfiguration) => {
  // eslint-disable-next-line unicorn/no-array-reduce
  return Object.entries(configuration.fonts.colors).reduce<FontColors>(
    (accumulator, [key, value]) => {
      return Object.assign(accumulator, {
        [key]: {
          color: value,
        },
      });
    },
    {} as FontColors,
  );
};

export const generateFontSizes = () => {
  // eslint-disable-next-line unicorn/no-array-reduce
  return config.fonts.sizes.reduce<FontSizes>((accumulator, size) => {
    return Object.assign(accumulator, {
      [`size_${size}`]: {
        fontSize: size,
      },
    });
  }, {} as FontSizes);
};

// Varsayılan font stilleri
export const defaultFontStyles = {
  default: {
    fontFamily: 'Outfit-Regular',
  },
  heading: {
    fontFamily: 'Outfit-Bold',
  },
  subheading: {
    fontFamily: 'Outfit-SemiBold',
  },
  body: {
    fontFamily: 'Outfit-Regular',
  },
  caption: {
    fontFamily: 'Outfit-Light',
  },
} as const satisfies Record<string, TextStyle>;

export const staticFontStyles = {
  alignCenter: {
    textAlign: 'center',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  // Outfit font ailesi
  extraLight: {
    fontFamily: 'Outfit-ExtraLight',
  },
  extraLightItalic: {
    fontFamily: 'Outfit-ExtraLightItalic',
  },
  light: {
    fontFamily: 'Outfit-Light',
  },
  lightItalic: {
    fontFamily: 'Outfit-LightItalic',
  },
  regular: {
    fontFamily: 'Outfit-Regular',
  },
  italic: {
    fontFamily: 'Outfit-Italic',
  },
  medium: {
    fontFamily: 'Outfit-Medium',
  },
  mediumItalic: {
    fontFamily: 'Outfit-MediumItalic',
  },
  semiBold: {
    fontFamily: 'Outfit-SemiBold',
  },
  semiBoldItalic: {
    fontFamily: 'Outfit-SemiBoldItalic',
  },
  bold: {
    fontFamily: 'Outfit-Bold',
  },
  boldItalic: {
    fontFamily: 'Outfit-BoldItalic',
  },
  extraBold: {
    fontFamily: 'Outfit-ExtraBold',
  },
  extraBoldItalic: {
    fontFamily: 'Outfit-ExtraBoldItalic',
  },
} as const satisfies Record<string, TextStyle>;
