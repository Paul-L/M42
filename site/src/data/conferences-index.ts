// Index des conférences (kit/maquette/Conferences.dc.html → /conferences/).
// Textes repris mot pour mot de la maquette. En phase 3, les cartes viendront de la collection
// Directus `conferences` ; le reste (formats, déroulement, sur mesure, FAQ) d'un enregistrement `pages`.
//
// Identité des conférences (slug, chiffre romain, titre, URL, signature) : catalogue.ts (lecture seule).
// Les cartes « riches » de cette page demandent des champs absents de catalogue.ts : accroche,
// promesse, publics propres à l'index, formats détaillés, programme minuté, lignes de détail.
// Ils sont ici, rangés par slug, en attendant d'être consolidés dans le type Conference.

import { catalogue } from './conferences/catalogue';
import { routes } from './routes';
import type { CarteConference, Format, Lien, Public, QuestionFaq } from './conferences/types';

export const SITE = 'https://m42.guide';
export const URL_PAGE = `${SITE}${routes['Conferences.dc.html']}`;

export const seo = {
  title: "Conférences sur l'intelligence artificielle | M42",
  description:
    "Quatre conférences sur l'IA, du keynote de 45 min à l'atelier de 2 h : usages, arnaques, fausses infos, parents et ados. Ou une intervention sur mesure.",
};

export const hero = {
  surTitre: "Conférences sur l'intelligence artificielle",
  titre: "L'IA expliquée à votre public",
  chapo:
    "Votre public utilise déjà l'IA, ou s'en méfie. Quatre conférences pour lui donner des repères, de la plénière d'un congrès à la salle du conseil municipal. Chacune existe en keynote, en conférence, en atelier ou en cycle. Pour tout autre sujet lié à l'IA, une intervention sur mesure est possible.",
  ctaPrincipal: { label: 'Parler de votre événement', href: routes['Contact.dc.html'] },
  ctaSecondaire: { label: 'Comparer les formats', href: '#formats' },
  coupDoeil: {
    label: "Les conférences en un coup d'œil",
    surTitre: "En un coup d'œil",
    surMesure: { label: 'Sur mesure', href: '#sur-mesure' },
  },
};

/** Ligne de programme minutée (« Au programme »). */
export interface LigneProgramme {
  titre: string;
  duree: string;
}

/** Ligne de détail de la carte (« Temps fort : … »). */
export interface DetailCarte {
  label: string;
  texte: string;
}

/** Champs propres aux cartes de l'index, absents de catalogue.ts. */
export interface DetailConference {
  accroche: string;
  promesse: string;
  publics: string[];
  programme: LigneProgramme[];
  details: DetailCarte[];
}

/** Carte complète : identité (catalogue.ts) + détails de l'index. */
export type CarteIndex = CarteConference & DetailConference;

const FORMATS_DETAILLES = [
  'Keynote 45 min à 1 h',
  'Conférence 1 h 30',
  'Atelier 2 h',
  'Cycle de 4 rendez-vous',
];

export const formatsDetailles = FORMATS_DETAILLES.join(' · ');

