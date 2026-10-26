import CategoryBrowser from '@/components/category-browser';
import Showcase from '@/components/showcase';
import {getProjects} from '@/lib/project-store';
import {parsePortfolioFilter} from '@/lib/categories';
import {meta} from '@/lib/site';
import {CTA} from '@/components/ui';
export const dynamic='force-dynamic';
export const metadata=meta('Projects & Videos | UGC & CGI by AYTECH','Watch AYTECH’s UGC, CGI and combined creative projects. Explore films, images and creative studies.','/work/');
export default async function Work({searchParams}:{searchParams:Promise<{category?:string|string[]}>}){const params=await searchParams;const projects=await getProjects();return <><section className="page-hero wrap showcase-hero"><p className="eyebrow">AYTECH / THE WATCHLIST</p><h1>Big ideas.<br/><em>Press play.</em></h1><p>UGC stories. CGI worlds. And the work in between.</p></section><CategoryBrowser initialCategory={parsePortfolioFilter(params.category)} items={projects.map(p=>({category:p.category,hasVideo:!!p.video}))}><section className="wrap showcase-section" id="projects"><Showcase projects={projects}/><p className="filtered-project-empty">No projects in this category yet. Choose another category.</p><p className="media-note">The original DGE studies are independent concepts. Their production status is shown on each project.</p></section></CategoryBrowser><CTA/></>}
