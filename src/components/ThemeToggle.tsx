import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 win98-button flex items-center justify-center w-8 h-8"
      aria-label="Toggle theme"
      title="Toggle theme (Windows 98 style)"
    >
      {theme === 'dark' ? (
        <Sun size={16} className="text-win98-black" />
      ) : (
        <Moon size={16} className="text-win98-black" />
      )}
    </button>
  );
};

export default ThemeToggle;