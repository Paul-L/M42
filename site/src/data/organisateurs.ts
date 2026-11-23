// Contenus de l'espace organisateurs (kit/maquette/Organisateurs.dc.html).
// Textes à copier : source unique, affichée telle quelle et copiée à l'identique (classe Component, _textes()).
// Regroupés ici pour la bascule vers Directus (phase 3).
//
// Paul : formulation prudente tant que l'accord écrit de l'employeur n'est pas obtenu [À VALIDER].
// VARIANTE après accord : « Paul Loustaunau développe des logiciels depuis 17 ans. Aujourd'hui Lead IA dans un grand
// groupe de logiciels, il conçoit et déploie l'IA et des agents autonomes au quotidien. » (jamais le nom de l'employeur)

export interface CopyText {
  /** Complément des libellés accessibles (« Copier … », « Copié : … »). */
  nom: string;
  texte: string;
}

export const copyTexts = {
  duo: {
    nom: 'la présentation du duo',
    texte:
      "M42, c'est Clara Peron et Paul Loustaunau. Elle forme et accompagne des adultes ; il conçoit et déploie l'IA au quotidien. Ensemble, ils font le lien entre ceux qui fabriquent l'IA et ceux qui la vivent. Basés dans le Sud-Ouest, ils interviennent partout en France, en présentiel ou à distance.",
  },
  claraCourte: {
    nom: 'la biographie courte de Clara Peron',
    texte:
      "Clara Peron est conseillère en insertion professionnelle et formatrice d'adultes. Son métier : rendre un sujet clair, utile et accessible, y compris pour des publics qui n'ont pas choisi d'être là. Chez M42, elle conçoit la pédagogie des interventions et veille à ce que chacun reparte avec des repères concrets.",
  },
  claraLongue: {
    nom: 'la biographie longue de Clara Peron',
    texte:
      "Clara Peron est conseillère en insertion professionnelle et formatrice d'adultes [À COMPLÉTER : nombre d'années d'expérience, types de structures]. Au quotidien, elle accompagne des personnes en période de changement : reprise d'emploi, reconversion, nouveaux outils. Elle sait écouter, rassurer et transmettre, y compris à des publics qui n'ont pas choisi d'être là. Chez M42, elle conçoit la pédagogie des interventions : le déroulé, les jeux, les temps d'échange, les supports que chacun emporte. Son rôle est simple : que personne ne décroche, et que chacun reparte en sachant quoi faire. Elle apporte aussi un regard précieux sur l'IA : celui des personnes qui la découvrent sans l'avoir choisie. Avec elle, une conférence sur l'IA devient un moment d'échange, où chacun ose poser ses questions, même les plus simples. [À COMPLÉTER : formation, certification de formatrice éventuelle]",
  },
  paulCourte: {
    nom: 'la biographie courte de Paul Loustaunau',
    texte:
      "Paul Loustaunau développe des logiciels depuis 17 ans. Il conçoit et déploie aujourd'hui des systèmes d'IA en entreprise, dont des agents autonomes [À VALIDER]. Chez M42, il montre l'IA telle qu'elle est : ses forces, ses limites et les méthodes des professionnels pour la garder sous contrôle.",
  },
  paulLongue: {
    nom: 'la biographie longue de Paul Loustaunau',
    texte:
      "Paul Loustaunau développe des logiciels depuis 17 ans. Il conçoit et déploie aujourd'hui des systèmes d'IA en entreprise [À VALIDER], notamment des agents autonomes, ces programmes capables d'agir seuls. Il travaille avec les méthodes des équipes professionnelles : faire relire chaque résultat, poser des règles fixes, ne donner que les accès nécessaires, garder une trace de tout. Chez M42, il traduit ces méthodes en réflexes simples, utiles à tous. Il fait des démonstrations en direct, montre ce que l'IA réussit et ce qu'elle invente, sans promesse ni alarmisme. Il sait aussi parler aux dirigeants comme aux équipes techniques, et adapter le niveau à chaque salle. Son principe : on réfléchit d'abord, l'IA ensuite. [À COMPLÉTER : interventions passées, publications, formation]",
  },
  annonceLongue: {
    nom: "le texte d'annonce, version longue",
    texte:
      "[Titre de la conférence]\n[Date] à [heure] · [Lieu, adresse]\n\nL'intelligence artificielle est déjà dans nos téléphones, nos métiers et nos foyers. Comment s'en servir avec méthode, repérer quand elle se trompe et garder l'esprit critique ?\n\nClara Peron, formatrice d'adultes, et Paul Loustaunau, qui conçoit et déploie l'IA au quotidien, proposent une intervention claire et concrète, avec des démonstrations en direct et un jeu avec la salle. Sans jargon, ni peur ni emballement : chacun repart avec des repères simples, à appliquer dès le lendemain.\n\nPublic : [tout public, salariés, parents…] · Durée : [1 h 30]\nEntrée : [libre / sur inscription] · Renseignements : [contact de l'organisateur]\nLes intervenants : m42.guide",
  },
  annonceCourte: {
    nom: "le texte d'annonce, version courte",
    texte:
      "[Date], [lieu] : « [Titre de la conférence] » avec Clara Peron et Paul Loustaunau (M42). Comprendre l'IA, repérer quand elle se trompe et garder l'esprit critique : démonstrations en direct, jeu avec la salle, repères concrets. [Entrée libre / Inscription : lien] · m42.guide",
  },
} as const satisfies Record<string, CopyText>;

export type CopyKey = keyof typeof copyTexts;

/** Nombre de mots affiché (« ≈ 49 mots ») : même calcul que la maquette (_mots()). */
export function wordCount(texte: string): string {
  const n = texte.split(/\s+/).filter((m) => /[0-9A-Za-zÀ-ÿ]/.test(m)).length;
  return '≈ ' + n + ' mots';
}

