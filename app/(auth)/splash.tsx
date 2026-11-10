import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Flower2, ArrowRight } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function SplashScreen() {
  const handleContinue = () => {
    router.replace('/(auth)/welcome');
  };

  return (
    <ScreenContainer scrollable={false} style={styles.container}>
      <View style={styles.content}>
        {/* Simple Badge */}
        <View style={styles.eyebrowBadge}>
          <Text style={styles.eyebrowText}>DAILY HABIT TRACKER</Text>
        </View>

        {/* Brand Icon */}
        <View style={styles.iconAuraOuter}>
          <View style={styles.iconAuraInner}>
            <Flower2 size={44} color={colors.primary} strokeWidth={1.4} />
          </View>
        </View>

        {/* App Title & Tagline */}
        <Text style={styles.brandTitle}>HabitFlow</Text>
        <Text style={styles.tagline}>Build better habits, one day at a time.</Text>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.enterButton}
          onPress={handleContinue}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Get Started"
        >
          <Text style={styles.enterButtonText}>Get Started</Text>
          <ArrowRight size={16} color={colors.onPrimary} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Footer Info */}
      <View style={styles.footer}>
        <View style={styles.presenceIndicator}>
          <View style={styles.presenceDot} />
          <Text style={styles.presenceText}>Ready to track</Text>
        </View>
        <Text style={styles.versionText}>VERSION 1.0</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  eyebrowBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.radius.full,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  eyebrowText: {
    ...typography.caption,
    fontFamily: 'Manrope_700Bold',
    letterSpacing: 1.5,
    color: colors.primary,
    fontSize: 10,
  },
  iconAuraOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    backgroundColor: colors.card,
  },
  iconAuraInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    ...typography.display,
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  tagline: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  enterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.radius.lg,
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  enterButtonText: {
    ...typography.labelMd,
    fontFamily: 'Manrope_700Bold',
    color: colors.onPrimary,
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  presenceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  presenceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  presenceText: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    fontFamily: 'Manrope_500Medium',
  },
  versionText: {
    ...typography.caption,
    fontSize: 9,
    letterSpacing: 1.2,
    color: colors.outline,
  },
});
