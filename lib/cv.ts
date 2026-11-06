// Mutable Blob records need the strong origin ETag; compression weakens HTTP ETags.
import {cache} from 'react';
import {unstable_noStore as noStore} from 'next/cache';
import {get,put} from '@vercel/blob';
import {z} from 'zod';
export const cvUrl=z.url().refine(value=>{const u=new URL(value);return u.protocol==='https:'&&u.hostname.endsWith('.public.blob.vercel-storage.com')&&/^\/cv\/[a-zA-Z0-9._-]+\.pdf$/.test(u.pathname)&&!u.search&&!u.hash},'Expected an uploaded PDF');
const recordSchema=z.object({cv:z.object({url:cvUrl,updatedAt:z.iso.datetime()}).nullable()});
const path=process.env.CV_INDEX_PATH||'portfolio/cv.json';
export async function readCV(){const blob=await get(path,{access:'private',token:process.env.PROJECTS_READ_WRITE_TOKEN,useCache:false,headers:{'Accept-Encoding':'identity'}});if(!blob)return {cv:null,etag:undefined};if(blob.statusCode!==200)throw new Error('CV storage unavailable');return {...recordSchema.parse(await new Response(blob.stream).json()),etag:blob.blob.etag}}
export async function writeCV(cv:{url:string;updatedAt:string}|null,etag?:string){await put(path,JSON.stringify({cv}),{access:'private',token:process.env.PROJECTS_READ_WRITE_TOKEN,contentType:'application/json',addRandomSuffix:false,...(etag?{ifMatch:etag}:{allowOverwrite:false})})}
export const publicCV=cache(async()=>{noStore();if(!process.env.PROJECTS_READ_WRITE_TOKEN)return null;try{return (await readCV()).cv}catch{return null}});
export function isPDF(bytes:Uint8Array){return Buffer.from(bytes.subarray(0,5)).toString('ascii')==='%PDF-'}
