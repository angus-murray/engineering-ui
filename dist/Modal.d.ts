import React from 'react';
/**
 * Pop-up over a dimmed page. Escape, the × button or a click outside closes it.
 * variant 'page' (About): wide, slate-100 background holding panels. variant 'dialog': narrow, white.
 */
export declare const Modal: React.FC<{
    title: string;
    onClose: () => void;
    variant?: 'page' | 'dialog';
    children: React.ReactNode;
}>;
/**
 * PDF report dialog: optional project details (blank fields are left out of the report) in two columns, then Cancel / Generate PDF.
 * onGenerate throws (or rejects) to show an error; a returned string is shown as a message instead of closing.
 */
export declare function ReportDialog<T extends object>({ fields, info, setInfo, onGenerate, onClose }: {
    /** [key of info, label] for each field, in display order. */
    fields: readonly (readonly [keyof NoInfer<T> & string, string])[];
    info: T;
    setInfo: (info: NoInfer<T>) => void;
    onGenerate: () => Promise<string | void> | string | void;
    onClose: () => void;
}): React.JSX.Element;
/** Today as dd/mm/yyyy, the default report date. */
export declare const today: () => string;
