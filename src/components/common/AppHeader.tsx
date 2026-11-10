import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, LucideIcon } from 'lucide-react-native';
import { colors, typography, spacing } from '../../theme';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showNotification?: boolean;
  onNotificationPress?: () => void;
  showAvatar?: boolean;
  onAvatarPress?: () => void;
  rightAction?: {
    icon: LucideIcon;
    onPress: () => void;
  };
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle = 'HabitFlow',
  showBack = false,
  onBack,
  showNotification = true,
  onNotificationPress,
  showAvatar = true,
  onAvatarPress,
  rightAction,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color={colors.onSurface} />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoPill}>
            <View style={styles.logoDot} />
          </View>
        )}

        <View style={styles.titleColumn}>
          {subtitle && !showBack && (
            <Text style={styles.subtitleText}>{subtitle.toUpperCase()}</Text>
          )}
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        {rightAction && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={rightAction.onPress}
            activeOpacity={0.7}
          >
            <rightAction.icon size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}

        {showNotification && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNotificationPress}
            accessibilityLabel="Notifications"
            activeOpacity={0.7}
          >
            <Bell size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}

        {showAvatar && (
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={onAvatarPress || (() => router.push('/(tabs)/profile'))}
            accessibilityLabel="User profile"
            activeOpacity={0.8}
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              }}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.margin,
    backgroundColor: colors.surface,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceContainerLow,
  },
  logoPill: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  logoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondaryContainer,
  },
  titleColumn: {
    justifyContent: 'center',
  },
  subtitleText: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    letterSpacing: 1.2,
  },
  titleText: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.surfaceContainerHigh,
    marginLeft: 4,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
});

