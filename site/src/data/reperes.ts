// Contenus de la page Repères (kit/maquette/Reperes.dc.html) : en-tête, bibliothèque des repères,
// lettre mensuelle, « Pour aller plus loin ». Texte exact de la maquette, marqueurs [À …] conservés.
//
// Trois parties :
// 1. Interface : micro-texte et logique des filtres (îlot de RepereLibrary) et du formulaire de la
//    lettre. Reste dans le code.
// 2. Contenus : données sérialisables en JSON (chaînes, nombres, booléens, tableaux, objets simples).
//    Les repères (`reperes`) sont prévus pour la collection Directus `ressources` : un
//    enregistrement par repère, objets plats (href et cta absents pour les repères « bientôt »).
// 3. Valeurs calculées : repères disponibles et « bientôt », dérivés de `reperes`.
//
// Attention : l'îlot de RepereLibrary importe ce module, et le bundle client garde tout ce qui lit
// `routes[…]` (lecture de propriété non éliminée). Les liens des contenus de page sont donc des
// clés de src/data/routes.ts (`page`), résolues au rendu ; l'ordre des parties 1 à 3 et la forme
// de `reperes` ne doivent pas changer sans accepter un nouveau bundle client.
//
// [À DÉCIDER] 12_growth_satellites 4.8 dit « pas de « bientôt » en ligne ». Les cartes « Bientôt »
// sont là pour la relecture : les masquer à la mise en ligne (AFFICHER_BIENTOT = false),
// ou les garder sans date annoncée.
//
// Les champs notés « HTML » sont rendus tels quels (set:html), comme l'était le texte écrit
// en dur dans le gabarit (apostrophes non échappées).

import { routes, type MaquetteFile } from './routes';

/* ------------------------------------------------------------------------------------------ */
/* Types                                                                                      */
/* ------------------------------------------------------------------------------------------ */

/** Publics des filtres (clés de la maquette). */
export type RepereAudience = 'vous' | 'equipes' | 'habitants' | 'eleves';

/** Filtre actif : un public, ou « tous ». */
export type RepereFilter = 'tous' | RepereAudience;

export type RepereStatus = 'disponible' | 'bientot';

export interface Repere {
  /** Identifiant stable (futur slug Directus). */
  id: string;
  /** Sur-titre de la carte : nature et durée (« Test · 5 minutes »). */
  type: string;
  titre: string;
  description: string;
  publics: RepereAudience[];
  statut: RepereStatus;
  /** Lien de la ressource (repères disponibles uniquement). */
  href?: string;
  /** Libellé de l'appel à l'action de la carte (repères disponibles uniquement). */
  cta?: string;
}

/** Lien interne : libellé et page cible (clé de src/data/routes.ts). */
export interface LienPage {
  label: string;
  page: MaquetteFile;
}

/** Affiche le bloc « En préparation » (voir le [À DÉCIDER] en tête de fichier). */
export const AFFICHER_BIENTOT = true;

/* ------------------------------------------------------------------------------------------ */
/* 1. Interface (filtres de la bibliothèque, formulaire de la lettre) : reste dans le code      */
/* ------------------------------------------------------------------------------------------ */

/** Boutons de filtre, dans l'ordre de la maquette. */
export const repereFilters: { key: RepereFilter; label: string }[] = [
  { key: 'tous', label: 'Tous les repères' },
  { key: 'vous', label: 'Pour vous' },
  { key: 'equipes', label: 'Pour vos équipes' },
  { key: 'habitants', label: 'Pour vos habitants' },
  { key: 'eleves', label: 'Pour vos élèves' },
];

const AUDIENCE_WORDS: Record<RepereAudience, string> = {
  vous: 'vous',
  equipes: 'vos équipes',
  habitants: 'vos habitants',
  eleves: 'vos élèves',
};

/** Ligne « Pour vous, vos équipes et vos habitants » d'une carte. */
export function pourLabel(publics: RepereAudience[]): string {
  const w = publics.map((a) => AUDIENCE_WORDS[a]);
  if (w.length === 1) return `Pour ${w[0]}`;
  return `Pour ${w.slice(0, -1).join(', ')} et ${w[w.length - 1]}`;
}

/** Un repère correspond-il au filtre ? */
export function matchesFilter(publics: readonly string[], filter: RepereFilter): boolean {
  return filter === 'tous' || publics.includes(filter);
}

/** Phrase annoncée sous les filtres (« Tous les repères : 4 repères disponibles, 6 en préparation. »). */
export function resumeLabel(filter: RepereFilter, disponibles: number, bientot: number): string {
  const nom = repereFilters.find((f) => f.key === filter)?.label ?? '';
  const n = disponibles > 1 ? ' repères disponibles' : ' repère disponible';
  return `${nom} : ${disponibles}${n}, ${bientot} en préparation.`;
}

