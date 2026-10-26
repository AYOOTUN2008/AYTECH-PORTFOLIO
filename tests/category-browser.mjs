import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.TEST_BASE_URL||'http://localhost:3000';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const visible=()=>page.locator('.showcase-card:visible').count();
try{
 await page.goto(base+'/work');await page.waitForSelector('.filter-apply.is-enhanced',{state:'attached'});const selector=page.getByLabel('Browse by category');assert.equal(await visible(),2);
 await page.evaluate(()=>{const v=document.createElement('video');v.pause=()=>{window.__hiddenVideoPaused=true};document.querySelector('.showcase-card[data-category=CGI]').append(v)});
 await selector.selectOption('ugc');await page.waitForFunction(()=>window.__hiddenVideoPaused===true);await page.evaluate(()=>document.querySelector('.showcase-card video').remove());assert.equal(await visible(),1);assert.match(await page.locator('.showcase-card:visible').textContent(),/Life doesn’t pause/);assert.ok(page.url().includes('category=ugc'));
 await selector.selectOption('cgi');assert.equal(await visible(),1);assert.match(await page.locator('.showcase-card:visible').textContent(),/Power meets imagination/);
 await selector.selectOption('ugc-cgi');assert.equal(await visible(),0);assert.equal(await page.locator('.filtered-project-empty').isVisible(),true);assert.equal(await page.locator('.portfolio-count').textContent(),'0 projects / 0 videos');
 await page.goBack();assert.equal(await selector.inputValue(),'cgi');assert.equal(await visible(),1);
 await page.reload();assert.equal(await selector.inputValue(),'cgi');assert.equal(await visible(),1);
 await selector.selectOption('all');assert.equal(await visible(),2);assert.ok(!page.url().includes('category='));
 await page.evaluate(()=>document.getAnimations().forEach(a=>{if(Number.isFinite(a.effect?.getComputedTiming().endTime))a.finish()}));const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.equal(axe.violations.length,0,JSON.stringify(axe.violations.map(v=>v.id)));
 await page.setViewportSize({width:320,height:800});await selector.selectOption('ugc-cgi');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'artifacts/category-dropdown-mobile.png',fullPage:false});
 // Test the fully server-rendered form when JavaScript is unavailable.
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const fallback=await nojs.newPage();await fallback.goto(base+'/work?category=ugc');assert.equal(await fallback.locator('.showcase-card:visible').count(),1);await fallback.getByLabel('Browse by category').selectOption('cgi');await fallback.getByRole('button',{name:'Apply filter'}).click();await fallback.waitForURL('**/work?category=cgi#portfolio');assert.equal(await fallback.locator('.showcase-card:visible').count(),1);assert.match(await fallback.locator('.showcase-card:visible').textContent(),/Power meets imagination/);await nojs.close();
 assert.equal(errors.length,0,errors.join('\n'));await fs.writeFile('artifacts/category-report.json',JSON.stringify({all:true,ugc:true,cgi:true,hybridEmpty:true,hiddenVideoPaused:true,backButton:true,reload:true,noJavaScriptForm:true,mobile320:true,axeViolations:0,errors},null,2));console.log('Category browser passed: exact categories, empty states, history, reload, keyboard-native selector, no-JS form, mobile and axe.');
}finally{await browser.close()}
