/**
 * Crée ou complète le schéma Directus de M42.guide (idempotent), puis exporte le snapshot
 * versionné dans cms/schema/snapshot.json.
 *
 * Usage (depuis site/) : npm run cms:schema
 *
 * Collections (10 sur 25 possibles sans clé de licence) :
 * settings (singleton), intervenants, conferences, publics, ressources, pages,
 * faq, sources, demandes_contact, inscriptions_lettre.
 * Les champs des collections de contenu sont déduits du contenu initial (src/data, via
 * site/src/lib/cms/registre.ts) : un champ par clé de premier niveau, type et interface
 * choisis selon la valeur (texte, nombre, booléen, liste, JSON).
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { api, lire, CMS_DIR } from './lib.ts';
import { documents } from '../../site/src/lib/cms/registre.ts';
import {
  FORME,
  PARENT,
  versEnregistrement,
  type CollectionContenu,
} from '../../site/src/lib/cms/modele.ts';

type Champ = {
  field: string;
  type: string;
  meta?: Record<string, unknown>;
  schema?: Record<string, unknown> | null;
};

const fr = (t: string) => [{ language: 'fr-FR', translation: t }];
/** Libellés français des champs déduits du contenu (repli : la clé, mise en forme). */
const LIBELLES: Record<string, string> = {
  // Communs
  seo: 'Référencement (titre, description)',
  titre: 'Titre',
  sous_titre: 'Sous-titre',
  sur_titre: 'Sur-titre',
  description: 'Description',
  cta: 'Bouton',
  contact: 'Bloc contact',
  faq: 'FAQ (titre de section)',
  formats: 'Formats',
  publics: 'Publics',
  conferences: 'Conférences recommandées',
  labels: 'Libellés',
  // Conférences
  numero: 'Numéro',
  disponibilite: 'Disponibilité',
  mention_signature: 'Mention « Conférence signature »',
  promesse: 'Promesse',
  cta_secondaire: 'Bouton secondaire',
  mise_a_jour: 'Mise à jour (affichée)',
  fiche: 'Fiche (pour qui, formats, participants, où)',
  demonstration: 'Démonstration animée',
  en_clair: 'En clair',
  objectifs: 'Objectifs',
  programme: 'Programme',
  temps_fort: 'Temps fort',
  temps_fort_etapes: 'Temps fort : étapes',
  methodes: 'Méthodes des pros',
  keynote: 'Version keynote',
  declinaison_entreprise: 'Déclinaison entreprise',
  service: 'Données structurées (Service)',
  carte: 'Carte du catalogue',
  note_titre: 'Note sous le titre',
  chiffres: 'Chiffres',
  jeu: 'Jeu',
  numeros: 'Numéros utiles',
  mention_en_tete: 'Mention sous les boutons',
  methode: 'La méthode',
  frise: 'Frise (heures)',
  charte: 'Charte',
  bon_numero: 'Bande « Le bon numéro »',
  // Pour qui
  hero: 'En-tête',
  stakes: 'Enjeux',
  color_rule: 'Règle vert, orange, rouge',
  takeaways: 'Ce que chacun emporte',
  steps: 'Comment ça se passe',
  rundown: 'Déroulé',
  kit: 'Kit organisateur',
  order: 'Commande publique',
  audiences: 'Publics (schéma)',
  relay: 'Le relais',
  // Intervenants
  ordre: 'Ordre (1 = Clara, 2 = Paul)',
  nom: 'Nom',
  prenom: 'Prénom',
  role: 'Rôle (sur-titre)',
  accroche: 'Bio courte',
  bio_longue: 'Bio longue (paragraphes)',
  photo: 'Photo (emplacement, crédit)',
  sur_scene: 'Sur scène',
  email: 'E-mail',
  linkedin: 'LinkedIn',
  schema: 'Données structurées (Person)',
  // Repères
  type: 'Nature et durée',
  statut: 'État affiché (disponible ou bientôt)',
  href: 'Lien',
  // Réglages
  baseline: 'Phrase du pied de page',
  contacts: 'Contacts (Clara, puis Paul)',
  telephone: 'Téléphone',
  // Sous-champs des listes
  label: 'Libellé',
  valeur: 'Valeur',
  texte: 'Texte',
  source: 'Source',
  duree: 'Durée',
  question: 'Question',
  reponse: 'Réponse',
  prenom_contact: 'Prénom',
};
const libelle = (f: string) => {
  if (LIBELLES[f]) return LIBELLES[f];
  const t = f.replace(/_/g, ' ');
  return t.charAt(0).toUpperCase() + t.slice(1);
};

