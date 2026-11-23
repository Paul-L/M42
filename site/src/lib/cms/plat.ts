/**
 * Formes et champs à plat de chaque collection, déduits du contenu initial (registre).
 * Partagés par le site (lecture), le schéma (création des champs) et le seed (écriture).
 * - conferences, publics, intervenants, ressources, settings : une forme commune à tous les
 *   éléments de la collection ;
 * - pages : une forme par page, avec un préfixe de champ propre à la page.
 */
import { documents } from './registre';
import { extraire, type CollectionContenu, type Document } from './modele';
import { aplatir, inferer, type ChampPlat, type Forme } from './forme';

/** Préfixe des champs de chaque page dans la collection `pages`. */
export const PREFIXES: Record<string, string> = {
  accueil: 'acc_',
  conferences: 'idx_',
  'a-propos': 'apr_',
  organisateurs: 'org_',
  contact: 'ctc_',
  reperes: 'rep_',
  'mentions-legales': 'mlg_',
  confidentialite: 'cnf_',
  'conference-ia-seminaire-entreprise': 'sem_',
  'conference-ia-experts-comptables': 'exp_',
  'sensibiliser-equipes-ia': 'gui_',
  'arnaque-ou-pas': 'out_',
};

export interface Plan {
  forme: Forme;
  champs: ChampPlat[];
}

const cache = new Map<string, Plan>();

/** Forme et champs d'une collection (ou d'une page, pour `pages`). */
export function plan(collection: CollectionContenu, slug?: string): Plan {
  const cle = collection === 'pages' ? `pages/${slug}` : collection;
  const deja = cache.get(cle);
  if (deja) return deja;
  const docs = documents.filter(
    (d) => d.collection === collection && (collection !== 'pages' || d.slug === slug),
  );
  if (!docs.length) throw new Error(`[contenu] aucune définition pour ${cle}`);
  const forme = inferer(docs.map((d) => extraire(d).contenu));
  const prefixe = collection === 'pages' ? (PREFIXES[slug ?? ''] ?? '') : '';
  if (collection === 'pages' && !prefixe) throw new Error(`[contenu] préfixe manquant : ${slug}`);
  const p = { forme, champs: aplatir(forme, prefixe) };
  cache.set(cle, p);
  return p;
}

/** Définition (emplacements FAQ/sources, clé) d'un élément, ou celle d'un voisin. */
export function definition(collection: CollectionContenu, slug: string): Document {
  return (
    documents.find((d) => d.collection === collection && d.slug === slug) ??
    documents.find((d) => d.collection === collection)!
  );
}
