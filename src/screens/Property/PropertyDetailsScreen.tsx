import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  Share2,
  BadgeCheck,
  MapPin,
  BedDouble,
  Bath,
  Car,
  Maximize2,
  Phone,
  MessageSquare,
  Calendar,
  CheckCircle2,
} from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius, Shadows } from '../../theme/spacing';
import { usePropertyStore } from '../../store/propertyStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { DUMMY_PROPERTIES } from '../../constants/dummyData';
import { formatCurrency, formatFullCurrency, formatDate } from '../../utils/formatters';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { Avatar } from '../../components/common/Avatar';

const { width } = Dimensions.get('window');

export const PropertyDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const property = DUMMY_PROPERTIES.find((p) => p.id === id) ?? DUMMY_PROPERTIES[0];
  const favorited = isFavorite(property.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <FlatList
            data={property.images}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(index);
            }}
            scrollEventThrottle={16}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={[styles.image, { width }]} />
            )}
          />
          {/* Image indicators */}
          <View style={styles.indicators}>
            {property.images.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.indicator,
                  { backgroundColor: i === activeImageIndex ? 'white' : 'rgba(255,255,255,0.5)' },
                ]}
              />
            ))}
          </View>
          {/* Nav buttons */}
          <TouchableOpacity
            style={[styles.navBtn, styles.backBtn, { backgroundColor: theme.colors.surface }]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color={theme.colors.onSurface} />
          </TouchableOpacity>
          <View style={styles.topRight}>
            <TouchableOpacity
              style={[styles.navBtn, { backgroundColor: theme.colors.surface }]}
            >
              <Share2 size={18} color={theme.colors.onSurface} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navBtn, { backgroundColor: theme.colors.surface }]}
              onPress={() => toggleFavorite(property)}
            >
              <Heart
                size={18}
                color={favorited ? theme.colors.error : theme.colors.onSurface}
                fill={favorited ? theme.colors.error : 'none'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentPadding}>
          {/* Title & Price */}
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              {property.title}
            </Text>
            <View
              style={[
                styles.rentBadge,
                { backgroundColor: theme.colors.primaryContainer },
              ]}
            >
              <Text style={[styles.rentBadgeText, { color: theme.colors.primary }]}>
                {property.listingType.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={[styles.row, { marginBottom: Spacing[2] }]}>
            <MapPin size={14} color={theme.colors.primary} />
            <Text style={[styles.location, { color: theme.colors.onSurfaceVariant }]}>
              {property.location.address}, {property.location.locality},{' '}
              {property.location.city}
            </Text>
          </View>

          <Text style={[styles.rent, { color: theme.colors.primary }]}>
            {formatFullCurrency(property.rent)}
            <Text style={[styles.rentPeriod, { color: theme.colors.placeholder }]}>
              {' '}/month
            </Text>
          </Text>
          <Text style={[styles.deposit, { color: theme.colors.onSurfaceVariant }]}>
            Deposit: {formatFullCurrency(property.deposit)}
          </Text>

          {/* Key Details */}
          <View
            style={[
              styles.detailsGrid,
              { backgroundColor: theme.colors.surface },
              Shadows.sm,
            ]}
          >
            {[
              { icon: BedDouble, label: 'Bedrooms', value: property.bhk },
              { icon: Bath, label: 'Bathrooms', value: `${property.bathrooms}` },
              { icon: Maximize2, label: 'Area', value: `${property.area} sq.ft` },
              {
                icon: Car,
                label: 'Parking',
                value: property.parking ? 'Available' : 'No',
              },
            ].map((item, index) => (
              <View key={index} style={styles.detailItem}>
                <item.icon size={20} color={theme.colors.primary} />
                <Text style={[styles.detailValue, { color: theme.colors.onSurface }]}>
                  {item.value}
                </Text>
                <Text style={[styles.detailLabel, { color: theme.colors.onSurfaceVariant }]}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>

          {/* About */}
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            About this property
          </Text>
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
            {property.description}
          </Text>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Amenities
              </Text>
              <View style={styles.amenitiesGrid}>
                {property.amenities.map((amenity) => (
                  <View
                    key={amenity.id}
                    style={[
                      styles.amenityChip,
                      { backgroundColor: theme.colors.primaryContainer },
                    ]}
                  >
                    <CheckCircle2 size={14} color={theme.colors.primary} />
                    <Text style={[styles.amenityText, { color: theme.colors.primary }]}>
                      {amenity.name}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Owner */}
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Owner Details
          </Text>
          <View
            style={[
              styles.ownerCard,
              { backgroundColor: theme.colors.surface },
              Shadows.sm,
            ]}
          >
            <Avatar
              uri={property.ownerAvatar}
              name={property.ownerName}
              size={52}
            />
            <View style={styles.ownerInfo}>
              <View style={styles.ownerNameRow}>
                <Text style={[styles.ownerName, { color: theme.colors.onSurface }]}>
                  {property.ownerName}
                </Text>
                {property.isOwnerVerified && (
                  <BadgeCheck size={16} color={theme.colors.success} />
                )}
              </View>
              <Text style={[styles.ownerLabel, { color: theme.colors.onSurfaceVariant }]}>
                Property Owner
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.callBtn, { backgroundColor: theme.colors.primaryContainer }]}
            >
              <Phone size={18} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.availableDate, { color: theme.colors.onSurfaceVariant }]}>
            Available from:{' '}
            <Text style={{ color: theme.colors.onSurface, fontFamily: 'Poppins-Medium' }}>
              {formatDate(property.isAvailableFrom)}
            </Text>
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: theme.colors.surface,
            paddingBottom: insets.bottom + Spacing[3],
          },
          Shadows.lg,
        ]}
      >
        <TouchableOpacity
          style={[styles.chatBtn, { borderColor: theme.colors.primary }]}
          activeOpacity={0.8}
        >
          <MessageSquare size={18} color={theme.colors.primary} />
          <Text style={[styles.chatBtnText, { color: theme.colors.primary }]}>Chat</Text>
        </TouchableOpacity>
        <PrimaryButton
          title="Schedule Visit"
          onPress={() => router.push(`/booking/${property.id}` as any)}
          style={styles.visitBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  imageContainer: {
    position: 'relative',
    height: 280,
  },
  image: {
    height: 280,
    resizeMode: 'cover',
  },
  indicators: {
    position: 'absolute',
    bottom: Spacing[3],
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: Spacing[5],
    left: Spacing[4],
  },
  topRight: {
    position: 'absolute',
    top: Spacing[5],
    right: Spacing[4],
    flexDirection: 'row',
    gap: Spacing[2],
  },
  contentPadding: {
    padding: Spacing[5],
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing[2],
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    flex: 1,
    marginRight: Spacing[2],
  },
  rentBadge: {
    paddingHorizontal: Spacing[2],
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  rentBadgeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    flex: 1,
  },
  rent: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginTop: Spacing[3],
  },
  rentPeriod: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  deposit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    marginBottom: Spacing[5],
    marginTop: Spacing[1],
  },
  detailsGrid: {
    flexDirection: 'row',
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    marginBottom: Spacing[5],
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing[1],
  },
  detailValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    textAlign: 'center',
  },
  detailLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginBottom: Spacing[3],
    marginTop: Spacing[2],
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: Spacing[5],
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
    marginBottom: Spacing[5],
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[2],
    borderRadius: BorderRadius.full,
  },
  amenityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  ownerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[4],
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing[4],
  },
  ownerInfo: {
    flex: 1,
    marginLeft: Spacing[3],
  },
  ownerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ownerName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  ownerLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 2,
  },
  callBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availableDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    marginBottom: Spacing[8],
  },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[3],
    gap: Spacing[3],
    alignItems: 'center',
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[3],
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  chatBtnText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  visitBtn: {
    flex: 1,
    paddingVertical: Spacing[3],
  },
});
