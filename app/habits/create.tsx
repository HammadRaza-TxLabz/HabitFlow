import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Bell, Sparkles } from 'lucide-react-native';
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
import { useMockStore } from '@/store/useMockStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { HabitCategory, PeriodOfDay } from '@/types/habit';

export default function CreateHabitScreen() {
  const addHabit = useMockStore((state) => state.addHabit);

  const [title, setTitle] = useState('');
  const [intention, setIntention] = useState('');
  const [category, setCategory] = useState<HabitCategory>('Mindfulness');
  const [selectedIcon, setSelectedIcon] = useState('spa');
  const [colorHex, setColorHex] = useState('#1D4233');
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [period, setPeriod] = useState<PeriodOfDay>('morning');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('07:30');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories: HabitCategory[] = ['Mindfulness', 'Wellness', 'Movement', 'Focus', 'Rest'];
  const periods: { id: PeriodOfDay; label: string }[] = [
    { id: 'morning', label: 'Morning' },
    { id: 'afternoon', label: 'Afternoon' },
    { id: 'evening', label: 'Evening' },
  ];

  const handleToggleDay = (dayIndex: number) => {
    if (selectedDays.includes(dayIndex)) {
      if (selectedDays.length === 1) return; // Keep at least one
      setSelectedDays(selectedDays.filter((d) => d !== dayIndex));
    } else {
      setSelectedDays([...selectedDays, dayIndex].sort());
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      setError('Please provide a name for your ritual.');
      return;
    }
    setError('');
    setLoading(true);

    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const frequency = selectedDays.length === 7
      ? ['Daily']
      : selectedDays.map((d) => dayLabels[d]);

    setTimeout(() => {
      addHabit({
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

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="New Habit"
        subtitle="HabitFlow"
        showBack
        onBack={() => router.back()}
        showAvatar={false}
        showNotification={false}
      />

      <View style={styles.content}>
        {/* Heading */}
        <View style={styles.headingSection}>
          <Text style={styles.eyebrow}>HABIT SETUP</Text>
          <Text style={styles.headingTitle}>Create a Habit</Text>
          <Text style={styles.headingSubtitle}>
            Choose your habit name, schedule, and reminder time.
          </Text>
        </View>

        {/* Habit Name */}
        <FormInput
          label="HABIT NAME"
          value={title}
          onChangeText={(val) => {
            setTitle(val);
            if (error) setError('');
          }}
          placeholder="e.g. Morning Meditation, Drink Water..."
          error={error}
          autoFocus
        />

        {/* Category Chips */}
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

        {/* Intention / Deep Why */}
        <FormTextarea
          label="NOTE OR GOAL (OPTIONAL)"
          value={intention}
          onChangeText={setIntention}
          placeholder="Why do you want to build this habit?"
          charCount={intention.length}
          maxChars={180}
        />

        {/* Icon Motif Selector */}
        <IconSelector
          selectedIcon={selectedIcon}
          onSelectIcon={setSelectedIcon}
        />

        {/* Aura Color Selector */}
        <ColorSelector
          selectedColor={colorHex}
          onSelectColor={setColorHex}
        />

        {/* Cadence / Weekday Selector */}
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

        {/* Reminder Toggle */}
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

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <PrimaryButton
            label={loading ? 'Saving...' : 'Save Habit'}
            onPress={handleSave}
            loading={loading}
          />
          <SecondaryButton
            label="Cancel"
            onPress={() => router.back()}
            variant="ghost"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  headingSection: {
    marginBottom: spacing.lg,
  },
  eyebrow: {
    ...typography.caption,
    letterSpacing: 1.5,
    color: colors.secondary,
    fontFamily: 'Manrope_700Bold',
    fontSize: 9,
    marginBottom: spacing.xs,
  },
  headingTitle: {
    ...typography.headlineLg,
    color: colors.onSurface,
    marginBottom: 4,
  },
  headingSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
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
  actionButtons: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
});
