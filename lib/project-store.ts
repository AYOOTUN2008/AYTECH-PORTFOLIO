import {cache} from 'react';
import {loadCmsProjects,cmsConfigured} from '@/lib/cms';
import {projects} from '@/lib/projects';
export const getProjects=cache(async()=>{if(!cmsConfigured())return projects;return await loadCmsProjects()});
