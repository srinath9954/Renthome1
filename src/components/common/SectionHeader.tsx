import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing } from '../../theme/spacing';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onAction,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity style={styles.action} onPress={onAction} activeOpacity={0.7}>
          <Text style={[styles.actionLabel, { color: theme.colors.primary }]}>
            {actionLabel}
          </Text>
          <ChevronRight size={16} color={theme.colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing[3],
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
});
