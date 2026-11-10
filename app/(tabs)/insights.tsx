import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, Flame, CheckCircle, Clock, Sparkles } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { WeeklyBarChart } from '@/components/analytics/WeeklyBarChart';
import { CategoryChip } from '@/components/common/CategoryChip';
import { mockAnalyticsKpis, mockWeeklyBars, mockHabitBreakdown } from '@/mocks/analytics';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export default function InsightsScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('7d');

  const timeframeOptions = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: 'Quarter' },
  ];

  const getKpiIcon = (name: string) => {
    switch (name) {
      case 'trending-up':
        return <TrendingUp size={18} color={colors.primary} strokeWidth={2} />;
      case 'flame':
        return <Flame size={18} color={colors.secondary} strokeWidth={2} />;
      case 'check-circle':
        return <CheckCircle size={18} color={colors.primary} strokeWidth={2} />;
      case 'clock':
        return <Clock size={18} color={colors.secondary} strokeWidth={2} />;
      default:
        return <Sparkles size={18} color={colors.primary} strokeWidth={2} />;
    }
  };

  return (
    <ScreenContainer scrollable>
      <AppHeader
        title="Insights & Stats"
        subtitle="HabitFlow"
        showAvatar={false}
        showNotification={false}
      />

      {/* Timeframe Selector */}
      <View style={styles.timeframeRow}>
        {timeframeOptions.map((opt) => (
          <CategoryChip
            key={opt.id}
            label={opt.label}
            selected={selectedTimeframe === opt.id}
            onPress={() => setSelectedTimeframe(opt.id as any)}
          />
        ))}
      </View>

      {/* 2x2 KPI Grid */}
      <View style={styles.kpiGrid}>
        {mockAnalyticsKpis.map((kpi, idx) => (
          <View key={`kpi-${idx}`} style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <View style={styles.kpiIconWrapper}>{getKpiIcon(kpi.iconName)}</View>
              {kpi.changePercent ? (
                <View style={styles.changeBadge}>
                  <Text style={styles.changeText}>+{kpi.changePercent}%</Text>
                </View>
              ) : null}
            </View>

            <Text style={styles.kpiValue}>
              {kpi.value}
              {kpi.unit ? <Text style={styles.kpiUnit}>{kpi.unit}</Text> : null}
            </Text>

            <Text style={styles.kpiTitle}>{kpi.title}</Text>
            <Text style={styles.kpiSubtitle}>{kpi.subtitle}</Text>
          </View>
        ))}
      </View>

      {/* Weekly Rhythm Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Weekly Rhythm</Text>
          <Text style={styles.sectionSub}>Oct 18 – Oct 24</Text>
        </View>

        <WeeklyBarChart data={mockWeeklyBars} targetPercent={80} />
      </View>

      {/* Mindful Insight Callout */}
      <View style={styles.insightCard}>
        <View style={styles.insightIconWrapper}>
          <Sparkles size={20} color={colors.secondary} strokeWidth={2} />
        </View>
        <View style={styles.insightContent}>
          <Text style={styles.insightEyebrow}>HELPFUL INSIGHT</Text>
          <Text style={styles.insightBody}>
            You complete 76% of your habits in the morning. Doing your morning habits early helps you stay on track for the rest of the day.
          </Text>
        </View>
      </View>

      {/* Habit Breakdown Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habit Breakdown</Text>
        <Text style={styles.sectionSubText}>Completion rate for each of your active habits</Text>

        <View style={styles.breakdownList}>
          {mockHabitBreakdown.map((item) => (
            <View key={item.id} style={styles.breakdownCard}>
              <View style={styles.breakdownTopRow}>
                <View>
                  <Text style={styles.breakdownTitle}>{item.title}</Text>
                  <Text style={styles.breakdownCategory}>{item.category}</Text>
                </View>
                <View style={styles.breakdownRateContainer}>
                  <Text style={styles.breakdownRateText}>{item.ratePercent}%</Text>
                  <Text style={styles.breakdownFractionText}>
                    {item.fulfilledDays}/{item.totalDays}d
                  </Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${item.ratePercent}%`,
                      backgroundColor: item.ratePercent >= 85 ? colors.primary : colors.secondary,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  timeframeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginVertical: spacing.sm,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginVertical: spacing.sm,
  },
  kpiCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  kpiIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: spacing.radius.full,
  },
  changeText: {
    ...typography.caption,
    fontSize: 9,
    fontFamily: 'Manrope_700Bold',
    color: colors.success,
  },
  kpiValue: {
    ...typography.headlineMd,
    color: colors.onSurface,
    marginBottom: 2,
  },
  kpiUnit: {
    ...typography.bodySm,
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  kpiTitle: {
    ...typography.titleMd,
    fontSize: 13,
    color: colors.onSurface,
  },
  kpiSubtitle: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    fontSize: 10,
    marginTop: 2,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  sectionSub: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
  },
  sectionSubText: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.sm,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginVertical: spacing.sm,
    gap: spacing.sm,
  },
  insightIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightEyebrow: {
    ...typography.caption,
    letterSpacing: 1.2,
    fontFamily: 'Manrope_700Bold',
    color: colors.secondary,
    fontSize: 9,
    marginBottom: 4,
  },
  insightBody: {
    ...typography.bodySm,
    color: colors.onSurface,
    lineHeight: 19,
  },
  breakdownList: {
    gap: spacing.xs,
  },
  breakdownCard: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  breakdownTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  breakdownTitle: {
    ...typography.titleMd,
    fontSize: 14,
    color: colors.onSurface,
  },
  breakdownCategory: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  breakdownRateContainer: {
    alignItems: 'flex-end',
  },
  breakdownRateText: {
    ...typography.titleMd,
    fontFamily: 'Manrope_700Bold',
    color: colors.primary,
  },
  breakdownFractionText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.outline,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});

