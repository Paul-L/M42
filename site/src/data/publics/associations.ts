// Page « Associations » (kit/maquette/Associations.dc.html), URL /associations/ : textes repris mot
// pour mot (espaces normales : le middleware ajoute les insécables).
// Structure prête pour la collection Directus `publics` (un enregistrement par page « Pour qui »).

import type { PublicPage } from './types';

export const associations = {
  slug: 'associations',
  seo: {
    title: 'Ateliers IA et arnaques pour associations | M42',
    description:
      "Des repères simples sur l'IA et les arnaques pour vos bénévoles, vos équipes et les personnes accompagnées : seniors, aidants, demandeurs d'emploi.",
    service: {
      name: "Ateliers et conférences sur l'IA et les arnaques pour les associations",
      serviceType: 'Atelier et conférence de sensibilisation',
      audience: [
        { audienceType: "Associations et structures d'accompagnement" },
        { audienceType: 'Professionnels et bénévoles' },
        { audienceType: "Seniors, aidants, demandeurs d'emploi, personnes éloignées du numérique" },
      ],
    },
  },

  labels: {
    home: 'Accueil',
    forYou: 'Pour vous : ',
    signature: 'Conférence signature',
    conferenceCta: 'Voir le programme',
    duration: 'Durée',
    participants: 'Participants',
  },

  hero: {
    crumb: 'Associations',
    eyebrow: "Associations & structures d'accompagnement",
    title: 'Donner des repères à celles et ceux que vous accompagnez.',
    lead: "Demandeurs d'emploi, seniors, aidants, personnes éloignées du numérique : face à l'IA et aux arnaques, vos publics ont besoin de repères simples.",
    paragraphs: [
      "Des ateliers et des conférences partis de leur quotidien, pas de la technologie : reconnaître une arnaque, se servir de l'IA pour sa recherche d'emploi, savoir qui appeler.",
      'Vos professionnels et vos bénévoles gardent ces repères, pour les transmettre ensuite.',
    ],
    primary: { label: 'Nous contacter', href: '/contact/' },
    secondary: { label: "Voir l'atelier pratique", href: '#formats' },
    photo:
      "[Photo : atelier en petit groupe dans les locaux d'une association, participants autour de la table, 4:5, à produire]",
  },

  stakes: {
    eyebrow: 'Vos enjeux',
    title: 'Ce que vivent vos publics',
    items: [
      {
        title: 'Des publics plus exposés aux arnaques',
        text: 'Faux conseillers, faux SMS, arnaques sentimentales : les escrocs visent les personnes isolées ou pressées par une démarche.',
      },
      {
        title: "L'IA dans la recherche d'emploi",
        text: "CV, lettres, préparation d'entretien : un vrai atout, à condition de relire et de rester soi-même.",
      },
      {
        title: 'Des professionnels et bénévoles sollicités',
        text: 'Ils reçoivent les questions en premier. Ils ont besoin de réponses fiables, et de savoir orienter.',
      },
    ],
  },

  /** Bloc propre à la page Associations : schéma « Le relais ». */
  relay: {
    eyebrow: 'Le relais',
    title: 'Outiller celles et ceux qui accompagnent',
    lead: "L'intervention ne s'arrête pas à l'atelier. Vos professionnels et vos bénévoles gardent les repères et les transmettent au quotidien.",
    label: "Le relais, de l'intervention à vos publics",
    items: [
      {
        title: "L'intervention",
        text: 'Un atelier, une conférence ou un cycle, construits avec votre équipe, au rythme de vos publics.',
      },
      {
        title: 'Votre structure',
        detail: 'Professionnels et bénévoles',
        text: [
          "Une session dédiée pour répondre aux questions et savoir orienter, et une trame d'atelier ",
          { marker: '[À PRODUIRE]' },
          ' pour continuer ensuite.',
        ],
      },
      {
        title: 'Vos publics',
        detail: "Seniors, aidants, demandeurs d'emploi, personnes éloignées du numérique",
        text: 'Des repères simples et les bons numéros, à appliquer dès le lendemain.',
      },
    ],
    note: "Au bilan, un temps d'échange avec vos professionnels : ce qui a marché, les questions qui reviennent, les suites à donner.",
  },

  formats: {
    eyebrow: 'Formats',
    title: 'Des formats au rythme de vos publics',
    lead: 'En atelier de petit groupe, le format privilégié, chacun pratique, pose ses questions et repart avec ses règles.',
    items: [
      {
        title: 'Atelier pratique (format privilégié)',
        duration: '2 h',
        participants: '15 personnes maximum',
      },
      { title: 'Conférence', duration: '1 h 30', participants: 'Selon la salle' },
      { title: 'Cycle de 4 rendez-vous', duration: '4 séances', participants: 'Un groupe stable' },
      {
        title: 'Module court intégré à vos ateliers',
        duration: '1 h',
        participants: 'Votre groupe habituel',
      },
      {
        title: 'Session pour vos professionnels et bénévoles',
        duration: '2 h à une demi-journée',
        participants: 'Votre équipe',
      },
    ],
    note: 'Dans vos locaux, aux horaires de vos publics.',
    link: {
      label: 'Collectivité, CCAS ou médiathèque ? Les formats pour les collectivités',
      href: '/collectivites/',
    },
  },

  conferences: {
    eyebrow: 'Conférences',
    title: 'Les conférences pour vos publics',
    lead: 'Des contenus partis du quotidien des personnes accompagnées, pas de la technologie.',
    // Ordre de la maquette : II, I, III, IV.
    items: [
      {
        numeral: 'II',
        title: 'Arnaques et IA',
        href: '/conferences/arnaques-ia/',
        summary: 'Les reconnaître, réagir, savoir qui appeler.',
        forYou:
          '« Arnaques 2026 », avec le jeu « Arnaque ou pas ? » : faux conseillers, faux SMS, faux sites dans les démarches.',
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
      {
        numeral: 'I',
        signature: true,
        title: "L'IA au quotidien",
        href: '/conferences/ia-au-quotidien/',
        summary: "Ce qu'elle sait faire, ce qu'elle invente, comment bien s'en servir.",
        forYou:
          "L'IA pour sa recherche d'emploi : ce qu'elle fait bien, ce qu'il faut toujours relire.",
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
      {
        numeral: 'III',
        title: 'Vrai ou faux ?',
        href: '/conferences/desinformation-ia/',
        summary: 'Repérer les fausses informations et les images fabriquées.',
        forYou: 'Une méthode simple en quatre étapes, avec des exemples du quotidien.',
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
      {
        numeral: 'IV',
        title: 'Parents, ados et IA',
        href: '/conferences/parents-ados-ia/',
        summary: 'Devoirs, réseaux sociaux, cyberharcèlement : des repères pour les familles.',
        forYou:
          'Pour les associations familiales : une soirée avec la charte numérique de la famille.',
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
    ],
    otherTitle: 'Autres exemples de sujets',
    others: [
      { title: 'Faux conseillers, faux SMS, faux sites : se protéger dans ses démarches' },
      {
        title: 'Aidants : protéger un proche des arnaques',
        detail: "Les signaux d'alerte, les bons réflexes, les bons numéros.",
      },
      {
        title: 'Professionnels et bénévoles : accompagner sans faire à la place',
        detail: "Répondre aux questions sur l'IA et orienter une victime.",
      },
    ],
    link: {
      label: 'Voir toutes les conférences et leurs formats',
      href: '/conferences/',
    },
  },

  takeaways: {
    eyebrow: "Après l'intervention",
    title: 'Ce que vos participants emportent',
    groups: [
      {
        title: 'Participants',
        items: [
          [
            'La fiche des bons numéros et des règles non négociables, sur un support lisible, en gros caractères ',
            { marker: '[À PRODUIRE]' },
          ],
        ],
      },
      {
        title: 'Vos équipes',
        items: [
          [
            "Une trame d'atelier pour prolonger le travail après l'intervention ",
            { marker: '[À PRODUIRE]' },
          ],
        ],
      },
      {
        title: 'Votre structure',
        items: [
          ["Un bilan de l'action ", { marker: '[À PRODUIRE]' }],
          'Les éléments utiles à vos rapports et à vos dossiers de financement : programme, objectifs, devis',
        ],
      },
    ],
  },

  steps: {
    eyebrow: 'Méthode',
    title: 'Comment ça se passe',
    items: [
      {
        title: 'Un échange avec votre équipe',
        text: 'Votre public, son niveau, ses contraintes : horaires, mobilité, langue, appréhension du numérique.',
      },
      {
        title: 'Une proposition ajustée',
        text: 'Contenu, rythme, devis. Avec les éléments nécessaires à votre demande de financement, si vous en faites une.',
      },
      {
        title: "L'atelier et le bilan",
        text: "Un temps d'échange avec vos professionnels pour décider des suites.",
      },
    ],
    team: {
      text: "Qui intervient : Clara Peron, conseillère en insertion professionnelle et formatrice d'adultes, qui connaît les publics que vous accompagnez, et Paul Loustaunau, pour les démonstrations et les exemples concrets.",
      link: { label: 'Parcours et démarche', href: '/a-propos/' },
    },
  },

  faq: {
    eyebrow: 'Questions fréquentes',
    title: 'Questions fréquentes',
    items: [
      {
        question: "Nos participants n'ont pas choisi d'être là. Comment les impliquer ?",
        answer:
          "En partant de leur quotidien, pas de la technologie. Pas de jargon, pas de jugement, beaucoup d'exemples et de mises en situation. Chacun repart avec une ou deux règles qu'il pourra appliquer dès le lendemain.",
      },
      {
        question: "Nos publics sont peu à l'aise avec le numérique. Est-ce un problème ?",
        answer: [
          "Non, c'est souvent le point de départ. On parle simplement, on montre plutôt qu'on explique, et le support remis est en gros caractères ",
          { marker: '[À PRODUIRE]' },
          ". En atelier, celles et ceux qui le souhaitent s'exercent sur leur propre téléphone ; les autres observent et posent leurs questions.",
        ],
      },
      {
        question: 'Pouvez-vous nous aider à monter un dossier de financement ?',
        answer:
          "Nous vous fournissons les éléments dont votre dossier a besoin : programme, objectifs, devis, puis un bilan de l'action. C'est votre structure qui dépose la demande, et nous ne pouvons pas en garantir l'issue.",
      },
      {
        question: 'Peut-on travailler sur plusieurs séances ?',
        answer:
          "Oui. Le cycle de 4 rendez-vous permet de travailler avec un groupe stable et de revenir sur les questions d'une séance à l'autre. Un module court d'une heure peut aussi s'intégrer à vos ateliers habituels.",
      },
    ],
  },

  cta: {
    eyebrow: 'Contact',
    title: 'Montons un atelier ensemble',
    lead: 'Décrivez-nous votre public et votre projet. Devis gratuit sous 48 h.',
    ctaLabel: 'Nous contacter',
    ctaHref: '/contact/',
  },
} satisfies PublicPage;
