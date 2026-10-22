import React from 'react';
/** Width and height of an element, kept up to date with a ResizeObserver. */
export declare function useElementSize<T extends HTMLElement>(): [React.RefObject<T | null>, {
    width: number;
    height: number;
}];
/**
 * A chart with its title that takes the height available: maxHeight where there is room, shrinking to minHeight.
 * Place it in a flex column (e.g. a .panel with `flex flex-col` in a .fill-window layout); below the minimum the
 * parent scrolls. children receives the plot area's size in px and is drawn inside a relative box, so tooltips can be
 * absolutely positioned in it.
 */
export declare const ChartFrame: React.FC<{
    title?: React.ReactNode;
    minHeight?: number;
    maxHeight?: number;
    className?: string;
    onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
    onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
    children: (size: {
        width: number;
        height: number;
    }) => React.ReactNode;
}>;
