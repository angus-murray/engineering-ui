import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AlertTriangle, CheckCircle2, ChevronDown } from 'lucide-react';
/** Utilisation as a percentage to one decimal; "> 999%" above 9.99. */
export const pct = (u) => (u >= 9.99 ? '> 999%' : `${(u * 100).toFixed(1)}%`);
/** Not-applicable value in a table (em-dash, slate-400). Inside an input box use an en-dash instead. */
export const Dash = () => _jsx("span", { className: "text-slate-400", children: "\u2014" });
/** Utilisation; the governing value of a row is a pill: green below 100%, amber at exactly 100%, red above. */
export const UtilValue = ({ value, highlight }) => {
    const txt = pct(value);
    if (!highlight)
        return _jsx("span", { className: "text-slate-600", children: txt });
    const at100 = Math.round(value * 1000) === 1000;
    const cls = at100 ? 'bg-amber-100 text-amber-800' : value > 1 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800';
    return _jsx("span", { className: `px-1.5 py-0.5 rounded font-semibold ${cls}`, children: txt });
};
export const PassFail = ({ pass }) => pass ? _jsx("span", { className: "font-semibold text-emerald-700", children: "PASS" }) : _jsx("span", { className: "font-semibold text-rose-700", children: "FAIL" });
/** Column widths of a results table in percent, e.g. <Cols w={[10, 15, 15, 60]} />. */
export const Cols = ({ w }) => (_jsx("colgroup", { children: w.map((x, i) => (_jsx("col", { style: { width: `${x}%` } }, i))) }));
const CHIP = {
    neutral: 'bg-slate-100 text-slate-600',
    pass: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    fail: 'bg-rose-100 text-rose-800 border border-rose-200',
    warn: 'bg-amber-100 text-amber-800 border border-amber-200'
};
/** Status chip for the Results title row ("Not Solved", "… PASS (Max Util: 87.3%)", "… FAIL (…)", "3 warnings"). */
export const StatusChip = ({ kind, children }) => (_jsxs("span", { className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold ${CHIP[kind]}`, children: [kind === 'pass' && _jsx(CheckCircle2, { className: "w-3.5 h-3.5" }), (kind === 'fail' || kind === 'warn') && _jsx(AlertTriangle, { className: "w-3.5 h-3.5" }), children] }));
/** Results panel title row: "Results" (or another title) on the left, status chips on the right. */
export const ResultsHeader = ({ title = 'Results', children }) => (_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 min-h-7 border-b border-slate-100 pb-1.5", children: [_jsx("h2", { className: "text-[13px] font-bold text-slate-800", children: title }), children && _jsx("span", { className: "inline-flex flex-wrap items-center gap-1.5", children: children })] }));
/** Error (rose) or warning (amber) banner: bold title with icon, then 11 px detail or a list. */
export const Banner = ({ kind, title, items, children }) => {
    const err = kind === 'error';
    return (_jsxs("div", { className: `rounded-lg p-3 text-xs space-y-1.5 border ${err ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-amber-50 border-amber-200 text-amber-900'}`, children: [_jsxs("div", { className: "flex items-center gap-1.5 font-bold", children: [_jsx(AlertTriangle, { className: `w-4 h-4 shrink-0 ${err ? 'text-rose-600' : 'text-amber-600'}` }), _jsx("span", { children: title })] }), items && items.length > 0 && (_jsx("ul", { className: "list-disc pl-5 space-y-0.5 text-[11px]", children: items.map((it, i) => (_jsx("li", { children: it }, i))) })), children && _jsx("div", { className: "text-[11px] leading-relaxed", children: children })] }));
};
/** Collapsible panel (closed by default) for the About page. */
export const CollapsePanel = ({ title, defaultOpen = false, children }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (_jsxs("section", { className: "panel !space-y-0", children: [_jsxs("button", { type: "button", onClick: () => setOpen(!open), className: "w-full flex items-center justify-between text-left", "aria-expanded": open, children: [_jsx("h2", { className: "text-[13px] font-bold text-slate-800", children: title }), _jsx(ChevronDown, { className: `w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}` })] }), open && _jsx("div", { className: "mt-2.5 pt-2.5 border-t border-slate-100 space-y-2 text-xs leading-relaxed text-slate-700", children: children })] }));
};
/** Formula on its own line in the About page. */
export const Formula = ({ children }) => (_jsx("div", { className: "px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-center text-xs text-slate-700 overflow-x-auto", children: children }));
