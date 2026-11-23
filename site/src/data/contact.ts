// Contenus de la page Contact (kit/maquette/Contact.dc.html).
// Listes du formulaire qualifiant et FAQ : regroupées ici pour la bascule vers Directus (phase 3).

import type { FaqItem } from '../components/Faq.astro';

export interface ChoiceOption {
  value: string;
  label: string;
}

/** Type de structure (obligatoire). Valeurs reprises pour le préremplissage `?type=…`. */
export const structureTypes: ChoiceOption[] = [
  { value: 'entreprise', label: 'Entreprise' },
  { value: 'evenement', label: 'Événement, salon ou congrès' },
  { value: 'collectivite', label: 'Collectivité' },
  { value: 'etablissement', label: "Établissement scolaire ou d'enseignement supérieur" },
  { value: 'association', label: "Association ou structure d'accompagnement" },
  { value: 'autre', label: 'Autre' },
];

/** Thème. Valeurs reprises pour le préremplissage `?theme=…`. */
export const themes: ChoiceOption[] = [
  { value: 'ia-au-quotidien', label: "L'IA au quotidien" },
  { value: 'arnaques', label: 'Arnaques et IA' },
  { value: 'desinformation', label: 'Vrai ou faux ? (fausses informations)' },
  { value: 'parents-ados', label: 'Parents, ados et IA' },
  { value: 'sur-mesure', label: 'Sur mesure' },
  { value: 'a-definir', label: 'Je ne sais pas encore' },
];

export const formats: ChoiceOption[] = [
  { value: 'keynote', label: 'Keynote (45 min à 1 h)' },
  { value: 'conference', label: 'Conférence (1 h 30)' },
  { value: 'atelier', label: 'Atelier pratique (2 h)' },
  { value: 'cycle', label: 'Cycle de 4 rendez-vous' },
  { value: 'demi-journee', label: 'Demi-journée sur mesure' },
  { value: 'a-definir', label: 'À définir ensemble' },
];

export const participants: ChoiceOption[] = [
  { value: 'moins-20', label: 'Moins de 20' },
  { value: '20-50', label: '20 à 50' },
  { value: '50-100', label: '50 à 100' },
  { value: '100-300', label: '100 à 300' },
  { value: 'plus-300', label: 'Plus de 300' },
  { value: 'inconnu', label: 'Je ne sais pas encore' },
];

/** Budget indicatif (facultatif) : fourchettes de qualification, pas des prix affichés. */
// [À VALIDER] préciser HT ou TTC dans le libellé
export const budgets: ChoiceOption[] = [
  { value: 'moins-1500', label: 'Moins de 1 500 €' },
  { value: '1500-3000', label: '1 500 à 3 000 €' },
  { value: '3000-6000', label: '3 000 à 6 000 €' },
  { value: 'plus-6000', label: 'Plus de 6 000 €' },
  { value: 'a-definir', label: 'À définir' },
];

/** Étapes « Ce qui se passe ensuite ». */
export const nextSteps: { title: string; text: string }[] = [
  {
    title: 'Votre demande est lue',
    text: 'Clara ou Paul vous répond sous 48 h, par e-mail, ou par téléphone si vous nous avez laissé un numéro.',
  },
  {
    title: 'Un échange pour comprendre',
    text: 'Une vingtaine de minutes [À VALIDER] pour parler de votre public, de vos objectifs, de la salle et de la date.',
  },
  {
    title: 'Une proposition pour votre public',
    text: 'Le programme adapté à votre public, le format retenu et un devis détaillé, frais de déplacement compris.',
  },
];

export const contactFaq: FaqItem[] = [
  {
    question: 'Sous quel délai nous répondez-vous ?',
    answer:
      '<p>Nous répondons à chaque demande sous 48 h [À VALIDER : jours ouvrés], par e-mail ou par téléphone. Si votre date est proche, dites-le dans le message : nous vous indiquons tout de suite si elle est possible. Pour une conférence, prévoyez idéalement quelques semaines entre le premier échange et le jour J [À VALIDER : délai minimal].</p>',
  },
  {
    question: 'Vous déplacez-vous partout en France ?',
    answer:
      "<p>Oui. Basés dans le Sud-Ouest, nous intervenons partout en France, en présentiel ou à distance. Les frais de déplacement et, si besoin, d'hébergement sont indiqués clairement dès le devis, pour que vous puissiez décider en connaissance de cause. Pas de mauvaise surprise le jour J.</p>",
  },
  {
    question: 'Pouvez-vous intervenir à distance ?',
    answer:
      "<p>Oui. Keynotes et conférences se prêtent bien à la visioconférence, avec les mêmes démonstrations en direct et un jeu adapté au vote en ligne. Les ateliers fonctionnent mieux en petit groupe. Nous utilisons l'outil de votre choix [À VALIDER] et faisons un test technique avant la séance.</p>",
  },
  {
    question: 'Faut-il connaître son budget pour nous écrire ?',
    answer:
      "<p>Non, le champ budget est facultatif. Chaque intervention fait l'objet d'un devis adapté à votre structure, à votre public et au format retenu. Si vous avez déjà une enveloppe, l'indiquer nous permet de vous proposer directement le format le plus juste.</p>",
  },
];
