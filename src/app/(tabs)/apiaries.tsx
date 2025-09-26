// app/(tabs)/apiaries.tsx
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text, Card, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { theme } from '../../styles/theme';
import { fetchApiaries } from '../../utils/api';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import LoadingIndicator from '../../components/LoadingIndicator';

type Apiary = {
  id: string;
  name: string;
  location: string;
  hiveCount: number;
  lastInspection?: string | null; // optional if it can be missing
};


export default function ApiariesListScreen() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery<Apiary[]>({
    queryKey: ['apiaries'],
    queryFn: fetchApiaries,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorState message="Failed to load apiaries" />;
  }

  if (!data || data.length === 0) {
    return <EmptyState message="No apiaries found" action={undefined} />;
  }

  

  const renderItem = ({ item } : { item: Apiary }) => (
    <Card 
      style={styles.card}
      onPress={() => router.push(`/apiaries/${item.id}` as any)}
    >
      <Card.Content>
        <Text variant="titleMedium" style={styles.cardTitle}>
          {item.name}
        </Text>
        <Text variant="bodyMedium" style={styles.cardText}>
          {item.location}
        </Text>
        <View style={styles.statsRow}>
          <Text variant="bodySmall" style={styles.stat}>
            Hives: {item.hiveCount}
          </Text>
          <Text variant="bodySmall" style={styles.stat}>
            Last Inspection: {item.lastInspection || 'Never'}
          </Text>
        </View>
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
        onPress={() => router.push('/apiaries/form' as any)}
        color={theme.colors.background}
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
    backgroundColor: theme.colors.background,
  },
  cardTitle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  cardText: {
    color: theme.colors.card,
    marginVertical: theme.spacing.s,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    color: theme.colors.text,
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