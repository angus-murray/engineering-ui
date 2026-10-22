import React from 'react';
export declare function useNumberText(value: number | undefined, onChange: (v: number) => void, min?: number, max?: number, format?: (v: number) => string, onStep?: (dir: 1 | -1) => void, onClear?: () => void): {
    value: string;
    onFocus: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
