// HiveStatusIndicator.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const statusConfig = {
  healthy: {
    icon: 'check-circle',
    color: 'success',
    label: 'Healthy',
  },
  needs_attention: {
    icon: 'alert-circle',
    color: 'warning',
    label: 'Needs Attention',
  },
  swarming: {
    icon: 'alert',
    color: 'error',
    label: 'Swarming',
  },
  inactive: {
    icon: 'sleep',
    color: 'textSecondary',
    label: 'Inactive',
  },
};

const HiveStatusIndicator = ({ status }) => {
  const theme = useTheme();
  const config = statusConfig[status] || statusConfig.inactive;
  const color = theme.colors[config.color] || theme.colors.textSecondary;

  return (
    <View style={styles.container}>
      <Icon name={config.icon} size={20} color={color} />
      <Text style={[styles.label, { color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default HiveStatusIndicator;