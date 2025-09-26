// ErrorState.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ErrorStateProps = {
  message: string;  
  onRetry?: () => void;
};

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Icon name="alert-circle" size={48} color={theme.colors.error} />
      <Text style={[styles.message, { color: theme.colors.error }]}>{message}</Text>
      {onRetry && (
        <Button
          mode="contained"
          onPress={onRetry}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Try Again
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

export default ErrorState;