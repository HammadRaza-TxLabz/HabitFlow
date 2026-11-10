import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Bell, Moon, Music, Check, Clock } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { useMockStore } from '@/store/useMockStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface AcousticChime {
  id: string;
  name: string;
  description: string;
}

const CHIMES: AcousticChime[] = [
  { id: 'kyoto', name: 'Kyoto Singing Bowl', description: 'Deep bronze resonance with sustained overtone' },
  { id: 'temple', name: 'Zen Temple Gong', description: 'Warm wooden striker on aged copper chime' },
  { id: 'rain', name: 'Morning Rain Droplet', description: 'Organic ceramic chime with crisp decay' },
  { id: 'stone', name: 'River Stone Cadence', description: 'Subtle binaural tap for quiet environments' },
];

export default function ReminderSettingsScreen() {
  const preferences = useMockStore((state) => state.preferences);
  const updatePreferences = useMockStore((state) => state.updatePreferences);
  const habits = useMockStore((state) => state.habits);
  const updateHabit = useMockStore((state) => state.updateHabit);

  const [selectedChime, setSelectedChime] = useState('kyoto');
  const [habitReminders, setHabitReminders] = useState<Record<string, boolean>>(
    habits.reduce((acc, h) => {
      acc[h.id] = Boolean(h.timeString || h.reminderTime);
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleToggleHabitReminder = (habitId: string, enabled: boolean) => {
    setHabitReminders((prev) => ({ ...prev, [habitId]: enabled }));
    const habit = habits.find((h) => h.id === habitId);
    if (habit) {
      updateHabit(habitId, {
        reminderEnabled: enabled,
        reminderTime: enabled ? habit.timeString || habit.reminderTime || '08:00 AM' : undefined,
      });
    }
  };

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="Reminder Settings"
        subtitle="HabitFlow"
        showBack
        onBack={() => router.back()}
        showAvatar={false}
        showNotification={false}
      />

      <View style={styles.content}>
        {/* Master Reminder Switch */}
        <View style={styles.masterCard}>
          <View style={styles.masterIconCircle}>
            <Bell size={22} color={colors.primary} />
          </View>
          <View style={styles.masterContent}>
            <Text style={styles.masterTitle}>Daily Reminders</Text>
            <Text style={styles.masterSubtitle}>
              Receive notifications when it's time to do your habits.
            </Text>
          </View>
          <ToggleSwitch
            checked={preferences.dailyReminderEnabled}
            onToggle={(val) => updatePreferences({ dailyReminderEnabled: val })}
          />
        </View>

        {/* Quiet Enclave (DND) */}
        <View style={styles.dndCard}>
          <View style={styles.dndIconCircle}>
            <Moon size={20} color={colors.secondary} />
          </View>
          <View style={styles.dndContent}>
            <Text style={styles.dndTitle}>Do Not Disturb (DND)</Text>
            <Text style={styles.dndSubtitle}>
              Mutes alerts between {preferences.dndStartTime} and {preferences.dndEndTime}
            </Text>
          </View>
          <ToggleSwitch
            checked={preferences.dndEnabled}
            onToggle={(val) => updatePreferences({ dndEnabled: val })}
          />
        </View>

        {/* Acoustic Chime Voice Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>NOTIFICATION SOUND</Text>
          <View style={styles.chimesList}>
            {CHIMES.map((chime) => {
              const isSelected = selectedChime === chime.id;
              return (
                <TouchableOpacity
                  key={chime.id}
                  style={[styles.chimeItem, isSelected && styles.chimeItemSelected]}
                  onPress={() => setSelectedChime(chime.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.chimeIconWrapper}>
                    <Music size={16} color={isSelected ? colors.primary : colors.outline} />
                  </View>
                  <View style={styles.chimeContent}>
                    <Text style={[styles.chimeName, isSelected && styles.chimeNameSelected]}>
                      {chime.name}
                    </Text>
                    <Text style={styles.chimeDesc}>{chime.description}</Text>
                  </View>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Check size={14} color="#FFFFFF" strokeWidth={2.5} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Per-Habit Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>HABIT REMINDERS</Text>
          <View style={styles.habitRemindersList}>
            {habits
              .filter((h) => h.status === 'active')
              .map((habit) => {
                const isEnabled = habitReminders[habit.id] ?? false;
                return (
                  <View key={habit.id} style={styles.habitRow}>
                    <View style={styles.habitInfo}>
                      <Text style={styles.habitTitle}>{habit.title}</Text>
                      <View style={styles.timeRow}>
                        <Clock size={12} color={colors.secondary} />
                        <Text style={styles.timeText}>
                          {habit.timeString || habit.reminderTime ? `${habit.timeString || habit.reminderTime} • ${habit.period}` : 'No chime scheduled'}
                        </Text>
                      </View>
                    </View>
                    <ToggleSwitch
                      checked={isEnabled}
                      onToggle={(val) => handleToggleHabitReminder(habit.id, val)}
                    />
                  </View>
                );
              })}
          </View>
        </View>

        {/* Save & Confirm */}
        <View style={styles.saveSection}>
          <PrimaryButton
            label="Save Settings"
            onPress={() => router.back()}
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
  masterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginVertical: spacing.xs,
  },
  masterIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  masterContent: {
    flex: 1,
    marginRight: spacing.xs,
  },
  masterTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
  },
  masterSubtitle: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
  dndCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginVertical: spacing.xs,
  },
  dndIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  dndContent: {
    flex: 1,
    marginRight: spacing.xs,
  },
  dndTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
  },
  dndSubtitle: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  section: {
    marginTop: spacing.md,
  },
  sectionHeader: {
    ...typography.caption,
    letterSpacing: 1.5,
    color: colors.secondary,
    fontFamily: 'Manrope_700Bold',
    fontSize: 9,
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  chimesList: {
    gap: 6,
  },
  chimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  chimeItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainerLow,
  },
  chimeIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  chimeContent: {
    flex: 1,
  },
  chimeName: {
    ...typography.titleMd,
    fontSize: 14,
    color: colors.onSurface,
  },
  chimeNameSelected: {
    color: colors.primary,
  },
  chimeDesc: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 15,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },
  habitRemindersList: {
    gap: 6,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  habitInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  habitTitle: {
    ...typography.titleMd,
    fontSize: 14,
    color: colors.onSurface,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  timeText: {
    ...typography.caption,
    color: colors.secondary,
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 11,
  },
  saveSection: {
    marginTop: spacing.lg,
  },
});
