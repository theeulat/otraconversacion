/**
 * POST /api/contact
 *
 * Recibe los formularios del sitio (contacto y propuesta de invitado).
 * Guarda el mensaje en D1 si hay binding `DB`, avisa por correo con Resend si
 * hay `RESEND_API_KEY`, y limita el ritmo con KV si hay `RATE_LIMIT`.
 * Todo lo opcional degrada con elegancia: el formulario nunca deja de funcionar.
 */

const TO = 'jesus@otraconversacion.com';
const FROM = 'Otra Conversacion <web@otraconversacion.com>';
const MAX = { nombre: 120, email: 180, proyecto: 200, mensaje: 4000, motivo: 40 };

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    }
  });

const clean = (v, max) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);
const escapeHtml = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function ensureTable(db) {
  await db.exec(
    'CREATE TABLE IF NOT EXISTS messages (' +
    'id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL, form TEXT NOT NULL, ' +
    'lang TEXT, nombre TEXT, email TEXT, motivo TEXT, proyecto TEXT, mensaje TEXT, ' +
    'page TEXT, country TEXT, ip_hash TEXT, user_agent TEXT)'
  );
}

async function hash(value) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(buf)].slice(0, 8).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function handlePost(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }

  /* Trampa para robots: campo oculto que un humano nunca rellena. */
  if (clean(payload.empresa_web, 50)) return json({ ok: true, skipped: true });

  const data = {
    form: clean(payload.form, 30) || 'contacto',
    lang: clean(payload.lang, 5) === 'en' ? 'en' : 'es',
    nombre: clean(payload.nombre, MAX.nombre),
    email: clean(payload.email, MAX.email),
    motivo: clean(payload.motivo, MAX.motivo),
    proyecto: clean(payload.proyecto, MAX.proyecto),
    mensaje: clean(payload.mensaje, MAX.mensaje),
    page: clean(payload.page, 200)
  };

  if (!data.nombre || !data.mensaje) return json({ ok: false, error: 'missing_fields' }, 400);
  if (!validEmail(data.email)) return json({ ok: false, error: 'bad_email' }, 400);
  if (data.mensaje.length < 10) return json({ ok: false, error: 'message_too_short' }, 400);

  const ip = request.headers.get('CF-Connecting-IP') || '0.0.0.0';
  const ipHash = await hash(ip + (env.SALT || 'oc'));
  const country = request.headers.get('CF-IPCountry') || '';
  const ua = (request.headers.get('User-Agent') || '').slice(0, 200);

  /* Limite de ritmo: 5 envios por IP y hora, si hay KV disponible. */
  if (env.RATE_LIMIT) {
    const key = `rl:${ipHash}`;
    const count = parseInt((await env.RATE_LIMIT.get(key)) || '0', 10);
    if (count >= 5) return json({ ok: false, error: 'rate_limited' }, 429);
    await env.RATE_LIMIT.put(key, String(count + 1), { expirationTtl: 3600 });
  }

  const created = new Date().toISOString();
  let stored = false;

  if (env.DB) {
    try {
      await ensureTable(env.DB);
      await env.DB.prepare(
        'INSERT INTO messages (created_at, form, lang, nombre, email, motivo, proyecto, mensaje, page, country, ip_hash, user_agent)' +
        ' VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
      ).bind(created, data.form, data.lang, data.nombre, data.email, data.motivo,
        data.proyecto, data.mensaje, data.page, country, ipHash, ua).run();
      stored = true;
    } catch (err) {
      console.error('D1 insert failed', err);
    }
  }

  const subject = data.form === 'invitado'
    ? `Propuesta de invitado · ${data.nombre}`
    : `Contacto web (${data.motivo || 'general'}) · ${data.nombre}`;

  const lines = [
    ['Formulario', data.form],
    ['Nombre', data.nombre],
    ['Correo', data.email],
    data.motivo ? ['Motivo', data.motivo] : null,
    data.proyecto ? ['Qué ha construido', data.proyecto] : null,
    ['Idioma', data.lang],
    ['Página', data.page],
    ['País', country],
    ['Fecha', created]
  ].filter(Boolean);

  const html =
    `<h2>${escapeHtml(subject)}</h2><table cellpadding="6">` +
    lines.map(([k, v]) => `<tr><td><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v)}</td></tr>`).join('') +
    `</table><h3>Mensaje</h3><p>${escapeHtml(data.mensaje).replace(/\n/g, '<br>')}</p>`;

  let mailed = false;
  if (env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: env.MAIL_FROM || FROM,
          to: [env.MAIL_TO || TO],
          reply_to: data.email,
          subject,
          html
        })
      });
      mailed = res.ok;
      if (!res.ok) console.error('Resend error', res.status, await res.text());
    } catch (err) {
      console.error('Resend request failed', err);
    }
  }

  if (!mailed && env.NOTIFY_WEBHOOK) {
    try {
      await fetch(env.NOTIFY_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `${subject}\n\n${data.mensaje}\n\n${data.email}` })
      });
      mailed = true;
    } catch (err) {
      console.error('Webhook failed', err);
    }
  }

  if (!stored && !mailed) {
    /* Sin almacenamiento ni correo no podemos garantizar la entrega: mejor decirlo. */
    console.error('Mensaje sin destino', subject);
    return json({ ok: false, error: 'no_delivery_channel' }, 503);
  }

  return json({ ok: true, stored, mailed });
}

export async function onRequest({ request, env }) {
  if (request.method === 'POST') return handlePost(request, env);
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { Allow: 'POST, OPTIONS' } });
  }
  return json({ ok: false, error: 'method_not_allowed' }, 405);
}
