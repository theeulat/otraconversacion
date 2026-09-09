import patrocinar from './posts/patrocinar-podcast.mjs';
import economia from './posts/economia-real.mjs';
import temporada from './posts/temporada-dos.mjs';
import preparar from './posts/preparar-podcast.mjs';
import diez from './posts/diez-preguntas.mjs';
import sostener from './posts/sostener.mjs';
import elegir from './posts/elegir-invitados.mjs';

/* Orden de portada del blog: mas reciente primero. */
const POSTS = [patrocinar, economia, temporada, preparar, diez, sostener, elegir]
  .sort((a, b) => b.date.localeCompare(a.date));

export default POSTS;
