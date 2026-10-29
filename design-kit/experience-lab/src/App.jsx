import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { MeshGradient } from '@paper-design/shaders-react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Copy, Github, ImagePlus, Link2, MousePointer2, RefreshCcw, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const REPOS = [
  { name: 'Design Extract', category: 'RECONSTRUCT', status: 'Workflow', url: 'https://github.com/Manavarya09/design-extract', note: 'Measure a real website’s visual system.' },
  { name: 'Screenshot-to-Code', category: 'RECONSTRUCT', status: 'Workflow', url: 'https://github.com/abi/screenshot-to-code', note: 'AI-assisted image and video to code.' },
  { name: 'GSAP', category: 'MOTION', status: 'Live', url: 'https://github.com/greensock/GSAP', note: 'Choreographed scroll, reveals and transitions.' },
  { name: 'GSAP Skills', category: 'MOTION', status: 'Workflow', url: 'https://github.com/greensock/gsap-skills', note: 'Agent instruction set for advanced animation.' },
  { name: 'Lenis', category: 'MOTION', status: 'Live', url: 'https://github.com/darkroomengineering/lenis', note: 'Smooth scrolling synced to GSAP.' },
  { name: 'React Three Fiber', category: '3D', status: 'Live', url: 'https://github.com/pmndrs/react-three-fiber', note: 'Real-time interactive 3D artefact.' },
  { name: 'Drei', category: '3D', status: 'Live', url: 'https://github.com/pmndrs/drei', note: 'Three.js abstraction and floating motion.' },
  { name: 'Paper Shaders', category: 'GRAPHICS', status: 'Live', url: 'https://github.com/paper-design/shaders', note: 'Reactive animated colour fields.' },
  { name: 'React Bits', category: 'DETAILS', status: 'Reference', url: 'https://github.com/DavidHDev/react-bits', note: 'Individual effects available to add separately.' },
  { name: 'Playwright', category: 'TESTING', status: 'Configured', url: 'https://github.com/microsoft/playwright', note: 'Automated browser checks and screenshots.' },
];

const PRESETS = [
  { name: 'Night garden', bg: '#191b18', accent: '#d6a68b', second: '#a9bc8e', pale: '#f2eee3' },
  { name: 'The red room', bg: '#211514', accent: '#e79a79', second: '#bfa8a2', pale: '#f7ede2' },
  { name: 'Blue hour', bg: '#171c29', accent: '#a9bedf', second: '#e2b8a4', pale: '#f2f0ed' },
  { name: 'Acid archive', bg: '#20211b', accent: '#cbdb63', second: '#cf9495', pale: '#f0eee2' },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(mq.matches);
    mq.addEventListener('change', change);
    return () => mq.removeEventListener('change', change);
  }, []);
  return reduced;
}
function supportsWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}
function rgbToHex([r, g, b]) { return '#' + [r,g,b].map(v => Math.round(v).toString(16).padStart(2,'0')).join(''); }
function luminance(hex) {
  const n = hex.replace('#','');
  return (parseInt(n.slice(0,2),16)*.2126 + parseInt(n.slice(2,4),16)*.7152 + parseInt(n.slice(4,6),16)*.0722);
}
function colorDistance(a,b) { return Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]); }
function paletteFromImage(file) {
  return new Promise((resolve,reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas'); canvas.width = 92; canvas.height = 92;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img,0,0,92,92);
        const raw = ctx.getImageData(0,0,92,92).data;
        const pixels = [];
        for(let i=0;i<raw.length;i+=24) {
          if(raw[i+3] < 210) continue;
          const rgb = [raw[i],raw[i+1],raw[i+2]];
          if(rgb.every(v=>v>246) || rgb.every(v=>v<8)) continue;
          pixels.push(rgb);
        }
        if(pixels.length < 5) throw new Error('Not enough colours in this image.');
        // Deterministic k-means quantisation. No photo leaves the browser.
        let centres = [pixels[0]];
        while(centres.length < 5) {
          let candidate=pixels[0], furthest=-1;
          for(let j=0;j<pixels.length;j+=3) {
            const d=Math.min(...centres.map(c=>colorDistance(c,pixels[j])));
            if(d>furthest){ furthest=d; candidate=pixels[j]; }
          }
          centres.push(candidate);
        }
        for(let round=0;round<9;round++) {
          const clusters=centres.map(()=>({sum:[0,0,0],n:0}));
          pixels.forEach(p=>{
            let best=0;
            centres.forEach((c,i)=>{ if(colorDistance(p,c)<colorDistance(p,centres[best])) best=i; });
            const g=clusters[best];g.n++;g.sum.forEach((_,idx)=>g.sum[idx]+=p[idx]);
          });
          centres=centres.map((c,i)=>clusters[i].n ? clusters[i].sum.map(v=>v/clusters[i].n):c);
        }
        const colors=centres.map(rgbToHex).sort((a,b)=>luminance(a)-luminance(b));
        const saturation=(hex)=>{
          const n=hex.slice(1); const rgb=[0,2,4].map(i=>parseInt(n.slice(i,i+2),16)/255);
          return Math.max(...rgb)-Math.min(...rgb);
        };
        const bright=[...colors].sort((a,b)=>(saturation(b)*160+luminance(b)*.3)-(saturation(a)*160+luminance(a)*.3));
        const bg=colors[0], accent=bright[0], second=bright.find(c=>c!==accent) || colors[3];
        resolve({name:'From your photograph',bg,accent,second,pale:'#f9f3e8', colors});
      } catch(e) {reject(e);} finally {URL.revokeObjectURL(url);}
    };
    img.onerror = () => {URL.revokeObjectURL(url);reject(new Error('This image could not be opened.'));};
    img.src=url;
  });
}

