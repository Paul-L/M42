/**
 * Modèle de contenu partagé entre le site (lecture au build) et les scripts Directus
 * (schéma, seed) : collections, conversion objet de contenu ↔ enregistrement Directus.
 *
 * Principe : chaque page ou élément du site est un objet de contenu sérialisable en JSON
 * (src/data/**). Dans Directus :
 * - forme « champs » (conferences, publics, intervenants, ressources, settings) :
 *   un champ par clé de premier niveau (camelCase → snake_case) ;
 * - forme « bloc » (pages) : `titre` (libellé pour l'interface) + `contenu` (JSON de la page) ;
 * - les questions de FAQ et les sources sont sorties dans les collections `faq` et `sources`,
 *   reliées à leur conférence, page « Pour qui » ou page, avec leur emplacement d'origine.
 * La conversion est réversible : depuisEnregistrement(versEnregistrement(x)) redonne x.
 */

export type Statut = 'published' | 'draft';

export type CollectionContenu =
  'settings' | 'intervenants' | 'conferences' | 'publics' | 'ressources' | 'pages';

/** Relation d'une question de FAQ ou d'une source vers son parent (champ M2O). */
export const PARENT: Partial<Record<CollectionContenu, 'conference' | 'public' | 'page'>> = {
  conferences: 'conference',
  publics: 'public',
  pages: 'page',
};

/** Emplacement d'une liste de questions dans l'objet de contenu. */
export interface EmplacementFaq {
  /** Chemin de la liste (ex. ['faq', 'items']). */
  chemin: string[];
  /** Nom de la clé de réponse dans l'objet de contenu. */
  reponse: 'reponse' | 'answer';
  /** Réponses en segments (texte + `{ marker }`) : reconstitués depuis les marqueurs [À …]. */
  segments?: boolean;
}

/** Emplacement d'une liste de sources : objets {avant, titre, apres, url} ou chaînes HTML. */
export interface EmplacementSources {
  chemin: string[];
  forme: 'objet' | 'html';
}

export interface Document {
  collection: CollectionContenu;
  /** Identifiant stable (champ `slug`). */
  slug: string;
  /** Libellé affiché dans Directus (forme « bloc »). */
  titre?: string;
  /** Clé de l'objet qui porte l'identifiant (stockée dans `slug`, pas en double). */
  cle?: string;
  faq?: EmplacementFaq[];
  sources?: EmplacementSources[];
  /** Contenu initial (src/data), sérialisable en JSON. */
  contenu: Record<string, unknown>;
}

export const FORME: Record<CollectionContenu, 'champs' | 'bloc'> = {
  settings: 'champs',
  intervenants: 'champs',
  conferences: 'champs',
  publics: 'champs',
  ressources: 'champs',
  pages: 'bloc',
};

/** Champs système des collections de contenu (jamais issus d'une clé de contenu). */
export const CHAMPS_SYSTEME = [
  'id',
  'status',
  'sort',
  'slug',
  'titre_admin',
  'date_created',
  'date_updated',
  'user_updated',
  'questions_faq',
  'sources_citees',
] as const;

export const snake = (k: string): string => k.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
export const camel = (k: string): string =>
  k.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());

export interface LigneFaq {
  status: Statut;
  sort: number;
  emplacement: string;
  question: string;
  reponse: string;
  /** false : visible mais hors FAQPage ; null : non précisé. */
  json_ld: boolean | null;
}

export interface LigneSource {
  status: Statut;
  sort: number;
  emplacement: string;
  avant: string | null;
  titre: string | null;
  apres: string | null;
  url: string | null;
  html: string | null;
}

export interface Enregistrement {
  champs: Record<string, unknown>;
  faq: LigneFaq[];
  sources: LigneSource[];
}

type Segment = string | { marker: string };
const MARQUEUR = /(\[À [^\]]*\])/;

function lireChemin(o: Record<string, unknown>, chemin: string[]): unknown {
  return chemin.reduce<unknown>((v, k) => (v as Record<string, unknown> | undefined)?.[k], o);
}

function ecrireChemin(o: Record<string, unknown>, chemin: string[], valeur: unknown): void {
  let v = o;
  for (const k of chemin.slice(0, -1)) {
    v[k] ??= {};
    v = v[k] as Record<string, unknown>;
  }
  v[chemin.at(-1)!] = valeur;
}

function retirerChemin(o: Record<string, unknown>, chemin: string[]): void {
  const parent = lireChemin(o, chemin.slice(0, -1)) as Record<string, unknown> | undefined;
  if (parent) delete parent[chemin.at(-1)!];
}

const versTexte = (r: string | Segment[]): string =>
  typeof r === 'string' ? r : r.map((s) => (typeof s === 'string' ? s : s.marker)).join('');

