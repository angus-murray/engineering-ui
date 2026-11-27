import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { createPortal } from 'react-dom';
/** Open state and the handlers that show a tip while the pointer is over, or focus is in, its anchor. */
export function useTip() {
    const ref = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const handlers = {
        onMouseEnter: () => setOpen(true),
        onMouseLeave: () => setOpen(false),
        onFocus: () => setOpen(true),
        onBlur: () => setOpen(false)
    };
    return { ref, open, handlers };
}
/**
 * The pop-up of InfoTip and FigureTip. It is drawn in a portal on <body> with fixed coordinates and a z-index above every
 * panel, so no panel, scroll box or stacking context can hide or clip it. It sits below its anchor, moves above it when
 * there is no room below, and stays inside the window horizontally.
 */
export function TipBox({ anchor, open, className, children }) {
    const box = React.useRef(null);
    const [pos, setPos] = React.useState(null);
    React.useLayoutEffect(() => {
        if (!open) {
            setPos(null);
            return;
        }
        const place = () => {
            const a = anchor.current?.getBoundingClientRect();
            const b = box.current?.getBoundingClientRect();
            if (!a || !b)
                return;
            const left = Math.max(8, Math.min(a.left, window.innerWidth - b.width - 8));
            let top = a.bottom + 8;
            if (top + b.height > window.innerHeight - 8 && a.top - 8 - b.height > 8)
                top = a.top - 8 - b.height;
            setPos({ left, top });
        };
        place();
        window.addEventListener('scroll', place, true);
        window.addEventListener('resize', place);
        return () => {
            window.removeEventListener('scroll', place, true);
            window.removeEventListener('resize', place);
        };
    }, [open, anchor, children]);
    if (!open)
        return null;
    return createPortal(_jsx("span", { ref: box, role: "tooltip", className: className, style: { position: 'fixed', left: pos?.left ?? 0, top: pos?.top ?? 0, zIndex: 1000, visibility: pos ? 'visible' : 'hidden' }, children: children }), document.body);
}