function Leaf({ index, tone }) {
  const geometry=useMemo(()=>{
    const s=new THREE.Shape();
    s.moveTo(0,0);
    s.bezierCurveTo(-.55,.22,-.7,1.5,0,2.2);
    s.bezierCurveTo(.7,1.5,.55,.22,0,0);
    return new THREE.ExtrudeGeometry(s,{depth:.045,steps:1,bevelEnabled:true,bevelThickness:.028,bevelSize:.03,bevelSegments:2,curveSegments:14});
  },[]);
  const angle=(index/9)*Math.PI*2;
  return <mesh geometry={geometry} rotation={[index%2===0?.11:-.15, index%3===0?.16:-.12,angle]} scale={index%3===0?1.02:.87} position={[Math.sin(angle)*.12, Math.cos(angle)*.12, (index%3)*.04]}>
    <meshPhysicalMaterial color={tone} roughness={.39} metalness={.12} side={THREE.DoubleSide} clearcoat={.8} clearcoatRoughness={.2} />
  </mesh>;
}
function LivingArtefact({ palette, reduced, progress }) {
  const group=useRef();
  useFrame((state,delta)=>{
    if(!group.current)return;
    const targetX=(reduced?-.13:-.13 + state.pointer.y*.15)+progress.current*.18;
    const targetY=(reduced?.24:state.pointer.x*.2)+progress.current*2.2;
    group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,targetX,2.4,delta);
    group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,targetY,2.4,delta);
  });
  return <Float speed={reduced?0:1} rotationIntensity={reduced?0:.14} floatIntensity={reduced?0:.24}>
    <group ref={group} scale={1.12} position={[0,-.8,0]}>
      <group rotation={[.2,0,-.32]}>
        {Array.from({length:9},(_,i)=><Leaf key={i} index={i} tone={i%3===0?palette.second:palette.accent}/>)}
        <mesh position={[0,0,.2]}><sphereGeometry args={[.38,28,28]} /><meshStandardMaterial color={palette.bg} metalness={.5} roughness={.25}/></mesh>
        <mesh position={[0,0,.42]}><torusGeometry args={[.24,.011,10,64]}/><meshBasicMaterial color={palette.pale}/></mesh>
        <mesh rotation={[.1,.28,0]} position={[0,0,-.13]}><torusGeometry args={[2.43,.012,8,100]}/><meshBasicMaterial color={palette.accent} transparent opacity={.38}/></mesh>
      </group>
    </group>
  </Float>;
}
function Scene({palette,reduced,progress}) {
  return <div className="scene" aria-label="Interactive three-dimensional flower sculpture">
    <Canvas dpr={[1,1.5]} camera={{position:[0,0,8.2],fov:36}} gl={{antialias:true,alpha:true,powerPreference:'low-power'}} fallback={<div className="scene-fallback">✳</div>}>
      <ambientLight intensity={1.85}/><directionalLight position={[3,6,5]} intensity={2}/><pointLight position={[-3,-4,4]} intensity={10} color={palette.second}/>
      <Suspense fallback={null}><LivingArtefact palette={palette} reduced={reduced} progress={progress}/></Suspense>
    </Canvas>
  </div>;
}
function ShaderPanel({palette,reduced,webgl}) {
  return <div className="shader-panel" style={{background:`linear-gradient(125deg,${palette.bg},${palette.second},${palette.accent})`}}>
    {webgl && !reduced && <MeshGradient colors={[palette.bg,palette.second,palette.accent,palette.bg]} distortion={.7} swirl={.55} grainOverlay={.17} speed={.2} style={{width:'100%',height:'100%'}} />}
    <div className="shader-panel-grain" aria-hidden="true"/>
    <div className="shader-words"><span className="eyebrow">03 / MOVING MATERIAL</span><h2>Colour is<br/><em>never still.</em></h2><p>Changing the palette changes the atmosphere. The material lives in the browser, not in a video.</p></div>
    <div className="shader-coordinates">LIVE MATERIAL / 03:04<br/>REACTIVE COLOUR FIELD</div>
  </div>;
}
async function copyText(value,setNotice,success) {
  try { await navigator.clipboard.writeText(value); setNotice(success || 'Copied to clipboard.'); }
  catch { setNotice('Clipboard blocked. Select and copy the visible text instead.'); }
}
function prettyName(c) { return c.replace('#','').toUpperCase(); }

