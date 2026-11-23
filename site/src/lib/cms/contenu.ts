/**
 * Lecture du contenu au moment du build.
 *
 * Source (variable M42_CONTENU) :
 * - « cms » : Directus (DIRECTUS_URL + DIRECTUS_TOKEN, jeton en lecture seule) ; seuls les
 *   contenus publiés sont lus, les brouillons ne sont jamais publiés ;
 * - « local » : contenu initial de src/data (celui qui sert au seed).
 * Par défaut : « cms » si DIRECTUS_URL est défini, sinon « local » (avec un avertissement).
 * La production impose M42_CONTENU=cms (phase 5).
 */
import { createDirectus, readItems, readSingleton, rest, staticToken } from '@directus/sdk';
import { documents as registre } from './registre';
import { plan } from './plat';
import { marquer, marquerValeur } from './marques';
import {
  PARENT,
  depuisEnregistrement,
  type CollectionContenu,
  type Document,
  type LigneFaq,
  type LigneSource,
} from './modele';

const env = (k: string): string | undefined =>
  (import.meta.env?.[k] as string | undefined) ?? process.env[k];

const URL_CMS = env('DIRECTUS_URL');
/**
 * Aperçu local (`npm run apercu`, serveur de développement) : contenu relu dans Directus à chaque
 * page, brouillons compris. Jamais pour un build publié.
 */
const APERCU = env('M42_APERCU') === '1';
if (APERCU && import.meta.env.PROD)
  throw new Error(
    '[contenu] M42_APERCU est réservé au serveur de développement (brouillons visibles).',
  );
export const SOURCE: 'cms' | 'local' =
  (env('M42_CONTENU') as 'cms' | 'local' | undefined) ?? (URL_CMS ? 'cms' : 'local');

type Brut = Record<string, unknown> & { id: number; slug: string };
type LigneFaqBrute = LigneFaq & {
  id: number;
  conference: number | null;
  public: number | null;
  page: number | null;
};
type LigneSourceBrute = LigneSource & {
  id: number;
  conference: number | null;
  page: number | null;
};

interface Element {
  slug: string;
  contenu: Record<string, unknown>;
}
type Contenus = Map<string, Element[]>;

let cache: Promise<Contenus> | undefined;
let cacheDate = 0;

async function chargerCms(): Promise<Contenus> {
  const token = env('DIRECTUS_TOKEN');
  if (!URL_CMS || !token)
    throw new Error('M42_CONTENU=cms : DIRECTUS_URL et DIRECTUS_TOKEN sont requis.');
  const client = createDirectus(URL_CMS).with(staticToken(token)).with(rest());
  const publies = {
    // Aperçu (M42_APERCU) : brouillons compris, pour les voir avant de les publier.
    filter: { status: { _in: APERCU ? ['published', 'draft'] : ['published'] } },
    sort: ['sort', 'id'],
    limit: -1,
  } as const;
  const lire = <T>(c: string) =>
    client.request(readItems(c as never, publies as never)) as unknown as Promise<T[]>;

  const [faqBrute, sourcesBrutes] = await Promise.all([
    lire<LigneFaqBrute>('faq'),
    lire<LigneSourceBrute>('sources'),
  ]);
  // Aperçu : marques invisibles pour l'édition sur la page (marques.ts).
  const faq = APERCU
    ? faqBrute.map((l) => ({
        ...l,
        question: marquer(l.question, { collection: 'faq', item: l.id, champ: 'question' }),
        reponse: marquer(l.reponse, { collection: 'faq', item: l.id, champ: 'reponse' }),
      }))
    : faqBrute;
  const sources = APERCU
    ? sourcesBrutes.map((l) => {
        const m = (champ: 'avant' | 'titre' | 'apres' | 'html') =>
          l[champ] === null
            ? null
            : marquer(l[champ]!, { collection: 'sources', item: l.id, champ });
        return { ...l, avant: m('avant'), titre: m('titre'), apres: m('apres'), html: m('html') };
      })
    : sourcesBrutes;
  /** Aperçu : marque les textes des champs à plat d'un enregistrement. */
  const annoter = (
    collection: string,
    l: Record<string, unknown>,
    champs: { nom: string; forme: { k: string } }[],
  ): Record<string, unknown> => {
    if (!APERCU) return l;
    const out = { ...l };
    for (const c of champs) {
      if (c.forme.k !== 'texte' && c.forme.k !== 'liste') continue;
      out[c.nom] = marquerValeur(l[c.nom], {
        collection,
        item: l.id as number,
        champ: c.nom,
        liste: c.forme.k === 'liste',
      });
    }
    return out;
  };
  const parDefinition = new Map<string, Document>(
    registre.map((d) => [`${d.collection}/${d.slug}`, d]),
  );
  const resultat: Contenus = new Map();

  for (const collection of [
    'intervenants',
    'conferences',
    'publics',
    'ressources',
    'pages',
  ] as const) {
    const lignes = await lire<Brut>(collection);
    const parent = PARENT[collection];
    resultat.set(
      collection,
      lignes.map((l) => {
        // Définition (emplacements FAQ/sources) : celle du registre, ou celle d'un voisin de même collection.
        const def =
          parDefinition.get(`${collection}/${l.slug}`) ??
          registre.find((d) => d.collection === collection)!;
        const deCeParent = <
          T extends { conference?: number | null; public?: number | null; page?: number | null },
        >(
          x: T[],
        ) => (parent ? x.filter((r) => r[parent] === l.id) : []);
        const { forme, champs } = plan(collection, collection === 'pages' ? l.slug : undefined);
        // Garde-fou : Directus encore à l'ancien format (champs JSON) → aucun champ rempli.
        // Mieux vaut arrêter le build que publier une page vide.
        if (champs.length > 2 && champs.every((c) => l[c.nom] === null || l[c.nom] === undefined))
          throw new Error(
            `[contenu] ${collection}/${l.slug} : aucun champ rempli. Directus est-il à l'ancien format ? Lancer « npm run cms:migrer » (DEPLOIEMENT.md).`,
          );
        return {
          slug: l.slug,
          contenu: depuisEnregistrement(
            def,
            forme,
            champs,
            annoter(collection, l, champs),
            deCeParent(faq),
            deCeParent(sources),
          ),
        };
      }),
    );
  }
  const settings = (await client.request(readSingleton('settings' as never))) as Record<
    string,
    unknown
  >;
  const defSettings = registre.find((d) => d.collection === 'settings')!;
  resultat.set('settings', [
    {
      slug: defSettings.slug,
      contenu: depuisEnregistrement(
        defSettings,
        plan('settings').forme,
        plan('settings').champs,
        annoter('settings', settings, plan('settings').champs),
        [],
        [],
      ),
    },
  ]);
  return resultat;
}

