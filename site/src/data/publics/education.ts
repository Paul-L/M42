// Contenus de la page Éducation (kit/maquette/Education.dc.html), URL /education/.
// Structure prête pour la collection Directus `publics` (phase 3) : un enregistrement par page
// « Pour qui », avec des listes ordonnées (enjeux, formats, conférences, étapes, FAQ).
// Textes repris mot pour mot de la maquette (espaces normales : le middleware ajoute les insécables).

import { routes } from '../routes';
import type {
  PublicFormat,
  PublicLink,
  PublicRecommendedConference,
  PublicStake,
  PublicStep,
  PublicTakeawayGroup,
} from './types';
import type { EducationAudience } from '../../components/publics/EducationAudiences.astro';
import type { FaqItem } from '../../components/Faq.astro';

export const seo = {
  title: 'Intervention IA en collège, lycée et pour les parents | M42',
  description:
    "Apprendre avec l'IA, pas à sa place : interventions pour élèves, enseignants et parents. Devoirs, esprit critique, fausses infos, cyberharcèlement.",
  url: 'https://m42.guide/education/',
};

export const hero = {
  crumb: 'Éducation',
  eyebrow: 'Établissements scolaires & familles',
  title: "Apprendre avec l'IA, pas à sa place.",
  lead: "Vos élèves utilisent déjà l'IA. Pour leurs devoirs, leurs images, leurs messages.",
  paragraphs: [
    "Des interventions sur l'intelligence artificielle leur apprennent à s'en servir avec esprit critique : ce qui aide à apprendre, ce qui revient à tricher, comment vérifier une image.",
    "Enseignants et parents reçoivent les mêmes repères, pour tenir un discours commun. Au collège, au lycée et dans l'enseignement supérieur.",
  ],
  primary: { label: 'Nous contacter', href: routes['Contact.dc.html'] } satisfies PublicLink,
  secondary: { label: 'Voir les formats', href: '#formats' } satisfies PublicLink,
  photo:
    "[Photo : intervention en classe, élèves en petits groupes devant une image à vérifier, enseignant présent, sans visage d'élève identifiable, 4:5, à produire]",
};

export const stakes: PublicStake[] = [
  {
    title: "Les devoirs à l'heure de l'IA",
    text: 'Interdire ne suffit pas. Il faut apprendre aux élèves ce qui aide à apprendre, et ce qui revient à tricher.',
  },
  {
    title: 'Le vrai, le faux et le fabriqué',
    text: "Images générées, vidéos truquées, faux sites d'information : l'éducation aux médias devient une priorité.",
  },
  {
    title: 'Réseaux sociaux et cyberharcèlement',
    text: "En 2025, les demandes d'aide pour cyberharcèlement reçues par Cybermalveillance.gouv.fr ont augmenté de 138 %, tous âges confondus. Élèves, parents et équipes doivent parler le même langage.",
    source: 'Source : Cybermalveillance.gouv.fr, bilan 2025',
  },
];

export const audiences: EducationAudience[] = [
  {
    title: 'Élèves',
    format: 'Intervention en classe · conférence pour un niveau',
    text: 'Ce qui aide à apprendre, ce qui revient à tricher. Vérifier une image, une vidéo, une information avant de la croire ou de la partager.',
  },
  {
    title: 'Enseignants',
    format: "Temps d'équipe de 2 h à 3 h",
    text: "Les usages possibles de l'IA en classe, ses limites, et des règles communes à l'établissement, pour que chaque collègue tienne le même discours.",
  },
  {
    title: 'Parents',
    format: 'Soirée parents de 1 h 30',
    text: "Les devoirs avec l'IA, les réseaux sociaux, le cyberharcèlement : des repères pour parler à la maison le même langage qu'à l'école.",
  },
];

export const formats: PublicFormat[] = [
  {
    title: 'Intervention en classe',
    duration: '1 h à 2 h',
    participants: "Une classe, en présence de l'enseignant",
  },
  {
    title: 'Conférence pour un niveau',
    duration: '1 h à 1 h 30',
    participants: 'Plusieurs classes, amphithéâtre ou CDI',
  },
  {
    title: "Temps d'équipe pour les enseignants",
    marker: '[À VALIDER : nouveau format]',
    duration: '2 h à 3 h',
    participants: "L'équipe pédagogique",
  },
  { title: 'Soirée parents', duration: '1 h 30', participants: 'Selon la salle' },
  {
    title: 'Enseignement supérieur : conférence, atelier ou séance de cours',
    duration: 'Selon le format',
    participants: 'Amphithéâtre ou groupe de TD',
  },
];

export const formatsNote =
  "Collèges, lycées (y compris professionnels), établissements d'enseignement supérieur.";

export const conferences: PublicRecommendedConference[] = [
  {
    numeral: 'III',
    title: 'Vrai ou faux ?',
    href: routes['Conf-desinformation-ia.dc.html'],
    summary: "Repérer une image truquée, une fausse vidéo ou un faux site d'information.",
    forYou:
      "« Vrai ou IA ? » : une méthode de vérification en 4 étapes, appliquée à de vrais exemples. Une activité d'analyse, pas un simple jeu.",
    formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
  },
  {
    numeral: 'IV',
    title: 'Parents, ados et IA',
    href: routes['Conf-parents-ados-ia.dc.html'],
    summary: "Devoirs avec l'IA sans tricher, réseaux sociaux, cyberharcèlement.",
    forYou: 'La soirée parents, avec la charte numérique de la famille et le 3018.',
    formats: ['Keynote', 'Conférence', 'Atelier', 'Cycle'],
  },
];

