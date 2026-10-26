# QA report — source integration and self-service media

Validated in the cloud workspace on 26 October 2026. The deployable website and owner editor are built. The review site is deployed at https://aytech-portfolio-fawn.vercel.app. Real CMS account connection and live inquiry receipt remain unverified.

## Verified

| Check | Result |
|---|---|
| Website production build | Passed, Next.js 16.4.3 / React 19.3.1 |
| Website TypeScript | Passed as part of build |
| Sanity editor build | Passed using explicit QA-only project identifier, not deployed |
| Editor schema and seed TypeScript | Passed |
| Automated unit/render tests | **32 passed, 0 failed, 0 skipped** (29 data/API/asset tests + 3 rendered-media tests) |
| Browser content routes | **12 passed**, one H1 and distinct title/description each |
| Responsive layout | **60 checks passed** at 320, 375, 390, 768 and 1440px, no horizontal overflow |
| Automated accessibility | **0 axe violations**, all 12 pages, WCAG 2 A/AA, 2.1 AA and 2.2 AA rule tags |
| Internal link destinations | **15 passed**, including selected-service contact links and owner-management page |
| Original DGE asset integrity | All **8 assets** match source SHA-256 hashes; original dimensions retained |
| Video component browser playback | QA-only MP4 plays, controls present, caption track loads, transcript opens, no media error |
| Mobile navigation / skip link / reduced motion | Passed |
| Default staging indexing | Blocked intentionally; no guessed canonical or localhost sitemap URL |
| Error handling / 404 | Unknown route returns 404; missing email configuration returns honest 503 |
| Inquiry browser states | Error retains brief; mocked provider acceptance resets form and confirms acceptance |
| Dependency audit | Website production and editor dependency audits: **0 reported vulnerabilities** after targeted patched overrides |

The full browser scan includes home, both service pages, work index, both DGE studies, owner-management page, about, contact, insights index, buyer guide and privacy. It checks actual image decoding and no browser JavaScript errors.

## What the tests exercise

Inquiry: input validation, body limits, honeypot, cross-origin rejection, missing config, trusted proxy address, rate limiting, failed limiter, provider payload and Reply-To, idempotency, failure/timeout/missing provider confirmation and no false success.

CMS: published/rights-confirmed/draft-excluding query, tokenless reads, new published content and removal on subsequent reads without caching/rebuild, invalid documents and duplicate slugs, HTTPS CDN-only media, allowed file types, transcript/caption requirements, image-only entries and safe provider failure. CMS provider responses are injected mocks; no account upload occurred.

Rendered video: no autoplay, explicit playback controls, poster, preload none, captions and transcript; image-only entries have no fake player; transcript HTML is escaped. Chromium plays a generated black-frame test MP4 through intercepted test CDN requests. This is **internal QA media**, kept out of public portfolio assets; it is not evidence of a finished creative project.

The editor's CLI dependencies initially reported advisories. Targeted published patched versions were applied (js-yaml 3.15.2, smol-toml 1.9.1, undici 7.30.1 and typeid-js's uuid 11.1.1), then its TypeScript, production build and audit passed. No TLS, signature or checksum verification was disabled, and no forced Sanity major downgrade was used.

## Mobile Lighthouse lab measurement

Final integrated homepage, local production server, simulated mobile throttling:

- **Performance 98**, **Accessibility 100**, **Best practices 100**, **SEO 66**.
- LCP **2.2 s**, CLS **0.016**, total blocking time **50 ms**.

SEO is intentionally reduced by staging noindex protection. This is not a production SEO score, field Core Web Vitals, measured INP or a ranking promise. Scores vary with machine load. These were pre-portrait figures. See the portrait/motion update below; retest again when actual videos are supplied.

## Evidence

Ignored `artifacts/` contains the browser JSON report, five-width home screenshots, projects/video-section screenshots, Lighthouse HTML/JSON and media playback report. Source and a separate QA archive are supplied. Test fixtures are not published project work.

## Still requires owner/service access

