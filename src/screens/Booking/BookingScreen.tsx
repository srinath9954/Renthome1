import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, BorderRadius, Shadows } from '../../theme/spacing';
import { AppHeader } from '../../components/common/AppHeader';
import { AppTextField } from '../../components/common/AppTextField';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { DUMMY_PROPERTIES } from '../../constants/dummyData';
import { formatCurrency } from '../../utils/formatters';

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

const DATE_OPTIONS = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  return {
    date: date.toISOString().split('T')[0],
    day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
    num: date.getDate(),
    month: date.toLocaleDateString('en-IN', { month: 'short' }),
  };
});

export const BookingScreen: React.FC = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const property = DUMMY_PROPERTIES.find((p) => p.id === id) ?? DUMMY_PROPERTIES[0];

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <View
        style={[
          styles.successContainer,
          { backgroundColor: theme.colors.background, paddingBottom: insets.bottom },
        ]}
      >
        <View style={[styles.successIcon, { backgroundColor: theme.colors.primaryContainer }]}>
          <CheckCircle2 size={64} color={theme.colors.primary} strokeWidth={1.5} />
        </View>
        <Text style={[styles.successTitle, { color: theme.colors.onSurface }]}>
          Visit Scheduled!
        </Text>
        <Text style={[styles.successDesc, { color: theme.colors.onSurfaceVariant }]}>
          Your visit has been scheduled for {selectedDate} at {selectedTime}. The owner will
          confirm your request shortly.
        </Text>
        <PrimaryButton
          title="Back to Home"
          onPress={() => router.replace('/(tabs)/home')}
          style={styles.successBtn}
        />
      </View>
    );
  }

  return (
    <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <AppHeader title="Schedule a Visit" onBack={() => router.back()} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing[10] }}
        showsVerticalScrollIndicator={false}
      >
        {/* Property Summary */}
        <View style={[styles.propertyCard, { backgroundColor: theme.colors.surface }, Shadows.sm]}>
          <Image source={{ uri: property.images[0] }} style={styles.propertyImage} />
          <View style={styles.propertyInfo}>
            <Text
              style={[styles.propertyTitle, { color: theme.colors.onSurface }]}
              numberOfLines={2}
            >
              {property.title}
            </Text>
            <Text style={[styles.propertyLocation, { color: theme.colors.onSurfaceVariant }]}>
              {property.location.locality}, {property.location.city}
            </Text>
            <Text style={[styles.propertyRent, { color: theme.colors.primary }]}>
              {formatCurrency(property.rent)}/mo
            </Text>
          </View>
        </View>

        <View style={styles.padding}>
          {/* Select Date */}
          <View style={styles.sectionHeader}>
            <Calendar size={18} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Select Date
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
            {DATE_OPTIONS.map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <TouchableOpacity
                  key={d.date}
                  style={[
                    styles.dateChip,
                    {
                      backgroundColor: isSelected
                        ? theme.colors.primary
                        : theme.colors.surface,
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    },
                    Shadows.sm,
                  ]}
                  onPress={() => setSelectedDate(d.date)}
                >
                  <Text
                    style={[
                      styles.dateDay,
                      {
                        color: isSelected
                          ? theme.colors.onPrimary
                          : theme.colors.onSurfaceVariant,
                      },
                    ]}
                  >
                    {d.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateNum,
                      {
                        color: isSelected
                          ? theme.colors.onPrimary
                          : theme.colors.onSurface,
                      },
                    ]}
                  >
                    {d.num}
                  </Text>
                  <Text
                    style={[
                      styles.dateMonth,
                      {
                        color: isSelected
                          ? theme.colors.onPrimary
                          : theme.colors.onSurfaceVariant,
                      },
                    ]}
                  >
                    {d.month}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Select Time */}
          <View style={[styles.sectionHeader, { marginTop: Spacing[5] }]}>
            <Clock size={18} color={theme.colors.primary} />
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Select Time Slot
            </Text>
          </View>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeChip,
                    {
                      backgroundColor: isSelected
                        ? theme.colors.primary
                        : theme.colors.surface,
                      borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                    },
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      styles.timeText,
                      {
                        color: isSelected
                          ? theme.colors.onPrimary
                          : theme.colors.onSurface,
                      },
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Message */}
          <AppTextField
            label="Message to Owner (Optional)"
            placeholder="Tell the owner about yourself or ask any questions..."
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            containerStyle={{ marginTop: Spacing[5] }}
          />
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
        <PrimaryButton
          title="Confirm Visit"
          onPress={handleBook}
          isLoading={isLoading}
          disabled={!selectedDate || !selectedTime}
          style={styles.confirmBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  propertyCard: {
    flexDirection: 'row',
    marginHorizontal: Spacing[5],
    marginTop: Spacing[4],
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  propertyImage: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
  },
  propertyInfo: {
    flex: 1,
    padding: Spacing[3],
    justifyContent: 'center',
  },
  propertyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    marginBottom: Spacing[1],
  },
  propertyLocation: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginBottom: Spacing[1],
  },
  propertyRent: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  padding: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[5],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    marginBottom: Spacing[3],
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  dateScroll: {
    marginHorizontal: -Spacing[5],
    paddingHorizontal: Spacing[5],
  },
  dateChip: {
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginRight: Spacing[2],
    minWidth: 64,
  },
  dateDay: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
  },
  dateNum: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginVertical: 2,
  },
  dateMonth: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[2],
  },
  timeChip: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  timeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  bottomBar: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[3],
  },
  confirmBtn: {
    width: '100%',
    paddingVertical: Spacing[4],
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing[8],
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[6],
  },
  successTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    marginBottom: Spacing[3],
    textAlign: 'center',
  },
  successDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing[8],
  },
  successBtn: {
    minWidth: 200,
    paddingVertical: Spacing[4],
  },
});
