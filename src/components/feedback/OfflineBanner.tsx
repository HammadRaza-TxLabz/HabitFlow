import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CloudOff } from 'lucide-react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

interface OfflineBannerProps {
  message?: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  message = 'Offline Mode — Your habits are saved on this device and will sync when you are back online.',
}) => {
  return (
    <View style={styles.banner}>
      <CloudOff size={16} color={colors.secondary} strokeWidth={2} style={styles.icon} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryContainer,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.radius.md,
    marginVertical: spacing.xs,
    borderWidth: 1,
    borderColor: '#E8C595',
  },
  icon: {
    marginRight: spacing.xs,
  },
  text: {
    ...typography.caption,
    color: colors.secondary,
    fontFamily: 'Manrope_600SemiBold',
    flex: 1,
    lineHeight: 16,
  },
});

