import React from 'react';
/**
 * Sticky app header: logo, app name with "Created by …" on the same baseline, then About (text button) and
 * PDF Report (solid blue button) on the right. Leave out onReport for an app without a report; extra buttons go in
 * `actions`, before About.
 */
export declare const AppHeader: React.FC<{
    name: string;
    logoSrc?: string;
    author?: string;
    onAbout?: () => void;
    onReport?: () => void;
    actions?: React.ReactNode;
}>;
