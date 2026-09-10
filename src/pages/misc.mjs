import { SITE, ROUTES, t } from '../data/site.mjs';
import { layout, esc, picture, crumbsHtml, breadcrumb, lcFirst } from '../lib/render.mjs';
import { epUrl } from './episodes.mjs';

const pagehead = (lang, crumbs, kick, h1, sub) => `
  <div class="pghead"><div class="wrap">
    ${crumbsHtml(crumbs)}
    <p class="kick" style="margin-top:14px">${kick}</p>
    <h1 class="pgt ws">${h1}</h1>
    ${sub ? `<p class="sub">${sub}</p>` : ''}
  </div></div>`;

/* ── Glosario ────────────────────────────────────────── */
export function glossaryPage({ lang, terms }) {
  const url = ROUTES.glossary[lang];
  const altUrl = ROUTES.glossary[lang === 'es' ? 'en' : 'es'];
  const title = t(lang,
    'Glosario de la economía real: 25 términos explicados sin jerga',
    'Glossary of the real economy: 25 terms explained without jargon');
  const description = t(lang,
    'Caja, margen, runway, fondo de maniobra, churn o morosidad, explicados en una frase por quien los ha vivido. El diccionario de la mesa.',
    'Cash, margin, runway, working capital, churn or late payment, each explained in one sentence by people who have lived them.');

  const crumbs = [{ name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] }, { name: t(lang, 'Glosario', 'Glossary'), url: null }];
  const letters = [...new Set(terms.map((x) => x.letter))];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const body = `
<div class="page">
  ${pagehead(lang, crumbs,
    t(lang, 'Glosario · El diccionario de la mesa', 'Glossary · The dictionary of the table'),
    t(lang, 'Las palabras de la <span class="rd">economía real</span>', 'The words of the <span class="rd">real economy</span>'),
    t(lang, 'Los términos que salen en la mesa, explicados sin jerga y sin humo. Un glosario vivo: crece con cada episodio.',
             'The terms that come up at the table, explained without jargon and without fluff. A living glossary: it grows with every episode.'))}
  <section>
    <div class="wrap glower">
      <div class="gidx" aria-hidden="true">${alphabet.map((L) => `<span${letters.includes(L) ? ' class="hl"' : ''}>${L}</span>`).join('')}</div>
      <dl class="gloss rv">
        ${terms.map((x) => `<dt id="${x.id}"><span class="rd">${x.letter}</span> · ${esc(x.term[lang])}</dt><dd>${esc(x.def[lang])}</dd>`).join('\n')}
      </dl>
    </div>
  </section>
</div>`;

  const graph = [
    breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url }))),
    {
      '@type': 'DefinedTermSet',
      '@id': SITE.origin + url + '#set',
      name: title,
      description,
      url: SITE.origin + url,
      inLanguage: lang,
      hasDefinedTerm: terms.map((x) => ({
        '@type': 'DefinedTerm',
        '@id': SITE.origin + url + '#' + x.id,
        name: x.term[lang],
        description: x.def[lang],
        inDefinedTermSet: { '@id': SITE.origin + url + '#set' }
      }))
    }
  ];

  return { url, html: layout({ lang, url, altUrl, title, description, body, active: 'glossary', graph }) };
}

