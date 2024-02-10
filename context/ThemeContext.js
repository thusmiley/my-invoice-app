"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePreferredColorScheme } from "../hooks/usePreferredScheme";
import { useToggle } from "../hooks/useToggle";

const ThemeContext = createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [preferred] = usePreferredColorScheme();
  const [dark, darkHandlers] = useToggle(preferred);

  useEffect(() => {
    if (preferred) darkHandlers.on();
    else darkHandlers.off();
  }, [preferred]);

  const toggleTheme = () => {
    darkHandlers.toggle();
  };

  return (
    <ThemeContext.Provider value={(dark, toggleTheme)}>
      {children}
    </ThemeContext.Provider>
  );
}
