/**
 * Marques invisibles pour l'édition sur la page (Visual Editor de Directus), en aperçu seulement.
 *
 * En mode aperçu (`npm run apercu`), chaque texte lu dans Directus reçoit à sa fin une suite de
 * caractères de largeur nulle qui code son origine : collection, élément, champ. Dans la page,
 * src/lib/apercu-client.ts retire ces marques et transforme l'élément qui les contenait en zone
 * modifiable (attribut data-directus). Aucun composant n'a besoin d'être annoté à la main.
 * Jamais utilisé pour un build publié.
 */

export interface Cible {
  collection: string;
  item: string | number;
  champ: string;
  /** Liste répétable : édition dans un panneau plutôt qu'une bulle. */
  liste?: boolean;
}

const CHIFFRES = ['​', '‌', '‍', '⁠'];
const BORNE = '⁣';
export const MARQUE = /⁣([​‌‍⁠]+)⁣/g;

function coder(cible: Cible): string {
  const octets = new TextEncoder().encode(
    [cible.collection, cible.item, cible.champ, cible.liste ? 'l' : ''].join('|'),
  );
  let s = '';
  for (const o of octets) for (let i = 3; i >= 0; i--) s += CHIFFRES[(o >> (i * 2)) & 3];
  return BORNE + s + BORNE;
}

export function decoder(suite: string): Cible | null {
  const chiffres = [...suite].map((c) => CHIFFRES.indexOf(c));
  if (chiffres.some((c) => c < 0) || chiffres.length % 4) return null;
  const octets = new Uint8Array(chiffres.length / 4);
  for (let i = 0; i < octets.length; i++)
    octets[i] = chiffres.slice(i * 4, i * 4 + 4).reduce((a, c) => a * 4 + c, 0);
  const [collection, item, champ, l] = new TextDecoder().decode(octets).split('|');
  if (!collection || !item || !champ) return null;
  return { collection, item, champ, liste: l === 'l' };
}

/**
 * Texte « rédigé » (avec une espace) et qui n'est ni une adresse, ni une valeur technique :
 * seuls ces textes sont marqués (une valeur comparée dans le code, comme « disponible » ou
 * « faq », n'a pas d'espace et reste intacte).
 */
const redige = (s: string): boolean =>
  /\s/.test(s.trim()) && !/^(\/|#|https?:|mailto:|tel:)/.test(s);

/** Ajoute la marque à la fin du texte (avant la dernière balise fermante d'un texte HTML). */
export function marquer(s: string, cible: Cible): string {
  if (!redige(s)) return s;
  const m = coder(cible);
  return /<\/[a-z0-9]+>\s*$/i.test(s) ? s.replace(/(<\/[a-z0-9]+>\s*)$/i, `${m}$1`) : s + m;
}

/** Marque tous les textes d'une valeur (texte, ou lignes d'une liste répétable). */
export function marquerValeur(v: unknown, cible: Cible): unknown {
  if (typeof v === 'string') return marquer(v, cible);
  if (Array.isArray(v)) return v.map((x) => marquerValeur(x, { ...cible, liste: true }));
  if (v && typeof v === 'object')
    return Object.fromEntries(
      Object.entries(v).map(([k, x]) => [k, marquerValeur(x, { ...cible, liste: true })]),
    );
  return v;
}
