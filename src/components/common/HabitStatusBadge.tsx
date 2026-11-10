import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HabitStatus } from '../../types';
import { colors, typography, radius } from '../../theme';

interface HabitStatusBadgeProps {
  status: HabitStatus;
}

export const HabitStatusBadge: React.FC<HabitStatusBadgeProps> = ({ status }) => {
  const getColors = () => {
    switch (status) {
      case 'active':
        return {
          bg: colors.surfaceContainerLow,
          text: colors.primary,
          label: 'Active',
        };
      case 'paused':
        return {
          bg: colors.surfaceContainerHighest,
          text: colors.onSurfaceVariant,
          label: 'Paused',
        };
      case 'archived':
      default:
        return {
          bg: colors.surfaceContainer,
          text: colors.outline,
          label: 'Archived',
        };
    }
  };

  const { bg, text, label } = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.caption,
    fontWeight: '600',
  },
});

