// Contenus de la conférence IV « Parents, ados et IA » (kit/maquette/Conf-parents-ados-ia.dc.html).
// Forme : voir ./types.ts (collection Directus `conferences`, phase 3).
//
// Notes de production de la maquette (commentaire SEO) :
// - Précaution 04 : le +138 % de cyberharcèlement vaut pour tous les âges (« tous âges confondus »).
// - FAQ pass Culture volontairement absente (décision n° 7 de 05).
//
// Champs propres à cette page, absents du type Conference (à intégrer au type en phase 3) :
// `friseJournee` (heures de la frise de l'animation), `charteFamille` (temps fort),
// `bonNumero` (bande nuit « 3018 »).

import { routes } from '../routes';
import type { Conference } from './types';

export const parentsAdosIa: Conference = {
  slug: 'parents-ados-ia',
  numero: 'IV',
  disponibilite: 'catalogue',
  titre: 'Parents, ados et IA',
  seo: {
    title: 'Conférence parents, ados et IA : repères en famille | M42',
    description:
      "Devoirs avec l'IA sans tricher, réseaux sociaux, cyberharcèlement : des repères clairs pour parents, élèves et enseignants, et une charte familiale.",
  },
  surTitre: 'Conférence IV · Parents, adolescents et intelligence artificielle',
  sousTitre: 'Devoirs, réseaux sociaux, cyberharcèlement : des règles de famille qui tiennent.',
  promesse:
    "Vous repartez avec une charte numérique familiale, écrite par vous, adaptée à l'âge de vos enfants.",
  ctaSecondaire: { label: "Suivre une journée d'ado", href: '#demonstration' },
  miseAJour: '[À COMPLÉTER : date]',
  fiche: [
    {
      label: 'Pour qui',
      valeur:
        "Parents, associations de parents d'élèves, collèges et lycées, centres sociaux, communes, CAF, médiathèques",
    },
    {
      label: 'Formats',
      valeur: 'Keynote 45 min à 1 h · Conférence 1 h 30 · Atelier 2 h · Cycle de 4 rendez-vous',
    },
    { label: 'Participants', valeur: 'Selon la salle · 15 en atelier, parents et ados ensemble' },
    { label: 'Où', valeur: 'Partout en France, en présentiel ou à distance · en français' },
  ],

  demonstration: {
    label: "Démonstration : une journée d'ado, de l'écran du matin à celui du soir",
    surTitre: "Démonstration · Une journée d'ado",
    k: 3.8,
    etapes: [
      {
        kicker: '7 h 10 · Le réveil',
        titre: "La journée commence sur l'écran.",
        texte:
          'Vingt-trois messages du groupe de classe, des vidéos, un jeu : tout est arrivé pendant la nuit, parce que le téléphone a dormi dans la chambre.',
        repere: 'le téléphone dort hors de la chambre.',
      },
      {
        kicker: '8 h 05 · Le trajet',
        titre: 'Une photo truquée circule.',
        texte:
          "Dans le groupe de classe, une image modifiée d'un camarade fait rire. Elle a été fabriquée en quelques secondes avec une IA. C'est déjà du cyberharcèlement.",
        repere: 'on ne transfère pas, on en parle. Le 3018 est gratuit et anonyme.',
      },
      {
        kicker: '17 h 30 · Les devoirs',
        titre: "L'IA qui fait à la place, ou celle qui explique ?",
        texte:
          "La même IA peut écrire la rédaction ou aider à la construire. Le cadre de l'Éducation nationale est clair : un devoir fait par une IA sans autorisation est une fraude.",
        repere: "je réfléchis d'abord, l'IA ensuite.",
      },
      {
        kicker: '19 h 45 · Le dîner',
        titre: 'Les écrans en pause, ceux des parents aussi.',
        texte:
          "Une règle tient mieux quand toute la famille l'applique. Les parents s'engagent, eux aussi.",
        repere: "pas d'écran à table, pour personne.",
      },
      {
        kicker: '22 h 40 · Le soir',
        titre: 'Un inconnu insiste.',
        texte:
          "Un compte inconnu, très gentil, demande une photo. C'est souvent ainsi que commencent le chantage et le harcèlement.",
        repere: "ce qu'on n'envoie jamais. Et on peut tout dire, sans être puni.",
      },
      {
        kicker: 'Le soir même',
        titre: 'Cinq repères, écrits ensemble.',
        texte:
          "Lieux, horaires, devoirs, ce qu'on ne publie jamais, l'engagement des parents : la charte se construit avec les enfants, pas contre eux.",
        repere: 'le modèle est fourni ; chaque famille la complète à la maison.',
      },
    ],
  },

  enClair:
    "Depuis juin 2025, le cadre d'usage de l'Éducation nationale autorise l'IA générative en classe à partir de la 4e, encadrée par l'enseignant ; un devoir fait par une IA sans autorisation est une fraude. En cas de cyberharcèlement, le 3018 est gratuit et anonyme.",
  objectifs: {
    titre: 'Ce que vous saurez faire en rentrant',
    items: [
      "À la fin, vous saurez distinguer une aide aux devoirs par l'IA qui fait progresser d'une aide qui fait tricher.",
      'À la fin, vous saurez repérer les signes de cyberharcèlement, et qui appeler (3018).',
      "À la fin, vous saurez construire avec vos enfants des règles de famille qu'ils comprennent et respectent.",
    ],
  },

  chiffres: {
    label: 'Repères chiffrés',
    items: [
      {
        valeur: '120 000',
        texte:
          'Plus de 120 000 sollicitations ont été reçues en 2025 par le 3018, le numéro national contre le harcèlement et les violences numériques.',
        source: 'Source : Association e-Enfance / 3018, rapport annuel 2025 (juin 2026)',
        accent: true,
      },
      {
        valeur: '4e',
        texte:
          "C'est à partir de cette classe que l'IA générative peut être utilisée en cours, encadrée par l'enseignant.",
        source:
          "Source : Cadre d'usage de l'IA en éducation, juin 2025, d'après Banque des Territoires",
      },
      {
        valeur: '+138 %',
        texte:
          "de demandes d'aide pour cyberharcèlement reçues par Cybermalveillance.gouv.fr en 2025, tous âges confondus.",
        source: "Source : Cybermalveillance.gouv.fr, rapport d'activité 2025 (mars 2026)",
      },
    ],
  },

  programme: {
    surTitre: 'Programme · conférence de 1 h 30',
    titre: "Ce que l'on voit ensemble",
    chapo:
      'Ni morale, ni promotion des écrans : des repères sourcés, des démonstrations, et des règles que les enfants comprennent.',
    blocs: [
      {
        titre: 'Ce que vivent vos enfants',
        duree: '15 min',
        texte:
          "Usages réels des ados, et ce que dit l'école : le cadre d'usage de l'Éducation nationale (juin 2025) autorise l'IA générative en classe à partir de la 4e, encadrée par l'enseignant ; un devoir fait par l'IA sans autorisation est une fraude.",
      },
      {
        titre: "Les devoirs avec l'IA, sans tricher",
        duree: '20 min',
        texte:
          "Démonstration : l'IA qui fait à la place, puis l'IA qui explique, interroge, corrige. Règle : « Je réfléchis d'abord, l'IA ensuite. »",
      },
      {
        titre: 'Réseaux sociaux et cyberharcèlement',
        duree: '20 min',
        texte:
          'Fausses images de camarades, chantage, moqueries. Les signes qui doivent alerter. Le 3018, gratuit et anonyme.',
      },
      {
        titre: 'Les règles de famille',
        duree: '20 min',
        texte: "Âges, lieux, horaires, ce qu'on ne publie jamais. Les parents aussi s'engagent.",
      },
      {
        titre: 'Questions',
        duree: '15 min',
        texte: 'Cas concrets de la salle.',
      },
    ],
  },

  tempsFort: {
    id: 'charte',
    titre: 'La charte numérique de la famille',
    chapo:
      "Rédigée sur place à partir d'un modèle fourni, puis complétée à la maison, avec les enfants. Chacun la signe, parents compris.",
    note: 'Modèle téléchargeable [À PRODUIRE].',
  },

  formats: {
    titre: 'Quatre façons de la programmer',
    items: [
      {
        duree: '45 min à 1 h',
        titre: 'Keynote ou intervention plénière',
        texte:
          "Les devoirs avec l'IA, les réseaux sociaux et le cyberharcèlement, les règles de famille, en version courte.",
      },
      {
        duree: '1 h 30',
        titre: 'Conférence',
        texte:
          'Le programme complet en cinq parties, avec les cas concrets de la salle. Jauge selon la salle [À VALIDER : jauge maximale testée].',
      },
      {
        duree: '2 h',
        titre: 'Atelier pratique',
        texte: 'Parents et ados ensemble, 15 personnes : chacun rédige une partie de la charte.',
      },
      {
        duree: '4 rendez-vous',
        titre: 'Cycle',
        texte:
          'Le programme réparti sur quatre séances, pour un groupe stable de parents [À VALIDER : rythme et déroulé].',
      },
    ],
  },

  publics: {
    titre: 'Là où les parents se retrouvent',
    chapo: "À l'école, dans la commune, dans une association, et même au travail.",
    items: [
      {
        titre: "Collèges, lycées & parents d'élèves",
        href: routes['Education.dc.html'],
        texte:
          "Une soirée pour les parents, ou une intervention auprès des élèves adaptée au cadre fixé par l'établissement.",
      },
      {
        titre: 'Communes, CAF & centres sociaux',
        href: routes['Collectivites.dc.html'],
        texte:
          'Une conférence ouverte aux familles, en médiathèque ou au centre social, avec la charte à emporter.',
      },
      {
        titre: 'Associations',
        href: routes['Associations.dc.html'],
        texte:
          'Pour les associations familiales et de parents : un atelier où parents et ados écrivent ensemble leurs règles.',
      },
    ],
  },

  declinaisonEntreprise: {
    titre: 'Parents connectés',
    texte:
      "Une conférence à l'heure du déjeuner pour les salariés parents, proposée par le CSE ou la direction des ressources humaines, dans le cadre de la qualité de vie au travail. Format court de 45 minutes, et charte familiale à emporter.",
    lien: {
      label: 'Proposer « Parents connectés » à vos salariés',
      href: routes['Entreprises.dc.html'],
    },
  },

  faq: {
    titre: 'Avant de programmer cette conférence',
    items: [
      {
        question: 'Les adolescents peuvent-ils venir avec leurs parents ?',
        reponse:
          "<p>Oui, et c'est souvent le plus efficace. La conférence s'adresse d'abord aux parents, mais l'atelier est conçu pour les parents et les ados ensemble : chacun rédige une partie de la charte. Pour une intervention auprès des élèves seuls, en classe, le contenu est adapté à leur niveau et au cadre fixé par l'établissement.</p>",
      },
      {
        question: "L'IA est-elle autorisée pour les devoirs ?",
        reponse:
          "<p>Le cadre d'usage publié par l'Éducation nationale en juin 2025 autorise l'IA générative en classe à partir de la 4e, encadrée par l'enseignant. Un devoir réalisé par une IA sans autorisation est considéré comme une fraude. La conférence montre la différence entre l'IA qui fait à la place et l'IA qui explique, interroge et corrige.</p>",
      },
      {
        question: 'Que faire si mon enfant est victime de cyberharcèlement ?',
        reponse:
          "<p>L'écouter sans le juger ni le punir, conserver les preuves (captures d'écran), ne pas répondre à l'auteur, et appeler le 3018, gratuit et anonyme, qui conseille les jeunes et leurs parents. Prévenir aussi l'établissement scolaire si des élèves sont en cause. La conférence détaille les signes qui doivent alerter, parfois discrets.</p>",
      },
      {
        question: "La conférence conseille-t-elle d'interdire les écrans ?",
        reponse:
          "<p>Non. Ni morale, ni promotion des écrans : des repères sourcés et une méthode pour fixer des règles avec ses enfants plutôt que contre eux : âges, lieux, horaires, ce qu'on ne publie jamais. Les parents s'engagent aussi. Chaque famille repart avec sa propre charte, adaptée à l'âge de ses enfants.</p>",
      },
      {
        question: 'Peut-on la proposer à nos salariés ?',
        reponse:
          "<p>Oui, c'est la déclinaison « Parents connectés » : une conférence de 45 minutes à l'heure du déjeuner, proposée par le CSE ou la direction des ressources humaines, dans le cadre de la qualité de vie au travail. Les salariés parents repartent avec les repères essentiels et la charte familiale à compléter à la maison.</p>",
      },
    ],
    sources: [
      {
        avant: 'Association e-Enfance / 3018, ',
        titre: "Rapport annuel 2025 : 20 ans d'action pour protéger les enfants",
        apres: ', juin 2026.',
        url: 'https://e-enfance.org/en/2025-annual-report-on-the-digital-protection-of-minors/',
      },
      {
        avant: 'Banque des Territoires, ',
        titre: "IA en éducation : ce que prévoit le cadre d'usage pour la communauté éducative",
        apres:
          ", juin 2025 (cadre publié par le ministère de l'Éducation nationale le 14 juin 2025).",
        url: 'https://www.banquedesterritoires.fr/ia-en-education-ce-que-prevoit-le-cadre-dusage-pour-la-communaute-educative',
      },
      {
        avant: "Commission d'experts sur l'impact de l'exposition des jeunes aux écrans, ",
        titre: 'Enfants et écrans. À la recherche du temps perdu',
        apres: ', avril 2024.',
        url: 'https://www.elysee.fr/emmanuel-macron/2024/04/30/remise-du-rapport-de-la-commission-dexperts-sur-limpact-de-lexposition-des-jeunes-aux-ecrans',
      },
      {
        avant: 'Cybermalveillance.gouv.fr, ',
        titre: "Rapport d'activité 2025",
        apres:
          ' (communiqué de presse), mars 2026 : +138 % de demandes liées au cyberharcèlement, tous âges confondus.',
        url: 'https://www.cybermalveillance.gouv.fr/medias/2026/03/CP-RA2026.pdf',
      },
    ],
  },

  contact: {
    titre: 'Programmer « Parents, ados et IA » près de chez vos familles',
    chapo:
      'École, commune, association ou entreprise : dites-nous qui sera dans la salle, quand, et le format qui vous intéresse. Nous vous répondons sous 48 h.',
    cta: 'Organiser cette conférence',
  },

  service: {
    name: 'Conférence « Parents, ados et IA » : devoirs, réseaux sociaux, cyberharcèlement',
    serviceType: 'Conférence de sensibilisation',
    description:
      "Des repères clairs pour les familles : les devoirs avec l'IA sans tricher, les réseaux sociaux, le cyberharcèlement, et une charte numérique familiale à construire avec les enfants. Formats : intervention plénière de 45 min à 1 h, conférence de 1 h 30, atelier de 2 h (parents et ados ensemble), cycle de 4 rendez-vous.",
    audiences: [
      'Parents',
      "Associations de parents d'élèves",
      'Collèges et lycées',
      'Communes, CAF, centres sociaux et médiathèques',
    ],
    about: ['Cyberharcèlement', 'Intelligence artificielle générative', 'Parentalité numérique'],
  },
};

/** Heures de la frise « Une journée d'ado » (une par étape de la démonstration). */
export const friseJournee: string[] = [
  '7 h 10',
  '8 h 05',
  '17 h 30',
  '19 h 45',
  '22 h 40',
  'La charte',
];

/** Temps fort : la charte numérique de la famille (modèle à compléter, aucun fichier en v1). */
export const charteFamille = {
  titre: 'Notre charte numérique',
  rubriques: [
    'Nos lieux sans écran',
    'Nos horaires',
    "Les devoirs avec l'IA",
    "Ce qu'on ne publie jamais",
    "Ce que les parents s'engagent à faire",
    'Si quelque chose ne va pas, on en parle à',
  ],
  signature: 'Signée le ……… par toute la famille.',
};

/** Bande nuit « Le bon numéro » (3018). */
export const bonNumero = {
  valeur: '3018',
  titre: 'En cas de cyberharcèlement, un seul numéro à retenir',
  texte:
    'Le numéro national contre le harcèlement et les violences numériques, pour les jeunes et pour leurs parents. Gratuit et anonyme.',
};
