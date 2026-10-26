import type {Project} from '@/lib/projects';
import {SectionLabel} from '@/components/ui';

/** Brand reference images are delivered without crop, filters or reconstruction. */
export default function ProjectGallery({images}:{images:Project['gallery']}){
 if(!images?.length)return null;
 return <section className="wrap case-gallery"><SectionLabel n="IMAGES">THE PROJECT, IN DETAIL</SectionLabel><div>{images.map((img,i)=><figure key={img.url+'-'+i}><img src={img.url} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async"/><figcaption>{img.alt}</figcaption></figure>)}</div></section>;
}
