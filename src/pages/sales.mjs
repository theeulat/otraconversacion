import { SITE, ROUTES, t } from '../data/site.mjs';
import { layout, esc, picture, crumbsHtml, breadcrumb } from '../lib/render.mjs';

const mailto = (subject) => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;

/* ── Publicita con nosotros ──────────────────────────── */
export function advertisePage({ lang }) {
  const url = ROUTES.advertise[lang];
  const altUrl = ROUTES.advertise[lang === 'es' ? 'en' : 'es'];
  const title = t(lang,
    'Publicidad y patrocinio en el podcast Otra Conversación',
    'Advertising and sponsorship on the Otra Conversación podcast');
  const description = t(lang,
    'Una sola marca por episodio, 67 minutos de atención media y una audiencia de profesionales que compran. Formatos, precios y plazas de la temporada de Ámsterdam.',
    'One brand per episode, 67 minutes of average attention and an audience of professionals who buy. Formats, prices and seats for the Amsterdam season.');
  const crumbs = [
    { name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] },
    { name: t(lang, 'Publicita con nosotros', 'Advertise with us'), url: null }
  ];

  const faqs = [
    { q: t(lang, '¿Cuánto cuesta anunciarse en Otra Conversación?', 'How much does it cost to advertise on Otra Conversación?'),
      a: t(lang, 'Una plaza de la temporada de Ámsterdam cuesta 500 € para las cinco primeras empresas y 750 € después. Los demás formatos (mención, episodio asociado, paquete mensual y partner de temporada) se presupuestan según campaña.',
                 'A seat in the Amsterdam season costs €500 for the first five companies and €750 afterwards. The other formats (host read, presented episode, monthly package and season partner) are quoted per campaign.') },
    { q: t(lang, '¿Cuántas marcas hay por episodio?', 'How many brands appear per episode?'),
      a: t(lang, 'Una sola, sin excepciones. Tu mensaje no compite con nadie dentro del episodio.',
                 'One only, no exceptions. Your message competes with nobody inside the episode.') },
    { q: t(lang, '¿Qué audiencia tiene el podcast?', 'What audience does the podcast have?'),
      a: t(lang, 'Profesionales de 24 a 45 años en Europa y América, con 59.000 visualizaciones acumuladas, 7.200 suscriptores y una atención media de 67 minutos por episodio. Los datos completos se envían con el media kit.',
                 'Professionals aged 24 to 45 across Europe and the Americas, with 59,000 accumulated views, 7,200 subscribers and 67 minutes of average attention per episode. Full figures come with the media kit.') },
    { q: t(lang, '¿Aceptáis cualquier marca?', 'Do you accept any brand?'),
      a: t(lang, 'No. Si creemos que tu producto no encaja con la audiencia, te lo decimos y no cogemos tu dinero. Esa honestidad es exactamente lo que compras.',
                 'No. If we believe your product does not fit the audience, we say so and do not take your money. That honesty is exactly what you are buying.') },
    { q: t(lang, '¿En cuánto tiempo respondéis?', 'How quickly do you reply?'),
      a: t(lang, 'En menos de 48 horas, y responde directamente el anfitrión, no un departamento comercial.',
                 'Within 48 hours, and the host replies directly, not a sales department.') }
  ];

  const body = `
<div class="page">
  <section class="sales-hero" aria-label="${t(lang, 'Publicita con nosotros', 'Advertise with us')}">
    <div class="wrap">
      ${crumbsHtml(crumbs)}
      <p class="kick" style="margin-top:14px"><span class="rd">${t(lang, 'Publicita con nosotros', 'Advertise with us')}</span> · ${t(lang, 'Pocas marcas · Cupos limitados para la temporada 3', 'Few brands · Limited seats for season three')}</p>
      <h1 class="ws">${t(lang,
        'Si tuvieras la atención de tu cliente durante <span class="und">una hora</span>, ¿qué le contarías?',
        'If you had your customer’s attention for <span class="und">one hour</span>, what would you say?')}</h1>
      <p class="sub">${t(lang,
        '59.000 visualizaciones. 27 horas grabadas. Una sola marca por episodio. Mientras tu anuncio pelea por tres segundos de scroll, aquí tu marca vive dentro de una conversación que nadie se salta. <b>La pregunta no es cuánto cuesta entrar. Es cuánto te cuesta que tu competencia entre antes.</b>',
        '59,000 views. 27 hours recorded. One brand per episode. While your ad fights for three seconds of scroll, here your brand lives inside a conversation nobody skips. <b>The question is not what it costs to get in. It is what it costs you if your competitor gets in first.</b>')}</p>
      <div class="listen">
        <a class="btn r" href="${mailto('Publicidad en Otra Conversación')}">${t(lang, 'Hablemos', 'Let’s talk')} · ${SITE.email}</a>
        <a class="btn s" href="${ROUTES.contact[lang]}">${t(lang, 'Pedir el media kit', 'Request the media kit')}</a>
      </div>
      <p class="kick" style="margin-top:18px">${t(lang, 'Respondemos en menos de 48 horas · Sin compromiso', 'We reply within 48 hours · No commitment')}</p>
    </div>
  </section>

  <section aria-labelledby="h-quien">
    <div class="wrap">
      <div class="bio">
        <div class="ph r34 has rv">${picture({ name: 'host', ratio: '3/4', widths: [320, 480, 640], sizes: '(max-width:820px) 70vw, 280px', alt: t(lang, 'Jesús Martínez, anfitrión de Otra Conversación', 'Jesús Martínez, host of Otra Conversación'), cls: 'fill' })}</div>
        <div class="rv">
          <p class="kick">${t(lang, 'Quién está detrás', 'Who is behind it')}</p>
          <h2 id="h-quien" class="bion">Jesús <i class="ol">Martínez</i></h2>
          <p>${t(lang, 'Dirijo empresas de medios y hago este podcast. Vivo en Ámsterdam y trabajo entre Europa y el mundo hispanohablante. No soy periodista: soy operador, y por eso las preguntas vienen de haber vivido el problema.',
                       'I run media companies and I make this podcast. I live in Amsterdam and work between Europe and the Spanish-speaking world. I am not a journalist: I am an operator, which is why the questions come from having lived the problem.')}</p>
          <p>${t(lang, 'Cuando escribes a esta casa me escribes a mí, no a un departamento comercial. Respondo yo, en menos de 48 horas.',
                       'When you write to this address you write to me, not to a sales department. I answer, within 48 hours.')}</p>
        </div>
      </div>
    </div>
  </section>

  <div class="stats" aria-label="${t(lang, 'Números', 'Numbers')}">
    <div class="wrap"><div class="grid">
      <div class="stat rv"><b><span class="cnt" data-n="59">0</span><i>K+</i></b><span>${t(lang, 'Visualizaciones acumuladas', 'Accumulated views')}</span></div>
      <div class="stat rv"><b><span class="cnt" data-n="67">0</span><i>min</i></b><span>${t(lang, 'De atención media', 'Of average attention')}</span></div>
      <div class="stat rv"><b>${SITE.stats.subscribers}<i>+</i></b><span>${t(lang, 'Suscriptores en YouTube', 'YouTube subscribers')}</span></div>
      <div class="stat rv"><b>1</b><span>${t(lang, 'Marca por episodio · Máximo', 'Brand per episode · Maximum')}</span></div>
    </div></div>
  </div>

  <section aria-labelledby="h-ams">
    <div class="wrap">
      <div class="shead rv"><h2 id="h-ams" class="ws">${t(lang, 'La temporada de <i class="ol">Ámsterdam</i>', 'The <i class="ol">Amsterdam</i> season')}</h2><span class="kick">${t(lang, 'Temporada 3', 'Season 3')} · <span class="rd">${t(lang, '12 plazas', '12 seats')}</span></span></div>
      <div class="offer">
        <div class="rv">
          <p class="lead">${t(lang,
            'La tercera temporada se graba entera en Ámsterdam, en inglés, alrededor de empresas holandesas y de la gente que las dirige. Doce plazas, una empresa por episodio.',
            'Season three is recorded entirely in Amsterdam, in English, around Dutch companies and the people who run them. Twelve seats, one company per episode.')}</p>
          <p class="lead2">${t(lang,
            'Con una condición: tienes que tener algo real que contar. Si creo que la conversación no va a ser buena, te lo digo y no cojo tu dinero.',
            'On one condition: you need something real to say. If I think the conversation will not be good, I will tell you and I will not take your money.')}</p>
          <div class="listen" style="margin-top:26px">
            <a class="btn p" href="${mailto('Temporada de Ámsterdam · Reservar plaza')}">${t(lang, 'Reservar una plaza', 'Reserve a seat')}</a>
            <a class="btn s" href="${ROUTES.contact[lang]}">${t(lang, 'Hacer una pregunta', 'Ask a question')}</a>
          </div>
        </div>
        <div class="pricecard rv">
          <span class="k">${t(lang, 'Una plaza incluye', 'One seat includes')}</span>
          <div class="price">500 €</div>
          <p class="note">${t(lang, 'Precio de fundador para las cinco primeras empresas. Después, 750 €.', 'Founder price for the first five companies. €750 afterwards.')}</p>
          <ul>
            <li>${t(lang, 'Una hora de entrevista en el estudio, sin guion', 'A one-hour studio interview, no script')}</li>
            <li>${t(lang, 'El episodio completo, los clips y el audio, tuyos', 'The full episode, the clips and the audio, yours')}</li>
            <li>${t(lang, 'Publicación en el canal y piezas para tus redes', 'Published on the channel, plus cuts for your channels')}</li>
            <li>${t(lang, 'Una sola empresa por episodio', 'One company per episode')}</li>
            <li>${t(lang, 'Grabación en inglés, en Ámsterdam', 'Recorded in English, in Amsterdam')}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section aria-labelledby="h-why">
    <div class="wrap">
      <div class="shead rv"><h2 id="h-why" class="ws">${t(lang, 'Por qué <i class="ol">funciona</i>', 'Why it <i class="ol">works</i>')}</h2><span class="kick">${t(lang, 'Tres verdades incómodas para la publicidad tradicional', 'Three uncomfortable truths for traditional advertising')}</span></div>
      <div class="why">
        <div class="card rv"><span class="n">01</span><h3>${t(lang, 'Atención <span class="rd">real</span>, no impresiones', '<span class="rd">Real</span> attention, not impressions')}</h3><p>${t(lang, 'Un anuncio de feed vive 3 segundos. Aquí tu marca vive dentro de una conversación de 67 minutos de media que la gente eligió escuchar. Nadie se salta lo que quiere oír.', 'A feed ad lives three seconds. Here your brand lives inside a 67-minute average conversation people chose to hear. Nobody skips what they want to listen to.')}</p></div>
        <div class="card rv"><span class="n">02</span><h3>${t(lang, 'Audiencia que <span class="rd">decide y compra</span>', 'An audience that <span class="rd">decides and buys</span>')}</h3><p>${t(lang, 'Dueños de negocio, autónomos y profesionales ambiciosos. Gente que contrata software, asesoría, formación, seguros y herramientas. Tu cliente exacto, no tráfico frío.', 'Business owners, sole traders and ambitious professionals. People who buy software, advice, training, insurance and tools. Your exact customer, not cold traffic.')}</p></div>
        <div class="card rv"><span class="n">03</span><h3>${t(lang, 'La voz que ya tiene su <span class="rd">confianza</span>', 'The voice that already has their <span class="rd">trust</span>')}</h3><p>${t(lang, 'La mención la lee el anfitrión, con su voz y su criterio, presentada con honestidad. No es una cuña que interrumpe: es una recomendación dentro de la mesa.', 'The read is delivered by the host, in his voice and with his judgement, presented honestly. It is not an interruption: it is a recommendation inside the conversation.')}</p></div>
      </div>
    </div>
  </section>

  <section aria-labelledby="h-aud">
    <div class="wrap">
      <div class="shead rv"><h2 id="h-aud" class="ws">${t(lang, 'Quién se sienta a <i class="ol">escuchar</i>', 'Who sits down to <i class="ol">listen</i>')}</h2><span class="kick">${t(lang, 'Y quién no · Honestidad que vende', 'And who does not · Honesty that sells')}</span></div>
      <div class="duo" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--gutter)">
        <div class="aud rv">
          <span class="tag ok">${t(lang, 'Quién nos escucha', 'Who listens')}</span>
          <h3>${t(lang, 'Profesionales curiosos que quieren saber cómo funcionan las cosas por dentro.', 'Curious professionals who want to know how things work from the inside.')}</h3>
          <p>${t(lang, 'De 24 a 45 años, en Europa y América, y ahora también en mercados de habla inglesa. Gente que elige una conversación de una hora antes que un clip: perfiles con carrera, con criterio y con capacidad de compra.', 'Aged 24 to 45, across Europe and the Americas, and now in English-speaking markets too. People who pick an hour-long conversation over a clip: established, discerning and able to buy.')}</p>
          <p>${t(lang, 'Escuchan con auriculares, terminan los episodios y vuelven: <b>67 minutos de atención media no los tiene ningún otro formato.</b>', 'They listen on headphones, finish episodes and come back: <b>no other format holds 67 minutes of average attention.</b>')}</p>
        </div>
        <div class="aud no rv">
          <span class="tag bad">${t(lang, 'Quién no nos escucha', 'Who does not')}</span>
          <h3>${t(lang, 'Y lo decimos antes de cobrarte.', 'And we say so before charging you.')}</h3>
          <p>${t(lang, 'No somos audiencia masiva de entretenimiento rápido, ni adolescentes, ni buscadores de fórmulas mágicas. Si tu producto necesita millones de impresiones frías o vive del impulso, hay canales mejores para ti, y te lo diremos en la primera llamada.', 'We are not a mass audience for fast entertainment, not teenagers, not people looking for magic formulas. If your product needs millions of cold impressions or lives on impulse, there are better channels, and we will say so on the first call.')}</p>
          <p>${t(lang, 'Si tu cliente es un profesional con criterio que investiga antes de comprar, <b>estás exactamente en el sitio correcto.</b>', 'If your customer is a discerning professional who researches before buying, <b>you are exactly in the right place.</b>')}</p>
        </div>
      </div>
      <h3 class="sectt rv">${t(lang, 'Sectores que encajan en la mesa', 'Sectors that fit this table')}</h3>
      <div class="chips rv">
        ${(lang === 'es'
          ? ['Formación y escuelas', 'Salud y seguros', 'Audio y tecnología', 'Empleo y RRHH', 'Software para autónomos', 'Deporte y nutrición', 'Editorial y audiolibros', 'Banca y fintech']
          : ['Education and schools', 'Health and insurance', 'Audio and technology', 'Jobs and HR', 'Software for sole traders', 'Sport and nutrition', 'Publishing and audiobooks', 'Banking and fintech']
        ).map((c) => `<span>${c}</span>`).join('')}
      </div>
    </div>
  </section>

  <section aria-labelledby="h-fmt">
    <div class="wrap">
      <div class="shead rv"><h2 id="h-fmt" class="ws">${t(lang, 'Otras formas de sentarte <i class="ol">a la mesa</i>', 'Other ways to <i class="ol">join the table</i>')}</h2><span class="kick">${t(lang, 'Si no encajas en la temporada de Ámsterdam', 'If the Amsterdam season is not your fit')}</span></div>
      <div class="formats">
        <div class="fmt rv"><span class="k">${t(lang, 'Formato 01', 'Format 01')}</span><h3>${t(lang, 'La mención', 'The host read')}</h3><p>${t(lang, '60 a 90 segundos leídos por el anfitrión dentro del episodio, con su voz y su criterio.', '60 to 90 seconds read by the host inside the episode, in his voice and with his judgement.')}</p>
          <ul><li>${t(lang, 'Guion co-creado, aprobación final tuya', 'Co-written script, final approval yours')}</li><li>${t(lang, 'Permanece en el episodio para siempre', 'Stays in the episode forever')}</li><li>${t(lang, 'Señalada con honestidad', 'Clearly disclosed')}</li></ul></div>
        <div class="fmt rv"><span class="k">${t(lang, 'Formato 02', 'Format 02')}</span><h3>${t(lang, 'El episodio asociado', 'The presented episode')}</h3><p>${t(lang, 'Tu marca acompaña un episodio completo afín a tu sector, en audio y en vídeo.', 'Your brand accompanies a full episode matched to your sector, in audio and video.')}</p>
          <ul><li>${t(lang, 'Mención + logotipo en vídeo y piezas', 'Read plus logo in video and cuts')}</li><li>${t(lang, 'Lockup oficial en la miniatura', 'Official lockup on the thumbnail')}</li><li>${t(lang, 'Clips co-creados para tus canales', 'Co-created clips for your channels')}</li></ul></div>
        <div class="fmt rv"><span class="k">${t(lang, 'Formato 03', 'Format 03')}</span><h3>${t(lang, 'El paquete mensual', 'The monthly package')}</h3><p>${t(lang, 'Cuatro episodios seguidos con todas sus piezas, para estar presente un mes entero.', 'Four consecutive episodes with all their assets, to stay present for a full month.')}</p>
          <ul><li>${t(lang, '4 episodios y todos sus clips', '4 episodes and all their clips')}</li><li>${t(lang, 'Contenido co-creado para tus canales', 'Co-created content for your channels')}</li><li>${t(lang, 'Informe de resultados sin inflar', 'A results report with nothing inflated')}</li></ul></div>
        <div class="fmt star rv"><span class="k">${t(lang, 'Formato 04 · La joya', 'Format 04 · The prize')}</span><h3>${t(lang, 'Partner de temporada', 'Season partner')}</h3><p>${t(lang, 'Una sola marca por temporada. Exclusividad total de tu categoría durante toda la temporada.', 'One brand per season. Full category exclusivity for the whole season.')}</p>
          <ul><li>${t(lang, 'Presencia en todos los episodios y piezas', 'Presence in every episode and asset')}</li><li>${t(lang, 'Evento en directo incluido', 'Live event included')}</li><li>${t(lang, 'Primera opción de renovación', 'First option to renew')}</li></ul></div>
      </div>
    </div>
  </section>

  <section aria-labelledby="h-how">
    <div class="wrap">
      <div class="shead rv"><h2 id="h-how" class="ws">${t(lang, 'Cómo <i class="ol">trabajamos</i>', 'How we <i class="ol">work</i>')}</h2><span class="kick">${t(lang, 'Tres reglas que protegen tu inversión', 'Three rules that protect your investment')}</span></div>
      <div class="steps">
        <div class="step rv"><b><em>01</em>${t(lang, 'Afinidad primero', 'Fit first')}</b><p>${t(lang, 'Si tu producto no encaja con la audiencia, te lo decimos y no cogemos tu dinero. Esa honestidad es exactamente lo que compras.', 'If your product does not fit the audience, we say so and do not take your money. That honesty is exactly what you buy.')}</p></div>
        <div class="step rv"><b><em>02</em>${t(lang, 'Números reales', 'Real numbers')}</b><p>${t(lang, 'Te enseñamos las métricas de verdad, sin inflar. Preferimos una marca contenta que renueva a diez decepcionadas.', 'We show you the real metrics, not inflated. We prefer one happy brand that renews over ten disappointed ones.')}</p></div>
        <div class="step rv"><b><em>03</em>${t(lang, 'Una marca por episodio', 'One brand per episode')}</b><p>${t(lang, 'Tu mensaje no compite con nadie. Máxima atención, cero ruido, exclusividad dentro de tu mesa.', 'Your message competes with nobody. Maximum attention, zero noise, exclusivity inside your episode.')}</p></div>
      </div>
    </div>
  </section>

  <section aria-labelledby="h-faq-ad">
    <div class="wrap">
      <div class="shead rv"><h2 id="h-faq-ad" class="ws">${t(lang, 'Preguntas <i class="ol">frecuentes</i>', 'Frequently asked <i class="ol">questions</i>')}</h2><span class="kick">${t(lang, 'Antes de escribirnos', 'Before you write')}</span></div>
      <div class="faq rv">
        ${faqs.map((f) => `<details><summary>${esc(f.q)}<span class="pl">+</span></summary><p class="ans">${esc(f.a)}</p></details>`).join('\n')}
      </div>
    </div>
  </section>

  <section aria-label="${t(lang, 'Contacto de marcas', 'Brand contact')}">
    <div class="wrap">
      <div class="bigcta rv">
        <span class="bgw" aria-hidden="true">Oc.</span>
        <h2 class="ws">${t(lang, '¿Hablamos<span class="rd">?</span>', 'Shall we <span class="rd">talk?</span>')}</h2>
        <p>${t(lang,
          'Cuéntanos quién eres y a quién quieres llegar. Te respondemos en menos de 48 horas con una propuesta concreta, números reales y el media kit completo. Sin llamadas eternas, sin humo: como todo lo demás en esta casa.',
          'Tell us who you are and who you want to reach. We reply within 48 hours with a concrete proposal, real numbers and the full media kit. No endless calls, no smoke: like everything else here.')}</p>
        <div class="row">
          <a class="btn r" href="${mailto('Quiero un asiento en la mesa')}">${t(lang, 'Escríbenos ahora', 'Write to us now')}</a>
          <a class="btn s" href="${ROUTES.contact[lang]}">${t(lang, 'Usar el formulario', 'Use the form')}</a>
          <span class="mail">${SITE.email}</span>
        </div>
      </div>
    </div>
  </section>
</div>`;

  const graph = [
    breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url }))),
    {
      '@type': 'FAQPage',
      '@id': SITE.origin + url + '#faq',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    },
    {
      '@type': 'Service',
      '@id': SITE.origin + url + '#service',
      name: t(lang, 'Patrocinio en Otra Conversación', 'Sponsorship on Otra Conversación'),
      serviceType: t(lang, 'Publicidad en podcast', 'Podcast advertising'),
      provider: { '@id': SITE.origin + '/#org' },
      areaServed: ['ES', 'NL', 'EU', 'LATAM'],
      offers: {
        '@type': 'Offer',
        price: '500', priceCurrency: 'EUR',
        description: t(lang, 'Una plaza de la temporada de Ámsterdam, precio de fundador para las cinco primeras empresas.',
                             'One seat in the Amsterdam season, founder price for the first five companies.'),
        availability: 'https://schema.org/LimitedAvailability',
        url: SITE.origin + url
      }
    }
  ];

  return { url, html: layout({ lang, url, altUrl, title, description, body, active: 'advertise', graph }) };
}

