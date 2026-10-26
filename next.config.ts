import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  images:{qualities:[85],formats:['image/webp']},
  async redirects(){return [{source:'/projects/dge-gadgets.html',destination:'/work/dge-gadgets-cgi/',permanent:true},{source:'/projects/dge-ugc.html',destination:'/work/dge-life-doesnt-pause/',permanent:true}]},
  async headers() { return [{ source: '/:path*', headers: [
    {key:'X-Content-Type-Options',value:'nosniff'},
    {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
    {key:'X-Frame-Options',value:'DENY'},
    {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
    {key:'Content-Security-Policy',value:"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://cdn.sanity.io https://*.public.blob.vercel-storage.com; media-src 'self' blob: https://cdn.sanity.io https://*.public.blob.vercel-storage.com; font-src 'self'; connect-src 'self' https://vercel.com/api/blob https://vercel.com/api/blob/ https://blob.vercel-storage.com https://*.blob.vercel-storage.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; object-src 'none'"},
    ...((process.env.SITE_INDEXABLE === 'true' && process.env.VERCEL_ENV !== 'preview' && process.env.SITE_URL) ? [] : [{key:'X-Robots-Tag',value:'noindex, nofollow'}])
  ]}]; }
};
export default config;
