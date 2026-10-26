'use client';
import {useEffect,useRef,useState} from 'react';
import {portfolioCategories,parsePortfolioFilter,matchesPortfolioFilter,type PortfolioFilter} from '@/lib/categories';
type Item={category:string;hasVideo:boolean};
export default function CategoryBrowser({initialCategory,items,children}:{initialCategory:PortfolioFilter;items:Item[];children:React.ReactNode}){
 const [category,setCategory]=useState(initialCategory);const [enhanced,setEnhanced]=useState(false);const root=useRef<HTMLDivElement>(null);
 const selected=items.filter(p=>matchesPortfolioFilter(p.category,category));const films=selected.filter(p=>p.hasVideo).length;
 useEffect(()=>{setEnhanced(true);const restore=()=>setCategory(parsePortfolioFilter(new URL(window.location.href).searchParams.get('category')));window.addEventListener('popstate',restore);return()=>window.removeEventListener('popstate',restore)},[]);
 useEffect(()=>{root.current?.querySelectorAll<HTMLVideoElement>('video').forEach(video=>{const item=video.closest<HTMLElement>('[data-category]');if(item&&!matchesPortfolioFilter(item.dataset.category||'',category))video.pause()})},[category]);
 function change(value:string){const next=parsePortfolioFilter(value);setCategory(next);const url=new URL(window.location.href);if(next==='all')url.searchParams.delete('category');else url.searchParams.set('category',next);window.history.pushState(null,'',url.pathname+url.search+url.hash)}
 return <div className="portfolio-browser" ref={root} data-filter={category} data-has-projects={selected.length>0} data-has-films={films>0}>
 <div className="portfolio-toolbar wrap" id="portfolio"><form action="/work/#portfolio" method="get"><label htmlFor="project-category">Browse by category</label><div className="portfolio-select"><select id="project-category" name="category" value={category} onChange={event=>change(event.target.value)}>{portfolioCategories.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}</select><span aria-hidden="true">⌄</span></div><button type="submit" className={`button filter-apply ${enhanced?'is-enhanced':''}`}>Apply filter</button></form><p className="portfolio-count" role="status" aria-live="polite">{selected.length} {selected.length===1?'project':'projects'}<span aria-hidden="true"> / </span>{films} {films===1?'video':'videos'}</p></div>
 {children}
 </div>;
}
