// EmptyState.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyState = ({ message, action }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Icon name="database-remove" size={48} color={theme.colors.textSecondary} />
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>{message}</Text>
      {action && (
        <Button
          mode="contained"
          onPress={action.onPress}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          {action.label}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    marginVertical: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
  buttonLabel: {
    color: 'white',
  },
});

export default EmptyState;