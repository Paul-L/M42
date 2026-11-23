/**
 * Formulaires publics et flows Directus (idempotent).
 *
 * Usage (depuis site/) : npm run cms:flows
 *
 * - Rôle public : autorisé uniquement à *créer* dans `demandes_contact` et `inscriptions_lettre`.
 * - Flow « Formulaires : contrôle » (bloquant, avant enregistrement) : champ piège, délai minimal
 *   de saisie, validation et nettoyage des champs (seuls les champs attendus sont gardés).
 * - Flow « Formulaires : e-mails » (après enregistrement) : notification à Clara et Paul ;
 *   e-mail de confirmation (double opt-in) pour la lettre.
 * - Flow « Lettre : confirmation » (webhook appelé par /lettre/confirmer/) : marque l'adresse
 *   comme confirmée si le jeton correspond.
 * L'identifiant du webhook de confirmation est écrit dans site/.env (PUBLIC_FLOW_CONFIRMATION).
 * 3 flows sur 5 (le 4e servira au déploiement, phase 5).
 */
import { join } from 'node:path';
import { api, ecrireEnv, CMS_URL, SITE_DIR } from './lib.ts';

const NOTIFIER = ['clara@m42.guide', 'paul@m42.guide'];

interface Item {
  id: string;
  name?: string;
}

/** Script du contrôle : exécuté par Directus (bac à sable), avant l'enregistrement. */
const CONTROLE = String.raw`
module.exports = async function (data) {
  const t = data.$trigger;
  const p = t.payload || {};
  // Saisie dans l'interface (compte connecté) : pas de contrôle anti-robot.
  if (data.$accountability && data.$accountability.user) return p;

  const refuser = (m) => { throw new Error(m); };
  if (p.site_web) refuser('Envoi refusé.');
  const delai = Number(p.delai_ms);
  if (!Number.isFinite(delai) || delai < 3000) refuser('Envoi refusé : formulaire envoyé trop vite.');

  const texte = (cle, max, requis) => {
    const v = typeof p[cle] === 'string' ? p[cle].trim() : '';
    if (requis && !v) refuser('Champ obligatoire manquant : ' + cle + '.');
    if (v.length > max) refuser('Champ trop long : ' + cle + '.');
    return v || null;
  };
  const email = texte('email', 254, true);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) refuser('Adresse e-mail invalide.');

  if (t.collection === 'demandes_contact') {
    return {
      suivi: 'nouvelle',
      nom: texte('nom', 120, true),
      structure: texte('structure', 160, true),
      email,
      telephone: texte('telephone', 40, false),
      type: texte('type', 60, true),
      theme: texte('theme', 60, false),
      format: texte('format', 60, false),
      date: texte('date', 60, false),
      ville: texte('ville', 120, false),
      participants: texte('participants', 60, false),
      budget: texte('budget', 60, false),
      message: texte('message', 5000, false),
      page: texte('page', 200, false),
    };
  }

  const demande = texte('demande', 10, true);
  if (!['lettre', 'fiche', 'kit'].includes(demande)) refuser('Demande inconnue.');
  const consentement = p.consentement === true || p.consentement === 'true' || p.consentement === 'on';
  if (demande === 'lettre' && !consentement) refuser('Consentement manquant.');
  let jeton = '';
  for (let i = 0; i < 40; i++) jeton += 'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)];
  return {
    demande,
    email,
    profil: texte('profil', 60, false),
    nom: texte('nom', 120, demande === 'kit'),
    structure: texte('structure', 160, demande === 'kit'),
    type_structure: texte('type_structure', 60, demande === 'kit'),
    source: texte('source', 200, false),
    consentement,
    confirme: false,
    jeton: consentement ? jeton : null,
  };
};
`;

