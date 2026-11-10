import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ShieldAlert, Bell, Trash2, Pause, Play } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { FormInput } from '@/components/common/FormInput';
import { FormTextarea } from '@/components/common/FormTextarea';
import { CategoryChip } from '@/components/common/CategoryChip';
import { IconSelector } from '@/components/habits/IconSelector';
import { ColorSelector } from '@/components/habits/ColorSelector';
import { WeekdaySelector } from '@/components/habits/WeekdaySelector';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { ConfirmationSheet } from '@/components/feedback/ConfirmationSheet';
import { useMockStore } from '@/store/useMockStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { HabitCategory, PeriodOfDay } from '@/types/habit';

export default function EditHabitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const habits = useMockStore((state) => state.habits);
  const updateHabit = useMockStore((state) => state.updateHabit);
  const pauseHabit = useMockStore((state) => state.pauseHabit);
  const resumeHabit = useMockStore((state) => state.resumeHabit);
  const deleteHabit = useMockStore((state) => state.deleteHabit);

  const habit = habits.find((h) => h.id === id) || habits[0];

  const [title, setTitle] = useState(habit?.title || '');
  const [intention, setIntention] = useState(habit?.intention || '');
  const [category, setCategory] = useState<HabitCategory>(habit?.category || 'Mindfulness');
  const [selectedIcon, setSelectedIcon] = useState(habit?.iconMotif || 'spa');
  const [colorHex, setColorHex] = useState(habit?.paletteColor || habit?.colorHex || '#1D4233');
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [period, setPeriod] = useState<PeriodOfDay>(habit?.period || 'morning');
  const [reminderEnabled, setReminderEnabled] = useState(Boolean(habit?.timeString || habit?.reminderTime));
  const [reminderTime, setReminderTime] = useState(habit?.timeString || habit?.reminderTime || '07:00');
  const [loading, setLoading] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const categories: HabitCategory[] = ['Mindfulness', 'Wellness', 'Movement', 'Focus', 'Rest'];
  const periods: { id: PeriodOfDay; label: string }[] = [
    { id: 'morning', label: 'Morning' },
    { id: 'afternoon', label: 'Afternoon' },
    { id: 'evening', label: 'Evening' },
  ];

  const handleToggleDay = (dayIndex: number) => {
    if (selectedDays.includes(dayIndex)) {
      if (selectedDays.length === 1) return;
      setSelectedDays(selectedDays.filter((d) => d !== dayIndex));
    } else {
      setSelectedDays([...selectedDays, dayIndex].sort());
    }
  };

  const handleSave = () => {
    if (!title.trim() || !habit) return;
    setLoading(true);

    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const frequency = selectedDays.length === 7
      ? ['Daily']
      : selectedDays.map((d) => dayLabels[d]);

    setTimeout(() => {
      updateHabit(habit.id, {
        title: title.trim(),
        intention: intention.trim() || undefined,
        category,
        iconMotif: selectedIcon,
        colorHex,
        period,
        frequency,
        reminderTime: reminderEnabled ? reminderTime : undefined,
      });
      setLoading(false);
      router.back();
    }, 350);
  };

  const handleDeleteConfirm = () => {
    if (habit) {
      deleteHabit(habit.id);
    }
    setConfirmDeleteVisible(false);
    router.replace('/(tabs)/today');
  };

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="Edit Habit"
        subtitle="HabitFlow"
        showBack
        onBack={() => router.back()}
        showAvatar={false}
        showNotification={false}
      />

      <View style={styles.content}>
        {/* Streak Safeguard Banner */}
        <View style={styles.safeguardBanner}>
          <ShieldAlert size={18} color={colors.secondary} strokeWidth={2} />
          <View style={styles.safeguardTextGroup}>
            <Text style={styles.safeguardTitle}>Streak Kept Safe</Text>
            <Text style={styles.safeguardSubtitle}>
              Updating your habit details will keep your streak count and history intact.
            </Text>
          </View>
        </View>

        {/* Title */}
        <FormInput
          label="HABIT NAME"
          value={title}
          onChangeText={setTitle}
          placeholder="Name of your habit"
        />

        {/* Category */}
        <View style={styles.formGroup}>
          <Text style={styles.groupLabel}>CATEGORY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            {categories.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                selected={category === cat}
                onPress={() => setCategory(cat)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Intention */}
        <FormTextarea
          label="NOTE OR GOAL"
          value={intention}
          onChangeText={setIntention}
          placeholder="Why does this habit matter to you?"
          charCount={intention.length}
          maxChars={180}
        />

        {/* Icon Motif */}
        <IconSelector
          selectedIcon={selectedIcon}
          onSelectIcon={setSelectedIcon}
        />

        {/* Aura Color */}
        <ColorSelector
          selectedColor={colorHex}
          onSelectColor={setColorHex}
        />

        {/* Weekday Cadence */}
        <View style={styles.formGroup}>
          <Text style={styles.groupLabel}>REPEAT ON</Text>
          <WeekdaySelector
            selectedDays={selectedDays}
            onToggleDay={handleToggleDay}
          />
        </View>

        {/* Time of Day */}
        <View style={styles.formGroup}>
          <Text style={styles.groupLabel}>TIME OF DAY</Text>
          <View style={styles.periodRow}>
            {periods.map((p) => (
              <CategoryChip
                key={p.id}
                label={p.label}
                selected={period === p.id}
                onPress={() => setPeriod(p.id)}
              />
            ))}
          </View>
        </View>

        {/* Acoustic Reminder */}
        <View style={styles.reminderCard}>
          <View style={styles.reminderHeader}>
            <View style={styles.reminderIconCircle}>
              <Bell size={18} color={colors.primary} />
            </View>
            <View style={styles.reminderTextGroup}>
              <Text style={styles.reminderTitle}>Daily Reminder</Text>
              <Text style={styles.reminderSubtitle}>
                {reminderEnabled ? `Reminds you at ${reminderTime} AM` : 'No reminder set'}
              </Text>
            </View>
            <ToggleSwitch
              checked={reminderEnabled}
              onToggle={setReminderEnabled}
            />
          </View>
        </View>

        {/* Save & Cancel Actions */}
        <View style={styles.primaryActions}>
          <PrimaryButton
            label={loading ? 'Saving...' : 'Save Changes'}
            onPress={handleSave}
            loading={loading}
          />
          <SecondaryButton
            label="Cancel"
            onPress={() => router.back()}
            variant="ghost"
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <Text style={styles.dangerZoneHeader}>MANAGE HABIT</Text>

          <SecondaryButton
            label={habit?.status === 'active' ? 'Pause Habit' : 'Resume Habit'}
            onPress={() => {
              if (habit) {
                if (habit.status === 'active') {
                  pauseHabit(habit.id);
                } else {
                  resumeHabit(habit.id);
                }
                router.back();
              }
            }}
            icon={habit?.status === 'active' ? Pause : Play}
            variant="surface"
          />

          <SecondaryButton
            label="Delete Habit"
            onPress={() => setConfirmDeleteVisible(true)}
            icon={Trash2}
            variant="danger"
          />
        </View>
      </View>

      {/* Confirmation Sheet */}
      <ConfirmationSheet
        visible={confirmDeleteVisible}
        title="Delete This Habit?"
        message="This action will remove the habit from your daily list. Your past streak and history will still be saved."
        confirmLabel="Delete Habit"
        cancelLabel="Cancel"
        isDestructive
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDeleteVisible(false)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  safeguardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryContainer,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#E8C595',
  },
  safeguardTextGroup: {
    flex: 1,
  },
  safeguardTitle: {
    ...typography.titleMd,
    fontSize: 13,
    color: colors.secondary,
  },
  safeguardSubtitle: {
    ...typography.caption,
    color: colors.secondary,
    lineHeight: 16,
    marginTop: 2,
  },
  formGroup: {
    marginVertical: spacing.sm,
  },
  groupLabel: {
    ...typography.labelSm,
    color: colors.outline,
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    paddingVertical: 2,
  },
  periodRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  reminderCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginVertical: spacing.md,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  reminderTextGroup: {
    flex: 1,
  },
  reminderTitle: {
    ...typography.titleMd,
    fontSize: 14,
    color: colors.onSurface,
  },
  reminderSubtitle: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  primaryActions: {
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  dangerZone: {
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  dangerZoneHeader: {
    ...typography.caption,
    letterSpacing: 1.5,
    color: colors.error,
    fontFamily: 'Manrope_700Bold',
    fontSize: 9,
    marginBottom: spacing.xs,
  },
});
