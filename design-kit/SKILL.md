---
name: chatgpt-visual-design-studio
description: Use a vetted GitHub reference catalogue to research, design, code and visually refine accessible creative websites, immersive 3D UI, kinetic typography and advanced animations.
---

# Design Studio Skill

Read `AGENTS.md`, `catalog.json` and `AUDIT.md` in this folder before choosing tooling. Read a source's **own** README and licence when integrating it. Never claim unexecuted tests have passed.

## How this skill is used from ChatGPT

User: "Use sophiamaybea/self-learning-3d-design `design-kit/SKILL.md` and build [my idea]."

1. Translate the user's goal into a brief containing audience, mood, visual references, site structure, behaviours, device constraints and target quality.
2. Pick **at most 3–5** complementary upstream repositories. The catalogue is a menu, not a dependency list.
3. Research the chosen projects' current code and compatibility; pay special attention to licences marked CUSTOM, Commons Clause, Prosperity or NO-LICENSE-FOUND.
4. Make a design system: typography, colour roles, spacing scale, imagery/3D asset treatment, motion timing/curves, mobile art direction and reduced-motion alternative.
5. Write functional application code. Commit changes to the selected target repository when the GitHub connector has permission. If no repository creation permission exists, publish files in the relevant existing repo/folder and say so plainly.
6. Run available tests, inspect the rendered result, and iterate with screenshot comparisons until it meets the brief. Don't substitute decorative animations for actual interaction.
7. Return the actual code/project link, dependencies, rights/licences and tested vs untested surfaces.

## Available source disciplines

- Three-dimensional scenes: React Three Fiber, Three.js, Drei, react-postprocessing, maath, R3F Scroll Rig, Three Custom Shader Material.
- Cinematic storytelling: GSAP, Lenis, Motion, SplitType, Theatre.js.
- Optical rendering: ShaderGradient, Liquid Logo, fluid shaders, CSS/SVG glass references.
- Generative layouts: Canvas Sketch, OGL, Flubber, Codrops demos.
- UI polish: Magic UI, Motion Primitives; React Bits subject to Commons Clause restrictions.

## Two useful workflows

**Screenshot/photo → code:** use `recipes/screenshot-to-code.md`. Reverse engineer spatial systems and visual hierarchy, then validate responsive screenshots and source assets rather than guessing.

**Cinematic/Awwwards-style experience:** use `recipes/cinematic-scroll-story.md`. Plan every animation beat and the fallback, implement scroll choreography and QA performance.

## Important

This skill is a document in a GitHub repository, **not an automatically installed ChatGPT tool**. A connected GitHub app can retrieve it when the user asks. Image generation requires image tools; a linked 3D repo cannot itself render images in an otherwise text-only ChatGPT conversation.
