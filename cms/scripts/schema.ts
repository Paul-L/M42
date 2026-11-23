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
import { FORME, PARENT, type CollectionContenu } from '../../site/src/lib/cms/modele.ts';
import { plan, PREFIXES } from '../../site/src/lib/cms/plat.ts';
import {
  aplatirLigne,
  nomChamp,
  type ChampPlat,
  type Forme,
} from '../../site/src/lib/cms/forme.ts';

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
  mise_ajour: 'Mise à jour (affichée)',
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
  // Clés communes des pages (souvent en anglais dans le code)
  title: 'Titre',
  eyebrow: 'Sur-titre',
  lead: 'Chapô',
  text: 'Texte',
  texte: 'Texte',
  items: 'Éléments',
  paragraphs: 'Paragraphes',
  paragraphes: 'Paragraphes',
  primary: 'Bouton principal',
  secondary: 'Bouton secondaire',
  crumb: 'Fil d’Ariane',
  crumbs: 'Fil d’Ariane',
  breadcrumb: 'Fil d’Ariane',
  ariane: 'Fil d’Ariane',
  intro: 'Introduction',
  sections: 'Sections',
  blocks: 'Blocs',
  kind: 'Genre',
  link: 'Lien',
  links: 'Liens',
  lien: 'Lien',
  liens: 'Liens',
  note: 'Note',
  notes: 'Notes',
  over: 'Sur-titre',
  updated: 'Mise à jour',
  rows: 'Lignes',
  term: 'Terme',
  def: 'Définition',
  html: 'Texte (HTML)',
  alt: 'Texte alternatif',
  caption: 'Légende',
  legende: 'Légende',
  heading: 'Titre',
  subtitle: 'Sous-titre',
  summary: 'Résumé',
  resume: 'Résumé',
  duration: 'Durée',
  participants: 'Participants',
  for_you: 'Pour vous',
  numeral: 'Numéro',
  signature: 'Conférence signature',
  photo_placeholder: 'Emplacement photo',
  placeholder: 'Emplacement',
  credit: 'Crédit',
  toc: 'Sommaire',
  on_this_page: 'Sur cette page',
  hero_title: 'Titre',
  surtitre: 'Sur-titre',
  chapo: 'Chapô',
  titre_court: 'Titre court',
  label_ariane: 'Fil d’Ariane',
  id: 'Ancre',
  heading_id: 'Ancre du titre',
  page: 'Page',
  value: 'Valeur',
  url: 'Adresse',
  name: 'Nom',
  role_label: 'Rôle',
  date: 'Date',
  date_modified: 'Date de mise à jour (ISO)',
  by: 'Par',
  authors: 'Auteurs',
  reading_time: 'Temps de lecture',
  brief: 'En bref',
  audience: 'Public',
  audience_type: 'Type de public',
  educational_role: 'Rôle éducatif',
  service_type: 'Type de service',
  about: 'Sujets',
  answer: 'Réponse',
  json_ld: 'Dans les données structurées',
  step: 'Étape',
  form_section: 'Section formulaire',
  faq_section: 'Section FAQ',
  aside: 'Encadré',
  hint: 'Aide',
  error: 'Message d’erreur',
  fields: 'Champs',
  options: 'Choix',
  // Sous-champs des listes
  label: 'Libellé',
  valeur: 'Valeur',
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
      sort: 9100,
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

// --- Champs à plat, déduits du contenu (site/src/lib/cms/forme.ts) ---------------------------

/** Libellé d'une clé de contenu (dictionnaire, sinon la clé mise en forme). */
const libelleCle = (k: string) => libelle(nomChamp('', [k]));

/** Libellé d'un chemin : la dernière clé, précédée des clés intermédiaires sous un groupe. */
const libelleChemin = (chemin: string[], depuis = 1) =>
  chemin.slice(depuis).length > 1
    ? chemin.slice(depuis).map(libelleCle).join(' › ')
    : libelleCle(chemin.at(-1) ?? '');

const NOTE_HTML = 'Texte avec balises HTML simples (<em>, <strong>, <a href="…">) : les garder.';

/** Valeurs connues proposées en menu déroulant (clé de contenu → choix). */
const CHOIX: Record<string, [string, string][]> = {
  disponibilite: [
    ['catalogue', 'Au catalogue (page publiée)'],
    ['sur-demande', 'Sur demande (sans page)'],
  ],
  statut: [
    ['disponible', 'Disponible'],
    ['bientot', 'Bientôt'],
  ],
};

/** Interface et type Directus d'une feuille. */
function interfaceDe(f: Forme, cle = ''): { type: string; meta: Record<string, unknown> } {
  if (f.k === 'texte' && CHOIX[cle])
    return {
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        width: 'half',
        options: { choices: CHOIX[cle].map(([value, text]) => ({ value, text })) },
      },
    };
  switch (f.k) {
    case 'texte':
      return {
        type: 'text',
        meta: {
          interface: f.long || f.html ? 'input-multiline' : 'input',
          ...(f.html ? { note: NOTE_HTML } : {}),
        },
      };
    case 'nombre':
      return { type: f.entier ? 'integer' : 'float', meta: { interface: 'input', width: 'half' } };
    case 'bool':
      return { type: 'boolean', meta: { interface: 'boolean', width: 'half' } };
    case 'liste':
      return {
        type: 'json',
        meta: {
          interface: 'list',
          special: ['cast-json'],
          options: {
            fields: sousChamps(f.item),
            template: modeleLigne(f.item),
            addLabel: 'Ajouter',
          },
        },
      };
    default:
      return {
        type: 'json',
        meta: {
          interface: 'input-code',
          special: ['cast-json'],
          options: { language: 'JSON', lineWrapping: true },
          note: 'Structure particulière : modifier les textes entre guillemets, sans toucher au reste.',
        },
      };
  }
}

