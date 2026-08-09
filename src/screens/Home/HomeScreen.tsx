import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Search,
  Bell,
  MapPin,
  SlidersHorizontal,
  Grid2x2,
  Home,
  Building2,
  Users,
  Briefcase,
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius, Shadows } from '../../theme/spacing';
import { SectionHeader } from '../../components/common/SectionHeader';
import { Avatar } from '../../components/common/Avatar';
import { PropertyCard } from '../../components/property/PropertyCard';
import { useAuthStore } from '../../store/authStore';
import { usePropertyStore } from '../../store/propertyStore';
import { PROPERTY_CATEGORIES } from '../../constants/dummyData';

const categoryIcons: Record<string, React.ElementType> = {
  all: Grid2x2,
  apartment: Building2,
  villa: Home,
  house: Home,
  pg: Users,
  studio: Grid2x2,
  commercial: Briefcase,
};

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const { featuredProperties, nearbyProperties, recentlyViewed, addRecentlyViewed } =
    usePropertyStore();
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handlePropertyPress = (propertyId: string) => {
    const property = featuredProperties.find((p) => p.id === propertyId);
    if (property) addRecentlyViewed(property);
    router.push(`/property/${propertyId}` as any);
  };

  return (
    <ScrollView
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: Spacing[8] }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.primary,
            paddingTop: insets.top + Spacing[4],
          },
        ]}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.onPrimary + 'cc' }]}>
              {greeting()},
            </Text>
            <Text style={[styles.userName, { color: theme.colors.onPrimary }]}>
              {user?.name?.split(' ')[0] ?? 'User'} 👋
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.headerBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
            >
              <Bell size={20} color={theme.colors.onPrimary} />
            </TouchableOpacity>
            <Avatar uri={user?.avatarUrl} name={user?.name} size={40} />
          </View>
        </View>

        <View style={styles.locationRow}>
          <MapPin size={14} color={theme.colors.onPrimary + 'cc'} />
          <Text style={[styles.locationText, { color: theme.colors.onPrimary + 'cc' }]}>
            Bengaluru, Karnataka
          </Text>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
          onPress={() => router.push('/(tabs)/search')}
          activeOpacity={0.9}
        >
          <Search size={18} color={theme.colors.placeholder} />
          <Text style={[styles.searchPlaceholder, { color: theme.colors.placeholder }]}>
            Search by location, property type...
          </Text>
          <View style={[styles.filterBtn, { backgroundColor: theme.colors.primary }]}>
            <SlidersHorizontal size={16} color={theme.colors.onPrimary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <SectionHeader title="Browse by Type" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {PROPERTY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.surface,
                  },
                  Shadows.sm,
                ]}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.8}
              >
                {React.createElement(categoryIcons[cat.id], {
                  size: 20,
                  color: isSelected
                    ? theme.colors.onPrimary
                    : theme.colors.onSurfaceVariant,
                })}
                <Text
                  style={[
                    styles.categoryLabel,
                    {
                      color: isSelected
                        ? theme.colors.onPrimary
                        : theme.colors.onSurfaceVariant,
                    },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Featured Properties */}
      <View style={styles.section}>
        <SectionHeader
          title="Featured Properties"
          actionLabel="See All"
          onAction={() => router.push('/(tabs)/search')}
        />
        <FlatList
          data={featuredProperties}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              onPress={() => handlePropertyPress(item.id)}
              variant="card"
            />
          )}
          scrollEventThrottle={16}
        />
      </View>

      {/* Nearby Properties */}
      <View style={styles.section}>
        <SectionHeader
          title="Near You"
          actionLabel="See All"
          onAction={() => router.push('/(tabs)/search')}
        />
        <FlatList
          data={nearbyProperties}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <PropertyCard
              property={item}
              onPress={() => handlePropertyPress(item.id)}
              variant="card"
            />
          )}
          scrollEventThrottle={16}
        />
      </View>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <View style={styles.section}>
          <SectionHeader title="Recently Viewed" />
          {recentlyViewed.slice(0, 3).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onPress={() => handlePropertyPress(property.id)}
              variant="list"
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[6],
    borderBottomLeftRadius: BorderRadius['3xl'],
    borderBottomRightRadius: BorderRadius['3xl'],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[1],
  },
  greeting: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing[4],
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    paddingLeft: Spacing[4],
    paddingVertical: Spacing[3],
    paddingRight: Spacing[2],
    gap: Spacing[2],
    ...Shadows.md,
  },
  searchPlaceholder: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    flex: 1,
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[6],
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderRadius: BorderRadius.lg,
    marginRight: Spacing[3],
    gap: Spacing[1],
    minWidth: 72,
  },
  categoryLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
  },
});
