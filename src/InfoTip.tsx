import React from 'react';
import { Info } from 'lucide-react';
import { TipBox, useTip } from './TipBox.js';

/**
 * An (i) icon, optionally after a label such as a panel title, that shows a pop-up tip (.tip) while the pointer is
 * over the label or icon, or while it has keyboard focus.
 *
 *   <InfoTip label={<h2 className="card-title">Elevation</h2>}>Loads shown are for the instantaneous case…</InfoTip>
 */
export function InfoTip({ label, children, className = '' }: { label?: React.ReactNode; children: React.ReactNode; className?: string }) {
  const { ref, open, handlers } = useTip();
  return (
    <span ref={ref} tabIndex={0} className={`relative inline-flex items-center gap-2 cursor-help outline-none ${className}`} {...handlers}>
      {label}
      <Info className="w-4 h-4 text-slate-400" aria-hidden="true" />
      <TipBox anchor={ref} open={open} className="tip">{children}</TipBox>
    </span>
  );
}
