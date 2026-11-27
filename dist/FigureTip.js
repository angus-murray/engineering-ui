import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info } from 'lucide-react';
import { TipBox, useTip } from './TipBox.js';
/**
 * An (i) icon, optionally after a label, that shows a figure (an SVG diagram) in a pop-up on the panel background
 * (.tip-figure) while the pointer is over the label or icon, or while it has keyboard focus. The caption names the
 * clause or figure the diagram illustrates. The pop-up is drawn above every panel (see TipBox).
 *
 *   <FigureTip label={<span className="label">Restraint</span>} caption="See AS 1720.1 Cl. 3.2.3">
 *     <RestraintDiagram kind={restraint} />
 *   </FigureTip>
 */
export function FigureTip({ label, children, caption, className = '' }) {
    const { ref, open, handlers } = useTip();
    return (_jsxs("span", { ref: ref, tabIndex: 0, className: `relative inline-flex items-center gap-2 cursor-help outline-none ${className}`, ...handlers, children: [label, _jsx(Info, { className: "w-4 h-4 text-slate-400", "aria-hidden": "true" }), _jsx(TipBox, { anchor: ref, open: open, className: "tip-figure", children: _jsxs(_Fragment, { children: [_jsx("span", { className: "block", children: children }), caption && _jsx("span", { className: "block mt-1.5 text-[11px] text-slate-500", children: caption })] }) })] }));
}
