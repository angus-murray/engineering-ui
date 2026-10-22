import React, { useCallback, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNumberText } from './useNumberText.js';

/**
 * Form controls: label above, up / down arrows inside the box (press and hold to repeat; the arrow keys also step),
 * free typing committed on blur / Enter. An input that does not apply is disabled with disabledText="–" (an en-dash).
 */
export const NumberField: React.FC<{
  label?: React.ReactNode;
  /** undefined shows an empty box (with the placeholder), for fields that allow it (see onClear). */
  value: number | undefined;
  onChange: (v: number) => void;
  /** Allows the box to be cleared; called when it is left empty. */
  onClear?: () => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  /** Custom stepping (e.g. through standard sizes); defaults to ± step. */
  /** Text shown instead of the value while disabled (e.g. an en-dash for an input that does not apply). */
  disabledText?: string;
  /** Fixed number of decimals shown when not editing (e.g. 2 → "2.50"). */
  decimals?: number;
  onStepUp?: () => void;
  onStepDown?: () => void;
  disabled?: boolean;
  hint?: React.ReactNode;
  small?: boolean;
  title?: string;
}> = ({ label, value, onChange, onClear, placeholder, min, max, step = 1, onStepUp, onStepDown, disabled, disabledText, decimals, hint, small, title }) => {
  const field = useNumberText(value, onChange, min, max, decimals === undefined ? String : (v) => v.toFixed(decimals), (dir) => stepBy(dir), onClear);
  const valueRef = useRef(value);
  valueRef.current = value;
  // Press and hold: one step at once, then repeated steps after a short pause
  const delay = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stop = useCallback(() => {
    if (delay.current) clearTimeout(delay.current);
    if (timer.current) clearInterval(timer.current);
    delay.current = null;
    timer.current = null;
  }, []);
  useEffect(() => stop, [stop]);
  const clamp = (v: number) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, v));
  const stepBy = (dir: 1 | -1) => {
    if (dir > 0 && onStepUp) return onStepUp();
    if (dir < 0 && onStepDown) return onStepDown();
    const cur = valueRef.current || 0;
    // step to the next multiple of `step`
    const next = dir > 0 ? Math.floor(cur / step + 1e-6) * step + step : Math.ceil(cur / step - 1e-6) * step - step;
    const v = clamp(Math.round(next * 1e6) / 1e6);
    valueRef.current = v;
    onChange(v);
  };
  const press = (dir: 1 | -1) => (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // no active pointer (e.g. a synthetic event); repeat still stops on pointer up
    }
    stop();
    stepBy(dir);
    delay.current = setTimeout(() => {
      timer.current = setInterval(() => stepBy(dir), 60);
    }, 300);
  };
  return (
    <div title={title}>
      {label && <label className={small ? 'sublabel' : 'label'}>{label}</label>}
      {disabled && disabledText !== undefined ? (
        <input type="text" value={disabledText} readOnly disabled className="control tabular-nums" />
      ) : (
        <div className="relative">
          <input type="text" inputMode="decimal" {...field} disabled={disabled} placeholder={placeholder} className="control tabular-nums pr-6 placeholder:text-slate-400" />
          {!disabled && (
            <div className="spin">
              <button type="button" tabIndex={-1} className="spin-btn" title="Increase (click or hold)" onPointerDown={press(1)} onPointerUp={stop} onPointerCancel={stop}>
                <ChevronUp size={11} strokeWidth={2.5} />
              </button>
              <button type="button" tabIndex={-1} className="spin-btn" title="Decrease (click or hold)" onPointerDown={press(-1)} onPointerUp={stop} onPointerCancel={stop}>
                <ChevronDown size={11} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      )}
      {hint && <p className="hint">{hint}</p>}
    </div>
  );
};

export const SelectField: React.FC<{
  label?: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
  hint?: React.ReactNode;
}> = ({ label, value, onChange, options, disabled, hint }) => (
  <div>
    {label && <label className="label">{label}</label>}
    <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} className="control">
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {hint && <p className="hint">{hint}</p>}
  </div>
);

export const Check: React.FC<{ checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode; disabled?: boolean; title?: string }> = ({
  checked,
  onChange,
  children,
  disabled,
  title
}) => (
  <label className={`check ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} title={title}>
    <input type="checkbox" className="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
    <span>{children}</span>
  </label>
);

export function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div className="segmented" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((o) => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)} className={`segment ${value === o.value ? 'segment-active' : ''}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
