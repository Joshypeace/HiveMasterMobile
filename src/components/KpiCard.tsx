// KpiCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const KpiCard = ({ title, value, icon, color }) => {
  const theme = useTheme();
  const colorMap = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    error: theme.colors.error,
    success: theme.colors.success,
    warning: theme.colors.warning,
    info: theme.colors.info,
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.header}>
        <Icon name={icon} size={20} color={colorMap[color]} />
        <Text variant="labelSmall" style={styles.title}>
          {title}
        </Text>
      </View>
      <Text variant="headlineMedium" style={[styles.value, { color: colorMap[color] }]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '30%',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
    color: '#757575',
  },
  value: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default KpiCard;