/* ── Sobre el podcast ────────────────────────────────── */
export function aboutPage({ lang, episodes }) {
  const url = ROUTES.about[lang];
  const altUrl = ROUTES.about[lang === 'es' ? 'en' : 'es'];
  const title = t(lang,
    'Sobre Otra Conversación y Jesús Martínez, su anfitrión',
    'About Otra Conversación and its host, Jesús Martínez');
  const description = t(lang,
    'Qué es Otra Conversación, cómo se elige a cada invitado, cómo se graba y quién está detrás. Un podcast de entrevistas largas sin guion.',
    'What Otra Conversación is, how guests are chosen, how it is recorded and who is behind it. A long-form interview podcast with no script.');
  const crumbs = [{ name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] }, { name: t(lang, 'Sobre el podcast', 'About'), url: null }];

  const body = `
<div class="page">
  ${pagehead(lang, crumbs,
    t(lang, 'Sobre la mesa', 'About the table'),
    t(lang, 'Un podcast de <i class="ol">una hora</i>, sin guion', 'An <i class="ol">hour-long</i> podcast, with no script'),
    t(lang, 'Veinticuatro conversaciones publicadas, veintisiete horas grabadas y una sola regla: que quien se siente sepa de verdad de lo que habla.',
             'Twenty-four published conversations, twenty-seven hours recorded and one rule: whoever sits down actually knows what they are talking about.'))}

  <section>
    <div class="wrap">
      <div class="bio">
        <div class="ph r34 has rv">${picture({ name: 'host', ratio: '3/4', widths: [320, 480, 640], sizes: '(max-width:820px) 70vw, 280px', alt: t(lang, 'Jesús Martínez, anfitrión de Otra Conversación', 'Jesús Martínez, host of Otra Conversación'), cls: 'fill' })}</div>
        <div class="rv">
          <p class="kick">${t(lang, 'Quién está detrás', 'Who is behind it')}</p>
          <h2 class="bion">Jesús <i class="ol">Martínez</i></h2>
          <p>${t(lang,
            'Dirijo empresas de medios y hago este podcast. Vivo en Ámsterdam y trabajo entre Europa y el mundo hispanohablante. No soy periodista: soy operador, y por eso las preguntas vienen de haber vivido el problema.',
            'I run media companies and I make this podcast. I live in Amsterdam and work between Europe and the Spanish-speaking world. I am not a journalist: I am an operator, which is why the questions come from having lived the problem.')}</p>
          <p>${t(lang,
            'Cuando escribes a esta casa me escribes a mí, no a un departamento comercial. Respondo yo, en menos de 48 horas.',
            'When you write to this address you write to me, not to a sales department. I answer, within 48 hours.')}</p>
          <p><a class="btn s" href="${ROUTES.contact[lang]}">${t(lang, 'Escríbeme', 'Write to me')}</a></p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="shead rv"><h2 class="ws">${t(lang, 'Cómo <i class="ol">funciona</i>', 'How it <i class="ol">works</i>')}</h2><span class="kick">${t(lang, 'Cuatro reglas fijas', 'Four fixed rules')}</span></div>
      <div class="why">
        <div class="card rv"><span class="n">01</span><h3>${t(lang, 'Una hora, <span class="rd">sin guion</span>', 'One hour, <span class="rd">no script</span>')}</h3><p>${t(lang, 'No se envían preguntas por adelantado. Hablamos veinte minutos antes de grabar y la conversación va donde tenga que ir.', 'Questions are never sent in advance. We talk for twenty minutes before recording and the conversation goes where it needs to go.')}</p></div>
        <div class="card rv"><span class="n">02</span><h3>${t(lang, 'Nadie <span class="rd">paga</span> por sentarse', 'Nobody <span class="rd">pays</span> for a seat')}</h3><p>${t(lang, 'No cobramos a los invitados ni aceptamos pagos por entrevistas. Los invitados se eligen por su historia.', 'We do not charge guests and we do not accept payment for interviews. Guests are chosen for their story.')}</p></div>
        <div class="card rv"><span class="n">03</span><h3>${t(lang, 'Una <span class="rd">cicatriz</span> por invitado', 'One <span class="rd">scar</span> per guest')}</h3><p>${t(lang, 'Pedimos un error propio del que se pueda hablar con nombre, fecha y aprendizaje. Sin eso hay publicidad, no conversación.', 'We ask for a mistake of your own you can name, date and explain. Without that you get advertising, not a conversation.')}</p></div>
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <div class="shead rv"><h2 class="ws">${t(lang, 'El <i class="ol">archivo</i>', 'The <i class="ol">archive</i>')}</h2><span class="kick">${t(lang, 'Por temporadas', 'By season')}</span></div>
      <div class="epbody">
        <ul style="max-width:none">
          ${episodes.map((e) => `<li><a href="${epUrl(e, lang)}" style="color:var(--hueso)">EP ${e.n} · ${esc(e.title[lang])}</a> — ${esc(e.guest.name)}, ${esc(lcFirst(e.guest.role[lang]))}</li>`).join('\n')}
        </ul>
      </div>
    </div>
  </section>
</div>`;

  const graph = [
    breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url }))),
    {
      '@type': 'AboutPage',
      '@id': SITE.origin + url + '#page',
      url: SITE.origin + url, name: title, description, inLanguage: lang,
      mainEntity: { '@id': SITE.origin + '/#host' }
    }
  ];

  return { url, html: layout({ lang, url, altUrl, title, description, body, active: '', ogImage: '/img/og-host.jpg', graph }) };
}

