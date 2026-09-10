import { SITE, ROUTES, EPISODE_BASE, t } from '../data/site.mjs';
import {
  layout, esc, picture, crumbsHtml, breadcrumb, fmtDate, fmtDuration, isoDuration, lcFirst, preloadImage
} from '../lib/render.mjs';

export const epUrl = (ep, lang) => EPISODE_BASE[lang] + ep.slug[lang] + '/';

export function epCard(ep, lang, { loading = 'lazy' } = {}) {
  return `<article class="epc rv">
  <a href="${epUrl(ep, lang)}">
    <div class="ph r169 has">
      ${picture({
        name: `ep-${ep.n}`, alt: t(lang, `Miniatura del episodio ${ep.n}: ${ep.title.es}`, `Episode ${ep.n} thumbnail: ${ep.title.en}`),
        sizes: '(max-width:700px) 92vw, (max-width:1100px) 45vw, 30vw', loading
      })}
      <span class="num">${ep.n}</span>
    </div>
    <div class="in">
      <span class="tt">${esc(ep.title[lang])}</span>
      <p class="gu">${t(lang, 'Con', 'With')} ${esc(ep.guest.name)}. ${esc(ep.guest.role[lang])}.</p>
      <p class="mt"><span>${esc(ep.topic[lang])}</span><span>${fmtDuration(ep.seconds)}</span></p>
    </div>
  </a>
</article>`;
}

/* ── Índice de episodios ─────────────────────────────── */
export function episodesIndex({ lang, episodes, season = null }) {
  const url = season ? ROUTES.episodes[lang] + `${t(lang, 'temporada', 'season')}-${season}/` : ROUTES.episodes[lang];
  const altBase = lang === 'es' ? ROUTES.episodes.en : ROUTES.episodes.es;
  const altUrl = season ? altBase + `${lang === 'es' ? 'season' : 'temporada'}-${season}/` : altBase;
  const list = season ? episodes.filter((e) => e.season === season) : episodes;

  const title = season
    ? t(lang, `Temporada ${season} · Los ${list.length} episodios | Otra Conversación`,
             `Season ${season} · All ${list.length} episodes | Otra Conversación`)
    : t(lang, 'Todos los episodios del podcast Otra Conversación',
             'All episodes of the Otra Conversación podcast');

  const description = season
    ? t(lang, `Los ${list.length} episodios de la temporada ${season} de Otra Conversación, con su ficha, su duración y el enlace para verlos completos.`,
             `All ${list.length} episodes of season ${season} of Otra Conversación, each with its notes, duration and full video.`)
    : t(lang, `Las ${episodes.length} conversaciones completas de Otra Conversación: agentes FIFA, médicos, psiquiatras, peleadores y fundadores. Ficha y vídeo de cada episodio.`,
             `All ${episodes.length} full conversations from Otra Conversación: FIFA agents, doctors, psychiatrists, fighters and founders. Notes and video for every episode.`);

  const crumbs = [
    { name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] },
    { name: t(lang, 'Episodios', 'Episodes'), url: season ? ROUTES.episodes[lang] : null },
    ...(season ? [{ name: t(lang, `Temporada ${season}`, `Season ${season}`), url: null }] : [])
  ];

  const filterLink = (label, href, on) =>
    `<a href="${href}"${on ? ' class="on" aria-current="page"' : ''}>${label}</a>`;

  const body = `
<div class="page">
  <div class="pghead"><div class="wrap">
    ${crumbsHtml(crumbs)}
    <h1 class="pgt ws">${season
      ? t(lang, `Temporada <i class="ol">${season}</i>`, `Season <i class="ol">${season}</i>`)
      : t(lang, 'Los <i class="ol">episodios</i>', 'The <i class="ol">episodes</i>')}</h1>
    <p class="sub">${t(lang,
      `${episodes.length} conversaciones en español con profesionales reales. Cada episodio tiene su propia ficha, sus notas y el vídeo completo. La tercera temporada se graba en Ámsterdam, <b>en inglés</b>.`,
      `${episodes.length} conversations in Spanish with real professionals. Every episode has its own page, notes and full video. Season three is recorded in Amsterdam, <b>in English</b>.`)}</p>
  </div></div>

  <section aria-label="${t(lang, 'Listado de episodios', 'Episode list')}">
    <div class="wrap">
      <div class="filters rv" role="navigation" aria-label="${t(lang, 'Filtrar por temporada', 'Filter by season')}">
        ${filterLink(t(lang, `Todos · ${episodes.length}`, `All · ${episodes.length}`), ROUTES.episodes[lang], !season)}
        ${filterLink(t(lang, 'Temporada 2 · EP 15-24', 'Season 2 · EP 15-24'), ROUTES.episodes[lang] + `${t(lang, 'temporada', 'season')}-2/`, season === 2)}
        ${filterLink(t(lang, 'Temporada 1 · EP 1-14', 'Season 1 · EP 1-14'), ROUTES.episodes[lang] + `${t(lang, 'temporada', 'season')}-1/`, season === 1)}
      </div>
      <div class="eps">
        ${list.map((ep, i) => epCard(ep, lang, { loading: i < 3 ? 'eager' : 'lazy' })).join('\n')}
      </div>
      <div class="center rv">
        <a class="btn s" href="${SITE.youtube.channel}" rel="noopener">${t(lang, 'Ver el canal en YouTube', 'Open the YouTube channel')}</a>
      </div>
    </div>
  </section>
</div>`;

  const graph = [
    breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url }))),
    {
      '@type': 'CollectionPage',
      '@id': SITE.origin + url + '#page',
      url: SITE.origin + url,
      name: title,
      description,
      inLanguage: lang,
      isPartOf: { '@id': SITE.origin + '/#website' },
      about: { '@id': SITE.origin + '/#podcast' },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: list.length,
        itemListElement: list.map((ep, i) => ({
          '@type': 'ListItem', position: i + 1,
          url: SITE.origin + epUrl(ep, lang),
          name: ep.title[lang]
        }))
      }
    }
  ];

  return { url, html: layout({ lang, url, altUrl, title, description, body, active: 'episodes', graph }) };
}

