/**
 * Canonicaliza el dominio: todo el trafico vive en https://otraconversacion.com
 * Evita que Google indexe la misma pagina en dos hosts distintos.
 *
 * Ademas sirve los archivos de verificacion de propiedad en su ruta exacta.
 * Pages redirige por su cuenta las URL terminadas en .html, y los verificadores
 * de Google y Bing esperan una respuesta 200 sin saltos.
 */

const CANONICAL = 'otraconversacion.com';
const ALIASES = new Set(['www.otraconversacion.com', 'otraconversacion.pages.dev']);

/* ruta exacta -> contenido en texto plano */
const VERIFICATION = {
  '/googlefaa171d799f545bb.html': 'google-site-verification: googlefaa171d799f545bb.html'
};

export async function onRequest({ request, next }) {
  const url = new URL(request.url);

  if (ALIASES.has(url.hostname)) {
    url.hostname = CANONICAL;
    url.protocol = 'https:';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }

  const proof = VERIFICATION[url.pathname];
  if (proof) {
    return new Response(proof, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }

  return next();
}
