# ChatGPT Design Toolkit

**41 verified GitHub repositories, a design-agent playbook and a starter for immersive websites.** Organised for practical use in ChatGPT through a connected GitHub repository.

## What is included
- `catalog.json`: machine-readable names, URLs, categories, observed licences, latest pushed dates, risk flags and adoption types.
- `catalog.md`: human-readable full list.
- `SKILL.md`: read-on-demand ChatGPT/Codex skill and [task recipes](recipes/chatgpt-prompts.md).
- `AGENTS.md`: mandatory design, accessibility, licence and visual QA rules for coding assistants.
- `AUDIT.md`: licence exceptions and the limits of the upstream audit.
- `gallery/index.html`: open directly in a browser to explore and copy design prompts (no npm needed).
- `examples/react-immersive/`: practical React + Three.js + GSAP starter with graceful fallback.
- `scripts/`: catalogue validator, individual reference fetcher and scheduled upstream checker.

## Using this directly in ChatGPT

Connect GitHub to ChatGPT and ask:

> Use GitHub repository `sophiamaybea/self-learning-3d-design`, read `design-kit/AGENTS.md` and `design-kit/catalog.json`, then create a cinematic 3D website with scroll storytelling for [my idea]. Pick safe compatible libraries and edit the code directly.

This does *not* make every upstream library a native ChatGPT tool. The repo provides a source index, prompts, code and reusable build patterns that ChatGPT can read when connected.

## Running / updating

```bash
node design-kit/scripts/check-catalog.mjs
node design-kit/scripts/audit-upstreams.mjs
node design-kit/scripts/fetch-reference.mjs react-three-fiber
cd design-kit/examples/react-immersive
npm install
npm run dev
npm run build
npm audit --audit-level=high
```

Cloned references live under `design-kit/.references/` (ignored by Git). Restricted/unlicensed resources are not cloned automatically. The showcase contains original code only; third-party sources and their assets are not republished.

## Choosing stacks

| Goal | Start here |
|---|---|
| 3D product storytelling | React Three Fiber + Drei + GSAP; Three.js under the hood |
| Scroll-led creative studio | GSAP + Lenis + SplitType (if actually needed) |
| Animated gradients | ShaderGradient linked reference, review its package licence first |
| Liquid materials | Custom Shader Material + custom original shaders, not archived Lamina |
| Glass | Prototype with one glass library; fallback CSS |
| Galleries and visual effects | Motion Primitives, Magic UI, curated Codrops references |
| Generative art | Canvas Sketch, OGL, WebGL demos as references |

Never simultaneously install competing scrollers or all 41 libraries.