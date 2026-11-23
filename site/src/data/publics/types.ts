// Types des pages « Pour qui » (Entreprises, Événements, Collectivités, Éducation, Associations).
// Structure prête pour la collection Directus `publics` (phase 3) : un enregistrement par page,
// avec des listes ordonnées (enjeux, formats, conférences recommandées, étapes, FAQ).

/**
 * Texte avec marqueurs de relecture en ligne : chaîne simple, ou suite de segments
 * où `{ marker }` est rendu en étiquette pointillée (composant DraftMarker).
 */
export type PublicSegment = string | { marker: string };
export type PublicRichText = string | PublicSegment[];

export interface PublicLink {
  label: string;
  href: string;
}

export interface PublicStake {
  title: string;
  text: string;
  /** Source affichée sous le texte (« Source : … »). */
  source?: string;
}

/** Texte suivi d'un marqueur de relecture facultatif. */
export interface PublicMarkedText {
  text: string;
  /** Marqueur affiché après le texte (« [À PRODUIRE] »). */
  marker?: string;
}

export interface PublicFormat {
  title: string;
  /** Précision sous le titre (14 px). */
  note?: string;
  /** Marqueur de relecture sous le titre, après la précision. */
  marker?: string;
  duration: string;
  participants: string;
}

export interface PublicRecommendedConference {
  /** Chiffre romain de la conférence (I à IV). */
  numeral: string;
  /** Conférence signature : étoile + mention. */
  signature?: boolean;
  title: string;
  href: string;
  summary: string;
  /** Déclinaison pour ce public (« Pour vous : … »). */
  forYou: string;
  formats: string[];
}

export interface PublicOtherSubject {
  title: string;
  detail: string;
  /** Étiquette à droite (« Sur demande »). */
  tag?: string;
}

export interface PublicTakeawayGroup {
  title: string;
  items: PublicMarkedText[];
}

export interface PublicStep {
  title: string;
  text: string;
}

export interface PublicFaqItem {
  question: string;
  /** Réponse : segments (marqueurs en ligne possibles), un paragraphe. */
  answer: PublicRichText;
}
