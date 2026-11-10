import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Plus, ArrowRight, Sparkles, BookOpen } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { HabitCard } from '@/components/habits/HabitCard';
import { ProgressRing } from '@/components/habits/ProgressRing';
import { CategoryChip } from '@/components/common/CategoryChip';
import { EmptyState } from '@/components/feedback/EmptyState';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { useMockStore } from '@/store/useMockStore';
import { FilterPeriod } from '@/types/ui';

export default function TodayScreen() {
  const habits = useMockStore((state) => state.habits);
  const filterPeriod = useMockStore((state) => state.filterPeriod);
  const setFilterPeriod = useMockStore((state) => state.setFilterPeriod);
  const toggleHabitCompletion = useMockStore((state) => state.toggleHabitCompletion);
  const user = useMockStore((state) => state.user);

  // Active habits only
  const activeHabits = habits.filter((h) => h.status === 'active');

  // Filtered by period
  const filteredHabits = activeHabits.filter((h) => {
    if (filterPeriod === 'all') return true;
    return h.period === filterPeriod;
  });

  const totalCount = activeHabits.length;
  const completedCount = activeHabits.filter((h) => h.completedToday).length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const filterOptions: { label: string; period: FilterPeriod; count: number }[] = [
    { label: 'All', period: 'all', count: activeHabits.length },
    { label: 'Morning', period: 'morning', count: activeHabits.filter((h) => h.period === 'morning').length },
    { label: 'Afternoon', period: 'afternoon', count: activeHabits.filter((h) => h.period === 'afternoon').length },
    { label: 'Evening', period: 'evening', count: activeHabits.filter((h) => h.period === 'evening').length },
  ];

  return (
    <ScreenContainer scrollable>
      {/* App Header */}
      <AppHeader
        title="Today, Oct 24"
        subtitle="HabitFlow"
        showAvatar
        onAvatarPress={() => router.push('/(tabs)/profile')}
        showNotification
        onNotificationPress={() => router.push('/profile/reminders')}
      />

      {/* Daily Progress Card */}
      <View style={styles.salutationCard}>
        <View style={styles.salutationContent}>
          <Text style={styles.eyebrow}>TODAY'S GOAL</Text>
          <Text style={styles.salutationTitle}>
            Good morning, {user.fullName.split(' ')[0]}.
          </Text>
          <Text style={styles.intentionQuote}>
            Small steps every day bring big changes over time.
          </Text>

          <View style={styles.cadenceMeta}>
            <Sparkles size={14} color={colors.secondary} strokeWidth={2} />
            <Text style={styles.cadenceText}>
              {completedCount} of {totalCount} habits completed today
            </Text>
          </View>
        </View>

        {/* Progress Gauge */}
        <View style={styles.ringContainer}>
          <ProgressRing
            completed={completedCount}
            total={totalCount}
            size={76}
            strokeWidth={7}
          />
        </View>
      </View>

      {/* Filter Tabs & Quick Action */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChipsRow}
        >
          {filterOptions.map((opt) => (
            <CategoryChip
              key={opt.period}
              label={`${opt.label} (${opt.count})`}
              selected={filterPeriod === opt.period}
              onPress={() => setFilterPeriod(opt.period)}
            />
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.viewAllLink}
          onPress={() => router.push('/habits/all')}
          activeOpacity={0.7}
        >
          <Text style={styles.viewAllText}>All Habits</Text>
          <ArrowRight size={14} color={colors.primary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Habit List */}
      <View style={styles.habitsSection}>
        {filteredHabits.length === 0 ? (
          <EmptyState
            title="All Clear For Now"
            description="You have completed all habits for this time, or none are scheduled."
            actionLabel="Add New Habit"
            onAction={() => router.push('/habits/create')}
          />
        ) : (
          filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleComplete={() => toggleHabitCompletion(habit.id)}
              onOptionsPress={() => router.push(`/habits/${habit.id}/edit`)}
            />
          ))
        )}
      </View>

      {/* Reflection Card */}
      <View style={styles.reflectionCard}>
        <View style={styles.reflectionIconCircle}>
          <BookOpen size={20} color={colors.primary} strokeWidth={1.75} />
        </View>
        <View style={styles.reflectionTextContent}>
          <Text style={styles.reflectionTitle}>Evening Check-In</Text>
          <Text style={styles.reflectionSubtitle}>
            Opens at 08:00 PM. Take a moment to log how your day went.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.reflectionAction}
          onPress={() => router.push('/(tabs)/calendar')}
          activeOpacity={0.7}
        >
          <Text style={styles.reflectionActionText}>View Log</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Create Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/habits/create')}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Add New Habit"
      >
        <Plus size={22} color="#FFFFFF" strokeWidth={2.5} />
        <Text style={styles.fabText}>Add Habit</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  salutationCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  salutationContent: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  eyebrow: {
    ...typography.caption,
    letterSpacing: 1.5,
    color: colors.secondary,
    fontFamily: 'Manrope_700Bold',
    fontSize: 9,
    marginBottom: 2,
  },
  salutationTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginBottom: 4,
  },
  intentionQuote: {
    ...typography.bodySm,
    fontFamily: 'PlayfairDisplay_700Bold_Italic',
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  cadenceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cadenceText: {
    ...typography.caption,
    fontFamily: 'Manrope_600SemiBold',
    color: colors.secondary,
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  filterChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingRight: spacing.sm,
  },
  viewAllLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  viewAllText: {
    ...typography.labelSm,
    color: colors.primary,
    fontFamily: 'Manrope_700Bold',
  },
  habitsSection: {
    marginBottom: spacing.md,
  },
  reflectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.xl,
  },
  reflectionIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  reflectionTextContent: {
    flex: 1,
    marginRight: spacing.xs,
  },
  reflectionTitle: {
    ...typography.titleMd,
    fontSize: 13,
    color: colors.onSurface,
  },
  reflectionSubtitle: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 15,
  },
  reflectionAction: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.card,
    borderRadius: spacing.radius.sm,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  reflectionActionText: {
    ...typography.caption,
    fontFamily: 'Manrope_700Bold',
    color: colors.primary,
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primaryContainer,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: spacing.radius.full,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: spacing.lg,
  },
  fabText: {
    ...typography.labelMd,
    fontFamily: 'Manrope_700Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
