/**
 * Forme des contenus des pages légales (src/data/legal/*.ts), prête pour Directus.
 * Données sérialisables en JSON uniquement.
 *
 * Conventions de rendu (le HTML produit doit rester identique à la maquette intégrée) :
 * - champ `html` : HTML rendu tel quel ; balises en ligne permises : `<a class="legal-a" …>`, `<strong>` ;
 * - champ `text` : texte brut, échappé au rendu (les apostrophes deviennent `&#39;`).
 */

/** Contenu d'une cellule ou d'une puce : texte brut ou HTML en ligne. */
export type LegalInline = { text: string } | { html: string };

/** Ligne d'une liste de définitions : terme (texte brut) et définition. */
export interface LegalRow {
  term: string;
  def: LegalInline;
}

/** Bloc de contenu d'une section, dans l'ordre d'affichage. */
export type LegalBlock =
  /** Paragraphe courant (`legal-p`). */
  | { type: 'p'; html: string }
  /** Note en petit corps (`legal-note`). */
  | { type: 'note'; html: string }
  /** Sous-titre ; `spaced` : 2e sous-titre d'une section (marge 8 px). */
  | { type: 'h3'; text: string; spaced?: boolean }
  /** Liste de définitions ; `fixed` : colonne des termes fixe (15rem). */
  | { type: 'dl'; fixed?: boolean; rows: LegalRow[] }
  /** Liste à puces. */
  | { type: 'ul'; items: LegalInline[] }
  /** Encadré « [À DÉCIDER] » : nom accessible, titre et paragraphes (HTML). */
  | { type: 'aside'; label: string; title: string; paragraphs: string[] }
  /** Adresse postale suivie d'un lien externe (icône ajoutée au rendu). */
  | { type: 'address'; address: string; link: { href: string; label: string } };

/** Section numérotée ; `title` sert aussi d'entrée de sommaire. */
export interface LegalSection {
  /** Ancre de la section (sommaire). */
  id: string;
  /** id du titre h2 (aria-labelledby). */
  headingId: string;
  /** Titre (rendu tel quel dans le h2, échappé dans le sommaire). */
  title: string;
  blocks: LegalBlock[];
}
