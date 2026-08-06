import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius } from '../../theme/spacing';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'ghost';
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  size = 'md',
  variant = 'outline',
}) => {
  const theme = useTheme();

  const sizeStyles = {
    sm: { paddingVertical: Spacing[2], paddingHorizontal: Spacing[4] },
    md: { paddingVertical: Spacing[3], paddingHorizontal: Spacing[6] },
    lg: { paddingVertical: Spacing[4], paddingHorizontal: Spacing[8] },
  };

  const fontSizes = { sm: 13, md: 15, lg: 17 };

  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyles[size],
        {
          borderColor: theme.colors.primary,
          borderWidth: isOutline ? 1.5 : 0,
          backgroundColor: isOutline ? 'transparent' : 'transparent',
        },
        (disabled || isLoading) && { opacity: 0.6 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.75}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.primary} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            { color: theme.colors.primary, fontSize: fontSizes[size] },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
  },
});
