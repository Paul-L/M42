// Satellite « secteur » (kit/maquette/Sat-experts-comptables.dc.html).
// Texte exact de la maquette, marqueurs [À …] conservés. Liens : URL de src/data/routes.ts.
//
// NOTES INTERNES DE LA MAQUETTE, NE PAS PUBLIER (12_growth_satellites, 3.b et 1.3) :
// - [À VÉRIFIER : une conférence M42 peut-elle compter dans les obligations de formation continue
//   des experts-comptables, et sous quelles conditions ?] Ne rien écrire sur ce point avant vérification.
// - [À VÉRIFIER : intitulé exact de l'instance régionale de l'Ordre pour la Nouvelle-Aquitaine et
//   calendrier de ses événements 2027.]
// - Ne citer aucun éditeur de logiciel comptable, ni en positif ni en négatif.
// - [À VÉRIFIER avant publication : que cette page ne recoupe ni le périmètre de l'employeur de Paul
//   ni une clause de non-concurrence.]
// - Les conférences « Garder la main » et « Le doute utile » n'ont pas de page en v1 : pas de lien
//   (11_architecture_seo, 1.3). Liens « fraude au président » et « modèle de charte » à ajouter dès
//   leur publication.

import { routes } from '../routes';
import type {
  Crumb,
  FaqItem,
  SatFigure,
  SatNumberedItem,
  SatRelatedLink,
  SatSeo,
  SatTable,
  SatTocItem,
} from './types';

export const seo: SatSeo = {
  path: routes['Sat-experts-comptables.dc.html'],
  title: 'Conférence IA pour experts-comptables et cabinets | M42.guide',
  description:
    "Usages de l'IA en cabinet, données clients, fraude au faux RIB : une conférence ou un atelier pour vos équipes, vos clients ou votre événement.",
};

export const crumbs: Crumb[] = [
  { label: 'Accueil', href: routes['Main.dc.html'] },
  { label: 'Entreprises', href: routes['Entreprises.dc.html'] },
  { label: 'Experts-comptables' },
];

export const hero = {
  eyebrow: 'Experts-comptables et cabinets',
  title: "L'IA en cabinet d'expertise comptable : des repères pour vos équipes et vos clients",
  lead: "Vos collaborateurs utilisent déjà l'IA pour chercher, rédiger, analyser. Vos clients vous demandent ce qu'ils doivent en penser. Et les fraudeurs s'en servent pour imiter un fournisseur ou un dirigeant. Le sujet peut se traiter dans votre cabinet, auprès de vos clients ou lors de vos événements professionnels.",
  primary: { label: 'Demander une proposition', href: routes['Contact.dc.html'] },
  secondary: { label: 'Voir les trois formats', href: '#formats' },
  audiences: {
    label: 'Trois publics, un même cadre',
    items: [
      { title: 'Vos équipes', detail: 'Réunion ou séminaire du cabinet' },
      { title: 'Vos clients dirigeants', detail: 'Petit-déjeuner, matinale' },
      { title: 'Votre profession', detail: 'Conférence régionale, commission, club' },
    ],
  },
};

export const toc: SatTocItem[] = [
  { href: '#constat', label: "Ce que l'on observe" },
  { href: '#enjeux', label: 'Trois enjeux du cabinet' },
  { href: '#formats', label: 'Trois formats' },
  { href: '#emporter', label: 'Ce que vos équipes emportent' },
  { href: '#intervenants', label: 'Qui intervient' },
  { href: '#faq', label: 'Questions fréquentes' },
];

const SVP_SOURCE =
  "Source : baromètre Groupe SVP, septembre 2026, 80 experts-comptables interrogés (L'Essentiel de l'Éco, 17 septembre 2026)";

export const findings = {
  eyebrow: "Ce que l'on observe",
  title: "Ce que l'on observe dans la profession",
  text: "Un baromètre publié en septembre 2026 (Groupe SVP, 80 experts-comptables interrogés) donne une tendance claire. Parmi les cabinets qui utilisent l'IA :",
  figures: [
    {
      value: '54 %',
      label: "laissent l'usage à l'initiative de chaque salarié, sans consigne de la direction.",
      source: SVP_SOURCE,
    },
    { value: '21 %', label: 'seulement ont posé un cadre.', source: SVP_SOURCE },
    {
      value: '60 %',
      label: "s'en servent déjà pour l'analyse, contre 28 % en 2024.",
      source: SVP_SOURCE,
    },
  ] satisfies SatFigure[],
  caution: {
    label: 'À lire avec prudence',
    text: "L'échantillon est réduit : c'est un signal, pas une mesure exacte. Mais il dit l'essentiel.",
  },
  quote: "L'IA est entrée dans les cabinets plus vite que les règles.",
};

export const stakes = {
  eyebrow: 'Vos enjeux',
  title: 'Trois enjeux propres au cabinet',
  items: [
    {
      title: 'Les données de vos clients',
      html: '<p>Bilans, fiches de paie, situations personnelles : ces informations sont couvertes par le secret professionnel <span class="sat-aside">[À VÉRIFIER : référence exacte du texte applicable aux experts-comptables]</span>. La DGSI recommande d\'anonymiser ce qu\'on confie à un outil d\'IA, sauf outil sécurisé encadré par l\'entreprise. Vos équipes doivent savoir, sans hésiter, ce qui ne sort jamais.</p><p class="sat-source">Source : La Banque Postale, « IA, fraude et entreprise : la DGSI alerte », février 2026.</p>',
    },
    {
      title: 'La fraude au virement, chez vous et chez vos clients',
      html: "<p>Changement de RIB d'un fournisseur, faux dirigeant pressé, et désormais voix ou visage imités par IA. Vos équipes traitent des paiements. Vos clients vous appellent quand le doute arrive, ou trop tard. Une procédure simple, connue de tous, vaut mieux qu'un logiciel de plus.</p>",
    },
    {
      title: 'La réponse parfaite et fausse',
      html: "<p>Une IA peut résumer un texte fiscal ou social avec aplomb, et se tromper. Sur un dossier client, l'erreur engage le cabinet. La démonstration en direct montre comment repérer la faille, avec quatre questions à se poser avant de valider une réponse.</p>",
    },
  ] satisfies SatNumberedItem[],
};

