/* Glosario de la economia real. Cada termino se marca como DefinedTerm
   dentro de un DefinedTermSet, y tiene su propio ancla. */

const GLOSSARY = [
{ id: 'autonomo', letter: 'A',
  term: { es: 'Autónomo', en: 'Sole trader' },
  def: {
    es: 'La unidad mínima de la economía real: una persona que responde con su nombre y con su patrimonio. La mitad de los invitados de esta mesa empezaron así.',
    en: 'The smallest unit of the real economy: one person answering with their own name and their own assets. Half the guests at this table started here.' } },
{ id: 'break-even', letter: 'B',
  term: { es: 'Break-even (punto de equilibrio)', en: 'Break-even' },
  def: {
    es: 'El día en que el negocio deja de comerse tus ahorros porque los ingresos cubren todos los costes. Nadie lo celebra en redes y es una de las mayores victorias que existen.',
    en: 'The day the business stops eating your savings because revenue covers every cost. Nobody posts about it, and it is one of the biggest wins there is.' } },
{ id: 'caja', letter: 'C',
  term: { es: 'Caja (tesorería)', en: 'Cash' },
  def: {
    es: 'Lo único que cierra empresas. No se quiebra por falta de beneficio, se quiebra por falta de caja. Sale en una de cada tres conversaciones de esta mesa.',
    en: 'The only thing that closes companies. You do not go under for lack of profit, you go under for lack of cash. It comes up in one of every three conversations here.' } },
{ id: 'cicatriz', letter: 'C',
  term: { es: 'Cicatriz', en: 'Scar' },
  def: {
    es: 'Requisito de entrada a esta mesa: un error propio del que se puede hablar con nombre, fecha y aprendizaje. Sin cicatriz no hay conversación, hay publicidad.',
    en: 'The entry requirement at this table: a mistake of your own you can name, date and explain. No scar, no conversation, just advertising.' } },
{ id: 'cac', letter: 'C',
  term: { es: 'CAC (coste de adquisición)', en: 'CAC (customer acquisition cost)' },
  def: {
    es: 'Lo que te cuesta de verdad conseguir un cliente, sumando publicidad, tiempo y comisiones. Si no lo sabes, no sabes si tu negocio funciona.',
    en: 'What it truly costs to win one customer, counting ads, time and commissions. If you do not know it, you do not know whether your business works.' } },
{ id: 'churn', letter: 'C',
  term: { es: 'Churn (fuga de clientes)', en: 'Churn' },
  def: {
    es: 'El porcentaje de clientes que se van cada mes. La métrica más honesta que existe: mide si tu producto merece la pena una segunda vez.',
    en: 'The share of customers who leave each month. The most honest metric there is: it measures whether your product is worth a second time.' } },
{ id: 'due-diligence', letter: 'D',
  term: { es: 'Due diligence', en: 'Due diligence' },
  def: {
    es: 'El examen al que se somete una empresa antes de que alguien la compre o invierta en ella. Donde salen a la luz todos los papeles que no estaban en orden.',
    en: 'The examination a company goes through before somebody buys it or invests. Where every piece of paperwork that was not in order finally surfaces.' } },
{ id: 'ebitda', letter: 'E',
  term: { es: 'EBITDA', en: 'EBITDA' },
  def: {
    es: 'El beneficio antes de intereses, impuestos y amortizaciones. Útil para comparar empresas y peligroso cuando se usa para tapar que no hay caja.',
    en: 'Earnings before interest, tax, depreciation and amortisation. Useful for comparing companies, dangerous when used to hide that there is no cash.' } },
{ id: 'fondo-de-maniobra', letter: 'F',
  term: { es: 'Fondo de maniobra', en: 'Working capital' },
  def: {
    es: 'El colchón que separa una mala racha de un cierre. Los invitados con más años a la espalda suelen tener una cifra sagrada en la cabeza.',
    en: 'The cushion between a bad quarter and shutting down. The guests with the most years behind them all carry a sacred number in their head.' } },
{ id: 'flujo-de-caja', letter: 'F',
  term: { es: 'Flujo de caja', en: 'Cash flow' },
  def: {
    es: 'El dinero que entra y sale de verdad, con fechas. Una empresa rentable sobre el papel puede morir si cobra a noventa días y paga a treinta.',
    en: 'Money actually coming in and going out, with dates attached. A company profitable on paper can die if it gets paid in ninety days and pays in thirty.' } },
{ id: 'gestion', letter: 'G',
  term: { es: 'Gestión', en: 'Management' },
  def: {
    es: 'La parte aburrida que decide si lo demás existe. Casi ningún invitado se sentó a esta mesa por saber gestionar y casi todos sobrevivieron por aprenderlo.',
    en: 'The boring part that decides whether the rest exists. Almost no guest arrived here because they knew how to manage, and almost all survived by learning it.' } },
{ id: 'intrusismo', letter: 'I',
  term: { es: 'Intrusismo', en: 'Unqualified practice' },
  def: {
    es: 'Ejercer una profesión sin la formación ni la habilitación necesarias. Un tema que aparece en casi todos los oficios regulados que pasan por la mesa.',
    en: 'Practising a profession without the training or licence it requires. A theme in nearly every regulated trade that passes through this table.' } },
{ id: 'kpi', letter: 'K',
  term: { es: 'KPI (indicador clave)', en: 'KPI' },
  def: {
    es: 'El puñado de números que de verdad te dicen cómo va el negocio. Si tienes veinte, no tienes ninguno.',
    en: 'The handful of numbers that actually tell you how the business is doing. If you have twenty, you have none.' } },
{ id: 'margen', letter: 'M',
  term: { es: 'Margen', en: 'Margin' },
  def: {
    es: 'Lo que queda de verdad después de todo. La cifra que los gurús nunca mencionan cuando hablan de facturación.',
    en: 'What is actually left after everything. The number the gurus never mention when they talk about revenue.' } },
{ id: 'morosidad', letter: 'M',
  term: { es: 'Morosidad', en: 'Late payment' },
  def: {
    es: 'Que te deban dinero por trabajo entregado. La causa silenciosa de la mitad de los cierres de pequeñas empresas en España.',
    en: 'Being owed money for work already delivered. The silent cause of half the small business closures in Spain.' } },
{ id: 'nomina', letter: 'N',
  term: { es: 'Nómina', en: 'Payroll' },
  def: {
    es: 'La responsabilidad más pesada de la mesa: el día 28 no es una métrica, son las familias de tu equipo. Firmarlas sin saber si podrás pagarlas es una prueba que sale una y otra vez.',
    en: 'The heaviest responsibility at this table: the 28th is not a metric, it is your team’s families. Signing it without knowing you can cover it comes up again and again.' } },
{ id: 'outreach', letter: 'O',
  term: { es: 'Outreach (puerta fría)', en: 'Cold outreach' },
  def: {
    es: 'Escribir a quien no te conoce. Así se consiguieron los primeros invitados de este podcast: uno a uno, sin padrinos y con una tasa de respuesta muy baja.',
    en: 'Writing to people who do not know you. That is how this podcast got its first guests: one by one, no shortcuts, with a very low reply rate.' } },
{ id: 'pyme', letter: 'P',
  term: { es: 'Pyme', en: 'SME' },
  def: {
    es: 'La columna vertebral de cualquier economía: más del 99% de las empresas. La protagonista de esta mesa y la gran ausente de los medios.',
    en: 'The backbone of any economy: over 99% of all companies. The protagonist of this table and the great absentee from the media.' } },
{ id: 'pivotar', letter: 'P',
  term: { es: 'Pivotar', en: 'Pivot' },
  def: {
    es: 'Cambiar de rumbo a tiempo. La diferencia entre pivotar y rendirse es que en el primer caso te llevas lo aprendido.',
    en: 'Changing course in time. The difference between pivoting and quitting is that in the first case you take the learning with you.' } },
{ id: 'runway', letter: 'R',
  term: { es: 'Runway (pista)', en: 'Runway' },
  def: {
    es: 'Los meses de vida que le quedan al negocio con la caja actual. La cifra que de verdad marca cuánto puedes arriesgar.',
    en: 'How many months the business has left on current cash. The number that really decides how much risk you can take.' } },
{ id: 'sostener', letter: 'S',
  term: { es: 'Sostener', en: 'Sustaining' },
  def: {
    es: 'La palabra de la casa. Emprender es la parte que sale en las películas; sostener es la parte que nadie cuenta. Y es lo más difícil que hay.',
    en: 'The word of the house. Starting up is the part that makes the films; sustaining is the part nobody tells. And it is the hardest thing there is.' } },
{ id: 'sesgo-del-superviviente', letter: 'S',
  term: { es: 'Sesgo del superviviente', en: 'Survivorship bias' },
  def: {
    es: 'Aprender solo de los que ganaron. La razón por la que la mitad de los consejos de negocio que circulan son inútiles.',
    en: 'Learning only from the winners. The reason half the business advice in circulation is useless.' } },
{ id: 'traspaso', letter: 'T',
  term: { es: 'Traspaso', en: 'Business transfer' },
  def: {
    es: 'Vender o ceder un negocio en marcha. A veces es la salida más digna y mejor pensada. Que nadie te diga que es rendirse.',
    en: 'Selling or handing over a going concern. Sometimes it is the most dignified, best-planned exit there is. Do not let anyone tell you it is quitting.' } },
{ id: 'ticket-medio', letter: 'T',
  term: { es: 'Ticket medio', en: 'Average order value' },
  def: {
    es: 'Lo que gasta un cliente de media. Subirlo un 10% suele ser más fácil y más rentable que conseguir un 10% más de clientes.',
    en: 'What an average customer spends. Raising it 10% is usually easier and more profitable than winning 10% more customers.' } },
{ id: 'valor-anadido', letter: 'V',
  term: { es: 'Valor añadido', en: 'Added value' },
  def: {
    es: 'Lo que aportas por encima de lo que cuesta la materia prima y las horas. Sin él solo puedes competir bajando el precio, y esa carrera la gana siempre otro.',
    en: 'What you add beyond raw materials and hours. Without it you can only compete on price, and somebody else always wins that race.' } }
];

export default GLOSSARY;
