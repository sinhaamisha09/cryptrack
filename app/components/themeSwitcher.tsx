"use client";
 
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../context/themeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="btn" onClick={toggleTheme}>
      {theme === 'sunset' ? (
        <MoonIcon className="h-6 w-6 text-gray-800" aria-hidden="true" />
      ) : (
        <SunIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
