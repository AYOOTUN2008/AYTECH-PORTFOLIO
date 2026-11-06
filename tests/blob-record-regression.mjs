import assert from 'node:assert/strict';
import {get,put,del,BlobPreconditionFailedError} from '@vercel/blob';
import {writeFile} from 'node:fs/promises';
const token=process.env.PROJECTS_READ_WRITE_TOKEN;
if(!token)throw Error('Storage token required');
const path=`qa/project-etag-regression-${crypto.randomUUID()}.json`;
process.env.PROJECT_INDEX_PATH=path;
const {readEntries,writeEntries}=await import('../lib/managed-projects.ts');
const entry=index=>({id:crypto.randomUUID(),title:`QA ONLY ${index}`,description:'Synthetic description for compressed-record regression verification. '.repeat(30).trim(),category:index===1?'UGC':'CGI',media:[{url:'https://qa.public.blob.vercel-storage.com/projects/qa-only.jpg',type:'image',width:640,height:360}]});
const original=[entry(1),entry(2)];const report={};
try{
 await put(path,JSON.stringify(original),{access:'private',token,addRandomSuffix:false,contentType:'application/json'});
 const compressed=await get(path,{access:'private',token,useCache:false});assert.equal(compressed.statusCode,200);await new Response(compressed.stream).arrayBuffer();report.compressedEncoding=compressed.headers.get('content-encoding');report.weakTransportVersion=compressed.blob.etag.startsWith('W/');assert.equal(report.weakTransportVersion,true,'Fixture must reproduce compressed weak ETag');
 await assert.rejects(()=>put(path,JSON.stringify(original),{access:'private',token,addRandomSuffix:false,ifMatch:compressed.blob.etag,contentType:'application/json'}),BlobPreconditionFailedError);report.previousFailureReproduced=true;
 let current=await readEntries();assert.equal(current.etag.startsWith('W/'),false);assert.deepEqual(current.entries,original);const third=entry(3);await writeEntries([third,...current.entries],current.etag);let saved=await readEntries();assert.equal(saved.entries.length,3);assert.deepEqual(saved.entries.slice(1),original);report.appendAfterCompressionThreshold=true;
 const stale=saved.etag;const edited=saved.entries.map((p,i)=>i===0?{...p,title:'QA ONLY edited'}:p);await writeEntries(edited,saved.etag);await assert.rejects(()=>writeEntries(saved.entries,stale),BlobPreconditionFailedError);assert.deepEqual((await readEntries()).entries,edited);report.staleWriteStillRejected=true;
 saved=await readEntries();await writeEntries(saved.entries.filter(p=>p.id!==third.id),saved.etag);assert.deepEqual((await readEntries()).entries,original);report.removeAfterCompressionThreshold=true;report.productionWrites=0;
}finally{await del(path,{token});await writeFile('artifacts/blob-record-regression.json',JSON.stringify(report,null,2))}
console.log(report);
