// Contenus de la page Politique de confidentialité (kit/maquette/Confidentialite.dc.html).
// Forme des sections : src/components/legal/types.ts.

import type { LegalSection } from '../../components/legal/types';

export const seo = {
  title: 'Politique de confidentialité | M42',
  description:
    'Comment M42 traite les données transmises via le formulaire de contact : finalité, durée de conservation, destinataires et vos droits.',
};

export const breadcrumb: { label: string; href?: string }[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Confidentialité' },
];

export const intro = {
  over: 'Vos données personnelles',
  title: 'Politique de confidentialité',
  lead: 'Quelles données nous recueillons sur m42.guide, pourquoi, combien de temps, et comment exercer vos droits. Conformément au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.',
  updated: 'Dernière mise à jour : [À COMPLÉTER : date de mise en ligne]',
};

/** Encadré « En bref » (texte brut). */
export const enBref = {
  title: 'En bref',
  items: [
    'Nous recueillons seulement ce qui sert à répondre à votre demande.',
    "Vos données sont lues par Clara Peron et Paul Loustaunau, et par personne d'autre.",
    'Elles ne sont jamais vendues, louées ni cédées.',
    "Ce site n'utilise aucun cookie publicitaire ni traceur soumis à consentement [À DÉCIDER, voir section 10].",
    'Vous pouvez à tout moment accéder à vos données, les corriger ou les faire supprimer.',
  ],
};

/** Nom accessible du corps de page (sommaire + sections). */
export const proseLabel = 'Contenu de la politique de confidentialité';

