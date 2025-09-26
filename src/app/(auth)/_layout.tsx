// app/(auth)/_layout.tsx
import { Stack, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export default function AuthLayout() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user]);

  return (
    <Stack screenOptions={{ 
      headerStyle: { backgroundColor: '#FFC300' },
      headerTintColor: '#5D4037',
      headerTitleStyle: { fontWeight: 'bold' }
    }}>
      <Stack.Screen name="login" options={{ title: 'Hive Master Login' }} />
      <Stack.Screen name="register" options={{ title: 'Create Account' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Reset Password' }} />
    </Stack>
  );
}