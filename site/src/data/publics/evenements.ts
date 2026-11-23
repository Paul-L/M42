// Page « Événements » (kit/maquette/Evenements.dc.html), URL /evenements/ : textes repris mot pour mot
// (espaces normales : le middleware ajoute les insécables).
// Structure prête pour la collection Directus `publics` (un enregistrement par page « Pour qui »).

import type { PublicPage } from './types';

export const evenements = {
  slug: 'evenements',
  seo: {
    title: 'Keynote et conférence IA pour séminaire, salon ou congrès | M42',
    description:
      "Keynote d'ouverture ou de clôture, conférence à deux voix, animation « Vrai ou IA ? » : un temps fort sur l'IA, clair et vivant, pour votre événement.",
    service: {
      name: "Keynotes et conférences sur l'IA pour séminaires, salons et congrès",
      serviceType: 'Keynote, conférence et animation interactive',
      audience: [
        { audienceType: "Organisateurs d'événements" },
        { audienceType: 'Participants de séminaires, salons et congrès' },
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
    crumb: 'Événements',
    eyebrow: 'Événements, salons & congrès',
    title: "Un temps fort sur l'IA, clair et vivant.",
    lead: "Votre public a entendu parler d'IA partout. Il attend autre chose qu'un discours de plus.",
    paragraphs: [
      'Des repères clairs, des démonstrations en direct, un moment qui fait réfléchir la salle, et trois règles à retenir.',
      "Keynote d'ouverture ou de clôture, intervention plénière, conférence à deux voix ou animation « Vrai ou IA ? » : pour votre séminaire, salon ou congrès.",
    ],
    primary: { label: 'Proposer une date', href: '/contact/' },
    secondary: { label: 'Voir un déroulé de keynote', href: '#deroule' },
    photo:
      '[Photo : une salle de congrès attentive, scène et écran en arrière-plan, lumière latérale, 4:5, à produire]',
  },

  stakes: {
    eyebrow: 'Vos enjeux',
    title: 'Ce que votre public attend',
    items: [
      {
        title: 'Se démarquer sur un sujet saturé',
        text: 'Ni promesse technophile, ni discours catastrophiste. Un propos posé, qui éclaire.',
      },
      {
        title: 'Parler à votre public, pas à un public générique',
        text: "Un congrès de professionnels de santé n'attend pas la même chose qu'un salon grand public. Le contenu se prépare avec vous, à partir de votre thématique.",
      },
      {
        title: 'Pas de mauvaise surprise le jour J',
        text: 'Timing tenu, technique simple, contenu neutre : aucune prise de position politique, aucune promotion commerciale.',
      },
    ],
  },

  formats: {
    eyebrow: 'Formats',
    title: 'Une intervention à sa place dans votre programme',
    lead: "De l'ouverture de votre événement à l'espace d'animation, l'intervention s'insère dans votre programme.",
    items: [
      { title: "Keynote d'ouverture", duration: '45 min à 1 h', participants: 'Selon la salle' },
      {
        title: 'Keynote de clôture',
        note: [{ marker: '[À VALIDER : nouveau format]' }],
        duration: '45 min à 1 h',
        participants: 'Selon la salle',
      },
      {
        title: 'Conférence à deux voix',
        duration: '45 min à 1 h 30',
        participants: 'Selon la salle',
      },
      {
        title: 'Table ronde (participation ou animation)',
        note: [{ marker: '[À VALIDER : nouveau format]' }],
        duration: '45 min à 1 h',
        participants: 'Selon le programme',
      },
      {
        title: 'Animation interactive « Vrai ou IA ? » ou « Arnaque ou pas ? »',
        note: [{ marker: '[À VALIDER : nouveau format]' }],
        duration: '30 min à 2 h',
        participants: 'En salle ou sur un espace dédié',
      },
    ],
    note: "L'interactivité s'adapte à la taille de la salle. Interventions en français.",
    link: {
      label:
        "Un séminaire interne ou une convention d'entreprise ? Les formats pour les entreprises",
      href: '/entreprises/',
    },
  },

  /** Bloc propre à la page Événements : exemple de déroulé d'une keynote (section nuit). */
  rundown: {
    eyebrow: 'Exemple de déroulé',
    title: 'Une keynote de 45 minutes, minute par minute',
    lead: "Une idée forte, des démonstrations en direct, un jeu avec la salle et trois règles à retenir. Les exemples s'adaptent à votre public.",
    end: '0:45',
    legend: 'Séquences qui se terminent sur une règle à retenir',
    sequences: [
      {
        start: '0:00',
        end: '0:05',
        minutes: 5,
        speakers: 'Clara, puis Clara et Paul',
        title: 'Ouverture et vote',
        text: "Une image de la nébuleuse d'Orion, un vote à main levée sur l'usage de l'IA et la méfiance qu'elle inspire, puis le duo se présente.",
      },
      {
        start: '0:05',
        end: '0:14',
        minutes: 9,
        speakers: 'Paul',
        title: "L'erreur sûre d'elle",
        text: "Démonstration en direct : l'IA répond avec aplomb et cite une source introuvable. Puis ce qu'elle fait vraiment bien, sur des usages de votre public.",
      },
      {
        start: '0:14',
        end: '0:20',
        minutes: 6,
        highlight: true,
        speakers: 'Clara',
        title: 'Le cerveau aux commandes',
        text: 'Ce que disent les premières études, présentées avec leurs limites : des signaux, pas des verdicts.',
        rule: "Règle n° 1 : « Je réfléchis d'abord, l'IA ensuite. »",
      },
      {
        start: '0:20',
        end: '0:30',
        minutes: 10,
        highlight: true,
        speakers: 'Clara et Paul',
        title: 'Jeu « Vrai ou IA ? »',
        text: 'Quatre contenus, un vote de la salle, des indices après chaque révélation. Puis pourquoi ces pièges fonctionnent sur nous tous.',
        rule: "Règle n° 2 : « Quand je ressens une émotion forte, je m'arrête avant de croire ou de partager. »",
      },
      {
        start: '0:30',
        end: '0:39',
        minutes: 9,
        highlight: true,
        speakers: 'Paul, puis Clara',
        title: 'Les méthodes des pros',
        text: 'Les garde-fous des équipes qui font travailler des agents IA, traduits pour votre public.',
        rule: "Règle n° 3 : « Je ne donne pas les clés : rien n'envoie, ne paie ou ne signe à ma place sans que je valide. »",
      },
      {
        start: '0:39',
        end: '0:45',
        minutes: 6,
        speakers: 'Clara et Paul',
        title: 'Demain matin',
        text: "Chacun choisit une règle et la note. Les trois règles réunies à l'écran, puis la clôture.",
      },
    ],
    note: "Questions de la salle : 10 à 15 minutes en option. Déroulé tiré de la version keynote de « L'IA au quotidien » [À VALIDER : titre de la conférence signature].",
    link: {
      label: "Le programme de la conférence « L'IA au quotidien »",
      href: '/conferences/ia-au-quotidien/',
    },
  },

  /** Bloc propre à la page Événements : kit organisateur. */
  kit: {
    eyebrow: 'Kit organisateur',
    title: "Ce que vous recevez pour préparer l'événement",
    lead: "De quoi construire votre programme, annoncer l'intervention et préparer la régie, sans relances de votre part.",
    link: {
      label: "Accéder à l'espace organisateurs",
      href: '/organisateurs/',
    },
    items: [
      "Titre et résumé de l'intervention, validés avec vous",
      ['Biographies de 50 et 150 mots ', { marker: '[À PRODUIRE]' }],
      ['Photos HD ', { marker: '[À PRODUIRE]' }, ' et logo'],
      ["Texte d'annonce prêt à publier ", { marker: '[À PRODUIRE]' }],
      [
        "Fiche technique : deux micros sans fil, vidéoprojecteur HDMI et écran, connexion internet, 30 min d'installation ",
        { marker: '[PDF À PRODUIRE]' },
      ],
      ['Vidéo de présentation ', { marker: '[À PRODUIRE]' }],
    ],
  },

  conferences: {
    eyebrow: 'Conférences',
    title: 'Les conférences pour votre événement',
    lead: 'Trois conférences prêtes à programmer, en keynote ou en format long. Ou un sujet construit à partir de votre thématique.',
    items: [
      {
        numeral: 'I',
        signature: true,
        title: "L'IA au quotidien",
        href: '/conferences/ia-au-quotidien/',
        summary:
          "Ce que l'IA sait faire, ce qu'elle invente, et les méthodes des professionnels pour garder la main.",
        forYou: 'En keynote : 45 minutes, trois règles à retenir et un jeu avec la salle.',
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
      {
        numeral: 'II',
        title: 'Arnaques et IA',
        href: '/conferences/arnaques-ia/',
        summary:
          "Voix clonées, faux conseillers, faux SMS : reconnaître les arnaques rendues crédibles par l'IA.",
        forYou:
          "« Fraudes 2026 : ce que les escrocs font déjà avec l'IA », avec le jeu « Arnaque ou pas ? ».",
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
      {
        numeral: 'III',
        title: 'Vrai ou faux ?',
        href: '/conferences/desinformation-ia/',
        summary:
          "Repérer une image truquée, une fausse vidéo ou un faux site d'information, avec une méthode en quatre étapes. Strictement neutre.",
        forYou:
          "L'animation « Vrai ou IA ? » : démêler le vrai du faux à l'heure des images générées.",
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
    ],
    otherTitle: 'Autres exemples de sujets',
    others: [
      { title: "Se repérer dans l'IA : ce qui change vraiment, et ce qui ne change pas" },
      { title: "L'IA invente parfois. Comment garder la main ?" },
      { title: "Les méthodes des pros de l'IA, version accessible à tous" },
      {
        title: "Sur mesure : l'IA dans votre secteur",
        detail: 'Construit à partir de la thématique de votre événement.',
      },
    ],
    link: {
      label: 'Voir toutes les conférences et leurs formats',
      href: '/conferences/',
    },
  },

  takeaways: {
    eyebrow: "Après l'intervention",
    title: 'Ce que votre public emporte',
    lead: "Pour l'organisateur, voir le kit ci-dessus.",
    groups: [
      {
        title: 'Pour le public',
        items: [
          [
            'Une ressource à emporter : fiche-réflexe ou page de ressources accessible par QR code ',
            { marker: '[À PRODUIRE]' },
          ],
        ],
      },
      {
        title: 'Pour la suite',
        items: ['Captation et diffusion possibles, selon les conditions convenues au contrat'],
      },
    ],
  },

  steps: {
    eyebrow: 'Méthode',
    title: 'Comment ça se passe',
    items: [
      {
        title: 'Le brief',
        text: "Votre public, le message de l'événement, la place de l'intervention dans le programme.",
      },
      {
        title: 'La préparation',
        text: 'Titre et résumé validés avec vous. Repérage technique avec votre régie.',
      },
      {
        title: 'Le jour J',
        text: 'Arrivée en avance, réglages, intervention, échanges avec le public. Ressources transmises ensuite.',
      },
    ],
    team: {
      text: "Qui intervient : sur scène, Clara Peron porte l'humain, la pédagogie et le passage à l'action ; Paul Loustaunau, la technique et les démonstrations en direct.",
      link: { label: 'Parcours et démarche', href: '/a-propos/' },
    },
  },

  faq: {
    eyebrow: 'Questions fréquentes',
    title: 'Questions fréquentes',
    items: [
      {
        question: 'Une intervention est-elle possible hors du Sud-Ouest ?',
        answer:
          "Oui. Basés dans le Sud-Ouest, nous intervenons partout en France, en présentiel ou à distance. Les frais de déplacement et d'hébergement sont indiqués dès le devis.",
      },
      {
        question: 'Que faut-il prévoir côté technique ?',
        answer:
          "Deux micros sans fil, un vidéoprojecteur HDMI et un écran, une connexion internet (filaire de préférence, Wi-Fi si le public vote depuis son téléphone), un retour écran si possible et 30 minutes d'installation. La fiche technique complète est dans l'espace organisateurs.",
      },
      {
        question: 'Pourquoi une intervention à deux voix ?',
        answer:
          "Parce que le dialogue rend le propos plus vivant et plus accessible à toute la salle. Clara porte l'humain, la pédagogie et le passage à l'action ; Paul, la technique et les démonstrations en direct.",
      },
      {
        question: "Dans quelle langue se déroule l'intervention ?",
        answer:
          "En français, tout comme les supports projetés et les ressources remises après l'intervention. Nous ne proposons pas, à ce jour, de version en anglais.",
      },
      {
        question: "Peut-on filmer et diffuser l'intervention ?",
        answer:
          "Oui, captation et diffusion sont possibles. Les conditions (usage, durée, supports de diffusion) sont convenues au contrat, avant l'événement.",
      },
    ],
  },

  cta: {
    eyebrow: 'Contact',
    title: 'Vérifions la disponibilité pour votre date',
    lead: 'Indiquez-nous la date, le lieu et le public attendu. Réponse sous 48 h.',
    ctaLabel: 'Proposer une date',
    ctaHref: '/contact/',
  },
} satisfies PublicPage;
