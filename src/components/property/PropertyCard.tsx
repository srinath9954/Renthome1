import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  MapPin,
  Heart,
  BadgeCheck,
  BedDouble,
  Maximize2,
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius, Shadows } from '../../theme/spacing';
import { Property } from '../../types/property';
import { formatCurrency } from '../../utils/formatters';
import { useFavoritesStore } from '../../store/favoritesStore';

interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  variant?: 'card' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  variant = 'card',
}) => {
  const theme = useTheme();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorited = isFavorite(property.id);

  if (variant === 'list') {
    return (
      <TouchableOpacity
        style={[
          styles.listCard,
          { backgroundColor: theme.colors.card },
          Shadows.sm,
        ]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image source={{ uri: property.images[0] }} style={styles.listImage} />
        <View style={styles.listContent}>
          <View style={styles.listHeader}>
            <Text
              style={[styles.listTitle, { color: theme.colors.onSurface }]}
              numberOfLines={1}
            >
              {property.title}
            </Text>
            <TouchableOpacity
              onPress={() => toggleFavorite(property)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Heart
                size={18}
                color={favorited ? theme.colors.error : theme.colors.placeholder}
                fill={favorited ? theme.colors.error : 'none'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <MapPin size={12} color={theme.colors.placeholder} />
            <Text
              style={[styles.locationText, { color: theme.colors.onSurfaceVariant }]}
              numberOfLines={1}
            >
              {property.location.locality}, {property.location.city}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.bhkBadge, { color: theme.colors.primary }]}>
              {property.bhk}
            </Text>
            <Text style={[styles.dot, { color: theme.colors.placeholder }]}>•</Text>
            <Text style={[styles.furnished, { color: theme.colors.onSurfaceVariant }]}>
              {property.furnishedStatus}
            </Text>
          </View>
          <View style={styles.listFooter}>
            <Text style={[styles.rent, { color: theme.colors.primary }]}>
              {formatCurrency(property.rent)}
              <Text style={[styles.rentLabel, { color: theme.colors.placeholder }]}>
                {' '}/mo
              </Text>
            </Text>
            {property.isOwnerVerified && (
              <View style={styles.verifiedBadge}>
                <BadgeCheck size={12} color={theme.colors.success} />
                <Text style={[styles.verifiedText, { color: theme.colors.success }]}>
                  Verified
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.colors.card }, Shadows.md]}
      onPress={onPress}
      activeOpacity={0.92}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: property.images[0] }} style={styles.image} />
        <TouchableOpacity
          style={[styles.favoriteButton, { backgroundColor: theme.colors.surface }]}
          onPress={() => toggleFavorite(property)}
          activeOpacity={0.8}
        >
          <Heart
            size={16}
            color={favorited ? theme.colors.error : theme.colors.placeholder}
            fill={favorited ? theme.colors.error : 'none'}
          />
        </TouchableOpacity>
        <View style={[styles.typeBadge, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.typeBadgeText, { color: theme.colors.onPrimary }]}>
            {property.listingType.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text
            style={[styles.title, { color: theme.colors.onSurface }]}
            numberOfLines={1}
          >
            {property.title}
          </Text>
        </View>
        <View style={[styles.row, { marginTop: Spacing[1] }]}>
          <MapPin size={13} color={theme.colors.placeholder} />
          <Text
            style={[styles.location, { color: theme.colors.onSurfaceVariant }]}
            numberOfLines={1}
          >
            {property.location.locality}, {property.location.city}
          </Text>
        </View>
        <View style={[styles.tagsRow, { marginTop: Spacing[2] }]}>
          <View style={[styles.tag, { backgroundColor: theme.colors.primaryContainer }]}>
            <BedDouble size={12} color={theme.colors.primary} />
            <Text style={[styles.tagText, { color: theme.colors.primary }]}>
              {property.bhk}
            </Text>
          </View>
          <View style={[styles.tag, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Maximize2 size={12} color={theme.colors.onSurfaceVariant} />
            <Text style={[styles.tagText, { color: theme.colors.onSurfaceVariant }]}>
              {property.area} sq.ft
            </Text>
          </View>
          <View style={[styles.tag, { backgroundColor: theme.colors.surfaceVariant }]}>
            <Text style={[styles.tagText, { color: theme.colors.onSurfaceVariant }]}>
              {property.furnishedStatus}
            </Text>
          </View>
        </View>
        <View style={[styles.footer, { marginTop: Spacing[3] }]}>
          <View>
            <Text style={[styles.rent, { color: theme.colors.primary }]}>
              {formatCurrency(property.rent)}
              <Text style={[styles.rentPeriod, { color: theme.colors.placeholder }]}>
                {' '}/month
              </Text>
            </Text>
          </View>
          {property.isOwnerVerified && (
            <View style={styles.verifiedContainer}>
              <BadgeCheck size={14} color={theme.colors.success} />
              <Text style={[styles.verifiedLabel, { color: theme.colors.success }]}>
                Verified Owner
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    width: 240,
    marginRight: Spacing[4],
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing[2],
    right: Spacing[2],
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBadge: {
    position: 'absolute',
    top: Spacing[2],
    left: Spacing[2],
    paddingHorizontal: Spacing[2],
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  typeBadgeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
  },
  content: {
    padding: Spacing[3],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    flex: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing[2],
    paddingVertical: 3,
    borderRadius: BorderRadius.xs,
  },
  tagText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rent: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  rentPeriod: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
  },
  // List variant
  listCard: {
    flexDirection: 'row',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing[3],
  },
  listImage: {
    width: 110,
    height: 110,
    resizeMode: 'cover',
  },
  listContent: {
    flex: 1,
    padding: Spacing[3],
    justifyContent: 'space-between',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  listTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    flex: 1,
    marginRight: Spacing[2],
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    flex: 1,
    marginLeft: 3,
  },
  bhkBadge: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
  },
  dot: {
    marginHorizontal: 4,
    fontSize: 11,
  },
  furnished: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    textTransform: 'capitalize',
  },
  listFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rentLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  verifiedText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
});
