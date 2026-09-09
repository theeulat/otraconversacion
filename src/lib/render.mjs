import { SITE, ROUTES, t } from '../data/site.mjs';

/* Rutas de los assets, con huella de contenido. build.mjs las rellena. */
export const ASSETS = { css: '/css/site.css', js: '/js/site.js' };

export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/* Minuscula solo la inicial: 'Agente FIFA' no debe convertirse en 'agente fifa'. */
export const lcFirst = (s = '') => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);

export const abs = (p) => SITE.origin + (p.startsWith('/') ? p : '/' + p);

export const jsonld = (obj) => `<script type="application/ld+json">${
  JSON.stringify(obj).replace(/</g, '\\u003c')
}</script>`;

export const fmtDate = (iso, lang) => new Date(iso + 'T12:00:00Z').toLocaleDateString(
  lang === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }
);

export const fmtDuration = (sec) => {
  const h = Math.floor(sec / 3600), m = Math.round((sec % 3600) / 60);
  return h ? `${h}h ${String(m).padStart(2, '0')}m` : `${m} min`;
};

export const isoDuration = (sec) => {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  return `PT${h ? h + 'H' : ''}${m ? m + 'M' : ''}${s ? s + 'S' : ''}`;
};

/* Imagen responsive servida desde /img. Devuelve <picture> con AVIF + WebP. */
export function picture({ name, alt, widths, sizes, ratio = '16/9', cls = '', loading = 'lazy', fetchpriority }) {
  const w = widths || [480, 768, 1200];
  const srcset = (ext) => w.map((x) => `/img/${name}-${x}.${ext} ${x}w`).join(', ');
  const [rw, rh] = ratio.split('/').map(Number);
  const big = w[w.length - 1];
  return `<picture>` +
    `<source type="image/avif" srcset="${srcset('avif')}" sizes="${esc(sizes || '100vw')}">` +
    `<source type="image/webp" srcset="${srcset('webp')}" sizes="${esc(sizes || '100vw')}">` +
    `<img src="/img/${name}-${big}.jpg" alt="${esc(alt)}" width="${big}" height="${Math.round(big * rh / rw)}"` +
    ` loading="${loading}" decoding="async"${fetchpriority ? ` fetchpriority="${fetchpriority}"` : ''}` +
    `${cls ? ` class="${cls}"` : ''}></picture>`;
}

function navHtml(lang, active, altUrl) {
  const R = (k) => ROUTES[k][lang];
  const item = (key, label) =>
    `<a href="${R(key)}"${active === key ? ' class="act" aria-current="page"' : ''}>${label}</a>`;
  return `
    <nav id="menu" aria-label="${t(lang, 'Principal', 'Main')}">
      ${item('episodes', t(lang, 'Episodios', 'Episodes'))}
      ${item('blog', t(lang, 'Blog', 'Blog'))}
      ${item('glossary', t(lang, 'Glosario', 'Glossary'))}
      ${item('guest', t(lang, 'Sé invitado', 'Be a guest'))}
      ${item('advertise', t(lang, 'Publicita con nosotros', 'Advertise with us'))}
      <a class="lang always" href="${altUrl}" hreflang="${lang === 'es' ? 'en' : 'es'}" rel="alternate"
         aria-label="${t(lang, 'Switch to English', 'Cambiar a español')}"
         ><span${lang === 'es' ? ' class="on"' : ''}>ES</span><span${lang === 'en' ? ' class="on"' : ''}>EN</span></a>
      <a class="btn p always" href="${R('episodes')}">${t(lang, 'Escuchar', 'Listen')}</a>
    </nav>`;
}

function footerHtml(lang) {
  const R = (k) => ROUTES[k][lang];
  const y = new Date().getFullYear();
  return `
<footer>
  <div class="wrap">
    <div class="fmast" aria-hidden="true">Otra conversación</div>
    <div class="fgrid">
      <div>
        <p class="fb">Otra<br>conversación</p>
        <p>${t(lang,
          'Los que saben de verdad, contados desde dentro. Conversaciones de una hora con profesionales reales, en español y en inglés.',
          'The people who actually know, told from the inside. Hour-long conversations with real professionals, in Spanish and English.')}</p>
        <p style="margin-top:14px"><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      </div>
      <div>
        <h4>${t(lang, 'Podcast', 'Podcast')}</h4>
        <ul>
          <li><a href="${R('episodes')}">${t(lang, 'Todos los episodios', 'All episodes')}</a></li>
          <li><a href="${R('home')}">${t(lang, 'El manifiesto', 'The manifesto')}</a></li>
          <li><a href="${R('about')}">${t(lang, 'Sobre el podcast', 'About the show')}</a></li>
          <li><a href="/feed/podcast.xml">${t(lang, 'Feed RSS', 'RSS feed')}</a></li>
        </ul>
      </div>
      <div>
        <h4>${t(lang, 'Contenido', 'Content')}</h4>
        <ul>
          <li><a href="${R('blog')}">Blog</a></li>
          <li><a href="${R('glossary')}">${t(lang, 'Glosario', 'Glossary')}</a></li>
          <li><a href="${R('guest')}">${t(lang, 'Sé invitado', 'Be a guest')}</a></li>
          <li><a href="${R('contact')}">${t(lang, 'Contacto', 'Contact')}</a></li>
        </ul>
      </div>
      <div>
        <h4>${t(lang, 'Marcas y escucha', 'Brands and listening')}</h4>
        <ul>
          <li><a href="${R('advertise')}">${t(lang, 'Publicita con nosotros', 'Advertise with us')}</a></li>
          <li><a href="${SITE.youtube.channel}" rel="noopener">YouTube</a></li>
          <li><a href="${SITE.social.instagram}" rel="noopener">Instagram</a></li>
        </ul>
      </div>
    </div>
    <div class="fbot">
      <span>© ${y} ${SITE.name} · ${t(lang, 'Todos los derechos reservados', 'All rights reserved')}</span>
      <span><a href="${R('privacy')}">${t(lang, 'Privacidad', 'Privacy')}</a> · <a href="${R('cookies')}">Cookies</a> · <a href="${R('terms')}">${t(lang, 'Aviso legal', 'Legal notice')}</a></span>
    </div>
  </div>
</footer>`;
}

