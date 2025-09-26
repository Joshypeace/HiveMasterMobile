import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings, NotificationSettings, DataSyncSettings } from '../types';
import { getItem, setItem } from '../utils/storage';

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  updateNotificationSettings: (notificationSettings: Partial<NotificationSettings>) => void;
  updateDataSyncSettings: (dataSyncSettings: Partial<DataSyncSettings>) => void;
  resetToDefaults: () => void;
  isDarkMode: boolean;
}

const defaultSettings: AppSettings = {
  theme: 'auto',
  language: 'en',
  notifications: {
    enabled: true,
    alerts: true,
    tasks: true,
    harvests: true,
    weather: true,
    sound: true,
    vibration: true,
  },
  offlineMode: true,
  dataSync: {
    autoSync: true,
    syncInterval: 30,
    wifiOnly: false,
    backgroundSync: true,
  },
};

const AppSettingsContext = createContext<AppSettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  updateNotificationSettings: () => {},
  updateDataSyncSettings: () => {},
  resetToDefaults: () => {},
  isDarkMode: false,
});

export const useAppSettings = () => useContext(AppSettingsContext);

interface AppSettingsProviderProps {
  children: ReactNode;
}

export const AppSettingsProvider: React.FC<AppSettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from storage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  // Update dark mode based on theme setting
  useEffect(() => {
    updateDarkMode();
  }, [settings.theme]);

  const loadSettings = async () => {
    try {
      const storedSettings = await getItem('appSettings');
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      }
    } catch (error) {
      console.error('Failed to load settings', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = async (newSettings: AppSettings) => {
    try {
      await setItem('appSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to save settings', error);
    }
  };

  const updateDarkMode = () => {
    if (settings.theme === 'dark') {
      setIsDarkMode(true);
    } else if (settings.theme === 'light') {
      setIsDarkMode(false);
    } else {
      // Auto mode - you can implement system preference detection here
      // For now, default to light mode
      setIsDarkMode(false);
    }
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };

  const updateNotificationSettings = (notificationSettings: Partial<NotificationSettings>) => {
    const updatedNotifications = { ...settings.notifications, ...notificationSettings };
    updateSettings({ notifications: updatedNotifications });
  };

  const updateDataSyncSettings = (dataSyncSettings: Partial<DataSyncSettings>) => {
    const updatedDataSync = { ...settings.dataSync, ...dataSyncSettings };
    updateSettings({ dataSync: updatedDataSync });
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
    saveSettings(defaultSettings);
  };

  if (isLoading) {
    return null; // Or a loading component
  }

  return (
    <AppSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updateNotificationSettings,
        updateDataSyncSettings,
        resetToDefaults,
        isDarkMode,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export default AppSettingsContext;