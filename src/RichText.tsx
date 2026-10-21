import React from 'react';

/**
 * Renders plain-text engineering notation with real subscripts / superscripts:
 *   "M_Rk,s" → <i>M</i><sub>Rk,s</sub>,  "β_N^1.5" → <i>β</i><sub>N</sub><sup>1.5</sup>,  "0.5t_bp" → 0.5<i>t</i><sub>bp</sub>.
 * The variable letter before "_" is italic, its subscript upright. "^x" becomes a superscript.
 */
const TOKEN = /([A-Za-zα-ωΑ-Ω][*']?)_([A-Za-z0-9,.]+)|\^([0-9.]+)/g;

export const RichText: React.FC<{ text: string }> = ({ text }) => {
  const out: React.ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    if (m[3] !== undefined) out.push(<sup key={k++}>{m[3]}</sup>);
    else
      out.push(
        <React.Fragment key={k++}>
          <i>{m[1]}</i>
          <sub>{m[2]}</sub>
        </React.Fragment>
      );
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
};
