# Otra Conversación · otraconversacion.com

Sitio del podcast. Generador estático propio en Node, sin dependencias en producción,
alojado en Cloudflare Pages con funciones para el formulario de contacto.

**En vivo:** https://otraconversacion.com
**Correo del proyecto:** jesus@otraconversacion.com

---

## Qué hay publicado

88 páginas indexables, en español (raíz) y en inglés (`/en/`):

| Sección | Español | Inglés |
| --- | --- | --- |
| Portada | `/` | `/en/` |
| Archivo de episodios | `/episodios/` | `/en/episodes/` |
| Ficha por episodio (24) | `/episodios/<slug>/` | `/en/episodes/<slug>/` |
| Temporadas | `/episodios/temporada-1/` y `-2/` | `/en/episodes/season-1/` y `-2/` |
| Blog (7 artículos) | `/blog/` | `/en/blog/` |
| Glosario (25 términos) | `/glosario/` | `/en/glossary/` |
| Publicidad | `/publicita/` | `/en/advertise/` |
| Sé invitado | `/se-invitado/` | `/en/be-a-guest/` |
| Sobre el podcast | `/sobre/` | `/en/about/` |
| Contacto | `/contacto/` | `/en/contact/` |
| Legales | `/legal/…` | `/en/legal/…` |

Además: `sitemap.xml`, `robots.txt`, `feed/podcast.xml`, `feed/blog.xml`, `site.webmanifest`.

---

## Comandos

```bash
npm install          # solo la primera vez (sharp, para las imágenes)
npm run build        # genera dist/ completo, imágenes incluidas
npm run dev          # servidor local en http://localhost:8788 con las funciones
npm run deploy       # build + despliegue a producción
```

Aviso a buscadores compatibles con IndexNow (Bing, Yandex) después de un cambio grande:

```bash
node tools/indexnow.mjs
```

---

## Dónde se edita el contenido

Todo el texto vive en `src/data/`. No hay que tocar HTML.

- **`site.mjs`** — dominio, correo, redes, cifras del podcast y tabla de rutas.
- **`episodes.mjs`** — ficha editorial de cada episodio: título, slug, invitado, resumen,
  entradilla y los cuatro puntos de «de qué se habla», en español y en inglés.
- **`youtube.json`** — datos técnicos sacados del canal: id de vídeo, fecha, duración,
  visitas y los párrafos reales de la descripción de YouTube.
- **`glossary.mjs`** — términos del glosario.
- **`posts/*.mjs`** — un archivo por artículo del blog; `posts.mjs` es el índice.

### Añadir un episodio nuevo

1. Añade su bloque al principio de `src/data/episodes.mjs` (copia el de arriba y cambia los campos).
2. Añade su entrada a `src/data/youtube.json` con el id del vídeo, la fecha `AAAA-MM-DD`,
   la duración en segundos y las visitas.
3. Guarda la miniatura en `media/yt/<videoId>.jpg` (sirve la `maxresdefault.jpg` de YouTube).
4. `npm run deploy`.

El sitemap, el RSS, la portada, el archivo, los enlaces anterior/siguiente y los datos
estructurados se regeneran solos.

---

## Backend

Funciones de Cloudflare Pages en `functions/`:

- **`api/contact.js`** — recibe los dos formularios. Valida, descarta robots con un campo
  trampa, limita a 5 envíos por IP y hora, guarda en D1 y, si hay clave de correo, avisa por email.
- **`api/messages.js`** — lectura de los mensajes guardados, protegida por `ADMIN_TOKEN`.
- **`_middleware.js`** — redirige `www` y `pages.dev` al dominio principal y sirve el archivo
  de verificación de Google.

### Recursos creados en Cloudflare

| Recurso | Nombre | Uso |
| --- | --- | --- |
| Pages | `otraconversacion` | el sitio |
| D1 | `otraconversacion` | tabla `messages` |
| KV | `RATE_LIMIT` | límite de envíos por IP |

Secretos ya configurados: `ADMIN_TOKEN` (guardado en `.admin-token.txt`, no lo subas a ningún
sitio) y `SALT` (para anonimizar las IP).

### Leer los mensajes recibidos

```bash
npx wrangler d1 execute otraconversacion --remote --command "SELECT created_at, form, nombre, email, mensaje FROM messages ORDER BY id DESC LIMIT 20"
```

O desde el navegador, con el token que hay en `.admin-token.txt`:
`https://otraconversacion.com/api/messages?token=EL_TOKEN`

### Pendiente opcional: aviso por correo

Ahora mismo los mensajes **se guardan siempre**, pero no llega un email cuando alguien escribe.
Para activarlo hacen falta dos minutos: crea una cuenta en resend.com, verifica el dominio y ejecuta

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name otraconversacion
```

A partir de ese momento cada envío llega a jesus@otraconversacion.com con el remitente en
«responder a». No hay que tocar código.

---

## SEO

- Una URL real por página, sin almohadillas. Los enlaces antiguos del tipo `#/episodios`
  se redirigen solos desde el navegador.
- `hreflang` recíproco entre español e inglés en cada página y en el sitemap.
- Datos estructurados por página: `PodcastSeries`, `PodcastEpisode` con `VideoObject`,
  `BlogPosting`, `FAQPage`, `DefinedTermSet`, `BreadcrumbList`, `Organization` y `Person`.
- Imágenes en AVIF, WebP y JPEG con tres anchos y `sizes` por contexto.
- YouTube no carga nada hasta que se pulsa reproducir: sin cookies de terceros al entrar.
- Google Search Console: propiedad `https://otraconversacion.com/` verificada por archivo HTML,
  sitemap enviado y aceptado.
- IndexNow configurado con la clave `afac5a7c024db5190c6f7bf6f91b261e`.

---

## Estructura

```
build.mjs              generador: recorre los datos y escribe dist/
tools/images.mjs       pipeline de imágenes (sharp)
tools/indexnow.mjs     aviso a buscadores
src/data/              todo el contenido
src/lib/render.mjs     plantilla base, cabecera, pie, esquemas
src/pages/             una función por tipo de página
src/assets/            CSS y JS del sitio
functions/             backend de Cloudflare Pages
media/raw, media/yt    fotografía original y miniaturas del canal
public/                se copia tal cual a dist/ (_headers, _redirects, IndexNow)
legacy/                el HTML de una sola página del que partió todo
```
