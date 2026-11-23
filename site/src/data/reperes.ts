// Contenus de la page Repères (kit/maquette/Reperes.dc.html) : bibliothèque des repères et filtres.
// Forme prévue pour la collection Directus `ressources` (phase 3) : un enregistrement par repère,
// avec type, publics, statut (disponible / bientôt) et lien.
//
// [À DÉCIDER] 12_growth_satellites 4.8 dit « pas de « bientôt » en ligne ». Les cartes « Bientôt »
// sont là pour la relecture : les masquer à la mise en ligne (AFFICHER_BIENTOT = false),
// ou les garder sans date annoncée.

import { routes } from './routes';

/** Publics des filtres (clés de la maquette). */
export type RepereAudience = 'vous' | 'equipes' | 'habitants' | 'eleves';

/** Filtre actif : un public, ou « tous ». */
export type RepereFilter = 'tous' | RepereAudience;

export type RepereStatus = 'disponible' | 'bientot';

export interface Repere {
  /** Identifiant stable (futur slug Directus). */
  id: string;
  /** Sur-titre de la carte : nature et durée (« Test · 5 minutes »). */
  type: string;
  titre: string;
  description: string;
  publics: RepereAudience[];
  statut: RepereStatus;
  /** Lien de la ressource (repères disponibles uniquement). */
  href?: string;
  /** Libellé de l'appel à l'action de la carte (repères disponibles uniquement). */
  cta?: string;
}

/** Affiche le bloc « En préparation » (voir le [À DÉCIDER] en tête de fichier). */
export const AFFICHER_BIENTOT = true;

/** Boutons de filtre, dans l'ordre de la maquette. */
export const repereFilters: { key: RepereFilter; label: string }[] = [
  { key: 'tous', label: 'Tous les repères' },
  { key: 'vous', label: 'Pour vous' },
  { key: 'equipes', label: 'Pour vos équipes' },
  { key: 'habitants', label: 'Pour vos habitants' },
  { key: 'eleves', label: 'Pour vos élèves' },
];

const AUDIENCE_WORDS: Record<RepereAudience, string> = {
  vous: 'vous',
  equipes: 'vos équipes',
  habitants: 'vos habitants',
  eleves: 'vos élèves',
};

/** Ligne « Pour vous, vos équipes et vos habitants » d'une carte. */
export function pourLabel(publics: RepereAudience[]): string {
  const w = publics.map((a) => AUDIENCE_WORDS[a]);
  if (w.length === 1) return `Pour ${w[0]}`;
  return `Pour ${w.slice(0, -1).join(', ')} et ${w[w.length - 1]}`;
}

/** Un repère correspond-il au filtre ? */
export function matchesFilter(publics: readonly string[], filter: RepereFilter): boolean {
  return filter === 'tous' || publics.includes(filter);
}

/** Phrase annoncée sous les filtres (« Tous les repères : 4 repères disponibles, 6 en préparation. »). */
export function resumeLabel(filter: RepereFilter, disponibles: number, bientot: number): string {
  const nom = repereFilters.find((f) => f.key === filter)?.label ?? '';
  const n = disponibles > 1 ? ' repères disponibles' : ' repère disponible';
  return `${nom} : ${disponibles}${n}, ${bientot} en préparation.`;
}

