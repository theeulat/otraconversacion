/* Generador estatico de otraconversacion.com
   Sin dependencias en tiempo de ejecucion: produce HTML plano en dist/. */

import { mkdir, writeFile, readFile, rm, cp } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE, ROUTES, EPISODE_BASE } from './src/data/site.mjs';
import EPISODES_RAW from './src/data/episodes.mjs';
import GLOSSARY from './src/data/glossary.mjs';
import POSTS from './src/data/posts.mjs';
import { ASSETS } from './src/lib/render.mjs';
import { homePage } from './src/pages/home.mjs';
import { episodesIndex, episodePage, epUrl } from './src/pages/episodes.mjs';
import { blogIndex, postPage, postUrl } from './src/pages/blog.mjs';
import { glossaryPage, aboutPage, contactPage, legalPage, thanksPage, notFoundPage } from './src/pages/misc.mjs';
import { searchPage, searchIndex } from './src/pages/search.mjs';
import { advertisePage, guestPage } from './src/pages/sales.mjs';
import buildImages from './tools/images.mjs';
import { transform } from 'esbuild';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');
const LANGS = ['es', 'en'];
const REVISADO = SITE.contentUpdated;

/* ── datos ─────────────────────────────────────────── */
const YT = JSON.parse(await readFile(path.join(ROOT, 'src/data/youtube.json'), 'utf8'));
const EPISODES = EPISODES_RAW.map((e) => {
  const y = YT[e.n];
  if (!y) throw new Error(`Falta metadato de YouTube para el episodio ${e.n}`);
  return { ...e, videoId: y.videoId, pub: y.pub, seconds: y.seconds, views: y.views, paras: y.paras };
}).sort((a, b) => b.n - a.n);

/* ── utilidades de escritura ───────────────────────── */
const written = [];
async function emit(urlPath, html, { sitemap = true, changefreq = 'monthly', priority = 0.6, lang = 'es', alt = null, lastmod = null } = {}) {
  const file = urlPath.endsWith('.html')
    ? path.join(DIST, urlPath)
    : path.join(DIST, urlPath, 'index.html');
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html, 'utf8');
  if (sitemap) written.push({ url: urlPath, changefreq, priority, lang, alt, lastmod });
}

/* ── construccion ──────────────────────────────────── */
console.log('· limpiando dist/');
if (existsSync(DIST)) await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

console.log('· generando imagenes (AVIF/WebP/JPEG)');
await buildImages(EPISODES);

console.log('· copiando estaticos');
await mkdir(path.join(DIST, 'css'), { recursive: true });
await mkdir(path.join(DIST, 'js'), { recursive: true });
/* Las tipografias van primero: definen las familias que usa el resto de la hoja. */
const cssFuente = [
  await readFile(path.join(ROOT, 'src/assets/fonts/fonts.css'), 'utf8'),
  await readFile(path.join(ROOT, 'src/assets/css/site.css'), 'utf8'),
  await readFile(path.join(ROOT, 'src/assets/css/extra.css'), 'utf8')
].join(' ');
const jsFuente = await readFile(path.join(ROOT, 'src/assets/js/site.js'), 'utf8');

const css = (await transform(cssFuente, { loader: 'css', minify: true })).code;
const js = (await transform(jsFuente, { loader: 'js', minify: true, target: 'es2018' })).code;
console.log(`  CSS ${(cssFuente.length / 1024).toFixed(1)} KB -> ${(css.length / 1024).toFixed(1)} KB`);
console.log(`  JS  ${(jsFuente.length / 1024).toFixed(1)} KB -> ${(js.length / 1024).toFixed(1)} KB`);

const stamp = (text) => createHash('sha1').update(text).digest('hex').slice(0, 8);
await writeFile(path.join(DIST, 'css/site.css'), css, 'utf8');
await writeFile(path.join(DIST, 'js/site.js'), js, 'utf8');
await cp(path.join(ROOT, 'src/assets/fonts'), path.join(DIST, 'fonts'), {
  recursive: true,
  filter: (src) => !src.endsWith('.css')
});
ASSETS.css = `/css/site.css?v=${stamp(css)}`;
ASSETS.js = `/js/site.js?v=${stamp(js)}`;
if (existsSync(path.join(ROOT, 'public'))) await cp(path.join(ROOT, 'public'), DIST, { recursive: true });