/** Script des e-mails : prépare la notification et, si besoin, la confirmation. */
const PREPARER = String.raw`
module.exports = async function (data) {
  const t = data.$trigger;
  const p = t.payload || {};
  const site = data.$env.SITE_URL || 'https://m42.guide';
  const ligne = (label, v) => (v ? '- **' + label + '** : ' + v + '\n' : '');
  if (t.collection === 'demandes_contact') {
    return {
      notifier: true,
      sujet: 'Nouvelle demande de contact : ' + (p.structure || p.nom || ''),
      corps:
        'Une demande vient d’arriver par le formulaire de contact.\n\n' +
        ligne('Nom', p.nom) + ligne('Structure', p.structure) + ligne('E-mail', p.email) +
        ligne('Téléphone', p.telephone) + ligne('Type de structure', p.type) + ligne('Thème', p.theme) +
        ligne('Format', p.format) + ligne('Date', p.date) + ligne('Ville', p.ville) +
        ligne('Participants', p.participants) + ligne('Budget', p.budget) +
        (p.message ? '\n**Message**\n\n' + p.message + '\n' : '') +
        '\nÀ traiter dans Directus : Demandes de contact.',
      confirmer: false,
    };
  }
  const libelles = { lettre: 'Inscription à la lettre', fiche: 'Demande de la fiche à imprimer', kit: 'Demande du kit de diffusion' };
  const confirmer = !!p.consentement && !!p.jeton;
  return {
    notifier: p.demande !== 'lettre',
    sujet: libelles[p.demande] + ' : ' + p.email,
    corps:
      libelles[p.demande] + ' depuis ' + (p.source || 'le site') + '.\n\n' +
      ligne('E-mail', p.email) + ligne('Nom', p.nom) + ligne('Structure', p.structure) +
      ligne('Type de structure', p.type_structure) + ligne('Accepte la lettre', p.consentement ? 'oui' : 'non') +
      '\nÀ envoyer à la main tant que la fiche et le kit ne sont pas produits.',
    confirmer,
    destinataire: p.email,
    lien: site + '/lettre/confirmer/?id=' + encodeURIComponent(t.key) + '&jeton=' + encodeURIComponent(p.jeton || ''),
  };
};
`;

const CONFIRMATION_MAIL = [
  'Bonjour,',
  '',
  'Vous avez demandé à recevoir les nouveaux repères de M42 : une lettre courte, une fois par mois. Vous pourrez vous désinscrire en un clic.',
  '',
  'Pour confirmer votre adresse, cliquez sur ce lien :',
  '',
  '[Confirmer mon inscription]({{preparer.lien}})',
  '',
  'Si vous n’êtes pas à l’origine de cette demande, ignorez ce message : vous ne recevrez rien.',
  '',
  'Clara Peron et Paul Loustaunau, M42',
].join('\n');

/** Script du webhook de confirmation : vérifie que la lecture a trouvé l'inscription. */
const VERIFIER = String.raw`
module.exports = async function (data) {
  const trouve = Array.isArray(data.lire) ? data.lire[0] : null;
  if (!trouve) throw new Error('Lien de confirmation invalide.');
  return { id: trouve.id, maintenant: new Date().toISOString() };
};
`;

// --- Outils -----------------------------------------------------------------------------------

async function flow(name: string, def: Record<string, unknown>): Promise<string> {
  const q = encodeURIComponent(JSON.stringify({ name: { _eq: name } }));
  const existant = (await api<Item[]>('GET', `/flows?filter=${q}&fields=id`))[0];
  if (existant) {
    // Opérations recréées à chaque passage (définies ici, pas dans l'interface).
    await api('PATCH', `/flows/${existant.id}`, { ...def, operation: null });
    const ops = await api<Item[]>('GET', `/operations?filter[flow][_eq]=${existant.id}&fields=id`);
    if (ops.length)
      await api(
        'DELETE',
        '/operations',
        ops.map((o) => o.id),
      );
    return existant.id;
  }
  console.log(`+ flow ${name}`);
  return (await api<Item>('POST', '/flows', { name, status: 'active', ...def })).id;
}

interface Op {
  key: string;
  name: string;
  type: string;
  options: Record<string, unknown>;
  resolve?: string;
  reject?: string;
}

/** Crée les opérations d'un flow (de la dernière à la première, pour relier resolve/reject). */
async function operations(flowId: string, ops: Op[]): Promise<void> {
  const ids = new Map<string, string>();
  for (const [i, op] of ops.map((o, n) => [n, o] as const).reverse()) {
    const cree = await api<Item>('POST', '/operations', {
      flow: flowId,
      key: op.key,
      name: op.name,
      type: op.type,
      options: op.options,
      position_x: 19 + i * 18,
      position_y: 1 + (op.key.startsWith('confirm') ? 18 : 0),
      resolve: op.resolve ? ids.get(op.resolve) : null,
      reject: op.reject ? ids.get(op.reject) : null,
    });
    ids.set(op.key, cree.id);
  }
  await api('PATCH', `/flows/${flowId}`, { operation: ids.get(ops[0]!.key) });
}

// --- Rôle public ------------------------------------------------------------------------------

const publique = (
  await api<Item[]>(
    'GET',
    `/policies?filter=${encodeURIComponent(JSON.stringify({ name: { _eq: '$t:public_label' } }))}`,
  )
)[0];
if (!publique) throw new Error('Politique publique introuvable.');
const permsPubliques = await api<{ id: number; collection: string; action: string }[]>(
  'GET',
  `/permissions?filter[policy][_eq]=${publique.id}&limit=-1`,
);
for (const collection of ['demandes_contact', 'inscriptions_lettre']) {
  if (!permsPubliques.some((p) => p.collection === collection && p.action === 'create')) {
    await api('POST', '/permissions', {
      policy: publique.id,
      collection,
      action: 'create',
      fields: ['*'],
      permissions: null,
      validation: null,
    });
    console.log(`+ public : création dans ${collection}`);
  }
}

