# Upload and categorise your own projects

## Everyday workflow — after the one-time connection

1. Open **Manage projects → Open project editor** and sign in to your own Sanity account.
2. Create **Project / Video**. Enter a title, cover image, brief description and your actual role.
3. Pick **UGC**, **CGI** or **UGC + CGI** from the category dropdown.
4. Upload an optional finished **MP4/WebM** and up to **20 project images**. Add alt descriptions, drag images into order and describe what the media represents.
5. Add a transcript/visual description for video, with **WebVTT captions** for speech or meaningful audio. MP4 encoded with H.264/AAC is recommended for broad compatibility; export MOV/AVI/MKV to MP4/WebM first.
6. Write the project story, confirm publication permission, turn on **Show on the website** and **Publish**.

Refresh the website to see the update. No code edit, Git push, rebuild or assistant is needed for later content changes. You can edit, replace media, reorder, hide, unpublish or delete projects whenever needed. Keep published page addresses stable after sharing them.

The public **Projects & Videos** page has **All work / UGC / CGI / UGC + CGI**. This filters both the screening room and project cards, updates counts and preserves a shareable URL. The three categories are exact: hybrid work has its own selection. Hybrid projects also appear on both UGC and CGI service pages. Changing categories pauses a hidden video. The selector has a server-rendered form fallback without JavaScript.

Image-only projects are supported. Every image stays uncropped; source product shapes, labels and logos must stay accurate. Synthetic actors and spec projects must be labelled honestly. Publishing does not turn a concept into a paid commission or verified customer testimonial.

## One-time account connection — still required

**The editor is built, but no real Sanity account/project is connected yet.** No live account upload or publish has been verified. You do not need to send credentials in chat.

1. At `https://www.sanity.io/manage`, create/open an AYTECH project and a **public** dataset named `production`. Note the **Project ID** in project settings. It is a public identifier, not an API key. The website uses public, published-only, read-only queries without a write token.
2. Share only that public Project ID with the deployment helper. The existing Vercel connection can deploy the standalone editor as a separate Vercel project using `studio/vercel.json`; no Sanity CLI login/token is needed merely to build or host the editor. Use the real deployed hostname, never a sample QA project ID.
3. In Sanity project **API → CORS origins**, add the actual editor origin and allow credentials. Authorise only the accounts that should edit the portfolio. You then sign in **inside the hosted editor**, through Sanity's own login.
4. In the editor, open **Import existing work** and click **Import original case studies** if you want to keep the current DGE work. Original covers and source-based concept stories are imported hidden for review. Existing entries and drafts are preserved. Review the work, confirm rights, enable Show on website and Publish. DGE remains spec/concept material, not completed paid campaigns.
5. Set the website's Vercel variables once:

   ```text
   SANITY_PROJECT_ID=<the actual public project ID>
   SANITY_DATASET=production
   SANITY_STUDIO_URL=<actual https://...vercel.app or https://...sanity.studio editor URL>
   ```

   Redeploy once to connect the website. Once connected, Sanity is the authoritative project list; deleted/hidden work will not return from a local fallback. Import/publish the DGE studies before connecting if you want to retain them. Before connection, the source-backed local cases stay visible.
6. Verify a real authorised upload → Publish → edit → hide/delete cycle, plus actual poster, image, video and caption playback on mobile. No such account operation was performed during source-only QA.

No website write token is embedded in public code or sent to visitors. The editor uses the logged-in owner's Sanity permissions to upload directly, avoiding the website serverless request-body upload limit. The content and media remain in the owner's Sanity project. Published content is public; do not put confidential material, secrets or private client information in those documents.

Storage, bandwidth and file-size allowances depend on Sanity's current plan. Start within the available plan limits and compress distribution copies before uploading. If video volume later needs adaptive streaming or exceeds quotas, evaluate a dedicated video host; no paid service or purchase is configured now.

## Developer build / alternate hosting

Node 24 is tested. Studio requires Node 22.12+.

```sh
npm ci
npm --prefix studio ci
npm run cms:check
# Set the real public IDs first, in studio/.env.local or the build environment:
npm run cms:build
```

`studio/vercel.json` configures a standalone static build with SPA route fallback. Deploy `studio/` as the Vercel project root and set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` there. The main site's `.vercelignore` deliberately excludes this separate editor source from the website deployment.

Alternatively, an owner authenticated on their **own local machine** can run `npx sanity login` and `npm run deploy` from `studio/` to host on an available `*.sanity.studio` hostname. That CLI browser login uses a localhost callback, which is not directly reachable in this cloud chat workflow. Do not ask the owner to paste a callback credential or token into chat. The optional local `npx sanity exec scripts/seed.ts --with-user-token` imports the same hidden starter cases; the authenticated browser import tool is easier for most owners.

## Validation and recovery

Editor validation and website validation both recognise the hybrid category and an optional original-image gallery. Required poster/alt/story/role fields, rights confirmation, media disclosures, transcript and caption checks remain active. The website accepts only HTTPS assets from `cdn.sanity.io`; content text is escaped and never executed as HTML.

A provider outage fails closed, rather than resurrecting hidden projects. An invalid record is excluded; review its required fields and permissions if work is missing. Check Sanity status/quota and refresh after publishing. No autoplay, background tracking, client-side write key or required polling is used.

Verification commands: `npm test`, `npm run build`, `npm run cms:check`, `npm run cms:build`, `npm run test:e2e`, `npm run test:categories`. Tests cover category semantics, validation, combined-project service discovery, gallery safety, browser history/reload, hidden-video pausing, no-JavaScript form submission and the mobile native selector. Real owner-account persistence and upload permissions still require the actual connection.
