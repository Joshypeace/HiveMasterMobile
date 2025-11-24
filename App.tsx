// App.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './src/styles/theme';
import { AuthProvider } from './src/context/AuthContext';
import { AppSettingsProvider } from './src/context/AppSettingsContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { 
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppSettingsProvider>
              <StatusBar style="auto" />
            </AppSettingsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}