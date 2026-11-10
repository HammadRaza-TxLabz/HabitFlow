import { TextStyle } from 'react-native';

export const fontFamilies = {
  serifBold: 'PlayfairDisplay_600SemiBold',
  serifMedium: 'PlayfairDisplay_500Medium',
  sansRegular: 'Manrope_400Regular',
  sansMedium: 'Manrope_500Medium',
  sansSemiBold: 'Manrope_600SemiBold',
  sansBold: 'Manrope_700Bold',
} as const;

export const typography: Record<string, TextStyle> = {
  display: {
    fontFamily: fontFamilies.serifBold,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -0.8,
  },
  headlineLg: {
    fontFamily: fontFamilies.serifBold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  headlineLgMobile: {
    fontFamily: fontFamilies.serifBold,
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  headlineMd: {
    fontFamily: fontFamilies.serifMedium,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  headlineSm: {
    fontFamily: fontFamilies.serifMedium,
    fontSize: 18,
    lineHeight: 26,
  },
  titleLg: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  titleMd: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 15,
    lineHeight: 22,
  },
  bodyLg: {
    fontFamily: fontFamilies.sansRegular,
    fontSize: 16,
    lineHeight: 26,
  },
  bodyMd: {
    fontFamily: fontFamilies.sansRegular,
    fontSize: 14,
    lineHeight: 22,
  },
  bodySm: {
    fontFamily: fontFamilies.sansRegular,
    fontSize: 12,
    lineHeight: 18,
  },
  labelMd: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  labelSm: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  caption: {
    fontFamily: fontFamilies.sansMedium,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.6,
  },
};