/* ── Ficha de episodio ───────────────────────────────── */
export function episodePage({ lang, ep, prev, next, related, episodes }) {
  const url = epUrl(ep, lang);
  const altUrl = epUrl(ep, lang === 'es' ? 'en' : 'es');
  const title = t(lang,
    `${ep.title.es} | Otra Conversación EP ${ep.n}`,
    `${ep.title.en} | Otra Conversación EP ${ep.n}`);
  const description = ep.summary[lang];
  const watch = `https://www.youtube.com/watch?v=${ep.videoId}`;

  const crumbs = [
    { name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] },
    { name: t(lang, 'Episodios', 'Episodes'), url: ROUTES.episodes[lang] },
    { name: `EP ${ep.n}`, url: null }
  ];

  const paras = lang === 'es' ? (ep.paras || []) : [];

  const body = `
<div class="page">
  <div class="pghead"><div class="wrap">
    ${crumbsHtml(crumbs)}
    <p class="kick" style="margin-top:14px">${t(lang, 'Temporada', 'Season')} ${ep.season} · EP ${ep.n} · <span class="rd">${esc(ep.topic[lang])}</span></p>
    <h1 class="pgt ws">${esc(ep.title[lang])}</h1>
    <p class="sub">${t(lang, 'Con', 'With')} <b>${esc(ep.guest.name)}</b>, ${esc(lcFirst(ep.guest.role[lang]))}. ${esc(ep.summary[lang])}</p>
  </div></div>

  <section>
    <div class="wrap">
      <div class="epdetail">
        <div>
          <div class="ytwrap rv" data-yt="${ep.videoId}" data-title="${esc(ep.title[lang])}">
            ${picture({
              name: `ep-${ep.n}`, alt: t(lang, `Portada del episodio ${ep.n} con ${ep.guest.name}`, `Cover of episode ${ep.n} with ${ep.guest.name}`),
              sizes: '(max-width:980px) 94vw, 60vw', loading: 'eager', fetchpriority: 'high'
            })}
            <button class="playbtn" type="button" aria-label="${t(lang, 'Reproducir el episodio', 'Play the episode')}"><span class="play" aria-hidden="true">▶</span></button>
            <span class="consent">${t(lang, 'Al reproducir se carga YouTube y se aplican sus cookies', 'Playing loads YouTube and applies its cookies')}</span>
          </div>

          <div class="epbody">
            <p class="eplede">${esc(ep.lede[lang])}</p>

            <h2>${t(lang, 'De qué se habla en este episodio', 'What this episode covers')}</h2>
            <ul>${ep.points[lang].map((p) => `<li>${esc(p)}</li>`).join('')}</ul>

            ${paras.length ? `<h2>${t(lang, 'La conversación', 'The conversation')}</h2>
            ${paras.map((p) => `<p>${esc(p)}</p>`).join('\n')}` : ''}

            <h2>${t(lang, 'Sobre el invitado', 'About the guest')}</h2>
            <p>${esc(ep.guest.name)} ${t(lang, 'es', 'is')} ${esc(lcFirst(ep.guest.role[lang]))}. ${t(lang,
              `Esta conversación se grabó para la temporada ${ep.season} de Otra Conversación y dura ${fmtDuration(ep.seconds)} sin cortes ni guion cerrado.`,
              `This conversation was recorded for season ${ep.season} of Otra Conversación and runs ${fmtDuration(ep.seconds)} with no cuts and no closed script.`)}</p>

            <div class="tags">
              <a href="${ROUTES.episodes[lang]}${t(lang, 'temporada', 'season')}-${ep.season}/">${t(lang, 'Temporada', 'Season')} ${ep.season}</a>
              <span>${esc(ep.topic[lang])}</span>
              <span>${fmtDuration(ep.seconds)}</span>
            </div>
          </div>
        </div>

        <aside class="aside">
          <div class="epmeta rv">
            <dl>
              <dt>${t(lang, 'Episodio', 'Episode')}</dt><dd>${ep.n} ${t(lang, 'de', 'of')} ${episodes.length}</dd>
              <dt>${t(lang, 'Invitado', 'Guest')}</dt><dd>${esc(ep.guest.name)}</dd>
              <dt>${t(lang, 'Oficio', 'Field')}</dt><dd>${esc(ep.guest.role[lang])}</dd>
              <dt>${t(lang, 'Tema', 'Topic')}</dt><dd>${esc(ep.topic[lang])}</dd>
              <dt>${t(lang, 'Duración', 'Duration')}</dt><dd>${fmtDuration(ep.seconds)}</dd>
              <dt>${t(lang, 'Publicado', 'Published')}</dt><dd>${fmtDate(ep.pub, lang)}</dd>
              <dt>${t(lang, 'Idioma', 'Language')}</dt><dd>${t(lang, 'Español', 'Spanish')}</dd>
            </dl>
            <div class="acts">
              <a class="btn p" href="${watch}" rel="noopener">${t(lang, 'Ver en YouTube', 'Watch on YouTube')}</a>
              <a class="btn s" href="${ROUTES.guest[lang]}">${t(lang, 'Quiero ser invitado', 'I want to be a guest')}</a>
            </div>
          </div>
        </aside>
      </div>

      <div class="pager">
        ${prev ? `<a href="${epUrl(prev, lang)}"><span class="k">${t(lang, 'Episodio anterior', 'Previous episode')}</span><span class="tt">EP ${prev.n} · ${esc(prev.title[lang])}</span></a>` : '<span></span>'}
        ${next ? `<a class="next" href="${epUrl(next, lang)}"><span class="k">${t(lang, 'Episodio siguiente', 'Next episode')}</span><span class="tt">EP ${next.n} · ${esc(next.title[lang])}</span></a>` : '<span></span>'}
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="shead rv">
        <h2 class="ws">${t(lang, 'Si te ha gustado, <i class="ol">sigue por aquí</i>', 'If you liked this, <i class="ol">keep going</i>')}</h2>
        <span class="kick">${t(lang, 'Del mismo mundo', 'From the same world')}</span>
      </div>
      <div class="eps">${related.map((r) => epCard(r, lang)).join('\n')}</div>
    </div>
  </section>
</div>`;

  const graph = [
    breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url }))),
    {
      '@type': 'PodcastEpisode',
      '@id': SITE.origin + url + '#episode',
      url: SITE.origin + url,
      name: ep.title[lang],
      episodeNumber: ep.n,
      description: ep.summary[lang],
      datePublished: ep.pub,
      timeRequired: isoDuration(ep.seconds),
      inLanguage: 'es',
      image: SITE.origin + `/img/og-ep-${ep.n}.jpg`,
      partOfSeries: { '@id': SITE.origin + '/#podcast' },
      partOfSeason: { '@type': 'PodcastSeason', name: t(lang, `Temporada ${ep.season}`, `Season ${ep.season}`), seasonNumber: ep.season },
      author: { '@id': SITE.origin + '/#host' },
      publisher: { '@id': SITE.origin + '/#org' },
      actor: { '@type': 'Person', name: ep.guest.name, jobTitle: ep.guest.role[lang] },
      associatedMedia: {
        '@type': 'VideoObject',
        name: ep.title[lang],
        description: ep.summary[lang],
        thumbnailUrl: [`https://i.ytimg.com/vi/${ep.videoId}/maxresdefault.jpg`, SITE.origin + `/img/og-ep-${ep.n}.jpg`],
        uploadDate: ep.pub,
        duration: isoDuration(ep.seconds),
        embedUrl: `https://www.youtube-nocookie.com/embed/${ep.videoId}`,
        contentUrl: watch,
        interactionStatistic: {
          '@type': 'InteractionCounter',
          interactionType: { '@type': 'WatchAction' },
          userInteractionCount: ep.views
        }
      }
    }
  ];

  return {
    url,
    html: layout({
      lang, url, altUrl, title, description, body, active: 'episodes',
      ogType: 'video.episode', ogImage: `/img/og-ep-${ep.n}.jpg`, graph,
      ogImageAlt: t(lang, `Portada del episodio ${ep.n} con ${ep.guest.name}`, `Cover of episode ${ep.n} with ${ep.guest.name}`),
      published: ep.pub,
      preload: preloadImage({ name: `ep-${ep.n}`, sizes: '(max-width:980px) 94vw, 60vw' })
    })
  };
}
