import {z} from 'zod';
import {createHmac} from 'node:crypto';
export const inquirySchema=z.object({
 name:z.string().trim().min(2,'Please enter your name.').max(100),
 email:z.email('Please enter a valid email.').max(254),
 service:z.enum(['ugc','cgi','both','other']),
 brief:z.string().trim().min(20,'Please tell us a little more (at least 20 characters).').max(5000),
 company:z.string().trim().max(150).optional().default(''),
 deadline:z.string().trim().max(100).optional().default(''),
 reference:z.union([z.literal(''),z.url().max(1000).refine(v=>new URL(v).protocol==='https:','Use an HTTPS reference link.')]).optional().default(''),
 budget:z.enum(['','discuss','under-500','500-1500','1500-5000','5000-plus']).optional().default(''),
 deliverables:z.string().trim().max(300).optional().default(''),
 usage:z.string().trim().max(300).optional().default(''),
 website:z.string().max(0,'Spam protection rejected this request.').optional().default(''),
 consent:z.literal(true),
 requestId:z.uuid()
});
type Env=Record<string,string|undefined>;
export function deliveryReady(env:Env=process.env){return ['RESEND_API_KEY','INQUIRY_FROM','INQUIRY_TO','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','INQUIRY_IP_HEADER'].every(key=>!!env[key]);}
const reply=(status:number,message:string,extra:Record<string,unknown>={})=>Response.json({message,...extra},{status,headers:{'Cache-Control':'no-store'}});
async function readBody(request:Request){const reader=request.body?.getReader();if(!reader)throw Error('empty');let size=0;const chunks:Uint8Array[]=[];while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>14000){await reader.cancel();throw Error('large')}chunks.push(value)}return JSON.parse(Buffer.concat(chunks).toString('utf8'));}
export async function handleInquiry(request:Request,options:{env?:Env;fetcher?:typeof fetch}={}){
 const env=options.env||process.env, fetcher=options.fetcher||fetch;
 const reqOrigin=request.headers.get('origin');
 let expectedOrigin:string;try{const url=new URL(request.url);expectedOrigin=env.SITE_URL?new URL(env.SITE_URL).origin:`${url.protocol}//${request.headers.get('host')||url.host}`;}catch{return reply(503,'The inquiry service needs configuration. Please use email.');}
 if(!reqOrigin||reqOrigin!==expectedOrigin)return reply(403,'Please send your brief from this website.');
 if(!request.headers.get('content-type')?.startsWith('application/json'))return reply(415,'Please submit the form as JSON.');
 if(Number(request.headers.get('content-length'))>14000)return reply(413,'Your brief is too long. Please shorten it.');
 let data;try{data=inquirySchema.safeParse(await readBody(request))}catch{return reply(400,'We could not read that request. Please try again.')}
 if(!data.success)return reply(422,'Please check the highlighted fields.',{errors:z.flattenError(data.error).fieldErrors});
 if(!deliveryReady(env))return reply(503,'The inquiry form is not connected yet. Please use the email or WhatsApp link below.');
 const ip=request.headers.get(env.INQUIRY_IP_HEADER!)?.split(',')[0]?.trim();
 if(!ip)return reply(503,'We could not verify the request source. Please contact AYTECH by email.');
 const redis=env.UPSTASH_REDIS_REST_URL!;
 if(!redis.startsWith('https://'))return reply(503,'The inquiry service needs configuration. Please use email.');
 const key='aytech:inquiry:'+createHmac('sha256',env.UPSTASH_REDIS_REST_TOKEN!).update(ip).digest('hex');
 try{
  const limit=await fetcher(redis,{method:'POST',headers:{Authorization:`Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify(['EVAL',"local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]); end; return n",'1',key,'600']),signal:AbortSignal.timeout(5000)});
  if(!limit.ok)throw Error('limit service');const result=await limit.json();if(!Number.isInteger(result.result)||result.result<1)throw Error('limit result');
  if(result.result>5)return reply(429,'Too many attempts. Please wait 10 minutes or use email.');
  const d=data.data;
  const mail=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`aytech-${d.requestId}`},body:JSON.stringify({from:env.INQUIRY_FROM,to:[env.INQUIRY_TO],reply_to:d.email,subject:`New AYTECH project inquiry · ${d.service.toUpperCase()}`,text:`Name: ${d.name}\nEmail: ${d.email}\nService: ${d.service}\nCompany: ${d.company}\nDeadline: ${d.deadline}\nBudget (USD): ${d.budget||'Not specified'}\nReference: ${d.reference}\nDeliverables: ${d.deliverables}\nUsage: ${d.usage}\n\nBrief:\n${d.brief}\n\nPrivacy notice acknowledged.`}),signal:AbortSignal.timeout(10000)});
  if(!mail.ok)throw Error('delivery');const sent=await mail.json();if(typeof sent.id!=='string'||!sent.id)throw Error('delivery confirmation');
  return reply(200,'Your brief has been accepted by the email service for delivery. Thank you — AYTECH can reply using the email you provided.');
 }catch{return reply(502,'We could not confirm delivery. Your brief is still here. Please try again or use email.');}
}
