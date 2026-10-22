import { useLayoutEffect, useSyncExternalStore } from 'react';
const KEY = 'theme';
const current = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
export function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
        localStorage.setItem(KEY, theme);
    }
    catch {
        // storage blocked: the theme still applies until the page is reloaded
    }
}
/** Applies the saved theme (light when none is saved). */
export function initTheme() {
    let saved = null;
    try {
        saved = localStorage.getItem(KEY);
    }
    catch {
        // storage blocked
    }
    document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
}
const subscribe = (onChange) => {
    const obs = new MutationObserver(onChange);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
};
/** The current theme and a setter; re-renders when the theme changes (e.g. to redraw a canvas in new colours). */
export function useTheme() {
    return [useSyncExternalStore(subscribe, current, () => 'light'), setTheme];
}
/** Applies the saved theme before the first paint (AppHeader calls it). */
export function useInitTheme() {
    useLayoutEffect(initTheme, []);
}
