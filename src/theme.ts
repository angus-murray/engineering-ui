import { useLayoutEffect, useSyncExternalStore } from 'react';

/**
 * Colour theme: 'light' (the default) or 'dark', set as data-theme on <html> and kept in localStorage.
 * theme.css re-maps the slate, emerald, amber, rose and white colours under data-theme="dark", so the same classes
 * serve both themes.
 */
export type Theme = 'light' | 'dark';

const KEY = 'theme';

const current = (): Theme => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // storage blocked: the theme still applies until the page is reloaded
  }
}

/** Applies the saved theme (light when none is saved). */
export function initTheme() {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {
    // storage blocked
  }
  document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
}

const subscribe = (onChange: () => void) => {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => obs.disconnect();
};

/** The current theme and a setter; re-renders when the theme changes (e.g. to redraw a canvas in new colours). */
export function useTheme(): [Theme, (theme: Theme) => void] {
  return [useSyncExternalStore(subscribe, current, () => 'light'), setTheme];
}

/** Applies the saved theme before the first paint (AppHeader calls it). */
export function useInitTheme() {
  useLayoutEffect(initTheme, []);
}
