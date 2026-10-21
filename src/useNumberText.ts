import React, { useEffect, useState } from 'react';

/**
 * Text state for a numeric input that lets the user type freely (including clearing the field or passing
 * through values outside the allowed range, e.g. "1" on the way to "200").
 *
 * - While typing, a value is passed on only when it is a valid number within [min, max].
 * - On blur or Enter, the value is clamped to [min, max] and committed; an empty or invalid entry reverts.
 * - External value changes are reflected when the field is not being edited.
 */
export function useNumberText(value: number, onChange: (v: number) => void, min?: number, max?: number) {
  const [text, setText] = useState(String(value));
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!editing) setText(String(value));
  }, [value, editing]);

  const inRange = (v: number) => (min === undefined || v >= min) && (max === undefined || v <= max);
  const clamp = (v: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, v));

  const commit = () => {
    setEditing(false);
    const v = parseFloat(text);
    if (!Number.isFinite(v)) {
      setText(String(value));
      return;
    }
    const c = clamp(v);
    if (c !== value) onChange(c);
    setText(String(c));
  };

  return {
    value: text,
    onFocus: () => setEditing(true),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditing(true);
      setText(e.target.value);
      const v = parseFloat(e.target.value);
      if (Number.isFinite(v) && inRange(v) && v !== value) onChange(v);
    },
    onBlur: commit,
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
      if (e.key === 'Escape') {
        setText(String(value));
        setEditing(false);
        (e.target as HTMLInputElement).blur();
      }
    }
  };
}
