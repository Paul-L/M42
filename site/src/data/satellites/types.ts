// Types des pages satellites (kit/maquette/Sat-*.dc.html) : pages éditoriales à sommaire.
// Les champs `html` acceptent du HTML simple (gras, liens, classes de satellites.css) :
// texte exact de la maquette, marqueurs [À …] conservés.

/** Élément du fil d'Ariane (même forme que `Crumb` de components/Breadcrumb.astro). */
export interface Crumb {
  label: string;
  href?: string;
}

/** Question de FAQ (même forme que `FaqItem` de components/Faq.astro) ; `answer` en HTML simple. */
export interface FaqItem {
  question: string;
  answer: string;
  /** false : réponse visible mais hors FAQPage (source encore à vérifier, DECISIONS.md point 19). */
  jsonLd?: boolean;
}

export interface SatLink {
  href: string;
  label: string;
}

/** Entrée du sommaire « Sur cette page ». */
export type SatTocItem = SatLink;

/** Chiffre clé sourcé. */
export interface SatFigure {
  value: string;
  label: string;
  source: string;
}

/** Élément de liste numérotée (titre en H3, corps en HTML simple). */
export interface SatNumberedItem {
  title: string;
  html: string;
}

/** Ligne de tableau : en-tête de ligne et cellules en HTML simple. */
export interface SatTableRow {
  head: string;
  cells: string[];
}

export interface SatTable {
  caption: string;
  columns: string[];
  rows: SatTableRow[];
}

/** Ligne de liste de définitions (« Ce qu'il faut prévoir »). */
export interface SatDefinition {
  term: string;
  html: string;
}

/** Lien de « Pages liées ». */
export interface SatRelatedLink extends SatLink {
  description: string;
}

export interface SatSeo {
  path: string;
  title: string;
  description: string;
}

/** Bandeau d'appel à l'action de bas de page. */
export interface SatCtaData {
  eyebrow: string;
  title: string;
  lead: string;
  /** Note sous le texte (marqueur [À …] le plus souvent). */
  note?: string;
  primary: SatLink;
  secondary?: SatLink;
}

/**
 * Paragraphe : `text` (texte brut, échappé au rendu) ou `html` (balises en ligne :
 * gras, liens, classes de satellites.css ; rendu avec set:html). Un seul des deux.
 */
export interface SatParagraph {
  text?: string;
  html?: string;
  /** « source » : petite ligne de source sous un paragraphe. */
  variant?: 'body' | 'source';
}

/** Carte titre + texte (« Les quatre erreurs »). */
export interface SatCard {
  title: string;
  text: string;
}

/** Point fort : début en gras, suite en texte normal (« Ce que vos équipes emportent »). */
export interface SatHighlight {
  strong: string;
  rest: string;
}

/** Colonne de l'exercice de tri (bordure de couleur selon `level`). */
export interface SatSortColumn {
  level: 'vert' | 'orange' | 'humain';
  label: string;
}

/**
 * Bloc de contenu d'une section, décrit par son `type`. Le rendu (composant, classes) est
 * dans la page ; le module ne contient que du texte et des liens.
 */
export type SatBlock =
  | ({ type: 'text' } & SatParagraph)
  | { type: 'figures'; items: SatFigure[] }
  /** Encadré : libellé puis paragraphes et/ou liste numérotée. */
  | { type: 'box'; label: string; paragraphs?: SatParagraph[]; list?: string[] }
  | { type: 'quote'; text: string }
  | { type: 'numbered'; items: SatNumberedItem[] }
  /** Note latérale (« À retenir », « À lire avec prudence »…). */
  | { type: 'note'; label: string; text: string }
  /** Lien « Voir aussi » en fin de section. */
  | ({ type: 'more' } & SatLink)
  | { type: 'table'; table: SatTable }
  | { type: 'definitions'; items: SatDefinition[] }
  /** Bloc en attente de contenu (texte = marqueur de relecture). */
  | { type: 'draft'; text: string }
  /** Emplacement vidéo (texte de l'emplacement). */
  | { type: 'video'; label: string }
  | { type: 'cards'; items: SatCard[] }
  | { type: 'highlights'; items: SatHighlight[] }
  | { type: 'sort'; columns: SatSortColumn[]; caption: string }
  | { type: 'faq'; items: FaqItem[] }
  /** Pages liées, avec une note facultative en dessous. */
  | { type: 'links'; items: SatRelatedLink[]; note?: string };

/**
 * Section du corps d'une page satellite.
 * - `section` (par défaut) : sur-titre + H2 ;
 * - `step` : étape numérotée d'un guide (numéro et total déduits de l'ordre des étapes) ;
 * - `minor` : H2 discret, sans sur-titre.
 */
export interface SatSectionData {
  /** Ancre de la section (appelée par le sommaire, parfois par d'autres pages). */
  id: string;
  kind?: 'section' | 'step' | 'minor';
  eyebrow?: string;
  title: string;
  blocks: SatBlock[];
}

/** Sources de bas de page, avec notes facultatives. */
export interface SatSourcesData {
  items: string[];
  notes?: string[];
}

/**
 * Page satellite complète : un objet sérialisable en JSON (un enregistrement `pages` de Directus).
 * `Hero` varie selon la page (photo, encadré « En bref », publics…).
 */
export interface SatPage<Hero> {
  seo: SatSeo;
  crumbs: Crumb[];
  hero: Hero;
  toc: SatTocItem[];
  sections: SatSectionData[];
  sources: SatSourcesData;
  cta: SatCtaData;
}
