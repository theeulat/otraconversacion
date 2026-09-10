import { SITE, ROUTES, t } from '../data/site.mjs';
import { layout, esc, crumbsHtml, breadcrumb } from '../lib/render.mjs';
import { epUrl } from './episodes.mjs';
import { postUrl } from './blog.mjs';

/* Indice que consume el buscador del navegador. Se sirve como JSON estatico:
   con sesenta y tantas entradas no hace falta nada del lado del servidor. */
export function searchIndex({ lang, episodes, posts, terms }) {
  const entries = [];

  for (const ep of episodes) {
    entries.push({
      t: `EP ${ep.n} · ${ep.title[lang]}`,
      d: `${ep.guest.name}, ${ep.guest.role[lang].toLowerCase()}. ${ep.summary[lang]}`,
      u: epUrl(ep, lang),
      k: t(lang, 'Episodio', 'Episode'),
      x: [ep.topic[lang], ep.guest.name, ...ep.points[lang]].join(' ')
    });
  }

  for (const p of posts) {
    entries.push({
      t: p.title[lang],
      d: p.summary[lang],
      u: postUrl(p, lang),
      k: t(lang, 'Artículo', 'Article'),
      x: p.tag[lang]
    });
  }

  for (const g of terms) {
    entries.push({
      t: g.term[lang],
      d: g.def[lang],
      u: ROUTES.glossary[lang] + '#' + g.id,
      k: t(lang, 'Glosario', 'Glossary'),
      x: ''
    });
  }

  const pages = [
    ['home', t(lang, 'Portada', 'Home')],
    ['episodes', t(lang, 'Todos los episodios', 'All episodes')],
    ['blog', 'Blog'],
    ['glossary', t(lang, 'Glosario', 'Glossary')],
    ['guest', t(lang, 'Sé invitado', 'Be a guest')],
    ['advertise', t(lang, 'Publicita con nosotros', 'Advertise with us')],
    ['about', t(lang, 'Sobre el podcast', 'About the show')],
    ['contact', t(lang, 'Contacto', 'Contact')]
  ];
  for (const [key, name] of pages) {
    entries.push({ t: name, d: '', u: ROUTES[key][lang], k: t(lang, 'Página', 'Page'), x: '' });
  }

  return entries;
}

export function searchPage({ lang }) {
  const url = ROUTES.search[lang];
  const altUrl = ROUTES.search[lang === 'es' ? 'en' : 'es'];
  const title = t(lang,
    'Buscar en Otra Conversación',
    'Search Otra Conversación');
  const description = t(lang,
    'Busca entre los 24 episodios, los artículos del blog y los términos del glosario de Otra Conversación.',
    'Search across the 24 episodes, the blog articles and the glossary of Otra Conversación.');

  const crumbs = [
    { name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] },
    { name: t(lang, 'Buscar', 'Search'), url: null }
  ];

  const body = `
<div class="page">
  <div class="pghead"><div class="wrap">
    ${crumbsHtml(crumbs)}
    <p class="kick" style="margin-top:14px">${t(lang, 'Buscador · Todo el archivo', 'Search · The whole archive')}</p>
    <h1 class="pgt ws">${t(lang, '¿Qué estás <i class="ol">buscando</i>?', 'What are you <i class="ol">looking for</i>?')}</h1>
    <p class="sub">${t(lang,
      'Episodios, artículos y términos del glosario. Escribe un oficio, un nombre o una idea.',
      'Episodes, articles and glossary terms. Type a trade, a name or an idea.')}</p>
  </div></div>

  <section>
    <div class="wrap glower">
      <form class="searchbox" role="search" id="buscador" action="${url}" method="get">
        <label class="sr" for="q">${t(lang, 'Buscar', 'Search')}</label>
        <input id="q" name="q" type="search" autocomplete="off" autofocus
               placeholder="${t(lang, 'agente FIFA, psiquiatría, caja, patrocinio…', 'FIFA agent, psychiatry, cash, sponsorship…')}"
               data-index="/buscar-${lang}.json">
        <button class="btn p" type="submit">${t(lang, 'Buscar', 'Search')}</button>
      </form>
      <p class="kick" id="resultado-cuenta" aria-live="polite"></p>
      <div id="resultados" class="results"></div>
      <noscript><p class="muted" style="margin-top:20px">${t(lang,
        'El buscador necesita JavaScript. Puedes recorrer el archivo completo desde',
        'The search needs JavaScript. You can browse the full archive from')}
        <a href="${ROUTES.episodes[lang]}" style="color:var(--hueso)">${t(lang, 'la página de episodios', 'the episodes page')}</a>.</p></noscript>
    </div>
  </section>
</div>`;

  const graph = [
    breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url }))),
    {
      '@type': 'SearchResultsPage',
      '@id': SITE.origin + url + '#page',
      url: SITE.origin + url,
      name: title,
      description,
      inLanguage: lang,
      isPartOf: { '@id': SITE.origin + '/#website' }
    }
  ];

  return {
    url,
    html: layout({ lang, url, altUrl, title, description, body, active: '', graph, robots: 'noindex, follow' })
  };
}
