import React from 'react';
/**
 * An (i) icon, optionally after a label such as a panel title, that shows a pop-up tip (.tip) while the pointer is
 * over the label or icon, or while it has keyboard focus.
 *
 *   <InfoTip label={<h2 className="card-title">Elevation</h2>}>Loads shown are for the instantaneous case…</InfoTip>
 */
export declare function InfoTip({ label, children, className }: {
    label?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}): React.JSX.Element;
