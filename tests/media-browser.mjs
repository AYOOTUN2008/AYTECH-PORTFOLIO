import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
await fs.mkdir('artifacts',{recursive:true});
// A synthetic black frame for QA only, never placed in the public portfolio.
execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','lavfi','-i','color=c=black:s=640x360:d=2','-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart','artifacts/qa-only-video.mp4']);
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844}});
try{
 await page.route('https://cdn.sanity.io/**',async route=>{const url=route.request().url();if(url.endsWith('.mp4'))return route.fulfill({status:200,contentType:'video/mp4',headers:{'Access-Control-Allow-Origin':'*'},body:await fs.readFile('artifacts/qa-only-video.mp4')});if(url.endsWith('.vtt'))return route.fulfill({status:200,contentType:'text/vtt',headers:{'Access-Control-Allow-Origin':'*'},body:'WEBVTT\n\n00:00.000 --> 00:02.000\nInternal playback test.\n'});return route.fulfill({status:200,contentType:'image/jpeg',headers:{'Access-Control-Allow-Origin':'*'},body:await fs.readFile('public/images/projects/dge/dge-product-family.jpg')});});
 await page.setContent(await fs.readFile('artifacts/video-component.html','utf8'));
 assert.equal(await page.locator('video').getAttribute('preload'),'none');assert.equal(await page.locator('video').evaluate(v=>v.paused),true);
 await page.getByRole('button',{name:'Play test'}).click();await page.waitForFunction(()=>{const v=document.querySelector('video');return v.currentTime>0.1&&v.readyState>=2});
 const result=await page.locator('video').evaluate(v=>({plays:v.currentTime>0,controls:v.controls,captions:v.textTracks.length,errors:v.error?.message||null}));assert.equal(result.plays,true);assert.equal(result.controls,true);assert.equal(result.captions,1);assert.equal(result.errors,null);
 await page.getByText('Read transcript / visual description').click();assert.ok(await page.getByText('A plain test frame for browser playback verification. No campaign claims.').isVisible());await fs.writeFile('artifacts/media-browser-report.json',JSON.stringify({...result,fixture:'Synthetic QA-only black-frame clip, not real project evidence'},null,2));console.log(JSON.stringify(result,null,2));
}finally{await browser.close()}
