# Changelog

## 1.3.0
- `NumberField`: `onClear` and `placeholder` for fields that may be left empty (e.g. "Auto"); `value` may be
  undefined. Negative values are shown with a minus sign (−), and −, – or - are accepted when typing.
- Press and hold on the arrows: one step at once, then repeated steps every 60 ms after a 300 ms pause.
- `theme.css`: `.panel-header` (title row of a results panel).

## 1.2.0
- `ChartFrame` and `useElementSize`: a chart that takes the height available in a flex column (between
  `minHeight` and `maxHeight`) and passes its size to the drawing.
- `AppHeader` with tabs is more compact (90 px instead of 106 px); the header without tabs is unchanged.

## 1.1.0
- `NumberField`: `decimals` (fixed decimals shown when not editing); the up / down arrow keys step the value.
- `useNumberText`: optional `format` and `onStep` arguments.
- `AppHeader`: optional `tabs` / `activeTab` / `onTab` for apps with several tabs.
- `theme.css`: `.fill-window` layout variant (inputs scroll on their own, results fill the window height);
  `.readout` / `.readout-value` for calculated values shown in an input panel.

## 1.0.0
- First release, taken from Baseplate2d: `theme.css`; `NumberField`, `SelectField`, `Check`, `Segmented`,
  `useNumberText`, `RichText`; `AppHeader`; `Modal`, `ReportDialog`, `today`; `ResultsHeader`, `StatusChip`,
  `Banner`, `UtilValue`, `PassFail`, `Cols`, `Dash`, `pct`, `CollapsePanel`, `Formula`; `STYLE.md`.
