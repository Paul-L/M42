/**
 * Forme du contenu et conversion objet ↔ champs Directus « à plat », pour l'édition directe dans
 * les formulaires de Directus (sans JSON à saisir) :
 * - chaque texte, nombre ou case à cocher devient un champ (chemin `a__b__c`) ;
 * - chaque objet de premier niveau devient une section repliable (groupe) ;
 * - chaque liste devient une liste répétable (interface « list ») : lignes d'objets aplatis,
 *   ou lignes `{ valeur }` pour une liste de textes ; les listes imbriquées le restent ;
 * - seules les structures irrégulières (tableaux mélangés, tableaux de tableaux) restent en JSON.
 * La forme est déduite du contenu initial (src/data) ; la conversion est réversible.
 */

export type Forme =
  | { k: 'texte'; long: boolean; html: boolean }
  | { k: 'nombre'; entier: boolean }
  | { k: 'bool' }
  | { k: 'objet'; champs: Record<string, Cle> }
  | { k: 'liste'; item: Forme }
  | { k: 'json' };

/** Clé d'un objet : sa forme, et si elle peut être absente ou valoir null. */
export interface Cle {
  f: Forme;
  absente: boolean;
  nulle: boolean;
}

const estObjet = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);

/** Forme commune à plusieurs valeurs (null et undefined ignorés). */
export function inferer(valeurs: unknown[]): Forme {
  const vs = valeurs.filter((v) => v !== null && v !== undefined);
  if (!vs.length) return { k: 'json' };
  if (vs.every((v) => typeof v === 'string')) {
    const s = vs as string[];
    return {
      k: 'texte',
      long: s.some((x) => x.length > 90 || x.includes('\n')),
      html: s.some((x) => /<[a-z][^>]*>/i.test(x)),
    };
  }
  if (vs.every((v) => typeof v === 'number'))
    return { k: 'nombre', entier: (vs as number[]).every(Number.isInteger) };
  if (vs.every((v) => typeof v === 'boolean')) return { k: 'bool' };
  if (vs.every(estObjet)) {
    const champs: Record<string, Cle> = {};
    const cles: string[] = [];
    for (const o of vs) for (const k of Object.keys(o)) if (!cles.includes(k)) cles.push(k);
    for (const k of cles) {
      const vals = vs.map((o) => o[k]);
      champs[k] = {
        f: inferer(vals),
        absente: vs.some((o) => !(k in o) || o[k] === undefined),
        nulle: vs.some((o) => o[k] === null),
      };
    }
    return { k: 'objet', champs };
  }
  if (vs.every(Array.isArray)) {
    const items = (vs as unknown[][]).flat();
    if (!items.length) return { k: 'json' };
    const item = inferer(items);
    // Listes répétables : lignes d'objets, ou de textes / nombres (ligne { valeur }).
    if (item.k === 'objet' || item.k === 'texte' || item.k === 'nombre')
      return { k: 'liste', item };
    return { k: 'json' };
  }
  return { k: 'json' };
}

// --- Champs à plat (premier niveau d'un enregistrement) ----------------------------------------

export interface ChampPlat {
  /** Nom du champ Directus. */
  nom: string;
  /** Chemin de la valeur dans l'objet de contenu. */
  chemin: string[];
  forme: Forme;
  /** Groupe (section repliable) : clé de premier niveau, s'il s'agit d'un objet. */
  groupe: string | null;
}

const segment = (k: string): string =>
  k
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9_]/g, '_');

/** Empreinte courte et stable (noms de champs trop longs pour Postgres). */
const empreinte = (s: string): string => {
  let h = 5381;
  for (const c of s) h = ((h * 33) ^ c.charCodeAt(0)) >>> 0;
  return h.toString(36).slice(0, 6);
};

export function nomChamp(prefixe: string, chemin: string[]): string {
  const nom = prefixe + chemin.map(segment).join('__');
  return nom.length <= 58 ? nom : `${nom.slice(0, 50)}_${empreinte(nom)}`;
}

/** Feuilles (champs) d'une forme objet, dans l'ordre des clés. */
export function aplatir(forme: Forme, prefixe = ''): ChampPlat[] {
  if (forme.k !== 'objet') throw new Error('aplatir : forme objet attendue');
  const out: ChampPlat[] = [];
  const parcourir = (f: Forme, chemin: string[], groupe: string | null) => {
    if (f.k === 'objet' && chemin.length) {
      for (const [k, c] of Object.entries(f.champs)) parcourir(c.f, [...chemin, k], groupe);
      return;
    }
    out.push({ nom: nomChamp(prefixe, chemin), chemin, forme: f, groupe });
  };
  for (const [k, c] of Object.entries(forme.champs))
    parcourir(c.f, [k], c.f.k === 'objet' ? k : null);
  return out;
}

// --- Encodage / décodage ------------------------------------------------------------------------

const lire = (o: unknown, chemin: string[]): unknown =>
  chemin.reduce<unknown>((v, k) => (estObjet(v) ? v[k] : undefined), o);

