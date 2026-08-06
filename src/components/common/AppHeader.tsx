import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing } from '../../theme/spacing';
import { Shadows } from '../../theme/spacing';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  transparent?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightElement,
  transparent = false,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + Spacing[2],
          backgroundColor: transparent ? 'transparent' : theme.colors.surface,
        },
        !transparent && Shadows.sm,
      ]}
    >
      <View style={styles.content}>
        {onBack && (
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.colors.surfaceVariant }]}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={theme.colors.onSurface} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, { color: theme.colors.onSurface }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              {subtitle}
            </Text>
          )}
        </View>
        {rightElement ? (
          <View style={styles.rightElement}>{rightElement}</View>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing[3],
    paddingHorizontal: Spacing[4],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing[3],
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 1,
  },
  rightElement: {
    marginLeft: Spacing[3],
  },
  placeholder: {
    width: 40,
  },
});
