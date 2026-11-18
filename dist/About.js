import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal } from './Modal.js';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** 'YYYY-MM' as "November 2026"; any other text is shown as given. */
export function formatReleaseDate(date) {
    const m = /^(\d{4})-(\d{2})$/.exec(date);
    if (!m)
        return date;
    const month = MONTHS[Number(m[2]) - 1];
    return month ? `${month} ${m[1]}` : date;
}
/**
 * Panel at the top of the About page: logo and app name, "Version 2.3, November 2026" and "Created by Angus Murray".
 * `version` has two numbers, major.minor (STYLE.md §10); `date` is the month of the release as 'YYYY-MM'.
 */
export const AppInfo = ({ name, version, date, author = 'Angus Murray', logoSrc = '/favicon.svg' }) => (_jsxs("section", { className: "panel !space-y-0 flex items-center gap-3", children: [logoSrc && _jsx("img", { src: logoSrc, alt: "", className: "w-10 h-10 shrink-0" }), _jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: "text-lg font-black text-slate-900 tracking-tight leading-tight", children: name }), _jsxs("div", { className: "text-xs text-slate-700", children: ["Version ", version, ", ", formatReleaseDate(date)] }), author && _jsxs("div", { className: "text-xs text-slate-500", children: ["Created by ", author] })] })] }));
/**
 * About pop-up: the app's name, version, release month and author (AppInfo) above the app's collapsible panels.
 *
 *   <AboutModal name="Bridge1D" version="2.3" date="2026-11" onClose={() => setShowAbout(false)}>
 *     <CollapsePanel title="Overview" defaultOpen>…</CollapsePanel>
 *   </AboutModal>
 */
export const AboutModal = ({ onClose, children, ...info }) => (_jsx(Modal, { title: "About", variant: "page", onClose: onClose, children: _jsxs("div", { className: "space-y-3", children: [_jsx(AppInfo, { ...info }), children] }) }));
