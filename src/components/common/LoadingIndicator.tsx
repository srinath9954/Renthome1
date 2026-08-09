import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing } from '../../theme/spacing';

interface LoadingIndicatorProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'small' | 'large';
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message,
  fullScreen = false,
  size = 'large',
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        fullScreen && styles.fullScreen,
        fullScreen && { backgroundColor: theme.colors.background },
      ]}
    >
      <ActivityIndicator size={size} color={theme.colors.primary} />
      {message && (
        <Text style={[styles.message, { color: theme.colors.onSurfaceVariant }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing[6],
  },
  fullScreen: {
    flex: 1,
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: Spacing[3],
  },
});
