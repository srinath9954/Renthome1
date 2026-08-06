import { useColorScheme } from 'react-native';
import { createTheme } from '../theme';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return createTheme(colorScheme === 'dark');
};
