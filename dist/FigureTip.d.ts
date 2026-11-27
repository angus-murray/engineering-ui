import React from 'react';
/**
 * An (i) icon, optionally after a label, that shows a figure (an SVG diagram) in a pop-up on the panel background
 * (.tip-figure) while the pointer is over the label or icon, or while it has keyboard focus. The caption names the
 * clause or figure the diagram illustrates. Use it for diagrams in input panels, where plain-text notes use InfoTip.
 *
 *   <FigureTip label={<span className="label">Restraint</span>} caption="See AS 1720.1 Cl. 3.2.3">
 *     <RestraintDiagram kind={restraint} />
 *   </FigureTip>
 */
export declare function FigureTip({ label, children, caption, className }: {
    label?: React.ReactNode;
    children: React.ReactNode;
    caption?: React.ReactNode;
    className?: string;
}): React.JSX.Element;
