// app/(tabs)/index.tsx (Dashboard)
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import KpiCard from '../../components/KpiCard';
import QuickLink from '../../components/QuickLink';
import { theme } from '../../styles/theme';
import { fetchDashboardData } from '../../utils/api';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorState from '../../components/ErrorState';

export default function DashboardScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorState message="Failed to load dashboard data" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Overview
      </Text>
      
      <View style={styles.kpiRow}>
        <KpiCard
          title="Active Hives"
          value={data?.activeHives || 0}
          icon="beehive-outline"
          color="primary"
        />
        <KpiCard
          title="Alerts"
          value={data?.alerts || 0}
          icon="alert-outline"
          color="error"
        />
        <KpiCard
          title="Harvests"
          value={data?.harvests || 0}
          icon="bottle-tonic-plus-outline"
          color="success"
        />
      </View>
      
      <Text variant="headlineSmall" style={styles.title}>
        Quick Actions
      </Text>
      
      <View style={styles.quickLinks}>
        <QuickLink
          title="Add Task"
          icon="clipboard-plus-outline"
          screen="/tasks/form"
        />
        <QuickLink
          title="Record Harvest"
          icon="bottle-tonic-plus-outline"
          screen="/harvests/form"
        />
        <QuickLink
          title="Add Expense"
          icon="cash-minus"
          screen="/finances/form"
        />
        <QuickLink
          title="Add Income"
          icon="cash-plus"
          screen="/finances/form"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.m,
    color: theme.colors.primary,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
});