import { SITE, ROUTES, POST_BASE, t } from '../data/site.mjs';
import { layout, esc, picture, crumbsHtml, breadcrumb, fmtDate } from '../lib/render.mjs';

export const postUrl = (p, lang) => POST_BASE[lang] + p.slug[lang] + '/';

export function postCard(p, lang) {
  return `<article class="post rv">
  <a href="${postUrl(p, lang)}">
    <div class="ph r169 has">${picture({
      name: p.image, alt: p.imageAlt ? p.imageAlt[lang] : '',
      sizes: '(max-width:700px) 92vw, (max-width:1100px) 45vw, 30vw'
    })}</div>
    <div class="in">
      <span class="tag">${esc(p.tag[lang])}</span>
      <h3>${esc(p.title[lang])}</h3>
      <p>${esc(p.summary[lang])}</p>
      <span class="mt">${p.readMin} ${t(lang, 'min de lectura', 'min read')} · ${fmtDate(p.date, lang)}</span>
    </div>
  </a>
</article>`;
}

export function blogIndex({ lang, posts }) {
  const url = ROUTES.blog[lang];
  const altUrl = ROUTES.blog[lang === 'es' ? 'en' : 'es'];
  const title = t(lang,
    'Blog · Guías e ideas sobre economía real y podcasting | Otra Conversación',
    'Blog · Guides and ideas on the real economy and podcasting | Otra Conversación');
  const description = t(lang,
    'Guías prácticas y las ideas que salen de cada mesa: cómo preparar una entrevista, cómo patrocinar un podcast y qué es la economía real.',
    'Practical guides and the ideas that come out of each table: how to prepare for an interview, how to sponsor a podcast and what the real economy is.');

  const crumbs = [
    { name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] },
    { name: 'Blog', url: null }
  ];

  const body = `
<div class="page">
  <div class="pghead"><div class="wrap">
    ${crumbsHtml(crumbs)}
    <p class="kick" style="margin-top:14px">${t(lang, 'El blog · Ideas de la mesa', 'The blog · Ideas from the table')}</p>
    <h1 class="pgt ws">${t(lang, 'La otra <i class="ol">lectura</i>', 'The other <i class="ol">read</i>')}</h1>
    <p class="sub">${t(lang,
      'Lo que aprendemos en cada episodio, puesto por escrito. Guías, ideas aplicables y el detrás de cámaras del podcast, en la misma voz: <b>directa y sin humo</b>.',
      'What we learn in every episode, written down. Guides, usable ideas and the podcast behind the scenes, in the same voice: <b>direct and without fluff</b>.')}</p>
  </div></div>
  <section>
    <div class="wrap">
      <div class="posts">${posts.map((p) => postCard(p, lang)).join('\n')}</div>
    </div>
  </section>
</div>`;

  const graph = [
    breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url }))),
    {
      '@type': 'Blog',
      '@id': SITE.origin + url + '#blog',
      url: SITE.origin + url,
      name: title,
      description,
      inLanguage: lang,
      publisher: { '@id': SITE.origin + '/#org' },
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title[lang],
        url: SITE.origin + postUrl(p, lang),
        datePublished: p.date,
        dateModified: p.updated || p.date,
        author: { '@id': SITE.origin + '/#host' }
      }))
    }
  ];

  return { url, html: layout({ lang, url, altUrl, title, description, body, active: 'blog', graph }) };
}

export function postPage({ lang, post, posts }) {
  const url = postUrl(post, lang);
  const altUrl = postUrl(post, lang === 'es' ? 'en' : 'es');
  const title = `${post.title[lang]} | Otra Conversación`;
  const description = post.summary[lang];
  const sections = post.body[lang];
  const others = posts.filter((p) => p.id !== post.id).slice(0, 3);

  const crumbs = [
    { name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] },
    { name: 'Blog', url: ROUTES.blog[lang] },
    { name: post.tag[lang], url: null }
  ];

  const bodyHtml = sections.map((s) => [
    s.h ? `<h2>${esc(s.h)}</h2>` : '',
    ...(s.p || []).map((x) => `<p>${esc(x)}</p>`),
    s.ul ? `<ul>${s.ul.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''
  ].filter(Boolean).join('\n')).join('\n');

  const body = `
<div class="page">
  <div class="pghead"><div class="wrap">
    ${crumbsHtml(crumbs)}
    <p class="kick" style="margin-top:14px"><span class="rd">${esc(post.tag[lang])}</span></p>
    <h1 class="pgt ws">${esc(post.title[lang])}</h1>
    <p class="artmeta">
      <span>${fmtDate(post.date, lang)}</span>
      <span>${post.readMin} ${t(lang, 'min de lectura', 'min read')}</span>
      <span class="rd">${esc(SITE.host.name)}</span>
    </p>
  </div></div>

  <section>
    <div class="wrap">
      <div class="ph r169 has rv" style="max-width:860px;margin-bottom:calc(var(--lh)*2)">
        ${picture({ name: post.image, alt: post.imageAlt ? post.imageAlt[lang] : '',
                    sizes: '(max-width:900px) 94vw, 860px', loading: 'eager', fetchpriority: 'high' })}
      </div>
      <article class="article rv">
        <p class="lede">${esc(post.summary[lang])}</p>
        ${bodyHtml}
        <p style="margin-top:calc(var(--lh)*2)">
          <a class="btn p" href="${ROUTES.episodes[lang]}">${t(lang, 'Escuchar los episodios', 'Listen to the episodes')}</a>
        </p>
      </article>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="shead rv">
        <h2 class="ws">${t(lang, 'Sigue <i class="ol">leyendo</i>', 'Keep <i class="ol">reading</i>')}</h2>
        <span class="kick">${t(lang, 'Del mismo blog', 'From the same blog')}</span>
      </div>
      <div class="posts">${others.map((p) => postCard(p, lang)).join('\n')}</div>
    </div>
  </section>
</div>`;

  const words = sections.flatMap((s) => [...(s.p || []), ...(s.ul || [])]).join(' ').split(/\s+/).length;

  const graph = [
    breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url }))),
    {
      '@type': 'BlogPosting',
      '@id': SITE.origin + url + '#post',
      headline: post.title[lang],
      description,
      url: SITE.origin + url,
      datePublished: post.date,
      dateModified: post.updated || post.date,
      inLanguage: lang,
      wordCount: words,
      timeRequired: `PT${post.readMin}M`,
      image: SITE.origin + `/img/og-${post.image}.jpg`,
      author: { '@id': SITE.origin + '/#host' },
      publisher: { '@id': SITE.origin + '/#org' },
      isPartOf: { '@id': SITE.origin + ROUTES.blog[lang] + '#blog' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': SITE.origin + url }
    }
  ];

  return {
    url,
    html: layout({
      lang, url, altUrl, title, description, body, active: 'blog',
      ogType: 'article', ogImage: `/img/og-${post.image}.jpg`, graph
    })
  };
}
