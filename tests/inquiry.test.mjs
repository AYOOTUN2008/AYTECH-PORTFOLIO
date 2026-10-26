import {test} from 'node:test';
import assert from 'node:assert/strict';
import {handleInquiry,inquirySchema} from '../lib/inquiry.ts';
const payload={name:'QA Test',email:'test@example.test',service:'cgi',brief:'A test product film with two vertical cutdowns.',consent:true,requestId:'e84a3d32-37bd-47d5-98fa-beb2c54e4da4'};
const env={SITE_URL:'https://portfolio.vercel.app',RESEND_API_KEY:'test-only',INQUIRY_FROM:'test@example.test',INQUIRY_TO:'owner@example.test',UPSTASH_REDIS_REST_URL:'https://redis.example.test',UPSTASH_REDIS_REST_TOKEN:'test-only',INQUIRY_IP_HEADER:'x-vercel-forwarded-for'};
function req(data=payload,origin=env.SITE_URL){return new Request(env.SITE_URL+'/api/inquiry',{method:'POST',headers:{'Content-Type':'application/json',origin,'x-vercel-forwarded-for':'192.0.2.1'},body:JSON.stringify(data)})}
test('rejects malformed or incomplete briefs',()=>{for(const patch of [{email:'bad'},{brief:'short'},{consent:false},{service:'invented'},{reference:'javascript:alert(1)'},{website:'bot'}])assert.equal(inquirySchema.safeParse({...payload,...patch}).success,false)});
test('rejects cross-origin requests',async()=>assert.equal((await handleInquiry(req(payload,'https://evil.example'),{env})).status,403));
test('rejects malformed JSON',async()=>{const r=req();const bad=new Request(r.url,{method:'POST',headers:r.headers,body:'{'});assert.equal((await handleInquiry(bad,{env})).status,400)});
test('rejects oversized request before delivery',async()=>{const r=req({...payload,brief:'a'.repeat(15000)});assert.equal((await handleInquiry(r,{env})).status,400)});
test('unconfigured service fails honestly',async()=>assert.equal((await handleInquiry(req(),{env:{SITE_URL:env.SITE_URL}})).status,503));
test('validation returns actionable field errors',async()=>{const r=await handleInquiry(req({...payload,email:'bad'}),{env});assert.equal(r.status,422);assert.ok((await r.json()).errors.email)});
test('missing trusted proxy header fails closed',async()=>{const r=req();r.headers.delete('x-vercel-forwarded-for');assert.equal((await handleInquiry(r,{env})).status,503)});
test('rate limit prevents delivery',async()=>{let count=0;const r=await handleInquiry(req(),{env,fetcher:async()=>{count++;return Response.json({result:6})}});assert.equal(r.status,429);assert.equal(count,1)});
test('broken rate limiter prevents sending',async()=>{let count=0;const r=await handleInquiry(req(),{env,fetcher:async()=>{count++;return Response.json({error:'failed'})}});assert.equal(r.status,502);assert.equal(count,1)});
test('successful provider response is necessary for success',async()=>{const calls=[];const r=await handleInquiry(req(),{env,fetcher:async(url,opts)=>{calls.push([url,opts]);return Response.json(calls.length===1?{result:1}:{id:'mock-provider-id'})}});assert.equal(r.status,200);assert.equal(calls.length,2);const mail=JSON.parse(calls[1][1].body);assert.equal(mail.reply_to,payload.email);assert.deepEqual(mail.to,['owner@example.test']);assert.match(mail.text,/vertical cutdowns/);assert.equal(calls[1][1].headers['Idempotency-Key'],'aytech-'+payload.requestId);assert.ok(!calls[0][1].body.includes('192.0.2.1'))});
test('provider rejection never reports success',async()=>{let count=0;const r=await handleInquiry(req(),{env,fetcher:async()=>++count===1?Response.json({result:1}):Response.json({error:'bad sender'},{status:403})});assert.equal(r.status,502)});
test('missing provider confirmation never reports success',async()=>{let count=0;const r=await handleInquiry(req(),{env,fetcher:async()=>Response.json(++count===1?{result:1}:{})});assert.equal(r.status,502)});
test('network timeout never reports success',async()=>{const r=await handleInquiry(req(),{env,fetcher:async()=>{throw new Error('timeout')}});assert.equal(r.status,502)});

test('local host header supports bound server address without canonical config',async()=>{const r=new Request('http://0.0.0.0:3000/api/inquiry',{method:'POST',headers:{'content-type':'application/json',host:'localhost:3000',origin:'http://localhost:3000'},body:JSON.stringify(payload)});assert.equal((await handleInquiry(r,{env:{}})).status,503)});
