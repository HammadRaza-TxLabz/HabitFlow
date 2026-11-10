import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { colors, typography, radius } from '../../theme';

interface SecondaryButtonProps {
  label: string;
  onPress: () => void;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'outline' | 'surface' | 'ghost' | 'danger';
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  label,
  onPress,
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  style,
  textStyle,
  variant = 'surface',
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return 'transparent';
      case 'danger':
        return colors.errorContainer;
      case 'surface':
      default:
        return colors.surfaceContainerLow;
    }
  };

  const getBorderColor = () => {
    if (variant === 'outline') return colors.outlineVariant;
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return colors.outline;
    if (variant === 'danger') return colors.error;
    return colors.onSurface;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        style,
      ]}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={18} color={getTextColor()} style={styles.leftIcon} />
      )}
      <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
        {label}
      </Text>
      {Icon && iconPosition === 'right' && (
        <Icon size={18} color={getTextColor()} style={styles.rightIcon} />
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
    paddingHorizontal: 16,
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

