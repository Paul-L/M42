// Types des pages conférences (kit/maquette/Conf-*.dc.html).
// Forme prévue pour la collection Directus `conferences` (phase 3) : un enregistrement par conférence,
// les listes (fiche, objectifs, programme, formats, publics, FAQ, sources) en champs JSON ou en
// collections liées. Les textes sont ceux de la maquette, typographie française appliquée au rendu.

/** Lien simple. */
export interface Lien {
  label: string;
  href: string;
}

/** Une ligne de la fiche d'en-tête (« Pour qui », « Formats », « Participants », « Où »). */
export interface LigneFiche {
  label: string;
  valeur: string;
}

/** Étape de l'animation au défilement (ScrollStory). */
export interface EtapeDemonstration {
  kicker: string;
  titre: string;
  texte: string;
  /** Ligne « Repère : … » (Parents, ados et IA). */
  repere?: string;
}

/** Chiffre sourcé (bande nuit « … en chiffres »). */
export interface Chiffre {
  valeur: string;
  texte: string;
  source: string;
  /** Valeur en or (« +517 % »). */
  accent?: boolean;
}

/** Bloc du programme (conférence de 1 h 30). */
export interface BlocProgramme {
  titre: string;
  duree: string;
  texte: string;
}

/** Format de la conférence (keynote, conférence, atelier, cycle). */
export interface Format {
  duree: string;
  titre: string;
  texte: string;
}

/** Carte « Pour qui » (lien vers une page public). */
export interface Public {
  titre: string;
  href: string;
  texte: string;
  /** Ligne « Déclinaison : « … » » sous le texte. */
  declinaison?: string;
}

/** Encadré « Déclinaison entreprise ». */
export interface DeclinaisonEntreprise {
  titre: string;
  texte: string;
  lien: Lien;
}

/** Question fréquente : `reponse` en HTML simple, reprise à l'identique dans le JSON-LD FAQPage. */
export interface QuestionFaq {
  question: string;
  reponse: string;
}

/** Source citée sous la FAQ : « {avant}<em>{titre}</em>{apres} » puis l'URL. */
export interface Source {
  avant: string;
  titre: string;
  apres: string;
  url: string;
}

/** Numéro ou plateforme utile (« Chacun repart avec les bons numéros »). */
export interface NumeroUtile {
  /** Sur-titre (« Numéro · SMS »). */
  type: string;
  valeur: string;
  /** Lien de la valeur (plateforme en ligne). */
  href?: string;
  texte: string;
  /** Taille de la valeur : « xl » (chiffre clé) ou « l ». */
  taille: 'xl' | 'l';
  accent?: boolean;
  /** Pas de retour à la ligne (numéro de téléphone). */
  insecable?: boolean;
}

/** Message du jeu « Arnaque ou pas ? ». */
export interface MessageJeu {
  /** Canal et expéditeur (« SMS · Mairie »). */
  de: string;
  texte: string;
  arnaque: boolean;
  explication: string;
  /**
   * Texte du bloc de remplacement du visuel (« [Photo : …] »), en attendant le vrai contenu
   * (jeu « Vrai ou IA ? », conférence III).
   */
  visuel?: string;
}

/** Étape numérotée d'un temps fort (« L'erreur sûre d'elle », conférence I). */
export interface EtapeTempsFort {
  titre: string;
  texte: string;
}

/** Ligne du tableau « Chez les pros / Version maison / En pratique » (conférence I). */
export interface MethodePro {
  pro: string;
  maison: string;
  pratique: string;
}

/** Section « Les méthodes des pros, version maison » (conférence I). */
export interface SectionMethodesPros {
  surTitre: string;
  titre: string;
  chapo: string;
  colonnes: [string, string, string];
  items: MethodePro[];
}

/** Moment du déroulé de la version keynote (« 0:00 Ouverture. … »). */
export interface MomentKeynote {
  minute: string;
  titre: string;
  texte: string;
}

/** Section « Version keynote » (conférence I). */
export interface SectionKeynote {
  surTitre: string;
  titre: string;
  chapo: string;
  note: string;
  deroule: MomentKeynote[];
  regles: string[];
  lien: Lien;
}

/** Section « La méthode » : étapes, note et encadré de règle (conférence III). */
export interface SectionMethode {
  surTitre: string;
  titre: string;
  etapes: { titre: string; texte: string }[];
  note: string;
  regle: { titre: string; texte: string };
}