/** Profils de la lettre mensuelle (« Vous êtes », facultatif). */
export const lettreProfils: { value: string; label: string }[] = [
  { value: 'particulier', label: 'Un particulier' },
  { value: 'entreprise', label: 'Une entreprise' },
  { value: 'collectivite', label: 'Une collectivité' },
  { value: 'etablissement', label: 'Un établissement scolaire' },
  { value: 'association', label: 'Une association' },
];

/* ------------------------------------------------------------------------------------------ */
/* 2. Contenus                                                                                */
/* ------------------------------------------------------------------------------------------ */

/** Title et meta description (commentaire SEO de la maquette). */
export const seo = {
  title: "Repères gratuits sur l'IA : tests, méthodes et fiches pratiques | M42.guide",
  description:
    "Reconnaître une arnaque, vérifier une image, poser des règles d'usage de l'IA : des outils gratuits et sans inscription, pour vous, vos équipes, vos habitants ou vos élèves.",
};

/** Fil d'Ariane (repris dans le BreadcrumbList du JSON-LD). La page courante n'a pas de lien. */
export const ariane: { label: string; page?: MaquetteFile }[] = [
  { label: 'Accueil', page: 'Main.dc.html' },
  { label: 'Repères' },
];

export const entete = {
  surTitre: 'Outils gratuits · Sans inscription',
  /** HTML. */
  titre: "Repères pour garder la main sur l'IA",
  chapo:
    'Des tests, des méthodes et des fiches à utiliser tout de suite : pour vous, pour vos équipes, pour les habitants de votre commune ou pour vos élèves. Chacun se lit ou se fait en quelques minutes, gratuitement.',
};

export const bibliotheque = {
  surTitre: 'La bibliothèque',
  titre: 'Disponibles maintenant',
  /** Nom de la liste des repères disponibles dans le JSON-LD (ItemList). */
  listeNom: 'Repères disponibles',
  bientot: {
    titre: 'En préparation',
    /** HTML. */
    chapo:
      "Ces repères sont en cours d'écriture et de vérification. Pour être prévenu de leur sortie, inscrivez-vous à la lettre ci-dessous.",
    /** Pastille des cartes « bientôt ». */
    badge: 'Bientôt',
    /** Marqueur affiché sur les cartes « bientôt ». */
    marqueur: '[À PRODUIRE]',
  },
};

/** Repères (future collection Directus `ressources`), dans l'ordre d'affichage. */
export const reperes: Repere[] = [
  {
    id: 'arnaque-ou-pas',
    type: 'Test · 5 minutes',
    titre: 'Arnaque ou pas ?',
    description:
      "Huit situations du quotidien : SMS, appels, messages. Pour chacune, la bonne réponse, l'indice qui trahit l'arnaque et la règle à retenir. Sans inscription.",
    publics: ['vous', 'equipes', 'habitants'],
    statut: 'disponible',
    href: routes['Sat-test-arnaque-ou-pas.dc.html'],
    cta: 'Faire le test',
  },
  {
    id: 'sensibiliser-equipes-ia',
    type: 'Guide · 8 minutes',
    titre: "Sensibiliser ses équipes à l'IA en 5 étapes",
    description:
      "Partir des usages réels, poser des règles vert, orange, rouge, réunir tout le monde, approfondir par métier, y revenir six mois plus tard. Avec un questionnaire prêt à l'emploi.",
    publics: ['equipes', 'habitants'],
    statut: 'disponible',
    href: routes['Sat-sensibiliser-equipes-ia.dc.html'],
    cta: 'Lire le guide',
  },
  {
    id: 'vrai-ou-faux-methode',
    type: 'Méthode · 4 étapes',
    titre: 'Vrai ou faux ? Vérifier une image ou une info',
    description:
      'La méthode simple pour ne plus se faire avoir par une fausse image, une fausse vidéo ou un faux site, directement sur son téléphone.',
    publics: ['vous', 'habitants', 'eleves'],
    statut: 'disponible',
    href: routes['Conf-desinformation-ia.dc.html'],
    cta: 'Découvrir la méthode',
  },
  {
    id: 'cinq-questions-conferencier',
    type: 'Liste · 5 questions',
    titre: 'Cinq questions pour choisir un conférencier IA',
    description:
      "Montre-t-il l'IA en direct ? Ses chiffres sont-ils sourcés ? Vend-il un outil ? Les questions à poser à tout intervenant, avant de signer.",
    publics: ['equipes'],
    statut: 'disponible',
    // La maquette pointe vers la page séminaire, section « cinq-questions » (note de production).
    href: `${routes['Sat-seminaire-entreprise.dc.html']}#cinq-questions`,
    cta: 'Lire les 5 questions',
  },
  {
    id: '10-reflexes-ia',
    type: 'Fiche à imprimer · 1 page',
    titre: "Les 10 réflexes face à l'IA",
    description:
      "Dix réflexes pour utiliser l'IA au quotidien sans s'y perdre, à afficher au bureau, en classe ou près de l'ordinateur.",
    publics: ['vous', 'equipes', 'habitants', 'eleves'],
    statut: 'bientot',
  },
  {
    id: 'charte-usage-ia',
    type: 'Modèle commenté',
    titre: "Modèle de charte d'usage de l'IA",
    description:
      'Une trame à adapter à une PME, un cabinet ou une collectivité, avec les règles vert, orange, rouge. Un point de départ, pas un conseil juridique.',
    publics: ['equipes'],
    statut: 'bientot',
  },
  {
    id: 'charte-numerique-famille',
    type: 'Modèle à remplir',
    titre: 'La charte numérique de la famille',
    description:
      'Écrans, réseaux, IA : des règles à fixer ensemble, parents et enfants, et à afficher à la maison.',
    publics: ['vous', 'eleves'],
    statut: 'bientot',
  },
  {
    id: 'fiche-bons-numeros',
    type: 'Fiche à imprimer',
    titre: 'La fiche des bons numéros',
    description:
      'Signaler un SMS frauduleux, se faire aider, faire opposition : les numéros utiles en gros caractères, à garder près du téléphone.',
    publics: ['vous', 'habitants'],
    statut: 'bientot',
  },
  {
    id: 'vrai-ou-ia',
    type: 'Quiz',
    titre: 'Vrai ou IA ?',
    description:
      "Des images, des voix et des articles à classer : authentiques ou générés par IA ? Uniquement des contenus créés pour l'occasion, sans aucun sujet politique.",
    publics: ['vous', 'habitants', 'eleves'],
    statut: 'bientot',
  },
  {
    id: 'seniors-arnaques-commune',
    type: 'Guide',
    titre: 'Protéger les seniors des arnaques dans sa commune',
    description:
      'Monter une action locale avec un CCAS, une médiathèque ou une association, et les financements possibles.',
    publics: ['habitants'],
    statut: 'bientot',
  },
];

