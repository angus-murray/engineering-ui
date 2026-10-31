import { jsx as _jsx } from "react/jsx-runtime";
/**
 * A custom icon drawn to the Lucide grid (24 × 24 box, 2 px round stroke, no fill), so it matches the Lucide icons
 * in a toolbar. Size and colour come from className and currentColor, e.g. <ToolIcon className="w-3.5 h-3.5">.
 */
export const ToolIcon = ({ className, children }) => (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: className, "aria-hidden": "true", children: children }));
