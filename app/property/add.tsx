import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { PlusCircle } from 'lucide-react-native';
import { useTheme } from '../../src/hooks/useTheme';
import { Spacing, BorderRadius } from '../../src/theme/spacing';
import { AppHeader } from '../../src/components/common/AppHeader';
import { EmptyState } from '../../src/components/common/EmptyState';
import { PrimaryButton } from '../../src/components/common/PrimaryButton';

export default function AddPropertyScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <AppHeader title="List Your Property" onBack={() => router.back()} />
      <EmptyState
        icon={PlusCircle}
        title="List Your Property"
        description="Connect directly with tenants and save on brokerage. Add your property details to get started."
        actionLabel="Coming Soon"
        onAction={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
