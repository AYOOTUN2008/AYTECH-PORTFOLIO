# Deploy to Vercel — no paid domain required

## 1. Put this source in your repository

The review site is already deployed at https://aytech-portfolio-fawn.vercel.app using a Vercel CLI local-source upload. The first deployment was automatically assigned to production, with indexing still disabled. This workspace has not pushed the source to GitHub. Review the source and push it to `AYOOTUN2008/AYTECH-PORTFOLIO` using your normal Git workflow. The checkout started on an unborn `work` branch, with no existing commits or main branch.

In Vercel, import that GitHub repository. Use Next.js defaults, the repository root as Root Directory, Node 24.x, `npm ci` for installation and `npm run build` for build. Vercel provides a free `*.vercel.app` address; a paid custom domain is optional. Plan availability and usage limits are provider-controlled.

## 2. Configure canonical address and safe indexing

Copy `.env.example` into environment settings (not into a public file). Never commit secret values.

- `SITE_URL`: the exact assigned production HTTPS origin, e.g. the URL shown by Vercel, without a path. Do not guess a hostname. Redeploy after setting it.
- Keep `SITE_INDEXABLE=false` while original portfolio assets and launch checks are pending.
- When ready, set `SITE_INDEXABLE=true` in **Production only** and redeploy. The code forces Vercel Preview deployments to remain noindex even if the flag is accidentally inherited.
- Public contact values already default to the owner-confirmed email and WhatsApp. Optional `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_WHATSAPP_NUMBER` override them; use digits only for WhatsApp.

Without a real configured origin the site omits canonical and structured-data URLs, blocks indexing and returns an empty sitemap. Once the real origin and production indexing flag are configured, canonical tags, accurate Person/WebSite/Service schema, sitemap and permissive public robots are generated. No staging hostname is invented. Test deployments are not access-controlled by noindex; enable Vercel Deployment Protection if privacy is required.

## 3. Connect inquiry delivery securely

All of these are **server-only** variables. Never prefix credentials with `NEXT_PUBLIC_` or paste them in chat.

| Variable | Value / purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key permitted to send mail |
| `INQUIRY_FROM` | A sender permitted by Resend |
| `INQUIRY_TO` | `aytechservices13@gmail.com` |
| `UPSTASH_REDIS_REST_URL` | HTTPS REST URL from an Upstash Redis database |
| `UPSTASH_REDIS_REST_TOKEN` | Redis REST token |
| `INQUIRY_IP_HEADER` | `x-vercel-forwarded-for` on Vercel; must be set by a trusted proxy |

A paid domain is not needed for the website. For a permanent branded email sender, Resend normally requires verifying a domain you control. For initial owner-only testing, Resend’s permitted onboarding sender can be used if the recipient matches the account’s verified email and the provider’s current restrictions. Create the Resend account with the intended recipient address and check the provider dashboard’s sender restrictions; do not impersonate a Gmail sender. Free provider plans may be sufficient for low-volume use, subject to their current limits. If sender authorization fails, the form returns an error, never false success.

Upstash provides durable, atomic 5-attempts/10-minute rate limiting across serverless instances. Network identifiers are HMAC-hashed; raw addresses are not stored by this application. The configuration fails closed if the trusted header or rate limiter is unavailable. For a different host, configure an overwritten client-address header; do not trust arbitrary client-supplied `X-Forwarded-For` values. Resend receives an idempotency key to reduce duplicate delivery after retries. Briefs are plain text, not interpolated HTML. The form never fetches reference URLs.

After setting variables, redeploy. Submit a real test brief **with the owner’s permission**, check it actually arrives, confirm Reply-To works, and check spam folders. Provider acceptance is not proof of inbox receipt. No live message was sent during development. Verify both direct contact links on a device with email/WhatsApp available.

Do not remove the pre-connection notice or enable fake success to bypass missing configuration.

## Self-service project and video uploads

The optional Sanity editor is in `studio/`, deployed separately to a Sanity-provided domain. Follow [CONTENT-MANAGEMENT.md](CONTENT-MANAGEMENT.md) for its one-time account/project setup. Set `SANITY_PROJECT_ID`, `SANITY_DATASET` and `SANITY_STUDIO_URL` on Vercel and redeploy once. After that, project/video publishing, editing and hiding require no rebuild or assistant. No write credential is embedded in the website. No account is connected yet.

## 4. Complete launch content

- Version 2 ZIP and eight original DGE assets are integrated; review the two concept studies and confirm permission for public brand-asset use.
- Add approved real photoshoot image without altering facial identity.
- The two concept studies are built. Add actual finished media before presenting them as completed films, and preserve role/status disclosures.
- Confirm permissions for brand logos/products; DGE remains spec/pitch.
- Review privacy notice against your real providers, retention practice and legal obligations.
- Review all copy and service scope; no work/results/client claims are invented in this build.
- Add verified social profiles only if provided. No analytics is configured; update policy/consent if you add it.

## 5. Production acceptance

```sh
npm ci
npm test
npm run build
npm run typecheck
npm start
# second terminal, default safe staging config:
npm run test:e2e
```

On the actual production host check all routes, `/social-card`, `/robots.txt`, `/sitemap.xml`, canonical and social URLs, response security headers, missing-page 404, keyboard/touch controls, 320–1440px widths, noindex preview and real form delivery. Run fresh mobile Lighthouse with final media, Google Rich Results Test and Schema Markup Validator. This build uses plain Service/Person data, not unsupported ratings or FAQ markup. Add the exact production domain to Search Console and Bing Webmaster Tools, verify ownership and submit the sitemap. Do not claim indexing or rankings until observed.

## Operations

Keep API keys server-side, limit provider permissions, review failures in provider dashboards without logging brief contents, monitor quota and rotate leaked keys. No analytics or error-reporting SDK is enabled by default. If adding logging, redact personal information. `npm run build` is required after changing canonical/index flags because most pages are prerendered. Restarting only a process is insufficient.

If the application is hosted outside Vercel, retain a Node server (this is not a pure static export), configure HTTPS and a trusted proxy, and set the correct `INQUIRY_IP_HEADER`. The local server listens on port 3000; no cloud preview URL is provided by this onboarding flow.
