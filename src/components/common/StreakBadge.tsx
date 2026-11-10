import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Flame } from 'lucide-react-native';
import { colors, typography, radius } from '../../theme';

interface StreakBadgeProps {
  streakDays: number;
  variant?: 'gold' | 'surface';
  size?: 'sm' | 'md';
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  streakDays,
  variant = 'gold',
  size = 'sm',
}) => {
  const isGold = variant === 'gold';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: isGold
            ? colors.secondaryContainer
            : colors.surfaceContainerHigh,
          paddingHorizontal: size === 'sm' ? 8 : 10,
          paddingVertical: size === 'sm' ? 3 : 5,
        },
      ]}
    >
      <Flame
        size={size === 'sm' ? 12 : 14}
        color={isGold ? colors.secondary : colors.primary}
        fill={isGold ? colors.secondary : colors.primary}
      />
      <Text
        style={[
          styles.text,
          {
            color: isGold ? colors.onSecondaryContainer : colors.primary,
            fontSize: size === 'sm' ? 11 : 12,
          },
        ]}
      >
        {streakDays}d
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: radius.full,
  },
  text: {
    ...typography.labelSm,
    fontWeight: '700',
  },
});