/** Lettre mensuelle (section #lettre). Libellés du formulaire et messages : dans LettreSignup. */
export const lettre: {
  surTitre: string;
  titre: string;
  chapo: string;
  points: string[];
  nom: string;
  mention: { texte: string; lien: LienPage };
} = {
  surTitre: 'Une fois par mois',
  titre: 'Recevoir les nouveaux repères',
  chapo: 'Chaque nouveau repère, dès sa sortie, et une lettre courte qui se lit en trois minutes.',
  /** Ce que contient la lettre (numérotés 01 à 04 au rendu). */
  points: [
    'Un chiffre sourcé, expliqué en trois phrases.',
    "Une arnaque, une fausse image ou une erreur d'IA, décortiquée.",
    'Une règle à appliquer dans la semaine.',
    'Une ressource utile : un nouveau repère, ou un outil public (Cybermalveillance.gouv.fr, CNIL).',
  ],
  nom: 'Nom de la lettre : « Repères » [À VALIDER]',
  /** Mention sous le bouton : texte, puis lien vers la politique de confidentialité et un point. */
  mention: {
    texte:
      'Une lettre par mois, désinscription en un clic dans chaque envoi. Votre adresse sert uniquement à vous envoyer cette lettre. Responsable : [À COMPLÉTER : entité éditrice]. Détails et droits :',
    lien: { label: 'Politique de confidentialité', page: 'Confidentialite.dc.html' },
  },
};

/** Bandeau « Pour aller plus loin » (fin de page). Auteurs : « {avant} <a>{lien}</a>. » */
export const plusLoin: {
  label: string;
  texte: string;
  lien: LienPage;
  auteurs: { avant: string; lien: LienPage };
} = {
  /** Nom accessible de la section. */
  label: 'Pour aller plus loin',
  texte: 'Pour aller plus loin avec un groupe :',
  lien: { label: 'les conférences', page: 'Conferences.dc.html' },
  auteurs: {
    avant: 'Repères écrits et vérifiés par',
    lien: { label: 'Clara Peron et Paul Loustaunau', page: 'A-propos.dc.html' },
  },
};

/* ------------------------------------------------------------------------------------------ */
/* 3. Valeurs calculées (pas du contenu)                                                      */
/* ------------------------------------------------------------------------------------------ */

export const reperesDisponibles = reperes.filter((r) => r.statut === 'disponible');
export const reperesBientot = AFFICHER_BIENTOT ? reperes.filter((r) => r.statut === 'bientot') : [];
