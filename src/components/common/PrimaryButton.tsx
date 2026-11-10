import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors, typography, radius } from '../../theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'destructive' | 'secondaryFixed';
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  icon: Icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  style,
  textStyle,
  variant = 'primary',
}) => {
  const getBackgroundColor = () => {
    if (disabled) return colors.surfaceContainerHighest;
    switch (variant) {
      case 'destructive':
        return colors.error;
      case 'secondaryFixed':
        return colors.secondaryContainer;
      case 'primary':
      default:
        return colors.primaryContainer;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.outline;
    switch (variant) {
      case 'secondaryFixed':
        return colors.onSecondaryContainer;
      case 'destructive':
      case 'primary':
      default:
        return colors.onPrimary;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.88}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon size={18} color={getTextColor()} style={styles.leftIcon} />
          )}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {label}
          </Text>
          {Icon && iconPosition === 'right' && (
            <Icon size={18} color={getTextColor()} style={styles.rightIcon} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    minWidth: 44,
  },
  text: {
    ...typography.labelMd,
    fontWeight: '600',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

