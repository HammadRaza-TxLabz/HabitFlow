import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Edit3, CheckCircle2, Pause, Play, Trash2, Sparkles, Clock, Calendar } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { StreakBadge } from '@/components/common/StreakBadge';
import { HabitStatusBadge } from '@/components/common/HabitStatusBadge';
import { AdherenceHeatmap } from '@/components/calendar/AdherenceHeatmap';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { ConfirmationSheet } from '@/components/feedback/ConfirmationSheet';
import { useMockStore } from '@/store/useMockStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function HabitDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const habits = useMockStore((state) => state.habits);
  const toggleHabitCompletion = useMockStore((state) => state.toggleHabitCompletion);
  const pauseHabit = useMockStore((state) => state.pauseHabit);
  const resumeHabit = useMockStore((state) => state.resumeHabit);
  const deleteHabit = useMockStore((state) => state.deleteHabit);

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const habit = habits.find((h) => h.id === id) || habits[0];

  if (!habit) {
    return (
      <ScreenContainer>
        <AppHeader title="Habit Not Found" showBack onBack={() => router.back()} />
        <Text style={styles.notFoundText}>This ritual could not be located.</Text>
      </ScreenContainer>
    );
  }

  const handleDeleteConfirm = () => {
    deleteHabit(habit.id);
    setConfirmDeleteVisible(false);
    router.replace('/(tabs)/today');
  };

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="Habit Details"
        subtitle="HabitFlow"
        showBack
        onBack={() => router.back()}
        showAvatar={false}
        showNotification={false}
        rightAction={{
          icon: Edit3,
          onPress: () => router.push(`/habits/${habit.id}/edit`),
        }}
      />

      {/* Hero Card */}
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{habit.category.toUpperCase()}</Text>
          </View>
          <View style={styles.badgesRow}>
            <StreakBadge streakDays={habit.currentStreak || habit.streak || 0} />
            <HabitStatusBadge status={habit.status} />
          </View>
        </View>

        <Text style={styles.habitTitle}>{habit.title}</Text>

        {habit.intention && (
          <Text style={styles.intentionText}>“{habit.intention}”</Text>
        )}

        {/* Metric Triad */}
        <View style={styles.metricsTriad}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{habit.currentStreak || habit.streak || 0}d</Text>
            <Text style={styles.metricLabel}>Current Streak</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>
              {habit.timeString || habit.reminderTime || 'None'}
            </Text>
            <Text style={styles.metricLabel}>Reminder</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>
              {Array.isArray(habit.frequency) ? habit.frequency.join(', ') : habit.frequency || 'Daily'}
            </Text>
            <Text style={styles.metricLabel}>Repeat</Text>
          </View>
        </View>
      </View>

      {/* 30-Day Heatmap Section */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <View>
            <Text style={styles.sectionEyebrow}>CONSISTENCY</Text>
            <Text style={styles.sectionTitle}>Last 30 Days</Text>
          </View>
          <View style={styles.fulfillmentPill}>
            <Sparkles size={11} color={colors.secondary} strokeWidth={2} />
            <Text style={styles.fulfillmentPillText}>84% COMPLETED</Text>
          </View>
        </View>

        <AdherenceHeatmap
          completions={habit.past30Days || habit.history30Days || []}
          accentColor={habit.paletteColor || habit.colorHex || colors.primary}
          showLegend
        />
      </View>

      {/* Primary Complete Action */}
      <View style={styles.actionSection}>
        <PrimaryButton
          label={habit.isCompletedToday || habit.completedToday ? 'Completed Today (Tap to Undo)' : 'Mark as Completed'}
          onPress={() => toggleHabitCompletion(habit.id)}
          icon={CheckCircle2}
          variant={habit.isCompletedToday || habit.completedToday ? 'secondaryFixed' : 'primary'}
        />

        <View style={styles.secondaryActions}>
          <SecondaryButton
            label={habit.status === 'active' ? 'Pause Habit' : 'Resume Habit'}
            onPress={() => {
              if (habit.status === 'active') {
                pauseHabit(habit.id);
              } else {
                resumeHabit(habit.id);
              }
            }}
            icon={habit.status === 'active' ? Pause : Play}
            variant="surface"
          />

          <SecondaryButton
            label="Delete Habit"
            onPress={() => setConfirmDeleteVisible(true)}
            icon={Trash2}
            variant="outline"
          />
        </View>
      </View>

      {/* Destructive Confirmation Modal */}
      <ConfirmationSheet
        visible={confirmDeleteVisible}
        title="Delete This Habit?"
        message={`Are you sure you want to delete "${habit.title}"? Your past streaks and logs will still be saved.`}
        confirmLabel="Delete Habit"
        cancelLabel="Keep Habit"
        isDestructive
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDeleteVisible(false)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  notFoundText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.md,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: spacing.radius.full,
  },
  categoryBadgeText: {
    ...typography.caption,
    fontFamily: 'Manrope_700Bold',
    fontSize: 9,
    color: colors.primary,
    letterSpacing: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  habitTitle: {
    ...typography.headlineLgMobile,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  intentionText: {
    ...typography.bodyMd,
    fontFamily: 'PlayfairDisplay_700Bold_Italic',
    color: colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  metricsTriad: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: spacing.radius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    ...typography.titleLg,
    fontFamily: 'Manrope_700Bold',
    color: colors.primary,
    fontSize: 14,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    fontSize: 10,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.outlineVariant,
  },
  sectionCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionEyebrow: {
    ...typography.caption,
    letterSpacing: 1.2,
    fontFamily: 'Manrope_700Bold',
    color: colors.secondary,
    fontSize: 9,
  },
  sectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  fulfillmentPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryContainer,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: spacing.radius.full,
  },
  fulfillmentPillText: {
    ...typography.caption,
    fontFamily: 'Manrope_700Bold',
    color: colors.secondary,
    fontSize: 9,
  },
  actionSection: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  secondaryActions: {
    gap: spacing.xs,
  },
});