/* ── Sé invitado ─────────────────────────────────────── */
export function guestPage({ lang }) {
  const url = ROUTES.guest[lang];
  const altUrl = ROUTES.guest[lang === 'es' ? 'en' : 'es'];
  const title = t(lang,
    'Sé invitado del podcast: propón tu historia | Otra Conversación',
    'Be a guest on the podcast: pitch your story | Otra Conversación');
  const description = t(lang,
    'Si has construido o sostenido algo real y puedes hablar también de lo que salió mal, esta mesa es para ti. Gratis: aquí no se paga por sentarse.',
    'If you have built or sustained something real and can also talk about what went wrong, this table is for you. Free: nobody pays for a seat.');
  const crumbs = [
    { name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] },
    { name: t(lang, 'Sé invitado', 'Be a guest'), url: null }
  ];

  const faqs = [
    { q: t(lang, '¿Tengo que ser conocido para venir?', 'Do I need to be well known to come on?'),
      a: t(lang, 'Al contrario. Este podcast existe precisamente para la gente que ha construido algo real y no es famosa. Los seguidores no puntúan; la historia sí.',
                 'Quite the opposite. This podcast exists precisely for people who have built something real and are not famous. Followers do not count; the story does.') },
    { q: t(lang, '¿Cuánto dura y cómo es la grabación?', 'How long is it and how is it recorded?'),
      a: t(lang, 'Alrededor de una hora, sin guion cerrado. Hablamos antes veinte minutos para conocernos y luego la conversación fluye. Presencial en el estudio o en remoto con buena conexión.',
                 'About an hour, with no closed script. We talk for twenty minutes beforehand to get to know each other and then the conversation flows. In the studio, or remote with a good connection.') },
    { q: t(lang, '¿Puedo hablar de mi empresa o proyecto?', 'Can I talk about my company or project?'),
      a: t(lang, 'Claro, es tu historia. Lo único que pedimos es que vengas a contar, no a vender: el episodio nunca se convierte en un anuncio.',
                 'Of course, it is your story. All we ask is that you come to tell, not to sell: the episode never becomes an advert.') },
    { q: t(lang, '¿Cuánto cuesta salir en el podcast?', 'What does it cost to be on the podcast?'),
      a: t(lang, 'Nada. No cobramos a los invitados por sentarse ni aceptamos pagos por entrevistas. Los invitados se eligen por su historia, no por su bolsillo.',
                 'Nothing. We do not charge guests and we do not accept payment for interviews. Guests are chosen for their story, not their budget.') },
    { q: t(lang, '¿En qué idioma se graba?', 'What language is it recorded in?'),
      a: t(lang, 'Las dos primeras temporadas están en español. La tercera se graba en Ámsterdam y en inglés. Dinos cuál prefieres al escribirnos.',
                 'The first two seasons are in Spanish. The third is recorded in Amsterdam and in English. Tell us which you prefer when you write.') }
  ];

  const body = `
<div class="page">
  <div class="pghead"><div class="wrap">
    ${crumbsHtml(crumbs)}
    <p class="kick" style="margin-top:14px">${t(lang, 'Sé invitado · La silla te espera', 'Be a guest · The chair is waiting')}</p>
    <h1 class="pgt ws">${t(lang, 'Tu historia vale más de lo que <span class="und">crees</span>.', 'Your story is worth more than you <span class="und">think</span>.')}</h1>
    <p class="sub">${t(lang,
      'Y nadie la está contando. Si has construido o sostenido algo real, y puedes hablar también de lo que salió mal, esta mesa es para ti.',
      'And nobody is telling it. If you have built or sustained something real, and can also talk about what went wrong, this table is for you.')}</p>
  </div></div>

  <section>
    <div class="wrap">
      <div class="event rv" style="background:var(--carbon)">
        <div class="inner">
          <div>
            <p class="kick">${t(lang, 'Qué te llevas', 'What you take away')}</p>
            <h3>${t(lang, 'Una hora de conversación <i class="ol">en serio</i>.', 'An hour of <i class="ol">serious</i> conversation.')}</h3>
            <p>${t(lang,
              'La mejor pieza de contenido que ha tenido tu negocio en años: el episodio completo, los clips, las quote cards y una historia contada con respeto. Sin coste: aquí no se paga por venir ni se cobra por sentarse.',
              'The best piece of content your business has had in years: the full episode, the clips, the quote cards and a story told with respect. Free: nobody pays to come and nobody is charged to sit down.')}</p>
            <p style="margin-top:18px"><a class="btn s" href="${ROUTES.blog[lang]}">${t(lang, 'Cómo elegimos a los invitados', 'How we choose guests')}</a></p>
          </div>
          <form class="form rv" data-api="/api/contact" data-form="invitado" novalidate>
            <p class="kick">${t(lang, 'Propón tu historia', 'Pitch your story')}</p>
            <div class="fld"><label for="g-nombre">${t(lang, 'Nombre', 'Name')}</label><input id="g-nombre" name="nombre" type="text" autocomplete="name" required maxlength="120"></div>
            <div class="fld"><label for="g-email">${t(lang, 'Correo electrónico', 'Email')}</label><input id="g-email" name="email" type="email" autocomplete="email" required maxlength="180"></div>
            <div class="fld"><label for="g-proy">${t(lang, 'Qué has construido', 'What you have built')}</label><input id="g-proy" name="proyecto" type="text" required maxlength="200"></div>
            <div class="fld"><label for="g-hist">${t(lang, 'Tu historia en tres líneas', 'Your story in three lines')}</label><textarea id="g-hist" name="mensaje" required maxlength="4000"></textarea></div>
            <input class="hp" type="text" name="empresa_web" tabindex="-1" autocomplete="off" aria-hidden="true">
            <button class="btn p" type="submit">${t(lang, 'Enviar propuesta', 'Send pitch')}</button>
            <p class="formstatus" aria-live="polite"></p>
            <p class="note">${t(lang, 'Respondemos a todas las propuestas en menos de 48 horas.', 'We answer every pitch within 48 hours.')}</p>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section aria-labelledby="h-faq">
    <div class="wrap">
      <div class="shead rv"><h2 id="h-faq" class="ws">${t(lang, 'Preguntas <i class="ol">frecuentes</i>', 'Frequently asked <i class="ol">questions</i>')}</h2><span class="kick">${t(lang, 'Antes de sentarte', 'Before you sit down')}</span></div>
      <div class="faq rv">
        ${faqs.map((f) => `<details><summary>${esc(f.q)}<span class="pl">+</span></summary><p class="ans">${esc(f.a)}</p></details>`).join('\n')}
      </div>
    </div>
  </section>
</div>`;

  const graph = [
    breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url }))),
    {
      '@type': 'FAQPage',
      '@id': SITE.origin + url + '#faq',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    }
  ];

  return { url, html: layout({ lang, url, altUrl, title, description, body, active: 'guest', graph }) };
}
