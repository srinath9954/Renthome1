import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Settings,
  Home,
  Calendar,
  LogOut,
  ChevronRight,
  Edit3,
  BadgeCheck,
  Phone,
  Mail,
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius, Shadows } from '../../theme/spacing';
import { Avatar } from '../../components/common/Avatar';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  onPress: () => void;
  danger?: boolean;
}

export const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { user: authUser, logout } = useAuthStore();
  const { user } = useUserStore();

  const displayUser = user;

  const menuItems: MenuItem[] = [
    {
      id: 'my-properties',
      icon: <Home size={20} color={theme.colors.primary} />,
      label: 'My Properties',
      sublabel: `${displayUser?.totalProperties ?? 0} listed`,
      onPress: () => {},
    },
    {
      id: 'bookings',
      icon: <Calendar size={20} color={theme.colors.secondary} />,
      label: 'My Bookings',
      sublabel: `${displayUser?.totalBookings ?? 0} visits`,
      onPress: () => {},
    },
    {
      id: 'settings',
      icon: <Settings size={20} color={theme.colors.onSurfaceVariant} />,
      label: 'Settings',
      onPress: () => {},
    },
    {
      id: 'logout',
      icon: <LogOut size={20} color={theme.colors.error} />,
      label: 'Logout',
      danger: true,
      onPress: () => {
        logout();
        router.replace('/auth/login');
      },
    },
  ];

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.menuItem,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.divider,
        },
      ]}
      onPress={item.onPress}
      activeOpacity={0.8}
    >
      <View style={[styles.menuIcon, { backgroundColor: theme.colors.surfaceVariant }]}>
        {item.icon}
      </View>
      <View style={styles.menuContent}>
        <Text
          style={[
            styles.menuLabel,
            { color: item.danger ? theme.colors.error : theme.colors.onSurface },
          ]}
        >
          {item.label}
        </Text>
        {item.sublabel && (
          <Text style={[styles.menuSublabel, { color: theme.colors.onSurfaceVariant }]}>
            {item.sublabel}
          </Text>
        )}
      </View>
      <ChevronRight size={18} color={theme.colors.placeholder} />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + Spacing[8] }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View
        style={[
          styles.profileHeader,
          {
            backgroundColor: theme.colors.primary,
            paddingTop: insets.top + Spacing[4],
          },
        ]}
      >
        <View style={styles.profileHeaderContent}>
          <Avatar
            uri={displayUser?.avatarUrl}
            name={displayUser?.name ?? 'User'}
            size={80}
          />
          <TouchableOpacity
            style={[styles.editAvatar, { backgroundColor: theme.colors.surface }]}
          >
            <Edit3 size={14} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.userName, { color: theme.colors.onPrimary }]}>
          {displayUser?.name ?? 'User'}
        </Text>
        {displayUser?.isVerified && (
          <View style={styles.verifiedRow}>
            <BadgeCheck size={14} color={theme.colors.onPrimary + 'cc'} />
            <Text style={[styles.verifiedText, { color: theme.colors.onPrimary + 'cc' }]}>
              Verified Account
            </Text>
          </View>
        )}
      </View>

      {/* Contact Info */}
      <View
        style={[
          styles.contactCard,
          { backgroundColor: theme.colors.surface },
          Shadows.sm,
        ]}
      >
        <View style={styles.contactRow}>
          <Mail size={16} color={theme.colors.onSurfaceVariant} />
          <Text style={[styles.contactText, { color: theme.colors.onSurface }]}>
            {displayUser?.email}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: theme.colors.divider }]} />
        <View style={styles.contactRow}>
          <Phone size={16} color={theme.colors.onSurfaceVariant} />
          <Text style={[styles.contactText, { color: theme.colors.onSurface }]}>
            {displayUser?.phone}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={[styles.statsCard, { backgroundColor: theme.colors.surface }, Shadows.sm]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {displayUser?.totalProperties ?? 0}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
            Properties
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.divider }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>
            {displayUser?.totalBookings ?? 0}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
            Bookings
          </Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.divider }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.primary }]}>4.8</Text>
          <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>
            Rating
          </Text>
        </View>
      </View>

      {/* Menu */}
      <View style={[styles.menuCard, { backgroundColor: theme.colors.surface }, Shadows.sm]}>
        {menuItems.map(renderMenuItem)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  profileHeader: {
    alignItems: 'center',
    paddingBottom: Spacing[8],
    borderBottomLeftRadius: BorderRadius['3xl'],
    borderBottomRightRadius: BorderRadius['3xl'],
  },
  profileHeaderContent: {
    position: 'relative',
    marginBottom: Spacing[3],
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginBottom: Spacing[1],
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  contactCard: {
    marginHorizontal: Spacing[5],
    marginTop: Spacing[5],
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[2],
  },
  contactText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  divider: {
    height: 0.5,
    marginVertical: Spacing[1],
  },
  statsCard: {
    marginHorizontal: Spacing[5],
    marginTop: Spacing[4],
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    padding: Spacing[4],
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  statDivider: {
    width: 0.5,
    marginHorizontal: Spacing[2],
  },
  menuCard: {
    marginHorizontal: Spacing[5],
    marginTop: Spacing[4],
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
    borderBottomWidth: 0.5,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing[3],
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  menuSublabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 1,
  },
});
