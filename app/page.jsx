"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, Github, Instagram, Mail, Menu, Sparkles, X } from "lucide-react";

const projects=[
 {no:"01",title:"Hyundai Sunset Road",type:"Digital Experience",desc:"A full digital showroom experience — cars, promotions, test drives, leads, and a polished mobile-first journey.",tags:["Next.js","Supabase","UX/UI"],accent:"lime",visual:"hyundai"},
 {no:"02",title:"PlayMart",type:"Product / Commerce",desc:"A modern top-up marketplace concept with product discovery, checkout, payment states, and account flows.",tags:["React","Tailwind","Railway"],accent:"violet",visual:"playmart"},
 {no:"03",title:"Private Lab",type:"R&D / Experiments",desc:"A private playground for interfaces, dashboards, motion studies, mini tools, and weird little ideas.",tags:["React","Motion","Prototyping"],accent:"blue",visual:"lab"}
];

const skills=["NEXT.JS","REACT","TAILWIND","BOOTSTRAP","SUPABASE","RAILWAY","UI/UX","MOTION","PRODUCT","SYSTEMS"];

function Magnetic({children,className="",onClick}) {
 const ref=useRef(null);
 const move=e=>{const r=ref.current?.getBoundingClientRect();if(!r)return;const x=(e.clientX-r.left-r.width/2)*.18,y=(e.clientY-r.top-r.height/2)*.18;ref.current.style.transform=`translate(${x}px,${y}px)`};
 const leave=()=>{if(ref.current)ref.current.style.transform=""};
 return <button ref={ref} onPointerMove={move} onPointerLeave={leave} onClick={onClick} className={className}>{children}</button>;
}

function ProjectCard({project}) {
 const ref=useRef(null);
 const move=e=>{const r=ref.current?.getBoundingClientRect();if(!r)return;const x=((e.clientX-r.left)/r.width)*100,y=((e.clientY-r.top)/r.height)*100;ref.current.style.setProperty("--mx",`${x}%`);ref.current.style.setProperty("--my",`${y}%`);};
 const leave=()=>{if(ref.current){ref.current.style.setProperty("--mx","50%");ref.current.style.setProperty("--my","50%");}};
 return <article ref={ref} onPointerMove={move} onPointerLeave={leave} className="project-card reveal-up group" data-reveal>
   <div className={`project-visual project-${project.visual}`}>
    <div className="project-light"/>
    <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-[10px] font-bold tracking-[.16em] text-white/80 backdrop-blur-xl"><span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_white]"/>PROJECT {project.no}</div>
    <div className="mock-window">
      <div className="mock-top"><span/><span/><span/><b>{project.title}</b></div>
      <div className="mock-body">
       <div className="mock-copy"><small>{project.type}</small><strong>{project.title}</strong><em>Designed to feel fast.</em></div>
       <div className="mock-widget"><div className="widget-line"/><div className="widget-line short"/><div className="widget-big"/></div>
      </div>
    </div>
    <div className="absolute bottom-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-2xl transition duration-500 group-hover:rotate-12 group-hover:scale-110"><ArrowUpRight size={18}/></div>
   </div>
   <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[.9fr_1.15fr_auto] lg:items-end">
    <div><p className="tiny-label">{project.type}</p><h3 className="display mt-2 text-3xl leading-none sm:text-4xl">{project.title}</h3></div>
    <p className="max-w-xl text-sm leading-7 text-white/45">{project.desc}</p>
    <div className="flex flex-wrap gap-2 lg:justify-end">{project.tags.map(t=><span key={t} className="chip">{t}</span>)}</div>
   </div>
 </article>
}

