import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext("light");

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(
    () => {
      const saved = localStorage.getItem("darkMode") 
      return saved !== null ? saved === "true" : false; 
    }
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeContext value={{ darkMode, toggleTheme }}>{children}</ThemeContext>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
