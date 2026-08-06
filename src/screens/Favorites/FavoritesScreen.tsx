import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing } from '../../theme/spacing';
import { PropertyCard } from '../../components/property/PropertyCard';
import { EmptyState } from '../../components/common/EmptyState';
import { useFavoritesStore } from '../../store/favoritesStore';
import { usePropertyStore } from '../../store/propertyStore';
import { Property } from '../../types/property';

export const FavoritesScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { favorites } = useFavoritesStore();
  const { addRecentlyViewed } = usePropertyStore();

  const handlePropertyPress = (property: Property) => {
    addRecentlyViewed(property);
    router.push(`/property/${property.id}` as any);
  };

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + Spacing[4],
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
          Saved Properties
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
          {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
        </Text>
      </View>

      <FlatList
        data={favorites}
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
            icon={Heart}
            title="No saved properties"
            description="Start exploring and save properties you love. They'll appear here for easy access."
            actionLabel="Explore Properties"
            onAction={() => router.push('/(tabs)/search')}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    marginBottom: Spacing[1],
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
  },
  list: {
    padding: Spacing[5],
  },
});
