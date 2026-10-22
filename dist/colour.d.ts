/**
 * Colour helpers for drawings (SVG, canvas, 3D) that use their own colours rather than Tailwind classes.
 */
/**
 * A dark version of a colour for the dark theme, keeping its hue: pale fills (soil layers, zones, highlighted
 * bands) become a muted dark tint that sits just above the panel instead of a bright block.
 * `lightness` is the OKLCH lightness of the result (0–1); returns the input unchanged if it cannot be parsed.
 */
export declare function darkTint(colour: string, lightness?: number): string;
/** Picks the light or dark value for the current theme (from useTheme). */
export declare const themed: <T>(theme: "light" | "dark", light: T, dark: T) => T;
