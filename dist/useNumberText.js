import { useEffect, useState } from 'react';
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
export function useNumberText(value, onChange, min, max, format = String, onStep) {
    const [text, setText] = useState(format(value));
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        if (!editing)
            setText(format(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, editing]);
    const inRange = (v) => (min === undefined || v >= min) && (max === undefined || v <= max);
    const clamp = (v) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, v));
    const commit = () => {
        setEditing(false);
        const v = parseFloat(text);
        if (!Number.isFinite(v)) {
            setText(format(value));
            return;
        }
        const c = clamp(v);
        if (c !== value)
            onChange(c);
        setText(format(c));
    };
    return {
        value: text,
        onFocus: () => setEditing(true),
        onChange: (e) => {
            setEditing(true);
            setText(e.target.value);
            const v = parseFloat(e.target.value);
            if (Number.isFinite(v) && inRange(v) && v !== value)
                onChange(v);
        },
        onBlur: commit,
        onKeyDown: (e) => {
            if (onStep && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                e.preventDefault();
                setEditing(false);
                onStep(e.key === 'ArrowUp' ? 1 : -1);
                return;
            }
            if (e.key === 'Enter')
                e.target.blur();
            if (e.key === 'Escape') {
                setText(format(value));
                setEditing(false);
                e.target.blur();
            }
        }
    };
}
