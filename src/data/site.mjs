/* Configuración global del sitio Otra Conversación */

export const SITE = {
  origin: 'https://otraconversacion.com',
  name: 'Otra Conversación',
  handle: '@otraconversacion',
  email: 'jesus@otraconversacion.com',
  host: {
    name: 'Jesús Martínez',
    role: { es: 'Anfitrión y productor', en: 'Host and producer' },
    city: 'Ámsterdam'
  },
  youtube: {
    channel: 'https://www.youtube.com/@otraconversacion',
    channelId: 'UCfKG_6EBeLdz89DB7YTRjRw',
    uploads: 'UUfKG_6EBeLdz89DB7YTRjRw',
    playlist: 'https://www.youtube.com/playlist?list=UUfKG_6EBeLdz89DB7YTRjRw'
  },
  social: {
    instagram: 'https://www.instagram.com/otraconversacion',
    tiktok: 'https://www.tiktok.com/@otraconversacion',
    linkedin: 'https://www.linkedin.com/company/otraconversacion'
  },
  stats: {
    episodes: 24,
    subscribers: '7,2K',
    // Datos verificados desde el canal el 2026-09-09
    views: 59661,
    hours: 27
  },
  // Idiomas: español es la versión canónica en la raíz; inglés cuelga de /en/
  langs: ['es', 'en'],
  defaultLang: 'es'
};

/* Rutas por idioma. La clave es el identificador interno de página. */
export const ROUTES = {
  home:      { es: '/',                en: '/en/' },
  episodes:  { es: '/episodios/',      en: '/en/episodes/' },
  glossary:  { es: '/glosario/',       en: '/en/glossary/' },
  advertise: { es: '/publicita/',      en: '/en/advertise/' },
  guest:     { es: '/se-invitado/',    en: '/en/be-a-guest/' },
  blog:      { es: '/blog/',           en: '/en/blog/' },
  about:     { es: '/sobre/',          en: '/en/about/' },
  contact:   { es: '/contacto/',       en: '/en/contact/' },
  privacy:   { es: '/legal/privacidad/', en: '/en/legal/privacy/' },
  cookies:   { es: '/legal/cookies/',  en: '/en/legal/cookies/' },
  terms:     { es: '/legal/aviso-legal/', en: '/en/legal/terms/' },
  thanks:    { es: '/gracias/',        en: '/en/thanks/' }
};

export const EPISODE_BASE = { es: '/episodios/', en: '/en/episodes/' };
export const POST_BASE    = { es: '/blog/',      en: '/en/blog/' };

export const t = (lang, es, en) => (lang === 'en' ? en : es);
