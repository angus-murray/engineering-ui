import React from 'react';
/** 'YYYY-MM' as "November 2026"; any other text is shown as given. */
export declare function formatReleaseDate(date: string): string;
/**
 * Panel at the top of the About page: logo and app name, "Version 2.3, November 2026" and "Created by Angus Murray".
 * `version` has two numbers, major.minor (STYLE.md §10); `date` is the month of the release as 'YYYY-MM'.
 */
export declare const AppInfo: React.FC<{
    name: string;
    version: string;
    date: string;
    author?: string;
    logoSrc?: string;
}>;
/**
 * About pop-up: the app's name, version, release month and author (AppInfo) above the app's collapsible panels.
 *
 *   <AboutModal name="Bridge1D" version="2.3" date="2026-11" onClose={() => setShowAbout(false)}>
 *     <CollapsePanel title="Overview" defaultOpen>…</CollapsePanel>
 *   </AboutModal>
 */
export declare const AboutModal: React.FC<{
    name: string;
    version: string;
    date: string;
    author?: string;
    logoSrc?: string;
    onClose: () => void;
    children?: React.ReactNode;
}>;
