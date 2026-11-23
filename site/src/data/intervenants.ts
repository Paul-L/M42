// Intervenants (kit/maquette/A-propos.dc.html, section « Le duo »).
// Structure prête pour la collection Directus `intervenants` (phase 3) :
// bio courte (`accroche`), bio longue (`bioLongue`), photo, liens.
// Ordre : Clara toujours avant Paul (`ordre`).
// Aucune information ajoutée : texte exact de la maquette, marqueurs [À …] conservés.
// Paul : formulation de repli tant que l'accord écrit de l'employeur n'est pas obtenu
// (11_architecture_seo.md, § 3.3). Ne jamais nommer l'employeur, ni ici ni dans le JSON-LD.

import type { ImageMetadata } from 'astro';

const SITE = 'https://m42.guide';

export interface IntervenantPhoto {
  /** Texte de l'emplacement tant que la photo n'existe pas (format 4:5). */
  placeholder: string;
  image?: ImageMetadata;
  alt?: string;
  credit: string;
}

export interface IntervenantLigne {
  label: string;
  value: string;
}

export interface Intervenant {
  /** Ancre stable de /a-propos/ et fragment des @id schema.org. */
  slug: 'clara-peron' | 'paul-loustaunau';
  ordre: number;
  nom: string;
  prenom: string;
  /** Sur-titre de la fiche (« Conférencière · pédagogie »). */
  role: string;
  /** Bio courte : ligne sous le nom. */
  accroche: string;
  /** Bio longue : paragraphes. */
  bioLongue: string[];
  photo: IntervenantPhoto;
  surScene: string;
  email: string;
  /** URL du profil LinkedIn ; tant qu'elle manque, texte du marqueur [À COMPLÉTER]. */
  linkedin: { url?: string; placeholder: string };
  /** Données structurées (Person). */
  schema: {
    jobTitle: string;
    description?: string;
    image: string;
    knowsAbout: string[];
    sameAs: string[];
  };
}

const liste: Intervenant[] = [
  {
    slug: 'clara-peron',
    ordre: 1,
    nom: 'Clara Peron',
    prenom: 'Clara',
    role: 'Conférencière · pédagogie',
    accroche: "Conseillère en insertion professionnelle et formatrice d'adultes",
    bioLongue: [
      "Clara Peron est conseillère en insertion professionnelle et formatrice d'adultes [À COMPLÉTER : nombre d'années d'expérience, types de structures]. Au quotidien, elle accompagne des personnes en période de changement : reprise d'emploi, reconversion, nouveaux outils. Elle sait écouter, rassurer et transmettre, y compris à des publics qui n'ont pas choisi d'être là.",
      "Chez M42, elle conçoit la pédagogie des interventions : le déroulé, les jeux, les temps d'échange, les supports que chacun emporte. Son rôle est simple : que personne ne décroche, et que chacun reparte en sachant quoi faire. Elle apporte aussi un regard précieux sur l'IA : celui des personnes qui la découvrent sans l'avoir choisie. Avec elle, une conférence sur l'IA devient un moment d'échange, où chacun ose poser ses questions, même les plus simples.",
      '[À COMPLÉTER : formation, certification de formatrice éventuelle]',
    ],
    photo: {
      placeholder:
        '[Photo : portrait de Clara Peron, lumière naturelle de côté, fond uni papier, cadrage poitrine, regard caméra, 4:5]',
      credit: 'Crédit photo : [À COMPLÉTER]',
    },
    surScene: "La pédagogie, les jeux avec la salle, le passage à l'action",
    email: 'clara@m42.guide',
    linkedin: {
      placeholder:
        '[À COMPLÉTER : lien vers le profil de Clara, même titre et même baseline que sur le site]',
    },
    schema: {
      jobTitle: "Conférencière, formatrice d'adultes et conseillère en insertion professionnelle",
      image: `${SITE}/img/clara-peron.jpg`,
      knowsAbout: ['pédagogie pour adultes', 'accompagnement du changement', "usages de l'IA"],
      sameAs: ['[À COMPLÉTER : LinkedIn de Clara]'],
    },
  },
  {
    slug: 'paul-loustaunau',
    ordre: 2,
    nom: 'Paul Loustaunau',
    prenom: 'Paul',
    role: 'Conférencier · technique',
    accroche:
      "17 ans de développement logiciel. Conçoit et déploie des systèmes d'IA en entreprise. [À VALIDER]",
    bioLongue: [
      "Paul Loustaunau développe des logiciels depuis 17 ans. Il conçoit et déploie aujourd'hui des systèmes d'IA en entreprise [À VALIDER], notamment des agents autonomes, ces programmes capables d'agir seuls. Il travaille avec les méthodes des équipes professionnelles : faire relire chaque résultat, poser des règles fixes, ne donner que les accès nécessaires, garder une trace de tout.",
      "Chez M42, il traduit ces méthodes en réflexes simples, utiles à tous. Il fait des démonstrations en direct, montre ce que l'IA réussit et ce qu'elle invente, sans promesse ni alarmisme. Il sait aussi parler aux dirigeants comme aux équipes techniques, et adapter le niveau à chaque salle. Son principe : on réfléchit d'abord, l'IA ensuite.",
      '[À COMPLÉTER : interventions passées, publications, formation]',
    ],
    photo: {
      placeholder:
        '[Photo : portrait de Paul Loustaunau, lumière naturelle de côté, fond uni papier, cadrage poitrine, de trois quarts, 4:5]',
      credit: 'Crédit photo : [À COMPLÉTER]',
    },
    surScene: 'Les démonstrations en direct, les méthodes des équipes professionnelles',
    email: 'paul@m42.guide',
    linkedin: {
      placeholder:
        '[À COMPLÉTER : lien vers le profil de Paul, même titre et même baseline que sur le site]',
    },
    schema: {
      jobTitle: 'Conférencier, expert en intelligence artificielle et agents IA',
      description:
        "17 ans de développement logiciel. Conçoit et déploie des systèmes d'IA en entreprise.",
      image: `${SITE}/img/paul-loustaunau.jpg`,
      knowsAbout: [
        'intelligence artificielle',
        'agents IA',
        'IA générative',
        'développement logiciel',
      ],
      sameAs: ['[À COMPLÉTER : LinkedIn de Paul]'],
    },
  },
];

/** Toujours triés : Clara, puis Paul. */
export const intervenants: Intervenant[] = [...liste].sort((a, b) => a.ordre - b.ordre);

/** @id stable d'un intervenant (repris par l'accueil et les pages thème). */
export const personId = (slug: Intervenant['slug']): string => `${SITE}/a-propos/#${slug}`;

/**
 * Nœud schema.org Person. Jamais de `worksFor` ni de nom d'employeur :
 * seul `memberOf` renvoie vers l'organisation M42.
 */
export function personSchema(i: Intervenant): Record<string, unknown> {
  return {
    '@type': 'Person',
    '@id': personId(i.slug),
    name: i.nom,
    jobTitle: i.schema.jobTitle,
    ...(i.schema.description ? { description: i.schema.description } : {}),
    url: personId(i.slug),
    // Photo publiée seulement quand elle existe (sinon URL morte dans les données structurées).
    ...(i.photo.image ? { image: i.schema.image } : {}),
    memberOf: { '@id': `${SITE}/#organisation` },
    knowsAbout: i.schema.knowsAbout,
    knowsLanguage: 'fr',
    // Pas de marqueur [À …] dans le JSON-LD : sameAs seulement avec une vraie URL (le marqueur reste visible dans la page).
    ...(i.linkedin.url ? { sameAs: [i.linkedin.url] } : {}),
  };
}