// --- Flow 1 : contrôle ------------------------------------------------------------------------

const controle = await flow('Formulaires : contrôle', {
  icon: 'verified_user',
  description: 'Champ piège, délai minimal, validation et nettoyage des envois publics.',
  trigger: 'event',
  accountability: 'all',
  options: {
    type: 'filter',
    scope: ['items.create'],
    collections: ['demandes_contact', 'inscriptions_lettre'],
    return: '$last',
  },
});
await operations(controle, [
  { key: 'controle', name: 'Contrôler et nettoyer', type: 'exec', options: { code: CONTROLE } },
]);

// --- Flow 2 : e-mails -------------------------------------------------------------------------

const emails = await flow('Formulaires : e-mails', {
  icon: 'mail',
  description: 'Notification à Clara et Paul ; e-mail de confirmation pour la lettre.',
  trigger: 'event',
  accountability: 'all',
  options: {
    type: 'action',
    scope: ['items.create'],
    collections: ['demandes_contact', 'inscriptions_lettre'],
  },
});
await operations(emails, [
  {
    key: 'preparer',
    name: 'Préparer les e-mails',
    type: 'exec',
    options: { code: PREPARER },
    resolve: 'si_notifier',
  },
  {
    key: 'si_notifier',
    name: 'Notifier Clara et Paul ?',
    type: 'condition',
    options: { filter: { preparer: { notifier: { _eq: true } } } },
    resolve: 'notifier',
    reject: 'si_confirmer',
  },
  {
    key: 'notifier',
    name: 'Notification',
    type: 'mail',
    options: {
      to: NOTIFIER,
      subject: '{{preparer.sujet}}',
      body: '{{preparer.corps}}',
      type: 'markdown',
    },
    resolve: 'si_confirmer',
  },
  {
    key: 'si_confirmer',
    name: 'Confirmation à envoyer ?',
    type: 'condition',
    options: { filter: { preparer: { confirmer: { _eq: true } } } },
    resolve: 'confirmation',
  },
  {
    key: 'confirmation',
    name: 'Confirmer l’adresse (double opt-in)',
    type: 'mail',
    options: {
      to: ['{{preparer.destinataire}}'],
      subject: 'Confirmez votre inscription à la lettre de M42',
      body: CONFIRMATION_MAIL,
      type: 'markdown',
    },
  },
]);

// --- Flow 3 : confirmation de la lettre -------------------------------------------------------

const confirmation = await flow('Lettre : confirmation', {
  icon: 'mark_email_read',
  description: 'Appelé par la page /lettre/confirmer/ : confirme l’adresse si le jeton correspond.',
  trigger: 'webhook',
  accountability: 'all',
  options: { method: 'GET', async: false, return: '$last' },
});
await operations(confirmation, [
  {
    key: 'lire',
    name: 'Trouver l’inscription',
    type: 'item-read',
    options: {
      collection: 'inscriptions_lettre',
      permissions: '$full',
      query: {
        filter: {
          _and: [
            { id: { _eq: '{{$trigger.query.id}}' } },
            { jeton: { _eq: '{{$trigger.query.jeton}}' } },
            { jeton: { _nnull: true } },
          ],
        },
        fields: ['id'],
        limit: 1,
      },
    },
    resolve: 'verifier',
  },
  {
    key: 'verifier',
    name: 'Vérifier',
    type: 'exec',
    options: { code: VERIFIER },
    resolve: 'confirmer',
  },
  {
    key: 'confirmer',
    name: 'Marquer comme confirmée',
    type: 'item-update',
    options: {
      collection: 'inscriptions_lettre',
      permissions: '$full',
      key: ['{{verifier.id}}'],
      payload: { confirme: true, date_confirmation: '{{verifier.maintenant}}' },
    },
    resolve: 'reponse',
  },
  {
    key: 'reponse',
    name: 'Réponse',
    type: 'exec',
    options: { code: 'module.exports = async function () { return { confirme: true }; };' },
  },
]);

ecrireEnv(join(SITE_DIR, '.env'), 'PUBLIC_DIRECTUS_URL', CMS_URL);
ecrireEnv(join(SITE_DIR, '.env'), 'PUBLIC_FLOW_CONFIRMATION', confirmation);
console.log('Flows prêts. URL publique et identifiant du webhook écrits dans site/.env.');
