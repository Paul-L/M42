// Satellite « guide » (kit/maquette/Sat-sensibiliser-equipes-ia.dc.html).
// Texte exact de la maquette, marqueurs [À …] conservés. Liens : URL de src/data/routes.ts.
//
// Toute la page tient dans l'objet `page` (sérialisable en JSON : un enregistrement Directus).

import { routes } from '../routes';
import type { SatLink, SatPage } from './types';

/** En-tête du guide : signature, date, temps de lecture et encadré « En bref ». */
export interface SensibiliserHero {
  eyebrow: string;
  title: string;
  lead: string;
  byline: {
    by: string;
    authors: SatLink;
    updated: string;
    dateModified: string | null;
    datePlaceholder: string;
    readingTime: string;
  };
  brief: { label: string; items: SatLink[] };
}

/** Pictogrammes de la règle des trois couleurs : la forme double la couleur. */
const shape = {
  vert: '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false"><circle cx="9" cy="9" r="7" fill="currentColor"></circle></svg>',
  orange:
    '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d="M9 2 L16.5 15.5 L1.5 15.5 Z" fill="currentColor"></path></svg>',
  rouge:
    '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false"><rect x="2.5" y="2.5" width="13" height="13" fill="currentColor"></rect></svg>',
};

export const page: SatPage<SensibiliserHero> = {
  seo: {
    path: routes['Sat-sensibiliser-equipes-ia.dc.html'],
    title: "Comment sensibiliser ses équipes à l'IA : méthode en 5 étapes",
    description:
      "Questionnaire, règles vert / orange / rouge, temps commun, ateliers par métier, suivi : une méthode concrète pour former vos équipes à l'IA.",
  },
  crumbs: [
    { label: 'Accueil', href: routes['Main.dc.html'] },
    { label: 'Entreprises', href: routes['Entreprises.dc.html'] },
    { label: "Guide : sensibiliser vos équipes à l'IA" },
  ],
  hero: {
    eyebrow: 'Guide pratique · Entreprises et organisations',
    title: "Comment sensibiliser vos équipes à l'IA ? Une méthode en 5 étapes",
    lead: "Pour sensibiliser une équipe à l'IA, il faut partir de ses usages réels, poser quelques règles claires, réunir tout le monde pour un temps commun, approfondir métier par métier, puis revenir sur le sujet six mois plus tard. Une seule conférence ne suffit pas. Une charte envoyée par courriel non plus.",
    byline: {
      by: 'Par',
      authors: { label: 'Clara Peron et Paul Loustaunau', href: routes['A-propos.dc.html'] },
      updated: 'Mis à jour le',
      /**
       * Date de mise à jour (AAAA-MM-JJ). Tant qu'elle n'est pas fixée (null), la page affiche
       * `datePlaceholder` et le JSON-LD n'a pas de `dateModified` (aucune date inventée).
       */
      dateModified: null,
      datePlaceholder: '[À COMPLÉTER : date]',
      readingTime: 'Lecture : 8 minutes',
    },
    brief: {
      label: 'En bref',
      items: [
        { href: '#etape-1', label: "Faire l'état des usages (questionnaire anonyme)." },
        { href: '#etape-2', label: 'Poser des règles en trois couleurs.' },
        { href: '#etape-3', label: 'Réunir tout le monde pour un temps commun.' },
        { href: '#etape-4', label: 'Approfondir par métier.' },
        { href: '#etape-5', label: 'Garder une trace et y revenir.' },
      ],
    },
  },
  toc: [
    { href: '#etape-1', label: '1. Partir des usages réels' },
    { href: '#etape-2', label: '2. Poser des règles en trois couleurs' },
    { href: '#etape-3', label: '3. Un temps commun pour tous' },
    { href: '#etape-4', label: '4. Approfondir par métier' },
    { href: '#etape-5', label: '5. Garder une trace et y revenir' },
    { href: '#erreurs', label: 'Les erreurs à éviter' },
    { href: '#public', label: 'Pour des habitants' },
    { href: '#faq', label: 'Questions fréquentes' },
  ],
  sections: [
    {
      id: 'etape-1',
      kind: 'step',
      title: 'Partir des usages réels',
      blocks: [
        {
          type: 'text',
          html: "Avant de parler de règles, sachez ce qui se pratique déjà. Les usages discrets d'outils personnels sont fréquents, et personne ne les déclare si la question est posée en réunion. Faites un questionnaire <strong>anonyme</strong>, de cinq questions :",
        },
        {
          type: 'box',
          label: "Questionnaire prêt à l'emploi",
          list: [
            "Utilisez-vous un outil d'IA dans votre travail ? Lequel, et sur quel compte (professionnel ou personnel) ?",
            'Pour quelles tâches ?',
            "Vous est-il arrivé d'y coller un document interne ou des données de client ou d'usager ?",
            'Vous est-il arrivé de repérer une erreur dans une réponse ?',
            "Qu'aimeriez-vous savoir faire, ou qu'est-ce qui vous inquiète ?",
          ],
        },
        {
          type: 'note',
          label: 'À retenir',
          text: 'Les réponses donnent le contenu de toutes les étapes suivantes.',
        },
      ],
    },
    {
      id: 'etape-2',
      kind: 'step',
      title: 'Poser des règles en trois couleurs',
      blocks: [
        {
          type: 'text',
          text: "Une règle qui tient sur une page est lue. Une charte de vingt pages ne l'est pas.",
        },
        {
          type: 'table',
          table: {
            caption: 'La règle des trois couleurs',
            columns: ['Couleur', "Ce que l'on peut confier à l'IA"],
            rows: [
              {
                head: `<span class="sat-level sat-level--vert">${shape.vert}Vert</span><span class="sat-level-sub">Autorisé</span>`,
                cells: [
                  "Reformuler un texte qu'on a écrit, résumer un document public, préparer un plan.",
                ],
              },
              {
                head: `<span class="sat-level sat-level--orange">${shape.orange}Orange</span><span class="sat-level-sub">Avec relecture</span>`,
                cells: [
                  'Un courriel à un client, une synthèse destinée à la direction, une traduction. <strong>Un humain relit et signe.</strong>',
                ],
              },
              {
                head: `<span class="sat-level sat-level--rouge">${shape.rouge}Rouge</span><span class="sat-level-sub">Interdit</span>`,
                cells: [
                  "Données personnelles, données de clients ou d'usagers, documents confidentiels dans un outil non validé par l'organisation ; toute action qui paie, envoie ou signe sans validation humaine.",
                ],
              },
            ],
          },
        },
        {
          type: 'text',
          text: "La DGSI recommande de fixer ces règles d'usage et de former les équipes, y compris dans les organisations qui n'ont pas encore adopté l'IA.",
        },
        {
          type: 'text',
          variant: 'source',
          text: 'Source : La Banque Postale, « IA, fraude et entreprise : la DGSI alerte », février 2026.',
        },
        {
          type: 'note',
          label: 'À retenir',
          text: 'Vert : on y va. Orange : un humain relit et signe. Rouge : jamais dans un outil non validé, jamais sans validation humaine.',
        },
      ],
    },
    {
      id: 'etape-3',
      kind: 'step',
      title: 'Un temps commun pour tous',
      blocks: [
        {
          type: 'text',
          text: "Entre 45 minutes et 1 h 30, avec toute l'équipe, direction comprise. Quatre messages suffisent :",
        },
        {
          type: 'numbered',
          items: [
            {
              title: 'Une IA prédit la suite la plus probable.',
              html: "Elle ne « sait » pas. D'où sa force, et ses erreurs.",
            },
            {
              title: 'Elle peut se tromper avec aplomb.',
              html: "Montrez-le en direct : rien ne remplace l'exemple vécu.",
            },
            {
              title: 'Les données ne reviennent pas.',
              html: "Ce qui est collé dans un outil non validé peut sortir de l'organisation.",
            },
            {
              title: "Les fraudeurs l'utilisent aussi.",
              html: 'Voix, visages et messages imités : une demande urgente de paiement se vérifie toujours par un autre canal.',
            },
          ],
        },
        {
          type: 'more',
          label: "Le temps commun en conférence : L'IA au quotidien",
          href: routes['Conf-ia-au-quotidien.dc.html'],
        },
      ],
    },
    {
      id: 'etape-4',
      kind: 'step',
      title: 'Approfondir par métier',
      blocks: [
        {
          type: 'text',
          text: "Les risques d'un service comptable ne sont pas ceux d'un accueil du public. Organisez des ateliers de 2 heures, par service, à 15 personnes au plus. Chaque groupe trie ses tâches réelles en trois colonnes (l'IA aide, l'IA fait courir un risque, cela reste humain) et repart avec ses cinq règles écrites.",
        },
        {
          type: 'sort',
          columns: [
            { level: 'vert', label: "L'IA aide" },
            { level: 'orange', label: "L'IA fait courir un risque" },
            { level: 'humain', label: 'Cela reste humain' },
          ],
          caption:
            "L'exercice de tri en atelier : chaque groupe range ses tâches réelles dans l'une des trois colonnes.",
        },
        {
          type: 'note',
          label: 'À retenir',
          text: 'Chaque groupe repart avec ses cinq règles écrites, tirées de ses propres tâches.',
        },
      ],
    },
    {
      id: 'etape-5',
      kind: 'step',
      title: 'Garder une trace et y revenir',
      blocks: [
        {
          type: 'text',
          text: "Notez ce qui a été fait : dates, programme, participants, règles adoptées. Le règlement européen sur l'IA (article 4) demande aux organisations qui utilisent des systèmes d'IA de prendre des mesures pour développer la maîtrise de l'IA de leur personnel. Il n'impose ni durée ni certification, mais il faut pouvoir montrer ce qui a été fait. Prévoyez un point six mois plus tard : les outils changent vite, les règles doivent suivre.",
        },
        {
          type: 'text',
          variant: 'source',
          text: "Source : Commission européenne, AI Act Service Desk, article 4. [À VÉRIFIER avant publication : texte consolidé de l'article 4 après le règlement (UE) 2026/1744.]",
        },
        {
          type: 'note',
          label: 'À retenir',
          text: 'Gardez une trace datée de ce qui a été fait, et prévoyez un point six mois plus tard.',
        },
      ],
    },
    {
      id: 'erreurs',
      eyebrow: 'À éviter',
      title: 'Les quatre erreurs les plus fréquentes',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: "Interdire sans proposer d'alternative.",
              text: "L'usage continue, mais en cachette.",
            },
            {
              title: 'Former une fois pour toutes.',
              text: 'Six mois plus tard, les outils ont changé.',
            },
            {
              title: 'Parler des outils plutôt que du jugement.',
              text: 'Les boutons changent, les réflexes restent.',
            },
            {
              title: 'Faire peur.',
              text: 'Une équipe inquiète se ferme. Une équipe qui comprend applique les règles.',
            },
          ],
        },
      ],
    },
    {
      id: 'public',
      eyebrow: 'Collectivités et associations',
      title: 'Et pour des habitants ou un public ?',
      blocks: [
        {
          type: 'text',
          html: `La méthode est la même, avec deux différences. On part des situations de vie (arnaques, démarches en ligne, devoirs des enfants), pas du travail. Et on privilégie l'atelier en petit groupe, avec une fiche à emporter : les règles non négociables et les bons numéros. Voir la page <a href="${routes['Collectivites.dc.html']}" class="sat-inline">Collectivités &amp; associations</a>.`,
        },
      ],
    },
    {
      id: 'faq',
      eyebrow: 'Questions fréquentes',
      title: 'Questions fréquentes',
      blocks: [
        {
          type: 'faq',
          items: [
            {
              question: "La formation des salariés à l'IA est-elle obligatoire ?",
              // Sources de l'article 4 encore [À VÉRIFIER avant publication] : hors FAQPage d'ici là.
              jsonLd: false,
              answer:
                "<p>Le règlement européen sur l'IA demande aux organisations qui utilisent l'IA de prendre des mesures pour développer la maîtrise de l'IA de leurs équipes. C'est une obligation de moyens : aucune durée, aucun diplôme ni aucune certification ne sont imposés. Il est utile de garder une trace datée des actions menées.</p>",
            },
            {
              question: 'Combien de temps faut-il prévoir ?',
              answer:
                '<p>Pour une équipe de taille moyenne : un questionnaire (une semaine), un temps commun (45 minutes à 1 h 30), des ateliers de 2 heures par service, puis un point six mois plus tard. Le tout tient en un trimestre.</p>',
            },
            {
              question: 'Faut-il faire appel à un intervenant extérieur ?',
              answer:
                '<p>Pas obligatoirement. Un regard extérieur aide surtout pour le temps commun : la démonstration en direct, la neutralité vis-à-vis des outils, et la parole plus libre des participants.</p>',
            },
          ],
        },
      ],
    },
    {
      id: 'plus-loin',
      eyebrow: 'Pour aller plus loin',
      title: 'Pages liées',
      blocks: [
        {
          type: 'links',
          items: [
            {
              label: 'Conférences et ateliers pour les entreprises',
              href: routes['Entreprises.dc.html'],
              description: 'Le temps commun et les ateliers par métier, en pratique.',
            },
            {
              label: 'Collectivités et associations',
              href: routes['Collectivites.dc.html'],
              description: 'La même démarche pour des agents, des habitants ou des bénévoles.',
            },
            {
              label: "L'IA au quotidien, la conférence signature",
              href: routes['Conf-ia-au-quotidien.dc.html'],
              description: 'Les quatre messages du temps commun, en conférence.',
            },
            {
              label: 'Une conférence IA pour votre séminaire',
              href: routes['Sat-seminaire-entreprise.dc.html'],
              description: "Lancer la démarche lors d'un séminaire ou d'une convention.",
            },
          ],
          note: "[À ACTIVER quand l'outil sera en ligne : lien « Recevoir le modèle de charte d'usage de l'IA » et fiche « 10 réflexes ».]",
        },
      ],
    },
  ],
  sources: {
    items: [
      'La Banque Postale, « IA, fraude et entreprise : la DGSI alerte », février 2026.',
      'Commission européenne, AI Act Service Desk, article 4.',
      "Journal du Net, « AI Act : l'article 4 réécrit », 2026. [À VÉRIFIER avant publication : texte consolidé de l'article 4 après le règlement (UE) 2026/1744.]",
    ],
    notes: [
      "[À VALIDER : « Rédigé avec l'aide d'un outil d'IA, relu et vérifié par Clara Peron et Paul Loustaunau. »]",
    ],
  },
  cta: {
    eyebrow: "Passer à l'action",
    title: 'Vous voulez lancer la démarche dans votre organisation ?',
    lead: 'Temps commun, ateliers par métier, écriture de vos règles : nous pouvons les animer avec vous. Proposition sous 48 h.',
    note: "[À ACTIVER : lien secondaire « Recevoir le modèle de charte d'usage de l'IA », quand l'outil sera en ligne]",
    primary: { label: 'Demander une proposition', href: routes['Contact.dc.html'] },
    secondary: { label: "Voir l'offre Entreprises", href: routes['Entreprises.dc.html'] },
  },
};
