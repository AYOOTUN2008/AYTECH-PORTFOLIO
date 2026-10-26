export const portfolioCategories = [
 {value:'all',label:'All work'},
 {value:'ugc',label:'UGC'},
 {value:'cgi',label:'CGI'},
 {value:'ugc-cgi',label:'UGC + CGI'}
] as const;
export type PortfolioFilter=typeof portfolioCategories[number]['value'];
export function parsePortfolioFilter(value:unknown):PortfolioFilter{return portfolioCategories.some(c=>c.value===value)?value as PortfolioFilter:'all'}
/** Public dropdown categories are exact; hybrid work has its own selection. */
export function matchesPortfolioFilter(category:string,filter:PortfolioFilter){return filter==='all'||category===portfolioCategories.find(c=>c.value===filter)?.label}
/** Hybrid projects belong on both service landing pages. */
export function matchesServiceCategory(category:string,service?:'UGC'|'CGI'){return !service||category===service||category==='UGC + CGI'}
