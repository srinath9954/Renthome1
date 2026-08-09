export * from './colors';
export * from './typography';
export * from './spacing';

import { LightTheme, DarkTheme, ThemeColors } from './colors';
import { Typography, FontFamily, FontSize, LineHeight } from './typography';
import { Spacing, BorderRadius, Shadows } from './spacing';

export type AppTheme = {
  colors: Record<keyof typeof LightTheme, string>;
  typography: typeof Typography;
  fontFamily: typeof FontFamily;
  fontSize: typeof FontSize;
  lineHeight: typeof LineHeight;
  spacing: typeof Spacing;
  borderRadius: typeof BorderRadius;
  shadows: typeof Shadows;
  isDark: boolean;
};

export const createTheme = (isDark: boolean): AppTheme => ({
  colors: (isDark ? DarkTheme : LightTheme) as Record<keyof typeof LightTheme, string>,
  typography: Typography,
  fontFamily: FontFamily,
  fontSize: FontSize,
  lineHeight: LineHeight,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  isDark,
});
