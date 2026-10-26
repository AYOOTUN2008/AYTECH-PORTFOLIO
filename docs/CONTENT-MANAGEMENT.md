# Upload projects and videos yourself

The site now has a **Projects & Videos** destination (`/work/`) with a dedicated **Screening Room** for finished films. An owner shortcut, **Manage projects**, is in the footer at `/manage/`.

The self-service editor is built with Sanity Studio. It is a separate authenticated application; visitors cannot upload to your portfolio. **No Sanity account is connected yet**, so live upload/publish has not been exercised. A one-time connection is required; no paid website domain is needed and the Vercel URL can be supplied later.

## After the one-time connection: everyday use

1. Open **Manage projects → Open project editor** and sign in to your Sanity account.
2. Choose **Project / Video**, then create a document.
3. Enter title, brand/project name, category, true status and your actual role. Generate the page address.
4. Upload an original **cover image** and describe it with alt text. The site displays original assets without forced cropping or colour filters.
5. Optionally upload a finished **MP4 or WebM** in Photos & video. MP4 encoded H.264/AAC is recommended for broad playback. MOV, AVI, MKV and unusual codecs should be exported to a supported format first; “any video” cannot mean every possible browser codec.
6. Add captions as **WebVTT (.vtt)** for meaningful audio/speech, plus a transcript or visual description. For a genuinely silent film, turn off the speech/meaningful-audio field; a visual description is still required.
7. Write the project story, actual deliverables and disclosure (e.g. AI-assisted dramatization or finished film).
8. Confirm you have permission to publish, turn on **Show on the website**, then click **Publish**.
9. Refresh your public Projects & Videos page. The server reads published content on each request; **no new site build, Git edit or request to an assistant is needed**.

You can edit existing projects, change display order (lower numbers first), replace media, or turn **Show on the website** off and publish to hide them. Deleting/unpublishing removes the project from the managed site. Keep published slugs stable to preserve shared links. Editing a draft does not change the public version until Publish is clicked. To add still-image or design projects, leave the video field empty.

Uploads go directly to Sanity through its authenticated editor, avoiding Vercel's serverless request-body upload limit. Your public site reads media from the Sanity CDN. Storage/bandwidth/file-size allowances depend on the provider’s current plan; check quota and compress distribution copies before uploading. Do not put confidential client assets or personal data in published documents.

## One-time setup (owner or deployment helper)

This is account configuration, not a per-video task. Do not paste passwords or API keys into chat.

1. Create/sign in to your account at `https://www.sanity.io/manage`. Create a project for AYTECH and a **public** dataset named `production`. This website integration is read-only and tokenless. Keep drafts/internal notes free of secrets; only approved public content belongs here.
2. Copy `studio/.env.example` to `studio/.env.local`. Set the real project ID and dataset. Project IDs are public identifiers, not passwords.
3. From the `studio/` directory:

   ```sh
   npm ci
   npx sanity login
   npm run dev
   ```

   Sign in through Sanity’s supported authentication. Do not add a write token to website code or a `NEXT_PUBLIC_` variable.
4. Optional, to move the two existing DGE concept studies into your editor without retyping:

   ```sh
   npx sanity exec scripts/seed.ts --with-user-token
   ```

   This uploads the supplied original covers and imports source-based concept stories, **hidden** until you review them. It uses your authenticated CLI session. It never overwrites existing documents and does not auto-confirm publication rights. Review both entries, confirm permission, set Show on website, and Publish before switching the website to managed content. Original DGE assets must not be represented as paid commissions or finished films.
5. Deploy your editor from `studio/`:

   ```sh
   npm run deploy
   ```

   Choose an available Sanity Studio hostname. Sanity provides a `*.sanity.studio` address; use the actual assigned address, not a guessed one. Check Sanity project API/CORS settings to allow that Studio origin with credentials. Authorize only people who should edit your portfolio. The public website server query does not require a browser CORS exception or a write token.
6. In the website's Vercel environment settings set:

   ```text
   SANITY_PROJECT_ID=<your actual project ID>
   SANITY_DATASET=production
   SANITY_STUDIO_URL=<the actual https://...sanity.studio URL>
   ```

   Redeploy the website **once** to connect it. `SITE_URL` can remain unset until the actual Vercel hostname is known; it is separate from editor functionality. Leave indexing disabled while launch checks remain incomplete.
7. Once connected, Sanity is the authoritative project list. It replaces the local fallback studies, rather than bringing deleted/hidden projects back from source. Import/publish the DGE studies first if you want to retain them. Before connection, the site continues showing the original local cases.
8. Test with a real authorized sample: publish an image-only project, then a short MP4/WebM with poster/transcript/captions, check playback and text on mobile, edit and hide it, and confirm the public site responds after refresh. No real account upload or publication was performed in this workspace.

## Validation and maintenance

The editor validates required information, slug format, rights confirmation and accessible video context. The website independently validates content and accepts only HTTPS media from `cdn.sanity.io`, supported project categories and browser-ready file extensions. Invalid entries are excluded, never executed as HTML. Captions require the correct file type; transcript text is rendered as plain text.

A provider outage fails closed rather than resurrecting hidden projects or showing unapproved draft media. It can temporarily leave the managed gallery empty; check Sanity status and quota if published work is missing. Refresh the site after publishing. No polling, automatic page refresh, video autoplay or client-side write credentials are used.

Commands: main app `npm run build`, `npm test`, `npm run test:e2e`; editor `npm --prefix studio ci` and `npm --prefix studio run build`. Studio requires Node 22.12+; Node 24 is tested. Studio schema/seed TypeScript check: `./node_modules/.bin/tsc --noEmit --project studio/tsconfig.json` after installing both packages.

Source-backed automated tests cover published-only query filters, unsafe media rejection, captions/transcript requirements, live read behavior, duplicate/malformed documents and provider failure. These tests are not a substitute for owner-account login, genuine upload and live playback verification.
