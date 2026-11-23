/**
 * Migration du contenu vers les champs « à plat » (un champ par texte), SANS repartir de src/data :
 * le contenu actuel de chaque élément (anciens champs JSON) est relu, converti et réécrit, pour
 * garder les modifications faites dans Directus.
 *
 * Usage (depuis site/), dans cet ordre :
 *   npm run cms:schema                    ajoute les nouveaux champs (anciens gardés)
 *   npm run cms:migrer                    convertit chaque élément (rien n'est supprimé)
 *   npm run cms:migrer -- --verifier      relit et compare, sans rien écrire
 *   npm run cms:schema -- --nettoyer      retire les anciens champs JSON
 *
 * Ancien format : collections « champs » = une colonne par clé de premier niveau (snake_case) ;
 * pages = une colonne `contenu` (JSON de la page). FAQ et sources : inchangées.
 */
import { api } from './lib.ts';
import { documents } from '../../site/src/lib/cms/registre.ts';
import { plan, definition } from '../../site/src/lib/cms/plat.ts';
import { encoder, type ChampPlat } from '../../site/src/lib/cms/forme.ts';
import type { CollectionContenu } from '../../site/src/lib/cms/modele.ts';

const verifier = process.argv.includes('--verifier');
const camel = (k: string) => k.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());
const SYSTEME = new Set([
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
  'publication_demandee',
  'apercu',
]);

/** Liste de textes encore à l'ancien format (chaînes au lieu de lignes { valeur }). */
const listeAncienne = (v: unknown): boolean =>
  Array.isArray(v) && v.some((x) => typeof x !== 'object');

/**
 * Contenu (sans FAQ, sources ni clé) d'un enregistrement à l'ancien format, ou null s'il est
 * déjà au nouveau format (rien à faire : relancer la migration ne touche à rien).
 */
function ancienContenu(
  collection: CollectionContenu,
  ligne: Record<string, unknown>,
  anciens: Set<string>,
  champs: ChampPlat[],
): Record<string, unknown> | null {
  if (collection === 'pages') {
    const c = ligne.contenu;
    return c && typeof c === 'object' ? (c as Record<string, unknown>) : null;
  }
  const premierNiveau = champs.filter((c) => c.chemin.length === 1);
  const ancien =
    [...anciens].some((f) => ligne[f] !== null && ligne[f] !== undefined) ||
    premierNiveau.some((c) => c.forme.k === 'liste' && listeAncienne(ligne[c.nom]));
  if (!ancien) return null;
  const out: Record<string, unknown> = {};
  // Champs de premier niveau au même nom dans les deux formats (textes, nombres, listes).
  for (const c of premierNiveau) {
    let v = ligne[c.nom];
    if (Array.isArray(v) && c.forme.k === 'liste' && c.forme.item.k !== 'objet')
      v = v.map((x) => (x && typeof x === 'object' ? (x as { valeur: unknown }).valeur : x));
    if (v !== null && v !== undefined) out[c.chemin[0]!] = v;
  }
  // Anciennes colonnes JSON (une par clé de premier niveau).
  for (const f of anciens)
    if (ligne[f] !== null && ligne[f] !== undefined) out[camel(f)] = ligne[f];
  return out;
}

/** Retire du contenu les emplacements de FAQ et de sources (ils vivent dans leurs collections). */
function sansListesReliees(
  collection: CollectionContenu,
  slug: string,
  c: Record<string, unknown>,
) {
  const def = definition(collection, slug);
  const copie = structuredClone(c);
  for (const e of [...(def.faq ?? []), ...(def.sources ?? [])]) {
    const parent = e.chemin
      .slice(0, -1)
      .reduce<unknown>((v, k) => (v as Record<string, unknown> | undefined)?.[k], copie) as
      Record<string, unknown> | undefined;
    if (parent) delete parent[e.chemin.at(-1)!];
  }
  if (def.cle) delete copie[def.cle];
  return copie;
}

const COLLECTIONS: CollectionContenu[] = [
  'intervenants',
  'conferences',
  'publics',
  'ressources',
  'pages',
];
let convertis = 0;
let deja = 0;
let ecarts = 0;

for (const collection of [...COLLECTIONS, 'settings' as const]) {
  const champsActuels = (
    await api<{ field: string; type: string }[]>('GET', `/fields/${collection}`)
  ).filter((f) => f.type !== 'alias' && !SYSTEME.has(f.field));
  const nouveaux = new Set(
    collection === 'pages'
      ? documents
          .filter((d) => d.collection === 'pages')
          .flatMap((d) => plan('pages', d.slug).champs.map((c) => c.nom))
      : plan(collection).champs.map((c) => c.nom),
  );
  // Anciens champs : ceux qui ne font pas partie du nouveau modèle (+ `contenu` des pages).
  const anciens = new Set(
    champsActuels.map((f) => f.field).filter((f) => !nouveaux.has(f) || f === 'contenu'),
  );

  const lignes =
    collection === 'settings'
      ? [await api<Record<string, unknown>>('GET', '/items/settings')]
      : await api<Record<string, unknown>[]>('GET', `/items/${collection}?limit=-1&fields=*`);

  for (const ligne of lignes) {
    const slug = collection === 'settings' ? 'settings' : String(ligne.slug);
    const { champs } = plan(collection, collection === 'pages' ? slug : undefined);
    const contenu = ancienContenu(collection, ligne, anciens, champs);
    if (!contenu) {
      deja++;
      continue;
    }
    const valeurs = encoder(sansListesReliees(collection, slug, contenu), champs);
    if (verifier) {
      const diff = Object.entries(valeurs).filter(
        ([k, v]) => JSON.stringify(v ?? null) !== JSON.stringify(ligne[k] ?? null),
      );
      if (diff.length) {
        ecarts++;
        console.log(
          `≠ ${collection}/${slug} : ${diff
            .map(([k]) => k)
            .slice(0, 8)
            .join(', ')}${diff.length > 8 ? '…' : ''}`,
        );
      }
      continue;
    }
    const chemin =
      collection === 'settings' ? '/items/settings' : `/items/${collection}/${ligne.id}`;
    await api('PATCH', chemin, valeurs);
    convertis++;
    console.log(`~ ${collection}/${slug} : ${Object.keys(valeurs).length} champs`);
  }
}

console.log(
  verifier
    ? `\nVérification : ${ecarts} élément(s) différent(s) entre ancien et nouveau format.`
    : `\nMigration : ${convertis} élément(s) converti(s), ${deja} déjà au nouveau format.`,
);
