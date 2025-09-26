// app/apiaries/[id].tsx
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Card, } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { theme } from '../../styles/theme';
import { fetchHiveDetails } from '../../utils/api';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorState from '../../components/ErrorState';

export default function ApiaryDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['apiary', id],
    queryFn: () => fetchHiveDetails(id as any),
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorState message="Failed to load apiary details" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {data?.name}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {data?.location}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Hives: {data?.hiveCount}
          </Text>
        </Card.Content>
      </Card>

      {/* Add more apiary details */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  card: {
    borderRadius: theme.roundness,
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  title: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.primary,
    marginVertical: theme.spacing.s,
  },
});