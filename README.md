# self-learning-3d-design
Self-learning 3D design agent powered by Ollama. Generates, iterates, and evolves high-quality 3D models, Blender scripts, Three.js scenes, and optimized prompts for AI 3D tools. Living vault of designs, techniques, and self-improving prompts.

## New: ChatGPT Design Toolkit (41 audited upstream repositories)

This repository now also contains the [ChatGPT Design Toolkit](design-kit/README.md): a curated, auditable design-repository library and coding-agent instruction set. All 40 references from the original collection plus the **Three Custom Shader Material** replacement are indexed.

- [Full catalogue](design-kit/catalog.md) / [structured JSON](design-kit/catalog.json)
- [ChatGPT / coding-agent instructions](design-kit/AGENTS.md)
- [Licensing, maintenance, security and accessibility audit](design-kit/AUDIT.md)
- [One-at-a-time reference fetcher](design-kit/scripts/fetch-reference.mjs)
- [Live upstream checker](design-kit/scripts/audit-upstreams.mjs)
- [No-build visual gallery](design-kit/gallery/index.html)
- [Runnable React/Three.js/GSAP starter](design-kit/examples/react-immersive/)

**Using from ChatGPT:** connect GitHub in ChatGPT, then ask: `Use my GitHub repo sophiamaybea/self-learning-3d-design, follow design-kit/AGENTS.md and design a [site/app].` The instructions are read on demand; ChatGPT does not automatically absorb upstream repositories or gain local runtime access.

**Licensing:** Linked upstream code is not copied or sublicensed here. Several entries have licence restrictions or missing permissions, clearly marked in the catalogue. Some entries are demos, not packages. The toolkit is not a promise that all libraries work together.