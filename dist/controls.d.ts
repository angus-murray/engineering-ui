import React from 'react';
/**
 * Form controls: label above, up / down arrows inside the box (press and hold to repeat), free typing committed on
 * blur / Enter. An input that does not apply is disabled with disabledText="–" (an en-dash).
 */
export declare const NumberField: React.FC<{
    label?: React.ReactNode;
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Custom stepping (e.g. through standard sizes); defaults to ± step. */
    /** Text shown instead of the value while disabled (e.g. an en-dash for an input that does not apply). */
    disabledText?: string;
    onStepUp?: () => void;
    onStepDown?: () => void;
    disabled?: boolean;
    hint?: React.ReactNode;
    small?: boolean;
    title?: string;
}>;
export declare const SelectField: React.FC<{
    label?: React.ReactNode;
    value: string;
    onChange: (v: string) => void;
    options: {
        value: string;
        label: string;
    }[];
    disabled?: boolean;
    hint?: React.ReactNode;
}>;
export declare const Check: React.FC<{
    checked: boolean;
    onChange: (v: boolean) => void;
    children: React.ReactNode;
    disabled?: boolean;
    title?: string;
}>;
export declare function Segmented<T extends string>({ value, onChange, options }: {
    value: T;
    onChange: (v: T) => void;
    options: {
        value: T;
        label: string;
    }[];
}): React.JSX.Element;
