// Contenus de la page Mentions légales (kit/maquette/Mentions-legales.dc.html).
// Aucune dénomination sociale tant que l'entité éditrice n'est pas tranchée (05, décision n° 6).
// Contenu à faire relire par un professionnel du droit avant la mise en ligne.
// Forme des sections : src/components/legal/types.ts.

import type { LegalSection } from '../../components/legal/types';

/** Pas de description : la maquette n'en prévoit pas pour cette page. */
export const seo = {
  title: 'Mentions légales | M42',
};

export const breadcrumb: { label: string; href?: string }[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Mentions légales' },
];

export const intro = {
  over: 'Informations légales',
  title: 'Mentions légales',
  lead: "Qui édite ce site, qui l'héberge, et ce que vous pouvez faire de son contenu.",
  updated: 'Dernière mise à jour : [À COMPLÉTER : date de mise en ligne]',
};

/** Encadré « À décider » sur l'entité éditrice. Ne nommer AUCUNE société ici tant que la décision n'est pas prise. */
export const decide = {
  over: '[À DÉCIDER] avant la mise en ligne',
  title: "La loi impose de nommer l'entité qui édite ce site",
  paragraphs: [
    "La loi pour la confiance dans l'économie numérique (LCEN, article 6) impose d'identifier clairement l'éditeur d'un site professionnel. Si une société édite le site ou facture les interventions qui y sont présentées, sa dénomination sociale, sa forme juridique, son capital, son siège, son immatriculation et son numéro de TVA doivent figurer ci-dessous, en clair. Si le site est édité par des entrepreneurs individuels, ce sont leurs nom, prénom, adresse et numéro SIREN [À VALIDER].",
    "Cette section ne peut pas rester vide : l'absence de ces mentions expose l'éditeur à des sanctions pénales. L'entité choisie peut rester absente du reste du site. Faire relire cette page par un professionnel du droit.",
  ],
};

/** Nom accessible du corps de page (sommaire + sections). */
export const proseLabel = 'Contenu des mentions légales';