/* ── Contacto ────────────────────────────────────────── */
export function contactPage({ lang }) {
  const url = ROUTES.contact[lang];
  const altUrl = ROUTES.contact[lang === 'es' ? 'en' : 'es'];
  const title = t(lang, 'Contacto | Otra Conversación', 'Contact | Otra Conversación');
  const description = t(lang,
    `Escribe a ${SITE.email}. Respondemos en menos de 48 horas: propuestas de invitados, marcas, prensa y colaboraciones.`,
    `Write to ${SITE.email}. We reply within 48 hours: guest pitches, brands, press and collaborations.`);
  const crumbs = [{ name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] }, { name: t(lang, 'Contacto', 'Contact'), url: null }];

  const body = `
<div class="page">
  ${pagehead(lang, crumbs,
    t(lang, 'Contacto · Respondemos en menos de 48 horas', 'Contact · We reply within 48 hours'),
    t(lang, '¿Hablamos<span class="rd">?</span>', 'Shall we <span class="rd">talk?</span>'),
    t(lang, `Cuéntanos quién eres y qué necesitas. Escribe directamente a <b>${SITE.email}</b> o usa el formulario: llega al mismo sitio.`,
             `Tell us who you are and what you need. Write directly to <b>${SITE.email}</b> or use the form: it lands in the same place.`))}
  <section>
    <div class="wrap">
      <div class="news">
        <div class="rv">
          <h2 style="font-family:var(--display);font-size:clamp(26px,3.4vw,44px);line-height:1;margin-bottom:16px">${t(lang, 'Para qué escribirnos', 'What to write about')}</h2>
          <ul>
            <li>${t(lang, 'Proponer un invitado o proponerte a ti mismo', 'Pitch a guest, or pitch yourself')}</li>
            <li>${t(lang, 'Patrocinio y publicidad en los episodios', 'Sponsorship and advertising inside the episodes')}</li>
            <li>${t(lang, 'Prensa, entrevistas y colaboraciones', 'Press, interviews and collaborations')}</li>
            <li>${t(lang, 'Avisos de la temporada 3, grabada en Ámsterdam', 'Updates on season three, recorded in Amsterdam')}</li>
          </ul>
          <p style="color:var(--ceniza);margin-top:18px">${t(lang,
            'Escribe el correo tú mismo si lo prefieres:', 'Prefer plain email? Use:')} <a href="mailto:${SITE.email}" style="color:var(--hueso);border-bottom:1px solid var(--rojo)">${SITE.email}</a></p>
        </div>
        ${contactForm(lang, 'contacto')}
      </div>
    </div>
  </section>
</div>`;

  const graph = [
    breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url }))),
    {
      '@type': 'ContactPage',
      '@id': SITE.origin + url + '#page',
      url: SITE.origin + url, name: title, description, inLanguage: lang,
      mainEntity: { '@id': SITE.origin + '/#org' }
    }
  ];

  return { url, html: layout({ lang, url, altUrl, title, description, body, active: '', graph }) };
}

export function contactForm(lang, formName) {
  return `<form class="form light rv" data-api="/api/contact" data-form="${formName}" novalidate>
  <p class="kick">${t(lang, 'Escríbenos', 'Write to us')}</p>
  <div class="fld"><label for="c-nombre">${t(lang, 'Nombre', 'Name')}</label><input id="c-nombre" name="nombre" type="text" autocomplete="name" required maxlength="120"></div>
  <div class="fld"><label for="c-email">${t(lang, 'Correo electrónico', 'Email')}</label><input id="c-email" name="email" type="email" autocomplete="email" required maxlength="180"></div>
  <div class="fld"><label for="c-motivo">${t(lang, 'Motivo', 'Reason')}</label>
    <select id="c-motivo" name="motivo">
      <option value="invitado">${t(lang, 'Propongo un invitado', 'Pitching a guest')}</option>
      <option value="marca">${t(lang, 'Marca o patrocinio', 'Brand or sponsorship')}</option>
      <option value="prensa">${t(lang, 'Prensa o colaboración', 'Press or collaboration')}</option>
      <option value="otro">${t(lang, 'Otro', 'Other')}</option>
    </select></div>
  <div class="fld"><label for="c-mensaje">${t(lang, 'Mensaje', 'Message')}</label><textarea id="c-mensaje" name="mensaje" required maxlength="4000"></textarea></div>
  <input class="hp" type="text" name="empresa_web" tabindex="-1" autocomplete="off" aria-hidden="true">
  <button class="btn p" type="submit">${t(lang, 'Enviar mensaje', 'Send message')}</button>
  <p class="formstatus" aria-live="polite"></p>
  <p class="note">${t(lang, 'Usamos tus datos solo para responderte. Nada de listas ni terceros.', 'We use your details only to reply. No lists, no third parties.')}</p>
</form>`;
}

