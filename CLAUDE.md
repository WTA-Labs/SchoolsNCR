# CLAUDE.md — Schools Catchment Dashboard

> Auto-read by Claude Code at session start. Keep this file updated as the project evolves.

---

## Project Overview

**File:** `SchoolsCatch.html` (single-file dashboard, ~1200+ lines)
**Stack:** MapLibre GL JS v4.7.1 · Turf.js v6 · Vanilla JS (IIFE) · CSS custom properties
**Basemap:** OpenFreeMap Positron (`https://tiles.openfreemap.org/styles/positron`) — muted white via CSS filter
**Dev server:** Python `http.server` on port 8765 (configured in `.claude/launch.json`)
**Access:** `http://localhost:8765/SchoolsCatch.html`

---

## File Structure

```
qgis2web-01-260526/
├── SchoolsCatch.html          ← Main dashboard (edit this)
├── CLAUDE.md                  ← This file
├── layers/                    ← GeoJSON data as JS variable declarations
│   ├── Water_0.js             → var json_Water_0
│   ├── NCR_1.js               → var json_NCR_1
│   ├── PrimaryRoadsMM_2.js    → var json_PrimaryRoadsMM_2
│   ├── CitiesMMcopycopy_3.js  → var json_CitiesMMcopycopy_3
│   ├── CitiesMM_4.js          → var json_CitiesMM_4
│   ├── SAWalk_0.js            → var json_SAWalk_0        (4.9 MB — walkability catchments)
│   └── 01SchoolsFuzzyAll102Bcopy_1.js → var json_01SchoolsFuzzyAll102Bcopy_1  (2.6 MB)
├── styles/legend/             ← 20×20 px PNG swatches for left panel & legend bar
│   ├── Water_0.png
│   ├── NCR_1.png
│   ├── PrimaryRoadsMM_2.png
│   ├── CitiesMM_4.png
│   ├── SAWalk_0.png
│   └── 01SchoolsFuzzyAll102Bcopy_1.png
├── external-assets/
│   └── name-logo_1.png        ← WTA Labs logo (home screen + corner logo)
└── temp/                      ← Raw qgis2web exports (reference only, not served)
```

---

## Design Tokens (`:root`)

```css
--y:          #FFCF00          /* WTA Labs yellow — accent, buttons, selected state */
--y-d:        #e0b800          /* Darker yellow for hover */
--panel:      rgba(237,235,235,0.82)
--txt:        #000000
--txt-mid:    rgb(89,89,89)
--bdr:        rgba(0,0,0,0.08)
--shdw:       0 8px 32px rgba(0,0,0,0.14)
--r:          12px
--ease:       cubic-bezier(0.645,0.045,0.355,1)
--f-display:  'Helvetica Neue', Helvetica, Arial, sans-serif  /* weight 900 for titles */
--f-body:     'Inter', 'Helvetica Neue', sans-serif
--f-head:     'Inter', 'Helvetica Neue', sans-serif
--f-mono:     'JetBrains Mono', 'Courier New', monospace
--glass-bg:   rgba(240,238,238,0.48)
--glass-bdr:  rgba(255,255,255,0.68)
--glass-blur: blur(26px) saturate(2)
--lp-w:       252px
--rp-w:       280px
```

---

## Layout Architecture

All panels are **`position: absolute` floating windows** over the map — nothing occupies layout flow.

| Element | Position | Z-index | Notes |
|---|---|---|---|
| `#app` | `position: fixed; inset: 0` | — | Root container, no flex |
| `#mw` | `position: absolute; inset: 0` | — | Map wrapper |
| `#map` | fills `#mw` | — | MapLibre canvas |
| `#lp` | `absolute; top:108px; left:14px` | 200 | Left panel, glassmorphic |
| `#rp` | `absolute; top:57px; right:14px` | 200 | Right panel, glassmorphic |
| `#tnav` | `fixed; top:14px; left:50%` | 500 | Top pill nav |
| `#map-title` | `absolute; top:14px; left:14px` | 300 | Floating title (no box) |
| `#legend` | `absolute; bottom:40px; left:50%` | 300 | Bottom centre legend bar |
| `#corner-logo` | `absolute; bottom:30px; left:14px` | 300 | WTA Labs logo → wtalabs.ph |
| `#coords` | `absolute; bottom:10px; right:14px` | 400 | Cursor coordinates (muted) |
| `#data-src` | `absolute; bottom:10px; left:14px` | 400 | Attribution micro-label (muted) |
| `#hover-tip` | `fixed` (JS-positioned) | 600 | Hover tooltip for analysis layers |
| `#home` | `fixed; inset:0` | 900 | Home/splash screen |

---

## MapLibre Layer Catalogue

All layers defined in `addLocalLayers()`. Layer IDs follow `<name>-<type>` convention.

