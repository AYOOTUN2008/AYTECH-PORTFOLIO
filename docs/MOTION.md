# Live motion update

Implemented native pointer-responsive motion with CSS transforms, individual translate/rotate properties, requestAnimationFrame batching and IntersectionObserver/Web Animations. No additional animation library, cursor replacement, scroll capture or content-blocking preloader.

- Hero: staggered text/CTA entrance, slow ambient orbital geometry and rotating signature, pointer-driven depth across the hero and portrait background.
- Buttons/navigation/circular actions: magnetic movement capped at 9px horizontally / 6px vertically, directional arrow response and a subtle pointer-positioned button highlight.
- Service illustrations: restrained pointer tilt and distinct depth movement of the CGI ring, orbs, word layer and UGC story layers.
- Original project images: hover-lift of the media frame; source pixels, product shape, colours and logos stay unmodified and uncropped.
- Site sections: viewport-triggered headings, copy, process, projects, FAQs, contact/about and footer reveals. Content is not pre-hidden and works without JavaScript.
- Other interactions: capability-row sweep, process-heading lift, FAQ opening, footer signature rotation, screening-room light response and reading-progress line.
- Lifecycle: effect reinitializes on route navigation; observers/listeners/animations/frames are cleaned up. Reduced-motion can be changed while browsing and immediately clears active transforms. Fine-pointer effects are not applied to touch devices.

`tests/motion-browser.mjs` checks actual magnetic translation, hero pointer variables, illustration transforms, reinitialization after navigation, live reduced-motion cleanup and touch fallback. The full responsive/accessibility suite is rerun for the visual change.

## Portrait integration

`components/portrait.tsx` serves only an actual owner-supplied file placed at one of:

- `public/images/aytech-portrait-original.png`
- `public/images/aytech-portrait-original.jpg`
- `public/images/aytech-portrait-original.jpeg`
- `public/images/aytech-portrait-original.webp`

It uses a contained owner-supplied image for hero and about, with no retouching, face generation, colour filter, forced crop or logo substitution. The supplied PNG is preserved byte-for-byte. A lossless WebP source has verified identical decoded RGBA pixels, and Next.js supplies responsive quality-85 WebP delivery copies without editing the facial identity. The decorative background moves independently; the photograph receives only a small rigid display translation. Rebuild and deploy after adding the original.

The owner subsequently supplied `PORTFOLIO PIC.rar`, containing `PORTFOLIO PIC.png` (1086 × 1448 RGBA). It is integrated in both sections. SHA-256 provenance is recorded in `content/portrait-provenance.json`; the original bytes and lossless delivery source are tested. No reconstructed copy is used. When replacing the original in future, regenerate the verified lossless source too, because the component selects that display source first. Fonts now use Next.js local font loading/preloading and metric-adjusted fallbacks to prevent layout jumps.
