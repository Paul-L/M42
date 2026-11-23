// Contenus de la conférence I « L'IA au quotidien », conférence signature
// (kit/maquette/Conf-ia-au-quotidien.dc.html). Forme : voir ./types.ts (collection Directus
// `conferences`, phase 3), avec les champs facultatifs propres à cette page (tempsFortEtapes,
// methodes, keynote).
//
// Notes de production de la maquette (commentaire SEO) :
// - Conférence signature : seule étoile d'or des pages Conférences.
// - « Voir clair dans l'IA » (keynote de 45 min du catalogue 04) = section « Version keynote »
//   de cette page, pas une page à part (11, § 1.3) [À DÉCIDER : décision n° 2 de 05].
// - Étude « Your Brain on ChatGPT » : formulation prudente de la maquette reprise mot pour mot
//   (prépublication, 54 participants dont 18 à la dernière séance, « un signal, pas une preuve »).

import { routes } from '../routes';
import type {
  Conference,
  EtapeTempsFort,
  MethodePro,
  MomentKeynote,
  SectionKeynote,
  SectionMethodesPros,
} from './types';

// Types des sections propres à cette page, désormais définis dans ./types.ts (champs facultatifs
// du type Conference) ; ré-exportés ici sous leurs noms d'origine.
export type { EtapeTempsFort, MethodePro, MomentKeynote };

/**
 * Conférence I : les sections propres à la page sont obligatoires ici
 * (étapes du temps fort, tableau des méthodes des pros, section « Version keynote »).
 */
export interface ConferenceIaAuQuotidien extends Conference {
  tempsFortEtapes: EtapeTempsFort[];
  methodes: SectionMethodesPros;
  keynote: SectionKeynote;
}

