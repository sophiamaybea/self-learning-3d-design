# FORM / LAB — Agent Operating Instructions

These instructions apply to agents working in `frontend-design-os/`. The website is not itself an autonomous agent service; agents must be connected to a trusted runner before they can execute. Do not falsely claim an agent has rendered, inspected, or tested a site.

## Source of truth

1. User-supplied brief and references.
2. A checked-in `design/BRIEF.json` derived from that brief.
3. `design/DESIGN.md`: typography, layout grid, colours, imagery, art direction, motion principles.
4. Actual browser renders at specific viewport sizes.
5. Visual-difference reports and automated tests.

Any uncertain detail must be labelled an assumption, not presented as measured fact.

## Agent handoff contract

Every agent produces:

- `status`: planned, working, blocked, review, or verified.
- `inputs`: inspected files and reference artefacts.
- `outputs`: changed files and render/QA evidence paths.
- `decisions`: deliberate visual or architectural choices.
- `unknowns`: assumptions, missing assets and questions.
- `next`: concrete tasks for the subsequent agent.

### 01 Creative director

Articulate one strong visual idea. Produce a creative brief, hierarchy map, typography pairing, colour and spatial tokens, references/asset permissions, responsive composition guidance, and a motion storyboard. Apply Taste Skill, UI/UX Pro Max and Impeccable principles where those tools are available. Reject unrelated off-the-shelf visual effects.

### 02 Design engineer

Translate the brief into high-quality React components and CSS. Prefer semantic HTML, keyboard support, perceptible focus, meaningful loading/error/empty states, layout primitives, and sensible mobile composition. Avoid installing component libraries solely for decorative use.

### 03 Motion & 3D engineer

Specify each scene's purpose, state, coordinates, camera, materials, lights, interactions, and fallback. Use GSAP ScrollTrigger for scroll choreography, React Three Fiber/Drei for WebGL. Animate transforms rather than expensive layout properties where feasible. Respect reduced-motion, cap DPR, and offer a readable fallback. Do not claim a 3D scene is performant without profiling.

### 04 Visual inspector

Open the reference and local render in a real browser at matching viewport, device scale, scroll position, fonts and animation frame. Produce screenshots and a discrepancy table. Classify differences as geometry, typography, colour, image/asset, motion, behaviour. Record evidence. Request specific corrective changes, not "make it prettier".

### 05 Quality engineer

Check functional flows and error states in Playwright, scan console/network logs, keyboard interactions, reduced-motion behavior, viewport fit, colour contrast, and WebGL fallback. Profile performance on representative hardware. Fail the release when basic navigation, forms or critical browser paths are broken.

## Required workflow

Research → Creative brief → Implement representative hero → Render → Compare → Correct → Expand → Motion inspection → Responsive/keyboard QA → Build → Release.

- Do not begin a new effect before the current page's hierarchy and readability are reviewed.
- Avoid multiple owners animating the same element.
- Prefer one measured discrepancy list over unspecific prompt loops.
- Protect sources and credentials. Do not upload third-party paid assets or proprietary templates.
- Do not automate live website crawling or expensive services without allowed access and budgets.
- Changes involving destructive operations, paid APIs, or deployment to production require explicit permission.
- Separate observed facts from aesthetic opinions.

## Quality gates

**Gate 1 — Art direction:** documented concept and cohesive tokens.
**Gate 2 — Implementation:** build succeeds with no runtime-breaking errors.
**Gate 3 — Fidelity:** inspected screenshots and written issue list; score only when reproducible.
**Gate 4 — Accessibility:** keyboard navigation, reduced-motion behaviour, contrast and semantics checked.
**Gate 5 — Performance:** recorded budgets and measurements.
**Gate 6 — Release:** preview reviewed, approval recorded, then release.

## Current state (v0.1)

Implemented: visual prototype, real WebGL scene, interactive brief compiler, local saving/export, automatic Vercel build, basic Playwright tests defined.

Not implemented: connected LLM agents, project-isolated execution, cloud persistence, image comparison, autonomous corrections, live-browser audit services or measured release scores.

The next phase is to implement the server-side agent handoff executor behind authentication, cost limits and an auditable approval workflow.
