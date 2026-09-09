/**
 * GET /api/messages?token=...&limit=50
 *
 * Lectura de los mensajes guardados en D1. Protegida por el secreto ADMIN_TOKEN.
 * Existe para que los envios se puedan recuperar aunque el correo falle.
 */

const json = (data, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });

/* Comparacion en tiempo constante para no filtrar el token. */
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function onRequest({ request, env }) {
  if (request.method !== 'GET') return json({ ok: false, error: 'method_not_allowed' }, 405);
  if (!env.ADMIN_TOKEN) return json({ ok: false, error: 'admin_disabled' }, 503);

  const url = new URL(request.url);
  const token = url.searchParams.get('token') ||
    (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!safeEqual(token, env.ADMIN_TOKEN)) return json({ ok: false, error: 'unauthorized' }, 401);
  if (!env.DB) return json({ ok: false, error: 'no_database' }, 503);

  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 500);
  try {
    const { results } = await env.DB
      .prepare('SELECT id, created_at, form, lang, nombre, email, motivo, proyecto, mensaje, page, country FROM messages ORDER BY id DESC LIMIT ?')
      .bind(limit).all();
    return json({ ok: true, count: results.length, messages: results });
  } catch (err) {
    return json({ ok: false, error: 'query_failed', detail: String(err) }, 500);
  }
}