/** Charte à compléter du temps fort (« Notre charte numérique », conférence IV). */
export interface CharteNumerique {
  titre: string;
  rubriques: string[];
  signature: string;
}

/** Bande nuit d'un numéro unique (« 3018 », conférence IV). */
export interface BandeNumero {
  valeur: string;
  titre: string;
  texte: string;
}

/*
 * Visuels de l'animation au défilement (slot « visual » de ScrollStory), un par conférence.
 * Textes de la maquette. Les champs marqués « HTML simple » sont insérés tels quels (apostrophes
 * droites conservées, comme le texte écrit dans le gabarit) ; les autres sont échappés.
 */

/** Passage surligné du faux SMS : indice 1 à 4 de l'animation (numéro, urgence, montant, lien). */
export interface SegmentSms {
  texte: string;
  indice: 1 | 2 | 3 | 4;
  /** Lien (souligné). */
  lien?: boolean;
}

/** « Anatomie d'un faux SMS » (conférence II, composant visuels/FauxSms). HTML simple. */
export interface VisuelFauxSms {
  type: 'faux-sms';
  /** Numéro de l'expéditeur (indice 1). */
  numero: string;
  /** Ligne « SMS · aujourd'hui 18:42 ». */
  meta: string;
  /** Texte du SMS : chaînes et passages surlignés, dans l'ordre. */
  message: (string | SegmentSms)[];
  /** Tampon de la dernière étape (« Arnaque »). */
  tampon: string;
  /** Légende sous le visuel. */
  legende: string;
}

/** « L'erreur sûre d'elle » (conférence I, composant visuels/ErreurSure). */
export interface VisuelErreurSure {
  type: 'erreur-sure';
  /** En-tête de la fenêtre de conversation (HTML simple). */
  entete: string;
  /** Question posée à l'IA (HTML simple). */
  question: string;
  /** Réponse de l'IA (texte échappé) : chaînes et faits inventés (surlignés puis barrés). */
  reponse: (string | { fait: string })[];
  /** Source inventée : libellé (« Source : ») puis texte surligné (HTML simple). */
  source: { libelle: string; texte: string };
  /** Tampon de la dernière étape (« Inventé », HTML simple). */
  tampon: string;
  /** Bloc « Le deuxième avis » : titre et recherches (HTML simple). */
  verification: { titre: string; recherches: { requete: string; resultat: string }[] };
  /** Légende sous le visuel (texte échappé). */
  legende: string;
}

/** « Une image qui circule » (conférence III, composant visuels/PublicationVirale). HTML simple. */
export interface VisuelPublicationVirale {
  type: 'publication-virale';
  /** Nom du compte, ancienneté (surlignée) et date de la publication. */
  compte: string;
  anciennete: string;
  date: string;
  /** Texte de la publication : accroche et appel surlignés, texte entre les deux. */
  message: { accroche: string; texte: string; appel: string };
  /** Image : description (nom accessible de l'illustration) et bandeau final. */
  image: { description: string; bandeau: string };
  /** Légende des repères numérotés 1, 2, 3 de l'illustration. */
  indices: string[];
  /** Vérifications : intitulé et résultat. */
  verifications: { label: string; resultat: string }[];
  /** Compteur de partages et bouton « Partager ». */
  partages: string;
  partager: string;
  /** Légende sous le visuel. */
  legende: string;
}

/** Message d'une conversation de groupe : auteur, puis texte. */
export interface MessageGroupe {
  auteur: string;
  texte: string;
}

/** « Une journée d'ado » (conférence IV, composant visuels/TelephoneAdo) : six écrans. HTML simple. */
export interface VisuelTelephoneAdo {
  type: 'telephone-ado';
  /** 7 h 10 : écran verrouillé. */
  verrouille: { heure: string; jour: string; notifications: { titre: string; texte: string }[] };
  /** 8 h 05 : le groupe de classe (photo en tête, réponse de l'ado en dernier). */
  groupe: { titre: string; photo: MessageGroupe; messages: MessageGroupe[]; reponse: string };
  /** 17 h 30 : les devoirs (demande à éviter, demande utile, note). */
  devoirs: { titre: string; aEviter: string; utile: string; note: string };
  /** 19 h 45 : le dîner. */
  repas: { titre: string; texte: string };
  /** 22 h 40 : un inconnu insiste (messages, puis boutons). */
  inconnu: { titre: string; messages: string[]; bloquer: string; signaler: string };
  /** La charte. */
  charte: { titre: string; regles: string[]; signature: string };
  /** Légende sous le visuel. */
  legende: string;
}

