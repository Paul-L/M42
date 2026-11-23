// Types des pages « Pour qui » (Entreprises, Événements, Collectivités, Éducation, Associations).
// Structure prête pour la collection Directus `publics` (phase 3) : un enregistrement par page,
// avec des listes ordonnées (enjeux, formats, conférences recommandées, étapes, FAQ).

/**
 * Texte avec marqueurs de relecture en ligne : chaîne simple, ou suite de segments
 * où `{ marker }` est rendu en étiquette pointillée (composant RichText).
 * L'espace avant le marqueur fait partie du segment texte qui précède (« … numéros », puis
 * `{ marker }`, puis « : 33700… ») : on la met ou non comme dans la maquette.
 */
export type PublicSegment = string | { marker: string };
export type PublicRichText = string | PublicSegment[];

export interface PublicLink {
  label: string;
  href: string;
}

/** En-tête de page (composant PublicHero). */
export interface PublicHeroData {
  /** Libellé de la page courante dans le fil d'Ariane. */
  crumb: string;
  eyebrow: string;
  /** H1. */
  title: string;
  lead: string;
  paragraphs: string[];
  primary: PublicLink;
  secondary?: PublicLink;
  /** Texte de l'emplacement photo (« [Photo : …] »), format 4:5. */
  photo: string;
}

/** Enjeu numéroté (« Vos enjeux », composant IssueGrid). */
export interface PublicStake {
  title: string;
  text: string;
  /** Source affichée sous le texte (« Source : … »). */
  source?: string;
}

/** Ligne de la liste des formats (composant PublicFormats). */
export interface PublicFormat {
  title: string;
  /** Précision sous le titre (14 px), marqueurs en ligne possibles. */
  note?: PublicRichText;
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

/** Ligne de « Autres exemples de sujets » (composant TopicList). */
export interface PublicTopic {
  title: string;
  /** Précision sous l'intitulé (15 px). */
  detail?: string;
  /** Étiquette à droite (« Sur demande »). */
  tag?: string;
}

/** Colonne de « Ce que … emporte » (composant TakeawayColumns). */
export interface PublicTakeawayGroup {
  title: string;
  items: PublicRichText[];
}

/** Étape numérotée (« Comment ça se passe », composant StepList). */
export interface PublicStep {
  title: string;
  text: string;
}

/** Étape d'un schéma fléché (composant PublicFlow). */
export interface PublicFlowStep {
  title: string;
  /** Public ou acteur concerné, sous le titre (15 px, graisse 500). */
  detail?: string;
  text: PublicRichText;
}

/** Encadré « Qui intervient » (composant IntervenantsNote). */
export interface PublicTeamNote {
  text: string;
  link: PublicLink;
}

export interface PublicFaqItem {
  question: string;
  /** Réponse : segments (marqueurs en ligne possibles), un paragraphe. */
  answer: PublicRichText;
}

/** Bandeau de contact de fin de page (composant partagé CtaBand). */
export interface PublicCta {
  eyebrow: string;
  title: string;
  lead: string;
  ctaLabel: string;
  ctaHref: string;
}

/** Carte de la règle « Vert, orange, rouge » (composant ColorRuleCards). */
export interface PublicColorRuleCard {
  level: 'vert' | 'orange' | 'rouge';
  label: string;
  title: string;
  items: string[];
  motto: string;
}

/** Colonne « Trois publics, un même langage » (page Éducation, composant EducationAudiences). */
export interface PublicAudience {
  title: string;
  /** Format proposé à ce public (13 px, encre 3). */
  format: string;
  text: string;
}

/** Séquence de l'exemple de déroulé (page Événements, composant KeynoteTimeline). */
export interface PublicTimelineSequence {
  /** Minute de début (« 0:05 »), reprise sur la frise. */
  start: string;
  /** Minute de fin (« 0:14 »). */
  end: string;
  /** Durée relative sur la frise (flex-grow), en minutes. */
  minutes: number;
  /** Séquence qui se termine sur une règle à retenir (barre or sur la frise). */
  highlight?: boolean;
  speakers: string;
  title: string;
  text: string;
  /** Règle à retenir (citation sous le texte). */
  rule?: string;
}
