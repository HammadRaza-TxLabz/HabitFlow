import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import {
  Sparkles,
  BookOpen,
  Sun,
  Moon,
  Coffee,
  Footprints,
  Heart,
  Flower2,
  LucideIcon,
} from 'lucide-react-native';
import { colors, typography, radius, spacing } from '../../theme';

interface IconSelectorProps {
  selectedIcon: string;
  onSelectIcon: (motif: string) => void;
}

interface IconOption {
  motif: string;
  label: string;
  icon: LucideIcon;
}

const ICONS: IconOption[] = [
  { motif: 'spa', label: 'Sparkle', icon: Sparkles },
  { motif: 'menu_book', label: 'Reading', icon: BookOpen },
  { motif: 'wb_sunny', label: 'Sunlight', icon: Sun },
  { motif: 'bedtime', label: 'Sleep', icon: Moon },
  { motif: 'local_cafe', label: 'Coffee / Tea', icon: Coffee },
  { motif: 'directions_walk', label: 'Walking', icon: Footprints },
  { motif: 'favorite', label: 'Health', icon: Heart },
  { motif: 'self_improvement', label: 'Meditation', icon: Flower2 },
];

export const IconSelector: React.FC<IconSelectorProps> = ({
  selectedIcon,
  onSelectIcon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>CHOOSE ICON</Text>
        <Text style={styles.selectedLabel}>
          {ICONS.find((i) => i.motif === selectedIcon)?.label || 'Selected'}
        </Text>
      </View>

      <View style={styles.grid}>
        {ICONS.map((item) => {
          const isSelected = selectedIcon === item.motif;
          const IconComponent = item.icon;
          return (
            <TouchableOpacity
              key={item.motif}
              onPress={() => onSelectIcon(item.motif)}
              activeOpacity={0.8}
              style={[
                styles.iconButton,
                isSelected ? styles.buttonSelected : styles.buttonUnselected,
              ]}
              accessibilityLabel={item.label}
            >
              <IconComponent
                size={22}
                color={isSelected ? colors.onPrimary : colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    ...typography.caption,
    color: colors.outline,
    letterSpacing: 1.2,
    fontWeight: '600',
  },
  selectedLabel: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: colors.surfaceContainerLowest,
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  iconButton: {
    width: '22%',
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: colors.primaryContainer,
  },
  buttonUnselected: {
    backgroundColor: colors.surfaceContainerLow,
  },
});

