# The Garden · Experience Lab

An **interactive, responsive creative-design laboratory**. This is a working, original visual prototype rather than a clone of a third-party site.

## What works now

- **Image → atmosphere:** upload a photograph; client-side k-means quantisation extracts a palette, updates the 3D artefact and animated material. Up to 8 MB. Image stays in the browser.
- **Themes:** four curated moods; selected theme persists to `localStorage`. Click colour swatches to copy a hex code. Export CSS tokens.
- **GSAP + Lenis:** scroll-triggered editorial motion synced to smooth scrolling. Motion can be disabled; `prefers-reduced-motion` is honoured.
- **React Three Fiber + Drei:** a custom dimensional nine-petal abstract flower with pointer and scroll response. Static fallback when WebGL is unsupported.
- **Paper Shaders:** reactive material background; static gradient with reduced motion or no WebGL.
- **Reference URL:** validates a URL and prepares a local Design Extract CLI command. **It does not run a remote extractor or clone the website.**
- **Ten-library directory:** links to documentation for the ten shortlisted libraries, with accurate statuses.

## Run it

```sh
cd design-kit/experience-lab
npm install
npm run dev
```

```sh
npm run build
npx playwright install chromium
npm run test
```

This project works independently within the larger `self-learning-3d-design` monorepo and can be deployed on Vercel with **Root Directory = `design-kit/experience-lab`** and **Framework = Vite**.

## Workflows in addition to the running page

1. **Design Extract**: Run `npx designlang "https://reference.example" --full` locally, with consent and respecting rights and usage policies; then inspect the exported tokens. This is not bundled server-side, so Vercel preview requires no privileged website crawler.
2. **Screenshot-to-Code**: Follow the [upstream setup](https://github.com/abi/screenshot-to-code) to run its separate AI backend and models. The Experience Lab does not imply it can turn screenshots into full working sites without that backend.
3. **GSAP Skills**: Install [the official instructions](https://github.com/greensock/gsap-skills) in your coding agent before making complex animation changes.
4. **React Bits**: Browse the [component catalogue](https://github.com/DavidHDev/react-bits), then install only licensed individual components that meet the design brief. **No React Bits component source has been copied into this repository.**
5. **Playwright**: Run `npm run test` after browser installation. Use Playwright screenshots to validate responsive designs, keyboard navigation, and reduced-motion changes.

## Dependencies and rights

Runtime: React 19, GSAP, Lenis, Three.js, React Three Fiber, Drei, Paper Shaders; Lucide icons. Vite build.

- GSAP has its own [standard licence](https://gsap.com/standard-license/).
- Paper Shaders uses Apache-2.0 and is version-pinned because its 0.0.x line can include breaking changes.
- React Bits has **MIT + Commons Clause** terms; linked only, not redistributed.
- See `../AUDIT.md` for general dependency and accessibility precautions.
- No external visual assets, font files or copyrighted reference website code are copied into this project.
- Google Fonts are requested at runtime; fallback fonts are configured.

## Known boundaries

The photo palette reflects **colour distribution**, not automatically an image's full aesthetic or meaning. The browser is not allowed to fetch and execute arbitrary reference-site JavaScript, so the URL input generates a local extraction command instead. Visual fidelity to any other website is neither claimed nor tested. Respect copyright and trademarks when studying source websites.

## Architecture

```text
experience-lab/
├── src/App.jsx          # components, WebGL sculpture, palette extraction, motion
├── src/styles.css       # editorial design system and responsive rules
├── src/main.jsx         # React entry
├── tests/smoke.spec.js  # Playwright behaviour and responsiveness
├── playwright.config.js
├── package.json
├── vite.config.js
└── index.html
```

## Reproducible QA

In addition to `npm run build`, test at 390px and 1440px; inspect iOS Safari manually when available. Browser tests check basic controls and reduced-motion rendering; they're not a guarantee of GPU compatibility on every device.
