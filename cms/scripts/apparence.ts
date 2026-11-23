/**
 * Apparence et organisation de l'interface Directus pour M42.guide (idempotent).
 *
 * Usage (depuis site/) : npm run cms:apparence
 *
 * - Identité : nom, logo, couleurs de la direction artistique (encre, papier, or), titres en
 *   Cormorant, page de connexion, favicon, interface en français.
 * - Navigation : dossiers « Site » (contenus, dans l'ordre d'usage) et « Formulaires ».
 * - Listes : colonnes utiles par collection (statut, titre, mise à jour).
 * - Aperçu : chaque conférence, page « Pour qui » ou page s'affiche à côté du formulaire
 *   (Live Preview), sur l'adresse du site donnée par SITE_APERCU (local : http://localhost:4321).
 */
import { join } from 'node:path';
import { api, lire, televerser, SITE_DIR } from './lib.ts';
import { CHEMINS_SATELLITES } from '../../site/src/lib/cms/registre.ts';

const KIT = join(SITE_DIR, '..', 'kit', 'logo');
const APERCU = (process.env.SITE_APERCU ?? 'http://localhost:4321').replace(/\/$/, '');

const ENCRE = '#0E0F12';
const PAPIER = '#F2EEE6';
const OR = '#B08D57';
const PIERRE = '#8A8478';

// --- Fichiers d'identité ----------------------------------------------------------------------

const logo = await televerser(
  join(KIT, 'png', 'M42_icone_app_fond_encre_512.png'),
  'M42 · icône',
  'image/png',
);
const logoBlanc = await televerser(
  join(KIT, 'svg', 'M42_logo_vertical_blanc.svg'),
  'M42 · logo blanc',
  'image/svg+xml',
);
const favicon = await televerser(
  join(KIT, 'svg', 'M42_favicon.svg'),
  'M42 · favicon',
  'image/svg+xml',
);
const cormorant = await televerser(
  join(
    SITE_DIR,
    'node_modules',
    '@fontsource',
    'cormorant',
    'files',
    'cormorant-latin-600-normal.woff2',
  ),
  'Police · Cormorant 600',
  'font/woff2',
);

// --- Réglages du projet -----------------------------------------------------------------------

await api('PATCH', '/settings', {
  project_name: 'M42.guide',
  project_descriptor: 'Se repérer dans l’IA',
  project_url: 'https://m42.guide',
  project_color: ENCRE,
  project_logo: logo,
  public_foreground: logoBlanc,
  public_favicon: favicon,
  public_note: 'Espace d’édition de M42.guide. Un souci d’accès ? Écrivez à paul@m42.guide.',
  default_language: 'fr-FR',
  default_appearance: 'light',
  custom_css: [
    `@font-face { font-family: 'Cormorant'; src: url('/assets/${cormorant}') format('woff2'); font-weight: 600; font-display: swap; }`,
  ].join('\n'),
  theme_light_overrides: {
    primary: ENCRE,
    primaryAccent: '#24262C',
    primaryBackground: '#E6E0D4',
    primarySubdued: '#E9E4DA',
    secondary: OR,
    background: '#FFFFFF',
    backgroundNormal: '#FAF8F4',
    backgroundAccent: '#EFEAE1',
    backgroundSubdued: PAPIER,
    foregroundSubdued: PIERRE,
    borderColorSubdued: '#E2DCD0',
    fonts: { display: { fontFamily: "'Cormorant', Georgia, serif", fontWeight: '600' } },
    navigation: {
      background: PAPIER,
      backgroundAccent: '#E6E0D4',
      project: { background: ENCRE, foreground: PAPIER },
      modules: {
        background: ENCRE,
        button: {
          foreground: PIERRE,
          foregroundHover: PAPIER,
          foregroundActive: PAPIER,
          backgroundActive: '#24262C',
        },
      },
    },
    header: { title: { fontFamily: "'Cormorant', Georgia, serif", fontWeight: '600' } },
    // Page de connexion : panneau papier (formulaire lisible), illustration encre et or.
    public: {
      background: PAPIER,
      foreground: ENCRE,
      foregroundAccent: ENCRE,
      art: { background: ENCRE, primary: OR, secondary: PIERRE },
    },
  },
});
console.log('Réglages du projet : identité, couleurs, police, page de connexion.');

// --- Dossiers de navigation -------------------------------------------------------------------

