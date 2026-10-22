import React from 'react';
/**
 * Text state for a numeric input that lets the user type freely (including clearing the field or passing
 * through values outside the allowed range, e.g. "1" on the way to "200").
 *
 * - While typing, a value is passed on only when it is a valid number within [min, max].
 * - On blur or Enter, the value is clamped to [min, max] and committed; an empty or invalid entry reverts.
 * - External value changes are reflected when the field is not being edited.
 * - `format` sets how the value is shown when not editing (e.g. fixed decimals).
 * - `onStep`, if given, is called with +1 / -1 for the up / down arrow keys; the field then shows the new value.
 */
export declare function useNumberText(value: number, onChange: (v: number) => void, min?: number, max?: number, format?: (v: number) => string, onStep?: (dir: 1 | -1) => void): {
    value: string;
    onFocus: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
