import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export interface HabitColorOption {
  id: string;
  label: string;
  hex: string;
}

export const HABIT_COLORS: HabitColorOption[] = [
  { id: 'forest', label: 'Forest', hex: '#1D4233' },
  { id: 'sage', label: 'Sage', hex: '#355A49' },
  { id: 'amber', label: 'Amber', hex: '#745A34' },
  { id: 'terracotta', label: 'Terracotta', hex: '#8C4F3B' },
  { id: 'slate', label: 'Slate', hex: '#2E5D65' },
];

interface ColorSelectorProps {
  label?: string;
  selectedColor: string;
  onSelectColor: (hex: string) => void;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  label = 'COLOR',
  selectedColor,
  onSelectColor,
}) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.swatchRow}>
        {HABIT_COLORS.map((item) => {
          const isSelected = selectedColor.toLowerCase() === item.hex.toLowerCase();
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.swatchOuter,
                isSelected && styles.swatchOuterSelected,
              ]}
              onPress={() => onSelectColor(item.hex)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={`Select color ${item.label}`}
              accessibilityState={{ selected: isSelected }}
            >
              <View style={[styles.swatchInner, { backgroundColor: item.hex }]}>
                {isSelected && <Check size={16} color="#FFFFFF" strokeWidth={2.5} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  label: {
    ...typography.labelSm,
    color: colors.outline,
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  swatchOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  swatchOuterSelected: {
    borderColor: colors.primary,
  },
  swatchInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

