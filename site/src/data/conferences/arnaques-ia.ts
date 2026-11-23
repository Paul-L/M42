// Contenus de la conférence II « Arnaques 2026 » (kit/maquette/Conf-arnaques-ia.dc.html).
// Forme : voir ./types.ts (collection Directus `conferences`, phase 3).
//
// Notes de production de la maquette (commentaire SEO) :
// - [À DÉCIDER] titre daté « Arnaques 2026 » (renommé chaque 1er janvier) ou intemporel ; l'URL ne change jamais.
// - 17Cyber est une plateforme en ligne, pas un numéro.
// - 33700 : non revérifié (relecture 05).

import { routes } from '../routes';
import type { Conference } from './types';

export const arnaquesIa: Conference = {
  slug: 'arnaques-ia',
  numero: 'II',
  disponibilite: 'catalogue',
  titre: 'Arnaques 2026',
  seo: {
    title: 'Conférence arnaques et IA : voix clonées, faux SMS | M42',
    description:
      "Voix clonées, faux conseillers, usurpation de numéro : reconnaître les arnaques rendues crédibles par l'IA et savoir quoi faire. Seniors, CCAS, salariés.",
  },
  surTitre: 'Conférence II · Arnaques et intelligence artificielle',
  noteTitre:
    '[À DÉCIDER : titre daté « Arnaques 2026 », renommé chaque 1er janvier, ou titre intemporel « Arnaques et IA »]',
  sousTitre: 'Voix clonées, faux conseillers, faux SMS : reconnaître le piège à temps.',
  promesse:
    "Vous repartez avec des règles simples, décidées à l'avance, qui vous protègent, même face à une arnaque très bien imitée.",
  ctaSecondaire: { label: "Voir l'anatomie d'un faux SMS", href: '#demonstration' },
  miseAJour: '[À COMPLÉTER : date]',
  fiche: [
    { label: 'Pour qui', valeur: 'Seniors et aidants, habitants, associations, salariés' },
    {
      label: 'Formats',
      valeur: 'Keynote 45 min à 1 h · Conférence 1 h 30 · Atelier 2 h · Cycle de 4 rendez-vous',
    },
    { label: 'Participants', valeur: 'Selon la salle · 15 en atelier' },
    { label: 'Où', valeur: 'Partout en France, en présentiel ou à distance · en français' },
  ],

  demonstration: {
    label: "Démonstration : anatomie d'un faux SMS",
    surTitre: "Démonstration · Anatomie d'un faux SMS",
    k: 3.6,
    etapes: [
      {
        kicker: 'Exemple',
        titre: 'Un SMS comme on en reçoit tous.',
        texte: "Rien d'alarmant à première vue. Regardons-le de plus près, détail par détail.",
      },
      {
        kicker: "Indice 1 · L'expéditeur",
        titre: 'Un numéro inconnu.',
        texte:
          "Un service de livraison n'écrit pas depuis un numéro de portable. Et un nom connu, ou même un numéro connu, peut aussi être imité.",
      },
      {
        kicker: "Indice 2 · L'urgence",
        titre: '« Dernier avis », « avant ce soir ».',
        texte:
          "L'urgence est là pour vous empêcher de réfléchir. C'est le premier signal d'alerte.",
      },
      {
        kicker: 'Indice 3 · Le petit montant',
        titre: "1,99 €, ce n'est rien…",
        texte:
          "… sauf que l'escroc ne veut pas vos 1,99 € : il veut votre numéro de carte bancaire.",
      },
      {
        kicker: 'Indice 4 · Le lien',
        titre: 'Une adresse qui imite.',
        texte:
          'Elle ressemble à un vrai site, mais un détail cloche. Dans le doute, on ne clique jamais.',
      },
      {
        kicker: 'Le bon réflexe',
        titre: 'Je ne clique pas. Je transfère au 33700.',
        texte:
          "Puis je supprime le message. Pour suivre un colis, je passe par le site ou l'application que je connais déjà.",
      },
    ],
  },

  enClair:
    "Une voix familière ou un numéro affiché ne prouvent plus l'identité de l'appelant : l'IA permet d'imiter une voix, et des escrocs usurpent des numéros. La règle : raccrocher et rappeler sur un numéro que vous connaissez.",
  objectifs: {
    titre: 'Ce que vos participants sauront faire',
    items: [
      'À la fin, vous saurez reconnaître les quatre ressorts communs à presque toutes les arnaques : urgence, autorité, émotion, secret.',
      'À la fin, vous saurez pourquoi un numéro affiché ou une voix familière ne prouvent plus rien.',
      'À la fin, vous saurez quoi faire, et qui appeler, dans les dix minutes qui suivent un doute.',
    ],
  },

  chiffres: {
    label: 'Les arnaques en chiffres',
    items: [
      {
        valeur: '504 810',
        texte:
          "demandes d'assistance traitées par Cybermalveillance.gouv.fr en 2025, soit 20 % de plus en un an.",
        source: "Source : Cybermalveillance.gouv.fr, rapport d'activité 2025 (mars 2026)",
      },
      {
        valeur: '+517 %',
        texte:
          "de demandes liées à l'usurpation de numéro. Une hausse très forte, sur un volume encore réduit (environ 7 000 demandes).",
        source: "Source : Cybermalveillance.gouv.fr, rapport d'activité 2025 (mars 2026)",
        accent: true,
      },
      {
        valeur: '41,6 %',
        texte:
          "du montant de la fraude aux moyens de paiement vient de la fraude par manipulation : 516 millions d'euros en 2025.",
        source:
          'Source : Banque de France, Observatoire de la sécurité des moyens de paiement, rapport 2025 (septembre 2026)',
      },
    ],
  },

  programme: {
    surTitre: 'Programme · conférence de 1 h 30',
    titre: "Ce que l'on voit ensemble",
    chapo: 'Des exemples réels, des démonstrations en direct, et des réflexes simples à retenir.',
    blocs: [
      {
        titre: 'Le paysage 2026',
        duree: '10 min',
        texte:
          "Ce que disent les chiffres officiels : Cybermalveillance.gouv.fr (plus de 500 000 demandes d'assistance en 2025, +517 % pour l'usurpation de numéro) ; Banque de France (la fraude par manipulation dépasse 40 % du montant de la fraude aux moyens de paiement en 2025).",
      },
      {
        titre: "Anatomie d'une arnaque",
        duree: '20 min',
        texte:
          "Faux conseiller bancaire, faux SMS de livraison ou d'amende, usurpation de numéro, arnaque sentimentale. Démonstration : comment l'IA rend un message crédible en quelques secondes.",
      },
      {
        titre: 'Le jeu « Arnaque ou pas ? »',
        duree: '20 min',
        texte:
          'Messages réels anonymisés et messages légitimes. La salle vote. On décortique chaque indice.',
      },
      {
        titre: 'Mes règles non négociables',
        duree: '20 min',
        texte:
          "Jamais de code par téléphone. Jamais de paiement dans l'urgence. Je raccroche et je rappelle sur un numéro que je connais. Un mot de passe familial contre les voix clonées.",
      },
      {
        titre: "Si c'est arrivé",
        duree: '10 min',
        texte:
          'Les bons réflexes et les bons numéros : 33700 pour signaler un SMS frauduleux, la plateforme 17cyber.gouv.fr pour être aidé en ligne, Info Escroqueries au 0 805 805 817. Parler sans honte. Questions.',
      },
    ],
  },

  tempsFort: {
    id: 'jeu',
    titre: 'Le jeu « Arnaque ou pas ? »',
    chapo:
      'Pendant la conférence, la salle vote sur de vrais exemples anonymisés. Essayez avec quatre messages.',
    note: 'Messages reconstitués pour la démonstration ; noms et numéros fictifs.',
  },

  jeu: [
    {
      de: 'Appel · « votre conseiller bancaire »',
      texte:
        '« Une opération suspecte est en cours sur votre compte. Pour la bloquer, donnez-moi le code que vous allez recevoir par SMS. »',
      arnaque: true,
      explication:
        'Votre banque ne vous demandera jamais un code reçu par SMS. Raccrochez, puis rappelez le numéro inscrit au dos de votre carte.',
    },
    {
      de: 'SMS · Mairie',
      texte:
        'Collecte des encombrants jeudi matin dans votre quartier. Sortez-les la veille au soir. Aucune réponse nécessaire.',
      arnaque: false,
      explication:
        "Pas de lien, pas d'argent, pas d'urgence : rien ne vous est demandé. Un message peut être fiable !",
    },
    {
      de: 'Messagerie · numéro inconnu',
      texte:
        "« Coucou c'est moi, j'ai cassé mon téléphone, voici mon nouveau numéro. Tu peux me dépanner de 300 € ? C'est urgent. »",
      arnaque: true,
      explication:
        'Le faux proche : nouveau numéro, argent, urgence. Appelez votre proche sur son ancien numéro avant toute chose.',
    },
    {
      de: 'E-mail · « votre fournisseur »',
      texte:
        "« Nous changeons de banque. Merci d'utiliser désormais le RIB ci-joint pour le règlement de la facture en attente. »",
      arnaque: true,
      explication:
        'Le faux fournisseur : un changement de coordonnées bancaires annoncé par e-mail. On vérifie toujours en rappelant le fournisseur sur un numéro déjà connu, jamais celui du message.',
    },
  ],

  formats: {
    titre: 'Quatre façons de la programmer',
    items: [
      {
        duree: '45 min à 1 h',
        titre: 'Keynote ou intervention plénière',
        texte:
          "Le paysage 2026, l'anatomie d'une arnaque en version courte, les règles non négociables, et cinq messages du jeu avec la salle.",
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
          "15 personnes. Chacun écrit ses règles non négociables et son « mot de passe familial ». Jeux de rôle d'appels frauduleux.",
      },
      {
        duree: '4 rendez-vous',
        titre: 'Cycle',
        texte:
          'Le programme réparti sur quatre séances, pour un groupe stable (club, résidence, association) [À VALIDER : rythme et déroulé].',
      },
    ],
  },

  publics: {
    titre: 'Une même base, adaptée à chaque public',
    chapo:
      'Seniors et aidants, CCAS et communes, associations, banques et assurances pour leurs clients, salariés.',
    items: [
      {
        titre: 'Communes & CCAS',
        href: routes['Collectivites.dc.html'],
        texte:
          "Une soirée pour les habitants ou un rendez-vous seniors l'après-midi, avec les bons numéros à emporter.",
      },
      {
        titre: 'Associations & aidants',
        href: routes['Associations.dc.html'],
        texte:
          "En atelier, téléphone en main, en petit groupe et à son rythme. Et pour les aidants : protéger un parent âgé sans l'infantiliser.",
      },
      {
        titre: 'Entreprises & CSE',
        href: routes['Entreprises.dc.html'],
        texte: 'Pour la comptabilité, la paie, les achats et les assistants de direction.',
        declinaison: 'Déclinaison : « Fraude au président, version 2026 »',
      },
    ],
  },

  declinaisonEntreprise: {
    titre: 'Fraude au président, version 2026',
    texte:
      'Faux dirigeant, faux fournisseur, changement de coordonnées bancaires (IBAN), voix ou vidéo imitant un responsable. On construit ensemble la procédure : double validation, rappel sur un numéro connu, délai de vérification.',
    lien: {
      label: 'Sensibiliser vos équipes à la fraude au président',
      href: routes['Entreprises.dc.html'],
    },
  },

  numeros: {
    surTitre: "Si c'est arrivé",
    titre: 'Chacun repart avec les bons numéros',
    items: [
      {
        type: 'Numéro · SMS',
        valeur: '33700',
        texte:
          'Pour signaler un SMS ou un appel frauduleux : on lui transfère le message, puis on le supprime.',
        taille: 'xl',
        accent: true,
      },
      {
        type: 'Plateforme en ligne',
        valeur: '17cyber.gouv.fr',
        href: 'https://17cyber.gouv.fr',
        texte:
          "Pour être aidé en ligne en cas d'arnaque : diagnostic, conseils et mise en relation. Ce n'est pas un numéro de téléphone.",
        taille: 'l',
      },
      {
        type: 'Numéro · appel gratuit',
        valeur: '0 805 805 817',
        texte: "Info Escroqueries : pour s'informer et être conseillé.",
        taille: 'l',
        insecable: true,
      },
    ],
  },

  faq: {
    titre: 'Avant de programmer cette conférence',
    items: [
      {
        question:
          "Cette conférence convient-elle à un public de seniors peu à l'aise avec le numérique ?",
        reponse:
          "<p>Oui. Elle ne demande aucun prérequis : pas besoin de savoir se servir d'un smartphone pour la suivre. Les exemples viennent du quotidien (SMS de colis, appel d'un faux conseiller, message d'un faux proche), le vocabulaire reste simple, et chacun repart avec les bons numéros. En atelier, on travaille téléphone en main, en petit groupe et à son rythme.</p>",
      },
      {
        question: "Qu'est-ce qu'une voix clonée ?",
        reponse:
          "<p>C'est une imitation de la voix d'une personne, produite par une IA à partir d'enregistrements, par exemple une vidéo publiée en ligne. Un escroc peut s'en servir pour se faire passer pour un proche ou un responsable. La parade est simple : raccrocher, rappeler la personne sur un numéro que l'on connaît, et convenir en famille d'un mot de passe que seul un vrai proche connaît.</p>",
      },
      {
        question: "Peut-on l'adapter à nos salariés ?",
        reponse:
          "<p>Oui. La version « Fraude au président, version 2026 » s'adresse aux services comptabilité, paie et achats, et aux assistants de direction : faux dirigeant, faux fournisseur, changement de coordonnées bancaires, voix ou vidéo imitant un responsable. La procédure se construit avec vos équipes, simplement : double validation, rappel sur un numéro connu, délai de vérification.</p>",
      },
      {
        question:
          "La police ou la gendarmerie proposent déjà des interventions : qu'apporte cette conférence en plus ?",
        reponse:
          "<p>Leurs interventions sont précieuses, et à recommander. Cette conférence est complémentaire : comprendre comment l'IA rend les arnaques plus crédibles (voix, messages, faux sites), s'entraîner avec le jeu « Arnaque ou pas ? », et écrire ses propres règles, décidées à froid. Les deux se combinent très bien, par exemple dans un cycle de rendez-vous.</p>",
      },
      {
        question: 'Avec quoi les participants repartent-ils ?',
        reponse:
          "<p>Avec leurs règles non négociables, décidées à l'avance, et les bons numéros : le 33700 pour signaler un SMS frauduleux, la plateforme 17cyber.gouv.fr pour être aidé en ligne, Info Escroqueries au 0 805 805 817. Une fiche « 10 réflexes » à garder chez soi est en préparation [À PRODUIRE].</p>",
      },
    ],
    sources: [
      {
        avant: 'Cybermalveillance.gouv.fr, ',
        titre: "Rapport d'activité 2025",
        apres: ' (communiqué de presse), mars 2026.',
        url: 'https://www.cybermalveillance.gouv.fr/medias/2026/03/CP-RA2026.pdf',
      },
      {
        avant: 'Banque de France, ',
        titre: "Rapport de l'Observatoire de la sécurité des moyens de paiement 2025",
        apres: ', septembre 2026.',
        url: 'https://www.banque-france.fr/fr/publications-et-statistiques/publications/rapport-de-lobservatoire-de-la-securite-des-moyens-de-paiement-2025',
      },
      {
        avant: 'Europol, ',
        titre: 'Internet Organised Crime Threat Assessment (IOCTA) 2026',
        apres:
          " : l'IA générative rend les messages frauduleux plus convaincants et personnalisés.",
        url: 'https://www.europol.europa.eu/cms/sites/default/files/documents/IOCTA-2026.pdf',
      },
    ],
  },

  contact: {
    titre: 'Programmer « Arnaques 2026 » dans votre commune ou votre entreprise',
    chapo:
      'Dites-nous qui sera dans la salle, quand, et le format qui vous intéresse. Nous vous répondons sous 48 h.',
    cta: 'Organiser cette conférence',
  },

  service: {
    name: 'Conférence « Arnaques 2026 » : voix clonées, faux conseillers, faux SMS',
    serviceType: 'Conférence de sensibilisation',
    description:
      "Reconnaître les arnaques rendues plus crédibles par l'IA (voix clonées, faux conseillers bancaires, faux SMS, usurpation de numéro) et savoir quoi faire. Formats : intervention plénière de 45 min à 1 h, conférence de 1 h 30, atelier de 2 h, cycle de 4 rendez-vous.",
    audiences: [
      'Seniors et aidants',
      'Collectivités, CCAS et médiathèques',
      "Salariés d'entreprise",
      'Associations',
    ],
    about: ['Escroquerie', 'Hameçonnage', 'Deepfake'],
  },
};
