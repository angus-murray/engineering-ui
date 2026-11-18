import React from 'react';
/**
 * Sticky app header: logo and app name, then PDF Report (solid blue button) and the menu (About, Theme) on the
 * right. The author, version and release month are in the About page (AboutModal), not the header. Leave out onReport for an app without a report; extra buttons go in
 * `actions`, before PDF Report. An app with several tabs passes `tabs`, shown as a row of tabs under the name.
 */
export interface HeaderTab<K extends string = string> {
    key: K;
    label: string;
    icon?: React.ReactNode;
}
export declare function AppHeader<K extends string = string>({ name, logoSrc, onAbout, onReport, actions, tabs, activeTab, onTab }: {
    name: string;
    logoSrc?: string;
    /** @deprecated Ignored since 1.8.0: the author is shown in the About page (AboutModal / AppInfo). */
    author?: string;
    onAbout?: () => void;
    onReport?: () => void;
    actions?: React.ReactNode;
    tabs?: HeaderTab<K>[];
    activeTab?: K;
    onTab?: (key: K) => void;
}): React.JSX.Element;
