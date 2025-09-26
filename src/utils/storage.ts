// storage.ts
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Basic key-value storage
export const getItem = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error getting item from storage', error);
    return null;
  }
};

export const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error setting item in storage', error);
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item from storage', error);
  }
};

// File storage
export const saveFile = async (uri: string, fileName: string): Promise<string> => {
  const fileUri = `${FileSystem.documentDirectory}${fileName}`;
  try {
    await FileSystem.copyAsync({ from: uri, to: fileUri });
    return fileUri;
  } catch (error) {
    console.error('Error saving file', error);
    throw error;
  }
};

export const readFile = async (fileUri: string): Promise<string> => {
  try {
    return await FileSystem.readAsStringAsync(fileUri);
  } catch (error) {
    console.error('Error reading file', error);
    throw error;
  }
};

export const deleteFile = async (fileUri: string): Promise<void> => {
  try {
    await FileSystem.deleteAsync(fileUri);
  } catch (error) {
    console.error('Error deleting file', error);
    throw error;
  }
};

// For SQLite integration later
export const initDB = async () => {
  // Placeholder for SQLite initialization
};

export const closeDB = async () => {
  // Placeholder for SQLite cleanup
};