// --- Champs communs -------------------------------------------------------------------------

const id: Champ = {
  field: 'id',
  type: 'integer',
  meta: { hidden: true, readonly: true, interface: 'input' },
  schema: { is_primary_key: true, has_auto_increment: true },
};
const status: Champ = {
  field: 'status',
  type: 'string',
  meta: {
    width: 'half',
    interface: 'select-dropdown',
    display: 'labels',
    translations: fr('Statut'),
    note: 'Seuls les contenus publiés sont mis en ligne, à la prochaine mise à jour du site.',
    options: {
      choices: [
        { text: 'Publié', value: 'published', color: '#2E6B4F' },
        { text: 'Brouillon', value: 'draft', color: '#8A8478' },
      ],
    },
    display_options: {
      showAsDot: true,
      choices: [
        {
          text: 'Publié',
          value: 'published',
          foreground: '#FFFFFF',
          background: '#2E6B4F',
        },
        {
          text: 'Brouillon',
          value: 'draft',
          foreground: '#FFFFFF',
          background: '#8A8478',
        },
      ],
    },
  },
  schema: { default_value: 'draft', is_nullable: false },
};
const sort: Champ = {
  field: 'sort',
  type: 'integer',
  meta: { hidden: true, interface: 'input' },
  schema: {},
};
const slug: Champ = {
  field: 'slug',
  type: 'string',
  meta: {
    width: 'half',
    interface: 'input',
    required: true,
    translations: fr('Identifiant (adresse)'),
    note: 'Ne pas modifier après publication : c’est l’adresse de la page.',
    options: { slug: true, trim: true },
  },
  schema: { is_unique: true, is_nullable: false },
};
const horodatage: Champ[] = [
  {
    field: 'date_created',
    type: 'timestamp',
    meta: {
      special: ['date-created'],
      interface: 'datetime',
      readonly: true,
      hidden: true,
      width: 'half',
    },
    schema: {},
  },
  {
    field: 'date_updated',
    type: 'timestamp',
    meta: {
      special: ['date-updated'],
      interface: 'datetime',
      readonly: true,
      width: 'half',
      display: 'datetime',
      display_options: { relative: true },
      translations: fr('Modifié'),
    },
    schema: {},
  },
  {
    field: 'user_updated',
    type: 'uuid',
    meta: {
      special: ['user-updated'],
      interface: 'select-dropdown-m2o',
      readonly: true,
      hidden: true,
    },
    schema: {},
  },
];

// --- Champs déduits du contenu ----------------------------------------------------------------

const estObjetPlat = (v: unknown): v is Record<string, string | number | boolean> =>
  !!v &&
  typeof v === 'object' &&
  !Array.isArray(v) &&
  Object.values(v).every((x) => ['string', 'number', 'boolean'].includes(typeof x));