export default function App(){
  const reduced=useReducedMotion();
  const [webgl,setWebgl]=useState(false);
  const [palette,setPalette]=useState(PRESETS[0]);
  const [preview,setPreview]=useState('');
  const [notice,setNotice]=useState('');
  const [reference,setReference]=useState('');
  const [referenceCommand,setReferenceCommand]=useState('');
  const [menuOpen,setMenuOpen]=useState(false);
  const [motionOn,setMotionOn]=useState(true);
  const [imageBusy,setImageBusy]=useState(false);
  const progress=useRef(0);
  const fileInput=useRef(null);
  const activeMotion=motionOn&&!reduced;
  useEffect(()=>{setWebgl(supportsWebGL());},[]);
  useEffect(()=>{
    const stored=localStorage.getItem('garden-theme');
    if(stored){try{const parsed=JSON.parse(stored);if(parsed.bg&&parsed.accent&&parsed.second&&parsed.pale)setPalette(parsed);}catch{}}
  },[]);
  useEffect(()=>{localStorage.setItem('garden-theme',JSON.stringify(palette));},[palette]);
  useEffect(()=>{
    const root=document.documentElement;
    root.style.setProperty('--base',palette.bg);
    root.style.setProperty('--accent',palette.accent);
    root.style.setProperty('--accent2',palette.second);
    root.style.setProperty('--paper',palette.pale);
  },[palette]);
  useEffect(()=>{
    if(!activeMotion){ScrollTrigger.getAll().forEach(x=>x.kill());return;}
    const lenis = new Lenis({ lerp:.1, wheelMultiplier:.9, touchMultiplier:1.2 });
    lenis.on('scroll',ScrollTrigger.update);
    const tick=t=>lenis.raf(t*1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const ctx=gsap.context(()=>{
      gsap.from('.hero-line',{y:95,opacity:0,stagger:.13,duration:1.25,ease:'power3.out',delay:.14});
      gsap.from('.hero-fine',{y:24,opacity:0,duration:1.1,delay:.6,ease:'power2.out'});
      gsap.utils.toArray('.reveal').forEach(node=>gsap.from(node,{y:65,opacity:0,duration:1.05,ease:'power3.out',scrollTrigger:{trigger:node,start:'top 88%',once:true}}));
      gsap.to('.scroll-progress-fill',{scaleX:1,ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.1}});
      gsap.to('.motion-card-a',{xPercent:-18,rotate:-5,scrollTrigger:{trigger:'.motion-stage',start:'top 75%',end:'bottom 25%',scrub:1}});
      gsap.to('.motion-card-b',{xPercent:18,rotate:6,scrollTrigger:{trigger:'.motion-stage',start:'top 75%',end:'bottom 25%',scrub:1}});
      ScrollTrigger.create({trigger:'.motion-section',start:'top bottom',end:'bottom top',onUpdate:self=>{progress.current=self.progress;}});
    });
    return ()=>{ctx.revert();gsap.ticker.remove(tick);lenis.destroy();};
  },[activeMotion]);
  useEffect(()=>{if(notice){const t=setTimeout(()=>setNotice(''),4900);return()=>clearTimeout(t);}},[notice]);
  const cssTokens=useMemo(()=>`:root {\n  --garden-background: ${palette.bg};\n  --garden-accent: ${palette.accent};\n  --garden-accent-secondary: ${palette.second};\n  --garden-text: ${palette.pale};\n}`,[palette]);
  async function handleFile(event){
    const file=event.target.files?.[0];if(!file)return;
    if(!file.type.startsWith('image/')){setNotice('Choose an image file.');return;}
    if(file.size>8*1024*1024){setNotice('Please use an image smaller than 8 MB.');return;}
    setImageBusy(true);
    try{
      const fresh=await paletteFromImage(file);
      setPalette(fresh);
      const reader=new FileReader();
      reader.onload=()=>setPreview(String(reader.result));
      reader.readAsDataURL(file);
      setNotice('Palette extracted locally. Nothing was uploaded.');
    }catch(e){setNotice(e.message||'Could not read the image.');}finally{setImageBusy(false);event.target.value='';}
  }
  function prepareExtraction(e){
    e.preventDefault();
    try {
      const parsed=new URL(reference.trim());
      if(!['https:','http:'].includes(parsed.protocol))throw new Error();
      const cmd=`npx designlang "${parsed.href}" --full`;
      setReferenceCommand(cmd);
      setNotice('Command ready. Run this in your terminal to extract that site.');
    }catch{setNotice('Enter a complete http:// or https:// website URL.');}
  }
  return <div className="app">
    <a className="skip" href="#main">Skip to content</a>
    <div className="scroll-progress"><div className="scroll-progress-fill" /></div>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="The Garden, back to top"><span className="wordmark-symbol">✳</span> THE GARDEN <span className="wordmark-lab">/ EXPERIENCE LAB</span></a>
      <nav className={menuOpen?'navigation navigation-open':'navigation'} aria-label="Main navigation">
        <a onClick={()=>setMenuOpen(false)} href="#studio">01 / Atmosphere</a>
        <a onClick={()=>setMenuOpen(false)} href="#motion">02 / Motion</a>
        <a onClick={()=>setMenuOpen(false)} href="#extract">03 / Extract</a>
        <a onClick={()=>setMenuOpen(false)} href="#toolkit">04 / Toolkit</a>
      </nav>
      <button className="menu-toggle" onClick={()=>setMenuOpen(v=>!v)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen?'CLOSE':'MENU'}</button>
      <span className="header-index">ISSUE N° 001 — 2026</span>
    </header>
    <main id="main">
      <section className="hero" id="top">
        <div className="hero-grain" aria-hidden="true"/>
        <div className="hero-text">
          <p className="eyebrow hero-fine"><span className="tiny-star">✳</span> A DIGITAL FIELD GUIDE TO THE IMPOSSIBLE</p>
          <h1><span className="hero-line">Good design</span><span className="hero-line">should make</span><span className="hero-line"><em>you feel</em> <span className="title-stamp">something.</span></span></h1>
          <div className="hero-actions hero-fine"><a className="solid-link" href="#studio">ENTER THE STUDIO <ArrowUpRight size={17}/></a><span>NOT ANOTHER TEMPLATE.<br/>AN EXPERIMENT IN FEELING.</span></div>
        </div>
        {webgl?<Scene palette={palette} reduced={!activeMotion} progress={progress}/>:<div className="scene-static" aria-hidden="true">✳</div>}
        <div className="hero-art-label"><span>FIG. 01</span><span>AN ARTEFACT<br/>IN CONSTANT MOTION</span></div>
        <div className="hero-bottom"><span>SCROLL TO UNFOLD <ArrowDownRight size={16}/></span><span>DESIGNED TO BE TOUCHED. NOT JUST SEEN.</span><span>51°30′N / 00°07′W</span></div>
        <div className="scribble-arc" aria-hidden="true"><svg viewBox="0 0 280 220" fill="none"><path d="M15 146 C-12 64 81 8 181 25 C267 40 289 125 229 177 C170 229 33 201 20 141 C6 89 96 -5 182 26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg></div>
      </section>
      <div className="marquee" aria-hidden="true"><div>EXPERIMENT &nbsp; ✳ &nbsp; OBSERVE &nbsp; ✳ &nbsp; MAKE A BEAUTIFUL MESS &nbsp; ✳ &nbsp; EXPERIMENT &nbsp; ✳ &nbsp; OBSERVE &nbsp; ✳ &nbsp; MAKE A BEAUTIFUL MESS &nbsp; ✳ &nbsp;</div></div>
      <section id="studio" className="studio section-wrap">
        <div className="section-heading reveal"><p className="eyebrow">01 / THE ATMOSPHERE MACHINE</p><span className="section-number">I.</span></div>
        <div className="studio-layout">
          <div className="studio-intro reveal"><h2>Show it a picture.<br/><em>Give it a pulse.</em></h2><p>Choose an atmosphere, or upload any image. This machine finds its colours and feeds them into a living 3D sculpture and an animated material.</p><div className="note-asterisk"><span>✳</span><p>EXTRACTION HAPPENS IN YOUR BROWSER.<br/>YOUR IMAGE IS NOT SENT TO A SERVER.</p></div></div>
          <div className="control-card reveal">
            <div className="control-top"><span>LIVE COLOUR LAB / V1.0</span><span className="live-indicator"><i/> INTERACTIVE</span></div>
            <button className="drop-zone" onClick={()=>fileInput.current?.click()} disabled={imageBusy} aria-label="Upload an image to generate a theme">
              {preview?<img src={preview} alt="Your uploaded reference" className="image-preview"/>:<div className="upload-graphic"><span className="upload-grid"/><span className="upload-mark">✳</span></div>}
              <span className="drop-copy"><ImagePlus size={18}/> {imageBusy?'READING IMAGE...':preview?'CHANGE REFERENCE IMAGE':'ADD A REFERENCE IMAGE'} <ArrowUpRight size={15}/></span>
            </button>
            <input ref={fileInput} type="file" accept="image/*" hidden onChange={handleFile}/>
            <div className="preset-head"><span>OR CHOOSE AN ATMOSPHERE</span><span>◦ 04 PRESETS</span></div>
            <div className="preset-list">{PRESETS.map((p,i)=><button key={p.name} className={p.name===palette.name?'preset active':'preset'} onClick={()=>{setPalette(p);setPreview('');}}><span className="preset-no">0{i+1}</span><span className="preset-swatch" style={{background:`linear-gradient(135deg,${p.bg} 42%,${p.second} 42%,${p.accent} 76%)`}}/><span>{p.name}</span><ArrowUpRight size={15}/></button>)}</div>
            <div className="palette-row">{[palette.bg,palette.accent,palette.second,palette.pale].map((c,i)=><button key={i} className="palette-cell" title={`Copy ${c}`} onClick={()=>copyText(c,setNotice,`Copied ${c}`)} style={{background:c,color:luminance(c)>155?'#1d1d1b':'#f7f3e9'}}><span>{prettyName(c)}</span></button>)}</div>
            <div className="control-footer"><div><span>ACTIVE PALETTE</span><strong>{palette.name}</strong></div><button onClick={()=>copyText(cssTokens,setNotice,'CSS theme tokens copied.')} className="copy-button"><Copy size={16}/> COPY CSS <ArrowUpRight size={14}/></button></div>
          </div>
        </div>
        <div className="studio-foot reveal"><span>SWAP THE COLOUR.<br/>KEEP THE CHARACTER.</span><span className="divider-line"/><span><MousePointer2 size={16}/> INTERACT WITH THE 3D OBJECT ABOVE</span></div>
      </section>
      <section className="motion-section" id="motion">
        <div className="section-wrap motion-inner">
          <div className="section-heading reveal"><p className="eyebrow">02 / MOTION IS MEANING</p><span className="section-number">II.</span></div>
          <div className="motion-grid">
            <div className="motion-copy reveal"><h2>It wasn't<br/>supposed to<br/><em>sit still.</em></h2><p>GSAP choreographs the page. Lenis keeps the movement coherent. The sculpture reacts to the journey. Scroll slowly, then go back.</p><button className="motion-toggle" onClick={()=>setMotionOn(v=>!v)} aria-pressed={activeMotion}><span>{activeMotion?'PAUSE':'RESUME'} THE MOTION</span><span className="toggle-track"><span/></span></button></div>
            <div className="motion-stage" aria-label="Two animated editorial cards">
              <div className="motion-card motion-card-a"><div className="card-drawing">✺</div><span>STUDY 02A</span><b>NOT<br/>STATIC.</b><small>SCROLL / TENSION / RELEASE</small></div>
              <div className="motion-card motion-card-b"><span>STUDY 02B</span><div className="card-orbit"><span>✳</span></div><b>ALWAYS<br/>BECOMING.</b><small>THE INTERFACE IS ALIVE</small></div>
              <div className="motion-stamp">TWO STUDIES<br/>ONE SCROLL</div>
            </div>
          </div>
        </div>
      </section>
      <section id="material" className="material-section"><ShaderPanel palette={palette} reduced={!activeMotion} webgl={webgl}/></section>
      <section id="extract" className="extract-section section-wrap">
        <div className="section-heading reveal"><p className="eyebrow">04 / DESIGN FORENSICS</p><span className="section-number">IV.</span></div>
        <div className="extract-grid">
          <div className="extract-copy reveal"><h2>A reference<br/>is a <em>beginning.</em><br/>Not a blueprint.</h2><p>Bring a website into the laboratory. Design Extract can inspect typography, colours, layout and motion. Screenshot-to-Code is a separate AI-assisted workflow for reconstructing images and recordings.</p><div className="external-pair"><a href="https://github.com/Manavarya09/design-extract" target="_blank" rel="noreferrer">DESIGN EXTRACT <ArrowUpRight size={15}/></a><a href="https://github.com/abi/screenshot-to-code" target="_blank" rel="noreferrer">SCREENSHOT-TO-CODE <ArrowUpRight size={15}/></a></div></div>
          <div className="extract-console reveal"><div className="console-heading"><span>REFERENCE INPUT</span><span>EXTERNAL WORKFLOW</span></div><form onSubmit={prepareExtraction}><label htmlFor="reference-url">PASTE A WEBSITE URL</label><div className="input-line"><Link2 size={20}/><input id="reference-url" value={reference} onChange={e=>setReference(e.target.value)} type="url" placeholder="https://an-inspiring-website.com" required/><button type="submit" aria-label="Prepare extraction command"><ArrowRight size={20}/></button></div></form><p className="console-caption">Creates a local CLI command; this demo does not fetch or clone the website itself.</p>{referenceCommand?<div className="command-box"><code>{referenceCommand}</code><button onClick={()=>copyText(referenceCommand,setNotice,'Extraction command copied.')} aria-label="Copy command"><Copy size={17}/></button></div>:<div className="console-placeholder"><span>01. ENTER A REFERENCE</span><span>02. GENERATE A COMMAND</span><span>03. RUN LOCALLY</span></div>}<div className="console-bottom"><span>FOR PERSONAL RESEARCH & ORIGINAL DESIGN</span><Sparkles size={18}/></div></div>
        </div>
      </section>
      <section id="toolkit" className="toolkit-section section-wrap">
        <div className="section-heading reveal"><p className="eyebrow">05 / THE UNDERLYING MACHINERY</p><span className="section-number">V.</span></div>
        <div className="toolkit-title reveal"><h2>Ten remarkable<br/><em>pieces of machinery.</em></h2><p>Some are running in this page. Others are optional development workflows or sources for individual components. No pretend integrations.</p></div>
        <div className="repo-grid">{REPOS.map((r,i)=><a className="repo-card reveal" href={r.url} target="_blank" rel="noopener noreferrer" key={r.name}><div><span className="repo-id">{String(i+1).padStart(2,'0')} / {r.category}</span><ArrowUpRight size={18}/></div><h3>{r.name}</h3><p>{r.note}</p><span className={r.status==='Live'?'repo-badge is-live':'repo-badge'}><i/>{r.status}</span></a>)}</div>
      </section>
      <footer className="footer"><div className="footer-top"><span>THE GARDEN / EXPERIMENTAL DESIGN DEPT.</span><span>MADE TO CHANGE</span></div><p>Make something<br/><em>worth feeling.</em></p><div className="footer-bottom"><a href="#top">BACK TO THE TOP ↑</a><span>2026 / WORK IN PROGRESS, ALWAYS</span><a href="https://github.com/sophiamaybea/self-learning-3d-design" target="_blank" rel="noreferrer"><Github size={18}/> SOURCE ON GITHUB</a></div></footer>
    </main>
    <div className="toast" role="status" aria-live="polite">{notice && <><Check size={16}/>{notice}</>}</div>
  </div>;
}
