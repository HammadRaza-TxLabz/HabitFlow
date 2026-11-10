import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { CalendarDayInfo } from '@/types/calendar';

interface CalendarDayCellProps {
  day: CalendarDayInfo;
  isSelected?: boolean;
  onSelect?: (day: CalendarDayInfo) => void;
}

export const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  day,
  isSelected = false,
  onSelect,
}) => {
  if (day.status === 'empty') {
    return <View style={styles.cellContainer} />;
  }

  const renderStatusDot = () => {
    if (day.status === 'future') return null;
    let dotColor: string = colors.outlineVariant;
    if (day.status === 'complete') dotColor = colors.primary;
    if (day.status === 'partial') dotColor = colors.secondary;
    if (day.status === 'missed') dotColor = colors.outlineVariant;

    return <View style={[styles.statusDot, { backgroundColor: dotColor }]} />;
  };

  return (
    <TouchableOpacity
      style={[
        styles.cellContainer,
        isSelected && styles.cellSelected,
        day.isToday && !isSelected && styles.cellToday,
      ]}
      onPress={() => onSelect?.(day)}
      activeOpacity={0.7}
      disabled={!day.isCurrentMonth}
      accessibilityRole="button"
      accessibilityLabel={`Day ${day.dayNumber}, status ${day.status}`}
      accessibilityState={{ selected: isSelected }}
    >
      <Text
        style={[
          styles.dayText,
          !day.isCurrentMonth && styles.dayTextInactive,
          isSelected && styles.dayTextSelected,
          day.isToday && !isSelected && styles.dayTextToday,
        ]}
      >
        {day.dayNumber}
      </Text>
      <View style={styles.dotContainer}>{renderStatusDot()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    width: '14.28%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.radius.md,
    paddingVertical: 2,
  },
  cellSelected: {
    backgroundColor: colors.primary,
  },
  cellToday: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surfaceContainer,
  },
  dayText: {
    ...typography.bodyMd,
    fontFamily: 'Manrope_600SemiBold',
    color: colors.onSurface,
  },
  dayTextInactive: {
    color: colors.outlineVariant,
  },
  dayTextSelected: {
    color: colors.onPrimary,
  },
  dayTextToday: {
    color: colors.primary,
  },
  dotContainer: {
    height: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
