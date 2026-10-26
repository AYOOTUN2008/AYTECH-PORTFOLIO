import {StarterProjects} from './components/starter-projects';
import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {project} from './schemaTypes/project';
export default defineConfig({
 name:'aytech',title:'AYTECH — Projects & Films',
 projectId:process.env.SANITY_STUDIO_PROJECT_ID||'missing-project-id',
 dataset:process.env.SANITY_STUDIO_DATASET||'production',
 plugins:[structureTool()],tools:[{name:'starter-projects',title:'Import existing work',component:StarterProjects}],schema:{types:[project]}
});
