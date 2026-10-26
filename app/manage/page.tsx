import type {Metadata} from 'next';
import ProjectManager from '@/components/project-manager';
import {isOwner,ownerReady} from '@/lib/owner-auth';
export const metadata:Metadata={title:'Manage Projects | AYTECH',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function Manage(){return <section className="page-hero wrap owner-page"><p className="eyebrow">AYTECH / OWNER ACCESS</p><h1>Your next project.<br/><em>One upload away.</em></h1><p className="manager-intro">Upload. Title. Description. Category. Publish.</p><ProjectManager signedIn={await isOwner()} ready={ownerReady()}/></section>}
