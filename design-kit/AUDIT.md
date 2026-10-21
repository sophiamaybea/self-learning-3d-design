# Audit methodology and limits

Checked **21 October 2026** using the public GitHub repository metadata endpoint for all 41 projects, plus direct licence/README/package inspection of the exceptions.

The data covers repository identity, most recent pushed date, GitHub's detected licence, archived status, and integration category. This is a **repository-level triage**, not a certification of 41 codebases. In particular it does **not** prove that each has no vulnerabilities, that every dependency is compatible, or that all 41 run in Safari.

## Important corrections

- **Lygia** is Prosperity Public License 3.0.0, not conventional permissive OSS for unrestricted commercial use. Free noncommercial usage / 30-day commercial trial. Patron/commercial alternative must be obtained separately.
- **React Bits** is MIT **plus Commons Clause**. Commercial use of components in websites/apps is permitted but reselling/repackaging components or tools is restricted. It must not be included as redistributed component source in this collection.
- **GSAP** has its **own standard licence**, rather than an MIT code licence. Check https://gsap.com/standard-license/ before redistributing GSAP or building animation-builder products.
- **ShaderGradient** states MIT in its README but GitHub metadata did not detect a root licence file. Read individual package terms before copying assets or vendoring.
- **ZeroxyDev/liquid-glass-js** has no licence detected. Publicly visible source is **not** public-domain code. No copying/vendoring without permission.
- **Lamina** is archived. Three Custom Shader Material is a candidate replacement, with its own integration tests required.
- **maath** previously referred to `pmndrs/maath`, currently redirects to `pmndrs/math`.
- **OGL** and **SplitType** state Unlicense and ISC in their `package.json` files respectively; GitHub did not detect a repository licence for either.

## Adoption legend

- `runtime`: suitable as a candidate direct dependency for an integrated starter, subject to CI/security checks.
- `optional`: install one at a time after compatibility/performance/accessibility tests.
- `demo`: examine patterns, license-check code and assets separately; not a published package.
- `reference`, `reference-only`: source of inspiration, no code copied into this toolkit.
- `license-review`: external linked resource only; do not vendor or repackage.
- `retired`: preserve history, don't recommend for new builds.
- `replacement`: replacement candidate.

## Still required per actual deployed project

1. Pin package versions and run a clean install/build in CI.
2. Run `npm audit --audit-level=high` and assess high/critical findings manually; vulnerability databases change.
3. Test a real mobile browser, including iOS Safari and reduced-motion preferences, interaction without a mouse, and lack of WebGL/WebGL2.
4. Run axe accessibility checks and keyboard checks against the complete UI, not solely effects in isolation.
5. Capture visual screenshots for mobile/tablet/desktop; inspect contrast and loss of content with animation disabled.
6. Run Lighthouse performance tests on actual deployment and evaluate JavaScript weight, memory usage and frame-rate on modest devices.
7. Check image, font, 3D model, audio and animation asset rights independently from the code licence.
8. Do not ship all 41 libraries together. Many duplicate features and would massively worsen bundle/performance.

See `scripts/` and `examples/react-immersive/` for reproducible checks.