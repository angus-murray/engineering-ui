import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown } from 'lucide-react';

/** Utilisation as a percentage to one decimal; "> 999%" above 9.99. */
export const pct = (u: number) => (u >= 9.99 ? '> 999%' : `${(u * 100).toFixed(1)}%`);

/** Not-applicable value in a table (em-dash, slate-400). Inside an input box use an en-dash instead. */
export const Dash: React.FC = () => <span className="text-slate-400">—</span>;

/** Utilisation; the governing value of a row is a pill: green below 100%, amber at exactly 100%, red above. */
export const UtilValue: React.FC<{ value: number; highlight?: boolean }> = ({ value, highlight }) => {
  const txt = pct(value);
  if (!highlight) return <span className="text-slate-600">{txt}</span>;
  const at100 = Math.round(value * 1000) === 1000;
  const cls = at100 ? 'bg-amber-100 text-amber-800' : value > 1 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800';
  return <span className={`px-1.5 py-0.5 rounded font-semibold ${cls}`}>{txt}</span>;
};

export const PassFail: React.FC<{ pass: boolean }> = ({ pass }) =>
  pass ? <span className="font-semibold text-emerald-700">PASS</span> : <span className="font-semibold text-rose-700">FAIL</span>;

/** Column widths of a results table in percent, e.g. <Cols w={[10, 15, 15, 60]} />. */
export const Cols: React.FC<{ w: number[] }> = ({ w }) => (
  <colgroup>
    {w.map((x, i) => (
      <col key={i} style={{ width: `${x}%` }} />
    ))}
  </colgroup>
);

const CHIP = {
  neutral: 'bg-slate-100 dark:bg-slate-50 text-slate-600',
  pass: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  fail: 'bg-rose-100 text-rose-800 border border-rose-200',
  warn: 'bg-amber-100 text-amber-800 border border-amber-200'
};

/** Status chip for the Results title row ("Not Solved", "… PASS (Max Util: 87.3%)", "… FAIL (…)", "3 warnings"). */
export const StatusChip: React.FC<{ kind: keyof typeof CHIP; children: React.ReactNode }> = ({ kind, children }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold ${CHIP[kind]}`}>
    {kind === 'pass' && <CheckCircle2 className="w-3.5 h-3.5" />}
    {(kind === 'fail' || kind === 'warn') && <AlertTriangle className="w-3.5 h-3.5" />}
    {children}
  </span>
);

/** Results panel title row: "Results" (or another title) on the left, status chips on the right. */
export const ResultsHeader: React.FC<{ title?: string; children?: React.ReactNode }> = ({ title = 'Results', children }) => (
  <div className="flex flex-wrap items-center justify-between gap-2 min-h-7 border-b border-slate-100 pb-1.5">
    <h2 className="text-[13px] font-bold text-slate-800">{title}</h2>
    {children && <span className="inline-flex flex-wrap items-center gap-1.5">{children}</span>}
  </div>
);

/** Error (rose) or warning (amber) banner: bold title with icon, then 11 px detail or a list. */
export const Banner: React.FC<{ kind: 'error' | 'warning'; title: React.ReactNode; items?: React.ReactNode[]; children?: React.ReactNode }> = ({
  kind,
  title,
  items,
  children
}) => {
  const err = kind === 'error';
  return (
    <div className={`rounded-lg p-3 text-xs space-y-1.5 border ${err ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
      <div className="flex items-center gap-1.5 font-bold">
        <AlertTriangle className={`w-4 h-4 shrink-0 ${err ? 'text-rose-600' : 'text-amber-600'}`} />
        <span>{title}</span>
      </div>
      {items && items.length > 0 && (
        <ul className="list-disc pl-5 space-y-0.5 text-[11px]">
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {children && <div className="text-[11px] leading-relaxed">{children}</div>}
    </div>
  );
};

/** Collapsible panel (closed by default) for the About page. */
export const CollapsePanel: React.FC<{ title: string; defaultOpen?: boolean; children: React.ReactNode }> = ({ title, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="panel !space-y-0">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left" aria-expanded={open}>
        <h2 className="text-[13px] font-bold text-slate-800">{title}</h2>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-2 text-xs leading-relaxed text-slate-700">{children}</div>}
    </section>
  );
};

/** Formula on its own line in the About page. */
export const Formula: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-center text-xs text-slate-700 overflow-x-auto">{children}</div>
);
