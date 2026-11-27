import React from 'react';
import { Info } from 'lucide-react';
import { TipBox, useTip } from './TipBox.js';

/**
 * An (i) icon, optionally after a label, that shows a figure (an SVG diagram) in a pop-up on the panel background
 * (.tip-figure) while the pointer is over the label or icon, or while it has keyboard focus. The caption names the
 * clause or figure the diagram illustrates. Use it for diagrams in input panels, where plain-text notes use InfoTip.
 *
 *   <FigureTip label={<span className="label">Restraint</span>} caption="See AS 1720.1 Cl. 3.2.3">
 *     <RestraintDiagram kind={restraint} />
 *   </FigureTip>
 */
export function FigureTip({ label, children, caption, className = '' }: { label?: React.ReactNode; children: React.ReactNode; caption?: React.ReactNode; className?: string }) {
  const { ref, open, handlers } = useTip();
  return (
    <span ref={ref} tabIndex={0} className={`relative inline-flex items-center gap-2 cursor-help outline-none ${className}`} {...handlers}>
      {label}
      <Info className="w-4 h-4 text-slate-400" aria-hidden="true" />
      <TipBox anchor={ref} open={open} className="tip-figure">
        <span className="block">{children}</span>
        {caption && <span className="block mt-1.5 text-[11px] text-slate-500">{caption}</span>}
      </TipBox>
    </span>
  );
}