console.log('· generando paginas');
for (const lang of LANGS) {
  const home = homePage({ lang, episodes: EPISODES, posts: POSTS });
  await emit(home.url, home.html, { changefreq: 'weekly', priority: 1.0, lang, alt: ROUTES.home[lang === 'es' ? 'en' : 'es'], lastmod: EPISODES[0].pub });

  const idx = episodesIndex({ lang, episodes: EPISODES });
  await emit(idx.url, idx.html, { changefreq: 'weekly', priority: 0.9, lang, alt: ROUTES.episodes[lang === 'es' ? 'en' : 'es'], lastmod: EPISODES[0].pub });

  for (const season of [1, 2]) {
    const s = episodesIndex({ lang, episodes: EPISODES, season });
    const altBase = lang === 'es' ? ROUTES.episodes.en : ROUTES.episodes.es;
    const ultimoDeTemporada = EPISODES.find((e) => e.season === season).pub;
    await emit(s.url, s.html, { changefreq: 'monthly', priority: 0.7, lang, alt: altBase + `${lang === 'es' ? 'season' : 'temporada'}-${season}/`, lastmod: ultimoDeTemporada });
  }

  for (let i = 0; i < EPISODES.length; i++) {
    const ep = EPISODES[i];
    const next = EPISODES[i - 1] || null;   // numero mayor = mas reciente
    const prev = EPISODES[i + 1] || null;
    const related = EPISODES
      .filter((x) => x.n !== ep.n && x.topic.es === ep.topic.es)
      .slice(0, 3);
    while (related.length < 3) {
      const cand = EPISODES.find((x) => x.n !== ep.n && !related.includes(x));
      if (!cand) break;
      related.push(cand);
    }
    const page = episodePage({ lang, ep, prev, next, related, episodes: EPISODES });
    await emit(page.url, page.html, { changefreq: 'monthly', priority: 0.8, lang, alt: epUrl(ep, lang === 'es' ? 'en' : 'es'), lastmod: ep.pub });
  }

  const blog = blogIndex({ lang, posts: POSTS });
  await emit(blog.url, blog.html, { changefreq: 'weekly', priority: 0.8, lang, alt: ROUTES.blog[lang === 'es' ? 'en' : 'es'], lastmod: POSTS[0].updated || POSTS[0].date });
  for (const post of POSTS) {
    const p = postPage({ lang, post, posts: POSTS });
    await emit(p.url, p.html, { changefreq: 'monthly', priority: 0.7, lang, alt: postUrl(post, lang === 'es' ? 'en' : 'es'), lastmod: post.updated || post.date });
  }

  for (const [fn, key, pr] of [
    [glossaryPage, 'glossary', 0.7], [aboutPage, 'about', 0.6], [contactPage, 'contact', 0.6]
  ]) {
    const p = fn({ lang, terms: GLOSSARY, episodes: EPISODES });
    await emit(p.url, p.html, { priority: pr, lang, alt: ROUTES[key][lang === 'es' ? 'en' : 'es'], lastmod: REVISADO });
  }

  const adv = advertisePage({ lang });
  await emit(adv.url, adv.html, { changefreq: 'monthly', priority: 0.9, lang, alt: ROUTES.advertise[lang === 'es' ? 'en' : 'es'], lastmod: REVISADO });
  const gst = guestPage({ lang });
  await emit(gst.url, gst.html, { changefreq: 'monthly', priority: 0.8, lang, alt: ROUTES.guest[lang === 'es' ? 'en' : 'es'], lastmod: REVISADO });

  for (const kind of ['privacy', 'cookies', 'terms']) {
    const p = legalPage({ lang, kind });
    await emit(p.url, p.html, { changefreq: 'yearly', priority: 0.2, lang, alt: ROUTES[kind][lang === 'es' ? 'en' : 'es'], lastmod: REVISADO });
  }

  const sp = searchPage({ lang });
  await emit(sp.url, sp.html, { sitemap: false });
  await writeFile(
    path.join(DIST, `buscar-${lang}.json`),
    JSON.stringify(searchIndex({ lang, episodes: EPISODES, posts: POSTS, terms: GLOSSARY })),
    'utf8'
  );

  const th = thanksPage({ lang });
  await emit(th.url, th.html, { sitemap: false });

  const nf = notFoundPage({ lang, episodes: EPISODES });
  await emit(nf.url, nf.html, { sitemap: false });
}

/* ── sitemap con alternates hreflang ───────────────── */
console.log('· sitemap, robots, feeds y manifiesto');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${written.map((w) => {
  const es = w.lang === 'es' ? w.url : w.alt;
  const en = w.lang === 'en' ? w.url : w.alt;
  const alts = (es && en) ? `
    <xhtml:link rel="alternate" hreflang="es" href="${SITE.origin}${esc(es)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE.origin}${esc(en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE.origin}${esc(es)}"/>` : '';
  return `  <url>
    <loc>${SITE.origin}${esc(w.url)}</loc>
    <lastmod>${w.lastmod || today}</lastmod>
    <changefreq>${w.changefreq}</changefreq>
    <priority>${w.priority.toFixed(1)}</priority>${alts}
  </url>`;
}).join('\n')}
</urlset>`;
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');

await writeFile(path.join(DIST, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /gracias/
Disallow: /en/thanks/
Disallow: /api/

Sitemap: ${SITE.origin}/sitemap.xml
`, 'utf8');

