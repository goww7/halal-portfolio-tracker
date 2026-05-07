'use client';

import { useEffect, useState } from 'react';

type Theme = 'day' | 'night';

const STORAGE_KEY = 'hpt-theme';

function readInitial(): Theme | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'day' || stored === 'night') return stored;
  return null;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readInitial());
  }, []);

  function set(next: Theme) {
    setTheme(next);
    document.documentElement.dataset.theme = next === 'night' ? 'dark' : 'light';
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  // Until we know what the user's preference is, render the markup but defer
  // emphasis. This avoids hydration mismatch and keeps the masthead steady.
  const isDay = theme === 'day';
  const isNight = theme === 'night';

  return (
    <div
      className="inline-flex items-center gap-2 select-none"
      role="group"
      aria-label="Reading mode"
    >
      <button
        type="button"
        onClick={() => set('day')}
        className="kicker transition-colors"
        style={{ color: isDay ? 'var(--ink)' : 'var(--ink-mute)' }}
        aria-pressed={isDay}
      >
        Day
      </button>
      <span
        aria-hidden
        style={{
          width: 1,
          height: 9,
          background: 'var(--ink-mute)',
          opacity: 0.5,
        }}
      />
      <button
        type="button"
        onClick={() => set('night')}
        className="kicker transition-colors"
        style={{ color: isNight ? 'var(--ink)' : 'var(--ink-mute)' }}
        aria-pressed={isNight}
      >
        Night
      </button>
    </div>
  );
}
