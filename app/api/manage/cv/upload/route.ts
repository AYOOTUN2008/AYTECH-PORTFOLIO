import {handleUpload,type HandleUploadBody} from '@vercel/blob/client';
import {isOwner,sameOrigin} from '@/lib/owner-auth';
import {readJson} from '@/lib/read-json';
export async function POST(request:Request){try{const body=await readJson(request,20000) as HandleUploadBody;return Response.json(await handleUpload({body,request,onBeforeGenerateToken:async pathname=>{if(!sameOrigin(request)||!await isOwner())throw Error('Sign in first');if(!/^cv\/[a-zA-Z0-9-]+\.pdf$/.test(pathname))throw Error('PDF path required');return {allowedContentTypes:['application/pdf'],maximumSizeInBytes:10*1024*1024,addRandomSuffix:true,allowOverwrite:false,validUntil:Date.now()+30*60*1000}},onUploadCompleted:async()=>{}}))}catch{return Response.json({error:'Sign in and choose a PDF below 10 MB.'},{status:400})}}