export const iaAuQuotidien: ConferenceIaAuQuotidien = {
  slug: 'ia-au-quotidien',
  numero: 'I',
  disponibilite: 'catalogue',
  titre: "L'IA au quotidien",
  seo: {
    title: "Conférence « L'IA au quotidien » : bien s'en servir | M42",
    description:
      "Ce que l'IA sait faire, ce qu'elle invente et les méthodes des pros pour garder la main. Conférence, keynote ou atelier, pour tous les publics.",
  },
  surTitre: "Conférence I · Bien utiliser l'intelligence artificielle",
  sousTitre:
    "Vous l'utilisez déjà, ou vous vous en méfiez : ce qu'elle sait faire, ce qu'elle invente, et comment garder la tête aux commandes.",
  promesse:
    "Vous repartez en sachant quand l'IA vous aide, quand elle vous trompe, et comment rester celui qui décide.",
  ctaSecondaire: { label: "Voir l'erreur sûre d'elle", href: '#demonstration' },
  miseAJour: '[À COMPLÉTER : date]',
  fiche: [
    {
      label: 'Pour qui',
      valeur:
        'Grand public, seniors, médiathèques, France Services, associations, salariés, congrès',
    },
    {
      label: 'Formats',
      valeur: 'Keynote 45 min à 1 h · Conférence 1 h 30 · Atelier 2 h · Cycle de 4 rendez-vous',
    },
    { label: 'Participants', valeur: 'Selon la salle · 15 en atelier' },
    { label: 'Où', valeur: 'Partout en France, en présentiel ou à distance · en français' },
  ],

  demonstration: {
    label: "Démonstration : l'erreur sûre d'elle",
    surTitre: "Démonstration · L'erreur sûre d'elle",
    k: 3.6,
    etapes: [
      {
        kicker: 'Démonstration',
        titre: 'Une question simple, posée à une IA.',
        texte:
          "Un titre de roman, une question sur son auteur. Le genre de question que l'on pose tous les jours.",
      },
      {
        kicker: 'La réponse',
        titre: "Rapide, précise, sûre d'elle.",
        texte:
          "Un nom, une date, un éditeur, un prix. Tout a l'air vrai. Rien ne signale le moindre doute.",
      },
      {
        kicker: "L'indice",
        titre: 'Elle cite même une source.',
        texte: "Une revue, un numéro, une date. C'est souvent là que l'on baisse la garde.",
      },
      {
        kicker: 'Le deuxième avis',
        titre: 'Je vérifie ailleurs.',
        texte:
          "Je cherche le livre, puis la source, dans un moteur de recherche ou le catalogue d'une bibliothèque.",
      },
      {
        kicker: 'Le verdict',
        titre: 'Tout était inventé.',
        texte:
          "Le livre, l'autrice, l'éditeur, le prix, la source : rien n'existe. Une IA prédit la suite la plus probable ; elle ne sait pas quand elle ne sait pas.",
      },
      {
        kicker: 'La règle',
        titre: "Je réfléchis d'abord, l'IA ensuite.",
        texte:
          "Et je demande les sources, puis je les vérifie. C'est le réflexe des équipes qui travaillent avec l'IA tous les jours.",
      },
    ],
  },

  enClair:
    "Une IA générative prédit la suite de mots la plus probable : elle ne vérifie pas ce qu'elle écrit. Elle peut donc inventer une réponse, et même une source, avec beaucoup d'assurance. La règle : réfléchir d'abord, demander les sources, puis les vérifier ailleurs.",
  objectifs: {
    titre: 'Ce que vos participants sauront faire',
    items: [
      'À la fin, vous saurez expliquer simplement pourquoi une IA peut se tromper avec assurance.',
      'À la fin, vous saurez formuler une demande qui donne une réponse utile, et la vérifier.',
      'À la fin, vous saurez appliquer cinq règles simples, inspirées des équipes professionnelles, pour garder la main.',
    ],
  },

  programme: {
    surTitre: 'Programme · conférence de 1 h 30',
    titre: "Ce que l'on voit ensemble",
    chapo:
      'Une démonstration en direct, des cas tirés du quotidien de la salle, et cinq règles à appliquer dès le lendemain.',
    blocs: [
      {
        titre: "Ce qu'elle est vraiment",
        duree: '15 min',
        texte:
          "Une machine qui prédit la suite la plus probable, pas une encyclopédie. Démonstration en direct : une réponse fausse, sûre d'elle, avec une source inventée.",
      },
      {
        titre: 'Les bons usages',
        duree: '20 min',
        texte:
          "Comprendre un courrier administratif, préparer un entretien, s'organiser, traduire. Pour chaque cas : la mauvaise demande, puis la bonne.",
      },
      {
        titre: 'Garder son cerveau aux commandes',
        duree: '15 min',
        texte:
          "L'étude « Your Brain on ChatGPT » (MIT, 2025), présentée honnêtement : 54 participants, dont 18 à la dernière séance, rédaction d'essais uniquement, prépublication. Un signal, pas une preuve. Règle : « Je réfléchis d'abord, l'IA ensuite. »",
      },
      {
        titre: 'Les méthodes des pros, version maison',
        duree: '15 min',
        texte:
          "Le deuxième avis ; mes règles non négociables ; je ne donne pas les clés ; je sais ce que je cherche ; je demande les sources. Chaque règle part d'une pratique réelle des équipes qui travaillent avec des agents IA.",
      },
      {
        titre: 'Vos données, votre vie privée',
        duree: '10 min',
        texte:
          "Ce qu'on ne colle jamais dans une IA. Les réglages à vérifier. Questions de la salle.",
      },
    ],
  },

  tempsFort: {
    id: 'temps-fort',
    titre: "L'erreur sûre d'elle",
    chapo:
      "Une question piège, posée en direct. L'IA invente une réponse et une source. La salle doit trouver l'erreur, puis en tire la règle du deuxième avis.",
    note: 'Chaque démonstration aura une vidéo de secours, en cas de panne de connexion [À PRODUIRE avant la première intervention].',
    notePosition: 'after',
  },

  tempsFortEtapes: [
    { titre: 'La question piège', texte: "Posée en direct, à l'écran, devant toute la salle." },
    {
      titre: 'La salle enquête',
      texte: "Chacun cherche l'erreur. La source citée est recherchée à l'écran : introuvable.",
    },
    {
      titre: 'La règle qui reste',
      texte: 'Le deuxième avis : je demande les sources, et je les vérifie ailleurs.',
    },
  ],

  methodes: {
    surTitre: 'Les méthodes des pros, version maison',
    titre: "Cinq règles venues des équipes qui travaillent avec l'IA",
    chapo:
      'Les équipes qui confient des tâches à des agents IA ne leur font jamais confiance aveuglément. Chaque pratique professionnelle devient une règle simple, pour chacun.',
    colonnes: ['Chez les pros', 'Version maison', 'En pratique'],
    items: [
      {
        pro: 'Double relecture',
        maison: 'Le deuxième avis',
        pratique:
          'Pour ce qui compte, je fais vérifier : par une autre source, ou par une personne.',
      },
      {
        pro: 'Garde-fous fixes',
        maison: 'Mes règles non négociables',
        pratique: "Je décide à froid ce que je ne ferai jamais avec une IA, et je m'y tiens.",
      },
      {
        pro: 'Droits limités',
        maison: 'Je ne donne pas les clés',
        pratique: "Rien n'envoie, ne paie ou ne signe à ma place sans que je valide.",
      },
      {
        pro: "Objectif écrit avant d'agir",
        maison: 'Je sais ce que je cherche',
        pratique: 'Je formule mon attente avant de lire la réponse, puis je compare.',
      },
      {
        pro: 'Traçabilité',
        maison: 'Je demande les sources',
        pratique: 'Une réponse sans source vérifiable reste une piste, pas une information.',
      },
    ],
  },

  keynote: {
    surTitre: 'Version keynote · 45 minutes',
    titre: '45 minutes, trois règles à appliquer dès le lendemain',
    chapo:
      'Pour une ouverture de séminaire, une convention, un congrès ou un salon : une idée forte, deux démonstrations, un jeu avec la salle, et trois règles que chacun peut appliquer.',
    note: "[À DÉCIDER : garder le nom « Voir clair dans l'IA » pour cette version, ou « L'IA au quotidien, version keynote » ; une seule conférence signature]",
    deroule: [
      {
        minute: '0:00',
        titre: 'Ouverture.',
        texte:
          "La nébuleuse d'Orion : à l'œil nu, une tache floue ; avec les bons repères, une pouponnière d'étoiles.",
      },
      {
        minute: '0:02',
        titre: 'Le vote.',
        texte:
          "Qui utilise l'IA ? Qui s'en méfie ? 48 % des Français de 12 ans et plus l'utilisent, 52 % s'en méfient (Baromètre du numérique, édition 2026).",
      },
      {
        minute: '0:05',
        titre: "L'erreur sûre d'elle.",
        texte: 'Une question piège, une source inventée, cherchée devant la salle.',
      },
      {
        minute: '0:14',
        titre: 'Le cerveau aux commandes.',
        texte:
          'Les études du MIT et de Microsoft avec Carnegie Mellon, présentées avec leurs limites : des signaux, pas des verdicts.',
      },
      {
        minute: '0:20',
        titre: 'Le jeu « Vrai ou IA ? »',
        texte: 'Deux photos, une voix, un article. La salle vote, puis on montre les indices.',
      },
      {
        minute: '0:30',
        titre: 'Les coulisses des pros.',
        texte:
          'Cinq pratiques des équipes qui font travailler des agents IA, traduites pour la salle.',
      },
      {
        minute: '0:39',
        titre: 'Demain matin.',
        texte:
          'Chacun choisit une règle et la note ; deux ou trois personnes la lisent à voix haute.',
      },
      {
        minute: '0:44',
        titre: 'Clôture.',
        texte: "« L'IA n'est ni une menace ni un miracle. Gardez la tête, gardez la main. »",
      },
    ],
    regles: [
      "« Je réfléchis d'abord, l'IA ensuite. »",
      "« Quand je ressens une émotion forte, je m'arrête avant de croire ou de partager. »",
      "« Je ne donne pas les clés : rien n'envoie, ne paie ou ne signe à ma place sans que je valide. »",
    ],
    lien: {
      label: "Un keynote sur l'IA pour votre séminaire ou votre congrès",
      href: routes['Evenements.dc.html'],
    },
  },

  formats: {
    titre: 'Quatre façons de la programmer',
    items: [
      {
        duree: '45 min à 1 h',
        titre: 'Keynote ou intervention plénière',
        texte:
          "Ce qu'elle est vraiment, le cerveau aux commandes, les méthodes des pros : la démonstration et les trois règles. Déroulé ci-dessus.",
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
          '15 personnes. Chacun teste sur son téléphone, sur ses propres cas, et repart avec sa fiche « mes 5 règles » [À PRODUIRE].',
      },
      {
        duree: '4 rendez-vous',
        titre: 'Cycle',
        texte:
          'Le programme réparti sur quatre séances, pour un groupe stable : médiathèque, association, service [À VALIDER : rythme et déroulé].',
      },
    ],
  },

  publics: {
    titre: 'Les exemples changent, les règles restent',
    chapo:
      "Les cas d'usage sont pris dans le quotidien de votre public : vie pratique, démarches, métier.",
    items: [
      {
        titre: 'Collectivités & médiathèques',
        href: routes['Collectivites.dc.html'],
        texte:
          'Une conférence grand public pour les habitants, en médiathèque, en France Services ou avec le CCAS.',
      },
      {
        titre: 'Associations & accompagnement',
        href: routes['Associations.dc.html'],
        texte:
          'Des repères simples et rassurants pour les bénévoles, les seniors et les personnes accompagnées.',
      },
      {
        titre: 'Entreprises & CSE',
        href: routes['Entreprises.dc.html'],
        texte:
          "Courriels, comptes rendus, synthèses, recherche d'information : les cas des métiers présents dans la salle.",
        declinaison: "Déclinaison : « L'IA au bureau, les bons réflexes »",
      },
      {
        titre: 'Événements & congrès',
        href: routes['Evenements.dc.html'],
        texte:
          'La version keynote de 45 minutes, pour ouvrir ou clore un séminaire, une convention ou un salon.',
      },
    ],
  },

  declinaisonEntreprise: {
    titre: "L'IA au bureau, les bons réflexes",
    texte:
      "Les cas d'usage deviennent ceux des métiers présents dans la salle. La partie 5 devient « Les données de l'entreprise » : ce qui ne sort jamais, comment lire la charte interne, ou comment en écrire une. Idéal pour un CSE ou une demi-journée de sensibilisation de tous les salariés.",
    lien: {
      label: "Sensibiliser vos salariés à l'IA",
      href: routes['Entreprises.dc.html'],
    },
  },

  faq: {
    titre: 'Avant de programmer cette conférence',
    items: [
      {
        question: "Faut-il déjà utiliser l'IA pour suivre la conférence ?",
        reponse:
          "<p>Non. Elle s'adresse autant à ceux qui n'ont jamais ouvert un assistant d'IA qu'à ceux qui s'en servent chaque jour. Les premiers comprennent ce que c'est et ce qu'il faut en attendre ; les seconds repartent avec des méthodes pour vérifier et garder la main. Le vocabulaire reste simple, et chaque notion est montrée en direct avant d'être expliquée.</p>",
      },
      {
        question: "Qu'est-ce qu'une « hallucination » d'IA ?",
        reponse:
          "<p>C'est une réponse fausse produite avec assurance par une IA : un fait, une citation ou une source qui n'existent pas. Elle vient du fonctionnement même de l'outil, qui prédit la suite de texte la plus probable sans vérifier ce qu'il écrit. On s'en protège en demandant les sources, en les ouvrant, et en recoupant ailleurs les informations importantes.</p>",
      },
      {
        question: 'Quelle différence entre la conférence et la version keynote ?',
        reponse:
          "<p>La conférence de 1 h 30 déroule le programme complet en cinq parties, avec un temps d'échange. La version keynote tient en 45 minutes : une idée forte, deux démonstrations, le jeu « Vrai ou IA ? » et trois règles. Elle est pensée pour ouvrir ou clore un séminaire, une convention ou un congrès, et s'adapte aux métiers de la salle.</p>",
      },
      {
        question: "Peut-on l'adapter à une entreprise ?",
        reponse:
          "<p>Oui, c'est la déclinaison « L'IA au bureau, les bons réflexes ». Les exemples viennent des métiers présents dans la salle : courriels, comptes rendus, synthèses, recherche d'information. La dernière partie porte sur les données de l'entreprise : ce qui ne sort jamais, comment lire la charte interne, ou comment en écrire une. Elle convient à un CSE comme à une sensibilisation de tous les salariés.</p>",
      },
      {
        question: 'La conférence porte-t-elle sur un outil en particulier ?',
        reponse:
          "<p>Non. Aucun outil n'est vendu. Les démonstrations s'appuient sur des assistants d'IA grand public courants, et les règles valent quel que soit l'outil utilisé. L'objectif n'est pas d'apprendre un logiciel, mais de savoir quand lui faire confiance, comment vérifier ce qu'il produit, et ce qu'il ne faut jamais lui confier.</p>",
      },
    ],
    sources: [
      {
        avant: 'Kosmyna et al., ',
        titre: 'Your Brain on ChatGPT',
        apres:
          ', MIT Media Lab, prépublication arXiv, juin 2025, révisée en décembre 2025. 54 participants. Statut à vérifier avant chaque intervention.',
        url: 'https://arxiv.org/abs/2506.08872',
      },
      {
        avant: 'Lee et al. (Microsoft Research et Carnegie Mellon University), ',
        titre: 'The Impact of Generative AI on Critical Thinking',
        apres: ', CHI 2025. 319 professionnels.',
        url: 'https://www.microsoft.com/en-us/research/?p=1135061',
      },
      {
        avant: 'Arcep, CREDOC et partenaires, ',
        titre: 'Baromètre du numérique, édition 2026',
        apres: ', février 2026.',
        url: 'https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/barometre-du-numerique/le-barometre-du-numerique-edition-2026.html',
      },
      {
        avant: '',
        titre: 'International AI Safety Report 2026',
        apres:
          ', présidé par Yoshua Bengio, février 2026 : état des connaissances sur les capacités et les limites des IA.',
        url: 'https://yoshuabengio.org/en/publication/international-ai-safety-report-2026',
      },
    ],
  },

  contact: {
    titre: "Programmer « L'IA au quotidien » pour votre public",
    chapo:
      "Conférence, keynote d'ouverture ou atelier : dites-nous qui sera dans la salle, quand, et ce que vous attendez. Nous vous répondons sous 48 h.",
    cta: 'Organiser cette conférence',
  },

  service: {
    name: "Conférence « L'IA au quotidien » : bien utiliser l'intelligence artificielle",
    serviceType: 'Conférence de sensibilisation',
    description:
      "Comprendre ce que l'IA générative sait faire, repérer quand elle invente une réponse ou une source, et adopter cinq règles inspirées des équipes professionnelles pour garder la main. Formats : keynote de 45 min à 1 h, conférence de 1 h 30, atelier de 2 h, cycle de 4 rendez-vous.",
    audiences: [
      'Grand public et seniors',
      'Collectivités, médiathèques et France Services',
      'Associations',
      "Salariés d'entreprise",
      'Événements et congrès',
    ],
    about: ['Intelligence artificielle générative', 'Hallucination (intelligence artificielle)'],
  },
};
