# House Style — Engineering Apps

Baseplate2D is the reference implementation of the look and feel shared by all engineering apps (Baseplate2D,
Bridge1D, Pile1D, Barrier5100, Boltcheck and future apps). When this guide and an app disagree, this guide wins
unless the app records a deliberate deviation in its own `AGENTS.md`.

The guide has two tiers:

- **Fixed** — applies to every app without exception.
- **Adaptable** — the default pattern; an app may vary it where its content requires, keeping the fixed rules.

If an app needs something this guide does not cover, extend an existing pattern rather than inventing a one-off
style, and add the new pattern here.

This file is the master copy of the guide; it lives in the `engineering-ui` package with the code that
implements it:

| Rule area | Package code |
| --- | --- |
| All component classes (panels, labels, controls, tables, layout) | `theme.css` |
| Form controls | `NumberField`, `SelectField`, `Check`, `Segmented`, `useNumberText` |
| Header | `AppHeader` |
| About and PDF Report pop-ups | `Modal` (variant `page` for About), `ReportDialog`, `CollapsePanel`, `Formula` |
| Results | `ResultsHeader`, `StatusChip`, `Banner`, `UtilValue`, `PassFail`, `Cols`, `Dash`, `pct` |
| Symbols in strings (`f_y`, `β_N^1.5`) | `RichText` |

Reference app: Baseplate2D (`angus-murray/baseplate2d`) — screenshots in its `docs/style/`,
PDF report in its `src/utils/report.ts`.

---

## 1. Stack (fixed)

- React + TypeScript + Vite, Tailwind CSS v4 (`@import "tailwindcss"` with an `@layer components` block).
- Icons: `lucide-react`, 14–16 px (`w-3.5 h-3.5` in chips and buttons, `w-4 h-4` in banners).
- Font: the Tailwind `font-sans` system stack. No web fonts. `font-serif` only for Greek letters (φ) and italic
  symbols inside results text.
- Package manager: bun (`bun.lock`).
- PDF reports: jsPDF with an embedded DejaVu Sans subset (for φ, ε, √, ≤).

## 2. Colour (fixed)

Slate neutrals with a single blue accent. Status colours are used only for status.

| Use | Colour |
| --- | --- |
| Page background | `bg-slate-100` |
| Panels, header, pop-ups | `bg-white`, `border-slate-200`, `shadow-2xs` |
| Titles | `text-slate-800` (900 for the app name) |
| Body text, table values | `text-slate-700` / `text-slate-800` |
| Labels | `text-slate-600` |
| Muted notes, units beside results | `text-slate-500` |
| Placeholder / not-applicable dash | `text-slate-400` |
| Accent (primary buttons, active segment, focus ring, checkboxes) | `blue-600` (hover `blue-700`), focus `ring-blue-500` |
| Pass / within limit | `emerald-100` background, `emerald-800` text, `emerald-200` border |
| At exactly 100 % | `amber-100` / `amber-800` |
| Warning (does not stop the analysis) | `amber-50` / `amber-200` / `amber-900` |
| Fail / error | `rose-100` / `rose-800` (banners `rose-50` / `rose-200`) |

## 3. Typography (fixed)

| Element | Style | Class |
| --- | --- | --- |
| App name (header) | 24 / 30 px black, tight tracking | `font-black text-2xl sm:text-3xl tracking-tight` |
| "Created by Angus Murray" | 12 / 14 px medium slate-500, **baseline aligned with the app name** (`flex items-baseline`) | |
| Panel title | 13 px bold slate-800, rule below | `.panel-title` |
| Sub-heading inside a panel or results | 13 px bold slate-800 | `.card-title` |
| Input label | **11 px medium slate-600** | `.label` (`.sublabel` is identical) |
| Checkbox text | 11 px medium slate-600 | `.check` |
| Input and select text | 12 px slate-900 | `.control` |
| Segmented buttons | 12 px medium | `.segment` |
| Table header | 11 px semibold slate-700 | `.rtable th` |
| Table cell | 12 px slate-800, tabular figures | `.rtable td` |
| Notes under tables, banner detail | 11 px | `text-[11px]` |

- Engineering symbols are italic with subscripts: `<i>f</i><sub>y</sub>`, `<i>L</i><sub>X</sub>`, `<i>f'</i><sub>c</sub>`,
  `<i>φN</i><sub>t</sub>`. Never write `fy`, `f_y` or `f'c` as plain text in the UI.
- Numbers in inputs and tables use `tabular-nums`.
- Title Case for panel titles, labels, buttons and table headers ("Bolt Layout", "Hole Diameter").
- Australian spelling (utilisation, modelled, centre).

## 4. Page layout (adaptable)

```
┌──────────────────────── header (sticky, white, bottom border) ────────────────────────┐
│ [logo] AppName  Created by Angus Murray                       ⓘ About   [PDF Report] │
└────────────────────────────────────────────────────────────────────────────────────────┘
┌─ inputs 340 px ─┐ ┌─ results (rest of width) ─────────────────────────────────────────┐
│ panel           │ │ viewer / chart (fits the screen with the summary panel below it)  │
│ panel           │ │ Results panel: title + overall status chip                        │
│ panel  (scrolls │ │   banners (errors, warnings)                                      │
│  on its own)    │ │   result tables                                                   │
└─────────────────┘ └────────────────────────────────────────────────────────────────────┘
```

