import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {project} from './schemaTypes/project';
export default defineConfig({
 name:'aytech',title:'AYTECH — Projects & Films',
 projectId:process.env.SANITY_STUDIO_PROJECT_ID||'missing-project-id',
 dataset:process.env.SANITY_STUDIO_DATASET||'production',
 plugins:[structureTool()],schema:{types:[project]}
});
