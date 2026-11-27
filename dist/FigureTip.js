import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info } from 'lucide-react';
/**
 * An (i) icon, optionally after a label, that shows a figure (an SVG diagram) in a pop-up on the panel background
 * (.tip-figure) while the pointer is over the label or icon, or while it has keyboard focus. The caption names the
 * clause or figure the diagram illustrates. Use it for diagrams in input panels, where plain-text notes use InfoTip.
 *
 *   <FigureTip label={<span className="label">Restraint</span>} caption="See AS 1720.1 Cl. 3.2.3">
 *     <RestraintDiagram kind={restraint} />
 *   </FigureTip>
 */
export function FigureTip({ label, children, caption, className = '' }) {
    return (_jsxs("span", { tabIndex: 0, className: `relative inline-flex items-center gap-2 group cursor-help outline-none ${className}`, children: [label, _jsx(Info, { className: "w-4 h-4 text-slate-400", "aria-hidden": "true" }), _jsxs("span", { role: "tooltip", className: "tip-figure left-0 top-full mt-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100", children: [_jsx("span", { className: "block", children: children }), caption && _jsx("span", { className: "block mt-1.5 text-[11px] text-slate-500", children: caption })] })] }));
}