1. **Sanity connection**: create the real project/dataset, deploy Studio with authenticated owner access, optionally import/review the original DGE concepts, and set the website's public project IDs and editor URL. Then test real upload → Publish → edit → hide/delete and actual CDN video/caption playback on the deployed site. The source workflow is built and tested; account authentication, real upload persistence, provider quotas and publication are not yet verified.
2. **Portrait**: resolved. Owner-supplied PNG is integrated, original bytes preserved, lossless source pixels verified. No generated likeness or retouching. Final responsive delivery is tested separately below.
3. **Final films / rights**: supplied V2 has no finished videos. The DGE entries are clearly labelled spec/concept studies with original product references and a disclosed AI storyboard. Confirm third-party asset public-use permission and add real final exports before presenting completed films. Other V2 supporting concepts remain unpublished without substantive original evidence.
4. **Inquiry delivery**: Resend/Upstash bindings are still absent; no live email was sent and inbox receipt remains unverified. Confirmed email and WhatsApp alternatives are present.
5. **Live deployment and search**: actual Vercel host, HTTPS, canonical and production indexing checks, external schema validators, Search Console and Bing ownership verification remain pending. No VideoObject is fabricated without real video metadata.
6. **Manual compatibility**: Chromium/axe does not establish real iOS, Safari, Firefox or screen-reader user testing. Actual codecs, caption accuracy, transcripts and final-media performance need validation as videos are uploaded.
7. **Analytics**: intentionally absent; update policy and consent controls before adding it.

## Reusable cloud configuration

Updated `install_script` and `start_skill` are saved successfully as a draft, including both dependency sets, schema check, startup and CMS limitations. Review/save and publish the cloud environment in settings when desired. This does not deploy the site/editor, connect accounts or prove fresh-task restoration.

## Live review deployment — 26 October 2026

Vercel CLI deployment completed successfully. Vercel automatically assigned the first deployment to production and the public alias https://aytech-portfolio-fawn.vercel.app. It remains a review build with noindex protection, not a claim that all launch gates are complete.

The homepage returns HTTP 200 with the expected AYTECH title/headline and `X-Robots-Tag: noindex, nofollow`. Fourteen live checks passed, including home, work, both DGE studies, both services, about, contact, manage, privacy, robots, sitemap, social card and an intentional missing-page 404. Trailing-slash links correctly redirect to normalized paths. A valid test inquiry returned the expected unconfigured-service 503; no email was sent. Record: `artifacts/live-deployment-check.json`.

Actual canonical URL configuration and final social/schema validation remain launch tasks; staging currently omits unconfigured canonical data rather than guessing it. The editor and email-delivery accounts are still not connected. GitHub was linked by Vercel, but no source commit or push was performed; this deployment used the local source upload.

## Portrait and live motion update

The original PNG from `PORTFOLIO PIC.rar` is integrated in home and about. Its SHA-256 and the lossless-source SHA-256 are tested; complete decoded RGBA equality between them was verified during preparation. Next.js delivers responsive compressed copies, retaining the original files. No crop, retouching, altered face/wardrobe or generated identity is used. Desktop and mobile portrait frames were inspected.

Production build and 32 automated tests passed. The 12-page, 60-viewport Chromium/axe suite passed with zero violations and no failed images. `npm run test:motion` separately passed magnetic button movement, pointer-driven hero depth, artwork tilt, route navigation, live reduced-motion toggling and touch fallback. All animations remain progressive enhancement. Next.js font preloads eliminated the web-font layout jump observed during development.

The full-resolution unoptimized image was too slow under mobile throttling; it was replaced with responsive quality-85 delivery from the unchanged source (about 62 KB in the measured browser request). Final lab metrics are recorded in `artifacts/lighthouse-mobile.report.json`; those are lab values, not field guarantees. Original and optimized-image live deployment checks are recorded separately when deployment finishes.

Final portrait/motion mobile lab: Performance **93**, Accessibility **100**, Best Practices **100**, SEO **66** (staging noindex). LCP **3.3 s**, CLS **0**, TBT **50 ms**. The performance score exceeds the 90 target, but simulated LCP remains above the 2.5-second ambition; no field INP is established. No further score or ranking claim is made.

The portrait/motion production deployment completed successfully at the existing alias. Home and About render the real portrait; the publicly served original PNG matches the supplied source SHA-256, and the responsive image endpoint returns a real WebP.
