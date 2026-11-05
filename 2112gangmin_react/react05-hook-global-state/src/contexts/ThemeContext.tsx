import { createContext, useState, type ReactNode } from "react";
type ThemeContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
};
type ThemeProviderProps = {
  children: ReactNode;
};
export const ThemeContext = createContext<ThemeContextValue | null>(null);
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };
  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};