export const sections: LegalSection[] = [
  {
    id: 'editeur',
    headingId: 't-editeur',
    title: 'Éditeur du site',
    blocks: [
      { type: 'p', html: 'Le site m42.guide est édité par :' },
      {
        type: 'dl',
        fixed: true,
        rows: [
          { term: 'Dénomination sociale', def: { text: '[À COMPLÉTER]' } },
          {
            term: 'Forme juridique',
            def: { text: '[À COMPLÉTER : SAS, SARL, entreprise individuelle…]' },
          },
          { term: 'Capital social', def: { text: '[À COMPLÉTER : montant]' } },
          { term: 'Siège social', def: { text: '[À COMPLÉTER : adresse complète]' } },
          {
            term: 'Immatriculation',
            def: { text: 'RCS [À COMPLÉTER : ville] n° [À COMPLÉTER] · SIREN [À COMPLÉTER]' },
          },
          { term: 'TVA intracommunautaire', def: { text: '[À COMPLÉTER]' } },
          { term: 'Nom commercial', def: { text: 'M42 [À VALIDER : dépôt de marque éventuel]' } },
          {
            term: 'Contact',
            def: {
              html: '<a class="legal-a" href="mailto:clara@m42.guide">clara@m42.guide</a> · <a class="legal-a" href="mailto:paul@m42.guide">paul@m42.guide</a> · [À COMPLÉTER : téléphone]',
            },
          },
          {
            term: 'Médiation de la consommation',
            def: {
              html: '[À VALIDER : mention obligatoire seulement si des prestations sont vendues à des particuliers]',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'directeur',
    headingId: 't-directeur',
    title: 'Directeur de la publication',
    blocks: [
      {
        type: 'p',
        html: '[À COMPLÉTER : prénom, nom et qualité]. Pour une société, le directeur de la publication est en principe son représentant légal.',
      },
    ],
  },
  {
    id: 'hebergeur',
    headingId: 't-hebergeur',
    title: 'Hébergeur',
    blocks: [
      {
        type: 'dl',
        fixed: true,
        rows: [
          {
            term: 'Hébergeur',
            def: {
              text: "[À COMPLÉTER : dénomination et forme juridique de l'hébergeur, OVH ou autre]",
            },
          },
          { term: 'Adresse', def: { text: "[À COMPLÉTER : adresse du siège de l'hébergeur]" } },
          { term: 'Téléphone', def: { text: '[À COMPLÉTER]' } },
          {
            term: "Lieu d'hébergement",
            def: {
              text: "[À COMPLÉTER : pays du centre de données, de préférence dans l'Union européenne]",
            },
          },
        ],
      },
    ],
  },
  {
    id: 'propriete',
    headingId: 't-propriete',
    title: 'Propriété intellectuelle',
    blocks: [
      {
        type: 'p',
        html: "L'ensemble du site est protégé par le droit d'auteur et, le cas échéant, par le droit des marques : textes, nom et symbole M42, mise en page, photographies et vidéos. Sauf mention contraire, ces éléments appartiennent à l'éditeur ou à leurs auteurs. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite (Code de la propriété intellectuelle, article L. 122-4).",
      },
      {
        type: 'p',
        html: 'Exception : les éléments de l\'<a class="legal-a" href="/organisateurs/">espace organisateurs</a> (biographies, photos, logos, texte d\'annonce, fiche technique) peuvent être reproduits librement pour annoncer ou présenter une intervention de M42, sans modification et avec le crédit photo indiqué.',
      },
      {
        type: 'p',
        html: 'Les chiffres et études cités sur le site restent la propriété de leurs auteurs. Ils sont toujours accompagnés de leur source.',
      },
    ],
  },
  {
    id: 'credits',
    headingId: 't-credits',
    title: 'Crédits',
    blocks: [
      {
        type: 'dl',
        fixed: true,
        rows: [
          { term: 'Conception et rédaction', def: { text: 'Clara Peron et Paul Loustaunau' } },
          { term: 'Photographies', def: { text: '[À COMPLÉTER : nom du photographe]' } },
          { term: 'Vidéo', def: { text: '[À COMPLÉTER : réalisation]' } },
          { term: 'Design et développement', def: { text: '[À COMPLÉTER]' } },
          {
            term: 'Polices de caractères',
            def: {
              text: 'Cormorant (Christian Thalmann) et Inter (Rasmus Andersson), sous licence SIL Open Font License 1.1',
            },
          },
          {
            term: 'Icônes',
            def: {
              text: '[À VALIDER : dessinées pour le site, ou bibliothèque Lucide sous licence ISC]',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'donnees',
    headingId: 't-donnees',
    title: 'Données personnelles',
    blocks: [
      {
        type: 'p',
        html: 'Le traitement des informations que vous nous transmettez par le formulaire de contact, et vos droits sur ces données, sont décrits dans notre <a class="legal-a" href="/confidentialite/">politique de confidentialité</a>.',
      },
    ],
  },
  {
    id: 'responsabilite',
    headingId: 't-resp',
    title: 'Liens et responsabilité',
    blocks: [
      {
        type: 'p',
        html: "Le site renvoie vers des sources officielles (par exemple Cybermalveillance.gouv.fr, l'Arcep ou la CNIL). L'éditeur n'a aucun contrôle sur ces sites et n'est pas responsable de leur contenu.",
      },
      {
        type: 'p',
        html: 'Les informations publiées sont vérifiées et datées. Elles peuvent toutefois évoluer : si vous repérez une erreur, écrivez-nous, nous la corrigerons.',
      },
    ],
  },
  {
    id: 'droit',
    headingId: 't-droit',
    title: 'Droit applicable',
    blocks: [
      { type: 'p', html: 'Les présentes mentions légales sont régies par le droit français.' },
    ],
  },
];
