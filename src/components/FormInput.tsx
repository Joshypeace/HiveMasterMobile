// src/components/FormInput.tsx
import React from 'react';
import { View, StyleSheet, TextInputProps } from 'react-native';
import { TextInput, Text, useTheme } from 'react-native-paper';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  left,
  right,
  style,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        mode="outlined"
        error={!!error}
        left={left}
        right={right}
        style={[
          styles.input,
          { backgroundColor: theme.colors.surface },
          style,
        ]}
        outlineColor={theme.colors.border}
        activeOutlineColor={theme.colors.primary}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
      {error && (
        <Text variant="bodySmall" style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderRadius: 8,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
  },
});

export default FormInput;