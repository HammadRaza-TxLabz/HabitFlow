import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle, RotateCcw } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { SecondaryButton } from '@/components/common/SecondaryButton';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something Went Wrong',
  message = 'We could not connect to the network. Please check your internet connection and try again.',
  onRetry,
  retryLabel = 'Try Again',
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <AlertCircle size={24} color={colors.error} strokeWidth={1.8} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      {onRetry && (
        <View style={styles.actionRow}>
          <SecondaryButton
            label={retryLabel}
            onPress={onRetry}
            icon={RotateCcw}
            iconPosition="left"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF8F7',
    borderWidth: 1,
    borderColor: '#F3C4BE',
    borderRadius: spacing.radius.lg,
    padding: spacing.md,
    marginVertical: spacing.sm,
    alignItems: 'center',
    textAlign: 'center',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.errorContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.titleMd,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 4,
  },
  message: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 18,
  },
  actionRow: {
    marginTop: spacing.xs,
  },
});
