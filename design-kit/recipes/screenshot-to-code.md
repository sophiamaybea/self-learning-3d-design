# Screenshot to code: measurement-first reconstruction

Use for user-supplied screenshot(s) or an authorised source site. Never claim to have a perfect match without pixel-diff evidence.

## Research / measurement
1. Record screenshot size, viewport ratio, margins, column proportions, overlap depth, visual hierarchy and alignment guides.
2. Inventory permitted image, vector, type and animation assets. Check their rights.
3. Infer spacing tokens, type scale, line height, grid constraints and breakpoints.
4. Describe interactions that cannot be proven from a screenshot as hypotheses.
5. Build static semantic HTML/CSS first, then reproduce motion and interaction with GSAP/Motion if warranted.
6. Use play-throughs and screenshot captures at the exact reference dimensions. Check pixel differences and visually inspect.
7. Tune the five largest spatial mismatches in each pass; repeat until layout, type, lighting and timing match the user's brief.
8. Evaluate keyboard, zoom, reduced-motion, touch, screen-reader, no-WebGL and low-powered-device behaviour.

## Repository selection
- 3D screenshot: Three.js, React Three Fiber, Drei; custom shaders with licensing clearance.
- Strong scroll motion: GSAP, optionally Lenis (avoid competing scroll engines).
- Animated type: SplitType with careful accessible DOM restoration; Motion.
- 3D + DOM alignment: 14islands/r3f-scroll-rig.
- Illustration/styled textures: Canvas Sketch + authorised art assets.

## Deliverable
Source changes + screenshot QA evidence + visual comparison notes + remaining mismatches.
