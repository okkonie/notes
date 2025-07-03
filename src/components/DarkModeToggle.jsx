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
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
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
      className="size-10 flex items-center justify-center rounded-full bg-slate-900 dark:bg-slate-300"
    >
      {isDark ? <Moon className='size-5 text-slate-900'/> : <Sun size={20} className='size-5 text-slate-300'/>}
    </button>
  );
};

export default DarkModeToggle;
