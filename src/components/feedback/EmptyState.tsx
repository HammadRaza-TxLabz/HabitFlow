import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sparkles, Plus, LucideIcon } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { PrimaryButton } from '@/components/common/PrimaryButton';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Habits Yet',
  description = 'You have not added any habits yet. Start by creating your first daily habit.',
  actionLabel,
  onAction,
  icon: IconComponent = Sparkles,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <IconComponent size={28} color={colors.primary} strokeWidth={1.5} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && onAction ? (
        <View style={styles.buttonWrapper}>
          <PrimaryButton
            label={actionLabel}
            onPress={onAction}
            icon={Plus}
            iconPosition="left"
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: spacing.radius.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginVertical: spacing.md,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.headlineSm,
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
    marginBottom: spacing.lg,
  },
  buttonWrapper: {
    minWidth: 180,
  },
});
