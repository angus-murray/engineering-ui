/**
 * Colour helpers for drawings (SVG, canvas, 3D) that use their own colours rather than Tailwind classes.
 */
const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
/** Parses #rgb, #rrggbb, rgb(...) or hsl(...) into sRGB components 0–1; null if not recognised. */
function parse(colour) {
    const s = colour.trim().toLowerCase();
    let m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
    if (m) {
        const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
        return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
    }
    m = s.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);
    if (m)
        return [+m[1] / 255, +m[2] / 255, +m[3] / 255];
    m = s.match(/^hsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%/);
    if (m) {
        const h = +m[1] / 360, sat = +m[2] / 100, l = +m[3] / 100;
        const f = (n) => {
            const k = (n + h * 12) % 12;
            return l - sat * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        };
        return [f(0), f(8), f(4)];
    }
    return null;
}
function toOklch([r, g, b]) {
    const [lr, lg, lb] = [toLinear(r), toLinear(g), toLinear(b)];
    const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return [L, Math.hypot(A, B), Math.atan2(B, A)];
}
function fromOklch(L, C, H) {
    const A = C * Math.cos(H), B = C * Math.sin(H);
    const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
    const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
    const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
    const rgb = [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
    ];
    return '#' + rgb.map((c) => Math.round(Math.min(1, Math.max(0, toGamma(c))) * 255).toString(16).padStart(2, '0')).join('');
}
/**
 * A dark version of a colour for the dark theme, keeping its hue: pale fills (soil layers, zones, highlighted
 * bands) become a muted dark tint that sits just above the panel instead of a bright block.
 * `lightness` is the OKLCH lightness of the result (0–1); returns the input unchanged if it cannot be parsed.
 */
export function darkTint(colour, lightness = 0.3) {
    const rgb = parse(colour);
    if (!rgb)
        return colour;
    const [, c, h] = toOklch(rgb);
    return fromOklch(lightness, Math.min(0.08, Math.max(0.03, c * 3)), h);
}
/** Picks the light or dark value for the current theme (from useTheme). */
export const themed = (theme, light, dark) => (theme === 'dark' ? dark : light);
