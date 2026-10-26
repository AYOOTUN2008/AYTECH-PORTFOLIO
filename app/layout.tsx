import localFont from 'next/font/local';
import type {Metadata} from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Motion from '@/components/motion';
import {origin,indexable,site} from '@/lib/site';
import './globals.css';
const dmSans=localFont({src:'../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2',variable:'--font-dm',display:'swap',fallback:['Arial']});
const spaceGrotesk=localFont({src:'../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',variable:'--font-space',display:'swap',fallback:['Arial']});
const instrumentSerif=localFont({src:'../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2',variable:'--font-instrument',display:'swap',style:'italic',adjustFontFallback:false,fallback:['Georgia']});
export const metadata:Metadata={metadataBase:origin?new URL(origin):undefined,title:{default:'AYTECH | UGC Ads & CGI Commercials in Nigeria',template:'%s'},description:'UGC that feels human. CGI that feels impossible. Independent creative direction from Nigeria, for brands worldwide.',robots:{index:indexable,follow:indexable}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable}`}><body id="top"><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main" tabIndex={-1}>{children}</main><Footer/><Motion/>{origin&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'Person','@id':origin+'/#person',name:site.owner,alternateName:'AYTECH',url:origin,description:'Nigeria-based creative specializing in UGC-style advertising and CGI product commercials',knowsAbout:['UGC-style advertising','CGI product commercials','Creative direction','Product branding']},{'@type':'WebSite','@id':origin+'/#website',url:origin,name:'AYTECH Creative'}]}).replace(/</g,'\\u003c')}}/>}</body></html>}