async function dossier(collection: string, nom: string, icon: string, sort: number): Promise<void> {
  const meta = {
    icon,
    sort,
    collapse: 'open',
    translations: [{ language: 'fr-FR', translation: nom, singular: nom, plural: nom }],
  };
  if (await lire(`/collections/${collection}`))
    await api('PATCH', `/collections/${collection}`, { meta });
  else await api('POST', '/collections', { collection, meta, schema: null });
}
await dossier('site', 'Site', 'web', 1);
await dossier('formulaires', 'Formulaires', 'inbox', 2);

const RANGEMENT: [string, string, number, string?][] = [
  ['pages', 'site', 1, `${APERCU}{{apercu}}`],
  ['conferences', 'site', 2, `${APERCU}/conferences/{{slug}}/`],
  ['publics', 'site', 3, `${APERCU}/{{slug}}/`],
  ['ressources', 'site', 4],
  ['intervenants', 'site', 5, `${APERCU}/a-propos/`],
  ['faq', 'site', 6],
  ['sources', 'site', 7],
  ['settings', 'site', 8],
  ['demandes_contact', 'formulaires', 1],
  ['inscriptions_lettre', 'formulaires', 2],
];
for (const [collection, group, sort, preview] of RANGEMENT) {
  await api('PATCH', `/collections/${collection}`, {
    meta: { group, sort, ...(preview ? { preview_url: preview } : {}) },
  });
}
console.log('Navigation : dossiers « Site » et « Formulaires », aperçu du site.');

// Adresse de chaque page (aperçu) : champ caché `apercu`, calculé ici depuis le slug.
const ADRESSES: Record<string, string> = {
  accueil: '/',
  conferences: '/conferences/',
  'a-propos': '/a-propos/',
  organisateurs: '/organisateurs/',
  contact: '/contact/',
  reperes: '/reperes/',
  'mentions-legales': '/mentions-legales/',
  confidentialite: '/confidentialite/',
  ...(CHEMINS_SATELLITES as Record<string, string>),
};
if (!(await lire('/fields/pages/apercu'))) {
  await api('POST', '/fields/pages', {
    field: 'apercu',
    type: 'string',
    meta: {
      interface: 'input',
      hidden: true,
      readonly: true,
      note: 'Adresse de la page (aperçu).',
    },
    schema: {},
  });
}
const pages = await api<{ id: number; slug: string }[]>(
  'GET',
  '/items/pages?fields=id,slug&limit=-1',
);
for (const p of pages)
  if (ADRESSES[p.slug]) await api('PATCH', `/items/pages/${p.id}`, { apercu: ADRESSES[p.slug] });

// --- Colonnes des listes (préréglages communs à tous les comptes) -----------------------------

const COLONNES: Record<string, { fields: string[]; sort: string[] }> = {
  pages: { fields: ['status', 'titre_admin', 'date_updated'], sort: ['sort'] },
  conferences: {
    fields: ['status', 'numero', 'titre', 'disponibilite', 'date_updated'],
    sort: ['sort'],
  },
  publics: { fields: ['status', 'slug', 'seo__title', 'date_updated'], sort: ['sort'] },
  ressources: { fields: ['status', 'type', 'titre', 'statut', 'date_updated'], sort: ['sort'] },
  intervenants: { fields: ['status', 'prenom', 'nom', 'role'], sort: ['ordre'] },
  faq: { fields: ['status', 'question', 'conference', 'public', 'page'], sort: ['sort'] },
  sources: { fields: ['status', 'titre', 'html', 'conference', 'page'], sort: ['sort'] },
  demandes_contact: {
    fields: ['date_created', 'suivi', 'nom', 'structure', 'type', 'email'],
    sort: ['-date_created'],
  },
  inscriptions_lettre: {
    fields: ['date_created', 'demande', 'email', 'consentement', 'confirme'],
    sort: ['-date_created'],
  },
};
for (const [collection, { fields, sort }] of Object.entries(COLONNES)) {
  const q = encodeURIComponent(
    JSON.stringify({
      _and: [
        { collection: { _eq: collection } },
        { user: { _null: true } },
        { role: { _null: true } },
        { bookmark: { _null: true } },
      ],
    }),
  );
  const existant = (
    await api<{ id: number }[]>('GET', `/presets?filter=${q}&fields=id&limit=1`)
  )[0];
  const corps = {
    collection,
    layout: 'tabular',
    layout_query: { tabular: { fields, sort, limit: 50 } },
    layout_options: { tabular: { widths: {}, spacing: 'comfortable' } },
  };
  if (existant) await api('PATCH', `/presets/${existant.id}`, corps);
  else await api('POST', '/presets', corps);
}
console.log('Listes : colonnes par collection.');