const details: Record<string, DetailConference> = {
  'ia-au-quotidien': {
    accroche: "Ce qu'elle sait faire, ce qu'elle invente, et comment garder la tête aux commandes.",
    promesse:
      "Vos participants repartent en sachant quand l'IA les aide, quand elle les trompe, et comment rester ceux qui décident.",
    publics: ['Grand public', 'Collectivités', 'Entreprises', 'Événements'],
    programme: [
      { titre: "Ce qu'elle est vraiment", duree: '15 min' },
      { titre: 'Les bons usages', duree: '20 min' },
      { titre: 'Garder son cerveau aux commandes', duree: '15 min' },
      { titre: 'Les méthodes des pros, version maison', duree: '15 min' },
      { titre: 'Vos données, votre vie privée', duree: '10 min' },
    ],
    details: [
      {
        label: 'Temps fort',
        texte: "« L'erreur sûre d'elle », une source inventée démasquée devant la salle.",
      },
      {
        label: 'Version keynote',
        texte: '45 minutes, trois règles, pour ouvrir un séminaire ou un congrès.',
      },
      { label: 'En entreprise', texte: "« L'IA au bureau, les bons réflexes »." },
    ],
  },
  'arnaques-ia': {
    accroche: 'Voix clonées, faux conseillers, faux SMS : reconnaître le piège à temps.',
    promesse:
      "Des règles simples, décidées à l'avance, qui protègent même face à une arnaque très bien imitée.",
    publics: ['Seniors & aidants', 'Collectivités', 'Associations', 'Entreprises'],
    programme: [
      { titre: 'Le paysage 2026', duree: '10 min' },
      { titre: "Anatomie d'une arnaque", duree: '20 min' },
      { titre: 'Le jeu « Arnaque ou pas ? »', duree: '20 min' },
      { titre: 'Mes règles non négociables', duree: '20 min' },
      { titre: "Si c'est arrivé : les bons numéros", duree: '10 min' },
    ],
    details: [
      { label: 'Temps fort', texte: "le jeu « Arnaque ou pas ? » et l'anatomie d'un faux SMS." },
      { label: 'À emporter', texte: 'ses règles non négociables et les bons numéros.' },
      { label: 'En entreprise', texte: '« Fraude au président, version 2026 ».' },
    ],
  },
  'desinformation-ia': {
    accroche:
      "Fausses images, fausses vidéos, faux sites d'information : une méthode pour vérifier en quatre étapes.",
    promesse:
      'Une méthode courte pour vérifier une information avant de la croire ou de la partager. Strictement neutre.',
    publics: ['Écoles & familles', 'Collectivités', 'Événements'],
    programme: [
      { titre: "Le faux s'est industrialisé", duree: '15 min' },
      { titre: 'Pourquoi ça marche sur nous tous', duree: '15 min' },
      { titre: 'Le jeu « Vrai ou IA ? »', duree: '20 min' },
      { titre: 'La méthode en 4 étapes', duree: '25 min' },
      { titre: 'Questions et cas de la salle', duree: '15 min' },
    ],
    details: [
      {
        label: 'Temps fort',
        texte:
          "le jeu « Vrai ou IA ? », puis la vérification en direct d'un contenu proposé par la salle.",
      },
      {
        label: 'La règle',
        texte: 'des mécanismes et des sources officielles, jamais de contenu partisan.',
      },
      { label: 'En entreprise', texte: '« Rumeurs, faux contenus et réputation ».' },
    ],
  },
  'parents-ados-ia': {
    accroche: 'Devoirs, réseaux sociaux, cyberharcèlement : des règles de famille qui tiennent.',
    promesse:
      "Une charte numérique familiale, écrite par les parents, adaptée à l'âge de leurs enfants.",
    publics: ['Écoles & familles', 'Associations', 'Collectivités'],
    programme: [
      { titre: 'Ce que vivent vos enfants', duree: '15 min' },
      { titre: "Les devoirs avec l'IA, sans tricher", duree: '20 min' },
      { titre: 'Réseaux sociaux et cyberharcèlement', duree: '20 min' },
      { titre: 'Les règles de famille', duree: '20 min' },
      { titre: 'Questions', duree: '15 min' },
    ],
    details: [
      { label: 'Temps fort', texte: 'la charte numérique de la famille, rédigée sur place.' },
      {
        label: 'Le bon numéro',
        texte: 'le 3018, gratuit et anonyme, contre le cyberharcèlement.',
      },
      { label: 'En entreprise', texte: "« Parents connectés », à l'heure du déjeuner." },
    ],
  },
};

/** Les quatre cartes, dans l'ordre du catalogue (I à IV). */
export const cartes: CarteIndex[] = catalogue.map((c) => {
  const d = details[c.slug];
  if (!d) throw new Error(`conferences-index : détails manquants pour « ${c.slug} »`);
  return { ...c, ...d };
});

export const catalogueSection = {
  surTitre: 'Catalogue',
  titre: 'Quatre conférences, un même fil',
  chapo:
    "Comprendre ce que fait l'IA, s'en servir avec méthode, et garder la main. Chaque conférence part du quotidien de votre public.",
  ctaCarte: 'Voir le programme complet',
  badgeSignature: 'Conférence signature',
};

