# FORM / LAB — Frontend Design OS (v0.1)

An early working build of a cinematic, accessible-by-design frontend studio built with **React, Vite, React Three Fiber, Drei, Three.js, GSAP and Lenis**.

## What works today

- Responsive studio homepage with original editorial art direction and an interactive, deforming WebGL cell sculpture.
- Five-role studio display: Creative Director, Design Engineer, Motion Engineer, Visual Inspector, Quality Engineer.
- Brief compiler: project name, description, new-build/reconstruction choice, URL, art direction, motion character.
- Deterministic design specification with palette, acceptance criteria, five agent handoffs.
- **Local** brief saving, reopening, JSON export and copy-to-clipboard.
- Motion reduction support and mobile layouts.
- Curated links to the upstream repositories being integrated.

## What is *not* connected yet

This v0.1 **does not execute AI agents or inspect external websites**. The specification compiler is deterministic client-side software, not a model call. Browser testing, visual-diff analysis, authenticated GitHub/Vercel project creation, and runtime AI orchestration are subsequent milestones.

## Architecture

- `src/main.jsx`: hero's 3D scene, editorial homepage, interactive workbench, local brief compilation.
- `src/styles.css`: responsive design system.
- `vercel.json`: Vite static deployment and client-side fallback.

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

For a Vercel deployment, set framework preset **Vite**, root directory **frontend-design-os**, output directory **dist**, build command **npm run build**.

## Next implementation milestones

1. Extract React components and Three.js scene into their own files, introduce TypeScript.
2. Add optional server storage with authentication and data portability.
3. Connect agent runners to the spec and project repository with permissions, audit logs and budget controls.
4. Introduce Playwright MCP, Chrome DevTools MCP and reference-screen comparison.
5. Automate screenshot baselines and visual regression thresholds with human approval gates.
6. Benchmark mobile WebGL performance and introduce a static illustrative fallback when context creation fails.
7. Add a public gallery of approved design patterns with licence and attribution tracking.

## Licence and credits

This code is original and currently part of a feature branch under `sophiamaybea/self-learning-3d-design`, not a fork or bundled copy of the upstream libraries. Before commercial distribution, review the individual package licences and any reused external assets.

## Source

`frontend-design-os-v1` branch, `frontend-design-os/` directory.
