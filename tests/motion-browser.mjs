import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();const base=process.env.TEST_BASE_URL||'http://localhost:3000';const errors=[];page.on('pageerror',e=>errors.push(e.message));
const finish=()=>page.evaluate(()=>document.getAnimations().forEach(a=>{if(Number.isFinite(a.effect?.getComputedTiming().endTime))a.finish()}));
const value=(selector,key)=>page.locator(selector).first().evaluate((el,k)=>getComputedStyle(el).getPropertyValue(k).trim(),key);
try{
 await page.goto(base);await page.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'));await finish();
 const button=page.locator('.hero-actions .button');const b=await button.boundingBox();await page.mouse.move(b.x+b.width*.8,b.y+b.height*.4);await page.waitForFunction(()=>Math.abs(parseFloat(document.querySelector('.hero-actions .button').style.getPropertyValue('--magnet-x')))>1);assert.notEqual(await value('.hero-actions .button','translate'),'none');
 await page.mouse.move(900,250);await page.waitForFunction(()=>Math.abs(parseFloat(document.querySelector('.hero').style.getPropertyValue('--hero-x')))>1);assert.ok(parseFloat(await value('.hero','--hero-x'))>0);
 await page.mouse.move(10,10);await page.waitForFunction(()=>document.querySelector('.hero-actions .button').style.getPropertyValue('--magnet-x')==='0px');
 const card=page.locator('.world-card').first();await card.scrollIntoViewIfNeeded();await finish();const c=await card.boundingBox();await page.mouse.move(c.x+c.width*.7,c.y+c.height*.3);await page.waitForFunction(()=>document.querySelector('.world-card').style.getPropertyValue('--tilt-y')!=='');assert.notEqual(await value('.world-card .abstract-art','transform'),'none');
 await page.getByRole('navigation').getByRole('link',{name:'Projects',exact:true}).click();await page.waitForURL('**/work');await page.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'));await finish();const project=page.locator('.project-card').first();await project.scrollIntoViewIfNeeded();await finish();const r=await project.boundingBox();await page.mouse.move(r.x+r.width*.6,r.y+80);await page.waitForFunction(()=>document.querySelector('.project-card').classList.contains('surface-active'));
 // Reduced motion is honoured when toggled while already on the page.
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>!document.documentElement.classList.contains('motion-ready'));assert.equal(await value('.project-card','--surface-x'),'');assert.equal(await value('.project-media','translate'),'none');
 await page.goto(base);assert.equal(await value('.hero h1','animation-name'),'none');assert.equal(await value('.portrait-orbit','animation-name'),'none');
 // Touch does not inherit desktop-only pointer transforms.
 const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const tp=await touch.newPage();await tp.goto(base);await tp.waitForFunction(()=>document.documentElement.classList.contains('motion-ready'));assert.equal(await tp.locator('.hero-actions .button').evaluate(el=>getComputedStyle(el).translate),'none');await touch.close();assert.equal(errors.length,0,errors.join('\n'));
 await fs.writeFile('artifacts/motion-report.json',JSON.stringify({magneticButton:true,heroPointerDepth:true,artworkTilt:true,worksAfterNavigation:true,liveReducedMotionToggle:true,touchFallback:true,errors},null,2));console.log('Motion checks passed: buttons, hero, illustrations, client navigation, live reduced-motion toggle and touch fallback.');
}finally{await browser.close()}
