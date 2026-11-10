import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, typography, radius, spacing } from '../../theme';

interface WeekdaySelectorProps {
  selectedDays: number[]; // 0 for Monday through 6 for Sunday
  onToggleDay: (dayIndex: number) => void;
  readOnly?: boolean;
}

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const WeekdaySelector: React.FC<WeekdaySelectorProps> = ({
  selectedDays,
  onToggleDay,
  readOnly = false,
}) => {
  return (
    <View style={styles.container}>
      {DAYS.map((dayLabel, index) => {
        const isSelected = selectedDays.includes(index);
        return (
          <TouchableOpacity
            key={`day_${index}`}
            disabled={readOnly}
            onPress={() => onToggleDay(index)}
            activeOpacity={0.8}
            style={[
              styles.dayCircle,
              isSelected ? styles.daySelected : styles.dayUnselected,
            ]}
          >
            <Text
              style={[
                styles.dayLabel,
                isSelected ? styles.labelSelected : styles.labelUnselected,
              ]}
            >
              {dayLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    padding: spacing.sm + 2,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: {
    backgroundColor: colors.primaryContainer,
  },
  dayUnselected: {
    backgroundColor: colors.surfaceContainerLow,
  },
  dayLabel: {
    ...typography.labelSm,
    fontWeight: '700',
  },
  labelSelected: {
    color: colors.onPrimary,
  },
  labelUnselected: {
    color: colors.onSurfaceVariant,
  },
});

