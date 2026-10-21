
import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight, ArrowRight, ArrowDown, Plus, Check, Copy, Download, Sparkles, Menu, X, RotateCcw, MoveUpRight, Layers3, Eye, Activity, ShieldCheck, ExternalLink, ChevronRight, CircleHelp, CheckCircle2, LayoutGrid, Code2 } from "lucide-react";
import * as THREE from "three";
import "./styles.css";
import Room from "./emergent.jsx";

gsap.registerPlugin(ScrollTrigger);

const agents = [
  { no:"01", name:"Creative director", tag:"THE IDEA", desc:"A single, coherent visual idea. Art direction, typography, composition and a design language that belongs to the project.", tools:"Taste Skill · Impeccable", icon: Sparkles },
  { no:"02", name:"Design engineer", tag:"THE SYSTEM", desc:"The invisible structure beneath the beautiful surface. Accessible components, responsive layouts and intentional details.", tools:"React · shadcn/ui · React Bits", icon: Layers3 },
  { no:"03", name:"Motion engineer", tag:"THE FEELING", desc:"Fluid transitions, procedural forms, scroll choreography and spatial interaction that makes the work feel alive.", tools:"GSAP · Three.js · R3F", icon: Activity },
  { no:"04", name:"Visual inspector", tag:"THE EVIDENCE", desc:"Look at the real browser. Compare intended and actual layouts. Turn differences into specific corrections.", tools:"Playwright · DevTools · Argos", icon: Eye },
  { no:"05", name:"Quality engineer", tag:"THE STANDARD", desc:"Prove that it works. Accessible, responsive, performant, and worthy of the screen it lives on.", tools:"Web Quality Skills · Lighthouse", icon: ShieldCheck }
];
const stack = [
  {category:"Art direction",links:[["Impeccable","https://github.com/pbakaus/impeccable"],["Taste Skill","https://github.com/Leonxlnx/taste-skill"],["UI/UX Pro Max","https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"]]},
  {category:"Movement & space",links:[["GSAP","https://github.com/greensock/GSAP"],["React Three Fiber","https://github.com/pmndrs/react-three-fiber"],["Drei","https://github.com/pmndrs/drei"],["Lenis","https://github.com/darkroomengineering/lenis"]]},
  {category:"Engineering & quality",links:[["shadcn/ui","https://github.com/shadcn-ui/ui"],["Playwright","https://github.com/microsoft/playwright"],["Chrome DevTools MCP","https://github.com/ChromeDevTools/chrome-devtools-mcp"],["Argos","https://github.com/argos-ci/argos"]]}
];
const directions = [
 {id:"biomorphic",name:"Biomorphic",detail:"Pearly, translucent, alive.",swatches:["#eff0e8","#bdd3ce","#dfb4b3"]},
 {id:"editorial",name:"Editorial",detail:"Large type, quiet drama.",swatches:["#efeee9","#262b2a","#a9aa99"]},
 {id:"experimental",name:"Experimental",detail:"Artful systems, high contrast.",swatches:["#f0f1e7","#393a38","#cf5d3f"]}
];
const seedForm={name:"",description:"",url:"",mode:"create",direction:"biomorphic",motion:"cinematic"};
const steps=["Direction","Design system","Motion & 3D","Browser review","Quality gate"];

function useReducedMotion(){
  const [reduced,setReduced]=useState(false);
  useEffect(()=>{const mq=window.matchMedia("(prefers-reduced-motion: reduce)"); const update=()=>setReduced(mq.matches);update();mq.addEventListener?.("change",update);return()=>mq.removeEventListener?.("change",update);},[]);
  return reduced;
}