- Content width `max-w-7xl mx-auto`, page padding `p-3`, gap between columns and panels `gap-3` / `space-y-3`.
- `.tab-grid`: one column on mobile; `lg:` 340 px input column plus the rest.
- `.input-column`: sticky below the header, scrolls on its own with `.scroll-thin`.
- The main graphic (3D viewer, elevation, chart) sits at the top of the results column. On a 1080p screen in a
  browser (a viewport of about 1920 × 950) the graphic and the top summary panel must both be visible without
  scrolling, with the app's default inputs. Baseplate2D uses
  `h-[560px] lg:h-[calc(100vh-350px)] lg:min-h-[420px] lg:max-h-[900px]`.
- Adaptable: the number of input panels, whether the results column has a 3D viewer, charts or tables only, and
  whether there are tabs. Apps without a graphic put the Results panel at the top.
- **Fill-the-window variant** (Bridge1D): when the results fit on one screen, add `.fill-window` to the page root
  (`lg:h-screen lg:overflow-hidden flex flex-col`, with `<main>` as `flex-1 flex flex-col lg:min-h-0`). The input
  column scrolls on its own and the results column fills the rest of the window height.
- **Charts that share a results panel** use `ChartFrame`: each takes the height left in the panel between a minimum
  and a maximum (Bridge1D: 150–250 px), so the panel fits the window; below the minimum the panel scrolls. Blocks in
  a results panel are separated by the panel's own spacing, not by horizontal rules, to save height.

## 5. Header (fixed)

- Sticky, `bg-white border-b border-slate-200 shadow-sm`, `py-3`, contents in `max-w-7xl`.
- Left: favicon logo (32–36 px), app name, "Created by Angus Murray" baseline aligned.
- Apps with several tabs show them as a row under the name (`AppHeader` `tabs`): icon plus label, active tab blue
  with a blue underline. The header is then compact (name row `py-2`, tab row directly below), 90 px in total.
- Right: **About** as a text button with an info icon (12/14 px medium slate-600, blue on hover), then
  **PDF Report** as a small solid blue button (`h-8 text-xs font-semibold bg-blue-600 rounded px-3`) with a file
  icon. Apps without a report omit that button only.

## 6. Panels (fixed)

- `.panel`: white, `p-3`, `rounded-lg`, `border-slate-200`, `shadow-2xs`, children spaced `space-y-2.5`.
- `.panel-title` at the top of every input panel.
- `.section` divides a panel into groups (top rule, same spacing); a group may have an `h3.card-title`.
- `.nested` indents options that depend on a checkbox above.
- **No grey hint or help text in the input panels.** Explanations (ranges, notes, caveats) go in a `title`
  tooltip on the control or the panel title, or in the About page.
- A **calculated value** shown in an input panel (a lane factor, a total) is a readout row, label left and value
  right (`.readout` / `.readout-value`), not hint text.

## 7. Form controls (fixed)

All from the package; do not hand-roll alternatives.

| Control | Rules |
| --- | --- |
| `NumberField` | Label above. Value left-aligned. **Up/down arrows inside the box on the right** (`.spin` / `.spin-btn`, lucide `ChevronUp`/`ChevronDown` 11 px) — click or press and hold to repeat; the keyboard arrow keys also step. **Never −/+ buttons.** Free typing; committed and clamped on blur or Enter; Escape reverts. Custom stepping (standard sizes) through `onStepUp` / `onStepDown`; fixed decimals through `decimals`. A field that may be left empty (a default worked out by the app) uses `onClear` with `placeholder="Auto"`. Negative values show a true minus sign (−). |
| Not-applicable input | Disabled with `disabledText="–"` (an **en-dash**), no arrows. |
| Read-only derived value | `.control bg-slate-50 text-slate-700`, `readOnly` (e.g. *f*<sub>y</sub>, *f*<sub>u</sub> from a grade). |
| `SelectField` | Native `<select class="control">` with the shared slate chevron. Option text Title Case and short enough to fit the box. |
| `Check` | Checkbox 14 px, blue accent, text 11 px medium slate-600. |
| `Segmented` | 2–4 mutually exclusive options that change the panel content (Shape, Bolt Layout). Active segment solid blue. |
| Buttons | `.btn` (secondary) and `.btn-primary` (blue), height 32 px, 12 px text. |

- Control height 32 px (`h-8`), radius `rounded-lg`, border slate-300, focus ring blue-500.
- Fields sit in a two-column grid (`grid grid-cols-2 gap-2`) when they pair naturally (Width/Height, X/Y,
  a mode dropdown with its value). A long value takes the full width.
- Labels: `Name symbol (unit)`, e.g. "Thickness *t*<sub>bp</sub> (mm)", "Modulus (MPa/mm)". Units in
  parentheses, SI with kN, kNm, MPa, mm.