export const otherSubjects = {
  title: 'Autres exemples de sujets',
  items: [
    {
      title: 'Comment marche une IA ?',
      text: "Ce qu'elle sait faire, ce qu'elle invente, pourquoi elle se trompe.",
    },
    {
      title: "Devoirs avec l'IA : ce qui aide, ce qui triche",
      text: 'Des règles simples, applicables dès le lendemain.',
    },
    {
      title: "Enseignants : l'IA en classe",
      text: "Usages possibles, limites, règles communes à l'établissement.",
    },
    {
      title: "Supérieur : travailler avec l'IA sans cesser de penser",
      text: 'Ce que disent les premières études, présentées honnêtement.',
    },
  ],
};

export const takeaways: PublicTakeawayGroup[] = [
  {
    title: 'Élèves',
    items: [
      {
        text: 'La méthode de vérification en 4 étapes, sur une fiche simple',
        marker: '[À PRODUIRE]',
      },
    ],
  },
  {
    title: 'Parents',
    items: [
      {
        text: 'La charte numérique de la famille, à remplir à la maison',
        marker: '[À PRODUIRE]',
      },
      { text: 'Le 3018, numéro national contre le cyberharcèlement' },
    ],
  },
  {
    title: 'Enseignants',
    items: [
      {
        text: 'Des repères pour la classe et des ressources pour prolonger le travail',
        marker: '[À PRODUIRE]',
      },
    ],
  },
];

export const steps: PublicStep[] = [
  {
    title: "Un échange avec l'équipe",
    text: 'Enseignant, professeur documentaliste, CPE ou direction : niveau, objectifs, lien avec les programmes.',
  },
  {
    title: "Une proposition adaptée à l'âge",
    text: 'Contenu, déroulé, devis. Nous vous indiquons les modalités de financement possibles.',
  },
  {
    title: "L'intervention, puis le prolongement",
    text: "En présence de l'enseignant. Ressources transmises pour poursuivre en classe.",
  },
];

export const intervenants = {
  text: "Qui intervient : Clara Peron, formatrice d'adultes, et Paul Loustaunau, qui conçoit l'IA au quotidien, en lien étroit avec l'équipe pédagogique.",
  linkLabel: 'Parcours et démarche',
  href: routes['A-propos.dc.html'],
};

/** Réponses en HTML simple (un paragraphe) : identiques au balisage FAQPage (balises retirées). */
export const faq: FaqItem[] = [
  {
    question: "L'enseignant reste-t-il présent pendant l'intervention ?",
    answer:
      "<p>Oui. Les interventions en classe se déroulent toujours en présence de l'enseignant, qui reste responsable de l'activité. Le contenu se prépare avec lui ou avec le professeur documentaliste, pour qu'il puisse prolonger le travail ensuite.</p>",
  },
  {
    question: 'À partir de quel niveau ?',
    answer:
      "<p>Du collège à l'enseignement supérieur, y compris en lycée professionnel. Les contenus sont adaptés à l'âge. Le cadre d'usage de l'IA en éducation (juin 2025) autorise l'usage de l'IA par les élèves à partir de la 4e, en classe : les exemples et les règles proposés en tiennent compte.</p>",
  },
  {
    question: 'Qui peut financer une soirée parents ?',
    answer:
      "<p>Selon les établissements, le budget de l'établissement ou une association de parents d'élèves. Nous vous indiquons les modalités possibles lors du premier échange, et nous vous transmettons le programme et le devis nécessaires.</p>",
  },
  {
    question: 'Le cyberharcèlement est-il abordé avec les élèves ?',
    answer:
      '<p>Oui, dans les interventions sur les réseaux sociaux et dans la soirée parents : reconnaître les situations, réagir, savoir à qui en parler. Le 3018, numéro national contre le cyberharcèlement, est rappelé à chaque fois.</p>',
  },
];

/**
 * [SI RÉFÉRENCEMENT ADAGE OBTENU] Question à ajouter à la FAQ (03 D, décision n° 7 de 05).
 * Tant que `ADAGE_REFERENCE` vaut false, la question n'est ni affichée ni balisée (FAQPage),
 * et la note de relecture de la maquette reste visible sous la FAQ.
 * Attention : présenter « Vrai ou IA ? » comme une activité d'analyse et de vérification,
 * pas comme un jeu.
 */
export const ADAGE_REFERENCE = false;

export const faqPassCulture: FaqItem = {
  question: 'Votre intervention peut-elle être financée par le pass Culture ?',
  answer:
    "<p>La part collective du pass Culture finance des actions d'éducation artistique et culturelle, dont l'éducation aux médias et à l'information et la culture scientifique. Elle passe par des intervenants référencés sur ADAGE. [Statut de notre référencement ADAGE]. Les séances de prévention du cyberharcèlement n'en relèvent pas : elles peuvent être financées par l'établissement ou une association de parents d'élèves.</p>",
};

export const faqReviewNote =
  'Note de relecture [SI RÉFÉRENCEMENT ADAGE OBTENU] : ajouter ici la question sur le financement par le pass Culture (texte en commentaire dans le code). Sinon, ne rien publier.';

export const cta = {
  eyebrow: 'Contact',
  title: 'Construisons une intervention pour vos élèves',
  lead: 'Dites-nous le niveau, le nombre de classes et le thème. Réponse sous 48 h.',
  ctaLabel: 'Nous contacter',
  ctaHref: routes['Contact.dc.html'],
};
