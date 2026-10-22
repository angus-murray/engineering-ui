import React, { useEffect, useRef, useState } from 'react';

/** Width and height of an element, kept up to date with a ResizeObserver. */
export function useElementSize<T extends HTMLElement>(): [React.RefObject<T | null>, { width: number; height: number }] {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width > 0) setSize({ width: r.width, height: r.height });
    const ro = new ResizeObserver((entries) => {
      const c = entries[0]?.contentRect;
      if (c && c.width > 0) setSize({ width: c.width, height: c.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

/**
 * A chart with its title that takes the height available: maxHeight where there is room, shrinking to minHeight.
 * Place it in a flex column (e.g. a .panel with `flex flex-col` in a .fill-window layout); below the minimum the
 * parent scrolls. children receives the plot area's size in px and is drawn inside a relative box, so tooltips can be
 * absolutely positioned in it.
 */
export const ChartFrame: React.FC<{
  title?: React.ReactNode;
  minHeight?: number;
  maxHeight?: number;
  className?: string;
  onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
  children: (size: { width: number; height: number }) => React.ReactNode;
}> = ({ title, minHeight = 150, maxHeight = 220, className = '', onPointerMove, onPointerLeave, children }) => {
  const [ref, size] = useElementSize<HTMLDivElement>();
  return (
    <div className={`flex flex-col ${className}`} style={{ minHeight: minHeight + (title ? 24 : 0) }}>
      {title && <h3 className="card-title mb-1">{title}</h3>}
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative w-full select-none"
        style={{ height: maxHeight, minHeight, flexShrink: 1 }}
      >
        {size.width > 0 && children(size)}
      </div>
    </div>
  );
};
