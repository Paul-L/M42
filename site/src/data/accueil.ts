// Accueil (kit/maquette/Main.dc.html) : contenus de la page, texte exact de la maquette.
// Structure prête pour une bascule vers Directus (phase 3) : SEO, en-tête, chiffres, principes,
// repères mis en avant, catalogue, publics, intervenants, kit organisateur, contact.
// Marqueurs [À …] conservés tels quels.
//
// Deux parties :
// 1. Contenus : données sérialisables en JSON (chaînes, nombres, tableaux, objets simples).
// 2. Valeurs calculées (en fin de fichier) : dérivées d'un autre module (catalogue des
//    conférences), elles ne sont pas du contenu et ne seront pas stockées dans Directus.
//
// Les champs notés « HTML » sont rendus tels quels (set:html), comme l'était le texte écrit
// en dur dans le gabarit (apostrophes non échappées).

import { routes } from './routes';
import { catalogue } from './conferences/catalogue';
import type { CarteConference, Chiffre } from './conferences/types';

/* ------------------------------------------------------------------------------------------ */
/* 1. Contenus                                                                                */
/* ------------------------------------------------------------------------------------------ */

/** Title et meta description (commentaire SEO de la maquette). */
export const seo = {
  title: "Se repérer dans l'IA : conférences, ateliers et repères | M42",
  description:
    "Conférences, ateliers et outils gratuits pour comprendre l'IA, déjouer ses pièges et garder l'esprit critique. Entreprises, événements, collectivités, écoles.",
};

/**
 * Valeurs textuelles du JSON-LD (Organization + WebSite) ; le graphe est construit dans la page.
 * Aucun employeur, aucune structure de facturation, aucun marqueur [À …] (DECISIONS.md, point 19).
 */
export const organisation = {
  nom: 'M42',
  nomAlternatif: 'M42.guide',
  /** Chemin du logo (le PNG 512 px de l'exemple SEO n'existe pas encore : logo horizontal du kit). */
  logo: '/logos/M42_logo_horizontal_couleur_2000.png',
  slogan: "Se repérer dans l'IA.",
  description:
    "Conférences, keynotes et ateliers sur l'intelligence artificielle pour les entreprises, les événements, les collectivités, les établissements scolaires et les associations.",
  email: 'clara@m42.guide',
  zone: 'France',
  adresse: {
    localite: 'Salies-de-Béarn',
    region: 'Nouvelle-Aquitaine',
    pays: 'FR',
  },
  domaines: [
    'intelligence artificielle',
    'IA générative',
    'arnaques et fraudes',
    'désinformation',
    'éducation aux médias',
    'parentalité numérique',
  ],
  langue: 'fr',
};

export const hero = {
  surTitre: "Conférences et ateliers sur l'intelligence artificielle",
  /** Baseline du H1 : « {avant}<em>{accent}</em>{apres} » (avant : HTML). */
  titre: { avant: "Se repérer dans l'", accent: 'IA', apres: '.' },
  chapo:
    "Comprendre ce que l'IA sait faire, repérer quand elle se trompe, et garder la main. Des conférences, des ateliers et des repères concrets pour vos équipes, vos publics et vos élèves.",
  ctaPrimaire: { label: 'Parler de votre événement', href: routes['Contact.dc.html'] },
  ctaSecondaire: { label: 'Découvrir les conférences', href: '#conferences' },
  symbole: {
    alt: "Le symbole M42 : une carte du ciel où quatre étoiles reliées dessinent un M autour d'une étoile d'or, qui s'incline vers le curseur",
    pause: "Mettre en pause l'animation du symbole",
    relance: "Relancer l'animation du symbole",
  },
};

/**
 * Bandeau chiffres : uniquement les chiffres de la maquette, chacun avec sa source.
 * Un seul chiffre en or (`accent`, DA § 6).
 */
export const chiffres: Chiffre[] = [
  {
    valeur: '48 %',
    texte: "des Français de 12 ans et plus utilisent l'IA générative.",
    source: 'Source : Baromètre du numérique, édition 2026',
  },
  {
    valeur: '52 %',
    texte: "s'en méfient.",
    source: 'Source : Baromètre du numérique, édition 2026',
    accent: true,
  },
];

