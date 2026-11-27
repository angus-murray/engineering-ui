const NBSP = ' ';
const NBHY = '‑';
const UNITS = 'mm²|mm³|mm⁴|mm|cm|km|m²|m³|m|MPa|GPa|kPa|Pa|kNm|kN|N|kg|t|s|min|h|Hz|days?|months?|years?|hours?';
const REFS = 'AS/NZS|AS|Table|Tables|Cl\\.|Clause|Clauses|Figure|Section|Appendix|Paragraph|Eq\\.|Category|Grade';
const MATHY = /[\d_^′α-ωΑ-Ω*]/;

const REF_RE = new RegExp(`\\b(${REFS}) (?=[A-Z]?\\d)`, 'g');
const UNIT_RE = new RegExp(`(?<![\\w.])(\\d[\\d,.]*) (${UNITS})(?![\\w])`, 'g');
const HYPHEN_RE = new RegExp(`(?<![\\w.])(\\d[\\d,.]*)-(${UNITS})(?![\\w])`, 'g');
const OP_RE = /(\S+) (=|<|>|≤|≥|≠|≈|×|\+|−|\/) (?=(\S+))/g;

export function nb(text) {
  return text
    .replace(REF_RE, `$1${NBSP}`)
    .replace(UNIT_RE, `$1${NBSP}$2`)
    .replace(/(\d) %/g, '$1%')
    .replace(/(\d) °/g, '$1°')
    .replace(HYPHEN_RE, `$1${NBHY}$2`)
    .replace(OP_RE, (m, a, op, b) => (MATHY.test(a) || MATHY.test(b) ? `${a}${NBSP}${op}${NBSP}` : m));
}
