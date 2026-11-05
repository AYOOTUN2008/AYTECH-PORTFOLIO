import {get} from '@vercel/blob';
import {readCV} from '@/lib/cv';
export const dynamic='force-dynamic';
export async function GET(){if(!process.env.PROJECTS_READ_WRITE_TOKEN)return new Response('No CV has been uploaded yet.',{status:404});try{const {cv}=await readCV();if(!cv)return new Response('No CV has been uploaded yet.',{status:404});const file=await get(cv.url,{access:'public'});if(file?.statusCode!==200)throw Error('Unavailable');return new Response(file.stream,{headers:{'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="AYTECH-CV.pdf"','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow'}})}catch{return new Response('The CV is temporarily unavailable. Please contact AYTECH.',{status:503})}}
