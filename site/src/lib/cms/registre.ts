/**
 * Registre du contenu initial : chaque page ou élément de src/data, avec sa collection Directus
 * et l'emplacement de ses FAQ et sources. Sert au seed (cms/scripts/seed.ts), au schéma
 * (champs déduits) et au mode « local » du site.
 *
 * Les fichiers de src/data restent la source du contenu initial (maquette). Une fois Directus
 * rempli, c'est Directus qui fait foi : modifier les textes dans l'interface, pas ici.
 */
import type { Document, EmplacementFaq } from './modele';
import { routes } from '../../data/routes';

import * as accueil from '../../data/accueil';
import * as conferencesIndex from '../../data/conferences-index';
import * as aPropos from '../../data/a-propos';
import * as organisateurs from '../../data/organisateurs';
import * as contact from '../../data/contact';
import * as reperes from '../../data/reperes';
import * as mentionsLegales from '../../data/legal/mentions-legales';
import * as confidentialite from '../../data/legal/confidentialite';
import { page as seminaire } from '../../data/satellites/seminaire-entreprise';
import { page as expertsComptables } from '../../data/satellites/experts-comptables';
import { page as sensibiliser } from '../../data/satellites/sensibiliser-equipes-ia';
import { page as arnaqueOuPas } from '../../data/outils/arnaque-ou-pas';
import { settings } from '../../data/settings';
import { intervenants } from '../../data/intervenants';
import { catalogue } from '../../data/conferences/catalogue';
import { iaAuQuotidien } from '../../data/conferences/ia-au-quotidien';
import { arnaquesIa } from '../../data/conferences/arnaques-ia';
import { desinformationIa } from '../../data/conferences/desinformation-ia';
import { parentsAdosIa } from '../../data/conferences/parents-ados-ia';
import { entreprises } from '../../data/publics/entreprises';
import { evenements } from '../../data/publics/evenements';
import { collectivites } from '../../data/publics/collectivites';
import { education } from '../../data/publics/education';
import { associations } from '../../data/publics/associations';

/** Copie profonde « JSON » : vérifie au passage que le contenu est bien sérialisable. */
const json = <T>(x: T): T => JSON.parse(JSON.stringify(x)) as T;

/** Exports de contenu d'un module (sans fonctions ni valeurs calculées). */
function choisir<M extends Record<string, unknown>, K extends keyof M>(
  m: M,
  cles: K[],
): Pick<M, K> {
  return Object.fromEntries(cles.map((k) => [k, m[k]])) as Pick<M, K>;
}

// --- Pages (forme « bloc ») ---------------------------------------------------------------------

export const pages = {
  accueil: choisir(accueil, [
    'seo',
    'organisation',
    'hero',
    'chiffres',
    'citationChiffres',
    'chiffresLabel',
    'principesTexte',
    'principes',
    'reperesTexte',
    'reperes',
    'resumesAccueil',
    'catalogueTexte',
    'publics',
    'publicsTexte',
    'duo',
    'kitOrganisateur',
    'contactTexte',
  ]),
  conferences: choisir(conferencesIndex, [
    'seo',
    'ariane',
    'hero',
    'formatsDetailles',
    'detailsConferences',
    'catalogueSection',
    'formats',
    'deroulement',
    'surMesure',
    'pourQui',
    'faq',
    'contact',
  ]),
  'a-propos': choisir(aPropos, [
    'seo',
    'hero',
    'facts',
    'onThisPage',
    'approachSection',
    'approach',
    'principlesSection',
    'principles',
    'duo',
    'limitsSection',
    'limits',
    'cta',
  ]),
  organisateurs: choisir(organisateurs, [
    'seo',
    'hero',
    'copyTexts',
    'biosSection',
    'photosSection',
    'techSheetSection',
    'annonceSection',
    'logosSection',
    'presse',
    'onThisPage',
    'photos',
    'techSheet',
    'logos',
    'logoRules',
  ]),
  contact: choisir(contact, [
    'seo',
    'hero',
    'formSection',
    'rgpdNotice',
    'aside',
    'faqSection',
    'structureTypes',
    'themes',
    'formats',
    'participants',
    'budgets',
    'nextSteps',
    'contactFaq',
  ]),
  reperes: {
    ...choisir(reperes, ['seo', 'ariane', 'entete', 'bibliotheque', 'lettre', 'plusLoin']),
    afficherBientot: reperes.AFFICHER_BIENTOT,
  },
  'mentions-legales': choisir(mentionsLegales, [
    'seo',
    'breadcrumb',
    'intro',
    'decide',
    'proseLabel',
    'sections',
  ]),
  confidentialite: choisir(confidentialite, [
    'seo',
    'breadcrumb',
    'intro',
    'enBref',
    'proseLabel',
    'sections',
  ]),
  'conference-ia-seminaire-entreprise': seminaire,
  'conference-ia-experts-comptables': expertsComptables,
  'sensibiliser-equipes-ia': sensibiliser,
  'arnaque-ou-pas': arnaqueOuPas,
};

export type Pages = typeof pages;
export type SlugPage = keyof Pages;

