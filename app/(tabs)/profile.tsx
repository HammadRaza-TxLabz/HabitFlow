import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import {
  Bell,
  Moon,
  Vibrate,
  Layers,
  Download,
  Shield,
  LogOut,
  ChevronRight,
  Sparkles,
  Edit3,
} from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { useMockStore } from '@/store/useMockStore';
import { logoutUser } from '@/features/auth/auth.service';

export default function ProfileScreen() {
  const user = useMockStore((state) => state.user);
  const preferences = useMockStore((state) => state.preferences);
  const updatePreferences = useMockStore((state) => state.updatePreferences);

  const handleSignOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await logoutUser();
          } catch (error) {
            Alert.alert('Error', 'Unable to log out. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="Profile & Settings"
        subtitle="HabitFlow"
        showAvatar={false}
        showNotification={false}
      />

      {/* User Identity Card */}
      <View style={styles.userCard}>
        <View style={styles.userHeader}>
          {user.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitial}>
                {user.fullName.split(' ').map((n) => n[0]).join('')}
              </Text>
            </View>
          )}

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.fullName}</Text>
            <View style={styles.tierBadge}>
              <Sparkles size={11} color={colors.secondary} strokeWidth={2} />
              <Text style={styles.tierText}>{user.membershipTier}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => router.push('/profile/edit')}
            activeOpacity={0.7}
          >
            <Edit3 size={15} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.userBio}>{user.bio}</Text>

        {/* Stats Triad */}
        <View style={styles.statsTriad}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.joinedDays}d</Text>
            <Text style={styles.statLabel}>Days Active</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.bestStreak}d</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.completionRate}%</Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>
      </View>

      {/* Group 1: Practice Preferences */}
      <View style={styles.groupContainer}>
        <Text style={styles.groupHeader}>APP PREFERENCES</Text>

        <TouchableOpacity
          style={styles.settingsRow}
          onPress={() => router.push('/profile/reminders')}
          activeOpacity={0.7}
        >
          <View style={styles.rowIcon}>
            <Bell size={18} color={colors.primary} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle}>Reminders & Sounds</Text>
            <Text style={styles.rowSubtitle}>Set custom alerts and notification times</Text>
          </View>
          <ChevronRight size={18} color={colors.outline} />
        </TouchableOpacity>

        <View style={styles.settingsRow}>
          <View style={styles.rowIcon}>
            <Moon size={18} color={colors.secondary} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle}>Do Not Disturb</Text>
            <Text style={styles.rowSubtitle}>Mute alerts between 10:00 PM – 07:00 AM</Text>
          </View>
          <ToggleSwitch
            checked={preferences.dndEnabled}
            onToggle={(val) => updatePreferences({ dndEnabled: val })}
          />
        </View>

        <View style={styles.settingsRow}>
          <View style={styles.rowIcon}>
            <Vibrate size={18} color={colors.primary} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle}>Vibration Feedback</Text>
            <Text style={styles.rowSubtitle}>Gentle vibration when completing a habit</Text>
          </View>
          <ToggleSwitch
            checked={preferences.hapticFeedback ?? true}
            onToggle={(val) => updatePreferences({ hapticFeedback: val })}
          />
        </View>
      </View>

      {/* Group 2: System & Specifications */}
      <View style={styles.groupContainer}>
        <Text style={styles.groupHeader}>SYSTEM & DATA</Text>

        <TouchableOpacity
          style={styles.settingsRow}
          onPress={() => router.push('/ui-states')}
          activeOpacity={0.7}
        >
          <View style={styles.rowIcon}>
            <Layers size={18} color={colors.primary} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle}>UI States & Components</Text>
            <Text style={styles.rowSubtitle}>View design system and test components</Text>
          </View>
          <View style={styles.specBadge}>
            <Text style={styles.specBadgeText}>SPEC 15</Text>
          </View>
          <ChevronRight size={18} color={colors.outline} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsRow} activeOpacity={0.7}>
          <View style={styles.rowIcon}>
            <Download size={18} color={colors.onSurfaceVariant} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle}>Export Data</Text>
            <Text style={styles.rowSubtitle}>Download habits in JSON or CSV format</Text>
          </View>
          <ChevronRight size={18} color={colors.outline} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsRow} activeOpacity={0.7}>
          <View style={styles.rowIcon}>
            <Shield size={18} color={colors.onSurfaceVariant} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.rowTitle}>Privacy & Offline Mode</Text>
            <Text style={styles.rowSubtitle}>All data is stored safely on your device</Text>
          </View>
          <ChevronRight size={18} color={colors.outline} />
        </TouchableOpacity>
      </View>

      {/* Group 3: Sign Out Action */}
      <View style={styles.groupContainer}>
        <TouchableOpacity
          style={[styles.settingsRow, styles.signOutRow]}
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <View style={[styles.rowIcon, styles.signOutIcon]}>
            <LogOut size={18} color={colors.error} />
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.signOutTitle}>Log Out</Text>
            <Text style={styles.rowSubtitle}>Return to the sign-in flow</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Version Footer */}
      <View style={styles.versionFooter}>
        <Text style={styles.versionText}>HABITFLOW v1.0.0</Text>
        <Text style={styles.versionSub}>Simple Daily Habit Tracker</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.lg,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: colors.secondaryContainer,
  },
  avatarFallback: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    ...typography.titleLg,
    color: '#FFFFFF',
    fontFamily: 'Manrope_700Bold',
  },
  userInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  userName: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  tierText: {
    ...typography.caption,
    color: colors.secondary,
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    letterSpacing: 0.8,
  },
  editProfileButton: {
    padding: 8,
    borderRadius: spacing.radius.full,
    backgroundColor: colors.surfaceContainer,
  },
  userBio: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  statsTriad: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: spacing.radius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...typography.titleLg,
    fontFamily: 'Manrope_700Bold',
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    fontSize: 10,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.outlineVariant,
  },
  groupContainer: {
    marginBottom: spacing.lg,
  },
  groupHeader: {
    ...typography.caption,
    letterSpacing: 1.5,
    color: colors.secondary,
    fontFamily: 'Manrope_700Bold',
    fontSize: 9,
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: 6,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    ...typography.titleMd,
    fontSize: 14,
    color: colors.onSurface,
  },
  rowSubtitle: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  specBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: spacing.radius.xs,
    marginRight: spacing.xs,
  },
  specBadgeText: {
    ...typography.caption,
    fontFamily: 'Manrope_700Bold',
    color: colors.secondary,
    fontSize: 9,
  },
  signOutRow: {
    borderColor: '#F3C4BE',
  },
  signOutIcon: {
    backgroundColor: colors.errorContainer,
  },
  signOutTitle: {
    ...typography.titleMd,
    fontSize: 14,
    color: colors.error,
  },
  versionFooter: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: 2,
    marginBottom: spacing.xl,
  },
  versionText: {
    ...typography.caption,
    fontSize: 9,
    letterSpacing: 1.5,
    fontFamily: 'Manrope_700Bold',
    color: colors.outline,
  },
  versionSub: {
    ...typography.caption,
    fontSize: 10,
    color: colors.onSurfaceVariant,
  },
});