export const citationChiffres = "L'outil avance plus vite que nos repères.";

/** Nom accessible du bandeau chiffres. */
export const chiffresLabel = "L'IA en chiffres";

export const principesTexte = {
  surTitre: 'Notre approche',
  titre: 'Trois principes pour se repérer',
};

export const principes = [
  {
    numero: '01',
    titre: "Réfléchir d'abord, l'IA ensuite",
    texte:
      "L'IA est un appui, pas un pilote. On sait ce que l'on cherche avant de demander, on garde son jugement, et on vérifie ce qui compte.",
  },
  {
    numero: '02',
    titre: 'Du concret, sans jargon',
    texte:
      'Des démonstrations en direct, des exemples tirés du quotidien de votre public, des règles simples à appliquer dès le lendemain. Chacun repart avec des repères, pas avec du vocabulaire.',
  },
  {
    numero: '03',
    titre: "L'esprit critique, ni peur ni emballement",
    texte:
      "Ni vendre l'IA, ni la diaboliser. Voir ce qu'elle fait bien, où elle se trompe, et comment garder la main sur les décisions qui comptent.",
  },
];

export const reperesTexte = {
  surTitre: 'Repères',
  /** HTML. */
  titre: "À utiliser dès aujourd'hui",
  chapo: 'Des outils gratuits, simples et vérifiés, pour vous, vos équipes ou vos habitants.',
  lien: { label: 'Tous les repères', href: routes['Reperes.dc.html'] },
};

export interface RepereAccueil {
  type: string;
  titre: string;
  description: string;
  /** Absent : repère pas encore disponible (carte en pointillés, non cliquable). */
  href?: string;
  cta?: string;
}

export const reperes: RepereAccueil[] = [
  {
    type: 'Test · 5 minutes',
    titre: 'Arnaque ou pas ?',
    description: 'Huit situations du quotidien. Saurez-vous reconnaître le piège ?',
    href: routes['Sat-test-arnaque-ou-pas.dc.html'],
    cta: 'Faire le test →',
  },
  {
    type: 'Guide · 10 minutes',
    titre: "Sensibiliser ses équipes à l'IA en 5 étapes",
    description:
      'Par où commencer, quelles règles poser, et la grille vert, orange, rouge des usages.',
    href: routes['Sat-sensibiliser-equipes-ia.dc.html'],
    cta: 'Lire le guide →',
  },
  {
    type: 'Méthode · 4 étapes',
    titre: 'Vrai ou faux ? Vérifier une image ou une info',
    description:
      'La méthode simple pour ne plus se faire avoir par une fausse image, une fausse vidéo ou un faux site.',
    href: routes['Conf-desinformation-ia.dc.html'],
    cta: 'Découvrir la méthode →',
  },
  {
    type: 'Fiche à imprimer · bientôt',
    titre: "Les 10 réflexes face à l'IA",
    description: 'À afficher au bureau ou sur le frigo. [À PRODUIRE]',
  },
];

/**
 * Résumés propres à l'accueil, par slug de conférence (celui de « Vrai ou faux ? » est plus long
 * sur l'accueil que dans les autres pages). Les autres résumés viennent du catalogue commun.
 */
export const resumesAccueil: Record<string, string> = {
  'desinformation-ia':
    "Repérer une image truquée, une fausse vidéo ou un faux site d'information grâce à une méthode simple en quatre étapes. Une conférence strictement neutre, pour mieux s'informer.",
};

export const catalogueTexte = {
  surTitre: 'Catalogue',
  titre: 'Nos conférences',
  /** Appel des cartes de conférence. */
  ctaCarte: 'Voir le programme',
  chapo:
    "Quatre conférences prêtes à programmer, adaptées à chaque public, de la plénière d'un congrès à la salle du conseil municipal. Chacune existe en intervention plénière (45 min à 1 h), en conférence (1 h 30), en atelier pratique (2 h) ou en cycle de 4 rendez-vous.",
  surMesure: {
    titre: 'Sur mesure',
    texte:
      "Un public, un enjeu, un format précis ? Séminaire, convention, formation d'équipe, journée pédagogique : nous construisons l'intervention avec vous.",
    cta: { label: 'Construire votre intervention', href: routes['Contact.dc.html'] },
  },
  toutes: {
    label: 'Voir toutes les conférences et leurs formats',
    href: routes['Conferences.dc.html'],
  },
};