/** Libellés des pages dans Directus. */
const TITRES: Record<SlugPage, string> = {
  accueil: 'Accueil',
  conferences: 'Conférences (index)',
  'a-propos': 'À propos',
  organisateurs: 'Espace organisateurs',
  contact: 'Contact',
  reperes: 'Repères',
  'mentions-legales': 'Mentions légales',
  confidentialite: 'Confidentialité',
  'conference-ia-seminaire-entreprise': 'Satellite · Conférence IA séminaire entreprise',
  'conference-ia-experts-comptables': 'Satellite · Conférence IA experts-comptables',
  'sensibiliser-equipes-ia': 'Guide · Sensibiliser ses équipes à l’IA',
  'arnaque-ou-pas': 'Outil · Arnaque ou pas ?',
};

/** Adresse de chaque page à adresse libre (satellites), rendue par getStaticPaths. */
export const CHEMINS_SATELLITES: Partial<Record<SlugPage, string>> = {
  'conference-ia-seminaire-entreprise': routes['Sat-seminaire-entreprise.dc.html'],
  'conference-ia-experts-comptables': routes['Sat-experts-comptables.dc.html'],
  'sensibiliser-equipes-ia': routes['Sat-sensibiliser-equipes-ia.dc.html'],
  'arnaque-ou-pas': routes['Sat-test-arnaque-ou-pas.dc.html'],
};

/** FAQ rangées dans des blocs `{ type: 'faq', items }` des sections (pages satellites). */
function faqDesBlocs(p: { sections: { blocks: { type: string }[] }[] }): EmplacementFaq[] {
  return p.sections.flatMap((s, i) =>
    s.blocks.flatMap((b, j) =>
      b.type === 'faq'
        ? [
            {
              chemin: ['sections', String(i), 'blocks', String(j), 'items'],
              reponse: 'answer' as const,
            },
          ]
        : [],
    ),
  );
}

const EMPLACEMENTS: Partial<Record<SlugPage, Pick<Document, 'faq' | 'sources'>>> = {
  conferences: { faq: [{ chemin: ['faq', 'items'], reponse: 'reponse' }] },
  contact: { faq: [{ chemin: ['contactFaq'], reponse: 'answer' }] },
  'conference-ia-seminaire-entreprise': {
    faq: faqDesBlocs(seminaire),
    sources: [{ chemin: ['sources', 'items'], forme: 'html' }],
  },
  'conference-ia-experts-comptables': {
    faq: faqDesBlocs(expertsComptables),
    sources: [{ chemin: ['sources', 'items'], forme: 'html' }],
  },
  'sensibiliser-equipes-ia': {
    faq: faqDesBlocs(sensibiliser),
    sources: [{ chemin: ['sources', 'items'], forme: 'html' }],
  },
  'arnaque-ou-pas': {
    faq: [{ chemin: ['faq', 'items'], reponse: 'answer' }],
    sources: [{ chemin: ['sources', 'items'], forme: 'html' }],
  },
};

// --- Collections à éléments multiples ---------------------------------------------------------

/** Conférences : la carte du catalogue est rattachée à sa conférence (champ `carte`). */
export const conferences = [iaAuQuotidien, arnaquesIa, desinformationIa, parentsAdosIa].map((c) => {
  const carte = catalogue.find((x) => x.slug === c.slug);
  if (!carte) throw new Error(`Carte du catalogue absente : ${c.slug}`);
  const { slug: _s, ...reste } = carte;
  return { ...c, carte: reste };
});
export type ConferenceComplete = (typeof conferences)[number];

export const FAQ_CONFERENCE: Pick<Document, 'faq' | 'sources' | 'cle'> = {
  cle: 'slug',
  faq: [{ chemin: ['faq', 'items'], reponse: 'reponse' }],
  sources: [{ chemin: ['faq', 'sources'], forme: 'objet' }],
};
export const FAQ_PUBLIC: Pick<Document, 'faq' | 'cle'> = {
  cle: 'slug',
  faq: [{ chemin: ['faq', 'items'], reponse: 'answer', segments: true }],
};

export const publics = [entreprises, evenements, collectivites, education, associations];
/** Type précis de chaque page « Pour qui », par slug. */
export interface PublicsParSlug {
  entreprises: typeof entreprises;
  evenements: typeof evenements;
  collectivites: typeof collectivites;
  education: typeof education;
  associations: typeof associations;
}

// --- Registre complet -------------------------------------------------------------------------

export const documents: Document[] = [
  {
    collection: 'settings',
    slug: 'settings',
    contenu: json(settings) as unknown as Record<string, unknown>,
  },
  ...intervenants.map((i) => ({
    collection: 'intervenants' as const,
    slug: i.slug,
    cle: 'slug',
    contenu: json(i) as unknown as Record<string, unknown>,
  })),
  ...conferences.map((c) => ({
    collection: 'conferences' as const,
    slug: c.slug,
    ...FAQ_CONFERENCE,
    contenu: json(c) as unknown as Record<string, unknown>,
  })),
  ...publics.map((p) => ({
    collection: 'publics' as const,
    slug: p.slug,
    ...FAQ_PUBLIC,
    contenu: json(p) as unknown as Record<string, unknown>,
  })),
  ...reperes.reperes.map((r) => ({
    collection: 'ressources' as const,
    slug: r.id,
    cle: 'id',
    contenu: json(r) as unknown as Record<string, unknown>,
  })),
  ...(Object.keys(pages) as SlugPage[]).map((slug) => ({
    collection: 'pages' as const,
    slug,
    titre: TITRES[slug],
    ...EMPLACEMENTS[slug],
    contenu: json(pages[slug]) as unknown as Record<string, unknown>,
  })),
];