async function chargerLocal(): Promise<Contenus> {
  const resultat: Contenus = new Map();
  for (const d of registre) {
    const liste = resultat.get(d.collection) ?? [];
    liste.push({ slug: d.slug, contenu: structuredClone(d.contenu) });
    resultat.set(d.collection, liste);
  }
  return resultat;
}

function tout(): Promise<Contenus> {
  // Aperçu : relu pour chaque page (cache de 3 s, le temps de la rendre), pour voir tout de
  // suite une modification enregistrée sans dépasser la limite de débit de Directus.
  if (APERCU) {
    if (!cache || Date.now() - cacheDate > 3000) {
      cache = chargerCms();
      cacheDate = Date.now();
    }
    return cache;
  }
  if (!cache) {
    if (SOURCE === 'local' && !URL_CMS && !env('M42_CONTENU'))
      console.warn('[contenu] DIRECTUS_URL absent : contenu lu dans src/data (M42_CONTENU=local).');
    cache = SOURCE === 'cms' ? chargerCms() : chargerLocal();
  }
  return cache;
}

/** Éléments publiés d'une collection, dans l'ordre de Directus (champ sort). */
export async function liste<T>(collection: CollectionContenu): Promise<T[]> {
  return ((await tout()).get(collection) ?? []).map((e) => e.contenu as T);
}

/** Slugs publiés d'une collection (getStaticPaths). */
export async function slugs(collection: CollectionContenu): Promise<string[]> {
  return ((await tout()).get(collection) ?? []).map((e) => e.slug);
}

/**
 * Un élément publié, par son slug. Erreur de build s'il est absent ou en brouillon :
 * une page à adresse fixe (accueil, contact…) ne peut pas être dépubliée.
 */
export async function element<T>(collection: CollectionContenu, slug: string): Promise<T> {
  const trouve = ((await tout()).get(collection) ?? []).find((e) => e.slug === slug);
  if (!trouve) throw new Error(`[contenu] ${collection}/${slug} introuvable ou non publié.`);
  return trouve.contenu as T;
}

// --- Accès typés --------------------------------------------------------------------------------

import type { Pages, SlugPage, ConferenceComplete, PublicsParSlug } from './registre';
import type { Settings } from '../../data/settings';
import type { Intervenant } from '../../data/intervenants';
import type { Repere } from '../../data/reperes';
import type { PublicPage } from '../../data/publics/types';

export const reglages = (): Promise<Settings> => element<Settings>('settings', 'settings');
export const page = <K extends SlugPage>(slug: K): Promise<Pages[K]> =>
  element<Pages[K]>('pages', slug);
/** Conférences publiées, dans l'ordre du catalogue. */
export const conferences = (): Promise<ConferenceComplete[]> =>
  liste<ConferenceComplete>('conferences');
export const conference = (slug: string): Promise<ConferenceComplete> =>
  element<ConferenceComplete>('conferences', slug);
/** Pages « Pour qui » publiées. */
export const publics = (): Promise<PublicPage[]> => liste<PublicPage>('publics');
export const publicPage = <K extends keyof PublicsParSlug>(slug: K): Promise<PublicsParSlug[K]> =>
  element<PublicsParSlug[K]>('publics', slug);
/** Intervenants publiés, triés par le champ « Ordre » : Clara, puis Paul. */
export const intervenants = async (): Promise<Intervenant[]> =>
  (await liste<Intervenant>('intervenants')).sort((a, b) => a.ordre - b.ordre);
/** Repères publiés (collection `ressources`). */
export const ressources = (): Promise<Repere[]> => liste<Repere>('ressources');

import type { CarteConference } from '../../data/conferences/types';

/** Cartes du catalogue des conférences publiées (champ `carte` de chaque conférence). */
export async function catalogue(): Promise<CarteConference[]> {
  return (await conferences()).map((c) => ({ slug: c.slug, ...c.carte }));
}
