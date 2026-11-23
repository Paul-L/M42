// Page « Entreprises » (kit/maquette/Entreprises.dc.html) : textes repris mot pour mot.
// Structure prête pour la collection Directus `publics` (un enregistrement par page « Pour qui »).

import { routes } from '../routes';
import type {
  PublicFaqItem,
  PublicFormat,
  PublicLink,
  PublicOtherSubject,
  PublicRecommendedConference,
  PublicRichText,
  PublicStake,
  PublicStep,
  PublicTakeawayGroup,
} from './types';

export interface ColorRuleCard {
  level: 'vert' | 'orange' | 'rouge';
  label: string;
  title: string;
  items: string[];
  motto: string;
}

export const entreprises = {
  slug: 'entreprises',
  seo: {
    title: 'Conférence IA en entreprise et sensibilisation | M42',
    description:
      "Keynote, conférence ou atelier pour sensibiliser vos salariés à l'IA : bons usages, données confidentielles, fraude au président. Devis sous 48 h.",
  },

  hero: {
    crumb: 'Entreprises',
    eyebrow: 'Entreprises & dirigeants',
    title: "L'IA au travail, avec méthode.",
    lead: "Vos équipes utilisent déjà l'IA. Parfois sans le dire, souvent sans méthode commune.",
    paragraphs: [
      "Une conférence ou un atelier de sensibilisation leur donne des règles claires : ce qu'on confie à l'IA, ce qu'on vérifie, ce qui ne sort jamais de l'entreprise.",
      "Et les réflexes pour repérer les nouvelles fraudes, voix clonées et faux fournisseurs, avant qu'elles ne coûtent cher.",
    ],
    primary: { label: 'Demander une proposition', href: routes['Contact.dc.html'] } as PublicLink,
    secondary: { label: 'Voir les conférences pour vos équipes', href: '#sujets' } as PublicLink,
    photo:
      "[Photo : une équipe en séminaire d'entreprise face à une démonstration à l'écran, intervenants en amorce, 4:5, à produire]",
  },

  stakes: {
    eyebrow: 'Vos enjeux',
    title: 'Ce qui se joue dans vos équipes',
    items: [
      {
        title: 'Des usages déjà là, mais invisibles',
        text: "Outils grand public, documents internes copiés dans un assistant, aucune règle partagée. Le risque n'est pas l'IA. C'est l'usage sans cadre.",
      },
      {
        title: "Des fraudes qui changent d'échelle",
        text: "Voix clonée d'un dirigeant, faux fournisseur, demande urgente de changement de RIB. En 2025, les demandes d'assistance des entreprises et associations auprès de Cybermalveillance.gouv.fr ont augmenté de 73 %.",
        source: 'Source : Cybermalveillance.gouv.fr, bilan 2025',
      },
      {
        title: 'Gagner du temps sans déléguer le jugement',
        text: "L'IA rédige, résume, analyse. Elle se trompe aussi, avec aplomb. Vos équipes doivent savoir quand lui faire confiance, et quand vérifier. Le règlement européen sur l'IA demande d'ailleurs aux organisations qui l'utilisent de prendre des mesures pour développer la maîtrise de l'IA de leurs équipes.",
        source:
          "Source : règlement européen sur l'IA, article 4, modifié par le règlement (UE) 2026/1744",
      },
    ] satisfies PublicStake[],
  },

  /** Bloc propre à la page Entreprises : règle vert / orange / rouge. */
  colorRule: {
    eyebrow: 'Une règle commune',
    title: 'Vert, orange, rouge : une règle simple pour vos équipes',
    lead: "Le risque n'est pas l'IA. C'est l'usage sans cadre. Voici le type de règle que vos équipes construisent, à partir de leurs propres tâches.",
    cards: [
      {
        level: 'vert',
        label: 'Vert',
        title: "L'IA aide : j'y vais, et je relis",
        items: [
          'Reformuler un courriel',
          'Résumer un document public',
          'Préparer un plan ou une trame',
          'Traduire un texte non confidentiel',
        ],
        motto: "« Je réfléchis d'abord, l'IA ensuite. »",
      },
      {
        level: 'orange',
        label: 'Orange',
        title: "Risque d'erreur : je vérifie",
        items: [
          'Chiffres, dates et citations',
          'Sources et références',
          'Réponses juridiques ou techniques',
          'Tout ce qui part chez un client',
        ],
        motto: "« Un deuxième avis avant d'envoyer. »",
      },
      {
        level: 'rouge',
        label: 'Rouge',
        title: 'Hors limites : jamais',
        items: [
          'Données de clients ou de salariés',
          'Documents confidentiels, chiffres non publiés',
          'Mots de passe et accès',
          "Laisser l'IA envoyer, payer ou signer sans validation",
        ],
        motto: '« Je ne donne pas les clés. »',
      },
    ] satisfies ColorRuleCard[],
    note: [
      "Exemple indicatif, à adapter à votre entreprise. La trame de charte d'usage de l'IA remise après l'intervention ",
      { marker: '[À PRODUIRE]' },
      ' vous aide à fixer vos propres règles.',
    ] satisfies PublicRichText,
  },

  formats: {
    eyebrow: 'Formats',
    title: "Un format pour chaque moment de l'entreprise",
    lead: "Du keynote de séminaire à l'atelier en petit groupe : le format suit votre public et votre calendrier.",
    items: [
      {
        title: 'Keynote de séminaire ou de convention',
        duration: '45 min à 1 h',
        participants: 'Selon la salle',
      },
      {
        title: 'Conférence pour les équipes',
        duration: '1 h 30, questions comprises',
        participants: 'Selon la salle',
      },
      {
        title: 'Session de comité de direction',
        note: "Décider d'une feuille de route IA sans emballement.",
        marker: '[À VALIDER : nouveau format]',
        duration: '2 h',
        participants: 'Votre comité de direction',
      },
      {
        title: 'Atelier pratique',
        note: 'Mises en situation sur vos cas réels.',
        duration: '2 h (demi-journée sur mesure)',
        participants: '15 personnes maximum',
      },
      {
        title: 'Journée de sensibilisation des équipes',
        note: 'Exercices sur vos situations réelles.',
        marker: '[À VALIDER : nouveau format]',
        duration: '1 jour ou 2 demi-journées',
        participants: 'Petit groupe [À VALIDER : effectif]',
      },
      {
        title: 'Format CSE (pause déjeuner, fin de journée)',
        duration: '1 h à 1 h 30',
        participants: 'Selon la salle',
      },
    ] satisfies PublicFormat[],
    note: 'Sur site, chez vous. Visioconférence possible pour les sessions courtes. Interventions en français.',
    link: {
      label:
        'Vous organisez un congrès, un salon ou une convention ? Les formats pour les événements',
      href: routes['Evenements.dc.html'],
    } as PublicLink,
  },

  conferences: {
    eyebrow: 'Conférences',
    title: 'Les conférences pour vos équipes',
    lead: "Deux conférences prêtes à programmer, déclinées pour l'entreprise. Et des sujets construits avec vous.",
    items: [
      {
        numeral: 'I',
        signature: true,
        title: "L'IA au quotidien",
        href: routes['Conf-ia-au-quotidien.dc.html'],
        summary:
          "Ce que l'IA sait faire, ce qu'elle invente, et les méthodes des professionnels pour s'en servir sans cesser de réfléchir.",
        forYou:
          "« L'IA au bureau, les bons réflexes ». Les cas d'usage de vos métiers (courriels, comptes rendus, synthèses) et les données de l'entreprise : ce qui ne sort jamais.",
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
      {
        numeral: 'II',
        title: 'Arnaques et IA',
        href: routes['Conf-arnaques-ia.dc.html'],
        summary:
          "Voix clonées, faux conseillers, usurpation de numéro : reconnaître les arnaques rendues crédibles par l'IA, et savoir quoi faire.",
        forYou:
          '« Fraude au président, version 2026 ». Voix clonées, faux fournisseurs, demande urgente de changement de RIB : les réflexes qui protègent.',
        formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
      },
    ] satisfies PublicRecommendedConference[],
    otherTitle: 'Autres exemples de sujets',
    others: [
      {
        title: 'Les méthodes des pros, appliquées à vos équipes',
        detail: 'Double relecture, règles non négociables, droits limités, traçabilité.',
      },
      {
        title: 'Données confidentielles et IA',
        detail: "Ce qu'on ne confie jamais à un assistant, et pourquoi.",
      },
      {
        title: "CODIR : décider d'une feuille de route IA sans emballement",
        detail: "Où l'IA apporte vraiment, quels garde-fous, quelle charte d'usage.",
      },
      {
        title: 'Garder son cerveau aux commandes',
        detail: "Productivité et esprit critique : « Je réfléchis d'abord, l'IA ensuite. »",
      },
      {
        title: "Garder la main : l'IA au travail sans perdre son métier",
        detail: 'Pour tous les salariés.',
        tag: 'Sur demande',
      },
      {
        title: 'Déléguer à des agents IA sans perdre le contrôle',
        detail: 'Pour les directions et les équipes techniques.',
        tag: 'Sur demande',
      },
      {
        title: "Manager quand l'IA arrive dans l'équipe",
        detail: 'Pour les managers et les ressources humaines.',
        tag: 'Sur demande',
      },
    ] satisfies PublicOtherSubject[],
    othersNote:
      'Les sujets « Sur demande » sont des conférences construites, proposées sur demande : programme envoyé par e-mail.',
    link: {
      label: 'Voir toutes les conférences et leurs formats',
      href: routes['Conferences.dc.html'],
    } as PublicLink,
  },

  takeaways: {
    eyebrow: "Après l'intervention",
    title: 'Ce que vos participants emportent',
    groups: [
      {
        title: 'Pour chaque participant',
        items: [
          {
            text: "Une fiche-réflexe d'une page : bons usages, règles non négociables, signaux d'alerte",
            marker: '[À PRODUIRE]',
          },
        ],
      },
      {
        title: "Pour l'entreprise",
        items: [
          {
            text: "Une trame de charte d'usage de l'IA, à adapter à votre entreprise",
            marker: '[À PRODUIRE]',
          },
          {
            text: 'Une procédure anti-fraude simple : vérifier une demande urgente de paiement ou de changement de coordonnées bancaires',
            marker: '[À PRODUIRE]',
          },
        ],
      },
      {
        title: 'Pour les journées de sensibilisation',
        items: [
          { text: 'Des exercices sur vos situations réelles' },
          { text: 'Une attestation de présence', marker: '[À PRODUIRE]' },
        ],
      },
    ] satisfies PublicTakeawayGroup[],
  },

  steps: {
    eyebrow: 'Méthode',
    title: 'Comment ça se passe',
    items: [
      {
        title: 'Un échange de cadrage',
        text: '30 min, en visio. Votre public, vos outils, vos objectifs, vos contraintes.',
      },
      {
        title: 'Une proposition sur mesure',
        text: 'Programme et devis sous 48 h. Exemples adaptés à votre secteur.',
      },
      {
        title: "L'intervention, puis le suivi",
        text: 'Ressources envoyées après la session. Un point de bilan avec vous.',
      },
    ] satisfies PublicStep[],
    team: {
      text: "Qui intervient : Clara Peron et Paul Loustaunau, ensemble. Clara porte la pédagogie et le passage à l'action, Paul les démonstrations et les méthodes des équipes professionnelles.",
      link: { label: 'Parcours et démarche', href: routes['A-propos.dc.html'] } as PublicLink,
    },
  },

  faq: {
    eyebrow: 'Questions fréquentes',
    title: 'Questions fréquentes',
    items: [
      {
        question: 'Nos données sont sensibles. Faut-il donner accès à nos outils ?',
        answer:
          "Non. Aucun accès à vos systèmes n'est nécessaire. Les exemples sont fictifs, ou tirés de cas que vous aurez anonymisés. Un engagement de confidentialité peut être signé avant le cadrage.",
      },
      {
        question: "Une sensibilisation aide-t-elle à répondre au règlement européen sur l'IA ?",
        answer: [
          "Le règlement européen sur l'IA (article 4, modifié en juillet 2026) demande aux organisations qui utilisent l'IA de prendre des mesures pour soutenir la maîtrise de l'IA de leur personnel. C'est une obligation de moyens, sans niveau ni certification imposés. Une sensibilisation datée, avec un programme écrit et une attestation de présence ",
          { marker: '[À PRODUIRE]' },
          ", fait partie des mesures que vous pouvez montrer. Elle s'inscrit dans votre démarche, elle ne la remplace pas.",
        ],
      },
      {
        question: "Le CSE peut-il organiser une conférence sur l'IA ?",
        answer:
          "Oui, une conférence ouverte à tous les salariés, comme « Arnaques et IA » ou « Parents, ados et IA », peut relever des activités sociales et culturelles du CSE (article R2312-35 du Code du travail). Condition : qu'elle bénéficie à l'ensemble des salariés, sans distinction de contrat, de catégorie ni d'ancienneté. Le CSE ne finance pas la formation professionnelle, qui relève de l'employeur.",
      },
      {
        question: 'Une intervention à distance est-elle possible ?',
        answer:
          "Oui, pour les sessions courtes : keynote, conférence, format CSE. Les ateliers se déroulent sur site, chez vous : les mises en situation y fonctionnent mieux. Basés dans le Sud-Ouest, nous intervenons partout en France ; les frais de déplacement et d'hébergement sont indiqués dès le devis.",
      },
    ] satisfies PublicFaqItem[],
  },

  cta: {
    eyebrow: 'Contact',
    title: 'Préparons votre séminaire ou votre sensibilisation',
    lead: 'Décrivez-nous votre besoin en quelques lignes. Réponse et proposition sous 48 h.',
    ctaLabel: 'Demander une proposition',
    ctaHref: routes['Contact.dc.html'],
  },
};