export default function Home(){
 const [menu,setMenu]=useState(false); const [copied,setCopied]=useState(false); const [role,setRole]=useState(0); const [progress,setProgress]=useState(0);
 const roles=["digital products","interfaces","web experiences","things that feel good"];
 const nav=id=>{setMenu(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"})};
 useEffect(()=>{
  const onScroll=()=>{const d=document.documentElement;setProgress((window.scrollY/(d.scrollHeight-window.innerHeight))*100)};
  const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("is-visible")),{threshold:.12});
  document.querySelectorAll("[data-reveal]").forEach(el=>observer.observe(el));
  window.addEventListener("scroll",onScroll,{passive:true});onScroll();
  return()=>{observer.disconnect();window.removeEventListener("scroll",onScroll)};
 },[]);
 useEffect(()=>{const id=setInterval(()=>setRole(v=>(v+1)%roles.length),2600);return()=>clearInterval(id)},[]);
 useEffect(()=>{const el=document.documentElement;const move=e=>{el.style.setProperty("--cx",e.clientX+"px");el.style.setProperty("--cy",e.clientY+"px")};window.addEventListener("pointermove",move,{passive:true});return()=>window.removeEventListener("pointermove",move)},[]);
 const copy=async()=>{try{await navigator.clipboard.writeText("hello@kimrayy.dev");setCopied(true);setTimeout(()=>setCopied(false),1500)}catch{}};
 return <main className="portfolio">
  <div className="progress" style={{width:`${progress}%`}}/>
  <div className="cursor-glow"/>
  <header className="site-nav">
   <div className="nav-wrap">
    <button onClick={()=>nav("home")} className="brand"><span className="brand-mark">K</span><span>KIMRAYY<span className="brand-dot">.</span></span></button>
    <nav className="desktop-nav">{["work","about","stack","contact"].map((x,i)=><button key={x} onClick={()=>nav(x)}><span>0{i+1}</span>{x}</button>)}</nav>
    <div className="nav-right"><span className="availability"><i/>Available</span><Magnetic onClick={()=>nav("contact")} className="talk-btn">Let's talk <ArrowUpRight size={14}/></Magnetic><button onClick={()=>setMenu(true)} className="menu-btn" aria-label="Open menu"><Menu size={18}/></button></div>
   </div>
  </header>

  {menu&&<div className="mobile-menu"><div className="mobile-menu-top"><span className="brand-mini">KIMRAYY.</span><button onClick={()=>setMenu(false)} className="menu-btn"><X size={18}/></button></div><div className="mobile-links">{["home","work","about","stack","contact"].map((x,i)=><button key={x} onClick={()=>nav(x)}><span>0{i+1}</span>{x}</button>)}</div><div className="mobile-note">Independent designer / developer<br/>Bali ↗ Worldwide</div></div>}

  <section id="home" className="hero">
   <div className="hero-grid"/>
   <div className="noise"/>
   <div className="hero-inner">
    <div className="hero-copy" data-reveal>
     <div className="eyebrow"><span className="eyebrow-dot"/>INDEPENDENT DIGITAL CREATIVE <span className="eyebrow-line"/></div>
     <h1 className="display hero-title">I build <span className="outline-word">digital</span><br/><span className="glow-word">{roles[role]}</span><span className="cursor-bar">_</span></h1>
     <p className="hero-sub">Designing and shipping digital products with a developer's brain and a designer's obsession for detail.</p>
     <div className="hero-actions"><Magnetic onClick={()=>nav("work")} className="primary-btn">See the work <ArrowDownRight size={16}/></Magnetic><a href="mailto:hello@kimrayy.dev" className="text-link">Drop me a line <ArrowUpRight size={15}/></a></div>
     <div className="hero-meta"><span>BASED IN BALI, ID</span><span className="meta-cross">✳</span><span>WORKING WORLDWIDE</span><span className="meta-cross">✳</span><span>2026 / NOW</span></div>
    </div>
    <div className="hero-visual" data-reveal>
      <div className="orbital"><div className="orbit orbit-1"/><div className="orbit orbit-2"/><div className="orbit orbit-3"/><div className="planet"><span>K</span></div><div className="orbit-tag tag-a">UI/UX</div><div className="orbit-tag tag-b">REACT</div><div className="orbit-tag tag-c">PRODUCT</div></div>
      <div className="floating-card float-a"><small>Currently</small><strong>shipping ideas<br/>into reality.</strong></div>
      <div className="floating-card float-b"><span className="pulse-dot"/><small>STATUS</small><strong>Open for<br/>interesting work.</strong></div>
    </div>
   </div>
   <div className="scroll-cue"><span>01</span><div className="scroll-line"/><span>SCROLL</span></div>
  </section>

  <section id="work" className="work-section">
   <div className="section-wrap">
    <div className="section-head" data-reveal><div><p className="section-index">01 / SELECTED WORK</p><h2 className="display">Made, not <span>decorated.</span></h2></div><p className="head-note">Selected digital products, experiments, and client work — built to work as good as they look.</p></div>
    <div className="project-list">{projects.map(p=><ProjectCard key={p.no} project={p}/>)}</div>
   </div>
  </section>

  <section id="about" className="about-section">
   <div className="section-wrap">
    <div className="about-grid">
      <div data-reveal><p className="section-index">02 / ABOUT</p><h2 className="display about-title">Less noise.<br/><span>More signal.</span></h2></div>
      <div data-reveal className="about-copy"><p className="about-lead">I care about the part between <i>“it works”</i> and <i>“damn, this feels good.”</i></p><p>I work across product direction, UI/UX, front-end engineering, and the tiny interactions that make a screen feel alive. No giant agency layers — just focused thinking, sharp craft, and code that holds up.</p><div className="facts"><div><b>04+</b><span>years building<br/>on the web</span></div><div><b>24/7</b><span>curious about<br/>what's next</span></div><div><b>1×</b><span>standard for<br/>the details</span></div></div><div className="social-row"><a href="https://github.com/Kimrayy" target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={16}/> Instagram</a><a href="mailto:hello@kimrayy.dev"><Mail size={16}/> Email</a></div></div>
    </div>
   </div>
  </section>

  <section id="stack" className="stack-section">
   <div className="section-wrap">
    <div className="section-head stack-head" data-reveal><div><p className="section-index">03 / THE STACK</p><h2 className="display">Tools I <span>trust.</span></h2></div><div className="stack-spark"><Sparkles size={18}/><span>Curiosity > comfort zone</span></div></div>
    <div className="skills-grid" data-reveal>{skills.map((skill,i)=><div className="skill-tile" key={skill}><span>{String(i+1).padStart(2,"0")}</span><b>{skill}</b><i>↗</i></div>)}</div>
    <div className="ticker"><div className="ticker-track">{[...skills,...skills].map((x,i)=><span key={i}>{x}<b>✦</b></span>)}</div></div>
   </div>
  </section>

  <section id="contact" className="contact-section">
   <div className="contact-grid"/>
   <div className="section-wrap contact-inner">
    <div data-reveal><p className="section-index light">04 / CONTACT</p><h2 className="display contact-title">Let's make<br/><span>something hard</span><br/><em>to ignore.</em></h2></div>
    <div data-reveal className="contact-side"><p>Have a product, an idea, or just a half-baked thought? That's enough.</p><Magnetic onClick={copy} className="mail-pill"><Mail size={17}/>{copied?"Copied ✓":"hello@kimrayy.dev"}<ArrowUpRight size={15}/></Magnetic><div className="contact-mini"><span><i/>Usually replies within 24h</span><span>Bali / UTC+8</span></div></div>
    <footer><span>© 2026 KIMRAYY.</span><span>DESIGN × CODE × CURIOSITY</span><span><Check size={13}/> BUILT WITH NEXT.JS</span></footer>
   </div>
  </section>
 </main>
}
