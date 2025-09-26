// Header.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, showBack = false, rightActions = [] }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: theme.colors.surface }]}>
      {showBack && (
        <Appbar.BackAction onPress={navigation.goBack} color={theme.colors.primary} />
      )}
      <Appbar.Content title={title} titleStyle={styles.title} />
      {rightActions.map((action, index) => (
        <Appbar.Action
          key={index}
          icon={action.icon}
          onPress={action.onPress}
          color={theme.colors.primary}
        />
      ))}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default Header;