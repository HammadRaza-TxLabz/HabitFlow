import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface AdherenceHeatmapProps {
  completions: boolean[]; // 30 days
  accentColor?: string;
  columns?: number;
  showLegend?: boolean;
}

export const AdherenceHeatmap: React.FC<AdherenceHeatmapProps> = ({
  completions,
  accentColor = colors.primary,
  columns = 6,
  showLegend = false,
}) => {
  // Ensure we have 30 days of data (pad if needed)
  const days = Array.from({ length: 30 }, (_, index) => {
    return completions[index] ?? false;
  });

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {days.map((isComplete, idx) => (
          <View
            key={`cell-${idx}`}
            style={[
              styles.cell,
              {
                backgroundColor: isComplete ? accentColor : colors.surfaceContainer,
                borderColor: isComplete ? accentColor : colors.outlineVariant,
              },
            ]}
          />
        ))}
      </View>

      {showLegend && (
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.surfaceContainer, borderColor: colors.outlineVariant }]} />
            <Text style={styles.legendText}>Missed</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: accentColor }]} />
            <Text style={styles.legendText}>Completed</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'space-between',
  },
  cell: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    borderWidth: 0.5,
  },
  legendText: {
    ...typography.caption,
    color: colors.onSurfaceVariant,
  },
});