/** Valeur d'une feuille → valeur Directus (listes converties en lignes). */
function encoderValeur(v: unknown, f: Forme): unknown {
  if (v === undefined) return null;
  if (f.k === 'liste' && Array.isArray(v)) return v.map((x) => encoderLigne(x, f.item));
  return v;
}

/** Élément de liste → ligne de l'interface « list » (objet aplati ou { valeur }). */
function encoderLigne(x: unknown, item: Forme): Record<string, unknown> {
  if (item.k !== 'objet') return { valeur: x };
  const ligne: Record<string, unknown> = {};
  // Ordre des clés de l'élément d'origine conservé (la ligne est stockée telle quelle en JSON).
  const sous = aplatirLigne(item);
  const rang = (c: SousChamp) => {
    const i = Object.keys(estObjet(x) ? x : {}).indexOf(c.chemin[0] ?? '');
    return i < 0 ? Number.MAX_SAFE_INTEGER : i;
  };
  for (const c of [...sous].sort((a, b) => rang(a) - rang(b))) {
    const v = lire(x, c.chemin);
    if (v !== undefined) ligne[c.cle] = encoderValeur(v, c.forme);
  }
  return ligne;
}

export interface SousChamp {
  /** Clé dans la ligne (chemin joint par « __ »). */
  cle: string;
  chemin: string[];
  forme: Forme;
}

/** Feuilles d'un élément de liste (objets imbriqués aplatis, listes gardées). */
export function aplatirLigne(item: Forme): SousChamp[] {
  if (item.k !== 'objet') return [{ cle: 'valeur', chemin: [], forme: item }];
  const out: SousChamp[] = [];
  const parcourir = (f: Forme, chemin: string[]) => {
    if (f.k === 'objet' && chemin.length) {
      for (const [k, c] of Object.entries(f.champs)) parcourir(c.f, [...chemin, k]);
      return;
    }
    out.push({ cle: chemin.join('__'), chemin, forme: f });
  };
  for (const [k, c] of Object.entries(item.champs)) parcourir(c.f, [k]);
  return out;
}

/** Objet de contenu → valeurs des champs à plat. */
export function encoder(
  contenu: Record<string, unknown>,
  champs: ChampPlat[],
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const c of champs) out[c.nom] = encoderValeur(lire(contenu, c.chemin), c.forme);
  return out;
}

/** Objet sans aucune valeur (objets imbriqués vides compris). */
const vide = (v: unknown): boolean => estObjet(v) && Object.values(v).every(vide);

/** Reconstitue un objet selon sa forme, à partir d'un lecteur de feuilles. */
function reconstruire(
  forme: Forme,
  feuille: (chemin: string[], f: Forme) => unknown,
  chemin: string[] = [],
): unknown {
  if (forme.k !== 'objet') return decoderValeur(feuille(chemin, forme), forme);
  const o: Record<string, unknown> = {};
  for (const [k, c] of Object.entries(forme.champs)) {
    const v = reconstruire(c.f, feuille, [...chemin, k]);
    if (v === undefined || v === null) {
      if (c.nulle && !c.absente) o[k] = null;
      continue;
    }
    // Objet facultatif dont toutes les feuilles sont vides : absent.
    if (c.f.k === 'objet' && c.absente && vide(v)) continue;
    o[k] = v;
  }
  return o;
}

function decoderValeur(v: unknown, f: Forme): unknown {
  if (v === null || v === undefined) return undefined;
  if (f.k === 'liste' && Array.isArray(v)) return v.map((ligne) => decoderLigne(ligne, f.item));
  return v;
}

function decoderLigne(ligne: unknown, item: Forme): unknown {
  const l = (estObjet(ligne) ? ligne : {}) as Record<string, unknown>;
  // Liste de textes : ligne { valeur } (ou texte brut, ancien format).
  if (item.k !== 'objet') return estObjet(ligne) ? l.valeur : ligne;
  const o = reconstruire(item, (chemin) => l[chemin.join('__')]) as Record<string, unknown>;
  // Remet les clés dans l'ordre de la ligne (celui de l'élément d'origine).
  const ordre = [...new Set(Object.keys(l).map((k) => k.split('__')[0] ?? k))];
  const rang = (k: string) => (ordre.indexOf(k) < 0 ? Number.MAX_SAFE_INTEGER : ordre.indexOf(k));
  return Object.fromEntries(Object.entries(o).sort(([a], [b]) => rang(a) - rang(b)));
}

/** Valeurs des champs à plat → objet de contenu (forme objet). */
export function decoder(
  valeurs: Record<string, unknown>,
  forme: Forme,
  champs: ChampPlat[],
): Record<string, unknown> {
  const parChemin = new Map(champs.map((c) => [c.chemin.join('\u0000'), c.nom]));
  return reconstruire(
    forme,
    (chemin) => valeurs[parChemin.get(chemin.join('\u0000')) ?? ''],
  ) as Record<string, unknown>;
}
