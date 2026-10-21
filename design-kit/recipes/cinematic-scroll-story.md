# Cinematic scrolling experience

Treat scroll as a narrative timeline rather than a pile of unrelated effects.

## Storyboard
Create 5–8 moments: entry, curiosity, reveal, reframe, detail, transition and ending. Each beat has:
- Narrative purpose and visual focal point.
- Composition, typography, lighting and asset treatment.
- Trigger zone, duration, easing, exit condition and a static fallback.
- Pointer, touch and keyboard interactions.
- GPU / CPU budget and device strategy.

## Practical stack
GSAP ScrollTrigger + React Three Fiber + Drei + optionally Lenis. Add Three Custom Shader Material for original custom surfaces when justified. Keep other glass and gradient packages as references instead of simultaneously bundling them.

## QA gates
- Content reads in DOM order without animations.
- On reduced motion, disable float, parallax, loops and scroll transforms.
- Three.js is optional and lazy-loaded. The design must work when WebGL fails.
- Keyboard users can access every control without scroll-jacking.
- Inspect 320px, 390px, 768px, 1440px and ultrawide widths.
- Use screenshots and real hardware performance measurements when possible.
- License every audio, illustration, model and font independently.
