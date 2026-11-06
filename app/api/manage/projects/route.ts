import {readJson} from '@/lib/read-json';
import {NextResponse} from 'next/server';
import {isOwner,sameOrigin} from '@/lib/owner-auth';
import {entrySchema,readEntries,writeEntries} from '@/lib/managed-projects';
import {sameProjectVersion,projectSaveFailure} from '@/lib/project-save';
const reply=(data:object,status=200)=>NextResponse.json(data,{status,headers:{'Cache-Control':'no-store'}});
function storageFailure(error:unknown){const failure=projectSaveFailure(error);console.error('project_storage_operation_failed',{kind:error instanceof Error?error.name:'UnknownError',status:failure.status});return reply({error:failure.message},failure.status)}
export async function GET(){if(!await isOwner())return reply({error:'Please sign in again. Your draft is still here.'},401);try{return reply(await readEntries())}catch(error){return storageFailure(error)}}
export async function POST(request:Request){if(!sameOrigin(request)||!await isOwner())return reply({error:'Please sign in again. Your draft is still here.'},403);const body=await readJson(request,40000).catch(()=>null);const parsed=entrySchema.safeParse(body?.project);if(!parsed.success)return reply({error:'Check the title, description, category and media.'},400);
 try{const {entries,etag}=await readEntries();const existing=entries.find(p=>p.id===parsed.data.id);
 // A successful write followed by a lost response must not create a duplicate.
 if(existing&&JSON.stringify(existing)===JSON.stringify(parsed.data))return reply({ok:true});
 if(!sameProjectVersion(body.etag,etag))return reply({error:'Projects changed in another tab. Your draft is still here; review the latest project list before retrying.'},409);
 if(entries.length>=500&&!existing)return reply({error:'Project limit reached (500). Remove an old project first.'},400);
 await writeEntries([parsed.data,...entries.filter(p=>p.id!==parsed.data.id)],etag);return reply({ok:true});
 }catch(error){return storageFailure(error)}}
export async function DELETE(request:Request){if(!sameOrigin(request)||!await isOwner())return reply({error:'Please sign in again.'},403);const body=await readJson(request,40000).catch(()=>null);if(!entrySchema.shape.id.safeParse(body?.id).success)return reply({error:'Choose a valid project.'},400);
 try{const {entries,etag}=await readEntries();if(!entries.some(p=>p.id===body.id))return reply({ok:true});if(!sameProjectVersion(body.etag,etag))return reply({error:'Projects changed in another tab. Review the latest project list first.'},409);await writeEntries(entries.filter(p=>p.id!==body.id),etag);return reply({ok:true})}catch(error){return storageFailure(error)}}
