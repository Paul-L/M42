// Texte passé dans l'emplacement (slot) d'un composant, rendu tel quel avec `set:html`.
// Astro garde les espaces d'un texte écrit en dur dans un slot (retour à la ligne + indentation)
// et n'échappe pas ses apostrophes ; une expression `{texte}` les échappe et perd ces espaces.
// Cette fonction reproduit le rendu d'origine pour que le HTML produit reste identique
// après le passage du texte dans les modules de données (phase 3). Sans effet visible.

/**
 * Entoure `text` d'un retour à la ligne et de l'indentation d'origine.
 * @param indent indentation de la balise fermante du composant (le texte a 2 espaces de plus).
 */
export function slotText(text: string, indent: number): string {
  return `\n${' '.repeat(indent + 2)}${text}\n${' '.repeat(indent)}`;
}