export type VisuelDemonstration =
  VisuelFauxSms | VisuelErreurSure | VisuelPublicationVirale | VisuelTelephoneAdo;

/**
 * Disponibilité : « catalogue » (page publiée, carte dans le catalogue) ou
 * « sur-demande » (sujet construit, présenté en une ligne sur /entreprises/, sans page en v1).
 */
export type Disponibilite = 'catalogue' | 'sur-demande';

/** Une conférence (page /conferences/<slug>/). */
export interface Conference {
  slug: string;
  /** Chiffre romain (I à IV). */
  numero: string;
  disponibilite: Disponibilite;
  /** Titre court, celui du H1 et du fil d'Ariane. */
  titre: string;
  seo: { title: string; description: string };
  /** Sur-titre placé dans le H1 (« Conférence II · … »). */
  surTitre: string;
  /** Note éditoriale sous le H1 (marqueur [À DÉCIDER]…), affichée en encadré pointillé. */
  noteTitre?: string;
  /** Mention au-dessus du H1, avec l'étoile d'or (« Conférence signature », conférence I). */
  mentionSignature?: string;
  /** Sous-titre en italique. */
  sousTitre: string;
  /** Promesse : ce que le participant emporte. */
  promesse: string;
  /** Bouton secondaire de l'en-tête (ancre vers la démonstration ou le jeu). */
  ctaSecondaire: Lien;
  /** Mention sous les boutons de l'en-tête (« Strictement neutre : … », conférence III). */
  mentionEnTete?: string;
  /** Date de mise à jour affichée (« [À COMPLÉTER : date] » tant qu'elle n'est pas fixée). */
  miseAJour: string;
  /** Date ISO de la dernière vraie mise à jour (JSON-LD dateModified) ; absente tant qu'elle n'est pas fixée. */
  dateModified?: string;
  fiche: LigneFiche[];

  demonstration: {
    /** Nom accessible de la section (aria-label). */
    label: string;
    surTitre: string;
    /** Hauteur de la section en nombre d'écrans (_K de la maquette). */
    k: number;
    etapes: EtapeDemonstration[];
    /** Textes du visuel propre à la page (téléphone, conversation, publication…). */
    visuel?: VisuelDemonstration;
  };

  enClair: string;
  objectifs: { titre: string; items: string[] };

  chiffres?: {
    label: string;
    items: Chiffre[];
    /** Petite note sous les chiffres (marqueur [À VÉRIFIER …], conférence III). */
    note?: string;
  };

  programme: { surTitre: string; titre: string; chapo: string; blocs: BlocProgramme[] };

  tempsFort: {
    id: string;
    titre: string;
    chapo: string;
    note?: string;
    /** Place de la note : sous le chapô (défaut) ou sous la rangée, pleine largeur (conférence I). */
    notePosition?: 'aside' | 'after';
  };

  /** Étapes numérotées du temps fort (conférence I). */
  tempsFortEtapes?: EtapeTempsFort[];

  /** Section « Les méthodes des pros, version maison » (conférence I). */
  methodes?: SectionMethodesPros;

  /** Section « Version keynote » (conférence I). */
  keynote?: SectionKeynote;

  /** Section « La méthode » (conférence III). */
  methode?: SectionMethode;

  /** Heures de la frise de l'animation au défilement, une par étape (conférence IV). */
  frise?: string[];

  /** Charte du temps fort (conférence IV). */
  charte?: CharteNumerique;

  /** Bande nuit « Le bon numéro » (conférence IV). */
  bonNumero?: BandeNumero;

  jeu?: MessageJeu[];

  formats: { titre: string; items: Format[] };

  publics: {
    titre: string;
    chapo: string;
    items: Public[];
  };

  declinaisonEntreprise: DeclinaisonEntreprise;

  numeros?: { surTitre: string; titre: string; items: NumeroUtile[] };

  faq: { titre: string; items: QuestionFaq[]; sources: Source[] };

  contact: { titre: string; chapo: string; cta: string };

  /** Données du JSON-LD Service (11_architecture_seo.md, § 3.3). */
  service: {
    name: string;
    serviceType: string;
    description: string;
    audiences: string[];
    about: string[];
  };
}

/** Carte du catalogue (« Les autres conférences »). */
export interface CarteConference {
  slug: string;
  numero: string;
  titre: string;
  href: string;
  resume: string;
  publics: string[];
  formats: string[];
  /** Conférence signature : étoile d'or + mention « Conférence signature ». */
  signature?: boolean;
}
