import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius, Shadows } from '../../theme/spacing';
import { PropertyCard } from '../../components/property/PropertyCard';
import { EmptyState } from '../../components/common/EmptyState';
import { usePropertyStore } from '../../store/propertyStore';
import { Property } from '../../types/property';

export const SearchScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { properties, addRecentlyViewed } = usePropertyStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isGrid, setIsGrid] = useState(false);

  const filtered = searchQuery.trim()
    ? properties.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.bhk.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : properties;

  const handlePropertyPress = (property: Property) => {
    addRecentlyViewed(property);
    router.push(`/property/${property.id}` as any);
  };

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      {/* Search Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + Spacing[3],
            backgroundColor: theme.colors.surface,
          },
          Shadows.sm,
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
          Search Properties
        </Text>
        <View style={styles.searchRow}>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: theme.colors.surfaceVariant, flex: 1 },
            ]}
          >
            <Search size={18} color={theme.colors.placeholder} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.onSurface }]}
              placeholder="City, locality or property name..."
              placeholderTextColor={theme.colors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
            />
          </View>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: theme.colors.primary }]}
            activeOpacity={0.8}
          >
            <SlidersHorizontal size={18} color={theme.colors.onPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.resultsRow}>
          <Text style={[styles.resultsCount, { color: theme.colors.onSurfaceVariant }]}>
            {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
          </Text>
          <View style={styles.viewToggle}>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                !isGrid && { backgroundColor: theme.colors.primaryContainer },
              ]}
              onPress={() => setIsGrid(false)}
            >
              <List size={16} color={!isGrid ? theme.colors.primary : theme.colors.placeholder} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                isGrid && { backgroundColor: theme.colors.primaryContainer },
              ]}
              onPress={() => setIsGrid(true)}
            >
              <LayoutGrid
                size={16}
                color={isGrid ? theme.colors.primary : theme.colors.placeholder}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + Spacing[6] },
        ]}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => handlePropertyPress(item)}
            variant="list"
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No properties found"
            description="Try adjusting your search or filters to find what you're looking for."
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[4],
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: Spacing[3],
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    marginBottom: Spacing[3],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    gap: Spacing[2],
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  viewToggle: {
    flexDirection: 'row',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    gap: 2,
  },
  toggleBtn: {
    padding: Spacing[2],
    borderRadius: BorderRadius.sm,
  },
  list: {
    padding: Spacing[5],
  },
});
