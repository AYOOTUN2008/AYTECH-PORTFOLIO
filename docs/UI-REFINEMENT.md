# Reference-led UI — 5 November 2026

The owner supplied dark/teal portfolio references after reviewing the earlier ivory/plum direction. The current implementation uses the references' palette, contained navigation, portrait framing and card organisation, with AYTECH's own content and original portrait. It does not use the reference person's photo, identity or claims.

## Current design

- Charcoal background, layered slate surfaces, bright teal controls and restrained glow. Text contrast remains readable across public pages and the private uploader.
- Central pill navigation and a separate desktop contact action; accessible collapsible navigation on mobile.
- A short hero, original portrait in a rounded frame, decorative teal points and slow moving light lines. Source portrait pixels and original product/logo assets remain unchanged.
- Five homepage sections: introduction, selected work, two services, short about introduction and contact invitation.
- Homepage and public gallery share one card/player component. Thumbnails have consistent dimensions, original uncropped media, accurate category/production labels, concise descriptions and a clear viewing action.
- Gallery filters intersect exact UGC/CGI/UGC + CGI categories with all projects, films/videos or image projects. State is shareable in the URL, restores after navigation/reload, and works through server-rendered forms without JavaScript. Empty selections are explained. Hidden videos pause.
- The gallery introduction is compact so visitors reach the work sooner. Two-project collections use two columns on desktop; larger collections use three, with responsive two/one-column layouts.
- About-page cards explain direction, product accuracy, motion and collaboration without fabricated achievements or client relationships.
- Native video controls, captions/transcripts where supplied, modal keyboard behaviour and reduced-motion/touch fallbacks remain available. Existing publishing/authentication/storage are unchanged.

## Verification

- Production build and 43 unit/render/API checks pass, including original portrait/product/logo integrity and category/media intersections.
- Browser checks: 12 routes, 60 responsive checks across 320/375/390/768/1440, no horizontal overflow, zero axe violations, functioning mobile navigation and inquiry error/success handling. Email success is mocked, not a new live-delivery claim.
- Category checks include media-filter combinations, empty states, URL/reload/history behaviour, hidden video pause and no-JavaScript filtering.
- Motion checks pass for magnetic buttons, hero response, card movement, navigation, live reduced-motion changes and touch fallback.
- Authenticated owner-form and project-viewer mobile axe checks have zero violations. The form check uses isolated test credentials and mocked project reads; no production storage write was made.
- After compacting the gallery header, the final gallery was separately checked at all five widths for overflow and axe violations.
- Desktop/mobile layouts and the final hero/card presentation were visually inspected. Evidence: ignored `artifacts/teal-*.png`, `teal-ui-checks.json`, `teal-gallery-final.json` and existing browser/category/motion reports.

Search indexing and live inquiry-email configuration retain their previous staging state. Google Flow production is a subsequent phase; its reference/prompt/review framework is in `FLOW-PRODUCTION-WORKFLOW.md`. No generated film or invented brand commission has been added by this UI update.
