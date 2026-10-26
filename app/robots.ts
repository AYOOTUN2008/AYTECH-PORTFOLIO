import type {MetadataRoute} from 'next';
import {origin,indexable} from '@/lib/site';
export default function robots():MetadataRoute.Robots{return {rules:indexable?{userAgent:'*',allow:'/',disallow:'/api/'}:{userAgent:'*',disallow:'/'},...(origin&&indexable?{sitemap:origin+'/sitemap.xml'}:{})}}
