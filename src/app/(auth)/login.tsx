// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import FormInput from '../../components/FormInput';
import { theme } from '../../styles/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await login(email, password);
      router.replace('/(tabs)');
    } catch {
      setError( 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text variant="headlineMedium" style={styles.title}>
        Welcome to Hive Master
      </Text>
      
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      
      <FormInput
        label="Email or Phone"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        left={<TextInput.Icon icon="email" />}
      />
      
      <FormInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        left={<TextInput.Icon icon="lock" />}
      />
      
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Login
      </Button>
      
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password' as any)}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push('/(auth)/register' as any)}>
          <Text style={styles.link}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    color: theme.colors.background,
  },
  button: {
    marginTop: theme.spacing.m,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
  },
  buttonLabel: {
    color: theme.colors.background,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    color: theme.colors.card,
    fontWeight: 'bold',
  },
  error: {
    color: theme.colors.notification,
    marginBottom: theme.spacing.m,
    textAlign: 'center',
  },
});