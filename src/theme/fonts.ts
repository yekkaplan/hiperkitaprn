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
    fontFamily: 'PlusJakartaSans-Regular',
  },
  heading: {
    fontFamily: 'PlusJakartaSans-Bold',
  },
  subheading: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  body: {
    fontFamily: 'PlusJakartaSans-Regular',
  },
  caption: {
    fontFamily: 'PlusJakartaSans-Light',
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
  // Plus Jakarta Sans font ailesi
  extraLight: {
    fontFamily: 'PlusJakartaSans-ExtraLight',
  },
  extraLightItalic: {
    fontFamily: 'PlusJakartaSans-ExtraLightItalic',
  },
  light: {
    fontFamily: 'PlusJakartaSans-Light',
  },
  lightItalic: {
    fontFamily: 'PlusJakartaSans-LightItalic',
  },
  regular: {
    fontFamily: 'PlusJakartaSans-Regular',
  },
  italic: {
    fontFamily: 'PlusJakartaSans-Italic',
  },
  medium: {
    fontFamily: 'PlusJakartaSans-Medium',
  },
  mediumItalic: {
    fontFamily: 'PlusJakartaSans-MediumItalic',
  },
  semiBold: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  semiBoldItalic: {
    fontFamily: 'PlusJakartaSans-SemiBoldItalic',
  },
  bold: {
    fontFamily: 'PlusJakartaSans-Bold',
  },
  boldItalic: {
    fontFamily: 'PlusJakartaSans-BoldItalic',
  },
  extraBold: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
  },
  extraBoldItalic: {
    fontFamily: 'PlusJakartaSans-ExtraBoldItalic',
  },
} as const satisfies Record<string, TextStyle>;