/* ── RSS de episodios (con etiquetas iTunes) ───────── */
const rssDate = (d) => new Date(d + 'T09:00:00Z').toUTCString();
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>Otra Conversación</title>
  <link>${SITE.origin}/</link>
  <atom:link href="${SITE.origin}/feed/podcast.xml" rel="self" type="application/rss+xml"/>
  <description>Una hora con quien sabe de verdad cómo funciona algo. Entrevistas largas con profesionales reales: agentes FIFA, médicos, psiquiatras, peleadores y fundadores.</description>
  <language>es-ES</language>
  <copyright>© ${new Date().getFullYear()} Otra Conversación</copyright>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <generator>otraconversacion.com</generator>
  <itunes:author>${esc(SITE.host.name)}</itunes:author>
  <itunes:summary>Entrevistas largas con los que saben de verdad cómo funciona algo.</itunes:summary>
  <itunes:type>episodic</itunes:type>
  <itunes:explicit>false</itunes:explicit>
  <itunes:owner><itunes:name>${esc(SITE.host.name)}</itunes:name><itunes:email>${SITE.email}</itunes:email></itunes:owner>
  <itunes:image href="${SITE.origin}/img/logo-512.png"/>
  <itunes:category text="Society &amp; Culture"><itunes:category text="Documentary"/></itunes:category>
  <itunes:category text="Business"/>
  <image><url>${SITE.origin}/img/logo-512.png</url><title>Otra Conversación</title><link>${SITE.origin}/</link></image>
${EPISODES.map((ep) => `  <item>
    <title>${esc(`EP ${ep.n} · ${ep.title.es}`)}</title>
    <link>${SITE.origin}${epUrl(ep, 'es')}</link>
    <guid isPermaLink="true">${SITE.origin}${epUrl(ep, 'es')}</guid>
    <pubDate>${rssDate(ep.pub)}</pubDate>
    <description>${esc(ep.summary.es)}</description>
    <content:encoded><![CDATA[<p>${ep.lede.es}</p><p><a href="${SITE.origin}${epUrl(ep, 'es')}">Ver la ficha completa del episodio</a></p>]]></content:encoded>
    <itunes:title>${esc(ep.title.es)}</itunes:title>
    <itunes:episode>${ep.n}</itunes:episode>
    <itunes:season>${ep.season}</itunes:season>
    <itunes:duration>${ep.seconds}</itunes:duration>
    <itunes:summary>${esc(ep.summary.es)}</itunes:summary>
    <itunes:image href="${SITE.origin}/img/og-ep-${ep.n}.jpg"/>
    <itunes:explicit>false</itunes:explicit>
  </item>`).join('\n')}
</channel>
</rss>`;
await mkdir(path.join(DIST, 'feed'), { recursive: true });
await writeFile(path.join(DIST, 'feed/podcast.xml'), feed, 'utf8');

const blogFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Otra Conversación · Blog</title>
  <link>${SITE.origin}/blog/</link>
  <atom:link href="${SITE.origin}/feed/blog.xml" rel="self" type="application/rss+xml"/>
  <description>Guías e ideas sobre economía real, entrevistas y podcasting.</description>
  <language>es-ES</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${POSTS.map((p) => `  <item>
    <title>${esc(p.title.es)}</title>
    <link>${SITE.origin}${postUrl(p, 'es')}</link>
    <guid isPermaLink="true">${SITE.origin}${postUrl(p, 'es')}</guid>
    <pubDate>${rssDate(p.date)}</pubDate>
    <description>${esc(p.summary.es)}</description>
  </item>`).join('\n')}
</channel>
</rss>`;
await writeFile(path.join(DIST, 'feed/blog.xml'), blogFeed, 'utf8');

await writeFile(path.join(DIST, 'site.webmanifest'), JSON.stringify({
  name: 'Otra Conversación',
  short_name: 'Otra Conv.',
  description: 'Podcast de conversaciones largas con los que saben de verdad.',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  background_color: '#0C0B09',
  theme_color: '#0C0B09',
  lang: 'es',
  icons: [
    { src: '/img/logo-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/img/logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
  ]
}, null, 2), 'utf8');

console.log(`✓ ${written.length} páginas en el sitemap · dist/ listo`);
