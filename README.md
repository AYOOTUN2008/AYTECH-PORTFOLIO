# AYTECH Creative

Editorial UGC / CGI portfolio built with Next.js App Router, React and TypeScript. The supplied blueprint governs the build. Original Version 2 DGE assets now support two clearly labelled spec/concept studies. The owner’s original portrait is integrated; finished video exports remain pending.

## Run locally

Node 22.6+ (tested with Node 24.19), npm.

```sh
npm ci
npm run dev
```

For production validation:

```sh
npm test
npm run build
npm run typecheck
npm start
```

In another terminal, `npm run test:e2e`. Browser QA uses `/usr/bin/chromium`; override with `CHROMIUM_PATH`, or install a Playwright browser and adjust the path. Browser tests expect the safe, unconfigured staging setup. Screenshots and machine-readable QA go to ignored `artifacts/`.

See [Version 2 asset audit](docs/ASSET-AUDIT.md), [Vercel deployment](docs/DEPLOYMENT.md), [QA results](docs/QA.md), [implementation and asset handover](docs/IMPLEMENTATION.md), and [.env.example](.env.example).

## Self-service uploads

The Projects & Videos page and Sanity owner editor are built, with UGC / CGI / UGC + CGI categories, a public dropdown filter, video uploads and multi-image galleries. After a one-time account connection, publish new videos and projects without code edits or site rebuilds. See [upload and editor setup](docs/CONTENT-MANAGEMENT.md). The editor is deployed at https://aytech-project-editor.vercel.app for Sanity project yn7q2h3e. Owner CORS approval, content import/publication and the website data switch remain pending.

## Confirmed public contacts

- aytechservices13@gmail.com
- WhatsApp: +234 816 937 8718

No custom domain is needed. Use the actual Vercel-assigned subdomain once deployed. Review deployment is live at https://aytech-portfolio-fawn.vercel.app (26 October 2026). Search indexing remains disabled. The portrait and live motion are integrated. Live CMS account connection and real email-delivery setup remain pending.

## Portrait and live motion

Original portrait and pixel-identical lossless source are preserved with hashes in `content/portrait-provenance.json`. Responsive browser delivery uses standard image compression; no facial retouching, regeneration or crop. Live pointer interactions, magnetic controls, layered hero motion and scroll reveals are documented in [MOTION.md](docs/MOTION.md). `npm run test:motion` checks actual browser interaction and reduced-motion/touch fallbacks.
