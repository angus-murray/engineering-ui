import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNumberText } from './useNumberText.js';
/**
 * Form controls: label above, up / down arrows inside the box (press and hold to repeat; the arrow keys also step),
 * free typing committed on blur / Enter. An input that does not apply is disabled with disabledText="–" (an en-dash).
 */
export const NumberField = ({ label, value, onChange, min, max, step = 1, onStepUp, onStepDown, disabled, disabledText, decimals, hint, small, title }) => {
    const field = useNumberText(value, onChange, min, max, decimals === undefined ? String : (v) => v.toFixed(decimals), (dir) => stepBy(dir));
    const valueRef = useRef(value);
    valueRef.current = value;
    const timer = useRef(null);
    const stop = useCallback(() => {
        if (timer.current)
            clearInterval(timer.current);
        timer.current = null;
    }, []);
    useEffect(() => stop, [stop]);
    const clamp = (v) => Math.min(max ?? Infinity, Math.max(min ?? -Infinity, v));
    const stepBy = (dir) => {
        if (dir > 0 && onStepUp)
            return onStepUp();
        if (dir < 0 && onStepDown)
            return onStepDown();
        const cur = valueRef.current || 0;
        // step to the next multiple of `step`
        const next = dir > 0 ? Math.floor(cur / step + 1e-6) * step + step : Math.ceil(cur / step - 1e-6) * step - step;
        const v = clamp(Math.round(next * 1e6) / 1e6);
        valueRef.current = v;
        onChange(v);
    };
    const press = (dir) => (e) => {
        if (disabled)
            return;
        e.preventDefault();
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        }
        catch {
            // no active pointer (e.g. a synthetic event); repeat still stops on pointer up
        }
        stop();
        stepBy(dir);
        timer.current = setInterval(() => stepBy(dir), 120);
    };
    return (_jsxs("div", { title: title, children: [label && _jsx("label", { className: small ? 'sublabel' : 'label', children: label }), disabled && disabledText !== undefined ? (_jsx("input", { type: "text", value: disabledText, readOnly: true, disabled: true, className: "control tabular-nums" })) : (_jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", inputMode: "decimal", ...field, disabled: disabled, className: "control tabular-nums pr-6" }), !disabled && (_jsxs("div", { className: "spin", children: [_jsx("button", { type: "button", tabIndex: -1, className: "spin-btn", title: "Increase (click or hold)", onPointerDown: press(1), onPointerUp: stop, onPointerCancel: stop, children: _jsx(ChevronUp, { size: 11, strokeWidth: 2.5 }) }), _jsx("button", { type: "button", tabIndex: -1, className: "spin-btn", title: "Decrease (click or hold)", onPointerDown: press(-1), onPointerUp: stop, onPointerCancel: stop, children: _jsx(ChevronDown, { size: 11, strokeWidth: 2.5 }) })] }))] })), hint && _jsx("p", { className: "hint", children: hint })] }));
};
export const SelectField = ({ label, value, onChange, options, disabled, hint }) => (_jsxs("div", { children: [label && _jsx("label", { className: "label", children: label }), _jsx("select", { value: value, onChange: (e) => onChange(e.target.value), disabled: disabled, className: "control", children: options.map((o) => (_jsx("option", { value: o.value, children: o.label }, o.value))) }), hint && _jsx("p", { className: "hint", children: hint })] }));
export const Check = ({ checked, onChange, children, disabled, title }) => (_jsxs("label", { className: `check ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`, title: title, children: [_jsx("input", { type: "checkbox", className: "checkbox", checked: checked, disabled: disabled, onChange: (e) => onChange(e.target.checked) }), _jsx("span", { children: children })] }));
export function Segmented({ value, onChange, options }) {
    return (_jsx("div", { className: "segmented", style: { gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }, children: options.map((o) => (_jsx("button", { type: "button", onClick: () => onChange(o.value), className: `segment ${value === o.value ? 'segment-active' : ''}`, children: o.label }, o.value))) }));
}
