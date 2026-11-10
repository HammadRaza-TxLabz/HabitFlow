import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors, typography, radius } from '../../theme';

interface CategoryChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: LucideIcon;
  count?: number;
  style?: ViewStyle;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  selected,
  onPress,
  icon: Icon,
  count,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected
            ? colors.primaryContainer
            : colors.surfaceContainerLowest,
          borderColor: selected ? colors.primaryContainer : colors.outlineVariant,
        },
        style,
      ]}
    >
      {Icon && (
        <Icon
          size={14}
          color={selected ? colors.onPrimary : colors.onSurfaceVariant}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.label,
          {
            color: selected ? colors.onPrimary : colors.onSurface,
            fontWeight: selected ? '600' : '500',
          },
        ]}
      >
        {label}
      </Text>
      {count !== undefined && (
        <Text
          style={[
            styles.count,
            {
              color: selected ? colors.onPrimaryContainer : colors.onSurfaceVariant,
            },
          ]}
        >
          ({count})
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 8,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    ...typography.labelMd,
  },
  count: {
    ...typography.caption,
    marginLeft: 4,
  },
});

