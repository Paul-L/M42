/**
 * Rôles, politiques d'accès et comptes de Directus (idempotent).
 *
 * Usage (depuis site/) : npm run cms:roles
 *
 * - Administrateur (Paul) : le compte créé au premier démarrage (ADMIN_EMAIL), inchangé.
 * - Éditeur (Clara) : crée, modifie et publie les contenus ; lit les réglages du site et les
 *   demandes reçues ; ne touche ni au schéma ni aux paramètres. Compte créé en « brouillon »
 *   (sans mot de passe) : Paul l'active depuis l'interface.
 * - Site (build) : lecture seule des contenus, sans accès à l'interface (le build ne lit que les publiés). Son jeton
 *   statique est écrit dans site/.env (DIRECTUS_URL, DIRECTUS_TOKEN), jamais affiché.
 * Trois comptes au total (limite de la version sans clé).
 */
import { randomBytes } from 'node:crypto';
import { join } from 'node:path';
import { api, ecrireEnv, CMS_URL, SITE_DIR } from './lib.ts';

const CONTENUS = [
  'settings',
  'intervenants',
  'conferences',
  'publics',
  'ressources',
  'pages',
  'faq',
  'sources',
];
const EDITABLES = CONTENUS.filter((c) => c !== 'settings');

interface Item {
  id: string;
  name?: string;
  email?: string;
}

async function trouver(chemin: string, filtre: Record<string, unknown>): Promise<Item | undefined> {
  const q = encodeURIComponent(JSON.stringify(filtre));
  return (await api<Item[]>('GET', `${chemin}?filter=${q}&limit=1`))[0];
}

async function politique(name: string, meta: Record<string, unknown>): Promise<string> {
  const p = await trouver('/policies', { name: { _eq: name } });
  if (p) {
    await api('PATCH', `/policies/${p.id}`, meta);
    return p.id;
  }
  console.log(`+ politique ${name}`);
  return (await api<Item>('POST', '/policies', { name, ...meta })).id;
}

async function role(
  name: string,
  icon: string,
  description: string,
  policyId: string,
): Promise<string> {
  let r = await trouver('/roles', { name: { _eq: name } });
  if (!r) {
    r = await api<Item>('POST', '/roles', { name, icon, description });
    console.log(`+ rôle ${name}`);
  }
  if (
    !(await trouver('/access', {
      role: { _eq: r.id },
      policy: { _eq: policyId },
    }))
  ) {
    await api('POST', '/access', { role: r.id, policy: policyId });
  }
  return r.id;
}

/** Remplace toutes les permissions d'une politique par celles données. */
async function permissions(policyId: string, liste: Record<string, unknown>[]): Promise<void> {
  const q = encodeURIComponent(JSON.stringify({ policy: { _eq: policyId } }));
  const existantes = await api<{ id: number }[]>('GET', `/permissions?filter=${q}&limit=-1`);
  if (existantes.length)
    await api(
      'DELETE',
      '/permissions',
      existantes.map((p) => p.id),
    );
  // Version sans clé : pas de règle personnalisée (filtre, champs restreints) ; permissions entières.
  await api(
    'POST',
    '/permissions',
    liste.map((p) => ({
      policy: policyId,
      fields: ['*'],
      permissions: null,
      validation: null,
      ...p,
    })),
  );
}

// --- Éditeur ----------------------------------------------------------------------------------

const editeur = await politique('Éditeur', {
  icon: 'edit_note',
  description: 'Crée, modifie et publie les contenus. Pas d’accès au schéma ni aux paramètres.',
  app_access: true,
  admin_access: false,
  enforce_tfa: false,
});
await permissions(editeur, [
  ...EDITABLES.flatMap((collection) =>
    ['create', 'read', 'update', 'delete'].map((action) => ({
      collection,
      action,
    })),
  ),
  { collection: 'settings', action: 'read' },
  { collection: 'demandes_contact', action: 'read' },
  { collection: 'demandes_contact', action: 'update' },
  { collection: 'inscriptions_lettre', action: 'read' },
  ...['create', 'read', 'update'].map((action) => ({
    collection: 'directus_files',
    action,
  })),
  { collection: 'directus_folders', action: 'read' },
]);
const roleEditeur = await role('Éditeur', 'edit_note', 'Clara : contenus du site.', editeur);

// --- Site (build) -----------------------------------------------------------------------------

const lecture = await politique('Lecture du site (build)', {
  icon: 'cloud_download',
  description:
    'Lecture seule des contenus publiés, pour le build du site. Sans accès à l’interface.',
  app_access: false,
  admin_access: false,
});
await permissions(lecture, [
  // Le filtre « publiés seulement » est appliqué par les requêtes du build (src/lib/cms/contenu.ts) :
  // la version sans clé de Directus n'accepte pas de règle de filtre dans les permissions.
  ...CONTENUS.map((collection) => ({ collection, action: 'read' })),
  { collection: 'directus_files', action: 'read' },
]);
const roleSite = await role(
  'Site (build)',
  'cloud_download',
  'Compte technique du build du site.',
  lecture,
);

// --- Comptes ----------------------------------------------------------------------------------

if (!(await trouver('/users', { email: { _eq: 'clara@m42.guide' } }))) {
  await api('POST', '/users', {
    first_name: 'Clara',
    last_name: 'Peron',
    email: 'clara@m42.guide',
    role: roleEditeur,
    status: 'draft',
    language: 'fr-FR',
  });
  console.log('+ compte Clara (brouillon, à activer)');
}

let build = await trouver('/users', { email: { _eq: 'build@m42.guide' } });
if (!build) {
  build = await api<Item>('POST', '/users', {
    first_name: 'Build',
    last_name: 'du site',
    email: 'build@m42.guide',
    role: roleSite,
    status: 'active',
  });
  console.log('+ compte technique build');
}
const token = randomBytes(32).toString('hex');
await api('PATCH', `/users/${build.id}`, { token, role: roleSite });
const envSite = join(SITE_DIR, '.env');
ecrireEnv(envSite, 'DIRECTUS_URL', CMS_URL);
ecrireEnv(envSite, 'DIRECTUS_TOKEN', token);
console.log(`Jeton du build renouvelé et écrit dans ${envSite} (non versionné).`);