export const reperes: Repere[] = [
  {
    id: 'arnaque-ou-pas',
    type: 'Test · 5 minutes',
    titre: 'Arnaque ou pas ?',
    description:
      "Huit situations du quotidien : SMS, appels, messages. Pour chacune, la bonne réponse, l'indice qui trahit l'arnaque et la règle à retenir. Sans inscription.",
    publics: ['vous', 'equipes', 'habitants'],
    statut: 'disponible',
    href: routes['Sat-test-arnaque-ou-pas.dc.html'],
    cta: 'Faire le test',
  },
  {
    id: 'sensibiliser-equipes-ia',
    type: 'Guide · 8 minutes',
    titre: "Sensibiliser ses équipes à l'IA en 5 étapes",
    description:
      "Partir des usages réels, poser des règles vert, orange, rouge, réunir tout le monde, approfondir par métier, y revenir six mois plus tard. Avec un questionnaire prêt à l'emploi.",
    publics: ['equipes', 'habitants'],
    statut: 'disponible',
    href: routes['Sat-sensibiliser-equipes-ia.dc.html'],
    cta: 'Lire le guide',
  },
  {
    id: 'vrai-ou-faux-methode',
    type: 'Méthode · 4 étapes',
    titre: 'Vrai ou faux ? Vérifier une image ou une info',
    description:
      'La méthode simple pour ne plus se faire avoir par une fausse image, une fausse vidéo ou un faux site, directement sur son téléphone.',
    publics: ['vous', 'habitants', 'eleves'],
    statut: 'disponible',
    href: routes['Conf-desinformation-ia.dc.html'],
    cta: 'Découvrir la méthode',
  },
  {
    id: 'cinq-questions-conferencier',
    type: 'Liste · 5 questions',
    titre: 'Cinq questions pour choisir un conférencier IA',
    description:
      "Montre-t-il l'IA en direct ? Ses chiffres sont-ils sourcés ? Vend-il un outil ? Les questions à poser à tout intervenant, avant de signer.",
    publics: ['equipes'],
    statut: 'disponible',
    // La maquette pointe vers la page séminaire, section « cinq-questions » (note de production).
    href: `${routes['Sat-seminaire-entreprise.dc.html']}#cinq-questions`,
    cta: 'Lire les 5 questions',
  },
  {
    id: '10-reflexes-ia',
    type: 'Fiche à imprimer · 1 page',
    titre: "Les 10 réflexes face à l'IA",
    description:
      "Dix réflexes pour utiliser l'IA au quotidien sans s'y perdre, à afficher au bureau, en classe ou près de l'ordinateur.",
    publics: ['vous', 'equipes', 'habitants', 'eleves'],
    statut: 'bientot',
  },
  {
    id: 'charte-usage-ia',
    type: 'Modèle commenté',
    titre: "Modèle de charte d'usage de l'IA",
    description:
      'Une trame à adapter à une PME, un cabinet ou une collectivité, avec les règles vert, orange, rouge. Un point de départ, pas un conseil juridique.',
    publics: ['equipes'],
    statut: 'bientot',
  },
  {
    id: 'charte-numerique-famille',
    type: 'Modèle à remplir',
    titre: 'La charte numérique de la famille',
    description:
      'Écrans, réseaux, IA : des règles à fixer ensemble, parents et enfants, et à afficher à la maison.',
    publics: ['vous', 'eleves'],
    statut: 'bientot',
  },
  {
    id: 'fiche-bons-numeros',
    type: 'Fiche à imprimer',
    titre: 'La fiche des bons numéros',
    description:
      'Signaler un SMS frauduleux, se faire aider, faire opposition : les numéros utiles en gros caractères, à garder près du téléphone.',
    publics: ['vous', 'habitants'],
    statut: 'bientot',
  },
  {
    id: 'vrai-ou-ia',
    type: 'Quiz',
    titre: 'Vrai ou IA ?',
    description:
      "Des images, des voix et des articles à classer : authentiques ou générés par IA ? Uniquement des contenus créés pour l'occasion, sans aucun sujet politique.",
    publics: ['vous', 'habitants', 'eleves'],
    statut: 'bientot',
  },
  {
    id: 'seniors-arnaques-commune',
    type: 'Guide',
    titre: 'Protéger les seniors des arnaques dans sa commune',
    description:
      'Monter une action locale avec un CCAS, une médiathèque ou une association, et les financements possibles.',
    publics: ['habitants'],
    statut: 'bientot',
  },
];

export const reperesDisponibles = reperes.filter((r) => r.statut === 'disponible');
export const reperesBientot = AFFICHER_BIENTOT ? reperes.filter((r) => r.statut === 'bientot') : [];

/** Profils de la lettre mensuelle (« Vous êtes », facultatif). */
export const lettreProfils: { value: string; label: string }[] = [
  { value: 'particulier', label: 'Un particulier' },
  { value: 'entreprise', label: 'Une entreprise' },
  { value: 'collectivite', label: 'Une collectivité' },
  { value: 'etablissement', label: 'Un établissement scolaire' },
  { value: 'association', label: 'Une association' },
];
