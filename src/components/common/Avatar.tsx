import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  showBadge?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 40,
  showBadge = false,
}) => {
  const theme = useTheme();

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <View style={{ width: size, height: size }}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: theme.colors.primaryContainer,
            },
          ]}
        >
          <Text
            style={[
              styles.initials,
              { color: theme.colors.primary, fontSize: size * 0.36 },
            ]}
          >
            {initials}
          </Text>
        </View>
      )}
      {showBadge && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: theme.colors.success,
              width: size * 0.3,
              height: size * 0.3,
              borderRadius: size * 0.15,
              right: 0,
              bottom: 0,
              borderColor: theme.colors.surface,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: 'Poppins-SemiBold',
  },
  badge: {
    position: 'absolute',
    borderWidth: 2,
  },
});
