# Form / Feeling — a runnable design starter

A real working React 19 + Three.js + React Three Fiber 9 + Drei 10 + GSAP 3 + Lenis sample. This is a **small curated integration**, not an attempt to load all 41 upstream projects together.

## Run

```bash
npm install
npm run dev
npm run build
npm audit --audit-level=high
npx playwright install chromium
npm run test:e2e
```

Built-in safeguards: prefers-reduced-motion, a meaningful non-WebGL fallback, semantic links and headings, focus styles, hover-independent controls, capped device pixel ratio, no postprocessing by default, no external 3D/asset downloads, responsive CSS. Google Fonts is optional and falls back to local system fonts.

## Testing status

Source files and Playwright tests are provided. Tests need a working Node installation and Chromium environment. **No claim that external browser or Safari tests have passed merely because code exists.** GitHub Actions attempts compilation, security auditing, and accessibility checks on pushes. On iOS Safari, test a real device manually.

## Notes

- GSAP is governed by its own standard licence. Check conditions for your intended distribution.
- Add WebGL postprocessing only after profiling.
- Treat visual design references as inspiration, not permission to duplicate their assets.
