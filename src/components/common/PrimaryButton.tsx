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

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  size = 'md',
}) => {
  const theme = useTheme();

  const sizeStyles = {
    sm: { paddingVertical: Spacing[2], paddingHorizontal: Spacing[4] },
    md: { paddingVertical: Spacing[3], paddingHorizontal: Spacing[6] },
    lg: { paddingVertical: Spacing[4], paddingHorizontal: Spacing[8] },
  };

  const fontSizes = { sm: 13, md: 15, lg: 17 };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        sizeStyles[size],
        { backgroundColor: theme.colors.primary },
        (disabled || isLoading) && { opacity: 0.6 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.85}
    >
      {isLoading ? (
        <ActivityIndicator color={theme.colors.onPrimary} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            { color: theme.colors.onPrimary, fontSize: fontSizes[size] },
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
