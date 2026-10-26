import {starterStory} from '../lib/starter-story';
/** Run once by the project owner: sanity exec scripts/seed.ts --with-user-token */
import {getCliClient} from 'sanity/cli';
import {createReadStream,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
const client=getCliClient({apiVersion:'2025-02-19'});
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const {projects}=JSON.parse(readFileSync(resolve(root,'content/projects.json'),'utf8'));
for(const p of projects){
 const id='aytech-project-'+p.slug;
 if(await client.getDocument(id)){console.log('Existing project preserved:',p.slug);continue;}
 const asset=await client.assets.upload('image',createReadStream(resolve(root,'public'+p.image)),{filename:p.image.split('/').pop()});
 const ugc=p.category==='UGC';
 const story=starterStory(ugc);
 await client.createIfNotExists({_id:id,_type:'project',title:p.title,slug:{_type:'slug',current:p.slug},brand:p.brand,category:p.category,status:p.status,...(p.year?{year:p.year}:{}),summary:p.summary,productionRole:p.productionRole,poster:{_type:'image',asset:{_type:'reference',_ref:asset._id},alt:p.alt},mediaType:p.mediaType,story,deliverables:p.deliverables,isPublished:false,rightsConfirmed:false,sortOrder:ugc?20:10});
 console.log('Imported for owner review (hidden until permissions confirmed):',p.slug);
}
