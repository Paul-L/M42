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

/* Page complète : un enregistrement Directus `publics`, sérialisable en JSON (chaînes, nombres,
   booléens, tableaux, objets ; ni fonction, ni image importée, ni valeur calculée depuis un autre
   module). Les sections propres à une page sont facultatives. */

/** Ouverture de section (composant PublicSectionHead) : sur-titre, H2, chapô facultatif. */
export interface PublicSectionIntro {
  eyebrow: string;
  title: string;
  lead?: string;
}

/** Public visé (JSON-LD du Service) : `Audience`, ou `EducationalAudience` si `educationalRole`. */
export interface PublicServiceAudience {
  audienceType: string;
  /** Rôle schema.org (student, teacher, parent). */
  educationalRole?: string;
}

/** Service décrit par le JSON-LD de la page ; sa description reprend le texte de l'en-tête. */
export interface PublicServiceSeo {
  name: string;
  serviceType: string;
  audience: PublicServiceAudience[];
  /** Sujets traités (`Thing`), dans l'ordre. */
  about?: string[];
  /** Ajoute la note sous les formats à la description (zone sans frais de déplacement). */
  descriptionWithFormatsNote?: boolean;
}

export interface PublicSeo {
  /** Balise title et meta description (commentaire SEO de la maquette). */
  title: string;
  description: string;
  service: PublicServiceSeo;
}

/** Intitulés d'interface des pages « Pour qui » (repris tels quels de la maquette). */
export interface PublicLabels {
  /** Premier élément du fil d'Ariane (« Accueil »), repris dans le JSON-LD. */
  home: string;
  /** Début de la ligne propre au public sur les cartes de conférence (« Pour vous : »). */
  forYou: string;
  /** Mention de la conférence signature (étoile or). */
  signature: string;
  /** Faux lien en bas des cartes de conférence (« Voir le programme »). */
  conferenceCta: string;
  /** Intitulés des colonnes de la liste des formats. */
  duration: string;
  participants: string;
}

/** Schéma en étapes fléchées (composant PublicFlow). */
export interface PublicFlowSection extends PublicSectionIntro {
  /** Nom accessible de la liste. */
  label: string;
  items: PublicFlowStep[];
  /** Encadré sous le schéma. */
  note?: string;
}

/**
 * Question de FAQ suspendue à une condition (page Éducation : [SI RÉFÉRENCEMENT ADAGE OBTENU]).
 * Tant que `published` vaut false, la question n'est ni affichée ni balisée (FAQPage), et la note
 * de relecture reste visible sous la FAQ.
 */
export interface PublicPendingFaqItem {
  published: boolean;
  item: PublicFaqItem;
  reviewNote: string;
}

/** Une page « Pour qui » entière (un enregistrement de la collection `publics`). */
export interface PublicPage {
  /** Segment d'URL : la page est servie sous `/<slug>/`. */
  slug: string;
  seo: PublicSeo;
  labels: PublicLabels;
  hero: PublicHeroData;
  stakes: PublicSectionIntro & { items: PublicStake[] };
  /** Entreprises : règle vert / orange / rouge. */
  colorRule?: PublicSectionIntro & { cards: PublicColorRuleCard[]; note: PublicRichText };
  /** Éducation : « Trois publics, un même langage » (ordre Élèves, Enseignants, Parents). */
  audiences?: PublicSectionIntro & { items: PublicAudience[] };
  /** Associations : schéma « Le relais ». */
  relay?: PublicFlowSection;
  formats: PublicSectionIntro & {
    items: PublicFormat[];
    /** Paragraphe sous la liste. */
    note?: string;
    link?: PublicLink;
  };
  /** Événements : exemple de déroulé d'une keynote (section nuit). */
  rundown?: PublicSectionIntro & {
    /** Minute du repère final de la frise. */
    end: string;
    legend: string;
    sequences: PublicTimelineSequence[];
    note?: string;
    link?: PublicLink;
  };
  /** Événements : kit organisateur. */
  kit?: PublicSectionIntro & { link: PublicLink; items: PublicRichText[] };
  conferences: PublicSectionIntro & {
    items: PublicRecommendedConference[];
    otherTitle: string;
    others: PublicTopic[];
    /** Note sous « Autres exemples de sujets ». */
    othersNote?: string;
    link: PublicLink;
  };
  takeaways: PublicSectionIntro & { groups: PublicTakeawayGroup[] };
  steps: PublicSectionIntro & { items: PublicStep[]; team: PublicTeamNote };
  /** Collectivités : « Commander une intervention » et sa source. */
  order?: PublicFlowSection & { source: string };
  faq: PublicSectionIntro & { items: PublicFaqItem[]; pending?: PublicPendingFaqItem };
  cta: PublicCta;
}