### Base Layers
| Layer ID | Source | Type | Toggle ID |
|---|---|---|---|
| `water-fill` | `water` | fill | `lp-water` |
| `ncr-line` | `ncr` | line | `lp-ncr` |
| `roads-line` | `roads` | line | `lp-roads` |
| `roads-hit` | `roads` | line (transparent, 24px hit) | — |
| `citiescopy-fill/line` | `citiescopy` | fill+line | `lp-citiescopy` |
| `cities-fill/line` | `cities` | fill+line | `lp-cities` |

### Analysis Layers (102A group from qgis2web)
| Layer ID | Source | Type | Symbology | Toggle ID |
|---|---|---|---|---|
| `sawalk-fill` | `sawalk` | fill | tan `rgba(222,207,163,0.6)` | `lp-sawalk` |
| `sawalk-line` | `sawalk` | line | brown `rgba(148,118,31,0.6)` w=0.228 | `lp-sawalk` |
| `schools102b-fill` | `schools102b` | fill | yellow `rgba(228,220,59,1.0)` | `lp-schools102b` |
| `schools102b-line` | `schools102b` | line | dark-yellow `rgba(119,101,56,1.0)` w=0.988 | `lp-schools102b` |

### Interactive Layers (hover + click)
All layers in `INTERACTIVE_LAYERS` array get:
- Hover → `feature-state { hover: true }` → fill opacity change
- Click → `flyTo(centroid)` + right panel populated

Analysis layers (`sawalk-fill`, `schools102b-fill`) additionally show `#hover-tip` tooltip with curated fields from `HOVER_FIELDS` config.

---

## Key JS Patterns

### IIFE Scope
All JS is inside `(function () { 'use strict'; ... })()`. Variables like `map`, `inMapMode`, `selectedId` are **not accessible from browser console eval**. Test via DOM state checks instead.

### Geography Constants
```js
const HOME_CENTER = [121.0, 12.5];   // Philippines overview
const HOME_ZOOM   = 5;
const NCR_CENTER  = [121.02, 14.57]; // Metro Manila
const NCR_ZOOM    = 11;
const RETREAT_ZOOM = 6;              // Zoom-out → return to home
```

### Panel Animation
Panels use `.in` class toggle with CSS transitions:
```js
element.classList.add('in');    // show (opacity 1, transform none)
element.classList.remove('in'); // hide (opacity 0, translateY offset)
```
Stagger order **in**: `map-title → lp → corner-logo → rp (+120ms) → tnav (+250ms) → legend (+420ms)`
Stagger order **out**: `legend → tnav → corner-logo → rp → lp → map-title` (55ms apart)

### Layer Toggles
Defined in `LAYER_TOGGLES` array — maps checkbox IDs to MapLibre layer IDs. `wireToggles()` wires them. `syncCheckboxes()` syncs state after view switches.

### View Presets
Three views (`base`, `boundaries`, `roads`) defined in `applyView()`. Controls which layers are visible. **Important:** when adding new layers, decide if they should appear in all views or just `base`.

### Hover Tooltip Fields
`HOVER_FIELDS` object maps layer ID → array of `{ key, label }` pairs (derived from qgis2web `fieldLabels: 'header label - visible with data'`). Only non-null values are shown.

---

## Basemap Style
```css
.maplibregl-canvas { filter: saturate(0.12) brightness(1.09); }
```
Renders the Positron basemap as near-greyscale white. Do not change without visual check.

---

## Home Screen
- Logo: `external-assets/name-logo_1.png` (`#home-logo-top`, height 180px)
- Title typography: Helvetica Black (900), Inter body
- "ENTER MAP" button (`#home-btn`) triggers `enterMap()`
- Zoom-out below `RETREAT_ZOOM = 6` triggers `returnToHome()`

---

## Corner Logo
```html
<div id="corner-logo">
  <a href="https://wtalabs.ph" target="_blank" rel="noopener noreferrer">
    <img src="external-assets/name-logo_1.png" alt="WTA Labs">
  </a>
</div>
```
Replaces the MapLibre zoom control (NavigationControl removed). Height 34px, opacity 0.72 resting / 1.0 on hover.

---

## Adding New Layers (checklist)

1. Copy data `.js` file to `layers/` and legend `.png` to `styles/legend/`
2. Add `<script src="layers/YourLayer.js"></script>` tag
3. Add `map.addSource(...)` + `map.addLayer(...)` in `addLocalLayers()`
4. Add entry to `LAYER_TOGGLES` array
5. Add entry to `ALL_LAYERS_MAP` object
6. Add toggle row to `#lp` HTML (with swatch or `<img>`)
7. Add legend chip to `#legend` HTML
8. If interactive: add to `INTERACTIVE_LAYERS` array
9. If hover tooltip needed: add to `HOVER_FIELDS` object
10. If layer should appear in view presets: update `applyView()`

---

## Data Attribution
- DepED ESLIS/ESBEIS school database
- OpenStreetMap contributors
- PSA administrative boundaries (Philippine Statistics Authority)
