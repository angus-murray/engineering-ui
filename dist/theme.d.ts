/**
 * Colour theme: 'light' (the default) or 'dark', set as data-theme on <html> and kept in localStorage.
 * theme.css re-maps the slate, emerald, amber, rose and white colours under data-theme="dark", so the same classes
 * serve both themes.
 */
export type Theme = 'light' | 'dark';
export declare function setTheme(theme: Theme): void;
/** Applies the saved theme (light when none is saved). */
export declare function initTheme(): void;
/** The current theme and a setter; re-renders when the theme changes (e.g. to redraw a canvas in new colours). */
export declare function useTheme(): [Theme, (theme: Theme) => void];
/** Applies the saved theme before the first paint (AppHeader calls it). */
export declare function useInitTheme(): void;
