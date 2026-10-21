import React from 'react';
/** Utilisation as a percentage to one decimal; "> 999%" above 9.99. */
export declare const pct: (u: number) => string;
/** Not-applicable value in a table (em-dash, slate-400). Inside an input box use an en-dash instead. */
export declare const Dash: React.FC;
/** Utilisation; the governing value of a row is a pill: green below 100%, amber at exactly 100%, red above. */
export declare const UtilValue: React.FC<{
    value: number;
    highlight?: boolean;
}>;
export declare const PassFail: React.FC<{
    pass: boolean;
}>;
/** Column widths of a results table in percent, e.g. <Cols w={[10, 15, 15, 60]} />. */
export declare const Cols: React.FC<{
    w: number[];
}>;
declare const CHIP: {
    neutral: string;
    pass: string;
    fail: string;
    warn: string;
};
/** Status chip for the Results title row ("Not Solved", "… PASS (Max Util: 87.3%)", "… FAIL (…)", "3 warnings"). */
export declare const StatusChip: React.FC<{
    kind: keyof typeof CHIP;
    children: React.ReactNode;
}>;
/** Results panel title row: "Results" (or another title) on the left, status chips on the right. */
export declare const ResultsHeader: React.FC<{
    title?: string;
    children?: React.ReactNode;
}>;
/** Error (rose) or warning (amber) banner: bold title with icon, then 11 px detail or a list. */
export declare const Banner: React.FC<{
    kind: 'error' | 'warning';
    title: React.ReactNode;
    items?: React.ReactNode[];
    children?: React.ReactNode;
}>;
/** Collapsible panel (closed by default) for the About page. */
export declare const CollapsePanel: React.FC<{
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}>;
/** Formula on its own line in the About page. */
export declare const Formula: React.FC<{
    children: React.ReactNode;
}>;
export {};