export const formats: {
  titre: string;
  chapo: string;
  items: Format[];
  choix: {
    titre: string;
    colonnes: [string, string];
    lignes: { evenement: string; format: Lien | string }[];
  };
} = {
  titre: 'Quatre formats pour chaque conférence',
  chapo:
    "De la plénière d'un congrès à l'atelier de quinze personnes. Interventions en français, partout en France, en présentiel ou à distance.",
  items: [
    {
      duree: '45 min à 1 h',
      titre: 'Keynote ou intervention plénière',
      texte:
        'Pour ouvrir ou clore un séminaire, une convention, un congrès. Une idée forte, des démonstrations, un jeu avec la salle.',
    },
    {
      duree: '1 h 30',
      titre: 'Conférence',
      texte:
        "Le programme complet en cinq parties, avec un temps d'échange. Jauge selon la salle [À VALIDER : jauge maximale testée].",
    },
    {
      duree: '2 h',
      titre: 'Atelier pratique',
      texte:
        '15 personnes, des mises en situation : chacun repart avec ses propres règles écrites. Au-delà de 2 h : demi-journée sur mesure.',
    },
    {
      duree: '4 rendez-vous',
      titre: 'Cycle',
      texte:
        'Quatre séances pour un groupe stable, pour aller plus loin à son rythme [À VALIDER : rythme].',
    },
  ],
  choix: {
    titre: 'Quel format pour quel moment ?',
    colonnes: ['Votre événement', 'Format conseillé'],
    lignes: [
      {
        evenement: 'Ouverture ou clôture de séminaire, convention, congrès, salon',
        format: 'Keynote',
      },
      {
        evenement: 'Soirée pour les habitants, médiathèque, réunion de parents',
        format: 'Conférence',
      },
      { evenement: 'Équipe, service, club, groupe de bénévoles', format: 'Atelier' },
      {
        evenement: "Programme sur l'année : résidence, association, médiathèque",
        format: 'Cycle',
      },
      {
        evenement: 'Journée pédagogique, demi-journée de sensibilisation des salariés',
        format: { label: 'Sur mesure', href: '#sur-mesure' },
      },
    ],
  },
};

/** Point de « Comment ça se passe » : texte, puis lien facultatif suivi d'un point. */
export interface PointDeroulement {
  numero: string;
  titre: string;
  texte: string;
  lien?: Lien;
}

export const deroulement: { surTitre: string; titre: string; items: PointDeroulement[] } = {
  surTitre: 'Sur scène',
  titre: 'Comment ça se passe',
  items: [
    {
      numero: '01',
      titre: 'Qui intervient',
      texte:
        "Clara Peron, formatrice d'adultes, pour la pédagogie et le passage à l'action ; Paul Loustaunau pour la technique et les démonstrations en direct.",
      lien: { label: 'Parcours et démarche', href: routes['A-propos.dc.html'] },
    },
    {
      numero: '02',
      titre: 'Des repères, pas des promesses',
      texte:
        'Aucun gain chiffré, aucune garantie de résultat. Des repères, des méthodes et des règles concrètes, avec des sources vérifiées et citées.',
    },
    {
      numero: '03',
      titre: 'Une installation simple',
      texte:
        "Deux micros sans fil, un vidéoprojecteur et une connexion internet, 30 minutes d'installation.",
      lien: {
        label: "Fiche technique dans l'espace organisateurs",
        href: routes['Organisateurs.dc.html'],
      },
    },
  ],
};

export const surMesure = {
  surTitre: 'Sur mesure',
  titre: 'Un public, un enjeu, un format précis ?',
  chapo:
    "Séminaire, convention, sensibilisation d'une équipe, journée pédagogique : l'intervention se construit avec vous, sur tout sujet lié de près ou de loin à l'IA.",
  renvoiAvant:
    "Pour les entreprises et les grands événements, d'autres sujets existent sur demande :",
  renvoi: {
    label: 'voir les exemples de sujets pour les entreprises',
    href: routes['Entreprises.dc.html'],
  },
  cta: { label: 'Construire votre intervention', href: routes['Contact.dc.html'] },
};

