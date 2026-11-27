import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info } from 'lucide-react';
import { TipBox, useTip } from './TipBox.js';
/**
 * An (i) icon, optionally after a label such as a panel title, that shows a pop-up tip (.tip) while the pointer is
 * over the label or icon, or while it has keyboard focus. The tip is drawn above every panel (see TipBox).
 *
 *   <InfoTip label={<h2 className="card-title">Elevation</h2>}>Loads shown are for the instantaneous case…</InfoTip>
 */
export function InfoTip({ label, children, className = '' }) {
    const { ref, open, handlers } = useTip();
    return (_jsxs("span", { ref: ref, tabIndex: 0, className: `relative inline-flex items-center gap-2 cursor-help outline-none ${className}`, ...handlers, children: [label, _jsx(Info, { className: "w-4 h-4 text-slate-400", "aria-hidden": "true" }), _jsx(TipBox, { anchor: ref, open: open, className: "tip", children: children })] }));
}
