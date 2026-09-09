/* Genera las imagenes del sitio: AVIF + WebP + JPEG responsive, iconos y tarjetas OG.
   Fuentes:
     media/raw   fotografia propia extraida del documento original
     media/yt    miniaturas del canal de YouTube
     media/stock fotografia libre de Unsplash para las cabeceras del blog
   Salida: dist/img  */

import sharp from 'sharp';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'dist', 'img');

/* Fotografia propia extraida del documento original. */
export const PHOTOS = {
  logo:            'raw/56dc03dbec.png',
  host:            'raw/d443e47388.jpg',   // 900x1200 retrato del anfitrion
  destacado:       'raw/7617ca1ce1.jpg',   // 1200x675
  playlist:        'raw/21590d0b5d.jpg',   // 1100x619
  estudio:         'raw/6afb5c86a6.jpg',   // 900x600
  congreso:        'raw/0b07bfc9f4.jpg',   // 760x507
  'fuera-estudio': 'raw/44d82b02f7.jpg'    // 760x507
};

/* Cabecera de cada articulo. Una foto distinta por articulo, de Unsplash.
   Los creditos y los enlaces originales estan en media/stock/CREDITS.md */
export const POST_IMAGES = {
  'blog-patrocinio': 'stock/blog-patrocinio.jpg',
  'blog-economia':   'stock/blog-economia.jpg',
  'blog-backstage':  'stock/blog-backstage.jpg',
  'blog-preparar':   'stock/blog-preparar.jpg',
  'blog-preguntas':  'stock/blog-preguntas.jpg',
  'blog-sostener':   'stock/blog-sostener.jpg',
  'blog-invitados':  'stock/blog-invitados.jpg'
};

const WIDTHS_WIDE = [480, 768, 1200];
const WIDTHS_PORTRAIT = [320, 480, 640];
const Q = { avif: 52, webp: 74, jpeg: 78 };

/* Las fotos de archivo llegan muy saturadas para una interfaz oscura.
   Bajarles el color y el brillo las hace convivir con la fotografia propia. */
const CALM = { saturation: 0.72, brightness: 0.94 };

async function variants(input, name, widths, ratio, { calm = false } = {}) {
  const [rw, rh] = ratio.split('/').map(Number);
  const jobs = [];
  for (const w of widths) {
    const h = Math.round((w * rh) / rw);
    let base = sharp(input).resize(w, h, { fit: 'cover', position: 'attention' });
    if (calm) base = base.modulate(CALM);
    jobs.push(base.clone().avif({ quality: Q.avif, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.avif`)));
    jobs.push(base.clone().webp({ quality: Q.webp }).toFile(path.join(OUT, `${name}-${w}.webp`)));
    jobs.push(base.clone().jpeg({ quality: Q.jpeg, mozjpeg: true }).toFile(path.join(OUT, `${name}-${w}.jpg`)));
  }
  await Promise.all(jobs);
}

/* Tarjeta social 1200x630 a partir de una imagen, oscurecida para que el logo respire. */
async function ogCard(input, name) {
  await sharp(input)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.88 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, `${name}.jpg`));
}

/* ICO minimo que envuelve un PNG (valido en todos los navegadores actuales). */
function icoFromPng(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
  const dir = Buffer.alloc(16);
  dir.writeUInt8(size === 256 ? 0 : size, 0);
  dir.writeUInt8(size === 256 ? 0 : size, 1);
  dir.writeUInt8(0, 2); dir.writeUInt8(0, 3);
  dir.writeUInt16LE(1, 4); dir.writeUInt16LE(32, 6);
  dir.writeUInt32LE(png.length, 8); dir.writeUInt32LE(22, 12);
  return Buffer.concat([header, dir, png]);
}

export default async function buildImages(episodes) {
  await mkdir(OUT, { recursive: true });

  /* Fotografia general */
  for (const [name, rel] of Object.entries(PHOTOS)) {
    if (name === 'logo') continue;
    const src = path.join(ROOT, 'media', rel);
    if (!existsSync(src)) { console.warn('  falta', rel); continue; }
    const portrait = name === 'host';
    await variants(src, name, portrait ? WIDTHS_PORTRAIT : WIDTHS_WIDE, portrait ? '3/4' : '16/9');
  }

  /* Miniaturas de episodio, desde el canal (1280x720) */
  for (const ep of episodes) {
    const src = path.join(ROOT, 'media', 'yt', `${ep.videoId}.jpg`);
    if (!existsSync(src)) { console.warn('  falta miniatura EP', ep.n); continue; }
    await variants(src, `ep-${ep.n}`, [480, 768, 1200], '16/9');
    await ogCard(src, `og-ep-${ep.n}`);
  }

  /* Cabeceras de articulo */
  for (const [alias, rel] of Object.entries(POST_IMAGES)) {
    const src = path.join(ROOT, 'media', rel);
    if (!existsSync(src)) { console.warn('  falta foto de articulo', rel); continue; }
    await variants(src, alias, WIDTHS_WIDE, '16/9', { calm: true });
    await ogCard(src, `og-${alias}`);
  }

  /* Tarjeta social por defecto */
  await ogCard(path.join(ROOT, 'media', PHOTOS.destacado), 'og-default');
  await ogCard(path.join(ROOT, 'media', PHOTOS.host), 'og-host');

  /* Iconos */
  const logoSrc = path.join(ROOT, 'media', PHOTOS.logo);
  for (const s of [512, 192, 180, 72, 48]) {
    await sharp(logoSrc).resize(s, s, { fit: 'cover' }).png({ compressionLevel: 9 })
      .toFile(path.join(OUT, `logo-${s}.png`));
  }
  const png48 = await readFile(path.join(OUT, 'logo-48.png'));
  await writeFile(path.join(ROOT, 'dist', 'favicon.ico'), icoFromPng(png48, 48));

  console.log('  imagenes generadas en dist/img');
}
