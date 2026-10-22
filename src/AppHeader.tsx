import React from 'react';
import { FileText, Info } from 'lucide-react';

/**
 * Sticky app header: logo, app name with "Created by …" on the same baseline, then About (text button) and
 * PDF Report (solid blue button) on the right. Leave out onReport for an app without a report; extra buttons go in
 * `actions`, before About. An app with several tabs passes `tabs`, shown as a row of tabs under the name.
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
  return (
  <header className="bg-white border-b border-slate-200 shadow-sm shrink-0 sticky top-0 z-30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`py-3 flex items-center gap-3 ${tabs ? 'border-b border-slate-100' : ''}`}>
        {logoSrc && <img src={logoSrc} alt="" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" />}
        <div className="flex items-baseline gap-3 min-w-0">
          <h1 className="font-black text-slate-900 text-2xl sm:text-3xl tracking-tight">{name}</h1>
          {author && <span className="text-xs sm:text-sm font-medium text-slate-500">Created by {author}</span>}
        </div>
        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          {actions}
          {onAbout && (
            <button
              type="button"
              onClick={onAbout}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Info className="w-4 h-4" strokeWidth={1.75} />
              <span>About</span>
            </button>
          )}
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
        </div>
      </div>
      {tabs && (
        <nav className="flex space-x-6 overflow-x-auto py-2 text-xs sm:text-sm font-medium" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={activeTab === t.key}
              onClick={() => onTab?.(t.key)}
              className={`flex items-center gap-2 pb-1.5 border-b-2 transition-colors whitespace-nowrap ${
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
