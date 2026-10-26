import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {projects} from '../lib/projects.ts';
const inventory=JSON.parse(fs.readFileSync(new URL('../content/asset-inventory.json',import.meta.url)));
test('all eight supplied brand assets preserve their source bytes',()=>{assert.equal(inventory.length,8);for(const asset of inventory){const bytes=fs.readFileSync(new URL('../'+asset.file,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,asset.file)}});
test('case-study images have correct intrinsic dimensions and accurate concept labels',()=>{assert.equal(projects.length,2);for(const p of projects){const asset=inventory.find(a=>a.file==='public'+p.image);assert.ok(asset);assert.equal(p.width,asset.width);assert.equal(p.height,asset.height);assert.match(p.status,/spec|pitch/i);assert.equal(p.results,null);assert.ok(p.mediaType.includes('not'));assert.equal(p.isPublished,true)}});

test('owner portrait original and lossless display asset retain their verified bytes',()=>{const p=JSON.parse(fs.readFileSync(new URL('../content/portrait-provenance.json',import.meta.url)));for(const [file,hash] of [[p.file,p.sha256],[p.displayFile,p.displaySha256]]){assert.equal(createHash('sha256').update(fs.readFileSync(new URL('../'+file,import.meta.url))).digest('hex'),hash)}assert.match(p.displayTreatment,/complete decoded RGBA byte equality/)});
