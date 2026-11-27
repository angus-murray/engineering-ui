/**
 * Non-breaking spaces and hyphens for mathematical expressions, units and standard references (STYLE.md §12).
 * Ordinary prose is left alone: a space is made non-breaking only where the line must not break inside the expression.
 *
 *   nb('f′b = 42 MPa')        → 'f′b' + NBSP + '=' + NBSP + '42' + NBSP + 'MPa'
 *   nb('a 150-mm member')     → '150' + U+2011 + 'mm'
 *   nb('see AS 1720.1, Table 2.1') → NBSP after 'AS' and after 'Table'
 *   nb('15 %')                → '15%'   (percent and degree take no space)
 */
const NBSP = ' ';
const NBHY = '‑';
const UNITS = 'mm²|mm³|mm⁴|mm|cm|km|m²|m³|m|MPa|GPa|kPa|Pa|kNm|kN|N|kg|t|s|min|h|Hz|days?|months?|years?|hours?';
const REFS = 'AS/NZS|AS|Table|Tables|Cl\\.|Clause|Clauses|Figure|Section|Appendix|Paragraph|Eq\\.|Category|Grade';
const MATHY = /[\d_^′α-ωΑ-Ω*]/;

const REF_RE = new RegExp(`\\b(${REFS}) (?=[A-Z]?\\d)`, 'g');
const UNIT_RE = new RegExp(`(?<![\\w.])(\\d[\\d,.]*) (${UNITS})(?![\\w])`, 'g');
const HYPHEN_RE = new RegExp(`(?<![\\w.])(\\d[\\d,.]*)-(${UNITS})(?![\\w])`, 'g');
const OP_RE = /(\S+) (=|<|>|≤|≥|≠|≈|×|\+|−|\/) (?=(\S+))/g;

export function nb(text: string): string {
  return text
    .replace(REF_RE, `$1${NBSP}`)
    .replace(UNIT_RE, `$1${NBSP}$2`)
    .replace(/(\d) %/g, '$1%')
    .replace(/(\d) °/g, '$1°')
    .replace(HYPHEN_RE, `$1${NBHY}$2`)
    .replace(OP_RE, (m, a: string, op: string, b: string) => (MATHY.test(a) || MATHY.test(b) ? `${a}${NBSP}${op}${NBSP}` : m));
}