/* ── Legales ─────────────────────────────────────────── */
export function legalPage({ lang, kind }) {
  const url = ROUTES[kind][lang];
  const altUrl = ROUTES[kind][lang === 'es' ? 'en' : 'es'];
  const today = '9 de septiembre de 2026';
  const todayEn = '9 September 2026';

  const content = {
    privacy: {
      title: t(lang, 'Política de privacidad | Otra Conversación', 'Privacy policy | Otra Conversación'),
      h1: t(lang, 'Política de <i class="ol">privacidad</i>', 'Privacy <i class="ol">policy</i>'),
      desc: t(lang, 'Qué datos recogemos, para qué y durante cuánto tiempo. Sin analítica invasiva y sin venta de datos.',
                    'What data we collect, what for and for how long. No invasive analytics and no data selling.'),
      html: t(lang, `
        <h2>Quién es el responsable</h2>
        <p>El responsable del tratamiento es Jesús Martínez, editor de Otra Conversación. Puedes contactar en <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
        <h2>Qué datos recogemos</h2>
        <ul>
          <li>Los que nos envías tú en los formularios de contacto o de propuesta de invitado: nombre, correo electrónico y el mensaje que escribes.</li>
          <li>Datos técnicos mínimos de servidor necesarios para servir la web y protegerla de abusos, gestionados por Cloudflare.</li>
        </ul>
        <h2>Para qué los usamos</h2>
        <p>Solo para responderte y, si procede, para continuar la conversación que tú has iniciado. No los cedemos a terceros, no los vendemos y no los usamos para publicidad.</p>
        <h2>Cuánto tiempo los guardamos</h2>
        <p>Conservamos los mensajes mientras exista una relación o interés legítimo en el contacto, y los eliminamos cuando dejan de ser necesarios o cuando tú lo pides.</p>
        <h2>Tus derechos</h2>
        <p>Puedes pedir acceso, rectificación, supresión, limitación, portabilidad y oposición escribiendo a <a href="mailto:${SITE.email}">${SITE.email}</a>. También puedes reclamar ante la autoridad de protección de datos de tu país.</p>
        <h2>Terceros</h2>
        <p>El alojamiento es de Cloudflare. Los vídeos se sirven desde YouTube y solo se cargan cuando pulsas el botón de reproducir; en ese momento se aplican las condiciones de Google. Las tipografías se sirven desde Google Fonts.</p>
        <p class="muted">Última actualización: ${today}.</p>`, `
        <h2>Who is responsible</h2>
        <p>The data controller is Jesús Martínez, publisher of Otra Conversación. You can reach us at <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
        <h2>What we collect</h2>
        <ul>
          <li>What you send us in the contact or guest forms: name, email address and the message you write.</li>
          <li>Minimal technical server data needed to serve the site and protect it from abuse, handled by Cloudflare.</li>
        </ul>
        <h2>What we use it for</h2>
        <p>Only to reply to you and, where relevant, to continue the conversation you started. We do not share it, sell it or use it for advertising.</p>
        <h2>How long we keep it</h2>
        <p>We keep messages while there is an ongoing relationship or legitimate interest, and delete them when they are no longer needed or when you ask.</p>
        <h2>Your rights</h2>
        <p>You may request access, rectification, erasure, restriction, portability and objection by writing to <a href="mailto:${SITE.email}">${SITE.email}</a>. You may also complain to your national data protection authority.</p>
        <h2>Third parties</h2>
        <p>Hosting is provided by Cloudflare. Videos are served by YouTube and only load when you press play; Google's terms apply from that moment. Fonts are served by Google Fonts.</p>
        <p class="muted">Last updated: ${todayEn}.</p>`)
    },
    cookies: {
      title: t(lang, 'Política de cookies | Otra Conversación', 'Cookie policy | Otra Conversación'),
      h1: t(lang, 'Política de <i class="ol">cookies</i>', 'Cookie <i class="ol">policy</i>'),
      desc: t(lang, 'Esta web no usa cookies propias ni analítica de seguimiento. Solo YouTube, y solo si pulsas reproducir.',
                    'This site sets no cookies of its own and runs no tracking analytics. Only YouTube, and only if you press play.'),
      html: t(lang, `
        <h2>Resumen</h2>
        <p>Esta web no instala cookies propias, no usa analítica de seguimiento y no comparte tu navegación con redes publicitarias. Por eso no verás un banner de consentimiento.</p>
        <h2>Vídeos de YouTube</h2>
        <p>Los episodios se muestran con una imagen estática. YouTube no carga nada hasta que pulsas el botón de reproducir. A partir de ese momento, YouTube puede instalar sus propias cookies según las condiciones de Google. Usamos el dominio youtube-nocookie.com para reducirlas al mínimo.</p>
        <h2>Tipografías</h2>
        <p>Las tipografías se cargan desde Google Fonts, que no instala cookies pero sí recibe la petición del archivo.</p>
        <h2>Cómo controlarlo</h2>
        <p>Si no quieres que YouTube cargue nada, no pulses reproducir: puedes ver cada episodio directamente en el canal. También puedes bloquear cookies de terceros desde tu navegador.</p>
        <p class="muted">Última actualización: ${today}.</p>`, `
        <h2>Summary</h2>
        <p>This site sets no cookies of its own, runs no tracking analytics and does not share your browsing with ad networks. That is why there is no consent banner.</p>
        <h2>YouTube videos</h2>
        <p>Episodes are shown as a static image. YouTube loads nothing until you press play. From that moment YouTube may set its own cookies under Google's terms. We use the youtube-nocookie.com domain to keep them to a minimum.</p>
        <h2>Fonts</h2>
        <p>Fonts load from Google Fonts, which sets no cookies but does receive the file request.</p>
        <h2>How to control it</h2>
        <p>If you do not want YouTube to load anything, do not press play: you can watch every episode on the channel instead. You can also block third-party cookies in your browser.</p>
        <p class="muted">Last updated: ${todayEn}.</p>`)
    },
    terms: {
      title: t(lang, 'Aviso legal | Otra Conversación', 'Legal notice | Otra Conversación'),
      h1: t(lang, 'Aviso <i class="ol">legal</i>', 'Legal <i class="ol">notice</i>'),
      desc: t(lang, 'Titularidad del sitio, condiciones de uso y propiedad intelectual de los contenidos de Otra Conversación.',
                    'Site ownership, terms of use and intellectual property for the contents of Otra Conversación.'),
      html: t(lang, `
        <h2>Titularidad</h2>
        <p>Este sitio web pertenece a Jesús Martínez, editor del podcast Otra Conversación. Contacto: <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
        <h2>Condiciones de uso</h2>
        <p>El acceso a este sitio es libre y gratuito. Al usarlo aceptas hacerlo conforme a la ley y a la buena fe, sin dañar el servicio ni los derechos de terceros.</p>
        <h2>Propiedad intelectual</h2>
        <p>Los textos, la marca, el diseño y las grabaciones son propiedad de Otra Conversación salvo indicación en contrario. Puedes citar y enlazar libremente indicando la fuente; la reproducción íntegra requiere permiso.</p>
        <h2>Contenidos de los episodios</h2>
        <p>Las opiniones vertidas por los invitados son suyas y no representan necesariamente la posición del editor. Los episodios tienen finalidad informativa y divulgativa: no son asesoramiento médico, legal, financiero ni profesional de ningún tipo.</p>
        <h2>Enlaces externos</h2>
        <p>Este sitio enlaza a plataformas de terceros, como YouTube. No respondemos de sus contenidos ni de sus políticas.</p>
        <p class="muted">Última actualización: ${today}.</p>`, `
        <h2>Ownership</h2>
        <p>This website belongs to Jesús Martínez, publisher of the Otra Conversación podcast. Contact: <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
        <h2>Terms of use</h2>
        <p>Access to this site is free. By using it you agree to do so lawfully and in good faith, without harming the service or the rights of others.</p>
        <h2>Intellectual property</h2>
        <p>Texts, brand, design and recordings belong to Otra Conversación unless stated otherwise. You may quote and link freely with attribution; full reproduction requires permission.</p>
        <h2>Episode content</h2>
        <p>Opinions expressed by guests are their own and do not necessarily represent the publisher's position. Episodes are informational: they are not medical, legal, financial or any other kind of professional advice.</p>
        <h2>External links</h2>
        <p>This site links to third-party platforms such as YouTube. We are not responsible for their content or policies.</p>
        <p class="muted">Last updated: ${todayEn}.</p>`)
    }
  }[kind];

  const crumbs = [{ name: t(lang, 'Inicio', 'Home'), url: ROUTES.home[lang] }, { name: content.title.split(' |')[0], url: null }];

  const body = `
<div class="page">
  ${pagehead(lang, crumbs, t(lang, 'Legal', 'Legal'), content.h1, content.desc)}
  <section><div class="wrap"><div class="legal rv">${content.html}</div></div></section>
</div>`;

  return {
    url,
    html: layout({
      lang, url, altUrl, title: content.title, description: content.desc, body,
      robots: 'index, follow', graph: [breadcrumb(crumbs.map((c) => ({ name: c.name, url: c.url || url })))]
    })
  };
}

