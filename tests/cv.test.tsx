import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cvUrl,isPDF} from '../lib/cv';
test('CV publication only accepts the PDF upload namespace on approved HTTPS storage',()=>{assert.equal(cvUrl.safeParse('https://example.public.blob.vercel-storage.com/cv/approved-copy.pdf').success,true);for(const url of ['https://evil.example/cv/approved.pdf','http://example.public.blob.vercel-storage.com/cv/approved.pdf','https://example.public.blob.vercel-storage.com/projects/file.pdf','https://example.public.blob.vercel-storage.com/cv/file.html','https://example.public.blob.vercel-storage.com/cv/file.pdf?download=1'])assert.equal(cvUrl.safeParse(url).success,false)});
test('CV signature check rejects renamed HTML and empty files',()=>{assert.equal(isPDF(Buffer.from('%PDF-1.7\n')),true);assert.equal(isPDF(Buffer.from('<html>')),false);assert.equal(isPDF(new Uint8Array()),false)});