export const formats = {
  eyebrow: 'Les formats',
  title: "Trois occasions d'en parler",
  table: {
    caption: 'Trois occasions, trois formats',
    columns: ['Occasion', 'Format', 'Sujet proposé'],
    rows: [
      {
        head: 'Réunion ou séminaire du cabinet',
        cells: [
          'Conférence de 1 h 30 ou atelier de 2 h',
          "« Garder la main », version cabinet : tri des tâches, données clients, règles d'équipe",
        ],
      },
      {
        head: 'Événement pour vos clients <span class="sat-th-sub">Petit-déjeuner, matinale</span>',
        cells: [
          'Keynote de 45 min à 1 h',
          '« Fraude au virement 2026 : protéger votre entreprise ». Un service concret que le cabinet offre à ses clients dirigeants',
        ],
      },
      {
        head: 'Événement de la profession <span class="sat-th-sub">Conférence régionale, commission, club</span>',
        cells: [
          'Keynote de 45 min',
          "« Le doute utile » : l'esprit critique, compétence qui prend de la valeur à l'ère de l'IA",
        ],
      },
    ],
  } satisfies SatTable,
};

export const takeaways = {
  eyebrow: 'Ce qui reste après',
  title: 'Ce que vos équipes emportent',
  items: [
    { strong: "Une trame de charte d'usage de l'IA", rest: ' adaptée à un cabinet.' },
    {
      strong: 'Une procédure de vérification',
      rest: " d'une demande de paiement ou de changement de coordonnées bancaires.",
    },
    {
      strong: 'Les quatre questions',
      rest: ' à se poser avant de valider une réponse produite par une IA.',
    },
  ],
};

export const speakers = {
  title: 'Qui intervient',
  text: "Clara Peron, formatrice d'adultes et conseillère en insertion professionnelle, et Paul Loustaunau, 17 ans de développement logiciel, qui conçoit et déploie des systèmes d'IA en entreprise.",
  link: { label: 'Leur parcours et leur démarche', href: routes['A-propos.dc.html'] },
  placeholder: "[À COMPLÉTER : première intervention auprès d'un cabinet, avec accord écrit]",
};

export const faq = {
  eyebrow: 'Questions fréquentes',
  title: 'Vos questions de cabinet',
  items: [
    {
      question: 'Devez-vous accéder à nos logiciels ou à nos dossiers ?',
      answer:
        '<p>Non. Nous travaillons sur des exemples fictifs ou des cas que vous aurez anonymisés. Un engagement de confidentialité peut être signé avant le cadrage.</p>',
    },
    {
      question: 'Présentez-vous des logiciels ou des outils particuliers ?',
      answer:
        "<p>Non. Nous ne représentons aucun éditeur. Les règles et méthodes que nous transmettons valent quel que soit l'outil utilisé dans votre cabinet.</p>",
    },
    {
      question: 'Pouvez-vous intervenir auprès de nos clients, sous le nom du cabinet ?',
      answer:
        "<p>Oui. C'est même l'un des formats les plus utiles. Nous préparons le contenu avec vous, selon le profil de vos clients (TPE, artisans, professions libérales, PME).</p>",
    },
  ] satisfies FaqItem[],
};

export const related: SatRelatedLink[] = [
  {
    label: 'Conférences et ateliers pour les entreprises',
    href: routes['Entreprises.dc.html'],
    description: "Formats, sujets et déroulé d'une intervention.",
  },
  {
    label: 'Arnaques et IA',
    href: routes['Conf-arnaques-ia.dc.html'],
    description: 'Avec sa déclinaison pour les équipes : « Fraude au président, version 2026 ».',
  },
  {
    label: "Comment sensibiliser vos équipes à l'IA",
    href: routes['Sat-sensibiliser-equipes-ia.dc.html'],
    description: 'La méthode en 5 étapes, avec les règles vert, orange, rouge.',
  },
  {
    label: 'Une conférence IA pour votre séminaire',
    href: routes['Sat-seminaire-entreprise.dc.html'],
    description: "La keynote « Voir clair dans l'IA » et les conseils d'organisation.",
  },
];

export const sources: string[] = [
  "L'Essentiel de l'Éco, « Experts-comptables : l'IA avance plus vite que les cabinets », 17 septembre 2026 (baromètre Groupe SVP).",
  'La Banque Postale, « IA, fraude et entreprise : la DGSI alerte », février 2026.',
];

export const cta = {
  eyebrow: 'Votre cabinet',
  title: 'Parlons de votre cabinet.',
  lead: 'Dites-nous qui vous voulez réunir : vos équipes, vos clients ou votre réseau. Proposition et devis sous 48 h.',
  primary: { label: 'Demander une proposition', href: routes['Contact.dc.html'] },
  secondary: { label: "Voir l'offre Entreprises", href: routes['Entreprises.dc.html'] },
};
