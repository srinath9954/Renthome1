import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius } from '../../theme/spacing';

interface AppTextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const AppTextField: React.FC<AppTextFieldProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? theme.colors.error
    : isFocused
    ? theme.colors.primary
    : theme.colors.border;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.onSurface,
              paddingLeft: leftIcon ? 0 : Spacing[4],
              paddingRight: rightIcon ? 0 : Spacing[4],
            },
          ]}
          placeholderTextColor={theme.colors.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {(error || helperText) && (
        <Text
          style={[
            styles.helperText,
            { color: error ? theme.colors.error : theme.colors.placeholder },
          ]}
        >
          {error ?? helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing[4],
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    marginBottom: Spacing[1],
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    minHeight: 52,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    paddingVertical: Spacing[3],
  },
  leftIcon: {
    paddingHorizontal: Spacing[3],
  },
  rightIcon: {
    paddingHorizontal: Spacing[3],
  },
  helperText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: Spacing[1],
  },
});
