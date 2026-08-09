import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing } from '../../theme/spacing';
import { SecondaryButton } from './SecondaryButton';

interface ErrorViewProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  onRetry,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, { backgroundColor: theme.colors.error + '20' }]}>
        <AlertCircle size={48} color={theme.colors.error} strokeWidth={1.5} />
      </View>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
        {message}
      </Text>
      {onRetry && (
        <SecondaryButton title="Try Again" onPress={onRetry} style={styles.button} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing[8],
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[6],
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: Spacing[2],
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing[6],
  },
  button: {
    minWidth: 160,
  },
});
