import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'System', value: 'system' },
  { name: 'Ocean', value: 'ocean' },
  { name: 'Forest', value: 'forest' },
  { name: 'Sunset', value: 'sunset' },
];

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Select Theme</h3>
      <div className="grid grid-cols-2 gap-4">
        {themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value as any)}
            className={`p-4 rounded-lg border-2 ${theme === t.value ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;