- A mode dropdown that decides a value goes on the left with the value box on the right (e.g. Bedding:
  From Grout/Concrete / Rigid / Custom). A value that is calculated is shown disabled; Custom makes it editable.
- Inputs are locked (`fieldset disabled`, 60 % opacity) while an analysis runs.

## 8. Results (fixed rules, adaptable content)

- **Results panel title row** (`ResultsHeader`, or `.panel-header` for a custom row): "Results" (`text-[13px] font-bold`) on the left, overall status chip on the right:
  - Not solved: slate chip "Not Solved — click Solve to run the analysis" (or "Solving…").
  - Pass: emerald chip with check icon, "… PASS (Max Util: 87.3%)".
  - Fail: rose chip with warning icon, "… FAIL (Bolt 112.4%, Weld 104.0%)".
  - Detailing warnings: an amber chip "3 detailing warnings" before the pass/fail chip.
- **Banners** under the title: rose for errors (non-convergence, solver error, clashes), amber for warnings.
  Bold title with icon, 11 px list below.
- **Only physical impossibilities block the analysis.** Detailing breaches (edge distance, spacing, minimum
  sizes) are warnings; the analysis still runs.
- **Tables** (`.rtable`): fixed layout, cells centred horizontally and vertically, grouped headers
  (`colSpan` with `border-x`), slate-50 header row. Column widths set per table with `<Cols w={[…]} />` so text
  does not wrap needlessly. Wide tables scroll horizontally (`overflow-x-auto`, `min-w-[…]`).
- **Utilisation**: percentage to one decimal ("87.3%", "> 999%" above 9.99). The governing value in each row is a
  coloured pill (emerald < 100 %, amber = 100 %, rose > 100 %); the others are plain slate-600.
- **Status** column: "PASS" emerald-700 / "FAIL" rose-700, semibold.
- Values that do not apply: an em-dash `—` in slate-400 in tables (en-dash `–` inside input boxes).
- Capacities summarised beside a table heading in 11 px slate-500 with italic symbols
  ("*φN*<sub>tf</sub> = 141.2 kN").
- Every clause reference uses the standard's current numbering ("AS 4100 Cl. 9.2.2").

## 9. Graphics (adaptable)

- Background `bg-slate-50`. Tool buttons stacked in a white floating toolbar (`rounded-lg`, slate border,
  `shadow-2xs`, 12 px labels, active item blue).
- A **Solve** button (where the app has an explicit analysis step): blue "Solve" → spinner "Cancel" (rose
  outline) while running → emerald "Solved" when up to date; grey and disabled with a tooltip when blocked.
- Colour legends: white card, 11 px text, tabular figures.

## 10. About pop-up (fixed)

- Opens from the header as a modal (`max-w-5xl`, slate-100 backdrop panel, × and Escape and outside click close).
- Collapsible panels (closed by default), 13 px bold titles with a chevron, 12 px body slate-700, relaxed
  leading.
- Formulas in a centred slate-50 box; tables use `.rtable` with per-table widths.
- Formal technical wording consistent with what the solver does. **Every significant assumption is stated
  here.** A references list closes the page.
- Third-party software is named only in the references list, never elsewhere in the UI.

## 11. PDF report (fixed)

- Header button "PDF Report" opens a small dialog (project name, number, structure, location, designer, date —
  all optional; blank fields are omitted) with Cancel / Generate PDF.
- A4 portrait, jsPDF, DejaVu Sans. Ink slate-800, body slate-700, muted slate-500, table header fill slate-100.
- Layout as Barrier5100: title block, numbered sections with ruled headings, shaded table header rows, a boxed
  overall result, a figure of the main graphic, running header and page numbers.

## 12. Wording (fixed)

- Formal, concise, third person in documentation. Australian spelling.
- No grey explanatory text in the input column; no marketing tone.
- Symbols: italic with subscripts in the UI; `x_y` in strings passed to `RichText` and the report renderer.
- Not-applicable: en-dash in inputs, em-dash in tables.

## 13. Analytics (fixed)

Every app loads Vercel Web Analytics with these lines just before `</head>` in `index.html`:

```html
<!-- Vercel Web Analytics -->
<script defer src="/_vercel/insights/script.js"></script>
```

Web Analytics must also be enabled for the project in the Vercel dashboard (Project → Analytics → Enable); until
it is, the script is not served and nothing is recorded.

## 14. Checklist for a new or migrated app

- [ ] Header matches §5, including the baseline-aligned "Created by".
- [ ] `engineering-ui` installed at the current tag; `theme.css` imported after Tailwind; no local copies of its classes.
- [ ] Form controls, header, pop-ups and results components imported from the package.
- [ ] No hint text in input panels.
- [ ] Results panel with status chip, banners, `.rtable` tables, utilisation pills.
- [ ] Graphic plus summary visible without scrolling at 1920 × 1080.
- [ ] About modal states every significant assumption.
- [ ] PDF report per §11 (if the app reports).
- [ ] Vercel Web Analytics script in `index.html` (§13), and Web Analytics enabled in the Vercel dashboard.
- [ ] Deviations recorded in the app's `AGENTS.md`.
