// src/theme.tsx
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useState, createContext, useContext, ReactNode, useMemo } from 'react';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: { default: '#F9F9FE', paper: '#EEEEF9' },
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#2A4364', paper: '#112E4D' },
    primary: { main: '#90caf9' },
    secondary: { main: '#ce93d8' },
  },
});

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

const ThemeModeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