export const pourQui: { titre: string; chapo: string; items: Public[] } = {
  titre: 'Pour quel public ?',
  chapo: 'Les mêmes conférences, des exemples et des formats adaptés à chaque structure.',
  items: [
    {
      titre: 'Entreprises & dirigeants',
      href: routes['Entreprises.dc.html'],
      texte:
        "Séminaires, conventions, sensibilisation des équipes : faire de l'IA un outil maîtrisé, ni gadget ni risque.",
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
      titre: 'Associations & accompagnement',
      href: routes['Associations.dc.html'],
      texte:
        'Donner aux bénévoles, aux professionnels et aux personnes accompagnées des repères simples et rassurants.',
    },
  ],
};

export const faq: { titre: string; items: QuestionFaq[] } = {
  titre: 'Choisir sa conférence',
  items: [
    {
      question: 'Quelle conférence choisir pour notre public ?',
      reponse:
        "<p>Partez de votre public et de son besoin. Pour découvrir l'IA et bien s'en servir : « L'IA au quotidien ». Pour se protéger des escroqueries : « Arnaques et IA ». Pour s'informer sans se faire piéger : « Vrai ou faux ? ». Pour les familles : « Parents, ados et IA ». En cas de doute, décrivez-nous votre public : nous vous conseillons sous 48 h.</p>",
    },
    {
      question: 'Peut-on combiner deux thèmes ?',
      reponse:
        "<p>Oui. Un cycle de 4 rendez-vous peut aborder plusieurs thèmes, et une intervention sur mesure peut reprendre des parties de plusieurs conférences, par exemple les bons usages de l'IA et les arnaques pour un public de seniors. Le programme se construit alors avec vous, à partir de qui sera dans la salle et du temps disponible.</p>",
    },
    {
      question: 'Combien de participants peut-on accueillir ?',
      reponse:
        "<p>Pour les conférences et les keynotes, la jauge dépend de la salle et de son équipement : l'intervention s'adapte à votre lieu [À VALIDER : jauge maximale testée]. Les ateliers pratiques sont limités à 15 personnes, pour que chacun puisse manipuler, poser ses questions et repartir avec ses propres règles écrites.</p>",
    },
    {
      question: 'Intervenez-vous partout en France ?',
      reponse:
        '<p>Oui, partout en France, en présentiel ou à distance. Les intervenants sont basés dans le Sud-Ouest, et les frais de déplacement éventuels sont indiqués dès le devis. Toutes les interventions se font en français.</p>',
    },
    {
      question: 'De quoi avez-vous besoin sur place ?',
      reponse:
        "<p>Deux micros sans fil, un vidéoprojecteur HDMI avec écran, une connexion internet (filaire de préférence, Wi-Fi si le public vote depuis son téléphone), un retour écran si possible, et 30 minutes d'installation. La fiche technique complète est disponible dans l'espace organisateurs.</p>",
    },
  ],
};

export const contact = {
  titre: 'Parlons de votre projet',
  chapo:
    'Conférence, keynote, atelier ou intervention sur mesure : dites-nous qui sera dans la salle, quand, et ce que vous attendez. Nous vous répondons sous 48 h.',
  cta: 'Organiser une intervention',
};

/**
 * JSON-LD (commentaire SEO de la maquette) : CollectionPage (sous-type de WebPage) + BreadcrumbList
 * + ItemList des 4 Service, référencés par leur @id (déclarés en entier sur chaque page conférence).
 * Aucun nom d'employeur ni structure de facturation ; aucun marqueur [À …].
 */
export function conferencesIndexJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${URL_PAGE}#page`,
        url: URL_PAGE,
        name: seo.title,
        description: seo.description,
        isPartOf: { '@id': `${SITE}/#site` },
        breadcrumb: { '@id': `${URL_PAGE}#ariane` },
        mainEntity: { '@id': `${URL_PAGE}#conferences` },
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${URL_PAGE}#ariane`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Conférences' },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${URL_PAGE}#conferences`,
        name: catalogueSection.titre,
        numberOfItems: cartes.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: cartes.map((c, i) => {
          const url = new URL(c.href, SITE).href;
          return {
            '@type': 'ListItem',
            position: i + 1,
            name: c.titre,
            url,
            item: { '@id': `${url}#service` },
          };
        }),
      },
    ],
  };
}
