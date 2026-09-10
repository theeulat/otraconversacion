import { SITE, ROUTES, t } from '../data/site.mjs';
import { layout, esc, picture, breadcrumb, fmtDuration, preloadImage } from '../lib/render.mjs';
import { epCard, epUrl } from './episodes.mjs';
import { postCard } from './blog.mjs';

export function homePage({ lang, episodes, posts }) {
  const url = ROUTES.home[lang];
  const altUrl = ROUTES.home[lang === 'es' ? 'en' : 'es'];
  const latest = episodes[0];
  const featured = episodes.slice(0, 6);

  const title = t(lang,
    'Otra Conversación · El podcast de conversaciones con los que saben',
    'Otra Conversación · One hour with people who actually know');
  const description = t(lang,
    'Entrevistas largas con quien sabe de verdad cómo funciona algo: agentes FIFA, médicos, psiquiatras, peleadores y fundadores. 24 episodios y 27 horas de conversación.',
    'Long-form interviews with people who actually know how things work: FIFA agents, doctors, psychiatrists, fighters and founders. 24 episodes, 27 hours of conversation.');

  const body = `
<div class="page">
  <section class="hero" aria-label="${t(lang, 'Presentación', 'Introduction')}">
    <div class="wrap"><div class="grid">
      <div>
        <p class="kick">Podcast · ${episodes.length} ${t(lang, 'episodios', 'episodes')} · ${SITE.stats.subscribers} ${t(lang, 'suscriptores', 'subscribers')} · <span class="rd">${t(lang, 'La tercera temporada está en camino', 'Season three is on its way')}</span></p>
        <h1 class="ws">Otra<span class="l2">conversación</span><span class="pod">${t(lang, 'Podcast · Conversaciones con los que saben', 'Podcast · Conversations with people who know')}</span></h1>
        <p class="sub">${t(lang,
          'Una hora con quien <b>sabe de verdad</b>: agentes FIFA, médicos, psiquiatras, peleadores, fundadores. Oficios reales contados <span class="und">desde dentro</span>, <b>sin humo</b>. 24 episodios en español; la temporada 3 se graba en Ámsterdam, en inglés.',
          'One hour with people who <b>actually know</b>: FIFA agents, doctors, psychiatrists, fighters, founders. Real trades told <span class="und">from the inside</span>, <b>with zero fluff</b>. 24 episodes in Spanish; season three is recorded in Amsterdam, in English.')}</p>
        <div class="ctas">
          <a class="btn p" href="${ROUTES.episodes[lang]}">${t(lang, 'Escuchar ahora', 'Listen now')}</a>
          <a class="btn s" href="${ROUTES.guest[lang]}">${t(lang, 'Quiero ser invitado', 'I want to be a guest')}</a>
        </div>
        <div class="plats">
          <span>${t(lang, 'Disponible en', 'Available on')}</span>
          <a href="${SITE.youtube.channel}" rel="noopener">YouTube</a>
          <a href="/feed/podcast.xml">RSS</a>
          <span style="letter-spacing:.14em">${t(lang, 'Spotify y Apple Podcasts · Próximamente', 'Spotify and Apple Podcasts · Coming soon')}</span>
        </div>
      </div>
      <div class="side rv">
        <div class="ph r34 has" style="width:290px;max-width:100%;align-self:flex-end;border-radius:14px">
          ${picture({
            name: 'host', ratio: '3/4', widths: [320, 480, 640], sizes: '(max-width:920px) 60vw, 290px',
            alt: t(lang, 'Jesús Martínez, anfitrión de Otra Conversación, en la mesa del podcast', 'Jesús Martínez, host of Otra Conversación, at the podcast table'),
            loading: 'eager', fetchpriority: 'high', cls: 'fill'
          })}
        </div>
      </div>
    </div></div>
  </section>

  <div class="mq" aria-hidden="true"><div class="track" data-mq="${t(lang, 'OTRA HISTORIA · OTRA PREGUNTA · OTRA VERDAD · OTRA CONVERSACIÓN · ', 'ANOTHER STORY · ANOTHER QUESTION · ANOTHER TRUTH · OTRA CONVERSACIÓN · ')}"></div></div>
  <div class="mq rev" aria-hidden="true" style="border-top:none"><div class="track" data-mq="${t(lang, 'GENTE REAL · CRECIMIENTO REAL · HISTORIAS REALES · CERO HUMO · ', 'REAL PEOPLE · REAL EXPERTISE · REAL STORIES · ZERO FLUFF · ')}"></div></div>

  <div class="stats" aria-label="${t(lang, 'El podcast en números', 'The podcast in numbers')}">
    <div class="wrap"><div class="grid">
      <div class="stat rv"><b><span class="cnt" data-n="59">0</span><i>K+</i></b><span>${t(lang, 'Visualizaciones totales', 'Total views')}</span></div>
      <div class="stat rv"><b>${SITE.stats.subscribers}<i>+</i></b><span>${t(lang, 'Suscriptores en YouTube', 'YouTube subscribers')}</span></div>
      <div class="stat rv"><b><span class="cnt" data-n="${episodes.length}">0</span></b><span>${t(lang, 'Episodios publicados', 'Episodes published')}</span></div>
      <div class="stat rv"><b><span class="cnt" data-n="${SITE.stats.hours}">0</span><i>h</i></b><span>${t(lang, 'De conversación grabada', 'Of recorded conversation')}</span></div>
    </div></div>
  </div>

  <section aria-labelledby="h-ultimo">
    <div class="wrap cine">
      <div class="shead rv">
        <h2 id="h-ultimo" class="ws">${t(lang, 'El último <i class="ol">episodio</i>', 'The latest <i class="ol">episode</i>')}</h2>
        <span class="kick">${t(lang, 'Temporada', 'Season')} ${latest.season} · EP ${latest.n}</span>
      </div>
      <a class="video rv" style="max-width:860px" href="${epUrl(latest, lang)}" aria-label="${esc(latest.title[lang])}">
        ${picture({ name: `ep-${latest.n}`, alt: '', sizes: '(max-width:900px) 94vw, 860px', cls: 'fill' })}
        <span class="play" aria-hidden="true">▶</span>
        <div class="info"><div class="m">${esc(latest.guest.name)} · ${fmtDuration(latest.seconds)} · ${t(lang, 'Temporada', 'Season')} ${latest.season} · EP ${latest.n}</div></div>
      </a>
      <div class="under rv">
        <p>${t(lang, 'Con', 'With')} <b>${esc(latest.guest.name)}</b>. ${esc(latest.summary[lang])}</p>
        <div class="listen">
          <a class="btn p" href="${epUrl(latest, lang)}">${t(lang, 'Ver la ficha del episodio', 'Open the episode page')}</a>
          <a class="btn s" href="${ROUTES.episodes[lang]}">${t(lang, 'Todos los episodios', 'All episodes')}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="move" aria-labelledby="h-move">
    <div class="wrap">
      <p class="kick rv">${t(lang, 'El manifiesto · Por qué existimos', 'The manifesto · Why we exist')}</p>
      <h2 id="h-move" class="ws rv">${t(lang,
        'Esto no es un podcast más. Es la mesa de <span class="rd">los que saben</span>.',
        'This is not another podcast. It is the table of <span class="rd">people who know</span>.')}</h2>
      <div class="cols">
        <div class="rv">
          <p class="big">${t(lang,
            'Las personas que de verdad saben cómo funciona el mundo casi nunca son famosas. Y nadie las está entrevistando.',
            'The people who really know how the world works are almost never famous. And nobody is interviewing them.')}</p>
          <p>${t(lang,
            'El agente que negocia fichajes millonarios. La médica que ha visto lo que nadie quiere ver. El peleador que sube a la jaula. El empresario que sostiene su empresa desde hace quince años. Cada uno domina un mundo, y aquí lo abre entero.',
            'The agent who negotiates million-euro transfers. The doctor who has seen what nobody wants to see. The fighter who steps into the cage. The owner who has held a company together for fifteen years. Each commands a world, and here they open it up.')}</p>
          <p><b>${t(lang, 'El que pregunta también opera:', 'The person asking also operates:')}</b> ${t(lang,
            'el anfitrión dirige empresas de día y conversa de noche. Las preguntas vienen de haber vivido el problema.',
            'the host runs companies by day and has conversations by night. The questions come from having lived the problem.')}</p>
          <a class="btn inv" href="${ROUTES.about[lang]}" style="margin-top:14px">${t(lang, 'Descubre cómo funciona la mesa', 'See how this table works')}</a>
        </div>
        <div class="duoimg rv" style="grid-template-columns:1fr">
          <div class="ph r169 has">${picture({ name: 'estudio', alt: t(lang, 'Grabación de Otra Conversación en el estudio', 'Otra Conversación being recorded in the studio'), sizes: '(max-width:900px) 92vw, 45vw', cls: 'fill' })}</div>
          <div class="ph r169 has">${picture({ name: 'congreso', alt: t(lang, 'Entrevista de Otra Conversación grabada en una institución', 'Otra Conversación interview recorded inside an institution'), sizes: '(max-width:900px) 92vw, 45vw', cls: 'fill' })}</div>
        </div>
      </div>
    </div>
  </section>

  <section aria-labelledby="h-destacados">
    <div class="wrap">
      <div class="shead rv">
        <h2 id="h-destacados" class="ws">${t(lang, 'Por dónde <i class="ol">empezar</i>', 'Where to <i class="ol">start</i>')}</h2>
        <span class="kick">${t(lang, 'Seis mesas que abren seis mundos', 'Six tables, six worlds')}</span>
      </div>
      <div class="eps">${featured.map((e) => epCard(e, lang)).join('\n')}</div>
      <div class="center rv"><a class="btn s" href="${ROUTES.episodes[lang]}">${t(lang, `Ver los ${episodes.length} episodios`, `See all ${episodes.length} episodes`)}</a></div>
    </div>
  </section>

  <section aria-label="${t(lang, 'Fuera del estudio', 'Outside the studio')}">
    <div class="wrap">
      <div class="news" style="align-items:center">
        <div class="ph r169 has rv">${picture({ name: 'fuera-estudio', alt: t(lang, 'Grabación de Otra Conversación fuera del estudio', 'Otra Conversación recording outside the studio'), sizes: '(max-width:900px) 92vw, 50vw', cls: 'fill' })}</div>
        <div class="rv">
          <p class="kick">${t(lang, 'La mesa se mueve', 'The table travels')}</p>
          <h2 style="font-family:var(--display);font-size:clamp(28px,4vw,56px);line-height:.98;margin:14px 0 16px">${t(lang, 'Donde está la <i class="ol">historia</i>.', 'Where the <i class="ol">story</i> is.')}</h2>
          <p style="color:var(--ceniza);max-width:44ch">${t(lang,
            'Cuando la conversación lo pide, la mesa sale del estudio. Hemos grabado en despachos, en instituciones y allí donde trabaja quien tiene algo que contar, porque el contexto también forma parte de la historia.',
            'When the conversation calls for it, the table leaves the studio. We have recorded in offices, in institutions and wherever the person with something to say actually works, because context is part of the story.')}</p>
        </div>
      </div>
    </div>
  </section>

  <section aria-labelledby="h-blog">
    <div class="wrap">
      <div class="shead rv">
        <h2 id="h-blog" class="ws">${t(lang, 'La otra <i class="ol">lectura</i>', 'The other <i class="ol">read</i>')}</h2>
        <span class="kick">${t(lang, 'Guías e ideas de la mesa', 'Guides and ideas from the table')}</span>
      </div>
      <div class="posts">${posts.slice(0, 3).map((p) => postCard(p, lang)).join('\n')}</div>
      <div class="center rv"><a class="btn s" href="${ROUTES.blog[lang]}">${t(lang, 'Ver el blog', 'Read the blog')}</a></div>
    </div>
  </section>

  <section class="t3" aria-labelledby="h-t3">
    <span class="bgnum" aria-hidden="true">T3</span>
    <div class="wrap"><div class="inner">
      <div class="rv">
        <p class="kick">${t(lang, 'Próximamente', 'Coming soon')} · <span class="rd">${t(lang, 'Temporada 3 · Ámsterdam', 'Season 3 · Amsterdam')}</span></p>
        <h2 id="h-t3" class="big ws">${t(lang, 'Viene la <i class="ol">tercera</i> temporada.', 'Season <i class="ol">three</i> is coming.')}</h2>
        <p>${t(lang,
          'Nuevas mesas, nuevas historias y el salto más grande hasta ahora: se graba entera en Ámsterdam y en inglés, alrededor de empresas holandesas y de la gente que las dirige.',
          'New tables, new stories and the biggest jump so far: recorded entirely in Amsterdam and in English, around Dutch companies and the people who run them.')}</p>
      </div>
      <div class="side rv">
        <a class="btn p" href="${ROUTES.contact[lang]}" style="align-self:flex-start">${t(lang, 'Avísame cuando llegue', 'Tell me when it lands')}</a>
        <a class="btn s" href="${ROUTES.advertise[lang]}" style="align-self:flex-start">${t(lang, 'Patrocinar la temporada', 'Sponsor the season')}</a>
      </div>
    </div></div>
  </section>
</div>`;

  const graph = [
    breadcrumb([{ name: t(lang, 'Inicio', 'Home'), url }]),
    {
      '@type': 'WebPage',
      '@id': SITE.origin + url + '#page',
      url: SITE.origin + url,
      name: title,
      description,
      inLanguage: lang,
      isPartOf: { '@id': SITE.origin + '/#website' },
      about: { '@id': SITE.origin + '/#podcast' },
      primaryImageOfPage: { '@type': 'ImageObject', url: SITE.origin + '/img/og-default.jpg' }
    }
  ];

  const preload = preloadImage({
    name: 'host', widths: [320, 480, 640], sizes: '(max-width:920px) 60vw, 290px'
  });

  return {
    url,
    html: layout({
      lang, url, altUrl, title, description, body, active: '', graph, preload,
      ogImageAlt: t(lang, 'Jesús Martínez en la mesa de Otra Conversación', 'Jesús Martínez at the Otra Conversación table')
    })
  };
}
