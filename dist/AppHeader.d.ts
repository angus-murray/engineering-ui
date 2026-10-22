import React from 'react';
/**
 * Sticky app header: logo, app name with "Created by …" on the same baseline, then About (text button) and
 * PDF Report (solid blue button) on the right. Leave out onReport for an app without a report; extra buttons go in
 * `actions`, before About. An app with several tabs passes `tabs`, shown as a row of tabs under the name.
 */
export interface HeaderTab<K extends string = string> {
    key: K;
    label: string;
    icon?: React.ReactNode;
}
export declare function AppHeader<K extends string = string>({ name, logoSrc, author, onAbout, onReport, actions, tabs, activeTab, onTab }: {
    name: string;
    logoSrc?: string;
    author?: string;
    onAbout?: () => void;
    onReport?: () => void;
    actions?: React.ReactNode;
    tabs?: HeaderTab<K>[];
    activeTab?: K;
    onTab?: (key: K) => void;
}): React.JSX.Element;
