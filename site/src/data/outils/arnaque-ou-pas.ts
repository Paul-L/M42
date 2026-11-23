// Satellite « outil » : le test « Arnaque ou pas ? » (kit/maquette/Sat-test-arnaque-ou-pas.dc.html).
// Texte exact de la maquette, marqueurs [À …] conservés. Liens : URL de src/data/routes.ts.
// Les 8 situations, les verdicts et les textes de résultat viennent de la classe Component
// de la maquette (_situations(), renderVals()).
//
// NOTES DE PRODUCTION DE LA MAQUETTE, NE PAS PUBLIER (12_growth_satellites, 3.d) :
// - Le kit de diffusion et la fiche imprimable doivent EXISTER avant la mise en ligne des blocs de capture.
// - Pas de pixel de suivi publicitaire sans consentement. Un simple compteur de complétions anonyme suffit.
// - Relire les 8 situations tous les 6 mois : les scénarios évoluent vite.
// - La lettre est une case séparée, non cochée, jamais une condition pour recevoir la fiche ou le kit.
// - Maquette : les boutons n'envoient rien ; en production, <form method="post"> + page de confirmation.
//   Liens « fraude au président » et « 10 réflexes » à ajouter dès leur publication.
//
// Toute la page tient dans l'objet `page` (sérialisable en JSON : un enregistrement Directus).

import { routes } from '../routes';
import type {
  Crumb,
  FaqItem,
  SatCtaData,
  SatLink,
  SatRelatedLink,
  SatSeo,
} from '../satellites/types';

/** Une situation du test. `scam` : la bonne réponse est « Arnaque ». */
export interface Situation {
  titre: string;
  canal: string;
  ctx: string;
  /** Message cité (vide : pas de citation). */
  msg: string;
  scam: boolean;
  /** Réponse affichée après le verdict (« C'est une arnaque. »…). */
  answer: string;
  explain: string;
  ruleLabel: string;
  rule: string;
}

/** Libellés de l'îlot du test (renderVals() de la maquette). {n}, {total}, {score}, {answered} remplacés. */
export interface TestLabels {
  heading: string;
  tally: string;
  counter: string;
  scam: string;
  legit: string;
  right: string;
  wrong: string;
  next: string;
  last: string;
  resultEyebrow: string;
  resultScore: string;
  missedTitle: string;
  restart: string;
  rulesLink: string;
  note: string;
}

interface TestResult {
  titre: string;
  texte: string;
}

/** Textes de l'écran de fin, selon le score (renderVals() de la maquette). */
export interface TestResults {
  perfect: TestResult;
  /** À partir de `good.min` bonnes réponses (et moins que le total). */
  good: TestResult & { min: number };
  low: TestResult;
}

/** Champ d'un formulaire de capture : libellé (avec « * ») et message d'erreur de la maquette. */
export interface CaptureFieldText {
  label: string;
  error: string;
}

/** Libellés communs aux deux blocs de capture (case lettre, confirmation, mention RGPD). */
export interface CaptureTexts {
  requiredNote: string;
  letter: string;
  optional: string;
  done: string;
  doneNote: string;
  back: string;
  responsible: string;
  privacy: SatLink;
}

interface CaptureBlock {
  eyebrow: string;
  title: string;
  formLabel: string;
  submit: string;
  usage: string;
}

/** Page « Arnaque ou pas ? » complète. */
export interface ArnaqueOuPasPage {
  seo: SatSeo;
  crumbs: Crumb[];
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    source: string;
    /** « Conçu et animé en salle par » + lien vers les auteurs. */
    byline: { prefix: string; authors: SatLink };
  };
  test: { situations: Situation[]; labels: TestLabels; results: TestResults };
  rules: { eyebrow: string; title: string; lead: string; items: string[] };
  numbers: {
    eyebrow: string;
    title: string;
    items: { value: string; gold: boolean; text: string }[];
    happened: { title: string; text: string };
  };
  capture: CaptureTexts & {
    eyebrow: string;
    title: string;
    fiche: CaptureBlock & { text: string; fields: { mail: CaptureFieldText } };
    kit: CaptureBlock & {
      /** HTML simple (gras de la maquette). */
      html: string;
      types: string[];
      fields: {
        nom: CaptureFieldText;
        structure: CaptureFieldText;
        type: CaptureFieldText;
        mail: CaptureFieldText;
      };
      more: { html: string; link: SatLink };
    };
  };
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  related: { eyebrow: string; items: SatRelatedLink[] };
  sources: { title: string; items: string[] };
  cta: SatCtaData;
}

