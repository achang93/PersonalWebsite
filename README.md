# Albert Chang — personal portfolio

A responsive portfolio focused on AI, machine learning, and software engineering. Built with HTML, CSS, and vanilla JavaScript; no package installation or build step is needed.

The design uses charcoal, off-white type, a muted sage accent, and open layouts. A name-led introduction and full-width project rows keep the portfolio personal and easy to scan. Layout and motion tokens live in `styles.css`; design decisions and the three design skills applied to the site are documented in `DESIGN.md`.

## Preview locally

From this directory, run:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Then open [the local preview](http://127.0.0.1:4173).

## Files

- `index.html`: biography, project descriptions and links, experience, education, and contact information.
- `styles.css`: colors, typography, responsive layouts, focus states, and reduced-motion/print styles.
- `script.js`: project filtering, mobile navigation, copy-email feedback, short scroll reveals, reading progress, and pointer-responsive metallic edges.
- `assets/favicon.svg`: the AC monogram.
- `DESIGN.md`: the design direction, preserved user preferences, skill sources, and interaction conventions.

The website is compatible with GitHub Pages: publish these files together from the repository root. All local asset URLs are relative, so it also works under a repository subpath.

The stylesheet, script, and favicon URLs include a version query. Bump that version when replacing these assets so returning visitors receive the updated design.

## Page order

Introduction and education → career statistics → experience → projects → skills → contact.

## Updating content

Keep availability dates, education status, and experience in `index.html` current. Project cards use `data-categories` (`ai`, `software`, `hardware`) for filtering; a project may have more than one category. Update the displayed totals if adding or removing projects.

Each project uses a compact icon. Descriptions draw from the original portfolio and project documentation. The capstone entry, LLM Prompt Optimization Under Domain Shift, reflects the documented work on the NLPcapstone repository's `albert` branch and is marked as ongoing research.

Yearn for Mines describes the autonomous Minecraft agent and the memory and harness improvements documented on its `albert` branch. The first three projects are X-ray captioning, Yearn for Mines, and prompt optimization.

## Accessibility and performance

Content, links, and expandable details work without JavaScript. JavaScript adds filtering and a collapsible mobile menu. An IntersectionObserver handles short, one-time content reveals. The navigation and thin reading-progress line share one requestAnimationFrame callback; there is no continuous animation loop or moving background.

Only projects and experience entries receive a faint metallic edge on hover or keyboard focus. Mouse movement shifts the reflection using one queued animation frame. The experience edge encloses the full entry when expanded. The name makes a short entrance, section headings fade, and work entries rise slightly once. Buttons respond to presses and shimmer on pointer hover; expanded details use progressive CSS transitions. Copying the email address changes the icon to a check mark without moving adjacent controls. Decorative effects cannot intercept clicks.

Reduced-motion preferences disable all animations, reveals, pointer tracking, icon and link-arrow movement, and smooth scrolling, preserving static interaction highlights. Keyboard input also disables animation and smooth scrolling for immediate feedback. Hover movement applies only to fine pointers. Content remains visible for keyboard focus, printing, and browsers without IntersectionObserver. Entries reveal only once, so filtering or scrolling back does not repeatedly animate them. Native focus outlines remain available in forced-colors mode.

Fonts are loaded from Google Fonts with local fallbacks. No analytics, cookies, backend, or API keys are required.