function champDeduit(field: string, valeurs: unknown[]): Champ {
  const meta: Record<string, unknown> = { translations: fr(libelle(field)) };
  const types = new Set(valeurs.map((v) => (Array.isArray(v) ? 'array' : typeof v)));
  const seul = types.size === 1 ? [...types][0] : 'mixte';

  if (seul === 'string') {
    const long = (valeurs as string[]).some(
      (s) => s.length > 90 || s.includes('\n') || s.includes('<'),
    );
    return {
      field,
      type: 'text',
      meta: { ...meta, interface: long ? 'input-multiline' : 'input' },
      schema: {},
    };
  }
  if (seul === 'number') {
    const entier = (valeurs as number[]).every(Number.isInteger);
    return {
      field,
      type: entier ? 'integer' : 'float',
      meta: { ...meta, interface: 'input', width: 'half' },
      schema: {},
    };
  }
  if (seul === 'boolean') {
    return {
      field,
      type: 'boolean',
      meta: { ...meta, interface: 'boolean', width: 'half' },
      schema: {},
    };
  }
  if (seul === 'array') {
    const items = (valeurs as unknown[][]).flat();
    if (
      items.length &&
      items.every((x) => typeof x === 'string' && x.length <= 60 && !x.includes('<'))
    ) {
      return {
        field,
        type: 'json',
        meta: {
          ...meta,
          interface: 'tags',
          special: ['cast-json'],
          options: { alphabetize: false, whitespace: null },
        },
        schema: {},
      };
    }
    if (items.length && items.every(estObjetPlat)) {
      const cles = [...new Set(items.flatMap((x) => Object.keys(x)))];
      return {
        field,
        type: 'json',
        meta: {
          ...meta,
          interface: 'list',
          special: ['cast-json'],
          options: {
            template: `{{${cles[0]}}}`,
            fields: cles.map((k) => {
              const ex = items.map((x) => x[k]).find((x) => x !== undefined);
              const t =
                typeof ex === 'boolean' ? 'boolean' : typeof ex === 'number' ? 'integer' : 'text';
              return {
                field: k,
                name: libelle(k),
                type: t,
                meta: {
                  field: k,
                  type: t,
                  width: 'full',
                  interface:
                    t === 'boolean' ? 'boolean' : t === 'integer' ? 'input' : 'input-multiline',
                },
              };
            }),
          },
        },
        schema: {},
      };
    }
  }
  return {
    field,
    type: 'json',
    meta: {
      ...meta,
      interface: 'input-code',
      special: ['cast-json'],
      options: { language: 'JSON', lineWrapping: true },
    },
    schema: {},
  };
}

function champsDeduits(collection: CollectionContenu): Champ[] {
  const valeurs = new Map<string, unknown[]>();
  for (const d of documents.filter((x) => x.collection === collection)) {
    for (const [k, v] of Object.entries(versEnregistrement(d).champs)) {
      if (['slug', 'status', 'titre_admin', 'contenu'].includes(k)) continue;
      valeurs.set(k, [...(valeurs.get(k) ?? []), v]);
    }
  }
  return [...valeurs].map(([k, v]) => champDeduit(k, v));
}

// --- Définition des collections ---------------------------------------------------------------

interface DefCollection {
  collection: string;
  meta: Record<string, unknown>;
  fields: Champ[];
}

const contenu = (
  collection: CollectionContenu,
  nom: string,
  icon: string,
  note: string,
  display_template: string,
): DefCollection => ({
  collection,
  meta: {
    icon,
    note,
    display_template,
    sort_field: 'sort',
    archive_field: 'status',
    archive_value: 'draft',
    unarchive_value: 'published',
    archive_app_filter: false,
    translations: [{ language: 'fr-FR', translation: nom, singular: nom, plural: nom }],
  },
  fields: [
    id,
    status,
    sort,
    slug,
    ...(FORME[collection] === 'bloc'
      ? [
          {
            field: 'titre_admin',
            type: 'string',
            meta: {
              interface: 'input',
              width: 'half',
              translations: fr('Page'),
            },
            schema: {},
          },
          {
            field: 'contenu',
            type: 'json',
            meta: {
              interface: 'input-code',
              special: ['cast-json'],
              options: { language: 'JSON', lineWrapping: true },
              translations: fr('Contenu de la page'),
              note: 'Textes de la page, section par section. Garder la structure (clés) : ne modifier que les textes.',
            },
            schema: {},
          } satisfies Champ,
        ]
      : champsDeduits(collection)),
    ...horodatage,
  ],
});

