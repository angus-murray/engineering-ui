# engineering-ui

Shared look and feel for the engineering apps (Baseplate2D, Bridge1D, Pile1D, Barrier5100, Boltcheck, …): the
Tailwind theme, form controls, header, pop-ups and results components. The rules they implement are in
[STYLE.md](STYLE.md); Baseplate2D is the reference app.

## Use in an app

Requirements: React 18+, Tailwind CSS v4, `lucide-react`.

```bash
bun add github:angus-murray/engineering-ui#<tag or commit>
```

Pin to a release tag (`#v1.0.0`) or a full commit hash; both are fixed, so the app only changes when its
`package.json` is updated. Baseplate2D pins version 1.0.0 by its commit,
`48f9078b2c52a30b3d2df8f93ba78553df7ef7f0`.

Main CSS file (e.g. `src/index.css`):

```css
@import "tailwindcss";
@import "engineering-ui/theme.css";
```

Components:

```tsx
import { AppHeader, Modal, ReportDialog, NumberField, SelectField, Check, Segmented, ResultsHeader, StatusChip, Banner, UtilValue, Cols } from 'engineering-ui';

<AppHeader name="Pile1D" onAbout={() => setShowAbout(true)} onReport={() => setShowReport(true)} />

<div className="tab-grid">
  <fieldset className="input-column scroll-thin">
    <div className="panel">
      <h2 className="panel-title">Pile</h2>
      <div className="grid grid-cols-2 gap-2">
        <NumberField label={<>Diameter <i>D</i> (mm)</>} value={d} onChange={setD} min={100} step={50} />
        <NumberField label="Strain Limit (%)" value={0} onChange={() => {}} disabled disabledText="–" />
      </div>
    </div>
  </fieldset>
  <div className="results-column">…</div>
</div>
```

## Updating an app to the latest version

Ask for it in a session on that app ("update to the latest engineering-ui"). The steps are:

1. Point `package.json` at the latest commit or tag (`npm install github:angus-murray/engineering-ui#<commit>` or
   `bun add …`; for bun, remove and re-add the package if the lock file keeps the old commit) and update every lock
   file the app has.
2. Check the installed version (`node_modules/engineering-ui/package.json`), run the app's typecheck, build and
   tests, and compare it in the browser with the version before.
3. Commit and push to the app's working branch; merging to `main` puts it live.

The changelog lists what each version changes.

## Changing the style

1. Change it here (code and `STYLE.md` together), run `bun run build`, and commit `dist/` with the source.
2. Bump `version` in `package.json` and add a `CHANGELOG.md` entry. Tag the commit (`git tag v1.1.0 && git push
   --tags`, or create a release named `v1.1.0` on GitHub).
3. In each app, update the tag or commit in `package.json` (`bun add github:angus-murray/engineering-ui#v1.1.0`)
   when ready, then check the app in the browser.

Apps stay on the version they name until they are updated, so a change never reaches a live app unannounced.
Breaking changes (renamed props or classes) take a new major version.

`dist/` is committed because apps install the package straight from GitHub without a build step.
