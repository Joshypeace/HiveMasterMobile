// /src/hooks/useTheme.ts
import { useAppSettings } from '../context/AppSettingsContext';
import { lightTheme, darkTheme } from '../styles/theme';

export const useTheme = () => {
  const { isDarkMode } = useAppSettings();
  
  return {
    theme: isDarkMode ? darkTheme : lightTheme,
    isDarkMode,
  };
};