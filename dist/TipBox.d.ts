import React from 'react';
export declare function useTip(): {
    ref: React.RefObject<HTMLSpanElement | null>;
    open: boolean;
    handlers: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onFocus: () => void;
        onBlur: () => void;
    };
};
export declare function TipBox({ anchor, open, className, children }: {
    anchor: React.RefObject<HTMLElement | null>;
    open: boolean;
    className: string;
    children: React.ReactNode;
}): React.ReactPortal | null;
