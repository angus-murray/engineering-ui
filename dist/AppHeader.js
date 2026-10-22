import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { FileText, Info, Menu, Moon, Sun, SunMoon } from 'lucide-react';
import { useInitTheme, useTheme } from './theme.js';
export function AppHeader({ name, logoSrc = '/favicon.svg', author = 'Angus Murray', onAbout, onReport, actions, tabs, activeTab, onTab }) {
    useInitTheme();
    return (_jsx("header", { className: "bg-white border-b border-slate-200 shadow-sm shrink-0 sticky top-0 z-30", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: `flex items-center gap-3 ${tabs ? 'py-2 border-b border-slate-100' : 'py-3'}`, children: [logoSrc && _jsx("img", { src: logoSrc, alt: "", className: "w-8 h-8 sm:w-9 sm:h-9 shrink-0" }), _jsxs("div", { className: "flex items-baseline gap-3 min-w-0", children: [_jsx("h1", { className: "font-black text-slate-900 text-2xl sm:text-3xl tracking-tight", children: name }), author && _jsxs("span", { className: "text-xs sm:text-sm font-medium text-slate-500", children: ["Created by ", author] })] }), _jsxs("div", { className: "ml-auto flex items-center gap-3 sm:gap-4", children: [actions, onReport && (_jsxs("button", { type: "button", onClick: onReport, className: "inline-flex items-center gap-1.5 h-8 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded px-3 transition-colors", children: [_jsx(FileText, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "PDF Report" })] })), _jsx(HeaderMenu, { onAbout: onAbout })] })] }), tabs && (_jsx("nav", { className: "flex space-x-6 overflow-x-auto pt-1.5 text-xs sm:text-sm font-medium", role: "tablist", children: tabs.map((t) => (_jsxs("button", { type: "button", role: "tab", "aria-selected": activeTab === t.key, onClick: () => onTab?.(t.key), className: `flex items-center gap-2 pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === t.key ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-slate-600 hover:text-slate-900'}`, children: [t.icon, _jsx("span", { children: t.label })] }, t.key))) }))] }) }));
}
/** Menu button at the right of the header: About (when the app has one), then the Light / Dark theme choice. */
function HeaderMenu({ onAbout }) {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useTheme();
    const ref = useRef(null);
    useEffect(() => {
        if (!open)
            return;
        const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('pointerdown', onDown);
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('keydown', onKey);
        };
    }, [open]);
    const themes = [
        { value: 'light', label: 'Light', icon: _jsx(Sun, { className: "w-3.5 h-3.5" }) },
        { value: 'dark', label: 'Dark', icon: _jsx(Moon, { className: "w-3.5 h-3.5" }) }
    ];
    return (_jsxs("div", { ref: ref, className: "relative", children: [_jsx("button", { type: "button", onClick: () => setOpen(!open), "aria-label": "Menu", "aria-haspopup": "menu", "aria-expanded": open, className: `flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${open ? 'bg-slate-100 text-blue-600' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`, children: _jsx(Menu, { className: "w-5 h-5", strokeWidth: 1.75 }) }), open && (_jsxs("div", { role: "menu", className: "absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40", children: [onAbout && (_jsxs("button", { type: "button", role: "menuitem", onClick: () => {
                            setOpen(false);
                            onAbout();
                        }, className: "w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors", children: [_jsx(Info, { className: "w-4 h-4", strokeWidth: 1.75 }), _jsx("span", { children: "About" })] })), _jsxs("div", { className: `px-3 pt-2 pb-2.5 space-y-2 ${onAbout ? 'border-t border-slate-100' : ''}`, children: [_jsxs("div", { className: "flex items-center gap-2 text-xs font-medium text-slate-700", children: [_jsx(SunMoon, { className: "w-4 h-4", strokeWidth: 1.75 }), _jsx("span", { children: "Theme" })] }), _jsx("div", { className: "segmented grid-cols-2", role: "radiogroup", "aria-label": "Theme", children: themes.map((t) => (_jsxs("button", { type: "button", role: "radio", "aria-checked": theme === t.value, onClick: () => setTheme(t.value), className: `segment inline-flex items-center justify-center gap-1 ${theme === t.value ? 'segment-active' : ''}`, children: [t.icon, _jsx("span", { children: t.label })] }, t.value))) })] })] }))] }));
}
