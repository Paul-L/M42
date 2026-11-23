// Cartes des quatre conférences (section « Les autres conférences » des pages Conf-*.dc.html).
// Textes repris des cartes de la maquette. En phase 3, ces champs viendront de la collection
// Directus `conferences` (résumé de carte, publics, formats, conférence signature).

import { routes } from '../routes';
import type { CarteConference } from './types';

const FORMATS = ['Keynote', 'Conférence', 'Atelier', 'Cycle'];

export const catalogue: CarteConference[] = [
  {
    slug: 'ia-au-quotidien',
    numero: 'I',
    titre: "L'IA au quotidien",
    href: routes['Conf-ia-au-quotidien.dc.html'],
    resume:
      "Comprendre ce que l'IA sait faire, repérer quand elle invente, et adopter les méthodes des professionnels pour s'en servir sans cesser de réfléchir.",
    publics: ['Entreprises', 'Événements', 'Collectivités'],
    formats: FORMATS,
    signature: true,
  },
  {
    slug: 'arnaques-ia',
    numero: 'II',
    titre: 'Arnaques et IA',
    href: routes['Conf-arnaques-ia.dc.html'],
    resume:
      'Reconnaître une voix clonée, un faux conseiller ou un faux SMS, et savoir exactement quoi faire. Pour les particuliers comme pour les équipes en entreprise.',
    publics: ['Collectivités', 'Associations', 'Entreprises'],
    formats: FORMATS,
  },
  {
    slug: 'desinformation-ia',
    numero: 'III',
    titre: 'Vrai ou faux ?',
    href: routes['Conf-desinformation-ia.dc.html'],
    resume:
      "Repérer une image truquée, une fausse vidéo ou un faux site d'information grâce à une méthode simple en quatre étapes. Une conférence strictement neutre.",
    publics: ['Écoles & familles', 'Collectivités', 'Événements'],
    formats: FORMATS,
  },
  {
    slug: 'parents-ados-ia',
    numero: 'IV',
    titre: 'Parents, ados et IA',
    href: routes['Conf-parents-ados-ia.dc.html'],
    resume:
      'Des repères clairs sur les devoirs, les réseaux sociaux et le cyberharcèlement, et une charte numérique à construire en famille.',
    publics: ['Écoles & familles', 'Associations', 'Collectivités'],
    formats: FORMATS,
  },
];
