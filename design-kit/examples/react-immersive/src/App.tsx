import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
const SculptureScene = lazy(() => import('./SculptureScene'));

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const callback = () => setReduced(query.matches);
    query.addEventListener('change', callback);
    return () => query.removeEventListener('change', callback);
  }, []);
  return reduced;
}

function browserSupportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  } catch {
    return false;
  }
}

function SculptureStage({ reduced }: { reduced: boolean }) {
  const [webglAvailable, setWebglAvailable] = useState(false);
  useEffect(() => setWebglAvailable(browserSupportsWebGL()), []);
  return (
    <div className="sculpture-shell" aria-hidden="true">
      <div className="sculpture-fallback" />
      {webglAvailable && (
        <Suspense fallback={null}><SculptureScene reduced={reduced} /></Suspense>
      )}
      <span className="sculpture-coordinate">FORM STUDY / 001</span>
    </div>
  );
}

export default function App() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 28, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true }
        });
      });
    }, root);
    return () => { cancelAnimationFrame(frame); context.revert(); lenis.destroy(); };
  }, [reduced]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <a className="brand" href="#top" >F<span>∕</span>F</a>
        <nav aria-label="Primary navigation">
          <a href="#manifesto">Approach</a>
          <a href="#studio">The studio</a>
          <a className="nav-action" href="https://github.com/sophiamaybea/self-learning-3d-design/tree/main/design-kit" target="_blank" rel="noreferrer">Source ↗</a>
        </nav>
      </header>

      <main id="main" ref={root} data-reduced-motion={reduced ? 'true' : 'false'}>
        <section id="top" className="hero" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <span className="eyebrow"><span className="status-dot" /> DIGITAL OBJECTS, MADE TO FEEL REAL</span>
            <h1 id="hero-heading">Design that <em>feels</em> alive.</h1>
            <p className="intro">A small, deliberate study in shape, motion and modern web craft. Built for beauty. Designed for people.</p>
            <a className="hero-link" href="#manifesto">Explore the experience <span aria-hidden="true">↓</span></a>
          </div>
          <SculptureStage reduced={reduced} />
          <div className="hero-footnote" aria-hidden="true"><span>SCROLL TO EXPLORE</span><span>00 / 03</span></div>
        </section>

        <section className="ticker" aria-label="Design principles">
          <p>FEELING <span aria-hidden="true">✳</span> FUNCTION <span aria-hidden="true">✳</span> FORM <span aria-hidden="true">✳</span> FEELING <span aria-hidden="true">✳</span> FUNCTION</p>
        </section>

        <section id="manifesto" className="manifesto" aria-labelledby="manifesto-title">
          <p className="section-counter reveal">01 / AN INTENTION</p>
          <h2 id="manifesto-title" className="reveal">Not an effect for the sake of an effect. <em>An experience</em> with a reason to exist.</h2>
          <p className="manifesto-copy reveal">Real craft is the thoughtful relationship between aesthetics and use. Animation helps us find our place, not lose it. Technology stays out of the way until it has something beautiful to say.</p>
        </section>

        <section id="studio" className="studio" aria-labelledby="studio-title">
          <div className="studio-heading reveal"><p className="section-counter">02 / UNDER THE SURFACE</p><h2 id="studio-title">Material thinking.</h2></div>
          <div className="material-grid">
            <article className="material-card light reveal"><span className="card-index">01</span><div className="card-art metal" aria-hidden="true" /><h3>Form</h3><p>3D shapes with thoughtful scale, light and structure.</p></article>
            <article className="material-card green reveal"><span className="card-index">02</span><div className="card-art glass" aria-hidden="true" /><h3>Motion</h3><p>Subtle transitions that keep their purpose in view.</p></article>
            <article className="material-card dark reveal"><span className="card-index">03</span><div className="card-art orbit" aria-hidden="true" /><h3>Feeling</h3><p>Contrast, colour and rhythm that make the work memorable.</p></article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div><strong>Form / Feeling</strong><p>A small experiment in intentional digital design.</p></div>
        <a href="#top">Back to top ↑</a>
        <span>REACT + THREE.JS + GSAP</span>
      </footer>
    </>
  );
}
