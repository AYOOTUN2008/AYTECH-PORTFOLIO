import {cookies} from 'next/headers';
import {createHmac,timingSafeEqual,scryptSync} from 'node:crypto';
export function ownerReady(){return !!process.env.OWNER_SESSION_SECRET&&!!(process.env.OWNER_PASSWORD_HASH||process.env.OWNER_PASSWORD)&&!!process.env.BLOB_READ_WRITE_TOKEN&&!!process.env.PROJECTS_READ_WRITE_TOKEN}
function sign(value:string){return createHmac('sha256',process.env.OWNER_SESSION_SECRET||'unconfigured').update(value).digest('hex')}
export function ownerToken(){const expires=String(Date.now()+8*60*60*1000);return `${expires}.${sign(expires)}`}
export function validToken(token:string){const [expires,signature]=token.split('.');if(!ownerReady()||!signature||!/^\d+$/.test(expires)||Number(expires)<Date.now())return false;const expected=sign(expires);return signature.length===expected.length&&timingSafeEqual(Buffer.from(signature),Buffer.from(expected))}
export async function isOwner(){return validToken((await cookies()).get('aytech-owner')?.value||'')}
export function validPassword(password:string){if(process.env.OWNER_PASSWORD){const expected=sign(process.env.OWNER_PASSWORD);const actual=sign(password);return timingSafeEqual(Buffer.from(actual),Buffer.from(expected))}const [salt,hash]= (process.env.OWNER_PASSWORD_HASH||'').split(':');if(!salt||!hash||password.length>256)return false;const result=scryptSync(password,salt,64).toString('hex');return result.length===hash.length&&timingSafeEqual(Buffer.from(result),Buffer.from(hash))}
export function sameOrigin(request:Request){const expected=new URL(request.url);expected.host=request.headers.get('host')||expected.host;return request.headers.get('origin')===expected.origin}
