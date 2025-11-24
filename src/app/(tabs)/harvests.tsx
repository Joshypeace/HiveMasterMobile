// app/(tabs)/harvests.tsx
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text, Card, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { theme } from '../../src/styles/theme';
import { fetchHarvests } from '../../src/utils/api';
import EmptyState from '../../src/components/EmptyState';
import ErrorState from '../../src/components/ErrorState';
import LoadingIndicator from '../../src/components/LoadingIndicator';

interface Harvest {
  id: string;
  date: string;
  apiaryName: string;
  hivesCount: number;
  totalYield: number;
  notes?: string;
}

export default function HarvestsScreen() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ['harvests'],
    queryFn: fetchHarvests,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorState message="Failed to load harvests" onRetry={() => {}} />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState 
        message="No harvests recorded yet" 
        action={{
          label: "Add First Harvest",
          onPress: () => router.push('/harvests/form')
        }}
      />
    );
  }

  const renderItem = ({ item }: { item: Harvest }) => (
    <Card 
      style={styles.card}
      onPress={() => router.push(`/harvests/form?id=${item.id}`)}
    >
      <Card.Content>
        <Text variant="titleMedium" style={styles.title}>
          {item.date} - {item.apiaryName}
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {item.hivesCount} hives - {item.totalYield} kg
        </Text>
        {item.notes && (
          <Text variant="bodySmall" style={styles.note} numberOfLines={2}>
            {item.notes}
          </Text>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => router.push('/harvests/form')}
        color={theme.colors.surface}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.m,
  },
  card: {
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  title: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginVertical: theme.spacing.s,
  },
  note: {
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  separator: {
    height: theme.spacing.m,
  },
  fab: {
    position: 'absolute',
    margin: theme.spacing.m,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});