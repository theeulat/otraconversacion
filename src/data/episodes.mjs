/* Fichas editoriales de cada episodio.
   Los datos tecnicos (videoId, fecha, duracion, visitas) viven en youtube.json,
   extraidos del canal real. Aqui solo esta la parte editorial, en ES y EN. */

const EPISODES = [
{
  n: 24, season: 2,
  slug: { es: 'espana-dictadura-feroz-mazaly-aguilar', en: 'spain-politics-freedom-mazaly-aguilar' },
  title: { es: 'España cada vez vive en una dictadura más feroz', en: 'Spain is living under an ever harsher dictatorship' },
  guest: { name: 'Mazaly Aguilar', role: { es: 'Economista y ex eurodiputada', en: 'Economist and former MEP' } },
  topic: { es: 'Sociedad', en: 'Society' },
  summary: {
    es: 'Mazaly Aguilar, economista y ex eurodiputada, habla de política, libertad y el rumbo de España: de Bruselas al campo, sin guion y sin filtro.',
    en: 'Economist and former MEP Mazaly Aguilar on politics, freedom and where Spain is heading, from Brussels to the countryside.'
  },
  lede: {
    es: 'Una hora larga con alguien que ha visto el poder desde dentro de la banca, de la universidad y del Parlamento Europeo. Hablamos de instituciones, de agricultura, de fondos europeos y de por qué cree que España se ha vuelto un país más pequeño de lo que era.',
    en: 'An hour with someone who has seen power from inside banking, academia and the European Parliament. We talk institutions, farming, EU funds and why she believes Spain has become a smaller country than it was.'
  },
  points: {
    es: ['Cómo se toman de verdad las decisiones en el Parlamento Europeo', 'Por qué el campo español lleva una década avisando', 'Competencia desleal, Mercosur y fondos europeos explicados sin jerga', 'Qué significa la crisis institucional para quien tiene una empresa'],
    en: ['How decisions actually get made in the European Parliament', 'Why Spanish farmers have been sounding the alarm for a decade', 'Unfair competition, Mercosur and EU funds without the jargon', 'What the institutional crisis means for anyone running a business']
  }
},
{
  n: 23, season: 2,
  slug: { es: 'fichajes-clausulas-fifa-derecho-deportivo-jose-redondo', en: 'football-transfers-clauses-fifa-law-jose-redondo' },
  title: { es: 'Fichajes, cláusulas y FIFA: el lado legal del fútbol', en: 'Transfers, clauses and FIFA: football’s legal side' },
  guest: { name: 'José Redondo', role: { es: 'Abogado especializado en derecho deportivo', en: 'Sports lawyer' } },
  topic: { es: 'Deporte por dentro', en: 'Sport inside out' },
  summary: {
    es: 'El lado del fútbol que no se ve: contratos, cláusulas de rescisión, comisiones de agentes y el reglamento FIFA, explicados por un abogado deportivo.',
    en: 'The side of football nobody sees: contracts, release clauses, agent fees and FIFA regulation, explained by a sports lawyer.'
  },
  lede: {
    es: 'Detrás de cada fichaje hay un contrato de sesenta páginas que nadie enseña. José Redondo explica cómo se redacta, quién cobra qué y por qué la letra pequeña decide más partidos que el vestuario.',
    en: 'Behind every transfer there is a sixty-page contract nobody shows you. José Redondo explains how it is drafted, who gets paid what, and why the small print decides more games than the dressing room.'
  },
  points: {
    es: ['Qué es realmente una cláusula de rescisión y quién la paga', 'Cómo se estructura la comisión de un agente FIFA', 'Traspasos de menores y por qué la regulación es tan polémica', 'Qué pasa cuando un club no paga: la vía FIFA y la vía ordinaria'],
    en: ['What a release clause really is and who actually pays it', 'How a FIFA agent’s commission is structured', 'Transfers of minors and why the rules are so contested', 'What happens when a club does not pay: the FIFA route and the courts']
  }
},
{
  n: 22, season: 2,
  slug: { es: 'auriculares-danan-oido-proteger-audicion-ignacio-alcala', en: 'are-headphones-bad-for-your-hearing-ignacio-alcala' },
  title: { es: '¿Usar auriculares es malo? Cómo evitar dañar tu oído', en: 'Are headphones bad for you? How to protect your hearing' },
  guest: { name: 'Dr. Ignacio Alcalá', role: { es: 'Médico especialista del oído', en: 'Ear specialist' } },
  topic: { es: 'Ciencia y salud', en: 'Science and health' },
  summary: {
    es: 'Un médico del oído explica qué le haces a tu audición cada día con los auriculares, qué daño es reversible y cuál no, y cómo protegerte sin dejar de escuchar.',
    en: 'An ear doctor explains what you do to your hearing every day with headphones, what damage is reversible and what is not, and how to protect it.'
  },
  lede: {
    es: 'La pérdida de audición no avisa: cuando la notas, ya llevas años perdiéndola. Hablamos de decibelios, de tapones, de acúfenos y de los hábitos concretos que marcan la diferencia entre oír bien a los sesenta o no.',
    en: 'Hearing loss gives no warning: by the time you notice it, you have been losing it for years. We talk decibels, earplugs, tinnitus and the specific habits that decide whether you hear well at sixty.'
  },
  points: {
    es: ['Cuántos decibelios y cuántas horas son realmente seguros', 'Por qué el daño auditivo por ruido no se recupera', 'Acúfenos: qué son, por qué aparecen y qué hacer', 'Cómo quitarse unos tapones sin hacerse daño'],
    en: ['How many decibels and how many hours are actually safe', 'Why noise-induced hearing damage does not come back', 'Tinnitus: what it is, why it appears and what to do', 'How to remove earplugs without hurting yourself']
  }
},
{
  n: 21, season: 2,
  slug: { es: 'verdad-realidad-virtual-metaverso-alejandro-velasco', en: 'truth-about-virtual-reality-metaverse-alejandro-velasco' },
  title: { es: 'La verdad sobre la realidad virtual y el metaverso', en: 'The truth about virtual reality and the metaverse' },
  guest: { name: 'Alejandro Velasco', role: { es: 'Especialista en realidad virtual y mixta', en: 'Virtual and mixed reality specialist' } },
  topic: { es: 'Tecnología', en: 'Technology' },
  summary: {
    es: 'Qué hay de real detrás del metaverso: usos que ya funcionan en cirugía, rehabilitación y educación, y el ruido que no lleva a ninguna parte.',
    en: 'What is actually real behind the metaverse: uses already working in surgery, rehab and education, and the hype that leads nowhere.'
  },
  lede: {
    es: 'El metaverso se vendió como el futuro y se enterró como una moda. Ninguna de las dos cosas es verdad. Repasamos dónde la realidad virtual y mixta ya está resolviendo problemas caros y dónde sigue siendo una demo bonita.',
    en: 'The metaverse was sold as the future and buried as a fad. Neither is true. We map where virtual and mixed reality already solve expensive problems, and where it is still a pretty demo.'
  },
  points: {
    es: ['Realidad virtual en neuro-rehabilitación: qué resultados hay', 'Realidad mixta en quirófano y en formación técnica', 'Por qué el hardware sigue siendo el cuello de botella', 'Qué diferencia hay entre metaverso, RV, RA y RM'],
    en: ['VR in neuro-rehabilitation: what the results actually show', 'Mixed reality in the operating theatre and in technical training', 'Why hardware is still the bottleneck', 'The difference between metaverse, VR, AR and MR']
  }
},
{
  n: 20, season: 2,
  slug: { es: 'psiquiatra-explica-mente-diagnostico-estigma-jose-perez', en: 'psychiatrist-explains-mind-diagnosis-stigma-jose-perez' },
  title: { es: '¿Tu mente es realmente tuya? Un psiquiatra lo explica', en: 'Is your mind really yours? A psychiatrist explains' },
  guest: { name: 'Dr. José Pérez', role: { es: 'Psiquiatra', en: 'Psychiatrist' } },
  topic: { es: 'Ciencia y mente', en: 'Science and mind' },
  summary: {
    es: 'La psiquiatría contada desde dentro: cómo se diagnostica de verdad, qué hacen los fármacos, dónde empieza el estigma y qué no puede hacer un psiquiatra.',
    en: 'Psychiatry from the inside: how diagnosis really works, what the drugs do, where stigma starts and what a psychiatrist cannot do.'
  },
  lede: {
    es: 'Todo el mundo opina de salud mental y casi nadie ha visto una consulta por dentro. Una conversación sobre diagnóstico, medicación, límites de la profesión y la distancia enorme entre lo que se dice en redes y lo que pasa en la sala.',
    en: 'Everyone has an opinion on mental health and almost nobody has seen a consultation from the inside. A conversation about diagnosis, medication, the limits of the profession and the gap between social media and the room.'
  },
  points: {
    es: ['Cómo se llega realmente a un diagnóstico psiquiátrico', 'Qué hacen y qué no hacen los psicofármacos', 'Estigma: por qué sigue costando pedir ayuda', 'Cuándo un problema es psiquiátrico y cuándo es de la vida'],
    en: ['How a psychiatric diagnosis is actually reached', 'What psychiatric medication does and does not do', 'Stigma: why asking for help is still hard', 'When a problem is psychiatric and when it is just life']
  }
},
{
  n: 19, season: 2,
  slug: { es: 'es-logico-creer-en-dios-cristianismo-miguel-palomo', en: 'is-it-logical-to-believe-in-god-miguel-palomo' },
  title: { es: '¿Es lógico creer en Dios? ¿Por qué el cristianismo?', en: 'Is it logical to believe in God? Why Christianity?' },
  guest: { name: 'Miguel Palomo', role: { es: 'Divulgador y apologista', en: 'Writer and apologist' } },
  topic: { es: 'El camino', en: 'The path' },
  summary: {
    es: 'Fe y razón en la misma mesa: los argumentos clásicos, las objeciones honestas y qué significa creer en el siglo XXI sin apagar el pensamiento crítico.',
    en: 'Faith and reason at the same table: the classic arguments, the honest objections and what believing in the 21st century actually means.'
  },
  lede: {
    es: 'Una conversación larga y tranquila sobre la pregunta que casi nadie se atreve a hacer en público. Sin proselitismo y sin burla: argumentos, contraargumentos y las dudas que se quedan encima de la mesa.',
    en: 'A long, calm conversation about the question almost nobody dares ask in public. No preaching and no mockery: arguments, counter-arguments and the doubts left on the table.'
  },
  points: {
    es: ['Los argumentos clásicos a favor y sus puntos débiles', 'Por qué el cristianismo y no otra tradición', 'Ciencia y fe: dónde chocan de verdad y dónde no', 'Qué responde un creyente al problema del mal'],
    en: ['The classic arguments for God and where they are weakest', 'Why Christianity rather than another tradition', 'Science and faith: where they actually clash and where they do not', 'How a believer answers the problem of evil']
  }
},
{
  n: 18, season: 2,
  slug: { es: 'como-piensa-un-emprendedor-de-verdad-jesus-alonso-gallo', en: 'how-a-real-entrepreneur-thinks-jesus-alonso-gallo' },
  title: { es: 'Cómo piensa un emprendedor de verdad', en: 'How a real entrepreneur thinks' },
  guest: { name: 'Jesús Alonso Gallo', role: { es: 'Empresario', en: 'Entrepreneur' } },
  topic: { es: 'Emprendimiento', en: 'Entrepreneurship' },
  summary: {
    es: 'Decisiones, errores y método: cómo se forma de verdad una mentalidad emprendedora, contado por alguien que lleva años construyendo sin highlight reel.',
    en: 'Decisions, mistakes and method: how an entrepreneurial mindset is actually built, told by someone who has been at it for years without the highlight reel.'
  },
  lede: {
    es: 'La mayoría de la gente nunca entiende cómo piensa un emprendedor porque solo ve el resultado. Aquí se ve el proceso: el entorno familiar, los primeros negocios, el riesgo calculado y las decisiones que se toman con miedo.',
    en: 'Most people never understand how an entrepreneur thinks because they only see the outcome. Here you see the process: the family environment, the first businesses, calculated risk and the decisions taken while afraid.'
  },
  points: {
    es: ['De dónde sale la obsesión temprana por el dinero y los negocios', 'Cómo se calcula el riesgo cuando no tienes colchón', 'Los errores caros que se repiten en todos los negocios pequeños', 'Qué separa a quien construye de quien solo empieza'],
    en: ['Where an early obsession with money and business comes from', 'How you calculate risk when you have no cushion', 'The expensive mistakes every small business repeats', 'What separates people who build from people who only start']
  }
},
{
  n: 17, season: 2,
  slug: { es: 'como-piensa-un-peleador-de-mma-henry-escalona', en: 'how-an-mma-fighter-thinks-henry-escalona' },
  title: { es: 'Cómo piensa un peleador de MMA: preparación y gloria', en: 'How an MMA fighter thinks: preparation and glory' },
  guest: { name: 'Henry Escalona', role: { es: 'Peleador profesional de MMA', en: 'Professional MMA fighter' } },
  topic: { es: 'Deporte por dentro', en: 'Sport inside out' },
  summary: {
    es: 'La preparación, el miedo y la gloria de subirse a la jaula: cómo se entrena, cómo se corta peso y qué pasa por la cabeza en los diez segundos previos.',
    en: 'The preparation, the fear and the glory of stepping into the cage: how you train, how you cut weight and what goes through your head in the last ten seconds.'
  },
  lede: {
    es: 'Un combate dura minutos; la preparación dura meses. Hablamos del entrenamiento real, del corte de peso, de las lesiones, del dinero que se gana de verdad y del miedo, que no se quita nunca, solo se administra.',
    en: 'A fight lasts minutes; the preparation lasts months. We talk real training, weight cuts, injuries, the money that actually comes in, and fear, which never goes away, you only manage it.'
  },
  points: {
    es: ['Cómo es una semana de campamento antes de un combate', 'El corte de peso: qué se hace y qué cuesta', 'Cuánto gana realmente un peleador que no es estrella', 'Qué se piensa en los diez segundos antes de que suene'],
    en: ['What a camp week looks like before a fight', 'The weight cut: what it involves and what it costs', 'What a non-star fighter actually earns', 'What goes through your mind in the last ten seconds']
  }
},
{
  n: 16, season: 2,
  slug: { es: 'que-pasa-cuando-alguien-muere-tanatopraxia-anwar-el-amrani', en: 'what-happens-when-someone-dies-mortuary-science-anwar-el-amrani' },
  title: { es: 'Qué pasa cuando alguien muere: la tanatopraxia explicada', en: 'What happens when someone dies: mortuary science explained' },
  guest: { name: 'Anwar El Amrani', role: { es: 'Tanatopractor', en: 'Mortuary scientist' } },
  topic: { es: 'Oficios reales', en: 'Real professions' },
  summary: {
    es: 'Un oficio del que nadie habla, contado sin tabús: qué ocurre con un cuerpo, cómo se trabaja con las familias y cómo se sostiene emocionalmente ese trabajo.',
    en: 'A profession nobody talks about, explained without taboos: what happens to a body, how you work with families and how you carry the emotional weight.'
  },
  lede: {
    es: 'Todos vamos a pasar por ahí y casi nadie sabe qué ocurre exactamente. Anwar cuenta el procedimiento, el trato con las familias en el peor día de su vida y lo que este oficio hace con quien lo ejerce.',
    en: 'We all end up there and almost nobody knows what actually happens. Anwar walks through the procedure, dealing with families on the worst day of their lives, and what the job does to the person doing it.'
  },
  points: {
    es: ['Qué es exactamente la tanatopraxia y para qué sirve', 'Cómo se prepara un cuerpo, paso a paso', 'Cómo se habla con una familia que acaba de perder a alguien', 'El coste emocional del oficio y cómo se gestiona'],
    en: ['What mortuary science actually is and what it is for', 'How a body is prepared, step by step', 'How you speak to a family that has just lost someone', 'The emotional cost of the job and how it is managed']
  }
},
{
  n: 15, season: 2,
  slug: { es: 'como-piensa-un-reclutador-cv-entrevistas-salario-maria-alvarez', en: 'how-a-recruiter-thinks-cv-interviews-salary-maria-alvarez' },
  title: { es: 'Cómo piensa un reclutador: CV, entrevistas y salario', en: 'How a recruiter thinks: CVs, interviews and salary' },
  guest: { name: 'María Álvarez', role: { es: 'Reclutadora y selección de talento', en: 'Recruiter' } },
  topic: { es: 'Trabajo y carrera', en: 'Work and career' },
  summary: {
    es: 'Lo que de verdad mira un reclutador en tu CV, cómo se decide en una entrevista y cómo se negocia el salario sin quemar la oferta.',
    en: 'What a recruiter actually looks at in your CV, how the decision is made in an interview, and how to negotiate salary without burning the offer.'
  },
  lede: {
    es: 'Hay mil consejos de LinkedIn y muy poca gente que cuente qué pasa al otro lado de la mesa. María explica los segundos que dura una primera criba, las preguntas que de verdad puntúan y el momento exacto para hablar de dinero.',
    en: 'There is endless LinkedIn advice and very few people telling you what happens on the other side of the table. María explains how long a first screen really lasts, which questions actually count and the exact moment to talk money.'
  },
  points: {
    es: ['Cuántos segundos mira un reclutador tu CV y qué busca', 'Las banderas rojas que descartan sin que te enteres', 'Cómo responder a la pregunta de expectativas salariales', 'Qué hacer cuando llevas meses sin respuesta'],
    en: ['How many seconds a recruiter spends on your CV and what they look for', 'The red flags that rule you out without you knowing', 'How to answer the salary expectations question', 'What to do when you have had months of silence']
  }
},
{
  n: 14, season: 1,
  slug: { es: 'alcohol-jovenes-neuromitos-psicobiologia-luis-garcia', en: 'alcohol-in-young-people-neuromyths-psychobiology-luis-garcia' },
  title: { es: 'Alcohol en jóvenes, neuromitos y psicobiología', en: 'Alcohol in young people, neuromyths and psychobiology' },
  guest: { name: 'Luis García', role: { es: 'Psicobiólogo', en: 'Psychobiologist' } },
  topic: { es: 'Ciencia y mente', en: 'Science and mind' },
  summary: {
    es: 'Psicobiología aplicada: qué le hace el alcohol al cerebro joven, qué neuromitos siguen circulando y qué dice de verdad la evidencia.',
    en: 'Applied psychobiology: what alcohol does to the young brain, which neuromyths keep circulating and what the evidence actually says.'
  },
  lede: {
    es: 'La mitad de lo que se repite sobre el cerebro es falso y se enseña igual. Hablamos de alcohol en la adolescencia, de plasticidad, de los mitos que sobreviven en las aulas y de cómo distinguir divulgación de humo.',
    en: 'Half of what gets repeated about the brain is false and taught anyway. We talk teenage drinking, plasticity, the myths that survive in classrooms and how to tell science communication from noise.'
  },
  points: {
    es: ['Qué le hace el alcohol a un cerebro que aún se está formando', 'Los neuromitos más extendidos y por qué no mueren', 'Qué es la psicobiología y para qué sirve', 'Cómo leer un titular científico sin tragárselo entero'],
    en: ['What alcohol does to a brain that is still developing', 'The most widespread neuromyths and why they will not die', 'What psychobiology is and what it is for', 'How to read a science headline without swallowing it whole']
  }
},
{
  n: 13, season: 1,
  slug: { es: 'que-es-la-arqueologia-sociedades-antiguas-carlos-velasco', en: 'what-is-archaeology-ancient-societies-carlos-velasco' },
  title: { es: '¿Qué es la arqueología? Sociedades antiguas y hallazgos', en: 'What is archaeology? Ancient societies and discoveries' },
  guest: { name: 'Carlos Velasco', role: { es: 'Arqueólogo', en: 'Archaeologist' } },
  topic: { es: 'Cultura', en: 'Culture' },
  summary: {
    es: 'Sociedades antiguas y hallazgos que reescriben la historia, contados por un arqueólogo: cómo se excava, cómo se data y qué se sabe de verdad.',
    en: 'Ancient societies and finds that rewrite history, told by an archaeologist: how you dig, how you date and what is actually known.'
  },
  lede: {
    es: 'El episodio más largo del archivo, y con razón. Un recorrido por cómo trabaja de verdad la arqueología, lejos de Indiana Jones: permisos, brochas, laboratorio, datación y la paciencia que exige reconstruir un mundo entero.',
    en: 'The longest episode in the archive, and for good reason. A tour of how archaeology actually works, far from Indiana Jones: permits, brushes, labs, dating and the patience it takes to rebuild a whole world.'
  },
  points: {
    es: ['Cómo se decide dónde excavar y quién lo autoriza', 'Métodos de datación explicados sin tecnicismos', 'Los hallazgos que han cambiado lo que creíamos saber', 'Qué se pierde cuando se saquea un yacimiento'],
    en: ['How you decide where to dig and who authorises it', 'Dating methods explained without the jargon', 'The finds that changed what we thought we knew', 'What is lost when a site is looted']
  }
},
{
  n: 12, season: 1,
  slug: { es: 'retos-del-periodismo-inmediatez-veracidad-isabel-ojeda', en: 'challenges-facing-journalism-speed-vs-truth-isabel-ojeda' },
  title: { es: 'Qué retos enfrenta el periodismo: inmediatez vs veracidad', en: 'The challenges facing journalism: speed vs truth' },
  guest: { name: 'Isabel Ojeda', role: { es: 'Periodista', en: 'Journalist' } },
  topic: { es: 'Sociedad', en: 'Society' },
  summary: {
    es: 'El pulso del oficio: llegar el primero o llegar con la verdad. Cómo se decide qué se publica y qué presiones existen en una redacción.',
    en: 'The pulse of the trade: getting there first or getting there right. How publishing decisions are made and what pressures exist in a newsroom.'
  },
  lede: {
    es: 'Una redacción vive con dos relojes: el del cierre y el de la verificación. Isabel cuenta cómo se resuelve ese conflicto todos los días, qué se cae de la portada y quién decide de verdad la agenda.',
    en: 'A newsroom lives with two clocks: deadline and verification. Isabel explains how that conflict is resolved every day, what gets cut from the front page and who really sets the agenda.'
  },
  points: {
    es: ['Cómo se verifica una noticia con quince minutos de margen', 'Quién marca la agenda de un medio y con qué criterios', 'El efecto del clic en lo que se publica', 'Qué puede hacer un lector para no comerse un bulo'],
    en: ['How you verify a story with fifteen minutes to spare', 'Who sets a newsroom’s agenda and on what criteria', 'What the click economy does to what gets published', 'What a reader can do to avoid swallowing a hoax']
  }
},
{
  n: 11, season: 1,
  slug: { es: 'de-fifa-al-waterpolo-gestion-de-ligas-ignacio-mochales', en: 'from-fifa-to-water-polo-running-a-league-ignacio-mochales' },
  title: { es: 'De FIFA al waterpolo: gestión y visibilidad de ligas', en: 'From FIFA to water polo: running and selling a league' },
  guest: { name: 'Ignacio Mochales', role: { es: 'Gestor deportivo', en: 'Sports executive' } },
  topic: { es: 'Deporte por dentro', en: 'Sport inside out' },
  summary: {
    es: 'Cómo se gestiona y se hace visible una liga, del fútbol al waterpolo: patrocinios, derechos, audiencia y la economía real de un deporte minoritario.',
    en: 'How a league is managed and made visible, from football to water polo: sponsorship, rights, audience and the real economics of a minority sport.'
  },
  lede: {
    es: 'Un deporte no crece solo porque sea bueno: crece si alguien lo gestiona. Hablamos de patrocinios, derechos audiovisuales, calendarios y de por qué unos deportes salen en televisión y otros, con más nivel, no.',
    en: 'A sport does not grow because it is good: it grows if somebody runs it. We talk sponsorship, broadcast rights, calendars, and why some sports get on television and others, with more quality, do not.'
  },
  points: {
    es: ['Cómo se vende una liga a un patrocinador', 'Qué valen realmente los derechos audiovisuales de un deporte pequeño', 'El salto de trabajar en el fútbol a gestionar otro deporte', 'Qué hace falta para que un deporte minoritario sea sostenible'],
    en: ['How you sell a league to a sponsor', 'What broadcast rights for a small sport are actually worth', 'Moving from football to running another sport', 'What it takes to make a minority sport sustainable']
  }
},
{
  n: 10, season: 1,
  slug: { es: 'mercado-de-fichajes-agente-fifa-aleix-pique', en: 'transfer-market-fifa-agent-aleix-pique' },
  title: { es: 'Mercado de fichajes: el fútbol contado por un agente FIFA', en: 'The transfer market and football from the inside' },
  guest: { name: 'Aleix Piqué', role: { es: 'Agente FIFA', en: 'FIFA agent' } },
  topic: { es: 'Deporte por dentro', en: 'Sport inside out' },
  summary: {
    es: 'El mercado de fichajes contado por un agente FIFA: cómo se llega sin contactos, cómo se negocia un traspaso y qué se juega un jugador joven.',
    en: 'The transfer market explained by a FIFA agent: getting in without contacts, negotiating a transfer and what is at stake for a young player.'
  },
  lede: {
    es: 'De empezar sin contactos ni padrinos a negociar traspasos como el de Marc Cucurella. Aleix cuenta cómo se vive el mercado desde dentro: las llamadas de madrugada, la presión de las familias y las decisiones que marcan una carrera.',
    en: 'From starting with no contacts to negotiating transfers like Marc Cucurella’s. Aleix explains what the market looks like from inside: the late-night calls, the pressure from families and the decisions that make a career.'
  },
  points: {
    es: ['Cómo se convierte alguien en agente FIFA de verdad', 'Qué pasa en las últimas horas de un mercado', 'Acompañar a un jugador joven hasta la élite sin quemarlo', 'Los errores que arruinan la carrera de un futbolista'],
    en: ['How someone actually becomes a FIFA agent', 'What happens in the final hours of a transfer window', 'Taking a young player to the top without burning him out', 'The mistakes that ruin a footballer’s career']
  }
},
{
  n: 9, season: 1,
  slug: { es: 'como-funciona-la-inteligencia-y-la-defensa-sara-dominguez', en: 'how-intelligence-and-defence-work-sara-dominguez' },
  title: { es: '¿Cómo funciona la inteligencia y la defensa?', en: 'How do intelligence and defence actually work?' },
  guest: { name: 'Sara Domínguez', role: { es: 'Analista de inteligencia y defensa', en: 'Intelligence and defence analyst' } },
  topic: { es: 'Sociedad', en: 'Society' },
  summary: {
    es: 'Una mirada poco habitual al mundo de la inteligencia y la defensa: cómo se analiza información, qué es real y qué es cine.',
    en: 'A rare look into intelligence and defence: how information is analysed, what is real and what is cinema.'
  },
  lede: {
    es: 'El sector del que menos se habla y del que más se fantasea. Sara explica el trabajo real de análisis, la diferencia entre información e inteligencia y por qué casi todo lo interesante es aburrido y metódico.',
    en: 'The sector least talked about and most fantasised about. Sara explains the real analytical work, the difference between information and intelligence, and why almost everything interesting is slow and methodical.'
  },
  points: {
    es: ['Qué diferencia hay entre información e inteligencia', 'Cómo se forma alguien para trabajar en este mundo', 'Qué parte de lo que se ve en cine es verdad', 'Cómo se decide qué amenaza es prioritaria'],
    en: ['The difference between information and intelligence', 'How you train for this world', 'How much of what you see in films is true', 'How you decide which threat is a priority']
  }
},
{
  n: 8, season: 1,
  slug: { es: 'evolucion-religion-y-ciencia-alejandro-izquierdo', en: 'evolution-religion-and-science-alejandro-izquierdo' },
  title: { es: 'Evolución, religión y ciencia: ¿cómo era el mundo?', en: 'Evolution, religion and science: how was the world?' },
  guest: { name: 'Alejandro Izquierdo', role: { es: 'Divulgador científico', en: 'Science communicator' } },
  topic: { es: 'Ciencia y mente', en: 'Science and mind' },
  summary: {
    es: 'Evolución, religión y ciencia en una misma conversación: qué sabemos del origen, qué es interpretación y dónde está la frontera honesta.',
    en: 'Evolution, religion and science in a single conversation: what we know about origins, what is interpretation and where the honest boundary sits.'
  },
  lede: {
    es: 'Dos formas de mirar el mismo mundo puestas a hablar durante una hora y veinte. Sin gritos y sin trampas: qué dice la evidencia, qué dice la tradición y dónde cada una tiene que reconocer sus límites.',
    en: 'Two ways of looking at the same world, put in conversation for eighty minutes. No shouting and no tricks: what the evidence says, what tradition says, and where each has to admit its limits.'
  },
  points: {
    es: ['Qué sabemos y qué no sabemos sobre el origen de la vida', 'Dónde acaba el dato y empieza la interpretación', 'Los debates que se repiten y por qué nunca avanzan', 'Cómo hablar de esto sin insultar a nadie'],
    en: ['What we know and do not know about the origin of life', 'Where data ends and interpretation begins', 'The debates that repeat and never move forward', 'How to discuss this without insulting anyone']
  }
},
{
  n: 7, season: 1,
  slug: { es: 'entrenador-de-baloncesto-talento-disciplina-toni-mesa', en: 'basketball-coach-talent-discipline-management-toni-mesa' },
  title: { es: 'Entrenador de baloncesto: talento, disciplina y gestión', en: 'Basketball coach: talent, discipline and management' },
  guest: { name: 'Toni Mesa', role: { es: 'Entrenador de baloncesto', en: 'Basketball coach' } },
  topic: { es: 'Deporte por dentro', en: 'Sport inside out' },
  summary: {
    es: 'Talento, disciplina y gestión de personas desde el banquillo: cómo se dirige un vestuario y qué se aprende ahí que sirve en cualquier equipo.',
    en: 'Talent, discipline and managing people from the bench: how you run a dressing room and what it teaches you about any team.'
  },
  lede: {
    es: 'Un entrenador es un jefe con doce empleados que cobran distinto y se llevan mal. Toni cuenta cómo se gestiona eso, cómo se corrige a alguien con talento y por qué la disciplina no es gritar.',
    en: 'A coach is a manager with twelve employees on different salaries who do not get along. Toni explains how you handle that, how you correct someone with talent, and why discipline is not shouting.'
  },
  points: {
    es: ['Cómo se detecta talento que todavía no rinde', 'Gestionar egos sin romper el vestuario', 'Qué se dice en un tiempo muerto y qué no', 'Lo que un entrenador enseña a cualquier jefe'],
    en: ['How you spot talent that is not performing yet', 'Managing egos without breaking the dressing room', 'What gets said in a timeout and what does not', 'What a coach can teach any manager']
  }
},
{
  n: 6, season: 1,
  slug: { es: 'periodismo-freelance-etica-agenda-editorial-natalia-messer', en: 'freelance-journalism-ethics-editorial-agenda-natalia-messer' },
  title: { es: 'Periodismo freelance: moral, ética y agenda editorial', en: 'Freelance journalism: ethics and editorial agenda' },
  guest: { name: 'Natalia Messer', role: { es: 'Periodista freelance', en: 'Freelance journalist' } },
  topic: { es: 'Sociedad', en: 'Society' },
  summary: {
    es: 'Vivir del periodismo por libre: cómo se venden reportajes, cuánto se cobra y dónde están los límites éticos cuando no tienes un sueldo detrás.',
    en: 'Making a living in journalism on your own terms: how you sell stories, what you get paid and where the ethical limits are without a salary behind you.'
  },
  lede: {
    es: 'Sin nómina, sin redacción y con la misma responsabilidad. Natalia explica cómo se construye una carrera freelance, cómo se pitchea a un medio y qué encargos se rechazan aunque haga falta el dinero.',
    en: 'No salary, no newsroom and the same responsibility. Natalia explains how a freelance career is built, how you pitch an outlet and which commissions you turn down even when you need the money.'
  },
  points: {
    es: ['Cómo se pitchea un reportaje y qué hace que lo compren', 'Tarifas reales del periodismo freelance', 'Los conflictos de interés que nadie ve', 'Cómo se sostiene una carrera sin redacción detrás'],
    en: ['How you pitch a story and what makes an editor buy it', 'Real freelance journalism rates', 'The conflicts of interest nobody sees', 'How you sustain a career with no newsroom behind you']
  }
},
{
  n: 5, season: 1,
  slug: { es: 'como-escribir-un-buen-libro-literatura-iris-iglesias', en: 'how-to-write-a-good-book-literature-iris-iglesias' },
  title: { es: '¿Cómo escribir un buen libro? Literatura y sus autores', en: 'How do you write a good book? Literature and authors' },
  guest: { name: 'Iris Iglesias', role: { es: 'Escritora', en: 'Writer' } },
  topic: { es: 'Cultura', en: 'Culture' },
  summary: {
    es: 'El oficio de escribir por dentro: proceso, disciplina, edición y qué separa un manuscrito publicable de uno que se queda en el cajón.',
    en: 'The craft of writing from the inside: process, discipline, editing and what separates a publishable manuscript from one that stays in a drawer.'
  },
  lede: {
    es: 'Escribir un libro no es tener una idea: es sostenerla trescientas páginas. Iris cuenta el proceso real, la rutina, el papel del editor y el momento en que hay que tirar a la basura lo que más te gusta.',
    en: 'Writing a book is not having an idea: it is holding it for three hundred pages. Iris explains the real process, the routine, the editor’s role and the moment you have to throw away your favourite part.'
  },
  points: {
    es: ['Cómo se estructura una novela antes de escribirla', 'La rutina real de alguien que escribe en serio', 'Qué hace un editor y por qué lo necesitas', 'Cómo se sabe que un texto ya está terminado'],
    en: ['How a novel is structured before you write it', 'The real routine of someone who writes seriously', 'What an editor does and why you need one', 'How you know a text is finished']
  }
},
{
  n: 4, season: 1,
  slug: { es: 'parlamento-europeo-burocracia-economia-carlos-castillo', en: 'european-parliament-bureaucracy-economics-carlos-castillo' },
  title: { es: 'Parlamento Europeo, burocracia y economía europea', en: 'The European Parliament, bureaucracy and economics' },
  guest: { name: 'Carlos Castillo', role: { es: 'Asesor en el Parlamento Europeo', en: 'European Parliament adviser' } },
  topic: { es: 'Sociedad', en: 'Society' },
  summary: {
    es: 'Europa por dentro: cómo se aprueba una norma, quién la escribe de verdad y por qué la burocracia europea funciona como funciona.',
    en: 'Europe from the inside: how a rule gets approved, who actually writes it and why European bureaucracy works the way it does.'
  },
  lede: {
    es: 'Las decisiones que afectan a tu empresa se toman a mil kilómetros y con un vocabulario diseñado para que no las entiendas. Carlos traduce el proceso: quién propone, quién negocia y dónde se decide de verdad.',
    en: 'Decisions that affect your business are taken a thousand kilometres away in language designed to be impenetrable. Carlos translates the process: who proposes, who negotiates and where it is really decided.'
  },
  points: {
    es: ['El recorrido real de una norma europea, de la idea al boletín', 'Quién escribe los textos que luego se votan', 'Cómo llegan los fondos europeos y por qué tardan', 'Qué puede hacer una empresa pequeña frente a Bruselas'],
    en: ['The real journey of an EU rule, from idea to law', 'Who writes the texts that later get voted on', 'How EU funds arrive and why they take so long', 'What a small business can actually do about Brussels']
  }
},
{
  n: 3, season: 1,
  slug: { es: 'vivir-de-la-comedia-comedia-politica-limites-dani-mora', en: 'making-a-living-from-comedy-politics-and-limits-dani-mora' },
  title: { es: 'Vivir de la comedia: comedia política y límites', en: 'Making a living from comedy: politics and limits' },
  guest: { name: 'Dani Mora', role: { es: 'Cómico', en: 'Comedian' } },
  topic: { es: 'Cultura', en: 'Culture' },
  summary: {
    es: 'El oficio de hacer reír: cómo se escribe un monólogo, cómo se prueba en sala y dónde están los límites de la comedia política.',
    en: 'The craft of making people laugh: how you write a set, how you test it on stage and where the limits of political comedy are.'
  },
  lede: {
    es: 'Un chiste que funciona es el resultado de veinte que no funcionaron delante de gente. Dani explica el método, el micro abierto, el silencio del público y qué pasa cuando te pasas de la raya de verdad.',
    en: 'A joke that lands is the result of twenty that did not, in front of real people. Dani explains the method, the open mic, the silence of a room and what happens when you actually cross the line.'
  },
  points: {
    es: ['Cómo se construye y se prueba un monólogo', 'Qué se aprende de un bolo que sale mal', 'Los límites de la comedia política, según quien la hace', 'Cuánto se puede ganar de verdad haciendo comedia'],
    en: ['How a stand-up set is built and tested', 'What you learn from a gig that goes badly', 'The limits of political comedy, from someone who does it', 'What you can actually earn in comedy']
  }
},
{
  n: 2, season: 1,
  slug: { es: 'patologias-urgencias-autopsias-natalia-bautista', en: 'pathology-emergencies-autopsies-natalia-bautista' },
  title: { es: 'Patologías, urgencias, drogodependencia y autopsias', en: 'Pathology, emergencies and autopsies' },
  guest: { name: 'Natalia Bautista', role: { es: 'Médica', en: 'Doctor' } },
  topic: { es: 'Ciencia y salud', en: 'Science and health' },
  summary: {
    es: 'La medicina real por dentro: urgencias, patologías, drogodependencia en jóvenes y cómo se hace de verdad una autopsia.',
    en: 'Real medicine from the inside: emergencies, pathology, addiction in young people and how an autopsy actually works.'
  },
  lede: {
    es: 'Una médica con carrera mixta cuenta cómo es trabajar en urgencias, las diferencias entre la medicina en España y en Bélgica, y las partes del oficio de las que casi nunca se habla en público.',
    en: 'A doctor with a mixed career explains what emergency work is like, the differences between medicine in Spain and Belgium, and the parts of the job almost never discussed in public.'
  },
  points: {
    es: ['Cómo es de verdad un turno de urgencias', 'Qué es una patología y cómo se estudia', 'Drogodependencia en jóvenes: lo que se ve en consulta', 'Cómo se hace una autopsia, paso a paso'],
    en: ['What an emergency shift is actually like', 'What pathology is and how it is studied', 'Addiction in young people: what shows up in the clinic', 'How an autopsy is performed, step by step']
  }
},
{
  n: 1, season: 1,
  slug: { es: 'musicologia-lado-oscuro-arte-academia-debora-nancupil', en: 'musicology-dark-side-of-art-and-academia-debora-nancupil' },
  title: { es: 'Musicología: el lado oscuro del arte y de la academia', en: 'Musicology: the dark side of art and academia' },
  guest: { name: 'Débora Ñancupil', role: { es: 'Musicóloga', en: 'Musicologist' } },
  topic: { es: 'Cultura', en: 'Culture' },
  summary: {
    es: 'El episodio que lo empezó todo: música, arte y academia sin filtro, con una musicóloga que cuenta lo que no se dice en los pasillos.',
    en: 'The episode that started it all: music, art and academia unfiltered, with a musicologist telling you what nobody says in the corridors.'
  },
  lede: {
    es: 'El primer episodio de la mesa, grabado sin saber muy bien qué iba a salir. Salió una conversación sobre qué es la musicología, cómo se vive dentro de la academia y por qué el mundo del arte es más duro de lo que parece desde fuera.',
    en: 'The first episode at this table, recorded without really knowing what would come out. What came out was a conversation about musicology, life inside academia and why the art world is harder than it looks from outside.'
  },
  points: {
    es: ['Qué estudia realmente la musicología', 'Cómo funciona una carrera académica por dentro', 'La precariedad del mundo del arte y de la investigación', 'Por qué este episodio abrió el podcast'],
    en: ['What musicology actually studies', 'How an academic career works from the inside', 'Precarity in art and in research', 'Why this episode opened the podcast']
  }
}
];

export default EPISODES;