export const sections: LegalSection[] = [
  {
    id: 'responsable',
    headingId: 't-resp',
    title: 'Responsable du traitement',
    blocks: [
      {
        type: 'dl',
        fixed: true,
        rows: [
          {
            term: 'Responsable',
            def: {
              html: '[À COMPLÉTER : même entité que l\'éditeur désigné dans les <a href="/mentions-legales/" class="legal-a">mentions légales</a> : dénomination, adresse]',
            },
          },
          {
            term: 'Contact pour vos données',
            def: {
              html: '[À DÉCIDER : adresse dédiée en @m42.guide] · à défaut : <a href="mailto:clara@m42.guide" class="legal-a">clara@m42.guide</a> ou <a href="mailto:paul@m42.guide" class="legal-a">paul@m42.guide</a>',
            },
          },
          {
            term: 'Délégué à la protection des données',
            def: {
              html: "Aucun délégué n'a été désigné, cette désignation n'étant pas obligatoire pour notre activité [À VALIDER].",
            },
          },
        ],
      },
    ],
  },
  {
    id: 'donnees',
    headingId: 't-donnees',
    title: 'Données recueillies',
    blocks: [
      { type: 'h3', text: 'Par le formulaire de contact' },
      {
        type: 'p',
        html: 'Obligatoires : nom et prénom, structure, adresse e-mail, type de structure. Utiles pour préparer notre réponse : thème, format, date ou période, ville, nombre de participants. Facultatives : téléphone, budget indicatif, message libre.',
      },
      {
        type: 'p',
        html: "Merci de ne pas indiquer dans le message d'informations sensibles (santé, opinions, situation personnelle) : elles ne nous sont pas utiles.",
      },
      { type: 'h3', text: 'Lors de votre visite', spaced: true },
      {
        type: 'p',
        html: 'Comme tout serveur web, le nôtre enregistre des journaux techniques (adresse IP, date et heure, page demandée, navigateur) pour assurer la sécurité et le bon fonctionnement du site. Nous ne les utilisons pas pour vous identifier ni pour vous suivre.',
      },
    ],
  },
  {
    id: 'finalites',
    headingId: 't-finalites',
    title: 'Finalités et bases légales',
    blocks: [
      {
        type: 'p',
        html: "Chaque usage de vos données repose sur une base légale prévue par l'article 6 du RGPD.",
      },
      {
        type: 'dl',
        rows: [
          {
            term: 'Répondre à votre demande, préparer et vous envoyer un devis',
            def: { text: 'Mesures précontractuelles prises à votre demande (article 6.1.b)' },
          },
          {
            term: "Organiser et réaliser l'intervention, puis la facturer",
            def: {
              text: 'Exécution du contrat (article 6.1.b) et obligations comptables (article 6.1.c)',
            },
          },
          {
            term: "Vous recontacter au sujet d'une intervention passée ou à venir",
            def: {
              text: 'Intérêt légitime (article 6.1.f) ; vous pouvez vous y opposer à tout moment',
            },
          },
          {
            term: "Vous envoyer notre lettre d'information, si elle existe",
            def: { text: 'Votre consentement (article 6.1.a), retirable à tout moment' },
          },
          {
            term: 'Assurer la sécurité du site (journaux techniques, anti-spam)',
            def: { text: 'Intérêt légitime (article 6.1.f)' },
          },
        ],
      },
      {
        type: 'p',
        html: 'Nous ne faisons aucun profilage et aucune décision automatisée à partir de vos données.',
      },
    ],
  },
  {
    id: 'durees',
    headingId: 't-durees',
    title: 'Durées de conservation',
    blocks: [
      {
        type: 'note',
        html: 'Durées proposées, conformes aux recommandations de la CNIL [À VALIDER].',
      },
      {
        type: 'dl',
        rows: [
          {
            term: 'Demande restée sans suite',
            def: { text: '3 ans à compter de notre dernier échange, puis suppression' },
          },
          {
            term: 'Client (intervention réalisée)',
            def: {
              text: 'Pendant la relation, puis 3 ans après la dernière intervention. Factures et pièces comptables : 10 ans (obligation légale, Code de commerce, article L. 123-22)',
            },
          },
          {
            term: "Lettre d'information",
            def: {
              text: "Jusqu'à votre désinscription, et au plus 3 ans sans aucune ouverture [À VALIDER]",
            },
          },
          { term: 'Journaux techniques du serveur', def: { text: '6 mois [À VALIDER]' } },
          {
            term: "Mesure d'audience, si elle est mise en place",
            def: { text: '25 mois au plus pour les données, 13 mois au plus pour les traceurs' },
          },
        ],
      },
    ],
  },
  {
    id: 'destinataires',
    headingId: 't-dest',
    title: 'Destinataires',
    blocks: [
      {
        type: 'p',
        html: 'Vos données sont lues uniquement par Clara Peron et Paul Loustaunau. Elles ne sont jamais vendues, louées ni cédées à des tiers, et ne servent à aucune publicité.',
      },
      {
        type: 'p',
        html: 'Nos prestataires techniques y ont accès dans la stricte limite de leur mission, en qualité de sous-traitants liés par contrat :',
      },
      {
        type: 'ul',
        items: [
          { html: 'hébergement du site : [À COMPLÉTER : hébergeur, voir les mentions légales] ;' },
          {
            html: 'messagerie électronique des adresses @m42.guide : [À COMPLÉTER : fournisseur] ;',
          },
          { html: "envoi de la lettre d'information, si elle existe : [À DÉCIDER : outil]." },
        ],
      },
    ],
  },
  {
    id: 'stockage',
    headingId: 't-stock',
    title: 'Stockage et sécurité',
    blocks: [
      {
        type: 'p',
        html: "Vos données sont stockées dans l'Union européenne [À VALIDER selon les prestataires retenus]. Aucun transfert hors de l'Union n'est prévu. Si un prestataire devait en effectuer un, il serait encadré par les garanties prévues par le RGPD, et cette page serait mise à jour.",
      },
      {
        type: 'p',
        html: "Le site est servi en HTTPS. L'accès aux demandes reçues est réservé à Clara Peron et Paul Loustaunau. Le formulaire est protégé contre les envois automatiques sans outil tiers de type reCAPTCHA.",
      },
    ],
  },
  {
    id: 'droits',
    headingId: 't-droits',
    title: 'Vos droits',
    blocks: [
      { type: 'p', html: 'Vous pouvez à tout moment :' },
      {
        type: 'ul',
        items: [
          { text: 'accéder à vos données et en obtenir une copie ;' },
          { text: 'les faire rectifier ou compléter ;' },
          { text: 'les faire effacer ;' },
          { text: 'demander la limitation de leur traitement ;' },
          { text: 'vous opposer à leur traitement fondé sur notre intérêt légitime ;' },
          { text: "retirer votre consentement, par exemple à la lettre d'information ;" },
          {
            text: 'recevoir les données que vous nous avez fournies dans un format lisible (portabilité) ;',
          },
          { text: 'définir des directives sur le sort de vos données après votre décès.' },
        ],
      },
      {
        type: 'p',
        html: 'Pour exercer ces droits, écrivez à [À DÉCIDER : adresse dédiée] ou à <a href="mailto:clara@m42.guide" class="legal-a">clara@m42.guide</a>. Nous répondons dans un délai d\'un mois, prolongeable de deux mois si la demande est complexe ; nous vous prévenons alors. Une pièce d\'identité ne vous sera demandée qu\'en cas de doute raisonnable sur votre identité.',
      },
    ],
  },
  {
    id: 'cnil',
    headingId: 't-cnil',
    title: 'Réclamation auprès de la CNIL',
    blocks: [
      {
        type: 'p',
        html: "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la Commission nationale de l'informatique et des libertés (CNIL) :",
      },
      {
        type: 'address',
        address: 'CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07',
        link: {
          href: 'https://www.cnil.fr/fr/plaintes',
          label: 'Déposer une plainte en ligne sur cnil.fr',
        },
      },
    ],
  },
  {
    id: 'lettre',
    headingId: 't-lettre',
    title: "Lettre d'information",
    blocks: [
      {
        type: 'aside',
        label: "Point à décider : lettre d'information",
        title: "[À DÉCIDER] Lancer une lettre d'information ?",
        paragraphs: [
          "Si oui, garder ce texte et préciser l'outil d'envoi (section 5). Sinon, supprimer cette section et les mentions de la lettre dans les sections 3 et 4.",
        ],
      },
      {
        type: 'p',
        html: "L'inscription se fait uniquement avec votre accord explicite, par une case à cocher non précochée, et elle est confirmée par un e-mail. Chaque envoi comporte un lien de désinscription en un clic. Nous ne recueillons que votre adresse e-mail et, si vous le souhaitez, votre prénom.",
      },
    ],
  },
  {
    id: 'cookies',
    headingId: 't-cookies',
    title: 'Cookies et traceurs',
    blocks: [
      {
        type: 'p',
        html: "Ce site n'utilise aucun cookie publicitaire, aucun pixel de réseau social et aucun traceur soumis à votre consentement. C'est pourquoi aucun bandeau ne vous demande d'accepter des cookies. Seuls peuvent être utilisés des cookies strictement nécessaires au fonctionnement du site, qui n'exigent pas de consentement.",
      },
      {
        type: 'p',
        html: "Les polices de caractères sont hébergées sur notre propre serveur : votre visite ne transmet aucune donnée à un service de polices tiers [À VALIDER à l'intégration].",
      },
      {
        type: 'aside',
        label: "Point à décider : mesure d'audience et vidéo",
        title: "[À DÉCIDER] Mesure d'audience et vidéo",
        paragraphs: [
          '<strong>Choix recommandé : aucun cookie non essentiel.</strong> Le texte ci-dessus reste alors valable tel quel.',
          "Si une mesure d'audience est retenue, la configurer pour être exemptée de consentement selon les conditions de la CNIL (par exemple un outil auto-hébergé, données anonymisées, sans recoupement), puis décrire ici l'outil, les données et la durée (section 4). Tout autre outil impose un bandeau de consentement.",
          "Si la vidéo de présentation est hébergée sur une plateforme tierce, ne la charger qu'au clic, en mode « confidentialité renforcée », et indiquer ici que la plateforme peut alors déposer ses propres traceurs.",
        ],
      },
    ],
  },
  {
    id: 'modifications',
    headingId: 't-modif',
    title: 'Modifications',
    blocks: [
      {
        type: 'p',
        html: 'Nous mettons cette page à jour si nos pratiques changent. La date de dernière mise à jour figure en haut de page. Une question ? <a href="/contact/" class="legal-a">Écrivez-nous</a>.',
      },
    ],
  },
];