/** Sommaire « Sur cette page » (en-tête de page). */
export const onThisPage: { id: string; label: string }[] = [
  { id: 'biographies', label: 'Biographies à copier' },
  { id: 'photos', label: 'Photos haute définition' },
  { id: 'fiche-technique', label: 'Fiche technique' },
  { id: 'annonce', label: "Texte d'annonce prêt à publier" },
  { id: 'logos', label: 'Logos' },
  { id: 'contact-presse', label: 'Contact presse' },
];

/** Photos HD : emplacements tant que les photos ne sont pas produites (aucun lien de téléchargement). */
export const photos: { placeholder: string; title: string; formats: string }[] = [
  {
    placeholder: '[Photo : portrait de Clara Peron, de face, regard caméra, 4:5]',
    title: 'Clara Peron, portrait',
    formats: 'JPEG haute définition · [À PRODUIRE]',
  },
  {
    placeholder: '[Photo : portrait de Paul Loustaunau, de trois quarts, 4:5]',
    title: 'Paul Loustaunau, portrait',
    formats: 'JPEG haute définition · [À PRODUIRE]',
  },
  {
    placeholder:
      '[Photo : Clara (à gauche) et Paul (à droite) sur scène, en démonstration, public en amorce floue, existe aussi en 3:2 et 16:9]',
    title: 'Le duo sur scène',
    formats: 'JPEG haute définition, 3 formats · [À PRODUIRE]',
  },
  {
    placeholder:
      '[Photo : Clara et Paul en échange avec la salle, une question, un geste, 4:5 et 3:2]',
    title: 'Le duo avec la salle',
    formats: 'JPEG haute définition · [À PRODUIRE]',
  },
];

/** Fiche technique (version HTML ; le PDF est à produire). */
export const techSheet: { term: string; detail: string }[] = [
  {
    term: 'Salle',
    detail:
      "Public assis face à l'écran. Jauge selon la salle [À VALIDER : jauge maximale testée]. Pour un atelier : jusqu'à 15 personnes, tables en îlots.",
  },
  {
    term: 'Image',
    detail: 'Vidéoprojecteur et écran, avec entrée HDMI, visibles de toute la salle.',
  },
  { term: 'Son', detail: "Deux micros sans fil : l'intervention se fait à deux voix." },
  {
    term: 'Connexion internet',
    detail:
      'Indispensable pour les démonstrations en direct. Filaire de préférence. Wi-Fi accessible au public si les participants votent depuis leur téléphone.',
  },
  { term: 'Retour écran', detail: 'Souhaité, face aux intervenants.' },
  {
    term: 'Installation',
    detail: "30 min avant l'arrivée du public, pour tester le son, l'image et la connexion.",
  },
  {
    term: 'Durée',
    detail:
      'Keynote : 45 min à 1 h · Conférence : 1 h 30 · Atelier : 2 h · Cycle : 4 rendez-vous · Demi-journée sur mesure.',
  },
  {
    term: 'Nous apportons',
    detail:
      'Nos ordinateurs et nos adaptateurs [À VALIDER], et une vidéo de secours pour chaque démonstration [À PRODUIRE].',
  },
  {
    term: 'À distance',
    detail:
      "Sur l'outil de visioconférence de votre choix [À VALIDER], avec un test technique avant la séance.",
  },
  { term: 'Langue', detail: 'Interventions en français.' },
];

/** Fichier de logo téléchargeable (copie sans modification de kit/logo/ dans public/logos/). */
export interface LogoFile {
  /** Libellé affiché, tel que dans la maquette (« SVG », « PNG transparent »…). */
  label: string;
  /** Lien du fichier ; absent tant que le fichier n'existe pas. */
  href?: string;
}

export const logos: {
  title: string;
  /** Complément du nom accessible des liens (« SVG, logo complet, fond clair »). */
  srLabel: string;
  tone: 'light' | 'dark' | 'symbol';
  files: LogoFile[];
  /** Marqueur conservé tant qu'un fichier manque. */
  marker?: string;
}[] = [
  {
    title: 'Logo complet, fond clair',
    srLabel: 'logo complet, fond clair',
    tone: 'light',
    files: [
      { label: 'SVG', href: '/logos/M42_logo_horizontal_couleur.svg' },
      { label: 'PNG transparent', href: '/logos/M42_logo_horizontal_couleur_2000.png' },
    ],
  },
  {
    title: 'Logo complet, fond sombre',
    srLabel: 'logo complet, fond sombre',
    tone: 'dark',
    files: [
      { label: 'SVG', href: '/logos/M42_logo_horizontal_blanc.svg' },
      { label: 'PNG transparent', href: '/logos/M42_logo_horizontal_blanc_2000.png' },
    ],
  },
  {
    title: 'Symbole seul',
    srLabel: 'symbole seul',
    tone: 'symbol',
    files: [
      { label: 'SVG', href: '/logos/M42_symbole_couleur.svg' },
      // kit/logo ne contient pas de PNG carré de 512 px du symbole seul (seulement 2000 px).
      { label: 'PNG carré 512 px' },
    ],
    marker: '[À PRODUIRE : fichiers]',
  },
];

/** Règles d'usage du logo. */
export const logoRules: string[] = [
  "Ne pas déformer, recolorer ni ajouter d'effet au logo.",
  'Laisser un espace libre autour du logo, au moins égal à la hauteur du symbole divisée par deux [À VALIDER].',
  'Dans un texte, écrire « M42 », et nommer les intervenants dans cet ordre : Clara Peron et Paul Loustaunau.',
];
