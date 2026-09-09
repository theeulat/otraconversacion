/* Genera las imagenes del sitio: AVIF + WebP + JPEG responsive, iconos y tarjetas OG.
   Fuente: media/raw (extraidas del HTML original) y media/yt (miniaturas del canal).
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

/* Imagenes de cabecera de los articulos: fotografia propia, sin bancos de imagenes. */
export const POST_IMAGES = {
  'blog-patrocinio': 'estudio',
  'blog-economia':   'congreso',
  'blog-backstage':  'fuera-estudio',
  'blog-preparar':   'destacado',
  'blog-preguntas':  'estudio',
  'blog-sostener':   'congreso',
  'blog-invitados':  'playlist'
};

const WIDTHS_WIDE = [480, 768, 1200];
const WIDTHS_PORTRAIT = [320, 480, 640];
const Q = { avif: 52, webp: 74, jpeg: 78 };

async function variants(input, name, widths, ratio) {
  const [rw, rh] = ratio.split('/').map(Number);
  const jobs = [];
  for (const w of widths) {
    const h = Math.round((w * rh) / rw);
    const base = sharp(input).resize(w, h, { fit: 'cover', position: 'attention' });
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
    const src = path.join(ROOT, 'media', rel);
    if (!existsSync(src)) { console.warn('  falta', rel); continue; }
    if (name === 'logo') continue;
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

  /* Cabeceras de articulo: alias sobre fotografia propia */
  for (const [alias, source] of Object.entries(POST_IMAGES)) {
    const rel = PHOTOS[source];
    if (!rel) continue;
    const src = path.join(ROOT, 'media', rel);
    if (!existsSync(src)) continue;
    await variants(src, alias, WIDTHS_WIDE, '16/9');
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
