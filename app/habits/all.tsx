import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Search, Plus, Play, Pause } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { FormInput } from '@/components/common/FormInput';
import { CategoryChip } from '@/components/common/CategoryChip';
import { AdherenceHeatmap } from '@/components/calendar/AdherenceHeatmap';
import { StreakBadge } from '@/components/common/StreakBadge';
import { HabitStatusBadge } from '@/components/common/HabitStatusBadge';
import { EmptyState } from '@/components/feedback/EmptyState';
import { useMockStore } from '@/store/useMockStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function AllHabitsScreen() {
  const habits = useMockStore((state) => state.habits);
  const pauseHabit = useMockStore((state) => state.pauseHabit);
  const resumeHabit = useMockStore((state) => state.resumeHabit);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'active' | 'paused'>('active');

  const filteredHabits = habits.filter((h) => {
    const matchesStatus = h.status === statusFilter;
    const matchesSearch =
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const activeCount = habits.filter((h) => h.status === 'active').length;
  const pausedCount = habits.filter((h) => h.status === 'paused').length;

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="All Habits"
        subtitle="HabitFlow"
        showBack
        onBack={() => router.back()}
        showAvatar={false}
        showNotification={false}
      />

      {/* Search Input */}
      <FormInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search habits or categories..."
        leftIcon={Search}
        containerStyle={styles.searchContainer}
      />

      {/* Status Filter Tabs */}
      <View style={styles.filterRow}>
        <CategoryChip
          label={`Active (${activeCount})`}
          selected={statusFilter === 'active'}
          onPress={() => setStatusFilter('active')}
        />
        <CategoryChip
          label={`Paused (${pausedCount})`}
          selected={statusFilter === 'paused'}
          onPress={() => setStatusFilter('paused')}
        />
      </View>

      {/* Habits List */}
      <View style={styles.listContainer}>
        {filteredHabits.length === 0 ? (
          <EmptyState
            title="No Habits Found"
            description={
              searchQuery
                ? `No habits matching "${searchQuery}".`
                : statusFilter === 'paused'
                ? 'You have no paused habits. All habits are currently active.'
                : 'No active habits found.'
            }
            actionLabel={statusFilter === 'active' ? 'Create Habit' : undefined}
            onAction={statusFilter === 'active' ? () => router.push('/habits/create') : undefined}
          />
        ) : (
          filteredHabits.map((habit) => (
            <TouchableOpacity
              key={habit.id}
              style={styles.habitCard}
              onPress={() => router.push(`/habits/${habit.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <View style={styles.titleArea}>
                  <Text style={styles.habitTitle}>{habit.title}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.categoryText}>{habit.category}</Text>
                    <Text style={styles.cadenceText}>
                      • {Array.isArray(habit.frequency) ? habit.frequency.join(', ') : habit.frequency || 'Daily'}
                    </Text>
                  </View>
                </View>

                <View style={styles.headerBadges}>
                  <StreakBadge streakDays={habit.currentStreak || habit.streak || 0} />
                  <HabitStatusBadge status={habit.status} />
                </View>
              </View>

              {/* 30-Day Heatmap */}
              <View style={styles.heatmapWrapper}>
                <Text style={styles.heatmapLabel}>LAST 30 DAYS</Text>
                <AdherenceHeatmap
                  completions={habit.past30Days || habit.history30Days || []}
                  accentColor={habit.paletteColor || habit.colorHex || colors.primary}
                />
              </View>

              {/* Card Footer Actions */}
              <View style={styles.cardFooter}>
                <Text style={styles.periodText}>
                  {habit.period.toUpperCase()} • {habit.timeString || habit.reminderTime || 'No reminder'}
                </Text>

                <TouchableOpacity
                  style={styles.toggleStatusButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    if (habit.status === 'active') {
                      pauseHabit(habit.id);
                    } else {
                      resumeHabit(habit.id);
                    }
                  }}
                  activeOpacity={0.7}
                >
                  {habit.status === 'active' ? (
                    <>
                      <Pause size={12} color={colors.onSurfaceVariant} />
                      <Text style={styles.toggleStatusText}>Pause</Text>
                    </>
                  ) : (
                    <>
                      <Play size={12} color={colors.primary} />
                      <Text style={[styles.toggleStatusText, { color: colors.primary }]}>Resume</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Bottom Floating Create Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/habits/create')}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Frame New Habit"
      >
        <Plus size={22} color="#FFFFFF" strokeWidth={2.5} />
        <Text style={styles.fabText}>Add Habit</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: spacing.xs,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  listContainer: {
    marginBottom: spacing.xl,
  },
  habitCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  titleArea: {
    flex: 1,
    marginRight: spacing.sm,
  },
  habitTitle: {
    ...typography.titleLg,
    color: colors.onSurface,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  categoryText: {
    ...typography.caption,
    color: colors.primary,
    fontFamily: 'Manrope_600SemiBold',
  },
  cadenceText: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
  },
  headerBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heatmapWrapper: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: spacing.radius.md,
    padding: spacing.sm,
    marginVertical: spacing.xs,
  },
  heatmapLabel: {
    ...typography.caption,
    fontSize: 9,
    letterSpacing: 1,
    fontFamily: 'Manrope_700Bold',
    color: colors.outline,
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  periodText: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  toggleStatusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: spacing.radius.sm,
    backgroundColor: colors.surfaceContainer,
  },
  toggleStatusText: {
    ...typography.caption,
    fontFamily: 'Manrope_600SemiBold',
    color: colors.onSurfaceVariant,
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
    marginBottom: spacing.xl,
  },
  fabText: {
    ...typography.labelMd,
    fontFamily: 'Manrope_700Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
