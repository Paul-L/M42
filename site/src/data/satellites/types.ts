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
