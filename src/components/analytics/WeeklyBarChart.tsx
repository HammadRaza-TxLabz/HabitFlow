import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { DayBarData } from '@/types/analytics';

interface WeeklyBarChartProps {
  data: DayBarData[];
  targetPercent?: number; // e.g. 80
}

export const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({
  data,
  targetPercent = 80,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.chartArea}>
        {/* Target dashed line */}
        <View
          style={[
            styles.targetLineContainer,
            { bottom: `${targetPercent}%` },
          ]}
        >
          <View style={styles.targetDashedLine} />
          <Text style={styles.targetLabel}>{targetPercent}% TARGET</Text>
        </View>

        {/* 7 Days Columns */}
        <View style={styles.barsContainer}>
          {data.map((bar, index) => {
            const heightPercent = bar.total > 0 ? Math.round((bar.completed / bar.total) * 100) : 0;
            const isToday = bar.isToday;

            return (
              <View key={`bar-${index}`} style={styles.barColumn}>
                {/* Bar track and fill */}
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { height: `${heightPercent}%` },
                      isToday ? styles.fillToday : styles.fillNormal,
                    ]}
                  />
                </View>
                {/* Day label */}
                <Text
                  style={[
                    styles.dayLabel,
                    isToday && styles.dayLabelToday,
                  ]}
                >
                  {bar.dayLabel}
                </Text>
                {/* Ratio label */}
                <Text style={styles.ratioLabel}>
                  {bar.completed}/{bar.total}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginVertical: spacing.sm,
  },
  chartArea: {
    height: 160,
    justifyContent: 'flex-end',
    position: 'relative',
    paddingTop: spacing.md,
  },
  targetLineContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  targetDashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderStyle: 'dashed',
  },
  targetLabel: {
    ...typography.caption,
    color: colors.secondary,
    fontFamily: 'Manrope_600SemiBold',
    marginLeft: 6,
    fontSize: 9,
    letterSpacing: 0.5,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: spacing.xs,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  track: {
    width: 20,
    height: 90,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  fill: {
    width: '100%',
    borderRadius: 10,
  },
  fillNormal: {
    backgroundColor: colors.primaryContainer,
  },
  fillToday: {
    backgroundColor: colors.primary,
  },
  dayLabel: {
    ...typography.labelSm,
    marginTop: spacing.xs,
    color: colors.onSurfaceVariant,
  },
  dayLabelToday: {
    fontFamily: 'Manrope_700Bold',
    color: colors.primary,
  },
  ratioLabel: {
    ...typography.caption,
    fontSize: 9,
    color: colors.outline,
    marginTop: 1,
  },
});

