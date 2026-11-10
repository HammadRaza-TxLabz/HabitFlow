import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors, typography, spacing } from '../../theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  tag?: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onActionPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  tag,
  actionLabel,
  actionIcon: ActionIcon,
  onActionPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        {tag && (
          <Text style={styles.tagText}>{tag.toUpperCase()}</Text>
        )}
        <View style={styles.headingRow}>
          <Text style={styles.titleText}>{title}</Text>
          {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
        </View>
      </View>

      {onActionPress && (actionLabel || ActionIcon) && (
        <TouchableOpacity
          onPress={onActionPress}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          {ActionIcon && (
            <ActionIcon size={18} color={colors.primary} style={actionLabel ? styles.actionIcon : undefined} />
          )}
          {actionLabel && <Text style={styles.actionLabelText}>{actionLabel}</Text>}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  titleArea: {
    flex: 1,
  },
  tagText: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  titleText: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  subtitleText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
  },
  actionIcon: {
    marginRight: 4,
  },
  actionLabelText: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '600',
  },
});