/** Champs d'une ligne de liste répétable (listes imbriquées comprises). */
function sousChamps(item: Forme): Record<string, unknown>[] {
  return aplatirLigne(item).map((c) => {
    const { type, meta } = interfaceDe(c.forme);
    const nom = c.chemin.length ? libelleChemin(c.chemin, 0) : 'Texte';
    return {
      field: c.cle,
      name: nom,
      type,
      meta: {
        field: c.cle,
        type,
        width: 'full',
        ...meta,
        ...(meta.width ? { width: meta.width } : {}),
      },
    };
  });
}

/** Résumé d'une ligne dans la liste repliée : premier champ texte. */
function modeleLigne(item: Forme): string {
  const premier = aplatirLigne(item).find((c) => c.forme.k === 'texte');
  return premier ? `{{${premier.cle}}}` : 'Élément';
}

let rangChamp = 0;

/** Groupe (section repliable). */
const groupe = (
  field: string,
  nom: string,
  parent: string | null,
  extra: Record<string, unknown> = {},
): Champ => ({
  field,
  type: 'alias',
  meta: {
    interface: 'group-detail',
    special: ['alias', 'no-data', 'group'],
    options: { start: 'closed' },
    translations: fr(nom),
    group: parent,
    sort: ++rangChamp,
    ...extra,
  },
  schema: null,
});

/** Champs (groupes + feuilles) d'une forme, sous un groupe parent éventuel. */
function champsDuPlan(champs: ChampPlat[], prefixeGroupe: string, parent: string | null): Champ[] {
  const out: Champ[] = [];
  const groupes = new Set<string>();
  for (const c of champs) {
    let g = parent;
    if (c.groupe) {
      g = nomChamp(`g_${prefixeGroupe}`, [c.groupe]);
      if (!groupes.has(g)) {
        groupes.add(g);
        out.push(groupe(g, libelleCle(c.groupe), parent));
      }
    }
    const { type, meta } = interfaceDe(c.forme, c.chemin.at(-1));
    out.push({
      field: c.nom,
      type,
      meta: {
        ...meta,
        translations: fr(c.groupe ? libelleChemin(c.chemin) : libelleCle(c.chemin[0] ?? '')),
        group: g,
        sort: ++rangChamp,
      },
      schema: {},
    });
  }
  return out;
}

function champsDeduits(collection: CollectionContenu): Champ[] {
  return champsDuPlan(plan(collection).champs, '', null);
}

/** Pages : un groupe par page, visible seulement pour cette page. */
function champsPages(): Champ[] {
  const out: Champ[] = [];
  for (const d of documents.filter((x) => x.collection === 'pages')) {
    const prefixe = PREFIXES[d.slug]!;
    const g = `page_${prefixe.replace(/_$/, '')}`;
    out.push(
      groupe(g, `Contenu : ${d.titre ?? d.slug}`, null, {
        options: { start: 'open' },
        conditions: [{ name: 'Autre page', rule: { slug: { _neq: d.slug } }, hidden: true }],
      }),
    );
    out.push(...champsDuPlan(plan('pages', d.slug).champs, prefixe, g));
  }
  return out;
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
          ...champsPages(),
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
    // --nettoyer : retire des collections de contenu les champs qui ne sont plus dans le modèle
    // (anciens champs JSON). Le contenu est ensuite réécrit par `npm run cms:seed -- --remplacer`.
    const CONTENU = ['settings', 'intervenants', 'conferences', 'publics', 'ressources', 'pages'];
    if (process.argv.includes('--nettoyer') && CONTENU.includes(def.collection)) {
      const attendus = new Set([
        ...def.fields.map((f) => f.field),
        'questions_faq',
        'sources_citees',
        'apercu', // adresse de la page pour l'aperçu (cms:apparence)
      ]);
      for (const f of [...champs].filter((x) => !attendus.has(x))) {
        await api('DELETE', `/fields/${def.collection}/${f}`);
        champs.delete(f);
        console.log(`- champ ${def.collection}.${f}`);
      }
    }
    for (const f of def.fields) {
      if (champs.has(f.field)) {
        if (f.field !== 'id')
          await api('PATCH', `/fields/${def.collection}/${f.field}`, {
            meta: f.meta,
            ...(f.type !== 'alias' ? { type: f.type } : {}),
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
      // Après le contenu de la page, dans le formulaire.
      await api('PATCH', `/fields/${collection}/${alias}`, {
        meta: { sort: enfant === 'faq' ? 9000 : 9001 },
      });
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