const texte = (field: string, nom: string, extra: Record<string, unknown> = {}): Champ => ({
  field,
  type: 'text',
  meta: { interface: 'input-multiline', translations: fr(nom), ...extra },
  schema: {},
});
const chaine = (field: string, nom: string, extra: Record<string, unknown> = {}): Champ => ({
  field,
  type: 'string',
  meta: { interface: 'input', width: 'half', translations: fr(nom), ...extra },
  schema: {},
});
const emplacement: Champ = chaine('emplacement', 'Emplacement dans la page', {
  readonly: true,
  note: 'Rempli automatiquement : où la liste apparaît dans la page.',
});
const menu = (field: string, nom: string, valeurs: [string, string][]): Champ => ({
  field,
  type: 'string',
  meta: {
    interface: 'select-dropdown',
    width: 'half',
    display: 'labels',
    translations: fr(nom),
    options: { choices: valeurs.map(([value, text]) => ({ value, text })) },
  },
  schema: {},
});

const settingsDoc = documents.find((d) => d.collection === 'settings');

const COLLECTIONS: DefCollection[] = [
  {
    collection: 'settings',
    meta: {
      icon: 'tune',
      singleton: true,
      note: 'Réglages communs du site : phrase du pied de page, contacts, téléphone.',
      translations: [
        {
          language: 'fr-FR',
          translation: 'Réglages du site',
          singular: 'Réglages',
          plural: 'Réglages',
        },
      ],
    },
    fields: [
      id,
      ...(settingsDoc ? champsDeduits('settings') : []),
      {
        field: 'publication_demandee',
        type: 'string',
        meta: { interface: 'input', hidden: true, readonly: true },
        schema: {},
      },
      ...horodatage,
    ],
  },
  contenu(
    'intervenants',
    'Intervenants',
    'record_voice_over',
    'Clara, puis Paul (ordre).',
    '{{nom}}',
  ),
  contenu(
    'conferences',
    'Conférences',
    'co_present',
    'Une page par conférence (/conferences/…/).',
    '{{numero}} · {{titre}}',
  ),
  contenu(
    'publics',
    'Pour qui',
    'groups',
    'Pages Entreprises, Événements, Collectivités, Éducation, Associations.',
    '{{slug}}',
  ),
  contenu(
    'ressources',
    'Repères',
    'menu_book',
    'Bibliothèque de /reperes/ : tests, guides, méthodes, fiches.',
    '{{type}} · {{titre}}',
  ),
  contenu(
    'pages',
    'Pages',
    'article',
    'Accueil, À propos, Organisateurs, Contact, pages satellites et légales.',
    '{{titre_admin}}',
  ),
  {
    collection: 'faq',
    meta: {
      icon: 'quiz',
      note: 'Questions fréquentes, reliées à leur conférence, page « Pour qui » ou page.',
      display_template: '{{question}}',
      sort_field: 'sort',
      archive_field: 'status',
      archive_value: 'draft',
      unarchive_value: 'published',
      translations: [
        {
          language: 'fr-FR',
          translation: 'FAQ',
          singular: 'Question',
          plural: 'Questions',
        },
      ],
    },
    fields: [
      id,
      status,
      sort,
      emplacement,
      texte('question', 'Question', { required: true }),
      texte('reponse', 'Réponse', {
        note: 'Texte simple ; les liens et l’italique s’écrivent en HTML (<a href="…">, <em>).',
      }),
      {
        field: 'json_ld',
        type: 'boolean',
        meta: {
          interface: 'boolean',
          width: 'half',
          translations: fr('Dans les données structurées'),
          note: 'Décocher si la réponse attend encore une source vérifiée : elle reste visible, mais hors des données structurées.',
        },
        schema: { is_nullable: true },
      },
      ...horodatage,
    ],
  },
  {
    collection: 'sources',
    meta: {
      icon: 'link',
      note: 'Sources citées (études, articles), reliées à leur conférence ou page.',
      display_template: '{{titre}}{{html}}',
      sort_field: 'sort',
      archive_field: 'status',
      archive_value: 'draft',
      unarchive_value: 'published',
      translations: [
        {
          language: 'fr-FR',
          translation: 'Sources',
          singular: 'Source',
          plural: 'Sources',
        },
      ],
    },
    fields: [
      id,
      status,
      sort,
      emplacement,
      texte('avant', 'Texte avant le titre'),
      chaine('titre', 'Titre (en italique)', { width: 'full' }),
      texte('apres', 'Texte après le titre'),
      chaine('url', 'Adresse (URL)', { width: 'full' }),
      texte('html', 'Source rédigée (HTML)', {
        note: 'Pour les pages satellites : la ligne complète.',
      }),
      {
        field: 'date_consultation',
        type: 'date',
        meta: {
          interface: 'datetime',
          width: 'half',
          translations: fr('Date de consultation'),
        },
        schema: {},
      },
      ...horodatage,
    ],
  },
  {
    collection: 'demandes_contact',
    meta: {
      icon: 'mail',
      note: 'Demandes reçues par le formulaire de contact. Clara et Paul reçoivent un e-mail à chaque demande.',
      display_template: '{{nom}} · {{structure}}',
      sort_field: null,
      translations: [
        {
          language: 'fr-FR',
          translation: 'Demandes de contact',
          singular: 'Demande',
          plural: 'Demandes',
        },
      ],
    },
    fields: [
      id,
      menu('suivi', 'Suivi', [
        ['nouvelle', 'Nouvelle'],
        ['en_cours', 'En cours'],
        ['traitee', 'Traitée'],
      ]),
      chaine('nom', 'Nom'),
      chaine('structure', 'Structure'),
      chaine('email', 'E-mail'),
      chaine('telephone', 'Téléphone'),
      chaine('type', 'Type de structure'),
      chaine('theme', 'Thème'),
      chaine('format', 'Format'),
      chaine('date', 'Date envisagée'),
      chaine('ville', 'Ville'),
      chaine('participants', 'Participants'),
      chaine('budget', 'Budget'),
      texte('message', 'Message'),
      chaine('page', 'Page d’origine'),
      ...horodatage,
    ],
  },
  {
    collection: 'inscriptions_lettre',
    meta: {
      icon: 'forward_to_inbox',
      note: 'Inscriptions à la lettre et demandes de fiche ou de kit (Repères, test « Arnaque ou pas ? »). La lettre n’est envoyée qu’aux adresses confirmées (double opt-in).',
      display_template: '{{email}} · {{demande}}',
      sort_field: null,
      translations: [
        {
          language: 'fr-FR',
          translation: 'Inscriptions et demandes',
          singular: 'Inscription',
          plural: 'Inscriptions',
        },
      ],
    },
    fields: [
      id,
      menu('demande', 'Demande', [
        ['lettre', 'Lettre mensuelle'],
        ['fiche', 'Fiche à imprimer'],
        ['kit', 'Kit de diffusion'],
      ]),
      chaine('email', 'E-mail'),
      chaine('profil', 'Profil'),
      chaine('nom', 'Nom'),
      chaine('structure', 'Structure'),
      chaine('type_structure', 'Type de structure'),
      chaine('source', 'Page d’origine'),
      {
        field: 'consentement',
        type: 'boolean',
        meta: {
          interface: 'boolean',
          width: 'half',
          translations: fr('Accepte la lettre'),
          note: 'Case cochée par la personne (jamais une condition pour recevoir la fiche ou le kit).',
        },
        schema: { default_value: false },
      },
      {
        field: 'confirme',
        type: 'boolean',
        meta: {
          interface: 'boolean',
          width: 'half',
          readonly: true,
          translations: fr('Adresse confirmée'),
          note: 'Cochée quand la personne a cliqué sur le lien de confirmation reçu par e-mail.',
        },
        schema: { default_value: false },
      },
      {
        field: 'date_confirmation',
        type: 'timestamp',
        meta: {
          interface: 'datetime',
          readonly: true,
          width: 'half',
          translations: fr('Confirmée le'),
        },
        schema: {},
      },
      {
        field: 'jeton',
        type: 'string',
        meta: { interface: 'input', hidden: true, readonly: true },
        schema: {},
      },
      ...horodatage,
    ],
  },
];

