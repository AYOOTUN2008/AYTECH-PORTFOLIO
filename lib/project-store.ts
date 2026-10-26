import {cache} from 'react';
import {unstable_noStore as noStore} from 'next/cache';
import {loadCmsProjects,cmsConfigured} from '@/lib/cms';
import {projects} from '@/lib/projects';
import {readEntries,asProject} from '@/lib/managed-projects';
export const getProjects=cache(async()=>{noStore();if(process.env.BLOB_READ_WRITE_TOKEN&&process.env.PROJECTS_READ_WRITE_TOKEN){const {entries}=await readEntries();return [...entries.map(asProject),...projects];}if(!cmsConfigured())return projects;return await loadCmsProjects()});
