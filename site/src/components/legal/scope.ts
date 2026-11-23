/**
 * Portée des styles de la page parente.
 *
 * Quand une page qui a un `<style>` rend un composant, Astro lui passe l'attribut
 * `data-astro-cid-…` de la page dans ses props. Les composants de rendu de contenu
 * (LegalBlocks) le reprennent sur chaque élément, y compris dans le HTML en ligne
 * venu des données, pour produire exactement le même HTML que du balisage écrit
 * directement dans la page.
 */

export type Scope = Record<string, ''>;

/** Extrait les attributs `data-astro-cid-…` des props (valeur vide : rendu sans `="…"`). */
export function scopeOf(props: object): Scope {
  const scope: Scope = {};
  for (const key of Object.keys(props)) {
    if (key.startsWith('data-astro-cid-')) scope[key] = '';
  }
  return scope;
}

/** Ajoute les attributs de portée à chaque balise ouvrante d'un fragment HTML. */
export function scopeHtml(html: string, scope: Scope): string {
  const attrs = Object.keys(scope)
    .map((key) => ` ${key}`)
    .join('');
  if (!attrs) return html;
  return html.replace(
    /<([a-zA-Z][\w-]*)([^<>]*?)\s*\/?>/g,
    (_match, tag: string, rest: string) => `<${tag}${rest}${attrs}>`,
  );
}
