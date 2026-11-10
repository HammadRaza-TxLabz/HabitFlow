import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Flower2, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function WelcomeScreen() {

  return (
    <ScreenContainer scrollable style={styles.container}>
      {/* Brand Header */}
      <View style={styles.brandHeader}>
        <Flower2 size={24} color={colors.primary} strokeWidth={1.8} />
        <Text style={styles.brandLogoText}>HABITFLOW</Text>
      </View>

      {/* Hero Card */}
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>WELCOME TO HABITFLOW</Text>
        <Text style={styles.heroTitle}>Build Good Habits with Ease</Text>
        <Text style={styles.heroDescription}>
          A simple, clean habit tracker to help you stay consistent, motivated, and organized every single day.
        </Text>
      </View>

      {/* Value Pillars */}
      <View style={styles.pillarsContainer}>
        <View style={styles.pillarItem}>
          <View style={styles.pillarIcon}>
            <CheckCircle2 size={20} color={colors.primary} strokeWidth={1.75} />
          </View>
          <View style={styles.pillarContent}>
            <Text style={styles.pillarTitle}>Stay Consistent</Text>
            <Text style={styles.pillarText}>
              Check off your daily habits in seconds and build streaks that last.
            </Text>
          </View>
        </View>

        <View style={styles.pillarItem}>
          <View style={styles.pillarIcon}>
            <TrendingUp size={20} color={colors.secondary} strokeWidth={1.75} />
          </View>
          <View style={styles.pillarContent}>
            <Text style={styles.pillarTitle}>Track Your Progress</Text>
            <Text style={styles.pillarText}>
              See your weekly completion rate, monthly calendar, and streaks clearly.
            </Text>
          </View>
        </View>

        <View style={styles.pillarItem}>
          <View style={styles.pillarIcon}>
            <Sparkles size={20} color={colors.primaryContainer} strokeWidth={1.75} />
          </View>
          <View style={styles.pillarContent}>
            <Text style={styles.pillarTitle}>Clean & Simple</Text>
            <Text style={styles.pillarText}>
              No confusing menus, annoying ads, or complicated settings.
            </Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <PrimaryButton
          label="Create an Account"
          onPress={() => router.push('/(auth)/register')}
        />
        <SecondaryButton
          label="Sign In"
          onPress={() => router.push('/(auth)/login')}
          variant="outline"
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  brandLogoText: {
    ...typography.labelSm,
    letterSpacing: 2,
    color: colors.primary,
    fontFamily: 'Manrope_700Bold',
  },
  heroCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.lg,
  },
  heroEyebrow: {
    ...typography.caption,
    letterSpacing: 1.5,
    color: colors.secondary,
    fontFamily: 'Manrope_700Bold',
    fontSize: 9,
    marginBottom: spacing.xs,
  },
  heroTitle: {
    ...typography.headlineLgMobile,
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  heroDescription: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    lineHeight: 22,
  },
  pillarsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  pillarItem: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  pillarIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarContent: {
    flex: 1,
  },
  pillarTitle: {
    ...typography.titleMd,
    color: colors.onSurface,
    marginBottom: 2,
  },
  pillarText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  actionsContainer: {
    gap: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  demoLink: {
    alignSelf: 'center',
    paddingVertical: spacing.xs,
    marginTop: spacing.xs,
  },
  demoLinkText: {
    ...typography.caption,
    fontFamily: 'Manrope_700Bold',
    color: colors.secondary,
    letterSpacing: 1.2,
    fontSize: 10,
  },
});
