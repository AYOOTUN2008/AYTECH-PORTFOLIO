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

The simple owner uploader lives at `/manage` on the portfolio website. Upload video/images, enter title and description, choose UGC / CGI / UGC + CGI, and publish. New projects appear in a social-style gallery with a modal player, without a rebuild. Public media storage and private project-record storage are connected on Vercel. Set the owner’s production password to activate sign-in. See [simple uploader guide](docs/SIMPLE-UPLOADER.md). Sanity is not required for this publishing flow; the older Studio source is retained for reference.

## Confirmed public contacts

- aytechservices13@gmail.com
- WhatsApp: +234 816 937 8718

No custom domain is needed. Use the actual Vercel-assigned subdomain once deployed. Review deployment is live at https://aytech-portfolio-fawn.vercel.app (26 October 2026). Search indexing remains disabled. The portrait and live motion are integrated. The owner password and real email-delivery setup remain pending.

## Portrait and live motion

Original portrait and pixel-identical lossless source are preserved with hashes in `content/portrait-provenance.json`. Responsive browser delivery uses standard image compression; no facial retouching, regeneration or crop. Live pointer interactions, magnetic controls, layered hero motion and scroll reveals are documented in [MOTION.md](docs/MOTION.md). `npm run test:motion` checks actual browser interaction and reduced-motion/touch fallbacks.
