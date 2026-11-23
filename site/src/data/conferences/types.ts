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
}

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
  /** Sous-titre en italique. */
  sousTitre: string;
  /** Promesse : ce que le participant emporte. */
  promesse: string;
  /** Bouton secondaire de l'en-tête (ancre vers la démonstration ou le jeu). */
  ctaSecondaire: Lien;
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
  };

  enClair: string;
  objectifs: { titre: string; items: string[] };

  chiffres?: { label: string; items: Chiffre[] };

  programme: { surTitre: string; titre: string; chapo: string; blocs: BlocProgramme[] };

  tempsFort: { id: string; titre: string; chapo: string; note?: string };

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
