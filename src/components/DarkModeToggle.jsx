import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react'

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {

    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);


  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setIsDark(e.matches);

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <button
      onClick={toggleDarkMode}
      className="
        size-10 flex items-center justify-center rounded-lg
        border-border border transition-all duraiton-150 hover:bg-border
      "
    >
      {isDark ? <Moon className='size-5 text-white'/> : <Sun className='size-5 text-neutral-900'/>}
    </button>
  );
};

export default DarkModeToggle;