export const publics = [
  {
    titre: 'Entreprises & dirigeants',
    href: routes['Entreprises.dc.html'],
    texte:
      "Séminaires, conventions, formations d'équipes : faire de l'IA un outil maîtrisé, ni gadget ni risque.",
  },
  {
    titre: 'Événements, salons & congrès',
    href: routes['Evenements.dc.html'],
    texte:
      'Une intervention vivante et accessible, qui parle à toute la salle, aux experts comme aux néophytes.',
  },
  {
    titre: 'Collectivités & élus',
    href: routes['Collectivites.dc.html'],
    texte:
      'Informer les habitants, sensibiliser les agents, éclairer les décisions, avec une stricte neutralité.',
  },
  {
    titre: 'Éducation',
    href: routes['Education.dc.html'],
    texte:
      "Élèves, enseignants et parents : apprendre à utiliser l'IA sans tricher et sans cesser de penser.",
  },
  {
    titre: "Associations & structures d'accompagnement",
    href: routes['Associations.dc.html'],
    texte:
      'Donner aux bénévoles, aux professionnels et aux personnes accompagnées des repères simples et rassurants.',
  },
];

export const publicsTexte = {
  surTitre: 'Publics',
  titre: 'Pour qui',
  chapo: 'Partout en France, en présentiel ou à distance.',
  devis: "Chaque intervention fait l'objet d'un devis adapté à votre structure. Réponse sous 48 h.",
  cta: { label: 'Demander un devis', href: routes['Contact.dc.html'] },
};

/**
 * « Qui intervient » : les noms viennent de src/data/intervenants.ts (Clara puis Paul).
 * Paragraphe : « {avant}<strong>Clara</strong>{apresClara}<strong>Paul</strong>{apresPaul} »,
 * segments en HTML. Description de Paul avec son marqueur [À VALIDER] (aucun employeur).
 */
export const duo = {
  titre: 'Qui intervient',
  texte: {
    avant: 'Les interventions M42 sont conçues et animées par ',
    apresClara: ", formatrice d'adultes, et ",
    apresPaul:
      ", qui conçoit et déploie des systèmes d'IA en entreprise [À VALIDER]. La pédagogie de l'une, la pratique de l'autre.",
  },
  lien: { label: 'Parcours et démarche', href: routes['A-propos.dc.html'] },
};

export const kitOrganisateur = {
  surTitre: 'Kit organisateur',
  titre: 'Espace organisateurs',
  chapo: 'Tout pour annoncer et préparer notre intervention, au même endroit.',
  liste: [
    'Biographies de 50 et 150 mots',
    'Photos HD et logos',
    "Descriptifs des conférences et texte d'annonce prêt à publier",
    'Fiche technique : salle, son, écran, durée',
  ],
  lien: { label: "Accéder à l'espace organisateurs", href: routes['Organisateurs.dc.html'] },
  video:
    "[Vidéo : extrait de conférence de 60 à 90 s, sous-titré, image d'aperçu puis lecture au clic, à tourner]",
};

export const contactTexte = {
  surTitre: 'Contact',
  titre: 'Parlons de votre projet',
  chapo:
    'Conférence, atelier, séminaire ou intervention sur mesure : dites-nous qui sera dans la salle, quand, et ce que vous attendez. Nous vous répondons sous 48 h.',
  cta: { label: 'Organiser une intervention', href: routes['Contact.dc.html'] },
  contacts: [
    { nom: 'Clara', email: 'clara@m42.guide' },
    { nom: 'Paul', email: 'paul@m42.guide' },
  ],
  telephone: '[À COMPLÉTER : téléphone]',
};

/* ------------------------------------------------------------------------------------------ */
/* 2. Valeurs calculées (pas du contenu)                                                      */
/* ------------------------------------------------------------------------------------------ */

/**
 * Cartes des quatre conférences : identité et résumés du catalogue commun
 * (src/data/conferences/catalogue.ts), résumé remplacé par celui de l'accueil s'il existe.
 */
export const conferences: CarteConference[] = catalogue.map((c) => ({
  ...c,
  resume: resumesAccueil[c.slug] ?? c.resume,
}));