const A = "C'est une arnaque.";
const F = "Ce n'est pas une arnaque.";
const R = 'Règle';

export const page: ArnaqueOuPasPage = {
  seo: {
    path: routes['Sat-test-arnaque-ou-pas.dc.html'],
    title: 'Arnaque ou pas ? Le test gratuit en 8 situations | M42.guide',
    description:
      "SMS, appels, messages : saurez-vous repérer l'arnaque ? 8 situations, la réponse expliquée, les bons réflexes et les bons numéros. Gratuit, sans inscription.",
  },
  crumbs: [
    { label: 'Accueil', href: routes['Main.dc.html'] },
    { label: 'Conférences', href: routes['Conferences.dc.html'] },
    { label: 'Arnaques et IA', href: routes['Conf-arnaques-ia.dc.html'] },
    { label: 'Le test « Arnaque ou pas ? »' },
  ],
  hero: {
    eyebrow: 'Outil gratuit · Sans inscription',
    title: 'Arnaque ou pas ? Testez vos réflexes en 8 situations',
    lead: "Les escrocs imitent de mieux en mieux : un numéro qui s'affiche, une voix familière, un message sans faute. En 2025, Cybermalveillance.gouv.fr a reçu plus de 500 000 demandes d'assistance, et les demandes liées à l'usurpation de numéro ont augmenté de 517 %. Ce test prend cinq minutes. Il est gratuit et sans inscription.",
    source:
      "Source : Cybermalveillance.gouv.fr, rapport d'activité 2025 (communiqué de mars 2026).",
    byline: {
      prefix: 'Conçu et animé en salle par',
      authors: { label: 'Clara Peron et Paul Loustaunau', href: routes['A-propos.dc.html'] },
    },
  },
  test: {
    situations: [
      {
        titre: 'Le colis en attente',
        canal: 'SMS',
        ctx: 'Vous recevez ce SMS :',
        msg: "« Votre colis n'a pas pu être livré. Frais de réexpédition : 1,99 €. Réglez ici avant ce soir : [lien]. »",
        scam: true,
        answer: A,
        explain:
          "Trois signaux : l'urgence (« avant ce soir »), le petit montant qui endort la méfiance, le lien. Le but est de récupérer vos coordonnées bancaires.",
        ruleLabel: R,
        rule: 'Je ne paie jamais depuis un lien reçu par SMS. Je transfère le SMS au 33700.',
      },
      {
        titre: 'Le service fraude de votre banque',
        canal: 'Appel',
        ctx: "Votre téléphone affiche le numéro de votre agence. Un « conseiller » vous signale un paiement suspect et vous demande de valider une opération dans votre application « pour l'annuler ».",
        msg: '',
        scam: true,
        answer: A,
        explain:
          "Un numéro affiché ne prouve plus rien : il peut être usurpé. Valider une opération ne l'annule jamais, cela l'autorise.",
        ruleLabel: R,
        rule: 'Je raccroche et je rappelle ma banque au numéro inscrit au dos de ma carte.',
      },
      {
        titre: 'Le nouveau numéro de votre fils',
        canal: 'Message',
        ctx: 'Vous recevez ce message :',
        msg: "« Coucou, c'est moi, j'ai cassé mon téléphone, voici mon nouveau numéro. Je dois payer une facture urgente, tu peux faire un virement ? Je te rembourse demain. »",
        scam: true,
        answer: A,
        explain:
          "Le scénario joue sur l'affection et l'urgence. Il existe aussi en message vocal, avec une voix imitée.",
        ruleLabel: R,
        rule: "J'appelle mon proche sur son ancien numéro, ou je lui pose une question que seul lui connaît. En famille, on peut convenir d'un mot de passe.",
      },
      {
        titre: "La confirmation dans l'application bancaire",
        canal: 'Application bancaire',
        ctx: 'Vous venez de payer un achat en ligne. Votre application bancaire vous demande aussitôt de confirmer ce paiement.',
        msg: '',
        scam: false,
        answer: F,
        explain:
          "C'est l'authentification normale d'un paiement, et c'est vous qui l'avez déclenché.",
        ruleLabel: 'La différence avec la situation 2',
        rule: "Ici, vous êtes à l'origine de l'opération. Si une demande de validation arrive sans que vous ayez rien acheté, refusez-la.",
      },
      {
        titre: "L'amende à payer sous 24 heures",
        canal: 'SMS',
        ctx: 'Vous recevez ce SMS :',
        msg: '« Avis de contravention impayée. Majoration sous 24 h. Réglez en ligne : [lien]. »',
        scam: true,
        answer: A,
        explain: 'Urgence, menace, lien.',
        ruleLabel: R,
        rule: "Pour toute démarche officielle, je ne clique pas. Je tape moi-même l'adresse du site officiel dans mon navigateur.",
      },
      {
        titre: 'Le fournisseur qui change de RIB',
        canal: 'Courriel · version entreprise',
        ctx: 'Courriel de votre fournisseur habituel, avec son logo et sa signature :',
        msg: '« Suite à un changement de banque, merci de régler désormais nos factures sur le RIB ci-joint. »',
        scam: true,
        answer: "Arnaque, jusqu'à preuve du contraire.",
        explain:
          "C'est la forme la plus courante de fraude au virement. La boîte du fournisseur a pu être piratée, ou son adresse imitée.",
        ruleLabel: R,
        rule: "Je rappelle le fournisseur sur le numéro que j'avais déjà, jamais sur celui du courriel. Deux personnes valident tout changement de coordonnées bancaires.",
      },
      {
        titre: 'Le rappel de rendez-vous',
        canal: 'SMS',
        ctx: 'SMS de votre cabinet médical :',
        msg: "« Rappel : rendez-vous demain à 10 h 30. En cas d'empêchement, merci de prévenir le cabinet. »",
        scam: false,
        answer: F,
        explain:
          "Pas de lien, pas de paiement, pas de demande d'information. Il vous informe de quelque chose que vous savez déjà.",
        ruleLabel: 'Ce qui ferait basculer',
        rule: 'Un lien « pour confirmer » qui demande vos coordonnées ou votre carte Vitale.',
      },
      {
        titre: 'La rencontre en ligne',
        canal: 'Échanges en ligne',
        ctx: "Vous échangez depuis trois semaines avec une personne attentionnée, rencontrée en ligne. Elle travaille à l'étranger. Elle vous demande de l'aide pour payer des frais de douane, en promettant de vous rembourser à son retour.",
        msg: '',
        scam: true,
        answer: A,
        explain:
          "C'est le schéma de l'arnaque sentimentale : une relation construite avec patience, une impossibilité de se voir, puis un besoin d'argent.",
        ruleLabel: R,
        rule: "Je n'envoie jamais d'argent à quelqu'un que je n'ai jamais rencontré. J'en parle à un proche : le secret est l'arme de l'escroc.",
      },
    ],
    labels: {
      heading: 'Le test · 8 situations',
      tally: 'Bonnes réponses : {score} sur {answered}',
      counter: 'Situation {n} sur 8 · {canal}',
      scam: 'Arnaque',
      legit: 'Fiable',
      right: 'Bien vu. ',
      wrong: 'Pas cette fois. ',
      next: 'Situation suivante',
      last: 'Voir mon résultat',
      resultEyebrow: 'Votre résultat',
      resultScore: '{score} sur 8',
      missedTitle: 'Les situations à revoir :',
      restart: 'Recommencer le test',
      rulesLink: 'Les quatre règles',
      note: "Situations fictives, construites à partir des schémas d'arnaque les plus fréquents. Aucune réponse n'est enregistrée.",
    },
    results: {
      perfect: {
        titre: 'Bravo.',
        texte: 'Vos réflexes sont solides. Partagez le test avec un proche plus exposé que vous.',
      },
      /** À partir de `good.min` bonnes réponses (et moins que le total). */
      good: {
        min: 5,
        titre: 'Bonne base.',
        texte:
          "Retenez surtout les situations manquées : elles montrent où l'escroc vous attendrait.",
      },
      low: {
        titre: "Rien d'anormal.",
        texte:
          'Ces arnaques sont conçues pour tromper. Les quatre règles ci-dessous suffisent à vous protéger dans la plupart des cas.',
      },
    },
  },
  rules: {
    eyebrow: 'À garder près du téléphone',
    title: 'Quatre règles non négociables',
    lead: "Elles suffisent à vous protéger dans la plupart des cas, quelle que soit l'arnaque.",
    items: [
      "Je ne donne jamais un code reçu par SMS, ni mes identifiants, à quelqu'un qui m'appelle.",
      "Je ne paie jamais dans l'urgence. L'urgence est le premier signal d'une arnaque.",
      'Je raccroche et je rappelle, sur un numéro que je connais déjà.',
      'Pour les voix imitées : en famille, un mot de passe connu de nous seuls.',
    ],
  },
  numbers: {
    eyebrow: 'À noter',
    title: 'Les bons numéros',
    items: [
      {
        value: '33700',
        gold: true,
        text: 'Signaler un SMS ou un appel frauduleux : transférez le SMS au 33700.',
      },
      { value: '17Cyber.gouv.fr', gold: false, text: 'Assistance en ligne pour les victimes.' },
      { value: '0 805 805 817', gold: false, text: 'Info Escroqueries, appel gratuit.' },
      {
        value: 'Votre banque',
        gold: false,
        text: 'Au numéro inscrit au dos de votre carte, pour faire opposition.',
      },
    ],
    happened: {
      title: "Si c'est arrivé",
      text: "Prévenez tout de suite votre banque. Gardez les messages et les numéros (captures d'écran). Signalez, et portez plainte. Et parlez-en : être victime n'est pas une faute, ces arnaques sont faites par des professionnels.",
    },
  },
  capture: {
    eyebrow: 'Gratuit',
    title: 'Gardez les règles sous la main, faites circuler le test',
    requiredNote: "Les champs marqués d'un astérisque (*) sont obligatoires.",
    letter:
      'Je souhaite aussi recevoir la lettre de M42.guide (une fois par mois, désinscription en un clic).',
    optional: 'Facultatif.',
    done: "C'est noté.",
    doneNote:
      "Pour recevoir la lettre, confirmez votre adresse : cliquez sur le lien de l'e-mail que nous venons de vous envoyer.",
    back: 'Revenir au formulaire',
    responsible: 'Responsable : [À COMPLÉTER : entité éditrice]. Détails et droits :',
    privacy: { label: 'Politique de confidentialité', href: routes['Confidentialite.dc.html'] },
    fiche: {
      eyebrow: 'Particuliers',
      title: 'Recevez la fiche à imprimer',
      text: 'Les quatre règles et les bons numéros, en gros caractères, à garder près du téléphone ou à donner à un proche.',
      formLabel: 'Recevoir la fiche à imprimer',
      submit: 'Recevoir la fiche',
      usage:
        "Votre adresse sert à vous envoyer la fiche et, si vous l'avez coché, notre lettre mensuelle.",
      fields: {
        mail: {
          label: 'E-mail *',
          error: 'Indiquez une adresse e-mail valide, par exemple nom@exemple.fr.',
        },
      },
    },
    kit: {
      eyebrow: 'Mairies, CCAS, médiathèques, entreprises, associations',
      title: 'Faites passer le test à vos habitants, vos équipes ou vos adhérents',
      /** HTML simple (gras de la maquette). */
      html: "Recevez gratuitement le <strong>kit de diffusion</strong> : texte prêt à publier pour un bulletin municipal, un intranet ou une lettre d'information, visuel, version papier du test pour un atelier.",
      formLabel: 'Recevoir le kit de diffusion',
      submit: 'Recevoir le kit',
      usage:
        "Vos informations servent à vous envoyer le kit de diffusion et, si vous l'avez coché, notre lettre mensuelle.",
      types: ['Mairie', 'CCAS', 'Médiathèque', 'Entreprise', 'Association', 'Autre'],
      fields: {
        nom: { label: 'Nom *', error: 'Indiquez votre nom.' },
        structure: { label: 'Structure *', error: 'Indiquez le nom de votre structure.' },
        type: { label: 'Type de structure *', error: 'Choisissez un type de structure.' },
        mail: {
          label: 'E-mail professionnel *',
          error: 'Indiquez une adresse e-mail valide, par exemple nom@structure.fr.',
        },
      },
      more: {
        /** HTML simple (gras de la maquette). */
        html: 'Et pour aller plus loin : <strong>le jeu « Arnaque ou pas ? » en salle</strong>, avec des messages anonymisés et un vote du public.',
        link: {
          label: 'Organiser une conférence Arnaques 2026',
          href: routes['Conf-arnaques-ia.dc.html'],
        },
      },
    },
  },
  faq: {
    eyebrow: 'Questions fréquentes',
    title: 'Questions fréquentes',
    items: [
      {
        question: 'Les messages du test sont-ils réels ?',
        answer:
          "<p>Non. Ce sont des situations fictives, écrites à partir des schémas d'arnaque les plus fréquents. Aucune vraie entreprise n'est citée. En conférence, nous utilisons aussi des messages réels anonymisés.</p>",
      },
      {
        question: "J'ai déjà cliqué ou payé. Que faire ?",
        answer:
          '<p>Appelez tout de suite votre banque pour faire opposition, au numéro inscrit au dos de votre carte. Gardez les preuves. Faites-vous aider sur 17Cyber.gouv.fr ou au 0 805 805 817. Plus vous agissez vite, plus vous avez de chances de limiter les dégâts.</p>',
      },
      {
        question: 'Puis-je utiliser ce test dans ma structure ?',
        answer:
          "<p>Oui, c'est fait pour. Partagez le lien librement. Pour un atelier ou un bulletin, demandez le kit de diffusion ci-dessus. Merci simplement de citer M42.guide.</p>",
      },
    ],
  },
  related: {
    eyebrow: 'Pour aller plus loin',
    items: [
      {
        label: 'Arnaques et IA, la conférence',
        href: routes['Conf-arnaques-ia.dc.html'],
        description:
          'Voix clonées, faux conseillers, faux SMS : le programme complet et le jeu en salle.',
      },
      {
        label: 'Collectivités et CCAS',
        href: routes['Collectivites.dc.html'],
        description:
          'Une soirée pour les habitants, un rendez-vous seniors, un cycle en médiathèque.',
      },
      {
        label: "Associations et structures d'accompagnement",
        href: routes['Associations.dc.html'],
        description: 'Seniors, aidants, bénévoles : des ateliers en petit groupe.',
      },
    ],
  },
  sources: {
    title: 'Sources de la page',
    items: ["Cybermalveillance.gouv.fr, rapport d'activité 2025 (communiqué de mars 2026)."],
  },
  cta: {
    eyebrow: 'En salle',
    title: 'Le jeu « Arnaque ou pas ? », en vrai, avec votre public.',
    lead: 'En conférence, avec des messages anonymisés et un vote de la salle. Pour une commune, un CCAS, une médiathèque ou une entreprise. Réponse sous 48 h.',
    primary: {
      label: 'Organiser une conférence Arnaques 2026',
      href: routes['Conf-arnaques-ia.dc.html'],
    },
    secondary: { label: 'Collectivités et associations', href: routes['Collectivites.dc.html'] },
  },
};
