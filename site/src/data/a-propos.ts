// Contenus de la page À propos (kit/maquette/A-propos.dc.html).
// Regroupés ici pour la bascule vers Directus (collection `pages`, phase 3).
// Les bios de Clara et Paul sont dans `intervenants.ts`.

export interface TextBlock {
  title: string;
  /** Paragraphes ; HTML simple autorisé (<cite>). */
  paragraphs: string[];
}

export interface AnchorLink {
  href: string;
  label: string;
}

/** En-tête de page : repères pratiques. */
export const facts: string[] = [
  'Basés dans le Sud-Ouest',
  'Partout en France, en présentiel ou à distance',
  'Interventions en français',
];

/** Navigation « Sur cette page ». */
export const onThisPage: AnchorLink[] = [
  { href: '#demarche', label: 'Notre démarche' },
  { href: '#principes', label: 'Nos principes' },
  { href: '#clara-peron', label: 'Clara Peron' },
  { href: '#paul-loustaunau', label: 'Paul Loustaunau' },
  { href: '#limites', label: 'Ce que nous ne faisons pas' },
];

/** Notre démarche (section nuit). */
export const approach: TextBlock[] = [
  {
    title: 'Le nom',
    paragraphs: [
      "M42 est le nom de catalogue de la nébuleuse d'Orion. Par une nuit claire, elle se voit à l'œil nu, à condition de savoir où regarder. L'IA, c'est pareil : elle est déjà dans nos téléphones, nos métiers et nos foyers, mais on la distingue mal. Notre travail consiste à montrer où regarder.",
      "Le 42 est aussi un clin d'œil au <cite>Guide du voyageur galactique</cite>, où il est la réponse à « la grande question sur la vie, l'univers et le reste ». Nous n'avons pas de réponse toute faite. Nous donnons des repères.",
    ],
  },
  {
    title: 'Se repérer',
    paragraphs: [
      "Notre phrase dit l'essentiel : « Se repérer dans l'IA. » Il ne s'agit pas de devenir expert ni de tout savoir. Il s'agit de savoir où l'on est : ce que l'outil fait bien, où il se trompe, et comment garder la main sur les décisions qui comptent. Notre symbole le raconte à sa façon : quatre étoiles reliées dessinent un M autour d'une étoile d'or, comme sur une carte du ciel.",
    ],
  },
  {
    title: 'Pourquoi un duo',
    paragraphs: [
      "Clara porte l'humain, la pédagogie et le passage à l'action. Paul porte la technique et les démonstrations en direct. L'une s'assure que chacun dans la salle comprend et sait quoi faire ; l'autre montre ce que l'IA fait vraiment, sans effet de manche. Ce sont deux métiers, et une seule voix sur scène.",
    ],
  },
];

/** Nos principes (numérotés 01 à 04). */
export const principles: { title: string; text: string }[] = [
  {
    title: 'Ni peur ni emballement',
    text: "Nous ne vendons pas l'IA et nous ne la diabolisons pas. Pas de « révolution », pas de scénario catastrophe : ce que l'outil fait bien, où il se trompe, et ce que cela change vraiment pour votre public.",
  },
  {
    title: 'Du concret',
    text: 'Des démonstrations en direct, des exemples tirés du quotidien de votre public, des règles simples à appliquer dès le lendemain. Chacun repart avec des repères, pas avec du vocabulaire.',
  },
  {
    title: "L'esprit critique",
    text: "Notre règle : « Je réfléchis d'abord, l'IA ensuite. » Chaque chiffre que nous citons est daté et sourcé, chaque étude est présentée avec ses limites. Nous appliquons à nos propres sources le doute que nous enseignons.",
  },
  {
    title: 'La neutralité',
    text: 'Sur la désinformation comme sur le reste, nous montrons des mécanismes et citons les sources officielles. Aucun contenu partisan, aucune consigne, aucune prise de position politique, quel que soit le public.',
  },
];

/** Ce que nous ne faisons pas. */
export const limits: { title: string; text: string }[] = [
  {
    title: "Nous ne vendons pas d'outils",
    text: "Ni logiciel, ni abonnement, ni solution d'IA. Nous ne recommandons aucun produit contre rémunération [À VALIDER]. Quand nous citons un outil, c'est pour montrer un usage, pas pour le vendre.",
  },
  {
    title: 'Nous ne prenons pas position politiquement',
    text: 'Nous montrons comment fonctionne une manipulation, jamais pour qui voter ni quoi penser. Nous citons la source officielle et nous nous arrêtons là. Cette règle vaut pour tous les publics, à toutes les périodes.',
  },
  {
    title: 'Nous ne promettons pas de chiffres',
    text: 'Aucun « +30 % de productivité », aucune garantie de résultat. Nous promettons des repères, des méthodes et des règles concrètes.',
  },
  {
    title: 'Nous ne faisons pas peur pour convaincre',
    text: "Les risques sont réels, et nous les montrons. Mais une salle inquiète retient moins qu'une salle qui comprend. Chaque risque présenté vient avec le geste qui protège.",
  },
  {
    title: "Nous n'inventons rien",
    text: "Pas de chiffre sans source, pas de témoignage sans l'accord de son auteur, pas de référence que nous ne pourrions pas montrer.",
  },
];