/* ── Gracias y 404 ───────────────────────────────────── */
export function thanksPage({ lang }) {
  const url = ROUTES.thanks[lang];
  const altUrl = ROUTES.thanks[lang === 'es' ? 'en' : 'es'];
  const title = t(lang, 'Gracias | Otra Conversación', 'Thank you | Otra Conversación');
  const description = t(lang, 'Hemos recibido tu mensaje. Respondemos en menos de 48 horas.', 'We have your message. We reply within 48 hours.');
  const body = `
<div class="page">
  <div class="pghead"><div class="wrap">
    <p class="kick">${t(lang, 'Recibido', 'Received')}</p>
    <h1 class="pgt ws">${t(lang, 'Gracias<span class="rd">.</span>', 'Thank you<span class="rd">.</span>')}</h1>
    <p class="sub">${t(lang, 'Tu mensaje ya está con nosotros. Respondemos en menos de 48 horas, siempre.', 'Your message is with us. We reply within 48 hours, always.')}</p>
    <p style="margin-top:24px"><a class="btn p" href="${ROUTES.episodes[lang]}">${t(lang, 'Mientras tanto, escucha algo', 'Meanwhile, go listen to something')}</a></p>
  </div></div>
</div>`;
  return { url, html: layout({ lang, url, altUrl, title, description, body, robots: 'noindex, follow' }) };
}

