'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

/** Progressive enhancement: content and hit targets are usable before motion starts. */
export default function Motion(){
 const pathname=usePathname();
 useEffect(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  let dispose=()=>{};
  const setup=()=>{
   dispose();
   if(reduced.matches)return;
   const cleanup:Array<()=>void>=[];
   const animations:Animation[]=[];
   const pending=new Map<HTMLElement,Record<string,string>>();
   const touched=new Map<HTMLElement,Set<string>>();
   let frame=0;
   const write=(el:HTMLElement,values:Record<string,string>)=>{
    pending.set(el,{...pending.get(el),...values});
    if(frame)return;
    frame=requestAnimationFrame(()=>{frame=0;for(const [node,props] of pending){let keys=touched.get(node);if(!keys){keys=new Set();touched.set(node,keys)}for(const [key,value] of Object.entries(props)){node.style.setProperty(key,value);keys.add(key)}}pending.clear()});
   };
   const listen=(el:HTMLElement|Window,type:string,handler:EventListener)=>{el.addEventListener(type,handler,{passive:true});cleanup.push(()=>el.removeEventListener(type,handler))};
   document.documentElement.classList.add('motion-ready');
   cleanup.push(()=>document.documentElement.classList.remove('motion-ready'));

   // Animate only when an element enters view. Nothing is pre-hidden in CSS.
   const candidates=document.querySelectorAll<HTMLElement>('.section-label, .section-heading h2, .section-heading>p, .world-card, .project-card, .process-grid article, .capability-list>a, .faqs details, .manifesto h2, .manifesto-bottom>p, .cta-section h2, .page-hero h1, .page-hero-bottom>*, .reference-grid figure, .cms-story>p, .insight-list>a, .contact-layout>aside, .inquiry-form, .about-body>.prose, .case-storyboard>figure, .storyboard-context, .video-empty, .footer-top');
   const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){if(!entry.isIntersecting)continue;const el=entry.target as HTMLElement;observer.unobserve(el);const siblings=Array.from(el.parentElement?.children||[]);const stagger=el.matches('.project-card,.world-card,.process-grid article,.reference-grid figure')?Math.min(siblings.indexOf(el)*75,225):0;
     const animation=el.animate([{opacity:.22,transform:'translate3d(0,26px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],{duration:820,delay:stagger,easing:'cubic-bezier(.16,1,.3,1)',fill:'none'});
     animations.push(animation);
    }
   },{threshold:.08,rootMargin:'0px 0px -16px 0px'});
   candidates.forEach(el=>observer.observe(el));cleanup.push(()=>observer.disconnect());

   const progress=document.querySelector<HTMLElement>('.scroll-progress>span');
   const onScroll=()=>{if(!progress)return;const range=document.documentElement.scrollHeight-innerHeight;write(progress,{'--read-progress':String(range>0?Math.min(1,scrollY/range):0)})};
   listen(window,'scroll',onScroll);listen(window,'resize',onScroll);onScroll();

   if(fine.matches){
    // The button moves a few pixels, while the pointer and keyboard remain native.
    document.querySelectorAll<HTMLElement>('.button,.nav-contact,.circle-arrow,.menu-toggle').forEach(el=>{
     let rect:DOMRect|null=null;
     const enter=()=>{rect=el.getBoundingClientRect();el.classList.add('pointer-active')};
     const move=(event:Event)=>{const e=event as PointerEvent;if(e.pointerType==='touch')return;if(!rect)rect=el.getBoundingClientRect();const nx=(e.clientX-rect.left)/rect.width-.5,ny=(e.clientY-rect.top)/rect.height-.5;write(el,{'--magnet-x':`${Math.max(-9,Math.min(9,nx*18)).toFixed(2)}px`,'--magnet-y':`${Math.max(-6,Math.min(6,ny*12)).toFixed(2)}px`,'--light-x':`${(nx+.5)*100}%`,'--light-y':`${(ny+.5)*100}%`})};
     const leave=()=>{rect=null;el.classList.remove('pointer-active');write(el,{'--magnet-x':'0px','--magnet-y':'0px'})};
     listen(el,'pointerenter',enter);listen(el,'pointermove',move);listen(el,'pointerleave',leave);cleanup.push(()=>el.classList.remove('pointer-active'));
    });
    // Surface depth belongs to the illustration; original product pixels stay intact.
    document.querySelectorAll<HTMLElement>('.world-card,.project-card,.abstract-art.large,.video-empty,.about-portrait').forEach(el=>{
     let rect:DOMRect|null=null;
     const move=(event:Event)=>{const e=event as PointerEvent;if(e.pointerType==='touch')return;if(!rect)rect=el.getBoundingClientRect();const nx=(e.clientX-rect.left)/rect.width-.5,ny=(e.clientY-rect.top)/rect.height-.5;write(el,{'--surface-x':`${(nx*14).toFixed(2)}px`,'--surface-y':`${(ny*10).toFixed(2)}px`,'--tilt-x':`${(-ny*7).toFixed(2)}deg`,'--tilt-y':`${(nx*7).toFixed(2)}deg`,'--spot-x':`${(nx+.5)*100}%`,'--spot-y':`${(ny+.5)*100}%`});el.classList.add('surface-active')};
     const leave=()=>{rect=null;el.classList.remove('surface-active');write(el,{'--surface-x':'0px','--surface-y':'0px','--tilt-x':'0deg','--tilt-y':'0deg'})};
     listen(el,'pointermove',move);listen(el,'pointerleave',leave);cleanup.push(()=>el.classList.remove('surface-active'));
    });
    const hero=document.querySelector<HTMLElement>('.hero');
    if(hero){let rect:DOMRect|null=null;const move=(event:Event)=>{const e=event as PointerEvent;if(e.pointerType==='touch')return;if(!rect)rect=hero.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;write(hero,{'--hero-x':`${(x*24).toFixed(2)}px`,'--hero-y':`${(y*18).toFixed(2)}px`,'--hero-rotate':`${(x*8).toFixed(2)}deg`})};const leave=()=>{rect=null;write(hero,{'--hero-x':'0px','--hero-y':'0px','--hero-rotate':'0deg'})};listen(hero,'pointermove',move);listen(hero,'pointerleave',leave);listen(window,'resize',()=>{rect=null})}
   }
   dispose=()=>{cleanup.forEach(fn=>fn());observer.disconnect();animations.forEach(a=>a.cancel());cancelAnimationFrame(frame);pending.clear();for(const [el,keys] of touched)for(const key of keys)el.style.removeProperty(key)};
  };
  setup();reduced.addEventListener('change',setup);fine.addEventListener('change',setup);
  return ()=>{dispose();reduced.removeEventListener('change',setup);fine.removeEventListener('change',setup)};
 },[pathname]);
 return <div className="scroll-progress" aria-hidden="true"><span/></div>;
}