/* Esquema base compartido por todas las páginas. */
export function baseGraph(lang) {
  const home = SITE.origin + ROUTES.home[lang];
  return [
    {
      '@type': 'Organization',
      '@id': SITE.origin + '/#org',
      name: SITE.name,
      url: SITE.origin + '/',
      email: SITE.email,
      logo: { '@type': 'ImageObject', url: SITE.origin + '/img/logo-512.png', width: 512, height: 512 },
      sameAs: [SITE.youtube.channel, SITE.social.instagram],
      founder: { '@id': SITE.origin + '/#host' }
    },
    {
      '@type': 'Person',
      '@id': SITE.origin + '/#host',
      name: SITE.host.name,
      jobTitle: SITE.host.role[lang],
      worksFor: { '@id': SITE.origin + '/#org' },
      url: SITE.origin + ROUTES.about[lang]
    },
    {
      '@type': 'WebSite',
      '@id': SITE.origin + '/#website',
      url: SITE.origin + '/',
      name: SITE.name,
      inLanguage: ['es', 'en'],
      publisher: { '@id': SITE.origin + '/#org' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: SITE.origin + ROUTES.episodes[lang] + '?q={search_term_string}' },
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'PodcastSeries',
      '@id': SITE.origin + '/#podcast',
      name: SITE.name,
      url: home,
      webFeed: SITE.origin + '/feed/podcast.xml',
      inLanguage: ['es', 'en'],
      image: SITE.origin + '/img/og-default.jpg',
      description: t(lang,
        'Podcast de entrevistas largas: una hora con quien sabe de verdad cómo funciona algo. 24 episodios publicados.',
        'A long-form interview podcast: one hour with people who actually know how something works. 24 episodes published.'),
      author: { '@id': SITE.origin + '/#host' },
      publisher: { '@id': SITE.origin + '/#org' }
    }
  ];
}

export function breadcrumb(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name,
      ...(it.url ? { item: SITE.origin + it.url } : {})
    }))
  };
}

export function crumbsHtml(items) {
  return `<div class="crumbs">${items.map((it, i) =>
    (i ? '<span class="sep" aria-hidden="true">/</span>' : '') +
    (it.url ? `<a href="${it.url}">${esc(it.name)}</a>` : `<span>${esc(it.name)}</span>`)
  ).join('')}</div>`;
}

/**
 * Documento completo.
 */
export function layout({
  lang, url, altUrl, title, description, body, active = '',
  ogImage = '/img/og-default.jpg', ogType = 'website', graph = [],
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  bodyClass = ''
}) {
  const esUrl = lang === 'es' ? url : altUrl;
  const enUrl = lang === 'en' ? url : altUrl;
  const g = { '@context': 'https://schema.org', '@graph': [...baseGraph(lang), ...graph] };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(url)}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#0C0B09">
<meta name="author" content="${esc(SITE.host.name)}">
<link rel="alternate" hreflang="es" href="${abs(esUrl)}">
<link rel="alternate" hreflang="en" href="${abs(enUrl)}">
<link rel="alternate" hreflang="x-default" href="${abs(esUrl)}">
<link rel="alternate" type="application/rss+xml" title="${esc(SITE.name)}" href="/feed/podcast.xml">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/img/logo-512.png" type="image/png" sizes="512x512">
<link rel="apple-touch-icon" href="/img/logo-180.png">
<link rel="manifest" href="/site.webmanifest">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(url)}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${lang === 'en' ? 'en_GB' : 'es_ES'}">
<meta property="og:locale:alternate" content="${lang === 'en' ? 'es_ES' : 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(ogImage)}">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;1,800&family=JetBrains+Mono:wght@400;500;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;1,800&family=JetBrains+Mono:wght@400;500;700&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;1,800&family=JetBrains+Mono:wght@400;500;700&display=swap"></noscript>
<link rel="stylesheet" href="${ASSETS.css}">
${jsonld(g)}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<a class="skip" href="#main">${t(lang, 'Saltar al contenido', 'Skip to content')}</a>
<header class="nav" id="nav">
  <div class="in">
    <a class="logo" href="${ROUTES.home[lang]}" aria-label="${esc(SITE.name)}">
      <img src="/img/logo-72.png" alt="" width="36" height="36">
      <b>Otra conversación</b>
    </a>
    <button class="burger" id="burger" type="button" aria-expanded="false" aria-controls="menu"
      aria-label="${t(lang, 'Abrir menú', 'Open menu')}"><span></span></button>
    ${navHtml(lang, active, altUrl)}
  </div>
</header>
<main id="main">
${body}
</main>
${footerHtml(lang)}
<script src="${ASSETS.js}" defer></script>
</body>
</html>`;
}