export function notFoundPage({ lang, episodes }) {
  const url = lang === 'es' ? '/404.html' : '/en/404.html';
  const title = t(lang, 'Página no encontrada | Otra Conversación', 'Page not found | Otra Conversación');
  const body = `
<div class="page">
  <div class="pghead"><div class="wrap">
    <p class="kick"><span class="rd">Error 404</span></p>
    <h1 class="pgt ws">${t(lang, 'Aquí no hay <i class="ol">nada</i>.', 'There is <i class="ol">nothing</i> here.')}</h1>
    <p class="sub">${t(lang, 'La página que buscas no existe o ha cambiado de sitio. Prueba con el archivo completo de episodios.', 'The page you are after does not exist or has moved. Try the full episode archive.')}</p>
    <p style="margin-top:24px">
      <a class="btn p" href="${ROUTES.episodes[lang]}">${t(lang, 'Ver los episodios', 'See the episodes')}</a>
      <a class="btn s" href="${ROUTES.home[lang]}">${t(lang, 'Volver al inicio', 'Back home')}</a>
    </p>
  </div></div>
</div>`;
  return {
    url,
    html: layout({
      lang, url: ROUTES.home[lang], altUrl: ROUTES.home[lang === 'es' ? 'en' : 'es'],
      title, description: t(lang, 'Página no encontrada.', 'Page not found.'), body,
      robots: 'noindex, follow', canonical: false
    })
  };
}
