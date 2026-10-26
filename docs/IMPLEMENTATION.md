# Implementation and content handover

The initial two blueprints were identical and the repository was empty. The subsequently supplied all-in-one ZIP contains the Version 2 static site and original DGE media. Its product references, logo, storyboard and concept narratives are now integrated into the original Next.js implementation. See ASSET-AUDIT.md for provenance, exact-copy verification and unpublished supporting concepts. The original owner portrait has since been received in a RAR and integrated without retouching; finished films remain pending.

| Route | Intent / sections | Owner asset | Metadata / schema | CTA |
|---|---|---|---|---|
| `/` | Identity, two services, work status, principles, capabilities, process, FAQs | Original owner portrait | Unique metadata; Person/WebSite when canonical configured | CGI, UGC, contact |
| `/services/ugc-ads/` | Fit, deliverables, synthetic-content disclosure, process, answers | Real UGC pending | Unique metadata; Service when canonical configured | UGC brief |
| `/services/cgi-commercials/` | Fit, deliverables, reference fidelity, process, answers | Real CGI pending | Unique metadata; Service when canonical configured | CGI brief |
| `/work/` | Two spec/concept studies and evidence standard | Original V2 DGE references | Unique metadata | Case study |
| `/work/dge-gadgets-cgi/` | Product references, creative challenge, three territories | Original DGE media and logo | Unique metadata; CreativeWork and breadcrumbs when origin configured | CGI brief |
| `/work/dge-life-doesnt-pause/` | AI-assisted storyboard, story beats, transparency | Supplied AI-generated storyboard and DGE logo | Unique metadata; CreativeWork and breadcrumbs when origin configured | UGC brief |
| `/about/` | Confirmed identity, Nigeria, OOU undergraduate context | Original owner portrait | Unique metadata | Contact |
| `/contact/` | Real contact links; server-backed inquiry form | Confirmed email and WhatsApp | Unique metadata | Send brief / email / WhatsApp |
| `/insights/` | One substantive buyer guide | None | Unique metadata | Guide |
| `/insights/ugc-vs-cgi-ads/` | Format comparison, rights, assets, briefing | No unsupported first-person campaign claims | Unique metadata | Contact |
| `/privacy/` | Data use, delivery providers, retention, contact | Owner policy review needed | Unique metadata | Email |

## Design

Obsidian, ivory and lavender; Space Grotesk, DM Sans and Instrument Serif self-hosted through font packages. Large editorial type, asymmetrical desktop hero, original-portrait frame. Human-side warm story composition and impossible-side CSS sculpture are original studio illustrations, explicitly not campaign evidence. No fake products, clients, generated faces or altered logos.

Mobile-first layouts, semantic navigation, skip link, focus states, native keyboard-accessible disclosures, labelled forms, reduced-motion override. Content stays visible without animation. CSS transform/opacity entrance and hover motion; no scroll capture, custom cursor, loader or autoplay.

## Asset integration

1. Version 2 ZIP received and audited. Do not blindly overwrite the new implementation with the older static architecture or treat older contacts as verified.
2. Place approved originals in `public/images/`, logos in `public/logos/`, videos in `public/videos/` and captions in `public/captions/`. Do not commit private or unlicensed material.
3. Original portrait is integrated in shared `components/portrait.tsx`. Its PNG and pixel-identical lossless WebP source are preserved; responsive web delivery is handled by Next.js. Do not retouch or regenerate the face, skin tone, hair or wardrobe. Keep object-fit contain and the original composition. See MOTION.md for replacement details.
4. Two source-backed concept studies are registered in `lib/projects.ts` and documented in `content/projects.json`. Extend those records only with substantive original evidence. Keep media type, status and actual role explicit.
5. DGE Gadgets must remain a spec/pitch exploration. Original lion logo and product media only. Label synthetic UGC as AI-assisted dramatization. No customer testimonial or performance inference.
6. Add click-to-play real video with controls, poster, captions and transcript. Only then consider VideoObject markup with verified dates/duration.

## Deliberate omissions

No testimonials, client endorsement strip, invented achievements, fake results, invented case studies, stock people or stock products. The supplied AI storyboard is clearly disclosed. No fabricated social profiles. No thin branding/service-city pages. No analytics, trackers or cookies; add only with reviewed policy and consent where applicable. No rank guarantees or FAQ rich-result promises. No public domain guessed from the brand.

## Owner-managed projects and videos

The `/work/` destination now includes a finished-video Screening Room and project gallery. `/manage/` links to a separate authenticated Sanity Studio once configured. `studio/` contains the schema, uploader/editor and an idempotent seed script for importing the original DGE concepts for review. `lib/cms.ts` validates tokenless published-only reads; the configured CMS becomes authoritative so deleted or hidden work does not return from a local fallback. New slugs render automatically and the sitemap follows published content. See CONTENT-MANAGEMENT.md for setup, everyday use and the outstanding real-account checks.

## Changes delivered

New Next.js App Router / TypeScript application, shared visual components and self-hosted fonts; twelve content routes, 404, social image, icon, sitemap and robots; validated server inquiry delivery adapter; Resend idempotency and Upstash atomic rate limiting; secure configuration sample; production build, browser/axe tests and delivery tests; Vercel deployment and QA documentation.

## Owner category controls

The owner schema now offers UGC, CGI and UGC + CGI, with a multi-image gallery in addition to the poster/video. The public work page uses progressively enhanced, shareable category filtering without removing server-rendered project links. Hidden films pause. Supporting legacy category values are still readable; the three primary choices are the authoring UI. Sanity Studio can be hosted as a separate static Vercel application and supports an authenticated import of the original local case studies without overwriting existing work.
