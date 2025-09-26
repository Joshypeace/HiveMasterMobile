// app/+not-found.tsx
import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { theme } from '../styles/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
        {`  This screen doesn't exist.`}
        </Text>
        <Link href="/(tabs)" asChild>
          <Button mode="contained" style={styles.button}>
            Go to home screen!
          </Button>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  title: {
    marginBottom: theme.spacing.m,
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing.m,
    backgroundColor: theme.colors.primary,
  },
});