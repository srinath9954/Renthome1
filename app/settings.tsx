import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '../src/hooks/useTheme';
import { Spacing, BorderRadius, Shadows } from '../src/theme/spacing';
import { AppHeader } from '../src/components/common/AppHeader';

interface SettingRow {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export default function SettingsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = React.useState(true);
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const settings: SettingRow[] = [
    {
      label: 'Push Notifications',
      description: 'Get notified about new properties and messages',
      value: notifications,
      onChange: setNotifications,
    },
    {
      label: 'Email Alerts',
      description: 'Receive property alerts and booking updates via email',
      value: emailAlerts,
      onChange: setEmailAlerts,
    },
    {
      label: 'Dark Mode',
      description: 'Switch to dark theme (follows system by default)',
      value: darkMode,
      onChange: setDarkMode,
    },
  ];

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <AppHeader title="Settings" onBack={() => router.back()} />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + Spacing[6] }}>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.colors.surface },
            Shadows.sm,
          ]}
        >
          {settings.map((setting, index) => (
            <View
              key={setting.label}
              style={[
                styles.row,
                {
                  borderBottomColor: theme.colors.divider,
                  borderBottomWidth: index < settings.length - 1 ? 0.5 : 0,
                },
              ]}
            >
              <View style={styles.rowContent}>
                <Text style={[styles.rowLabel, { color: theme.colors.onSurface }]}>
                  {setting.label}
                </Text>
                <Text style={[styles.rowDesc, { color: theme.colors.onSurfaceVariant }]}>
                  {setting.description}
                </Text>
              </View>
              <Switch
                value={setting.value}
                onValueChange={setting.onChange}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primaryContainer,
                }}
                thumbColor={setting.value ? theme.colors.primary : theme.colors.placeholder}
              />
            </View>
          ))}
        </View>

        <Text style={[styles.version, { color: theme.colors.placeholder }]}>
          NoBroker Clone v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: {
    marginHorizontal: Spacing[5],
    marginTop: Spacing[5],
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
  },
  rowContent: {
    flex: 1,
    marginRight: Spacing[4],
  },
  rowLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginBottom: 2,
  },
  rowDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 17,
  },
  version: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginTop: Spacing[8],
  },
});