function Cell({position=[0,0,0],scale=1,color="#b5d2ca",speed=1,seed=0}){
 const group=useRef();const skin=useRef();const core=useRef();
 const geometry=useMemo(()=>new THREE.IcosahedronGeometry(1,5),[]);
 const base=useMemo(()=>Float32Array.from(geometry.attributes.position.array),[geometry]);
 const reduced=useReducedMotion();
 useFrame(({clock,pointer})=>{
  if(!group.current)return;
  const t=clock.getElapsedTime()*speed;
  group.current.rotation.y= reduced?0:t*.07+pointer.x*.12;
  group.current.rotation.x= reduced?0:Math.sin(t*.17+seed)*.12-pointer.y*.08;
  if(skin.current && !reduced){
   const p=geometry.attributes.position;
   for(let i=0;i<p.count;i++){
    const j=i*3,x=base[j],y=base[j+1],z=base[j+2];
    const n=1+.065*Math.sin(x*3.4+t*.47+seed)+.043*Math.cos(z*5-t*.54)+.027*Math.sin(y*8+t*.31);
    p.setXYZ(i,x*n,y*n,z*n);
   }
   p.needsUpdate=true;
   geometry.computeVertexNormals();
  }
  if(core.current&&!reduced) core.current.rotation.z=t*.21;
 });
 useEffect(()=>()=>geometry.dispose(),[geometry]);
 return <Float speed={reduced?0:speed*.9} rotationIntensity={reduced?0:.13} floatIntensity={reduced?0:.36}>
  <group ref={group} position={position} scale={scale}>
   <mesh ref={skin} geometry={geometry}>
    <meshPhysicalMaterial color={color} roughness={.11} metalness={.05} transmission={.79} thickness={2.7} ior={1.22} clearcoat={1} clearcoatRoughness={.09} transparent opacity={.91} iridescence={.5} side={THREE.DoubleSide}/>
   </mesh>
   <mesh scale={.71}><icosahedronGeometry args={[1,3]}/><meshPhysicalMaterial color="#f9f4df" transmission={.6} transparent opacity={.27} roughness={.46} wireframe/></mesh>
   <group ref={core}>
    <mesh scale={.22} position={[.18,.05,.1]}><icosahedronGeometry args={[1,3]}/><meshStandardMaterial color="#eaa29e" emissive="#dc8d7f" emissiveIntensity={.5} roughness={.4}/></mesh>
    <mesh scale={.105} position={[-.27,-.24,.25]}><sphereGeometry args={[1,18,18]}/><meshStandardMaterial color="#a4b5ac" /></mesh>
    <mesh scale={.09} position={[.27,.34,-.16]}><sphereGeometry args={[1,18,18]}/><meshStandardMaterial color="#f2d9a4" /></mesh>
   </group>
  </group>
 </Float>;
}
function Organism({compact=false}){
 const reduced=useReducedMotion();
 return <div className={"organism "+(compact?"organism-compact":"")} aria-label="Abstract translucent animated cellular forms" role="img">
  <Canvas dpr={[1,1.45]} camera={{position:[0,0,7.4],fov:39}} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}} fallback={<div className="organism-fallback">◌</div>}>
   <ambientLight intensity={2.25}/>
   <directionalLight position={[-3,6,5]} intensity={4.2} color="#fffdf6"/>
   <directionalLight position={[3,-3,1]} intensity={1.6} color="#c3d7d7"/>
   <pointLight position={[-3,-3,3]} intensity={15} color="#e8c3bb"/>
   <Suspense fallback={null}>
    <Cell position={compact?[0,0,0]:[.03,.15,0]} scale={compact?1.35:1.4} color="#c7ded6" seed={2}/>
    <Cell position={compact?[-2.3,-1.2,-1]:[-2.45,-1.36,-2]} scale={.58} color="#e8c3bd" speed={.69} seed={5}/>
    <Cell position={compact?[2,1.25,-1]:[2.36,1.42,-2]} scale={.43} color="#cbd8c4" speed={1.22} seed={9}/>
   </Suspense>
   <OrbitControls enableZoom={false} enablePan={false} enableRotate={!reduced} rotateSpeed={.45} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI*2/3}/>
  </Canvas>
  <div className="organism-label">{reduced?"FORM STUDY / STILL":"FORM STUDY / LIVE SIMULATION"}<span className="live-dot"/></div>
 </div>;
}
function Button({children,onClick,secondary=false,className="",type="button",disabled=false}){
 return <button type={type} disabled={disabled} className={(secondary?"btn btn-secondary ":"btn btn-primary ")+className} onClick={onClick}>{children}<ArrowUpRight size={16} strokeWidth={1.8}/></button>;
}
function Header(){
 const [open,setOpen]=useState(false);
 return <header className="header" id="top">
  <a href="#top" className="brand" aria-label="Form Lab home"><span className="brand-symbol"><span/></span><span>FORM<span className="brand-slash">/</span>LAB</span><sup>®</sup></a>
  <nav className={open?"site-nav open":"site-nav"} aria-label="Main navigation">
   <a onClick={()=>setOpen(false)} href="#method">Our method</a>
   <a onClick={()=>setOpen(false)} href="#experiment">The experiment</a>
   <a onClick={()=>setOpen(false)} href="#stack">The stack</a><a onClick={()=>setOpen(false)} href="/build-room">Live builder ↗</a>
  </nav>
  <a className="nav-cta" href="/build-room">OPEN THE STUDIO <ArrowUpRight size={14}/></a>
  <button aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)} className="menu-button">{open?<X/>:<Menu/>}</button>
 </header>;
}
function Hero(){
 return <section className="hero container">
  <div className="hero-copy">
   <div className="overline"><span className="status-pip"/> AN EXPERIMENT IN DIGITAL CRAFT <span className="overline-index">/ 001</span></div>
   <h1>Websites<br/>with a <span className="italic-word">pulse.</span></h1>
   <p className="hero-summary">A new kind of design studio. Art direction, living 3D, cinematic motion and the obsessive eye to make every pixel matter.</p>
   <div className="hero-buttons"><a className="btn btn-primary" href="/build-room">START A PROJECT <ArrowUpRight size={17}/></a><a className="hero-text-link" href="#experiment">EXPLORE THE EXPERIMENT <ArrowDown size={15}/></a></div>
  </div>
  <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><Organism/><div className="side-caption">FIG. 01 — ORGANIC DIGITAL MATTER<br/>REAL-TIME WEBGL EXPERIMENT</div></div>
  <div className="hero-bottom"><span>BUILT FOR THE IMPOSSIBLY PARTICULAR.</span><span className="hero-bottom-center">SCROLL TO EXPLORE <ArrowDown size={14}/></span><span>DESIGN IS NEVER FINISHED.</span></div>
 </section>;
}
function Ticker(){return <div className="ticker"><div className="ticker-track">{Array.from({length:4},(_,i)=><span key={i}>DIRECTION <b>✳</b> DESIGN <b>✳</b> MOTION <b>✳</b> INSPECTION <b>✳</b> REFINEMENT <b>✳</b></span>)}</div></div>}
function Method(){
 const [active,setActive]=useState(0);
 return <section className="method" id="method"><div className="container method-inner">
  <div className="section-head light-head"><div className="section-index">01 / OUR METHOD</div><span>THE PEOPLE BEHIND THE PROCESS. EVEN WHEN THEY'RE AGENTS.</span></div>
  <div className="method-title"><span>Good design isn't</span><br/><em>an accident.</em></div>
  <p className="method-intro">Five specialist roles. One continuous conversation between imagination and evidence. Not just code that runs, but something worth looking at.</p>
  <div className="agents-grid">
   <div className="agents-names" role="tablist" aria-label="Design team">
    {agents.map((agent,i)=><button role="tab" aria-selected={active===i} key={agent.no} className={active===i?"agent-select active":"agent-select"} onClick={()=>setActive(i)}><span>{agent.no}</span><span>{agent.name}</span><ArrowUpRight size={16}/></button>)}
   </div>
   <div className="agent-detail" role="tabpanel">
    <div className="agent-topline"><span>{agents[active].tag}</span><span>ROLE {agents[active].no} / 05</span></div>
    <div className="agent-orbit"><div className="agent-orbit-circle a"/><div className="agent-orbit-circle b"/><div className="agent-orbit-core">{React.createElement(agents[active].icon,{size:33,strokeWidth:1})}</div></div>
    <h3>{agents[active].name}</h3>
    <p>{agents[active].desc}</p>
    <div className="agent-tools"><span>TOOLKIT</span><span>{agents[active].tools}</span></div>
   </div>
  </div>
 </div></section>;
}
function Experiment(){
 const [state,setState]=useState(0);
 const phases=[{no:"01",name:"An encounter",text:"The page doesn't begin with a grid. It begins with a feeling. Three-dimensional forms invite you to come closer."},{no:"02",name:"A conversation",text:"Motion responds to intention. Geometry, depth, and timing become part of the story, not decoration."},{no:"03",name:"A transformation",text:"The experience unfolds in chapters. One shape becomes a space; one interaction becomes a new way in."}];
 return <section className="experiment container" id="experiment">
  <div className="section-head"><div className="section-index">02 / THE EXPERIMENT</div><span>PLAY IS A SERIOUS DESIGN TOOL.</span></div>
  <div className="experiment-head"><h2>Made to be <em>felt.</em></h2><div className="experiment-head-side">AN EXPLORATION OF LIGHT, DEPTH<br/>AND ALMOST-LIVING MATERIAL.</div></div>
  <div className="experiment-stage">
   <div className="experiment-model"><Organism compact/><div className="model-coordinate">X 00.40 / Y 01.08 / Z 02.45</div></div>
   <div className="experiment-panel">
    <div className="experiment-mini">A STUDY IN PRESENCE <span>→ 03 STATES</span></div>
    <div className="phase-number">{phases[state].no}<span>/03</span></div>
    <h3>{phases[state].name}</h3><p>{phases[state].text}</p>
    <div className="phase-controls">{phases.map((p,i)=><button aria-label={"View phase "+p.no} aria-pressed={state===i} onClick={()=>setState(i)} className={state===i?"phase-dot active":"phase-dot"} key={p.no}/>)}</div>
    <div className="phase-footnote">LIVE 3D OBJECT • DRAG TO EXPLORE <span className="rotating-arrow"><RotateCcw size={15}/></span></div>
   </div>
  </div>
 </section>;
}
function createSpec(form){
 const title=form.name.trim()||"Untitled experiment";
 const direction=directions.find(x=>x.id===form.direction)||directions[0];
 const scope=form.mode==="reconstruct"?"Reconstruction":"Original design";
 const id=(typeof crypto!=="undefined" && crypto.randomUUID)?crypto.randomUUID():"brief-"+Date.now();
 return {id,version:"0.1",createdAt:new Date().toISOString(),title,scope,description:form.description.trim()||"A distinctive, highly crafted digital experience.",referenceUrl:form.url.trim(),artDirection:{preset:direction.name,description:direction.detail,palette:direction.swatches},motion:form.motion,technology:["React","GSAP","React Three Fiber","Drei","Playwright"],acceptanceCriteria:["Distinctive, coherent visual language","Desktop and mobile responsive layouts","Keyboard navigation and visible focus states","Reduced-motion and WebGL fallbacks","Browser-tested interactions","Documented visual review and performance checks"],agentHandoffs:agents.map((a,i)=>({order:i+1,role:a.name,brief:a.desc,status:"planned"})),status:"Brief compiled; implementation agents not yet connected"};
}
function exportJSON(value){const blob=new Blob([JSON.stringify(value,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const anchor=document.createElement("a");anchor.href=url;anchor.download="formlab-"+(value.title||"brief").toLowerCase().replace(/[^a-z0-9]+/g,"-")+".json";anchor.click();URL.revokeObjectURL(url);}
function Workbench(){
 const [form,setForm]=useState(seedForm),[saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem("formlab-projects")||"[]")}catch{return[]}}),[result,setResult]=useState(null),[copied,setCopied]=useState(false),[showSaved,setShowSaved]=useState(false);
 const update=(key,value)=>setForm(v=>({...v,[key]:value}));
 const submit=(e)=>{e.preventDefault();const spec=createSpec(form);setResult(spec);setSaved(prev=>[spec,...prev].slice(0,30));setShowSaved(false);window.setTimeout(()=>document.getElementById("brief-output")?.scrollIntoView({behavior:"smooth",block:"nearest"}),80);};
 useEffect(()=>{try{localStorage.setItem("formlab-projects",JSON.stringify(saved))}catch{}},[saved]);
 const copy=async()=>{if(!result)return;try{await navigator.clipboard.writeText(JSON.stringify(result,null,2));setCopied(true);setTimeout(()=>setCopied(false),2200);}catch{exportJSON(result);}};
 return <section className="workbench-wrap" id="workbench"><div className="container">
  <div className="section-head"><div className="section-index">03 / YOUR WORKSPACE</div><span>AN IDEA IS THE BEGINNING OF A SYSTEM.</span></div>
  <div className="workbench-intro"><h2>Let's make<br/><em>something matter.</em></h2><p>Give the studio a starting point. We'll turn it into a structured design brief and handoff plan. The agent execution layer is the next build milestone.</p></div>
  <div className="workbench-card">
   <div className="wb-card-bar"><div><span className="wb-roundel">✳</span><strong>BRIEF COMPILER</strong><span className="badge">WORKING PROTOTYPE</span></div><button className="saved-switch" onClick={()=>setShowSaved(!showSaved)}><LayoutGrid size={14}/>{showSaved?"BACK TO BUILDER":"SAVED BRIEFS ("+saved.length+")"}</button></div>
   {showSaved?<div className="saved-area">{saved.length===0?<div className="empty-saved"><CircleHelp size={30}/><h3>Nothing saved. Yet.</h3><p>Your briefs will be stored on this device when you compile them.</p></div>:saved.map(x=><button key={x.id} className="saved-row" onClick={()=>{setResult(x);setShowSaved(false);}}><span><strong>{x.title}</strong><small>{x.scope} · {new Date(x.createdAt).toLocaleDateString()}</small></span><ArrowUpRight size={20}/></button>)}<p className="storage-note">SAVED LOCALLY IN THIS BROWSER. NO CLOUD SYNC YET.</p></div>:
   <div className="wb-grid">
    <form className="brief-form" onSubmit={submit}>
     <div className="form-section-title"><span>01</span> THE BASICS</div>
     <label className="field-label" htmlFor="pname">Project name <span>OPTIONAL</span></label>
     <input id="pname" maxLength={80} placeholder="Something extraordinary..." value={form.name} onChange={e=>update("name",e.target.value)}/>
     <label className="field-label" htmlFor="pdesc">Tell us about the idea <span>YOUR NORTH STAR</span></label>
     <textarea id="pdesc" rows={4} maxLength={1200} placeholder="An editorial portfolio where ideas live and breathe..." value={form.description} onChange={e=>update("description",e.target.value)}/>
     <div className="form-section-title mt"><span>02</span> THE APPROACH</div>
     <div className="mode-switch" aria-label="Project approach">{[["create","ORIGINAL EXPERIENCE"],["reconstruct","RECONSTRUCT REFERENCE"]].map(([value,label])=><button type="button" key={value} onClick={()=>update("mode",value)} aria-pressed={form.mode===value} className={form.mode===value?"selected":""}>{label}</button>)}</div>
     {form.mode==="reconstruct"&&<><label className="field-label" htmlFor="purl">Reference website URL</label><input id="purl" type="url" value={form.url} onChange={e=>update("url",e.target.value)} placeholder="https://example.com"/></>}
     <div className="form-section-title mt"><span>03</span> CREATIVE DIRECTION</div>
     <div className="directions">{directions.map(d=><button key={d.id} type="button" aria-pressed={form.direction===d.id} className={form.direction===d.id?"direction selected":"direction"} onClick={()=>update("direction",d.id)}><div className="swatch-line">{d.swatches.map((s,i)=><i key={i} style={{background:s}}/>)}</div><strong>{d.name}</strong><small>{d.detail}</small></button>)}</div>
     <label className="field-label motion-label" htmlFor="pmotion">Motion character <span>{form.motion.toUpperCase()}</span></label>
     <input id="pmotion" className="motion-range" type="range" min="0" max="2" step="1" value={["minimal","considered","cinematic"].indexOf(form.motion)} onChange={e=>update("motion",["minimal","considered","cinematic"][Number(e.target.value)])}/><div className="range-labels"><span>MINIMAL</span><span>CONSIDERED</span><span>CINEMATIC</span></div>
     <button type="submit" className="compile-button">COMPILE DESIGN BRIEF <ArrowUpRight size={18}/></button>
    </form>
    <aside className="brief-side"><div className="brief-side-head"><span>THE STUDIO PROCESS</span><span>05 STAGES</span></div><div className="progress-orbit"><span>✳</span><div className="ring ring-a"/><div className="ring ring-b"/></div><div className="stage-list">{steps.map((s,i)=><div key={s} className="stage"><span>0{i+1}</span><span>{s}</span><span className="stage-indicator">↗</span></div>)}</div><p className="brief-note"><CheckCircle2 size={15}/> Your brief is compiled locally. AI agents and remote browser inspection are not yet connected.</p></aside>
   </div>}
  </div>
  {result&&!showSaved&&<div className="brief-result" id="brief-output" aria-live="polite"><div className="result-head"><span><CheckCircle2 size={17}/> YOUR SPECIFICATION IS READY</span><span>FORM / LAB — V0.1</span></div><div className="result-body"><div><div className="result-caption">PROJECT  /  {result.scope.toUpperCase()}</div><h3>{result.title}</h3><p>{result.description}</p><div className="result-tags"><span>{result.artDirection.preset}</span><span>{result.motion} motion</span><span>5 agent handoffs</span></div></div><div className="result-actions"><button onClick={()=>exportJSON(result)}><Download size={15}/> DOWNLOAD JSON</button><button onClick={copy}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?"COPIED":"COPY SPEC"}</button></div></div><div className="result-foot">NEXT: CONNECT AGENT EXECUTION + LIVE BROWSER AUDITS. THIS IS A WORKING SPEC GENERATOR, NOT AN AI WEBSITE BUILDER YET.</div></div>}
 </div></section>;
}
function Stack(){
 return <section className="stack-section container" id="stack"><div className="section-head"><div className="section-index">04 / UNDER THE HOOD</div><span>GOOD TOOLS. BETTER TASTE.</span></div><div className="stack-header"><h2>Built on the<br/><em>shoulders of giants.</em></h2><p>Open technologies selected to work together. The goal isn't more tools; it's a more considered way to use them.</p></div>
 <div className="stack-grid">{stack.map((group,i)=><div className="stack-column" key={group.category}><div className="stack-col-index">0{i+1} / {group.category.toUpperCase()}</div>{group.links.map(([name,url])=><a key={name} href={url} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={17}/></a>)}</div>)}</div>
 <div className="stack-bottom"><span>DESIGNED TO WORK WITH GITHUB + VERCEL</span><span>OPEN TO CHANGE. BUILT TO LAST.</span></div>
 </section>;
}
function Footer(){return <footer className="footer"><div className="container"><div className="footer-top"><span>THE NEXT IDEA STARTS HERE.</span><a href="#workbench">ENTER THE STUDIO <ArrowUpRight size={19}/></a></div><div className="footer-big">FORM<span>/</span>LAB<span className="footer-star">✳</span></div><div className="footer-bottom"><span>© 2026 FORM/LAB — EXPERIMENTAL FRONTEND DESIGN OS</span><a href="#top">BACK TO THE TOP ↑</a><span>MADE OF IDEAS, LIGHT & CODE.</span></div></div></footer>}
function App(){
 const reduced=useReducedMotion();
 useEffect(()=>{if(reduced)return;const lenis=new Lenis({duration:1.1,smoothWheel:true});let running=true;const raf=t=>{if(!running)return;lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf);lenis.on("scroll",ScrollTrigger.update);return()=>{running=false;lenis.destroy()};},[reduced]);
 useEffect(()=>{if(reduced)return;const ctx=gsap.context(()=>{gsap.utils.toArray(".section-head, .method-title, .method-intro, .experiment-head, .workbench-intro, .stack-header").forEach(el=>gsap.fromTo(el,{autoAlpha:.45,y:28},{autoAlpha:1,y:0,duration:.85,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}}));});return()=>ctx.revert();},[reduced]);
 return <><Header/><main><Hero/><Ticker/><Method/><Experiment/><Workbench/><Stack/></main><Footer/></>;
}
createRoot(document.getElementById("root")).render(<React.StrictMode>{window.location.pathname==="/build-room"?<Room/>:<App/>}</React.StrictMode>);
