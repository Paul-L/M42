// Réglages communs du site (singleton Directus `settings`) : baseline du pied de page,
// coordonnées des bandeaux de contact (conférences, satellites). Ordre : Clara, puis Paul.

export interface Settings {
  /** Baseline du pied de page (texte simple). */
  baseline: string;
  contacts: { prenom: string; email: string }[];
  /** Téléphone (marqueur tant qu'il n'est pas fixé). */
  telephone: string;
}

export const settings: Settings = {
  baseline: "Se repérer dans l'IA.",
  contacts: [
    { prenom: 'Clara', email: 'clara@m42.guide' },
    { prenom: 'Paul', email: 'paul@m42.guide' },
  ],
  telephone: '[À COMPLÉTER : téléphone]',
};
