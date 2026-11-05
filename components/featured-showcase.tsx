import {getProjects} from '@/lib/project-store';
import Showcase from '@/components/showcase';
export default async function FeaturedShowcase(){return <Showcase projects={(await getProjects()).slice(0,2)}/>}
