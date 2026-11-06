import {BlobPreconditionFailedError,BlobServiceRateLimited} from '@vercel/blob';
/** Older open tabs may hold a weak HTTP tag for the same uncompressed record. */
export function sameProjectVersion(client:unknown,current:string|undefined){if(current===undefined)return client===undefined;return typeof client==='string'&&client.replace(/^W\//,'')===current}
export function projectSaveFailure(error:unknown){
 if(error instanceof BlobPreconditionFailedError)return {status:409,message:'Projects changed while saving. Your draft is still here; retry after reviewing the project list.'};
 if(error instanceof BlobServiceRateLimited)return {status:429,message:'Storage is busy. Your draft is still here; wait a moment and try again.'};
 return {status:503,message:'Storage could not complete the save. Your draft and uploaded files are still here; please try again.'};
}
