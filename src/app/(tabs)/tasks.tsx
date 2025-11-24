// app/(tabs)/tasks.tsx
import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, FAB, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { theme } from '../../src/styles/theme';
import { fetchTasks, updateTask } from '../../src/utils/api';
import EmptyState from '../../src/components/EmptyState';
import ErrorState from '../../src/components/ErrorState';
import LoadingIndicator from '../../src/components/LoadingIndicator';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
}

export default function TasksScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  const toggleTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleToggleTask = (task: Task) => {
    toggleTaskMutation.mutate({
      id: task.id,
      completed: !task.completed,
    });
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorState message="Failed to load tasks" onRetry={() => {}} />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState 
        message="No tasks created yet" 
        action={{
          label: "Create First Task",
          onPress: () => router.push('/tasks/form')
        }}
      />
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity onPress={() => router.push(`/tasks/form?id=${item.id}`)}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Checkbox
            status={item.completed ? 'checked' : 'unchecked'}
            onPress={() => handleToggleTask(item)}
            color={theme.colors.primary}
          />
          <View style={styles.taskDetails}>
            <Text 
              variant="titleMedium" 
              style={[
                styles.title,
                item.completed && styles.completed
              ]}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text variant="bodySmall" style={styles.dueDate}>
              Due: {new Date(item.dueDate).toLocaleDateString()}
            </Text>
            <View style={styles.priorityContainer}>
              <View 
                style={[
                  styles.priorityDot, 
                  { backgroundColor: getPriorityColor(item.priority) }
                ]} 
              />
              <Text variant="bodySmall" style={styles.priority}>
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
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
        onPress={() => router.push('/tasks/form')}
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  taskDetails: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  dueDate: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.xs,
  },
  priority: {
    color: theme.colors.textSecondary,
    fontSize: 12,
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