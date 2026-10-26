import type {MetadataRoute} from 'next';
import {getProjects} from '@/lib/project-store';
import {origin,indexable} from '@/lib/site';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{if(!origin||!indexable)return [];const projects=await getProjects();return ['/','/services/ugc-ads/','/services/cgi-commercials/','/work/','/about/','/contact/','/insights/','/insights/ugc-vs-cgi-ads/','/privacy/',...projects.map(p=>`/work/${p.slug}/`)].map(path=>({url:origin+path}));}
