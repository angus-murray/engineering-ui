import React, { useEffect, useRef, useState } from 'react';
import { FileText, Info, Menu, Moon, Sun, SunMoon } from 'lucide-react';
import { useInitTheme, useTheme } from './theme.js';

/**
 * Sticky app header: logo, app name with "Created by …" on the same baseline, then PDF Report (solid blue button)
 * and the menu (About, Theme) on the right. Leave out onReport for an app without a report; extra buttons go in
 * `actions`, before PDF Report. An app with several tabs passes `tabs`, shown as a row of tabs under the name.
 */
export interface HeaderTab<K extends string = string> {
  key: K;
  label: string;
  icon?: React.ReactNode;
}

export function AppHeader<K extends string = string>({
  name,
  logoSrc = '/favicon.svg',
  author = 'Angus Murray',
  onAbout,
  onReport,
  actions,
  tabs,
  activeTab,
  onTab
}: {
  name: string;
  logoSrc?: string;
  author?: string;
  onAbout?: () => void;
  onReport?: () => void;
  actions?: React.ReactNode;
  tabs?: HeaderTab<K>[];
  activeTab?: K;
  onTab?: (key: K) => void;
}) {
  useInitTheme();
  return (
  <header className="bg-white border-b border-slate-200 shadow-sm shrink-0 sticky top-0 z-30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`flex items-center gap-3 ${tabs ? 'py-2 border-b border-slate-100' : 'py-3'}`}>
        {logoSrc && <img src={logoSrc} alt="" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />}
        <div className="flex items-baseline gap-3 min-w-0">
          <h1 className="font-black text-slate-900 text-2xl sm:text-3xl tracking-tight">{name}</h1>
          {author && <span className="text-xs sm:text-sm font-medium text-slate-500">Created by {author}</span>}
        </div>
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          {actions}
          {onReport && (
            <button
              type="button"
              onClick={onReport}
              className="inline-flex items-center gap-1.5 h-8 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded px-3 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF Report</span>
            </button>
          )}
          <HeaderMenu onAbout={onAbout} />
        </div>
      </div>
      {tabs && (
        <nav className="flex space-x-6 overflow-x-auto pt-1.5 text-xs sm:text-sm font-medium" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={activeTab === t.key}
              onClick={() => onTab?.(t.key)}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === t.key ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  </header>
  );
}

/** Menu button at the right of the header: About (when the app has one), then the Light / Dark theme choice. */
function HeaderMenu({ onAbout }: { onAbout?: () => void }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  const themes = [
    { value: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> }
  ] as const;
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
          open ? 'bg-slate-100 text-blue-600' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
        }`}
      >
        <Menu className="w-5 h-5" strokeWidth={1.75} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
          {onAbout && (
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onAbout();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
            >
              <Info className="w-4 h-4" strokeWidth={1.75} />
              <span>About</span>
            </button>
          )}
          <div className={`px-3 pt-2 pb-2.5 space-y-2 ${onAbout ? 'border-t border-slate-100' : ''}`}>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <SunMoon className="w-4 h-4" strokeWidth={1.75} />
              <span>Theme</span>
            </div>
            <div className="segmented grid-cols-2" role="radiogroup" aria-label="Theme">
              {themes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  role="radio"
                  aria-checked={theme === t.value}
                  onClick={() => setTheme(t.value)}
                  className={`segment inline-flex items-center justify-center gap-1 ${theme === t.value ? 'segment-active' : ''}`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
