# Role Explorer

> Submission: MarshaValerieWibowo_FrontEndEngineer_SKBatch2

A responsive job-role browser built with **only vanilla HTML, CSS and JavaScript** — no frameworks, libraries or build step. Users filter open positions by department using a row of pill buttons, and the role cards update instantly.

## Features

- **Department filters** — "All", Engineering, Design, Marketing and Product, each showing a live role count. The active pill is clearly highlighted and exposed to assistive tech with `aria-pressed`.
- **Responsive card grid** — CSS Grid with 1 column on mobile, 2 on tablet (≥ 640px) and 3 on desktop (≥ 1024px).
- **Three UI states**
  - **Default:** "All" is selected and every role is shown.
  - **Filtered:** only roles in the selected department are shown.
  - **Empty:** a department with no roles (Product, intentionally) shows an illustrated empty state with a "View all roles" button.
- **Accessibility** — semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`), `aria-label`s on filter buttons, a polite live region announcing result counts, a skip link, visible focus styles and `prefers-reduced-motion` support.
- **Polish** — card hover lift with a department-coloured accent bar, staggered fade-in on filter change, smooth transitions on pills and buttons.

## Project structure

```
.
├── index.html   # Semantic markup and static shells for the grid and empty state
├── style.css    # Design tokens, layout, responsive grid, transitions
├── script.js    # Mock data, filter state and DOM rendering
└── README.md
```

## How to run

No install or build step is needed.

1. Clone or download this folder.
2. Open `index.html` in any modern browser (double-click it, or drag it into a browser window).

Optionally, serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How it works

- `DEPARTMENTS` and `ROLES` are declared separately in `script.js`, so a department can appear as a filter even when it has zero roles.
- A single `active` value drives the UI. `setActive()` updates it, then `render()` refreshes the pill styles, the result summary, and the grid or the empty state.
- Filter clicks use one delegated listener on the pill list.
- All user-facing text is inserted with `textContent` and cards are built with `document.createElement`.

## Tools & AI Policy Note

Claude Code (Anthropic's AI coding assistant) was used to generate the initial HTML/CSS scaffolding and the JavaScript filtering and rendering logic. The UX details and state handling (active-filter styling, the empty state and its reset flow, responsive breakpoints, keyboard focus behaviour and accessibility attributes) were then reviewed and tested manually.
