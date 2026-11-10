import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, radius } from '../../theme';

interface ToggleSwitchProps {
  checked: boolean;
  onToggle: (nextState: boolean) => void;
  disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onToggle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => !disabled && onToggle(!checked)}
      disabled={disabled}
      style={[
        styles.track,
        {
          backgroundColor: checked
            ? colors.primaryContainer
            : colors.surfaceContainerHighest,
          alignItems: checked ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <View style={styles.thumb} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
    borderRadius: radius.full,
    padding: 3,
    justifyContent: 'center',
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.surfaceContainerLowest,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});

