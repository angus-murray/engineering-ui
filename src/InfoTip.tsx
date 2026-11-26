import React from 'react';
import { Info } from 'lucide-react';

/**
 * An (i) icon, optionally after a label such as a panel title, that shows a pop-up tip (.tip) while the pointer is
 * over the label or icon, or while it has keyboard focus.
 *
 *   <InfoTip label={<h2 className="card-title">Elevation</h2>}>Loads shown are for the instantaneous case…</InfoTip>
 */
export function InfoTip({ label, children, className = '' }: { label?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <span tabIndex={0} className={`relative inline-flex items-center gap-2 group cursor-help outline-none ${className}`}>
      {label}
      <Info className="w-4 h-4 text-slate-400" aria-hidden="true" />
      <span role="tooltip" className="tip left-0 top-full mt-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
        {children}
      </span>
    </span>
  );
}
