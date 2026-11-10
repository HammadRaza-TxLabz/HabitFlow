
import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/features/auth/AuthProvider';

export default function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)/today" />;
  }

  return <Redirect href="/(auth)/splash" />;
}
