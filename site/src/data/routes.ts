// Correspondance fichier de maquette → URL du site (commentaires « SEO: » de kit/maquette).
// Sert à convertir les liens href="Xxx.dc.html" et au contrôle des liens de /verif.

export const routes = {
  'A-propos.dc.html': '/a-propos/',
  'Associations.dc.html': '/associations/',
  'Collectivites.dc.html': '/collectivites/',
  'Conf-arnaques-ia.dc.html': '/conferences/arnaques-ia/',
  'Conf-desinformation-ia.dc.html': '/conferences/desinformation-ia/',
  'Conf-ia-au-quotidien.dc.html': '/conferences/ia-au-quotidien/',
  'Conf-parents-ados-ia.dc.html': '/conferences/parents-ados-ia/',
  'Conferences.dc.html': '/conferences/',
  'Confidentialite.dc.html': '/confidentialite/',
  'Contact.dc.html': '/contact/',
  'Education.dc.html': '/education/',
  'Entreprises.dc.html': '/entreprises/',
  'Evenements.dc.html': '/evenements/',
  'Main.dc.html': '/',
  'Mentions-legales.dc.html': '/mentions-legales/',
  'Organisateurs.dc.html': '/organisateurs/',
  'Reperes.dc.html': '/reperes/',
  'Sat-experts-comptables.dc.html': '/conference-ia-experts-comptables/',
  'Sat-seminaire-entreprise.dc.html': '/conference-ia-seminaire-entreprise/',
  'Sat-sensibiliser-equipes-ia.dc.html': '/guides/sensibiliser-equipes-ia/',
  'Sat-test-arnaque-ou-pas.dc.html': '/outils/arnaque-ou-pas/',
} as const satisfies Record<string, string>;

export type MaquetteFile = keyof typeof routes;
