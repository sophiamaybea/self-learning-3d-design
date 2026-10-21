import React, {useState,useEffect,useRef,useMemo} from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, ArrowUp, ArrowUpRight, PanelLeft, Files, Monitor, Smartphone, Code2, Activity, Eye, Download, RotateCcw, CircleHelp, Check, Copy, ChevronsUpDown, ChevronRight, FolderOpen, FileCode2, FileText, SquareTerminal, Globe2, ShieldCheck, Sparkles, Menu, X, ExternalLink, ListChecks, Clock3, CircleDot, Github, Plus, FileSearch, Info } from "lucide-react";
import "./emergent.css";

const STORAGE="formlab-build-room-v1";
const safe=x=>String(x||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const starters=[
 ["A considered portfolio","Create a modern editorial portfolio for a creative studio called Aline."],
 ["A product landing page","Create an elegant online stationery shop called Folio, with warm neutrals."],
 ["An analytics dashboard","Build a minimalist analytics dashboard for a sustainable business."]
];
function makeTemplate(input, overrides={}){
 const lower=(input||"").toLowerCase();
 const theme=overrides.dark??(/dark|midnight|black background/.test(lower));
 const type=/portfolio|studio|creative|photograph|architect/.test(lower)?"portfolio":/shop|store|product|stationery|ecommerce/.test(lower)?"shop":/dashboard|analytics|metric|data/.test(lower)?"dashboard":"studio";
 const found=(input||"").match(/(?:called|named|for)\s+([a-z][a-z0-9 -]{1,26})/i);
 const title=overrides.title||(found?found[1].trim().replace(/[.?!].*$/,""):{portfolio:"Aline",shop:"Folio",dashboard:"Northstar",studio:"Open Form"}[type]);
 let accent=overrides.accent||(theme?"#cce4d8":({portfolio:"#b78b73",shop:"#8c9d80",dashboard:"#849edb",studio:"#ac8e76"}[type]));
 const headline=overrides.headline||({portfolio:"Ideas made tangible.",shop:"Objects for slower days.",dashboard:"See the bigger picture.",studio:"A world worth making."}[type]);
 const subline={portfolio:"Independent design, digital experiences and visual identities that stay with you.",shop:"Useful little things, thoughtful shapes, and everyday rituals made beautiful.",dashboard:"Your work, in focus. A gentler way to understand what matters.",studio:"A place for thoughtful stories, considered ideas and beautiful digital craft."}[type];
 const labels={portfolio:["Selected work","Our approach","Get in touch"],shop:["The collection","Our story","Journal"],dashboard:["Overview","Insights","Settings"],studio:["Discover","What we do","Contact"]}[type];
 const bg=theme?"#131715":"#f7f6f0",fg=theme?"#f3f2ec":"#1e2824",muted=theme?"#abb7ad":"#738179",card=theme?"#202723":"#e8ece5";
 return '<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:"><title>'+safe(title)+'</title><style>'
 +'*,*:before,*:after{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:Arial,Helvetica,sans-serif;background:'+bg+';color:'+fg+';-webkit-font-smoothing:antialiased}header{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:30px 5vw;border-bottom:1px solid '+muted+'44}header b{font-size:22px;letter-spacing:-1.4px}.circle{color:'+accent+'}nav{display:flex;gap:26px;font-size:12px}nav a{color:inherit;text-decoration:none;opacity:.77}.label{font-size:10px;letter-spacing:2px;font-weight:bold;color:'+accent+'}main{min-height:73vh;padding:11vh 5vw 10vh;position:relative;overflow:hidden}.shape{position:absolute;z-index:0;right:-10%;top:0;width:50vw;aspect-ratio:1;border-radius:45% 55% 69% 31%/62% 44% 56% 38%;background:radial-gradient(circle at 35% 26%,'+accent+'ab,transparent 60%),'+card+';filter:blur(2px);transform:rotate(-22deg)}main>*:not(.shape){position:relative;z-index:1}h1{font-size:clamp(45px,8vw,116px);line-height:1;letter-spacing:-.08em;font-weight:500;max-width:930px;margin:35px 0 25px}main p{font-size:16px;line-height:1.8;max-width:435px;color:'+muted+'}button,.button{margin-top:22px;background:'+fg+';color:'+bg+';border:0;font-size:11px;letter-spacing:1px;padding:17px 25px;display:inline-block;text-decoration:none}.features{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:0 5vw 60px}.tile{min-height:230px;background:'+card+';padding:28px;display:flex;flex-direction:column;justify-content:space-between}.tile i{font-style:normal;color:'+accent+';font-size:40px}.tile h2{font-size:22px;letter-spacing:-.05em;font-weight:500;margin-bottom:0}footer{padding:30px 5vw;border-top:1px solid '+muted+'44;font-size:11px;color:'+muted+';display:flex;justify-content:space-between}@media(max-width:680px){header{padding:22px}nav a:not(:first-child){display:none}main{padding:110px 22px 60px;min-height:610px}.shape{width:85vw;right:-43%;top:2%}h1{font-size:clamp(55px,12vw,80px)}.features{grid-template-columns:1fr;padding:0 22px 40px}.tile{min-height:150px}}'
 +'</style></head><body><header><b>'+safe(title)+'<span class="circle">.</span></b><nav>'+labels.map((x,i)=>'<a href="#'+i+'">'+safe(x)+'</a>').join("")+'</nav></header><main><div class="shape" aria-hidden="true"></div><div class="label">INDEPENDENT BY DESIGN / 2026</div><h1>'+safe(headline)+'</h1><p>'+safe(subline)+'</p><a class="button" href="#content">'+safe(overrides.button||"EXPLORE OUR WORLD")+' &nearr;</a></main><section class="features" id="content"><div class="tile"><i>✳</i><h2>Attention to detail</h2></div><div class="tile"><i>↗</i><h2>A considered approach</h2></div><div class="tile"><i>◌</i><h2>Made for people</h2></div></section><footer><span>© '+safe(title)+'</span><span>Made with care.</span></footer></body></html>';
}
function mutate(input,prev,overrides){
 const msg=input.toLowerCase(),changes={...overrides};
 const colours={pink:"#c983a7",blue:"#608fc4",green:"#6e9879",orange:"#c68159",red:"#be6260",purple:"#957cbd",yellow:"#be9b45",coral:"#d88872",teal:"#488e8d"};
 const hex=input.match(/#[0-9a-f]{6}\b/i);
 if(hex)changes.accent=hex[0];else for(const [name,value] of Object.entries(colours)) if(new RegExp('\\b'+name+'\\b').test(msg)){changes.accent=value;break;}
 if(/dark|black background|dark mode/.test(msg))changes.dark=true;
 if(/light|white background|light mode/.test(msg))changes.dark=false;
 const headline=input.match(/(?:headline|heading)\s+(?:to|as|is|:)\s*["“']?(.{4,85}?)[”"']?\s*$/i);
 if(headline)changes.headline=headline[1];
 const cta=input.match(/(?:button|cta)\s+(?:text|label)\s+(?:to|as|is|:)\s*["“']?(.{2,40}?)[”"']?\s*$/i);
 if(cta)changes.button=cta[1];
 const title=input.match(/(?:rename|name the site|site name)\s+(?:to|as|:)?\s*(.{3,30})$/i);
 if(title)changes.title=title[1];
 return changes;
}
function initial(){
 try{const x=JSON.parse(localStorage.getItem(STORAGE)||"null");if(x && Array.isArray(x.messages))return x;}catch{}
 return {name:"Untitled project",prompt:"",overrides:{},html:"",messages:[{role:"system",content:"Welcome to the build room. Describe an app or website to generate an editable, local HTML prototype. This demo uses rule-based generation, not a connected AI coding agent."}],events:[],version:0};
}
function Label({children}){return <span className="bw-label">{children}</span>}
function Room(){
 const [data,setData]=useState(initial),[entry,setEntry]=useState(""),[tab,setTab]=useState("preview"),[device,setDevice]=useState("desktop"),[selected,setSelected]=useState("chat"),[showTree,setShowTree]=useState(true),[showInfo,setShowInfo]=useState(false),[info,setInfo]=useState(""),[copied,setCopied]=useState(false);
 const end=useRef(null);
 useEffect(()=>{try{localStorage.setItem(STORAGE,JSON.stringify(data))}catch{}},[data]);
 useEffect(()=>{end.current?.scrollIntoView({behavior:"smooth",block:"end"})},[data.messages.length]);
 function say(){
  const text=entry.trim();if(!text)return;
  const isNew=!data.html,overrides=isNew?{}:mutate(text,data.prompt,data.overrides);
  const html=makeTemplate(isNew?text:data.prompt,overrides);
  const event={time:new Date().toLocaleTimeString(),kind:isNew?"created":"modified",detail:isNew?"Generated standalone index.html from selected template":"Applied supported visual rules and refreshed iframe"};
  setData(p=>({...p,name:isNew?(text.match(/(?:called|named)\s+([a-z][a-z0-9 -]{1,26})/i)?.[1]||"Untitled project").replace(/[.?!].*$/,""):p.name,prompt:isNew?text:p.prompt,overrides,html,version:p.version+1,messages:[...p.messages,{role:"user",content:text},{role:"system",content:isNew?"Created an original responsive HTML design with an editable source file and live preview. This is a deterministic local template, not an autonomous AI generation.":"Updated the local preview using the rule-based styling engine. Supported: colour names, hex colours, dark/light mode, headline, button label and site name."}],events:[event,...p.events].slice(0,100)}));
  setEntry("");setTab("preview");setSelected("preview");
 }
 function reset(){if(!window.confirm("Reset this local project and conversation?"))return;setData({name:"Untitled project",prompt:"",overrides:{},html:"",messages:[{role:"system",content:"Project reset. Describe a website to begin."}],events:[],version:0});setTab("preview");}
 function openModal(message){setInfo(message);setShowInfo(true);}
 function download(){if(!data.html)return;const blob=new Blob([data.html],{type:"text/html;charset=utf-8"});const link=document.createElement("a");const url=URL.createObjectURL(blob);link.href=url;link.download=(data.name||"prototype").toLowerCase().replace(/[^a-z0-9]+/g,"-")+".html";link.click();URL.revokeObjectURL(url);}
 async function copy(){try{await navigator.clipboard.writeText(data.html);setCopied(true);setTimeout(()=>setCopied(false),1700);}catch{openModal("Clipboard access was unavailable. Use Download HTML instead.");}}
 const labelName=data.name.length>25?data.name.slice(0,25)+"…":data.name;
 return <div className="bw-app">
  <header className="bw-top">
    <a href="/" className="bw-logo"><div className="bw-mark">✳</div><b>FORM<span>/</span>LAB</b><small>BUILD ROOM</small></a>
    <div className="bw-top-project"><div className="bw-pulse"/><span>{labelName}</span><ChevronsUpDown size={13}/><span className="bw-top-divider"/><span className="bw-runtime">LOCAL DEMO · V0.2</span></div>
    <div className="bw-top-actions"><button onClick={()=>setShowTree(!showTree)} title="Toggle file navigation"><PanelLeft size={16}/></button><button onClick={()=>openModal("Real agent execution and production publishing are not connected. The current version generates local HTML safely without running shell commands.")} className="bw-publish">PUBLISH <ArrowUpRight size={15}/></button><a href="/" title="Return to Form Lab"><X size={17}/></a></div>
  </header>
  <div className="bw-body">
   {showTree&&<aside className="bw-rail">
     <div className="bw-rail-inner">
      <button onClick={()=>{setSelected("chat");setTab("preview")}} className={selected==="chat"?"active":""} title="Conversation"><Sparkles size={17}/></button>
      <button onClick={()=>{setSelected("preview");setTab("preview")}} className={selected==="preview"?"active":""} title="Live preview"><Monitor size={17}/></button>
      <button onClick={()=>{setSelected("code");setTab("code")}} className={selected==="code"?"active":""} title="Code"><Files size={17}/></button>
      <button onClick={()=>{setSelected("activity");setTab("activity")}} className={selected==="activity"?"active":""} title="Activity"><Activity size={17}/></button>
      <button onClick={()=>{setSelected("evidence");setTab("evidence")}} className={selected==="evidence"?"active":""} title="Research"><FileSearch size={17}/></button>
     </div>
     <div className="bw-rail-bottom"><button onClick={()=>openModal("This design reconstructs publicly documented product interaction patterns. It is not Emergent's source code or an Emergent service.")} title="About the project"><CircleHelp size={18}/></button></div>
    </aside>}
   <section className={"bw-chat "+(selected==="chat"?"bw-chat-visible":"")}>
    <div className="bw-chat-head"><div><span className="bw-chat-dot"/> BUILDER CONVERSATION</div><button onClick={reset} title="Clear and start over"><RotateCcw size={15}/></button></div>
    <div className="bw-chat-scroll">
     <div className="bw-agent-intro"><div className="bw-agent-icon">✳</div><Label>FORM/LAB BUILDER</Label><h1>What will you<br/><em>make today?</em></h1><p>An independent exploration of the prompt-to-preview workspace pattern. Create a small, editable prototype in your browser.</p><div className="bw-mode-pill"><span className="bw-mode-dot"/> RULE-BASED DEMO ENGINE</div></div>
     {data.messages.map((m,i)=><div className={"bw-message "+(m.role==="user"?"bw-user":"bw-system")} key={i}>{m.role==="system"&&<span className="bw-message-avatar">✳</span>}<div className="bw-message-text">{m.content}</div></div>)}
     {data.version>0&&<div className="bw-complete"><Check size={14}/> PREVIEW READY · REVISION {String(data.version).padStart(2,"0")}</div>}
     <div ref={end}/>
    </div>
    <div className="bw-chat-entry">
     {!data.html&&<div className="bw-starters">{starters.map(([name,prompt])=><button key={name} onClick={()=>setEntry(prompt)}>{name}<ArrowUpRight size={12}/></button>)}</div>}
     <form onSubmit={e=>{e.preventDefault();say();}}><textarea value={entry} onChange={e=>setEntry(e.target.value)} placeholder={data.html?"Describe an adjustment… e.g. make it dark or change the accent to blue":"Describe what you want to build…"} rows={3} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();say()}}} aria-label="Describe your website"/><div className="bw-entry-bottom"><div><span className="bw-mini-orb">✳</span> Local prototype engine <ChevronRight size={12}/></div><button type="submit" disabled={!entry.trim()} title="Generate or modify prototype"><ArrowUp size={18}/></button></div></form>
     <div className="bw-chat-disclaimer">No external AI calls · No paid credits · Nothing is published</div>
    </div>
   </section>
   <section className={"bw-work "+(selected==="chat"?"bw-work-hidden-mobile":"")}>
    <div className="bw-work-top">
     <div className="bw-tabs">{[["preview",Monitor,"Preview"],["code",Code2,"Code"],["activity",SquareTerminal,"Activity"],["evidence",FileSearch,"Research"]].map(([id,Icon,name])=><button key={id} className={tab===id?"active":""} onClick={()=>{setTab(id);setSelected(id);}}><Icon size={14}/>{name}</button>)}</div>
     <div className="bw-work-status"><span/><span>{data.html?"RENDERED":"AWAITING BRIEF"}</span></div>
    </div>
    {tab==="preview"&&<><div className="bw-preview-tools"><div className="bw-breadcrumb">WORKSPACE <ChevronRight size={12}/> index.html <span>· PREVIEW</span></div><div className="bw-device-actions"><button title="Desktop" aria-pressed={device==="desktop"} className={device==="desktop"?"active":""} onClick={()=>setDevice("desktop")}><Monitor size={16}/></button><button title="Mobile" aria-pressed={device==="mobile"} className={device==="mobile"?"active":""} onClick={()=>setDevice("mobile")}><Smartphone size={15}/></button><span/><button onClick={download} disabled={!data.html} title="Download generated HTML"><Download size={16}/></button></div></div>
     <div className="bw-preview-stage">{data.html?<div className={"bw-preview-frame "+(device==="mobile"?"bw-preview-mobile":"")}><div className="bw-framebar"><span className="bw-browser-buttons">● ● ●</span><span>local-preview.formlab</span><span>⌁</span></div><iframe title="Sandboxed website preview" sandbox="" srcDoc={data.html}/></div>:<div className="bw-empty"><div className="bw-empty-orbit">✳<i/><i/></div><h2>Your next idea,<br/><em>taking shape.</em></h2><p>Describe a website on the left. Its first iteration will appear here, ready to inspect and edit.</p><span>LIVE PREVIEW / WAITING FOR A PROMPT</span></div>}</div>
     <div className="bw-panel-foot"><span><CircleDot size={12}/> ISOLATED BROWSER PREVIEW · SCRIPT EXECUTION DISABLED</span><span>FORM/LAB V0.2</span></div></>}
    {tab==="code"&&<div className="bw-code-layout"><div className="bw-files"><div><FolderOpen size={14}/> PROJECT FILES</div><span><FileCode2 size={14}/> index.html</span><small>1 LOCAL FILE</small></div><div className="bw-code-editor"><div className="bw-codebar"><span><FileCode2 size={14}/> index.html <i>EDITABLE</i></span><button onClick={copy} disabled={!data.html}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?"COPIED":"COPY CODE"}</button></div><textarea spellCheck={false} aria-label="Edit generated HTML" placeholder="Generated source code will appear here…" value={data.html} onChange={e=>setData(p=>({...p,html:e.target.value,events:[{time:new Date().toLocaleTimeString(),kind:"edited",detail:"Edited index.html directly"},...p.events].slice(0,100)}))}/><div className="bw-codefoot">EDIT SOURCE HERE. PREVIEW RE-RENDERS AS YOU TYPE. REMOTE SCRIPTS ARE BLOCKED IN THE PREVIEW.</div></div></div>}
    {tab==="activity"&&<div className="bw-activity"><div className="bw-activity-title"><Activity size={19}/> Local task activity <span>{data.events.length} EVENTS</span></div><p>This is a record of actual browser-local actions. It is not a simulated model's reasoning or a remote build log.</p>{data.events.length===0?<div className="bw-activity-empty"><Clock3 size={30}/><h3>No jobs yet.</h3><p>Generate your first design to start a local event log.</p></div>:data.events.map((e,i)=><div className="bw-event" key={i}><span className="bw-event-icon">{e.kind==="created"?<Plus size={15}/>:e.kind==="edited"?<Code2 size={15}/>:<Check size={15}/>}</span><div><strong>{e.kind==="created"?"File created":e.kind==="edited"?"Source edited":"Design updated"}</strong><p>{e.detail}</p></div><time>{e.time}</time></div>)}</div>}
    {tab==="evidence"&&<div className="bw-evidence"><div className="bw-evidence-heading"><Label>REVERSE ENGINEERING / PUBLIC SOURCES</Label><h2>How Emergent<br/><em>actually works.</em></h2><p>Publicly documented behaviour, not private source-code access. These findings shape our independent implementation.</p></div><div className="bw-evidence-grid">{[
     {title:"01 / THE LOOP",body:"Prompt → agent writes/tests → isolated preview → iteration → explicit publish.",url:"https://help.emergent.sh/the-chat-to-deployment-flow",label:"Emergent process"},
     {title:"02 / THE INTERFACE",body:"Persistent chat, live preview, files, logs, secrets, deployments and version controls.",url:"https://help.emergent.sh/a-tour-of-the-workspace",label:"Workspace docs"},
     {title:"03 / THE INFRASTRUCTURE",body:"The company describes isolated Kubernetes pods, filesystem restores, operational sidecars and a preview proxy.",url:"https://emergent.sh/blog/real-environments-for-ai-agents-and-why-we-bet-on-kubernetes",label:"Engineering article"},
     {title:"04 / THE AGENTS",body:"A main planning agent uses tools and may delegate narrow tasks to specialist sub-agents.",url:"https://help.emergent.sh/main-agents-in-emergent",label:"Agent architecture"}
     ].map(a=><a href={a.url} target="_blank" rel="noopener noreferrer" className="bw-evidence-card" key={a.title}><Label>{a.title}</Label><p>{a.body}</p><div>{a.label}<ArrowUpRight size={16}/></div></a>)}</div><div className="bw-evidence-warning"><ShieldCheck size={20}/><div><strong>Evidence boundary</strong><p>No login-only flows, hidden APIs, internal source, private assets or proprietary agent prompts were accessed. This workspace is an original prototype informed by public product patterns.</p></div></div></div>}
   </section>
  </div>
  {showInfo&&<div className="bw-modal-backdrop" role="presentation" onClick={()=>setShowInfo(false)}><div className="bw-modal" role="dialog" aria-modal="true" aria-label="Build room information" onClick={e=>e.stopPropagation()}><button className="bw-modal-close" onClick={()=>setShowInfo(false)} aria-label="Close"><X size={18}/></button><Info size={25}/><h2>Not connected yet</h2><p>{info}</p><button className="bw-modal-ok" onClick={()=>setShowInfo(false)}>UNDERSTOOD <ArrowUpRight size={14}/></button></div></div>}
 </div>;
}
export default Room;
