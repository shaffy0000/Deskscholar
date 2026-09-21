/**
 * Build-time prerendering: gives every route real server-rendered metadata in
 * raw HTML (title, description, canonical, Open Graph, Twitter, JSON-LD),
 * modulepreload hints for that route's chunks, plus generated robots.txt and
 * sitemap.xml using the single SITE_URL configuration.
 *
 * Run after `vite build`. Client Helmet keeps managing the same tags after
 * hydration (they carry data-rh so react-helmet-async adopts them).
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { routeMeta, INDEXABLE_ROUTES } from '../src/data/routeMeta.ts';
import { buildStructuredData } from '../src/data/structuredData.ts';

const SITE_URL = (process.env.VITE_SITE_URL || '').trim() || 'https://www.deskscholar.com';
const PLACEHOLDER = SITE_URL.includes('example.com');
if (PLACEHOLDER) {
  console.warn(
    '\n[prerender] WARNING: production domain is not configured. robots.txt, sitemap.xml and canonical URLs use a placeholder — set VITE_SITE_URL (Vercel → Settings → Environment Variables) before publishing.\n',
  );
}
if (!/^https:\/\/[^/]+$/.test(SITE_URL)) {
  console.warn(`[prerender] VITE_SITE_URL looks unusual: "${SITE_URL}"`);
}

const dist = 'dist';
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const abs = (p) => `${SITE_URL}${p}`;

let manifest = {};
try {
  manifest = JSON.parse(readFileSync(join(dist, '.vite', 'manifest.json'), 'utf8'));
} catch {
  console.warn('[prerender] build manifest not found — route chunks will not be modulepreloaded');
}

/** Transitive JS chunk files for a manifest module key. */
function chunkFilesFor(srcKey) {
  const seenKeys = new Set();
  const files = [];
  const queue = [srcKey];
  while (queue.length) {
    const key = queue.shift();
    const entry = manifest[key];
    if (!entry || seenKeys.has(key)) continue;
    seenKeys.add(key);
    if (entry.file && entry.file.endsWith('.js')) files.push(entry.file);
    for (const dep of entry.imports || []) queue.push(dep);
  }
  return files;
}

const PAGE_MODULES = {
  home: 'src/pages/HomePage.tsx',
  technology: 'src/pages/TechnologyPage.tsx',
  schools: 'src/pages/SchoolsPage.tsx',
  journey: 'src/pages/JourneyPage.tsx',
  team: 'src/pages/TeamPage.tsx',
  contact: 'src/pages/ContactPage.tsx',
  privacy: 'src/pages/PrivacyPage.tsx',
  terms: 'src/pages/TermsPage.tsx',
};

// Chunks the entry graph already modulepreloads from index.html — skip them.
const entryPreloads = new Set(
  [...template.matchAll(/<link rel="modulepreload"[^>]+href="([^"]+)"/g)].map((m) => m[1].replace(/^\//, '')),
);
const entryScripts = new Set(
  [...template.matchAll(/<script type="module"[^>]+src="([^"]+)"/g)].map((m) => m[1].replace(/^\//, '')),
);

function routePreloads(pageKey) {
  const files = chunkFilesFor(pageKey).filter(
    (f) => !entryPreloads.has(f) && !entryScripts.has(f) && !f.includes('.css'),
  );
  return files.map((f) => `<link rel="modulepreload" href="/${f}" />`).join('\n    ');
}

function escapeAttr(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function headMeta(meta) {
  const canonical = abs(meta.path);
  const image = abs('/assets/deskscholar/og-deskscholar.webp');
  const tags = [
    `<meta name="description" content="${escapeAttr(meta.description)}" data-rh="true" />`,
    `<link rel="canonical" href="${canonical}" data-rh="true" />`,
    `<meta property="og:type" content="website" data-rh="true" />`,
    `<meta property="og:site_name" content="DeskScholar" data-rh="true" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" data-rh="true" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" data-rh="true" />`,
    `<meta property="og:url" content="${canonical}" data-rh="true" />`,
    `<meta property="og:image" content="${image}" data-rh="true" />`,
    `<meta property="og:image:width" content="1200" data-rh="true" />`,
    `<meta property="og:image:height" content="630" data-rh="true" />`,
    `<meta property="og:image:alt" content="DeskScholar offline-first AI learning companion on a study desk." data-rh="true" />`,
    `<meta name="twitter:card" content="summary_large_image" data-rh="true" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" data-rh="true" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" data-rh="true" />`,
    `<meta name="twitter:image" content="${image}" data-rh="true" />`,
    `<meta name="twitter:image:alt" content="DeskScholar offline-first AI learning companion on a study desk." data-rh="true" />`,
  ];
  if (meta.noindex) tags.push('<meta name="robots" content="noindex" data-rh="true" />');
  return tags;
}

function renderPage(meta, withJsonLd, pageKey) {
  const jsonLd = withJsonLd
    ? buildStructuredData(SITE_URL)
        .map(
          (s) =>
            `<script type="application/ld+json" data-rh="true">${JSON.stringify(s).replace(/</g, '\\u003c')}</script>`,
        )
        .join('\n    ')
    : '';
  const preloads = pageKey ? routePreloads(pageKey) : '';
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`)
    .replace(
      '</head>',
      `    ${headMeta(meta).join('\n    ')}\n    ${jsonLd}\n    ${preloads}\n  </head>`,
    );
}

let count = 0;
for (const [key, meta] of Object.entries(routeMeta)) {
  if (meta.noindex) continue;
  const outDir = meta.path === '/' ? dist : join(dist, meta.path.replace(/^\//, ''));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), renderPage(meta, key === 'home', PAGE_MODULES[key]));
  count++;
}

writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`,
);
const urls = INDEXABLE_ROUTES.map(
  (r) => `  <url><loc>${abs(r.path)}</loc><changefreq>weekly</changefreq><priority>${r.path === '/' ? '1.0' : '0.7'}</priority></url>`,
).join('\n');
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

// Remove the build manifest — internal metadata, not for public serving.
rmSync(join(dist, '.vite'), { recursive: true, force: true });

console.log(`[prerender] ${count} routes + robots.txt + sitemap.xml written for ${SITE_URL}${PLACEHOLDER ? ' (PLACEHOLDER — configure VITE_SITE_URL!)' : ''}`);
