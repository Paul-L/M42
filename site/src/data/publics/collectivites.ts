// Page « Collectivités » (kit/maquette/Collectivites.dc.html) : textes repris mot pour mot.
// Structure prête pour la collection Directus `publics` (un enregistrement par page « Pour qui »).

import type { PublicPage } from './types';

export const collectivites = {
  slug: 'collectivites',
  seo: {
    title: 'Conférences IA pour collectivités et médiathèques | M42',
    description:
      'Arnaques, fausses infos, IA au quotidien : des conférences et ateliers pour vos habitants, vos agents et vos élus. CCAS, médiathèques, France Services.',
    service: {
      name: "Conférences et ateliers sur l'IA et les arnaques pour les collectivités",
      serviceType: 'Conférence et atelier de sensibilisation',
      audience: [
        { audienceType: 'Habitants et grand public' },
        { audienceType: 'Agents de collectivités, CCAS et France Services' },
        { audienceType: 'Médiathèques' },
        { audienceType: 'Élus locaux' },
      ],
      descriptionWithFormatsNote: true,
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
    crumb: 'Collectivités',
    eyebrow: 'Collectivités, élus & agents',
    title: "Accompagner vos habitants et vos équipes face à l'IA.",
    lead: "Arnaques, fausses informations, démarches en ligne : vos habitants s'interrogent. Vos agents aussi.",
    paragraphs: [
      "Des conférences et des ateliers sur l'intelligence artificielle et les arnaques leur apportent des réponses claires, sans jargon, dans vos salles : CCAS, médiathèques, France Services, mairies.",
      'Habitants, agents en première ligne, élus : chacun son format, les mêmes repères.',
    ],
    primary: { label: 'Demander un devis', href: '/contact/' },
    secondary: { label: 'Voir comment commander', href: '#commande' },
    photo:
      "[Photo : atelier en médiathèque, un petit groupe d'habitants, téléphone en main, l'intervenante en amorce, 4:5, à produire]",
  },

  stakes: {
    eyebrow: 'Vos enjeux',
    title: 'Trois priorités pour votre territoire',
    items: [
      {
        title: 'Protéger les habitants, en particulier les plus fragiles',
        text: "Faux conseillers, faux SMS, numéros usurpés. En 2025, les demandes d'assistance liées à l'usurpation de numéro ont bondi de 517 %.",
        source: 'Source : Cybermalveillance.gouv.fr, bilan 2025',
      },
      {
        title: 'Outiller les agents en première ligne',
        text: 'Accueil de mairie, CCAS, France Services, médiathèques : ce sont eux qui reçoivent les victimes et les questions.',
      },
      {
        title: "Encadrer l'usage de l'IA dans les services",
        text: 'Données des usagers, confidentialité, fiabilité des réponses : les règles doivent être posées avant les habitudes.',
      },
    ],
  },

  formats: {
    eyebrow: 'Formats',
    title: 'Un format pour chaque public',
    lead: 'Pour les habitants, les agents ou les élus : un format pour chaque public, dans vos salles.',
    items: [
      { title: 'Conférence grand public', duration: '1 h 30', participants: 'Selon la salle' },
      { title: 'Atelier pratique', duration: '2 h', participants: '15 personnes maximum' },
      {
        title: 'Cycle de 4 rendez-vous',
        duration: '4 séances, rythme à définir',
        participants: 'Un groupe stable',
      },
      {
        title: 'Session pour les agents',
        duration: '2 h à 1 jour',
        participants: 'Une équipe ou un service',
      },
      {
        title: "Temps d'information pour les élus",
        note: [{ marker: '[À VALIDER : nouveau format]' }],
        duration: '1 h 30 à 2 h',
        participants: 'Conseil municipal ou commission',
      },
    ],
    note: "Salle des fêtes, médiathèque, CCAS, mairie : l'intervention se tient chez vous. Béarn, Pays basque, Landes : sans frais de déplacement. Ailleurs en France, les frais sont indiqués dès le devis.",
    link: {
      label:
        'Vous portez le projet avec une association ou un CCAS ? Les ateliers pour les associations',
      href: '/associations/',
    },
  },

  conferences: {
    eyebrow: 'Conférences',
    title: 'Les conférences pour vos habitants',
    lead: 'Quatre conférences pensées pour le grand public. Chacune existe en conférence, en atelier ou en cycle.',
    // Ordre de la maquette : II, III, I, IV.
    items: [
      {
        numeral: 'II',
        title: 'Arnaques et IA',
        href: '/conferences/arnaques-ia/',
        summary: 'Voix clonées, faux conseillers, faux SMS : les reconnaître et réagir.',
        forYou: '« Arnaques 2026 », avec le jeu « Arnaque ou pas ? » et la fiche des bons numéros.',
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
      {
        numeral: 'III',
        title: 'Vrai ou faux ?',
        href: '/conferences/desinformation-ia/',
        summary:
          "Repérer les fausses images, vidéos et faux sites d'information, avec une méthode en quatre étapes.",
        forYou: 'Neutralité politique stricte : des mécanismes, jamais des opinions.',
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
      {
        numeral: 'I',
        signature: true,
        title: "L'IA au quotidien",
        href: '/conferences/ia-au-quotidien/',
        summary: "Ce qu'elle sait faire, ce qu'elle invente, comment bien s'en servir.",
        forYou: 'Une conférence grand public, idéale en médiathèque ou en France Services.',
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
      {
        numeral: 'IV',
        title: 'Parents, ados et IA',
        href: '/conferences/parents-ados-ia/',
        summary:
          'Devoirs, réseaux sociaux, cyberharcèlement : des repères clairs pour les familles.',
        forYou: 'Une soirée pour les familles, avec la charte numérique de la famille.',
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
    ],
    otherTitle: 'Pour vos agents et vos services',
    others: [
      {
        title: "Agents d'accueil : repérer et orienter une victime d'arnaque",
        detail: 'Les bons réflexes, les bons numéros.',
      },
      {
        title: "L'IA dans les services de la collectivité",
        detail: 'Usages utiles, données à protéger, règles communes.',
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
        title: 'Habitants',
        items: [
          [
            'La fiche des bons numéros ',
            { marker: '[À PRODUIRE]' },
            ' : 33700 pour signaler un SMS frauduleux, 17Cyber.gouv.fr, Info Escroqueries au 0 805 805 817',
          ],
          ['Les règles non négociables ', { marker: '[À PRODUIRE]' }],
        ],
      },
      {
        title: 'Agents',
        items: [
          [
            'Une fiche pratique « accueillir et orienter une victime » ',
            { marker: '[À PRODUIRE]' },
          ],
        ],
      },
      {
        title: 'Élus',
        items: [
          [
            "Une synthèse des enjeux et des pistes d'action pour la collectivité ",
            { marker: '[À PRODUIRE]' },
          ],
        ],
      },
      {
        title: 'Pour vous',
        items: [
          [
            'Un kit de communication : affiche, texte pour le bulletin municipal et les réseaux ',
            { marker: '[À PRODUIRE]' },
          ],
          ["Un bilan après l'intervention ", { marker: '[À PRODUIRE]' }],
        ],
      },
    ],
  },

  steps: {
    eyebrow: 'Méthode',
    title: 'Comment ça se passe',
    items: [
      {
        title: 'Un premier échange',
        text: "Avec l'élu, la direction ou le service concerné : public visé, lieu, date.",
      },
      {
        title: 'Un devis gratuit sous 48 h',
        text: "Puis le kit de communication pour annoncer l'événement.",
      },
      {
        title: "L'intervention et le bilan",
        text: 'Participation, questions posées, suites possibles : de quoi alimenter vos rapports.',
      },
    ],
    team: {
      text: "Qui intervient : Clara Peron, formatrice d'adultes, et Paul Loustaunau, qui conçoit l'IA au quotidien, animent chaque intervention ensemble.",
      link: { label: 'Parcours et démarche', href: '/a-propos/' },
    },
  },

  order: {
    eyebrow: 'Commande publique',
    title: 'Commander une intervention, simplement',
    lead: 'Pour une conférence ou un atelier, un devis suffit le plus souvent. Le parcours tient en trois étapes.',
    label: 'Les trois étapes de la commande',
    items: [
      {
        title: 'Estimer le besoin',
        text: "On additionne les prestations similaires prévues sur l'année, pas intervention par intervention.",
      },
      {
        title: 'Demander un devis',
        text: "Sous 60 000 € HT, un achat de services peut être conclu sans publicité ni mise en concurrence préalables. Trois règles : une offre pertinente, un bon usage de l'argent public, ne pas toujours retenir le même prestataire.",
      },
      {
        title: 'Commander et régler',
        text: [
          'Devis signé ou bon de commande, selon vos règles internes. Facture électronique déposée sur Chorus Pro ',
          { marker: '[À VALIDER : compte Chorus Pro]' },
          ', paiement par mandat administratif.',
        ],
      },
    ],
    source:
      "Source : Code de la commande publique, article R2122-8, modifié par le décret n° 2025-1386 du 29 décembre 2025 (applicable depuis le 1er avril 2026) ; seuils confirmés par le Conseil d'État le 19 octobre 2026. Ce schéma simplifié ne remplace pas l'avis de votre service de la commande publique.",
  },

  faq: {
    eyebrow: 'Questions fréquentes',
    title: 'Questions fréquentes',
    items: [
      {
        question: 'Faut-il lancer une consultation pour une conférence ou un atelier ?',
        answer:
          "En général, non. Depuis le 1er avril 2026, un achat de services dont la valeur estimée est inférieure à 60 000 € HT peut être conclu sans publicité ni mise en concurrence préalables. La collectivité doit simplement choisir une offre pertinente, bien utiliser l'argent public et ne pas toujours retenir le même prestataire. Un devis suffit le plus souvent, selon vos règles internes.",
      },
      {
        question: 'Une intervention auprès des élus est-elle possible ?',
        answer:
          "Oui : un temps d'information pour les élus, en conseil municipal ou en commission (1 h 30 à 2 h) : enjeux de l'IA pour la collectivité, arnaques visant les habitants, usages dans les services. Ce n'est pas une formation des élus au sens du droit des collectivités, réservée aux organismes agréés.",
      },
      {
        question: 'Les conférences sont-elles neutres politiquement ?',
        answer:
          "Oui, strictement. Elles montrent des mécanismes (comment une fausse image est fabriquée, pourquoi elle circule) et citent des sources officielles. Aucun contenu partisan n'est montré, aucune position n'est prise. Chaque exemple est revu avant les périodes électorales.",
      },
      {
        question: 'Comment faire venir le public ?',
        answer: [
          'Après le devis, vous recevez un kit de communication ',
          { marker: '[À PRODUIRE]' },
          " : une affiche et un texte prêt à publier dans le bulletin municipal et sur vos réseaux. Le jour même, le contenu s'adapte au public présent.",
        ],
      },
    ],
  },

  cta: {
    eyebrow: 'Contact',
    title: 'Organisons une conférence dans votre commune',
    lead: 'Des formats adaptés aux budgets des collectivités et des associations. Devis gratuit sous 48 h.',
    ctaLabel: 'Demander un devis',
    ctaHref: '/contact/',
  },
} satisfies PublicPage;
