import React, { useEffect, useState } from 'react';

/**
 * Pop-up over a dimmed page. Escape, the × button or a click outside closes it.
 * variant 'page' (About): wide, slate-100 background holding panels. variant 'dialog': narrow, white.
 */
export const Modal: React.FC<{
  title: string;
  onClose: () => void;
  variant?: 'page' | 'dialog';
  children: React.ReactNode;
}> = ({ title, onClose, variant = 'dialog', children }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const box =
    variant === 'page'
      ? 'max-w-5xl bg-slate-100 rounded-lg border border-slate-200 shadow-xl p-3'
      : 'max-w-[520px] bg-white rounded-lg border border-slate-200 shadow-xl p-4';
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 dark:bg-black/60 p-3 sm:p-6 overflow-y-auto"
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`relative w-full my-auto ${box}`}>
        <div className={`flex items-center justify-between pb-2 ${variant === 'page' ? 'px-1' : ''}`}>
          <h2 className="text-[13px] font-bold text-slate-800">{title}</h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 text-lg leading-none px-1" aria-label="Close">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

/**
 * PDF report dialog: optional project details (blank fields are left out of the report) in two columns, then Cancel / Generate PDF.
 * onGenerate throws (or rejects) to show an error; a returned string is shown as a message instead of closing.
 */
export function ReportDialog<T extends object>({
  fields,
  info,
  setInfo,
  onGenerate,
  onClose
}: {
  /** [key of info, label] for each field, in display order. */
  fields: readonly (readonly [keyof NoInfer<T> & string, string])[];
  info: T;
  setInfo: (info: NoInfer<T>) => void;
  onGenerate: () => Promise<string | void> | string | void;
  onClose: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const generate = async () => {
    setBusy(true);
    setErr('');
    try {
      const msg = await onGenerate();
      if (msg) setErr(msg);
      else onClose();
    } catch (e) {
      console.error(e);
      setErr('The report could not be generated.');
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal title="PDF Report" onClose={onClose}>
      <p className="text-[11px] text-slate-500 mb-3">All fields are optional. Blank fields are left out of the report.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(([k, label]) => (
          <div key={k}>
            <label className="label">{label}</label>
            <input type="text" value={String(info[k] ?? '')} onChange={(e) => setInfo({ ...info, [k]: e.target.value })} className="control" />
          </div>
        ))}
      </div>
      {err && <div className="mt-3 bg-rose-50 border border-rose-200 rounded p-2.5 text-[11px] text-rose-800">{err}</div>}
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={onClose} className="h-8 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded px-3">
          Cancel
        </button>
        <button type="button" onClick={generate} disabled={busy} className="h-8 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded px-3">
          {busy ? 'Generating…' : 'Generate PDF'}
        </button>
      </div>
    </Modal>
  );
}

/** Today as dd/mm/yyyy, the default report date. */
export const today = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
};
