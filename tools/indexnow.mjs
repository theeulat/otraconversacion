/* Avisa a Bing, Yandex y demas buscadores compatibles con IndexNow de que
   el sitio ha cambiado. Google no usa IndexNow: alli mandan sitemap y enlaces. */

import { readFile } from 'node:fs/promises';

const KEY = 'afac5a7c024db5190c6f7bf6f91b261e';
const HOST = 'otraconversacion.com';

const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls })
});

console.log('IndexNow:', res.status, res.statusText, '·', urls.length, 'URLs enviadas');
