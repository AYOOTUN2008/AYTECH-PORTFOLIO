# AYTECH simple uploader

The owner publishes at `/manage` on the portfolio website. Sanity is no longer part of the upload flow. The old Studio source is retained for reference; no Sanity account, CORS setup, or migration is required for this uploader.

## Owner routine

1. Open `https://aytech-portfolio-fawn.vercel.app/manage/` and sign in.
2. Select a video and/or project images.
3. Enter title and description; choose UGC, CGI or UGC + CGI.
4. Publish. Updates are read on the next page request, without a build.

The public `/work/` page has responsive media cards, exact category filtering and an accessible modal player with native playback controls. Video does not autoplay. Images use contain sizing and preserve originals. Projects also have shareable detail pages. New work appears ahead of the original case studies, which remain available.

Use one browser-ready H.264 MP4 (recommended) or WebM per project, optionally accompanied by images. Maximum 20 files, 500 MB per file, 500 projects. PNG/JPEG/WebP/AVIF are accepted; SVG/HTML uploads are rejected. Media is not transcoded or recompressed by this app. A thumbnail is taken from the video by the browser; the first uploaded image is used as the cover on detail/service pages. Descriptions can hold dialogue and visual context. Burn accurate captions into spoken videos before uploading: this simplified editor does not have a separate subtitle field. Native captions remain supported for the original CMS format.

Edit changes the fields, with optional replacement media. Remove unpublishes the project. Uploaded files remain in Blob storage after removal or failed/abandoned uploads; remove unused files in Vercel Storage when certain they are no longer referenced. Files are public by URL immediately after upload, so do not upload confidential drafts. No fabricated campaign outcomes or relationships are added.

## Deployment connection

- A public Vercel Blob store `aytech-project-media` and a private records store `aytech-project-records` have been created and connected to the portfolio's production environment.
- `BLOB_READ_WRITE_TOKEN` (public media) and `PROJECTS_READ_WRITE_TOKEN` (private records) are server-only, supplied by the connections.
- `OWNER_SESSION_SECRET` is generated and stored in Vercel production.
- Owner must set `OWNER_PASSWORD` in Vercel production environment variables. Do not put it in chat, Git, or NEXT_PUBLIC variables. Use a long unique password saved in a password manager.
- Redeploy after changing credentials. Rotating OWNER_SESSION_SECRET invalidates existing sessions.
- `OWNER_PASSWORD_HASH` is an optional scrypt salt:hex-hash alternative for operators; OWNER_PASSWORD takes precedence.

Storage and transfer are metered by Vercel. This is direct object storage, not an adaptive streaming/transcoding service. Large video traffic may require a streaming provider later; no paid upgrade is enabled by this implementation.

## Security and consistency

An HttpOnly, Secure production, SameSite=Strict HMAC-signed cookie expires after eight hours. Passwords stay on the server. Mutations require exact Origin matching and authentication. Login permits five attempts per 15-minute window per trusted Vercel client IP; hashed counters and ETag conditional writes live in private Blob storage so they persist across instances. Rate-limit storage errors fail closed. Actual streamed JSON body sizes are bounded. Upload tokens allow only `projects/` media paths, approved MIME types, 500 MB limits, random filenames, and no overwrite. Blob completion callbacks use the SDK's signature verification. Admin metadata has schema validation. ETag conditional writes prevent one browser tab from overwriting another tab's newer project changes.

The project index contains presentation metadata and is kept in the private records store, read by the server. Private uncached reads avoid the public CDN’s cache delay after publication. It lives at `portfolio/published.json`. No passwords, secrets, or private drafts go there. `PROJECT_INDEX_PATH` is a server-only override for isolated QA; never set it on production. Credential and media access control must not depend on the secrecy of public media URLs.

## Tests

`npm test` covers asset integrity, categories, existing API behavior, media rendering, managed-entry validation, owner session tampering/expiry, origin checks and bounded JSON parsing. `npm run build` verifies production compilation. `node tests/simple-manager-browser.mjs` verifies the owner UI, upload, publish/edit/remove, public cards, playback and mobile accessibility against an isolated QA index (requires configured test server). It must not point at production's index.
