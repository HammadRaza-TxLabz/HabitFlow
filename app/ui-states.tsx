import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import {
  Bell,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Info,
} from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Skeleton, HabitCardSkeleton } from '@/components/feedback/LoadingSkeleton';
import { ErrorState } from '@/components/feedback/ErrorState';
import { OfflineBanner } from '@/components/feedback/OfflineBanner';
import { ConfirmationSheet } from '@/components/feedback/ConfirmationSheet';
import { UndoToast } from '@/components/feedback/UndoToast';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { StreakBadge } from '@/components/common/StreakBadge';
import { HabitStatusBadge } from '@/components/common/HabitStatusBadge';
import { ToggleSwitch } from '@/components/common/ToggleSwitch';
import { CategoryChip } from '@/components/common/CategoryChip';
import { FormInput } from '@/components/common/FormInput';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function UIStatesScreen() {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [sampleSwitch, setSampleSwitch] = useState(true);
  const [sampleChip, setSampleChip] = useState('Mindfulness');
  const [sampleInput, setSampleInput] = useState('Elena Rostova');

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="UI Components"
        subtitle="HabitFlow Specification"
        showBack
        onBack={() => router.back()}
        showAvatar={false}
        showNotification={false}
      />

      {/* Intro Spec Card */}
      <View style={styles.introCard}>
        <View style={styles.introHeader}>
          <Layers size={20} color={colors.primary} />
          <Text style={styles.introEyebrow}>COMPONENT CATALOGUE</Text>
        </View>
        <Text style={styles.introTitle}>Design System & UI States</Text>
        <Text style={styles.introBody}>
          Complete library of reusable components: loading skeletons, empty states, alerts, confirmation dialogs, and controls.
        </Text>
      </View>

      {/* State A & B: Empty States */}
      <View style={styles.specSection}>
        <Text style={styles.sectionTitle}>1. EMPTY STATES</Text>
        <Text style={styles.sectionSubtitle}>When a user has no habits yet or search returns zero results</Text>

        <EmptyState
          title="No Habits Yet"
          description="Start your journey by adding your first daily habit."
          actionLabel="Add Habit"
          onAction={() => router.push('/habits/create')}
        />
      </View>

      {/* State C: Floating Undo Toast */}
      <View style={styles.specSection}>
        <Text style={styles.sectionTitle}>2. UNDO TOAST</Text>
        <Text style={styles.sectionSubtitle}>Shows up when a habit is completed with an instant Undo option</Text>

        <View style={styles.interactiveBox}>
          <PrimaryButton
            label={toastVisible ? 'Toast Active' : 'Preview Undo Toast'}
            onPress={() => setToastVisible(true)}
            variant="secondaryFixed"
          />
        </View>

        {toastVisible && (
          <View style={styles.toastPreviewContainer}>
            <UndoToast
              message="Completed Morning Meditation (Streak: 14d)"
              onUndo={() => setToastVisible(false)}
              onDismiss={() => setToastVisible(false)}
            />
          </View>
        )}
      </View>

      {/* State D: Confirmation Bottom Sheet */}
      <View style={styles.specSection}>
        <Text style={styles.sectionTitle}>3. CONFIRMATION DIALOG</Text>
        <Text style={styles.sectionSubtitle}>Confirmation dialog before deleting or pausing an item</Text>

        <SecondaryButton
          label="Preview Delete Dialog"
          onPress={() => setConfirmationVisible(true)}
          icon={AlertTriangle}
          variant="outline"
        />

        <ConfirmationSheet
          visible={confirmationVisible}
          title="Delete This Habit?"
          message="This will remove the habit from your daily list. Your past completion history will still be saved."
          confirmLabel="Delete Habit"
          cancelLabel="Cancel"
          isDestructive
          onConfirm={() => setConfirmationVisible(false)}
          onCancel={() => setConfirmationVisible(false)}
        />
      </View>

      {/* State E: Loading Skeleton Pulse */}
      <View style={styles.specSection}>
        <Text style={styles.sectionTitle}>4. LOADING SKELETONS</Text>
        <Text style={styles.sectionSubtitle}>Animated placeholder cards shown while data is loading</Text>

        <HabitCardSkeleton />
        <HabitCardSkeleton />
      </View>

      {/* State F: Offline Interruption Banner */}
      <View style={styles.specSection}>
        <Text style={styles.sectionTitle}>5. OFFLINE STATUS</Text>
        <Text style={styles.sectionSubtitle}>Banner shown when the device is offline</Text>

        <OfflineBanner />
      </View>

      {/* State G: Error & Validation Card */}
      <View style={styles.specSection}>
        <Text style={styles.sectionTitle}>6. ERROR & ALERT CARD</Text>
        <Text style={styles.sectionSubtitle}>Error messages with a retry action</Text>

        <ErrorState
          title="Connection Error"
          message="Could not sync habits with the cloud. All changes are saved locally on your device."
          onRetry={() => {}}
          retryLabel="Try Again"
        />
      </View>

      {/* State H: Permission Request Card */}
      <View style={styles.specSection}>
        <Text style={styles.sectionTitle}>7. NOTIFICATION PERMISSION</Text>
        <Text style={styles.sectionSubtitle}>Prompt asking user to enable daily reminders</Text>

        <View style={styles.permissionCard}>
          <View style={styles.permissionIconCircle}>
            <Bell size={22} color={colors.primary} />
          </View>
          <Text style={styles.permissionTitle}>Enable Daily Reminders?</Text>
          <Text style={styles.permissionBody}>
            HabitFlow can send you gentle reminders so you never miss completing your daily habits.
          </Text>
          <View style={styles.permissionActions}>
            <PrimaryButton
              label="Enable Notifications"
              onPress={() => {}}
            />
            <SecondaryButton
              label="Not Now"
              onPress={() => {}}
              variant="ghost"
            />
          </View>
        </View>
      </View>

      {/* State I: Reusable Primitives Gallery */}
      <View style={styles.specSection}>
        <Text style={styles.sectionTitle}>8. BUTTONS & CONTROLS</Text>
        <Text style={styles.sectionSubtitle}>Standard mobile buttons and badges with 44px touch targets</Text>

        <View style={styles.controlsRow}>
          <StreakBadge streakDays={12} />
          <StreakBadge streakDays={30} />
          <HabitStatusBadge status="active" />
          <HabitStatusBadge status="paused" />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Toggle Switch Example</Text>
          <ToggleSwitch checked={sampleSwitch} onToggle={setSampleSwitch} />
        </View>

        <View style={styles.chipsRow}>
          {['Mindfulness', 'Wellness', 'Movement'].map((item) => (
            <CategoryChip
              key={item}
              label={item}
              selected={sampleChip === item}
              onPress={() => setSampleChip(item)}
            />
          ))}
        </View>

        <FormInput
          label="VALIDATED INPUT SPEC"
          value={sampleInput}
          onChangeText={setSampleInput}
          placeholder="Type here..."
          tag="REQUIRED"
          helperText="Hairline border with zero neon glow"
        />
      </View>

      {/* State J: Color Tokens */}
      <View style={styles.specSection}>
        <Text style={styles.sectionTitle}>9. COLOR PALETTE SPECIFICATION</Text>
        <Text style={styles.sectionSubtitle}>Material Design 3 & Quiet Editorial Wellness palette</Text>

        <View style={styles.colorPaletteGrid}>
          <View style={[styles.paletteSwatch, { backgroundColor: colors.primary }]}>
            <Text style={styles.paletteLabelWhite}>Primary{'\n'}#1D4233</Text>
          </View>
          <View style={[styles.paletteSwatch, { backgroundColor: colors.primaryContainer }]}>
            <Text style={styles.paletteLabelWhite}>Container{'\n'}#355A49</Text>
          </View>
          <View style={[styles.paletteSwatch, { backgroundColor: colors.secondary }]}>
            <Text style={styles.paletteLabelWhite}>Gold{'\n'}#745A34</Text>
          </View>
          <View style={[styles.paletteSwatch, { backgroundColor: colors.secondaryContainer }]}>
            <Text style={styles.paletteLabelDark}>Gold Tint{'\n'}#FEDAAA</Text>
          </View>
          <View style={[styles.paletteSwatch, { backgroundColor: colors.surfaceContainer }]}>
            <Text style={styles.paletteLabelDark}>Surface{'\n'}#E6F1E7</Text>
          </View>
          <View style={[styles.paletteSwatch, { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.outlineVariant }]}>
            <Text style={styles.paletteLabelDark}>Card{'\n'}#FFFFFF</Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  introCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.lg,
  },
  introHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  introEyebrow: {
    ...typography.caption,
    letterSpacing: 1.2,
    color: colors.primary,
    fontFamily: 'Manrope_700Bold',
    fontSize: 9,
  },
  introTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
    marginBottom: 4,
  },
  introBody: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  specSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.caption,
    letterSpacing: 1.2,
    fontFamily: 'Manrope_700Bold',
    color: colors.secondary,
    fontSize: 10,
    marginBottom: 2,
  },
  sectionSubtitle: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.sm,
  },
  interactiveBox: {
    marginVertical: spacing.xs,
  },
  toastPreviewContainer: {
    marginTop: spacing.sm,
  },
  permissionCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    textAlign: 'center',
  },
  permissionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  permissionTitle: {
    ...typography.titleLg,
    color: colors.onSurface,
    marginBottom: 4,
    textAlign: 'center',
  },
  permissionBody: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 290,
    marginBottom: spacing.md,
  },
  permissionActions: {
    width: '100%',
    gap: spacing.xs,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.sm,
  },
  switchLabel: {
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  colorPaletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  paletteSwatch: {
    width: '31%',
    height: 60,
    borderRadius: spacing.radius.md,
    padding: 6,
    justifyContent: 'flex-end',
  },
  paletteLabelWhite: {
    ...typography.caption,
    fontSize: 9,
    color: '#FFFFFF',
    fontFamily: 'Manrope_600SemiBold',
  },
  paletteLabelDark: {
    ...typography.caption,
    fontSize: 9,
    color: colors.onSurface,
    fontFamily: 'Manrope_600SemiBold',
  },
});
