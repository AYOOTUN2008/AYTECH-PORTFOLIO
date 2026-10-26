import {handleInquiry} from '@/lib/inquiry';
export const runtime='nodejs';
export async function POST(request:Request){return handleInquiry(request)}
