// app/(tabs)/notes.tsx
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text, Card, FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { theme } from '../../src/styles/theme';
import { fetchNotes } from '../../src/utils/api';
import EmptyState from '../../src/components/EmptyState';
import ErrorState from '../../src/components/ErrorState';
import LoadingIndicator from '../../src/components/LoadingIndicator';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  type: string;
}

export default function NotesScreen() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorState message="Failed to load notes" onRetry={() => {}} />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState 
        message="No notes created yet" 
        action={{
          label: "Create First Note",
          onPress: () => router.push('/notes/form')
        }}
      />
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getNoteTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      inspection: theme.colors.success,
      harvest: theme.colors.primary,
      maintenance: theme.colors.warning,
      health: theme.colors.error,
      general: theme.colors.info,
    };
    return typeColors[type] || theme.colors.textSecondary;
  };

  const renderItem = ({ item }: { item: Note }) => (
    <Card 
      style={styles.card}
      onPress={() => router.push(`/notes/form?id=${item.id}`)}
    >
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <View 
            style={[
              styles.typeBadge,
              { backgroundColor: getNoteTypeColor(item.type) }
            ]}
          >
            <Text style={styles.typeText}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </View>
        </View>
        <Text variant="bodySmall" style={styles.date}>
          {formatDate(item.date)}
        </Text>
        <Text variant="bodyMedium" style={styles.preview} numberOfLines={3}>
          {item.content}
        </Text>
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
        onPress={() => router.push('/notes/form')}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
    flex: 1,
    marginRight: theme.spacing.s,
  },
  typeBadge: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 2,
    borderRadius: 12,
  },
  typeText: {
    color: theme.colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.s,
    fontSize: 12,
  },
  preview: {
    color: theme.colors.text,
    lineHeight: 20,
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