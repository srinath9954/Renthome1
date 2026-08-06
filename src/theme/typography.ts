import { TextStyle } from 'react-native';

export const FontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 19,
  xl: 22,
  '2xl': 26,
  '3xl': 30,
  '4xl': 36,
} as const;

export const LineHeight = {
  xs: 16,
  sm: 20,
  base: 24,
  md: 26,
  lg: 28,
  xl: 32,
  '2xl': 36,
  '3xl': 40,
  '4xl': 48,
} as const;

export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;

export const Typography = {
  displayLarge: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['4xl'],
    lineHeight: LineHeight['4xl'],
    letterSpacing: LetterSpacing.tight,
  } as TextStyle,
  displayMedium: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['3xl'],
    lineHeight: LineHeight['3xl'],
    letterSpacing: LetterSpacing.tight,
  } as TextStyle,
  displaySmall: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['2xl'],
    lineHeight: LineHeight['2xl'],
    letterSpacing: LetterSpacing.tight,
  } as TextStyle,
  headlineLarge: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xl,
    lineHeight: LineHeight.xl,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  headlineMedium: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    lineHeight: LineHeight.lg,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  headlineSmall: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  titleLarge: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  titleMedium: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
    letterSpacing: LetterSpacing.wide,
  } as TextStyle,
  titleSmall: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
    letterSpacing: LetterSpacing.wide,
  } as TextStyle,
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  bodyMedium: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
    letterSpacing: LetterSpacing.normal,
  } as TextStyle,
  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    lineHeight: LineHeight.xs,
    letterSpacing: LetterSpacing.wide,
  } as TextStyle,
  labelLarge: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
    letterSpacing: LetterSpacing.wider,
  } as TextStyle,
  labelSmall: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    lineHeight: LineHeight.xs,
    letterSpacing: LetterSpacing.wider,
  } as TextStyle,
} as const;
