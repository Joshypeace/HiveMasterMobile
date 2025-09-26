// src/components/QuickLink.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

interface QuickLinkProps {
  title: string;
  icon: string;
  screen: string;
  params?: Record<string, any>;
}

const QuickLink: React.FC<QuickLinkProps> = ({ title, icon, screen, params }) => {
  const theme = useTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: screen,
      params,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
      onPress={handlePress}
    >
      <Icon name={icon} size={24} color={theme.colors.primary} />
      <Text variant="bodyMedium" style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default QuickLink;