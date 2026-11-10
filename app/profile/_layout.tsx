import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/theme/colors';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.surface },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="edit" />
      <Stack.Screen name="reminders" />
    </Stack>
  );
}