// --- Application ------------------------------------------------------------------------------

async function appliquer(): Promise<void> {
  const existantes = new Set(
    ((await api<{ collection: string }[]>('GET', '/collections')) ?? []).map((c) => c.collection),
  );

  for (const def of COLLECTIONS) {
    if (!existantes.has(def.collection)) {
      await api('POST', '/collections', {
        collection: def.collection,
        meta: def.meta,
        schema: {},
        fields: def.fields,
      });
      console.log(`+ collection ${def.collection} (${def.fields.length} champs)`);
      continue;
    }
    await api('PATCH', `/collections/${def.collection}`, { meta: def.meta });
    const champs = new Set(
      ((await api<{ field: string }[]>('GET', `/fields/${def.collection}`)) ?? []).map(
        (f) => f.field,
      ),
    );
    for (const f of def.fields) {
      if (champs.has(f.field)) {
        if (f.field !== 'id')
          await api('PATCH', `/fields/${def.collection}/${f.field}`, {
            meta: f.meta,
          });
      } else {
        await api('POST', `/fields/${def.collection}`, f);
        console.log(`+ champ ${def.collection}.${f.field}`);
      }
    }
  }

  // Relations : faq et sources → conférence, page « Pour qui », page.
  const parents = Object.entries(PARENT) as [CollectionContenu, string][];
  for (const enfant of ['faq', 'sources'] as const) {
    const alias = enfant === 'faq' ? 'questions_faq' : 'sources_citees';
    for (const [collection, champ] of parents) {
      if (enfant === 'sources' && collection === 'publics') continue;
      if (!(await lire(`/fields/${enfant}/${champ}`))) {
        await api('POST', `/fields/${enfant}`, {
          field: champ,
          type: 'integer',
          meta: {
            interface: 'select-dropdown-m2o',
            special: ['m2o'],
            width: 'half',
            translations: fr(
              {
                conference: 'Conférence',
                public: 'Page « Pour qui »',
                page: 'Page',
              }[champ]!,
            ),
            options: {
              template: collection === 'pages' ? '{{titre_admin}}' : '{{slug}}',
            },
            display: 'related-values',
            display_options: {
              template: collection === 'pages' ? '{{titre_admin}}' : '{{slug}}',
            },
          },
          schema: {},
        });
      }
      if (!(await lire(`/fields/${collection}/${alias}`))) {
        await api('POST', `/fields/${collection}`, {
          field: alias,
          type: 'alias',
          meta: {
            special: ['o2m'],
            interface: 'list-o2m',
            translations: fr(enfant === 'faq' ? 'Questions fréquentes' : 'Sources citées'),
            options: {
              template: enfant === 'faq' ? '{{question}}' : '{{titre}}{{html}}',
              enableLink: true,
            },
          },
        });
      }
      if (!(await lire(`/relations/${enfant}/${champ}`))) {
        await api('POST', '/relations', {
          collection: enfant,
          field: champ,
          related_collection: collection,
          meta: {
            one_field: alias,
            sort_field: 'sort',
            one_deselect_action: 'nullify',
          },
          schema: { on_delete: 'SET NULL' },
        });
        console.log(`+ relation ${enfant}.${champ} → ${collection}`);
      }
    }
  }

  // Réglages du projet : nom et langue de l'interface.
  await api('PATCH', '/settings', {
    project_name: 'M42.guide',
    default_language: 'fr-FR',
    project_color: '#0E0F12',
  });
}

async function snapshot(): Promise<void> {
  const snap = await api('GET', '/schema/snapshot');
  const fichier = join(CMS_DIR, 'schema', 'snapshot.json');
  writeFileSync(fichier, `${JSON.stringify(snap, null, 2)}\n`);
  console.log(`Snapshot : ${fichier}`);
}

await appliquer();
await snapshot();
