import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { AppTextField } from './AppTextField';
import { useTheme } from '../../hooks/useTheme';

interface PasswordFieldProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label = 'Password',
  error,
  helperText,
  ...props
}) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const Icon = isVisible ? EyeOff : Eye;

  return (
    <AppTextField
      label={label}
      error={error}
      helperText={helperText}
      secureTextEntry={!isVisible}
      rightIcon={<Icon size={20} color={theme.colors.placeholder} />}
      onRightIconPress={() => setIsVisible((prev) => !prev)}
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
    />
  );
};