const versSegments = (t: string): string | Segment[] => {
  if (!MARQUEUR.test(t)) return t;
  return t
    .split(MARQUEUR)
    .filter((s) => s !== '')
    .map((s) => (MARQUEUR.test(s) ? { marker: s } : s));
};

/** Objet de contenu → enregistrement Directus (+ lignes de FAQ et de sources). */
export function versEnregistrement(doc: Document): Enregistrement {
  const contenu = structuredClone(doc.contenu);
  const faq: LigneFaq[] = [];
  const sources: LigneSource[] = [];

  for (const e of doc.faq ?? []) {
    const items = lireChemin(contenu, e.chemin) as Record<string, unknown>[] | undefined;
    if (!Array.isArray(items)) throw new Error(`${doc.slug} : pas de FAQ en ${e.chemin.join('.')}`);
    items.forEach((it, i) => {
      const { question, [e.reponse]: reponse, jsonLd, ...reste } = it;
      if (Object.keys(reste).length)
        throw new Error(`${doc.slug} : clés de FAQ inattendues ${Object.keys(reste)}`);
      faq.push({
        status: 'published',
        sort: i + 1,
        emplacement: e.chemin.join('.'),
        question: question as string,
        reponse: versTexte(reponse as string | Segment[]),
        json_ld: typeof jsonLd === 'boolean' ? jsonLd : null,
      });
    });
    retirerChemin(contenu, e.chemin);
  }

  for (const e of doc.sources ?? []) {
    const items = lireChemin(contenu, e.chemin) as unknown[] | undefined;
    if (!Array.isArray(items))
      throw new Error(`${doc.slug} : pas de sources en ${e.chemin.join('.')}`);
    items.forEach((it, i) => {
      const o = (e.forme === 'objet' ? it : {}) as Record<string, string>;
      sources.push({
        status: 'published',
        sort: i + 1,
        emplacement: e.chemin.join('.'),
        avant: e.forme === 'objet' ? o.avant : null,
        titre: e.forme === 'objet' ? o.titre : null,
        apres: e.forme === 'objet' ? o.apres : null,
        url: e.forme === 'objet' ? o.url : null,
        html: e.forme === 'html' ? (it as string) : null,
      });
    });
    retirerChemin(contenu, e.chemin);
  }

  const champs: Record<string, unknown> = { slug: doc.slug, status: 'published' };
  if (FORME[doc.collection] === 'bloc') {
    champs.titre_admin = doc.titre ?? doc.slug;
    champs.contenu = contenu;
  } else {
    for (const [k, v] of Object.entries(contenu)) {
      if (k === doc.cle) {
        if (v !== doc.slug) throw new Error(`${doc.slug} : ${k} = ${String(v)} ≠ slug`);
        continue;
      }
      const f = snake(k);
      if ((CHAMPS_SYSTEME as readonly string[]).includes(f))
        throw new Error(`${doc.slug} : clé réservée ${k}`);
      if (camel(f) !== k) throw new Error(`${doc.slug} : clé ${k} non réversible`);
      champs[f] = v;
    }
  }
  return { champs, faq, sources };
}

/** Enregistrement Directus (+ FAQ et sources publiées, déjà triées) → objet de contenu. */
export function depuisEnregistrement(
  doc: Pick<Document, 'collection' | 'cle' | 'faq' | 'sources'>,
  champs: Record<string, unknown>,
  faq: LigneFaq[],
  sources: LigneSource[],
): Record<string, unknown> {
  let contenu: Record<string, unknown>;
  if (FORME[doc.collection] === 'bloc') {
    contenu = structuredClone((champs.contenu ?? {}) as Record<string, unknown>);
  } else {
    contenu = {};
    if (doc.cle) contenu[doc.cle] = champs.slug;
    for (const [f, v] of Object.entries(champs)) {
      if ((CHAMPS_SYSTEME as readonly string[]).includes(f) || v === null || v === undefined)
        continue;
      contenu[camel(f)] = v;
    }
  }

  for (const e of doc.faq ?? []) {
    const lignes = faq.filter((l) => l.emplacement === e.chemin.join('.'));
    ecrireChemin(
      contenu,
      e.chemin,
      lignes.map((l) => ({
        question: l.question,
        [e.reponse]: e.segments ? versSegments(l.reponse) : l.reponse,
        ...(l.json_ld === null ? {} : { jsonLd: l.json_ld }),
      })),
    );
  }
  for (const e of doc.sources ?? []) {
    const lignes = sources.filter((l) => l.emplacement === e.chemin.join('.'));
    ecrireChemin(
      contenu,
      e.chemin,
      lignes.map((l) =>
        e.forme === 'html'
          ? l.html
          : { avant: l.avant, titre: l.titre, apres: l.apres, url: l.url },
      ),
    );
  }
  return contenu;
}
